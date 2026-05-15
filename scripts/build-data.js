#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'dashboard', 'data');
const MOCK_FILE = path.join(ROOT, 'dashboard', 'data.js');
const OUT_FILE = path.join(ROOT, 'dashboard', 'data.generated.js');

const INDICATOR_LABELS = {
  g33: "TIF TN kod",
  g8code2: "Importyor",
  g15: "Jo'natuvchi davlat",
  g34: "Mamlakat",
  g14code1: "Broker",
  g54regcode: "Deklarant",
};

function parseCSV(text) {
  const rows = [];
  let i = 0, field = '', row = [], inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i+1] === '"') { field += '"'; i += 2; continue; }
      if (c === '"') { inQuotes = false; i++; continue; }
      field += c; i++; continue;
    }
    if (c === '"') { inQuotes = true; i++; continue; }
    if (c === ',') { row.push(field); field = ''; i++; continue; }
    if (c === '\r') { i++; continue; }
    if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
    field += c; i++;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const header = rows[0].map(h => h.trim());
  return rows.slice(1).filter(r => r.some(v => v && v.trim() !== '')).map(r => {
    const o = {};
    header.forEach((h, idx) => { o[h] = (r[idx] ?? '').trim(); });
    return o;
  });
}

function readCSV(name) {
  const p = path.join(DATA_DIR, name);
  if (!fs.existsSync(p)) {
    console.warn(`[build-data] WARN: ${name} not found, skipping`);
    return null;
  }
  return parseCSV(fs.readFileSync(p, 'utf8'));
}

function num(v) {
  if (v === '' || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function nonEmpty(v) {
  return v !== '' && v != null ? v : null;
}

function loadMock() {
  const src = fs.readFileSync(MOCK_FILE, 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  return ctx.window.MOCK;
}

function buildIndicators(row) {
  const out = [INDICATOR_LABELS.g33];
  ['g8code2', 'g15', 'g34', 'g14code1', 'g54regcode'].forEach(k => {
    if (nonEmpty(row[k])) out.push(INDICATOR_LABELS[k]);
  });
  return out;
}

function buildConditions(row, level) {
  const parts = [`HS${level}=${row.g33}`];
  if (nonEmpty(row.g8code2))    parts.push(`Importer=${row.g8code2}`);
  if (nonEmpty(row.g15))        parts.push(`Departure=${row.g15}`);
  if (nonEmpty(row.g34))        parts.push(`Country=${row.g34}`);
  if (nonEmpty(row.g14code1))   parts.push(`Broker=${row.g14code1}`);
  if (nonEmpty(row.g54regcode)) parts.push(`Declarant=${row.g54regcode}`);
  return parts.join(' AND ');
}

function buildPatterns(patternRows, correctionRows) {
  const correctionsByHs = {};
  (correctionRows || []).forEach(r => {
    const key = r.g33;
    if (!correctionsByHs[key]) correctionsByHs[key] = [];
    correctionsByHs[key].push({
      code: r.corrected_hs,
      pct: num(r.pct) ?? 0,
      cases: num(r.cases) ?? 0,
    });
  });
  Object.values(correctionsByHs).forEach(arr => {
    arr.sort((a, b) => b.pct - a.pct);
    arr.length = Math.min(arr.length, 5);
  });

  return (patternRows || []).map(r => {
    const level = num(r.hs_level) ?? 10;
    const prob = num(r.conditional_probability);
    const hitRate = prob != null ? +(prob * 100).toFixed(1) : null;
    return {
      id: r.pattern_id,
      level,
      hsCode: r.g33,
      indicators: buildIndicators(r),
      conditions: buildConditions(r, level),
      totalCases: num(r.support),
      misclassCases: num(r.misclass_cases),
      hitRate,
      misclassRate: hitRate,
      revenueImpact: num(r.extra_revenue) ?? 0,
      lift: num(r.lift),
      period: '2024-2025',
      status: 'new',
      actualCodes: correctionsByHs[r.g33] || [],
      examples: [],
    };
  });
}

function buildTopSignals(patterns) {
  return [...patterns]
    .sort((a, b) => b.revenueImpact - a.revenueImpact)
    .slice(0, 5)
    .map((p, i) => ({
      id: i + 1,
      hs6: p.hsCode.slice(0, 6),
      country: p.indicators.includes("Mamlakat") ? "—" : "—",
      hitRate: p.hitRate ?? 0,
      revenue: p.revenueImpact,
      cases: p.totalCases ?? 0,
      change: '—',
      trend: 'up',
    }));
}

function serialize(value, indent = 2, depth = 0) {
  const pad = ' '.repeat(indent * depth);
  const padIn = ' '.repeat(indent * (depth + 1));
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    const items = value.map(v => padIn + serialize(v, indent, depth + 1));
    return '[\n' + items.join(',\n') + '\n' + pad + ']';
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (!keys.length) return '{}';
    const items = keys.map(k => {
      const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return padIn + safeKey + ': ' + serialize(value[k], indent, depth + 1);
    });
    return '{\n' + items.join(',\n') + '\n' + pad + '}';
  }
  return 'null';
}

function main() {
  if (!fs.existsSync(MOCK_FILE)) {
    console.error(`[build-data] ERROR: ${MOCK_FILE} missing`);
    process.exit(1);
  }
  const mock = loadMock();
  if (!mock) {
    console.error('[build-data] ERROR: could not load window.MOCK from data.js');
    process.exit(1);
  }

  const patternRows = readCSV('patterns.csv');
  const correctionRows = readCSV('possible_corrections.csv');
  const summaryRows = readCSV('pattern_summary.csv');

  if (!patternRows) {
    console.warn('[build-data] No real data found; writing data.generated.js identical to mock');
    const out = 'window.MOCK = ' + serialize(mock) + ';\n';
    fs.writeFileSync(OUT_FILE, out);
    return;
  }

  const patterns = buildPatterns(patternRows, correctionRows);
  mock.patterns = patterns;
  mock.topSignals = buildTopSignals(patterns);
  mock.ruleTypeDistribution = [
    { name: 'Statistik', value: patterns.length, color: '#06B6D4' },
  ];

  if (summaryRows && summaryRows.length) {
    const s = summaryRows[0];
    if (s.total_patterns)       mock.summary.activeRules = num(s.total_patterns);
    if (s.total_extra_revenue)  mock.summary.revenueImpact = num(s.total_extra_revenue);
  } else {
    mock.summary.activeRules = patterns.length;
    mock.summary.revenueImpact = patterns.reduce((a, p) => a + p.revenueImpact, 0);
  }

  mock.summary.weeklyNewPatterns = 0;
  mock.summary.weeklyStrengthened = 0;
  mock.summary.weeklyWeakened = 0;

  const out = '// AUTO-GENERATED — do not edit; run `node scripts/build-data.js`\n' +
              'window.MOCK = ' + serialize(mock) + ';\n';
  fs.writeFileSync(OUT_FILE, out);

  console.log(`[build-data] OK: ${patterns.length} patterns, ` +
              `${(correctionRows || []).length} corrections, ` +
              `${(mock.rules || []).length} mock rules (unchanged).`);
}

main();
