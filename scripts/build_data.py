#!/usr/bin/env python3
"""
Build dashboard/data.generated.js from the CSVs in dashboard/data/.

Usage:
  python scripts/build_data.py

Mirrors scripts/build-data.js exactly, so users without Node can still
regenerate the dashboard data.
"""
from __future__ import annotations

import csv
import io
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "dashboard" / "data"
MOCK_FILE = ROOT / "dashboard" / "data.js"
OUT_FILE = ROOT / "dashboard" / "data.generated.js"

INDICATOR_LABELS = {
    "g33": "TIF TN kod",
    "g8code2": "Importyor",
    "g15": "Jo'natuvchi davlat",
    "g34": "Mamlakat",
    "g14code1": "Broker",
    "g54regcode": "Deklarant",
}


def detect_delimiter(line: str) -> str:
    counts = {";": 0, "\t": 0, ",": 0}
    in_quotes = False
    for c in line:
        if c == '"':
            in_quotes = not in_quotes
        elif not in_quotes and c in counts:
            counts[c] += 1
    best, best_count = ",", 0
    for d in (";", "\t", ","):
        if counts[d] > best_count:
            best, best_count = d, counts[d]
    return best


def parse_csv(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8-sig")
    if not text.strip():
        return []
    first_line = text.splitlines()[0] if text else ""
    delim = detect_delimiter(first_line)
    reader = csv.reader(io.StringIO(text), delimiter=delim, quotechar='"')
    rows = list(reader)
    if not rows:
        return []
    header = [h.strip().lower() for h in rows[0]]
    out = []
    for r in rows[1:]:
        if not any(v and v.strip() for v in r):
            continue
        obj = {}
        for i, h in enumerate(header):
            obj[h] = (r[i] if i < len(r) else "").strip()
        out.append(obj)
    return out


def read_csv_optional(name: str) -> list[dict] | None:
    p = DATA_DIR / name
    if not p.exists():
        print(f"[build-data] WARN: {name} not found, skipping")
        return None
    return parse_csv(p)


def num(v):
    if v is None or v == "":
        return None
    try:
        n = float(v)
    except (ValueError, TypeError):
        return None
    if n != n or n in (float("inf"), float("-inf")):
        return None
    if n.is_integer():
        return int(n)
    return n


def non_empty(v):
    return v if v not in ("", None) else None


def load_mock() -> dict:
    """Extract the MOCK object literal from dashboard/data.js using a tiny JS-ish parser."""
    src = MOCK_FILE.read_text(encoding="utf-8")
    m = re.search(r"window\.MOCK\s*=\s*", src)
    if not m:
        raise RuntimeError("could not find `window.MOCK =` in dashboard/data.js")
    start = m.end()
    while start < len(src) and src[start] != "{":
        start += 1
    if start >= len(src):
        raise RuntimeError("could not find `{` after `window.MOCK =`")
    end = _find_matching_brace(src, start)
    obj_src = src[start : end + 1]
    return _js_object_to_python(obj_src)


def _find_matching_brace(s: str, start: int) -> int:
    depth = 0
    i = start
    in_str = None  # None | '"' | "'" | "`"
    in_line_comment = False
    in_block_comment = False
    while i < len(s):
        c = s[i]
        nxt = s[i + 1] if i + 1 < len(s) else ""
        if in_line_comment:
            if c == "\n":
                in_line_comment = False
            i += 1
            continue
        if in_block_comment:
            if c == "*" and nxt == "/":
                in_block_comment = False
                i += 2
                continue
            i += 1
            continue
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == in_str:
                in_str = None
            i += 1
            continue
        if c == "/" and nxt == "/":
            in_line_comment = True
            i += 2
            continue
        if c == "/" and nxt == "*":
            in_block_comment = True
            i += 2
            continue
        if c in ("'", '"', "`"):
            in_str = c
            i += 1
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    raise RuntimeError("unbalanced braces in MOCK literal")


def _js_object_to_python(obj_src: str):
    """Convert a JS object/array literal to Python via json after light normalization.

    Handles: unquoted keys, single-quoted strings, trailing commas, // and /* */ comments.
    Does NOT handle template literals, expressions, or function values — none are used in data.js.
    """
    s = obj_src

    # Strip block comments
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.DOTALL)
    # Strip line comments (avoid touching inside strings — naive but data.js has no // in strings)
    s = re.sub(r"(?m)//[^\n]*$", "", s)

    # Convert single-quoted strings to double-quoted, walking the source so we
    # don't mangle quotes that live inside other strings.
    out_chars = []
    i = 0
    in_dq = False
    while i < len(s):
        c = s[i]
        if in_dq:
            out_chars.append(c)
            if c == "\\" and i + 1 < len(s):
                out_chars.append(s[i + 1])
                i += 2
                continue
            if c == '"':
                in_dq = False
            i += 1
            continue
        if c == '"':
            in_dq = True
            out_chars.append(c)
            i += 1
            continue
        if c == "'":
            # Read single-quoted string, convert to JSON double-quoted.
            j = i + 1
            buf = []
            while j < len(s):
                cj = s[j]
                if cj == "\\" and j + 1 < len(s):
                    buf.append(s[j + 1])
                    j += 2
                    continue
                if cj == "'":
                    break
                buf.append(cj)
                j += 1
            inner = "".join(buf)
            out_chars.append(json.dumps(inner))
            i = j + 1
            continue
        out_chars.append(c)
        i += 1
    s = "".join(out_chars)

    # Quote unquoted object keys: { key: ... } or , key: ...
    s = re.sub(r'([{,]\s*)([A-Za-z_$][A-Za-z0-9_$]*)\s*:', r'\1"\2":', s)

    # Remove trailing commas before ] or }
    s = re.sub(r",(\s*[}\]])", r"\1", s)

    return json.loads(s)


def build_indicators(row: dict) -> list[str]:
    out = [INDICATOR_LABELS["g33"]]
    for k in ("g8code2", "g15", "g34", "g14code1", "g54regcode"):
        if non_empty(row.get(k)):
            out.append(INDICATOR_LABELS[k])
    return out


def build_conditions(row: dict, level: int) -> str:
    parts = [f"HS{level}={row.get('g33', '')}"]
    if non_empty(row.get("g8code2")):    parts.append(f"Importer={row['g8code2']}")
    if non_empty(row.get("g15")):        parts.append(f"Departure={row['g15']}")
    if non_empty(row.get("g34")):        parts.append(f"Country={row['g34']}")
    if non_empty(row.get("g14code1")):   parts.append(f"Broker={row['g14code1']}")
    if non_empty(row.get("g54regcode")): parts.append(f"Declarant={row['g54regcode']}")
    return " AND ".join(parts)


def build_corrections_by_hs(rows: list[dict] | None) -> dict[str, list[dict]]:
    by: dict[str, list[dict]] = {}
    for r in rows or []:
        key = r.get("first_hs_code")
        if not key:
            continue
        by.setdefault(key, []).append({
            "code": r.get("corrected_hs_code"),
            "cases": num(r.get("count")) or 0,
            "tax": num(r.get("tax_amount")) or 0,
        })
    for k, arr in by.items():
        total = sum(x["cases"] for x in arr) or 1
        for x in arr:
            x["pct"] = round(x["cases"] * 100 / total, 1)
        arr.sort(key=lambda x: x["cases"], reverse=True)
        by[k] = arr[:5]
    return by


def build_patterns(pattern_rows: list[dict] | None, corrections_by_hs: dict[str, list[dict]]) -> list[dict]:
    patterns = []
    prob_warnings = 0
    for r in pattern_rows or []:
        level = num(r.get("hs_level")) or 10
        prob = num(r.get("conditional_probability"))
        hit_rate = None
        if prob is not None:
            if prob > 1:
                prob_warnings += 1
                hit_rate = None
            else:
                hit_rate = round(prob * 100, 1)
        patterns.append({
            "id": r.get("pattern_id"),
            "level": level,
            "hsCode": r.get("g33"),
            "indicators": build_indicators(r),
            "conditions": build_conditions(r, level),
            "totalCases": num(r.get("support")),
            "misclassCases": num(r.get("misclass_cases")),
            "hitRate": hit_rate,
            "misclassRate": hit_rate,
            "revenueImpact": num(r.get("extra_revenue")) or 0,
            "lift": num(r.get("lift")),
            "period": "2024-2025",
            "status": "new",
            "actualCodes": corrections_by_hs.get(r.get("g33"), []),
            "examples": [],
        })
    if prob_warnings:
        print(f"[build-data] WARN: {prob_warnings} pattern(s) had conditional_probability > 1; "
              f"hitRate set to null. Fix the analysis (probability must be 0-1).")
    return patterns


def build_top_signals(patterns: list[dict]) -> list[dict]:
    sorted_p = sorted(patterns, key=lambda p: p["revenueImpact"], reverse=True)[:5]
    out = []
    for i, p in enumerate(sorted_p):
        out.append({
            "id": i + 1,
            "hs6": (p["hsCode"] or "")[:6],
            "country": "—",
            "hitRate": p["hitRate"] or 0,
            "revenue": p["revenueImpact"],
            "cases": p["totalCases"] or 0,
            "change": "—",
            "trend": "up",
        })
    return out


def build_amendments(rows: list[dict] | None, hs_len: int) -> list[dict]:
    agg: dict[str, dict] = {}
    for r in rows or []:
        first = (r.get("first_hs_code") or "")[:hs_len]
        corr = (r.get("corrected_hs_code") or "")[:hs_len]
        if not first or not corr:
            continue
        key = f"{first}|{corr}"
        if key not in agg:
            agg[key] = {
                "first_hs_code": first,
                "corrected_hs_code": corr,
                "importer": "",
                "country_of_origin": "",
                "count": 0,
                "tax_amount": 0,
            }
        agg[key]["count"] += num(r.get("count")) or 0
        agg[key]["tax_amount"] += num(r.get("tax_amount")) or 0
    return list(agg.values())


def build_declarations(rows: list[dict] | None, hs_len: int) -> list[dict]:
    agg: dict[str, dict] = {}
    for r in rows or []:
        code = (r.get("hs_code") or "")[:hs_len]
        if not code:
            continue
        if code not in agg:
            agg[code] = {"hs_code": code, "importer": "", "country_of_origin": "", "count": 0}
        agg[code]["count"] += num(r.get("count")) or 0
    return list(agg.values())


def serialize(value, indent=2, depth=0) -> str:
    pad = " " * (indent * depth)
    pad_in = " " * (indent * (depth + 1))
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        if isinstance(value, float) and value.is_integer():
            return str(int(value))
        return repr(value) if isinstance(value, float) else str(value)
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, list):
        if not value:
            return "[]"
        items = [pad_in + serialize(v, indent, depth + 1) for v in value]
        return "[\n" + ",\n".join(items) + "\n" + pad + "]"
    if isinstance(value, dict):
        if not value:
            return "{}"
        items = []
        for k, v in value.items():
            safe_key = k if re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", str(k)) else json.dumps(str(k))
            items.append(pad_in + safe_key + ": " + serialize(v, indent, depth + 1))
        return "{\n" + ",\n".join(items) + "\n" + pad + "}"
    return "null"


def main():
    if not MOCK_FILE.exists():
        print(f"[build-data] ERROR: {MOCK_FILE} missing", file=sys.stderr)
        sys.exit(1)
    try:
        mock = load_mock()
    except Exception as e:
        print(f"[build-data] ERROR: could not parse window.MOCK from data.js: {e}", file=sys.stderr)
        sys.exit(1)

    pattern_rows    = read_csv_optional("patterns.csv")
    correction_rows = read_csv_optional("possible_corrections.csv")
    summary_rows    = read_csv_optional("pattern_summary.csv")
    all_hs_rows     = read_csv_optional("all_hs.csv")

    if not pattern_rows and not correction_rows and not all_hs_rows:
        print("[build-data] No real data found; writing data.generated.js identical to mock")
        OUT_FILE.write_text("window.MOCK = " + serialize(mock) + ";\n", encoding="utf-8")
        return

    corrections_by_hs = build_corrections_by_hs(correction_rows)
    patterns = build_patterns(pattern_rows, corrections_by_hs)
    mock["patterns"] = patterns
    mock["topSignals"] = build_top_signals(patterns)
    mock["ruleTypeDistribution"] = [
        {"name": "Statistik", "value": len(patterns), "color": "#06B6D4"},
    ]

    if summary_rows:
        s = summary_rows[0]
        if s.get("total_patterns"):
            mock["summary"]["activeRules"] = num(s["total_patterns"])
        if s.get("total_extra_revenue"):
            mock["summary"]["revenueImpact"] = num(s["total_extra_revenue"])
    else:
        mock["summary"]["activeRules"] = len(patterns)
        mock["summary"]["revenueImpact"] = sum(p["revenueImpact"] for p in patterns)
    mock["summary"]["weeklyNewPatterns"] = 0
    mock["summary"]["weeklyStrengthened"] = 0
    mock["summary"]["weeklyWeakened"] = 0

    if "network" not in mock:
        mock["network"] = {}
    mock["network"]["amendments_10_3m"]   = build_amendments(correction_rows, 10)
    mock["network"]["amendments_6_3m"]    = build_amendments(correction_rows, 6)
    mock["network"]["declarations_10_3m"] = build_declarations(all_hs_rows, 10)
    mock["network"]["declarations_6_3m"]  = build_declarations(all_hs_rows, 6)
    mock["network"]["amendments_10_1y"]   = []
    mock["network"]["amendments_6_1y"]    = []
    mock["network"]["declarations_10_1y"] = []
    mock["network"]["declarations_6_1y"]  = []

    out = ("// AUTO-GENERATED — do not edit; run `python scripts/build_data.py`\n"
           "window.MOCK = " + serialize(mock) + ";\n")
    OUT_FILE.write_text(out, encoding="utf-8")

    print(f"[build-data] OK: {len(patterns)} patterns, "
          f"{len(correction_rows or [])} corrections, "
          f"{len(mock['network']['amendments_10_3m'])} HS10/3m edges, "
          f"{len(mock['network']['declarations_10_3m'])} HS10/3m nodes, "
          f"{len(mock.get('rules', []))} mock rules (unchanged).")


if __name__ == "__main__":
    main()
