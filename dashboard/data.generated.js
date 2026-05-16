// AUTO-GENERATED — do not edit; run `node scripts/build-data.js`
window.MOCK = {
  summary: {
    totalDeclarations: 2842,
    totalInspected: 406,
    misclassifications: 289,
    activeRules: 47,
    revenueImpact: 4250000,
    avgHitRate: 66.4,
    weeklyNewPatterns: 0,
    weeklyStrengthened: 0,
    weeklyWeakened: 0
  },
  monthlyTrend: [
    {
      month: "Apr 24",
      declarations: 198,
      misclass: 18,
      revenue: 215000,
      hitRate: 62
    },
    {
      month: "May 24",
      declarations: 212,
      misclass: 20,
      revenue: 238000,
      hitRate: 63
    },
    {
      month: "Iyn 24",
      declarations: 225,
      misclass: 21,
      revenue: 255000,
      hitRate: 65
    },
    {
      month: "Iyl 24",
      declarations: 240,
      misclass: 23,
      revenue: 272000,
      hitRate: 66
    },
    {
      month: "Avg 24",
      declarations: 232,
      misclass: 22,
      revenue: 260000,
      hitRate: 67
    },
    {
      month: "Sen 24",
      declarations: 258,
      misclass: 25,
      revenue: 295000,
      hitRate: 68
    },
    {
      month: "Okt 24",
      declarations: 270,
      misclass: 26,
      revenue: 310000,
      hitRate: 70
    },
    {
      month: "Noy 24",
      declarations: 262,
      misclass: 25,
      revenue: 298000,
      hitRate: 71
    },
    {
      month: "Dek 24",
      declarations: 280,
      misclass: 27,
      revenue: 325000,
      hitRate: 72
    },
    {
      month: "Yan 25",
      declarations: 295,
      misclass: 28,
      revenue: 342000,
      hitRate: 73
    },
    {
      month: "Fev 25",
      declarations: 285,
      misclass: 27,
      revenue: 330000,
      hitRate: 72
    },
    {
      month: "Mar 25",
      declarations: 310,
      misclass: 30,
      revenue: 358000,
      hitRate: 74
    }
  ],
  topSignals: [
    {
      id: 1,
      hs6: "870421",
      country: "—",
      hitRate: 83,
      revenue: 612000,
      cases: 42,
      change: "—",
      trend: "up"
    },
    {
      id: 2,
      hs6: "730439",
      country: "—",
      hitRate: 85,
      revenue: 528000,
      cases: 33,
      change: "—",
      trend: "up"
    },
    {
      id: 3,
      hs6: "730439",
      country: "—",
      hitRate: 80,
      revenue: 435000,
      cases: 30,
      change: "—",
      trend: "up"
    },
    {
      id: 4,
      hs6: "843280",
      country: "—",
      hitRate: 87,
      revenue: 390000,
      cases: 33,
      change: "—",
      trend: "up"
    },
    {
      id: 5,
      hs6: "850440",
      country: "—",
      hitRate: 78,
      revenue: 341000,
      cases: 28,
      change: "—",
      trend: "up"
    }
  ],
  patterns: [
    {
      id: "P001",
      level: 10,
      hsCode: "7304399309",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=7304399309 AND Importer=306764904 AND Departure=156 AND Country=156",
      totalCases: 33,
      misclassCases: 28,
      hitRate: 85,
      misclassRate: 85,
      revenueImpact: 528000,
      lift: 4.2,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "7304399301",
          cases: 19,
          tax: 58000,
          pct: 57.6
        },
        {
          code: "7304390009",
          cases: 10,
          tax: 30000,
          pct: 30.3
        },
        {
          code: "7304399100",
          cases: 4,
          tax: 12000,
          pct: 12.1
        }
      ],
      examples: []
    },
    {
      id: "P002",
      level: 10,
      hsCode: "7304399309",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=7304399309 AND Importer=308234604 AND Departure=344 AND Country=344",
      totalCases: 30,
      misclassCases: 24,
      hitRate: 80,
      misclassRate: 80,
      revenueImpact: 435000,
      lift: 3.9,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "7304399301",
          cases: 19,
          tax: 58000,
          pct: 57.6
        },
        {
          code: "7304390009",
          cases: 10,
          tax: 30000,
          pct: 30.3
        },
        {
          code: "7304399100",
          cases: 4,
          tax: 12000,
          pct: 12.1
        }
      ],
      examples: []
    },
    {
      id: "P003",
      level: 10,
      hsCode: "8432800000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=8432800000 AND Importer=307968499 AND Departure=156 AND Country=156",
      totalCases: 33,
      misclassCases: 30,
      hitRate: 87,
      misclassRate: 87,
      revenueImpact: 390000,
      lift: 4.5,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8432800001",
          cases: 16,
          tax: 28000,
          pct: 53.3
        },
        {
          code: "8432890000",
          cases: 10,
          tax: 19000,
          pct: 33.3
        },
        {
          code: "8432800090",
          cases: 4,
          tax: 8000,
          pct: 13.3
        }
      ],
      examples: []
    },
    {
      id: "P004",
      level: 10,
      hsCode: "8415810010",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=8415810010 AND Importer=306693258 AND Departure=792 AND Country=792",
      totalCases: 11,
      misclassCases: 8,
      hitRate: 73,
      misclassRate: 73,
      revenueImpact: 275000,
      lift: 3.6,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8415810001",
          cases: 7,
          tax: 62000,
          pct: 63.6
        },
        {
          code: "8415819010",
          cases: 4,
          tax: 38000,
          pct: 36.4
        }
      ],
      examples: []
    },
    {
      id: "P005",
      level: 10,
      hsCode: "8422300003",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=8422300003 AND Importer=311498197 AND Departure=276 AND Country=276",
      totalCases: 10,
      misclassCases: 7,
      hitRate: 70,
      misclassRate: 70,
      revenueImpact: 260000,
      lift: 3.4,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8422300001",
          cases: 7,
          tax: 15000,
          pct: 70
        },
        {
          code: "8422390003",
          cases: 3,
          tax: 6000,
          pct: 30
        }
      ],
      examples: []
    },
    {
      id: "P006",
      level: 10,
      hsCode: "8483405109",
      indicators: [
        "TIF TN kod",
        "Importyor"
      ],
      conditions: "HS10=8483405109 AND Importer=200244767",
      totalCases: 17,
      misclassCases: 15,
      hitRate: 82,
      misclassRate: 82,
      revenueImpact: 225000,
      lift: 4,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8483405101",
          cases: 9,
          tax: 72000,
          pct: 60
        },
        {
          code: "8483400009",
          cases: 6,
          tax: 48000,
          pct: 40
        }
      ],
      examples: []
    },
    {
      id: "P007",
      level: 10,
      hsCode: "8483109500",
      indicators: [
        "TIF TN kod",
        "Importyor"
      ],
      conditions: "HS10=8483109500 AND Importer=305862324",
      totalCases: 11,
      misclassCases: 9,
      hitRate: 73,
      misclassRate: 73,
      revenueImpact: 171000,
      lift: 3.5,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8483109501",
          cases: 5,
          tax: 19000,
          pct: 55.6
        },
        {
          code: "8483100500",
          cases: 4,
          tax: 15000,
          pct: 44.4
        }
      ],
      examples: []
    },
    {
      id: "P008",
      level: 10,
      hsCode: "7806008009",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Mamlakat"
      ],
      conditions: "HS10=7806008009 AND Importer=200244767 AND Country=410",
      totalCases: 19,
      misclassCases: 14,
      hitRate: 69,
      misclassRate: 69,
      revenueImpact: 252000,
      lift: 3.3,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "7806008001",
          cases: 8,
          tax: 35000,
          pct: 57.1
        },
        {
          code: "7806000009",
          cases: 6,
          tax: 28000,
          pct: 42.9
        }
      ],
      examples: []
    },
    {
      id: "P009",
      level: 10,
      hsCode: "6109902000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=6109902000 AND Importer=200202620 AND Departure=398 AND Country=398",
      totalCases: 10,
      misclassCases: 7,
      hitRate: 63,
      misclassRate: 63,
      revenueImpact: 84000,
      lift: 3,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "6109902001",
          cases: 4,
          tax: 14000,
          pct: 44.4
        },
        {
          code: "6109900000",
          cases: 3,
          tax: 10000,
          pct: 33.3
        },
        {
          code: "6109300000",
          cases: 2,
          tax: 7000,
          pct: 22.2
        }
      ],
      examples: []
    },
    {
      id: "P010",
      level: 10,
      hsCode: "8704210000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat",
        "Broker"
      ],
      conditions: "HS10=8704210000 AND Importer=308112233 AND Departure=156 AND Country=156 AND Broker=IMP-BRK01",
      totalCases: 42,
      misclassCases: 35,
      hitRate: 83,
      misclassRate: 83,
      revenueImpact: 612000,
      lift: 4.1,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8704220000",
          cases: 22,
          tax: 125000,
          pct: 62.9
        },
        {
          code: "8704310000",
          cases: 13,
          tax: 87000,
          pct: 37.1
        }
      ],
      examples: []
    },
    {
      id: "P011",
      level: 10,
      hsCode: "8504400000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat",
        "Deklarant"
      ],
      conditions: "HS10=8504400000 AND Importer=309887654 AND Departure=392 AND Country=392 AND Declarant=DEC-REG-008",
      totalCases: 28,
      misclassCases: 22,
      hitRate: 78,
      misclassRate: 78,
      revenueImpact: 341000,
      lift: 3.7,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8504402000",
          cases: 15,
          tax: 110000,
          pct: 68.2
        },
        {
          code: "8504401000",
          cases: 7,
          tax: 55000,
          pct: 31.8
        }
      ],
      examples: []
    },
    {
      id: "P012",
      level: 10,
      hsCode: "9403500000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat",
        "Broker",
        "Deklarant"
      ],
      conditions: "HS10=9403500000 AND Importer=310445566 AND Departure=156 AND Country=156 AND Broker=IMP-BRK03 AND Declarant=DEC-REG-002",
      totalCases: 18,
      misclassCases: 14,
      hitRate: 77,
      misclassRate: 77,
      revenueImpact: 198000,
      lift: 3.6,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "9403600000",
          cases: 9,
          tax: 48000,
          pct: 64.3
        },
        {
          code: "9403700000",
          cases: 5,
          tax: 28000,
          pct: 35.7
        }
      ],
      examples: []
    },
    {
      id: "P013",
      level: 10,
      hsCode: "8542310000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat",
        "Broker"
      ],
      conditions: "HS10=8542310000 AND Importer=311223344 AND Departure=410 AND Country=410 AND Broker=IMP-BRK02",
      totalCases: 25,
      misclassCases: 19,
      hitRate: 76,
      misclassRate: 76,
      revenueImpact: 287000,
      lift: 3.5,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8542320000",
          cases: 12,
          tax: 75000,
          pct: 63.2
        },
        {
          code: "8542390000",
          cases: 7,
          tax: 50000,
          pct: 36.8
        }
      ],
      examples: []
    },
    {
      id: "P014",
      level: 10,
      hsCode: "8471300000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat",
        "Deklarant"
      ],
      conditions: "HS10=8471300000 AND Importer=312001122 AND Departure=156 AND Country=156 AND Declarant=DEC-REG-005",
      totalCases: 30,
      misclassCases: 21,
      hitRate: 70,
      misclassRate: 70,
      revenueImpact: 256000,
      lift: 3.3,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8471411000",
          cases: 14,
          tax: 125000,
          pct: 66.7
        },
        {
          code: "8471490000",
          cases: 7,
          tax: 73000,
          pct: 33.3
        }
      ],
      examples: []
    },
    {
      id: "P015",
      level: 10,
      hsCode: "3926900000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=3926900000 AND Importer=311334455 AND Departure=156 AND Country=156",
      totalCases: 15,
      misclassCases: 8,
      hitRate: 53,
      misclassRate: 53,
      revenueImpact: 76000,
      lift: 2.5,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "3926200000",
          cases: 5,
          tax: 22000,
          pct: 62.5
        },
        {
          code: "3926909000",
          cases: 3,
          tax: 14000,
          pct: 37.5
        }
      ],
      examples: []
    }
  ],
  rules: [
    {
      id: "R001",
      name: "Po'lat quvurlar — Xitoy (306764904)",
      type: "statistical",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Mamlakat"
      ],
      condition: "HS10=7304399309 AND Importer=306764904 AND Country=156",
      hitRate: 85,
      hitRateTrend: [
        78,
        80,
        82,
        84,
        85
      ],
      falsePositive: 15,
      coverage: 8.13,
      revenueRecovered: 528000,
      activeSince: "2024-05-10",
      lastTriggered: "2025-03-12",
      flagged: 33,
      confirmed: 28
    },
    {
      id: "R002",
      name: "Po'lat quvurlar — Gonkong (308234604)",
      type: "statistical",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Mamlakat"
      ],
      condition: "HS10=7304399309 AND Importer=308234604 AND Country=344",
      hitRate: 80,
      hitRateTrend: [
        73,
        75,
        77,
        79,
        80
      ],
      falsePositive: 20,
      coverage: 7.39,
      revenueRecovered: 435000,
      activeSince: "2024-06-15",
      lastTriggered: "2025-03-10",
      flagged: 30,
      confirmed: 24
    },
    {
      id: "R003",
      name: "Qishloq xo'jalik mashinalari — Xitoy (307968499)",
      type: "statistical",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Mamlakat"
      ],
      condition: "HS10=8432800000 AND Importer=307968499 AND Country=156",
      hitRate: 87,
      hitRateTrend: [
        80,
        82,
        84,
        86,
        87
      ],
      falsePositive: 13,
      coverage: 8.13,
      revenueRecovered: 390000,
      activeSince: "2024-07-20",
      lastTriggered: "2025-03-11",
      flagged: 33,
      confirmed: 30
    },
    {
      id: "R004",
      name: "Konditsionerlar — Turkiya (306693258)",
      type: "statistical",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Mamlakat"
      ],
      condition: "HS10=8415810010 AND Importer=306693258 AND Country=792",
      hitRate: 73,
      hitRateTrend: [
        65,
        67,
        69,
        71,
        73
      ],
      falsePositive: 27,
      coverage: 2.71,
      revenueRecovered: 275000,
      activeSince: "2024-08-01",
      lastTriggered: "2025-03-09",
      flagged: 11,
      confirmed: 8
    },
    {
      id: "R005",
      name: "Qadoqlash mashinalari — Germaniya (311498197)",
      type: "statistical",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Mamlakat"
      ],
      condition: "HS10=8422300003 AND Importer=311498197 AND Country=276",
      hitRate: 70,
      hitRateTrend: [
        62,
        64,
        66,
        68,
        70
      ],
      falsePositive: 30,
      coverage: 2.46,
      revenueRecovered: 260000,
      activeSince: "2024-09-05",
      lastTriggered: "2025-03-08",
      flagged: 10,
      confirmed: 7
    },
    {
      id: "R006",
      name: "Podshipniklar — 200244767",
      type: "statistical",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Importyor"
      ],
      condition: "HS10=8483405109 AND Importer=200244767",
      hitRate: 82,
      hitRateTrend: [
        75,
        77,
        79,
        81,
        82
      ],
      falsePositive: 18,
      coverage: 4.19,
      revenueRecovered: 225000,
      activeSince: "2024-06-20",
      lastTriggered: "2025-03-07",
      flagged: 17,
      confirmed: 15
    },
    {
      id: "R007",
      name: "Qo'rg'oshin buyumlari — Koreya (200244767)",
      type: "statistical",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Mamlakat"
      ],
      condition: "HS10=7806008009 AND Importer=200244767 AND Country=410",
      hitRate: 69,
      hitRateTrend: [
        74,
        73,
        71,
        70,
        69
      ],
      falsePositive: 31,
      coverage: 4.68,
      revenueRecovered: 252000,
      activeSince: "2024-05-15",
      lastTriggered: "2025-03-06",
      flagged: 19,
      confirmed: 14
    },
    {
      id: "R008",
      name: "Trikotaj kiyimlar — Qozog'iston (200202620)",
      type: "statistical",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Mamlakat"
      ],
      condition: "HS10=6109902000 AND Importer=200202620 AND Country=398",
      hitRate: 63,
      hitRateTrend: [
        58,
        60,
        61,
        62,
        63
      ],
      falsePositive: 37,
      coverage: 2.46,
      revenueRecovered: 84000,
      activeSince: "2024-10-10",
      lastTriggered: "2025-03-05",
      flagged: 10,
      confirmed: 7
    },
    {
      id: "R009",
      name: "MHT suiiste'mol — MDB mamlakatlari",
      type: "business",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Mamlakat"
      ],
      condition: "HS6 IN [610990,721391,730429] AND Country IN [417,762,398]",
      hitRate: 56.2,
      hitRateTrend: [
        53,
        54,
        55,
        56,
        56
      ],
      falsePositive: 43.8,
      coverage: 5.2,
      revenueRecovered: 198000,
      activeSince: "2024-04-01",
      lastTriggered: "2025-03-12",
      flagged: 45,
      confirmed: 25
    },
    {
      id: "R010",
      name: "Sanktsiya tovarlar — maxsus rejim",
      type: "business",
      status: "active",
      indicators: [
        "TIF TN kod",
        "Mamlakat"
      ],
      condition: "HS4 STARTS WITH 8483 AND Country IN [156,344]",
      hitRate: 61.5,
      hitRateTrend: [
        57,
        58,
        60,
        61,
        62
      ],
      falsePositive: 38.5,
      coverage: 3.1,
      revenueRecovered: 185000,
      activeSince: "2024-03-15",
      lastTriggered: "2025-03-11",
      flagged: 26,
      confirmed: 16
    },
    {
      id: "R011",
      name: "Sabzavotlar tavsifi — import",
      type: "business",
      status: "draft",
      indicators: [
        "TIF TN kod",
        "Tovar tavsifi"
      ],
      condition: "HS4=0702 AND Description CONTAINS \"pomidor\"",
      hitRate: null,
      hitRateTrend: [],
      falsePositive: null,
      coverage: null,
      revenueRecovered: null,
      activeSince: null,
      lastTriggered: null,
      flagged: 0,
      confirmed: 0
    },
    {
      id: "R012",
      name: "Metall prokat — 2024-tarif o'zgarishi",
      type: "business",
      status: "archived",
      indicators: [
        "TIF TN kod",
        "Mamlakat"
      ],
      condition: "HS6=721041 AND Country=156",
      hitRate: 43.5,
      hitRateTrend: [
        60,
        55,
        50,
        46,
        44
      ],
      falsePositive: 56.5,
      coverage: 0.5,
      revenueRecovered: 67000,
      activeSince: "2024-02-01",
      lastTriggered: "2025-01-15",
      flagged: 23,
      confirmed: 10
    }
  ],
  ruleTypeDistribution: [
    {
      name: "Statistik",
      value: 15,
      color: "#06B6D4"
    }
  ],
  weeklyReport: {
    new: [
      "P001",
      "P003",
      "P005",
      "P014",
      "P015"
    ],
    strengthened: [
      "P002",
      "P004",
      "P006",
      "P007",
      "P010"
    ],
    weakened: [
      "P008",
      "P009",
      "P011",
      "P012",
      "P013"
    ]
  },
  network: {
    amendments_6_1y: [],
    amendments_6_3m: [
      {
        first_hs_code: "730439",
        corrected_hs_code: "730439",
        importer: "",
        country_of_origin: "",
        count: 33,
        tax_amount: 100000
      },
      {
        first_hs_code: "843280",
        corrected_hs_code: "843280",
        importer: "",
        country_of_origin: "",
        count: 20,
        tax_amount: 36000
      },
      {
        first_hs_code: "843280",
        corrected_hs_code: "843289",
        importer: "",
        country_of_origin: "",
        count: 10,
        tax_amount: 19000
      },
      {
        first_hs_code: "841581",
        corrected_hs_code: "841581",
        importer: "",
        country_of_origin: "",
        count: 11,
        tax_amount: 100000
      },
      {
        first_hs_code: "842230",
        corrected_hs_code: "842230",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 15000
      },
      {
        first_hs_code: "842230",
        corrected_hs_code: "842239",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 6000
      },
      {
        first_hs_code: "848340",
        corrected_hs_code: "848340",
        importer: "",
        country_of_origin: "",
        count: 15,
        tax_amount: 120000
      },
      {
        first_hs_code: "848310",
        corrected_hs_code: "848310",
        importer: "",
        country_of_origin: "",
        count: 9,
        tax_amount: 34000
      },
      {
        first_hs_code: "780600",
        corrected_hs_code: "780600",
        importer: "",
        country_of_origin: "",
        count: 14,
        tax_amount: 63000
      },
      {
        first_hs_code: "610990",
        corrected_hs_code: "610990",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 24000
      },
      {
        first_hs_code: "070200",
        corrected_hs_code: "070200",
        importer: "",
        country_of_origin: "",
        count: 12,
        tax_amount: 16000
      },
      {
        first_hs_code: "848790",
        corrected_hs_code: "848790",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 29000
      },
      {
        first_hs_code: "730429",
        corrected_hs_code: "730429",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 27000
      },
      {
        first_hs_code: "490700",
        corrected_hs_code: "490790",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 5000
      },
      {
        first_hs_code: "490700",
        corrected_hs_code: "490710",
        importer: "",
        country_of_origin: "",
        count: 2,
        tax_amount: 3000
      },
      {
        first_hs_code: "870421",
        corrected_hs_code: "870422",
        importer: "",
        country_of_origin: "",
        count: 22,
        tax_amount: 125000
      },
      {
        first_hs_code: "870421",
        corrected_hs_code: "870431",
        importer: "",
        country_of_origin: "",
        count: 13,
        tax_amount: 87000
      },
      {
        first_hs_code: "850440",
        corrected_hs_code: "850440",
        importer: "",
        country_of_origin: "",
        count: 22,
        tax_amount: 165000
      },
      {
        first_hs_code: "940350",
        corrected_hs_code: "940360",
        importer: "",
        country_of_origin: "",
        count: 9,
        tax_amount: 48000
      },
      {
        first_hs_code: "940350",
        corrected_hs_code: "940370",
        importer: "",
        country_of_origin: "",
        count: 5,
        tax_amount: 28000
      },
      {
        first_hs_code: "854231",
        corrected_hs_code: "854232",
        importer: "",
        country_of_origin: "",
        count: 12,
        tax_amount: 75000
      },
      {
        first_hs_code: "854231",
        corrected_hs_code: "854239",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 50000
      },
      {
        first_hs_code: "847130",
        corrected_hs_code: "847141",
        importer: "",
        country_of_origin: "",
        count: 14,
        tax_amount: 125000
      },
      {
        first_hs_code: "847130",
        corrected_hs_code: "847149",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 73000
      },
      {
        first_hs_code: "392690",
        corrected_hs_code: "392620",
        importer: "",
        country_of_origin: "",
        count: 5,
        tax_amount: 22000
      },
      {
        first_hs_code: "392690",
        corrected_hs_code: "392690",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 14000
      },
      {
        first_hs_code: "721391",
        corrected_hs_code: "721399",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 34000
      },
      {
        first_hs_code: "721391",
        corrected_hs_code: "722830",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 19000
      },
      {
        first_hs_code: "843049",
        corrected_hs_code: "843041",
        importer: "",
        country_of_origin: "",
        count: 6,
        tax_amount: 37000
      },
      {
        first_hs_code: "843049",
        corrected_hs_code: "843050",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 19000
      },
      {
        first_hs_code: "610990",
        corrected_hs_code: "610930",
        importer: "",
        country_of_origin: "",
        count: 2,
        tax_amount: 7000
      }
    ],
    amendments_10_1y: [],
    amendments_10_3m: [
      {
        first_hs_code: "7304399309",
        corrected_hs_code: "7304399301",
        importer: "",
        country_of_origin: "",
        count: 19,
        tax_amount: 58000
      },
      {
        first_hs_code: "7304399309",
        corrected_hs_code: "7304390009",
        importer: "",
        country_of_origin: "",
        count: 10,
        tax_amount: 30000
      },
      {
        first_hs_code: "7304399309",
        corrected_hs_code: "7304399100",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 12000
      },
      {
        first_hs_code: "8432800000",
        corrected_hs_code: "8432800001",
        importer: "",
        country_of_origin: "",
        count: 16,
        tax_amount: 28000
      },
      {
        first_hs_code: "8432800000",
        corrected_hs_code: "8432890000",
        importer: "",
        country_of_origin: "",
        count: 10,
        tax_amount: 19000
      },
      {
        first_hs_code: "8432800000",
        corrected_hs_code: "8432800090",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 8000
      },
      {
        first_hs_code: "8415810010",
        corrected_hs_code: "8415810001",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 62000
      },
      {
        first_hs_code: "8415810010",
        corrected_hs_code: "8415819010",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 38000
      },
      {
        first_hs_code: "8422300003",
        corrected_hs_code: "8422300001",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 15000
      },
      {
        first_hs_code: "8422300003",
        corrected_hs_code: "8422390003",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 6000
      },
      {
        first_hs_code: "8483405109",
        corrected_hs_code: "8483405101",
        importer: "",
        country_of_origin: "",
        count: 9,
        tax_amount: 72000
      },
      {
        first_hs_code: "8483405109",
        corrected_hs_code: "8483400009",
        importer: "",
        country_of_origin: "",
        count: 6,
        tax_amount: 48000
      },
      {
        first_hs_code: "8483109500",
        corrected_hs_code: "8483109501",
        importer: "",
        country_of_origin: "",
        count: 5,
        tax_amount: 19000
      },
      {
        first_hs_code: "8483109500",
        corrected_hs_code: "8483100500",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 15000
      },
      {
        first_hs_code: "7806008009",
        corrected_hs_code: "7806008001",
        importer: "",
        country_of_origin: "",
        count: 8,
        tax_amount: 35000
      },
      {
        first_hs_code: "7806008009",
        corrected_hs_code: "7806000009",
        importer: "",
        country_of_origin: "",
        count: 6,
        tax_amount: 28000
      },
      {
        first_hs_code: "6109902000",
        corrected_hs_code: "6109902001",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 14000
      },
      {
        first_hs_code: "6109902000",
        corrected_hs_code: "6109900000",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 10000
      },
      {
        first_hs_code: "0702000002",
        corrected_hs_code: "0702000001",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 9000
      },
      {
        first_hs_code: "0702000002",
        corrected_hs_code: "0702000009",
        importer: "",
        country_of_origin: "",
        count: 5,
        tax_amount: 7000
      },
      {
        first_hs_code: "8487909000",
        corrected_hs_code: "8487909001",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 17000
      },
      {
        first_hs_code: "8487909000",
        corrected_hs_code: "8487900000",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 12000
      },
      {
        first_hs_code: "7304293004",
        corrected_hs_code: "7304293001",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 16000
      },
      {
        first_hs_code: "7304293004",
        corrected_hs_code: "7304290004",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 11000
      },
      {
        first_hs_code: "4907009000",
        corrected_hs_code: "4907900000",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 5000
      },
      {
        first_hs_code: "4907009000",
        corrected_hs_code: "4907100000",
        importer: "",
        country_of_origin: "",
        count: 2,
        tax_amount: 3000
      },
      {
        first_hs_code: "8704210000",
        corrected_hs_code: "8704220000",
        importer: "",
        country_of_origin: "",
        count: 22,
        tax_amount: 125000
      },
      {
        first_hs_code: "8704210000",
        corrected_hs_code: "8704310000",
        importer: "",
        country_of_origin: "",
        count: 13,
        tax_amount: 87000
      },
      {
        first_hs_code: "8504400000",
        corrected_hs_code: "8504402000",
        importer: "",
        country_of_origin: "",
        count: 15,
        tax_amount: 110000
      },
      {
        first_hs_code: "8504400000",
        corrected_hs_code: "8504401000",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 55000
      },
      {
        first_hs_code: "9403500000",
        corrected_hs_code: "9403600000",
        importer: "",
        country_of_origin: "",
        count: 9,
        tax_amount: 48000
      },
      {
        first_hs_code: "9403500000",
        corrected_hs_code: "9403700000",
        importer: "",
        country_of_origin: "",
        count: 5,
        tax_amount: 28000
      },
      {
        first_hs_code: "8542310000",
        corrected_hs_code: "8542320000",
        importer: "",
        country_of_origin: "",
        count: 12,
        tax_amount: 75000
      },
      {
        first_hs_code: "8542310000",
        corrected_hs_code: "8542390000",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 50000
      },
      {
        first_hs_code: "8471300000",
        corrected_hs_code: "8471411000",
        importer: "",
        country_of_origin: "",
        count: 14,
        tax_amount: 125000
      },
      {
        first_hs_code: "8471300000",
        corrected_hs_code: "8471490000",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 73000
      },
      {
        first_hs_code: "3926900000",
        corrected_hs_code: "3926200000",
        importer: "",
        country_of_origin: "",
        count: 5,
        tax_amount: 22000
      },
      {
        first_hs_code: "3926900000",
        corrected_hs_code: "3926909000",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 14000
      },
      {
        first_hs_code: "7213910000",
        corrected_hs_code: "7213990000",
        importer: "",
        country_of_origin: "",
        count: 7,
        tax_amount: 34000
      },
      {
        first_hs_code: "7213910000",
        corrected_hs_code: "7228300000",
        importer: "",
        country_of_origin: "",
        count: 4,
        tax_amount: 19000
      },
      {
        first_hs_code: "8430490000",
        corrected_hs_code: "8430410000",
        importer: "",
        country_of_origin: "",
        count: 6,
        tax_amount: 37000
      },
      {
        first_hs_code: "8430490000",
        corrected_hs_code: "8430500000",
        importer: "",
        country_of_origin: "",
        count: 3,
        tax_amount: 19000
      },
      {
        first_hs_code: "6109902000",
        corrected_hs_code: "6109300000",
        importer: "",
        country_of_origin: "",
        count: 2,
        tax_amount: 7000
      }
    ],
    declarations_6_1y: [],
    declarations_6_3m: [
      {
        hs_code: "330590",
        importer: "",
        country_of_origin: "",
        count: 130
      },
      {
        hs_code: "392690",
        importer: "",
        country_of_origin: "",
        count: 220
      },
      {
        hs_code: "490700",
        importer: "",
        country_of_origin: "",
        count: 48
      },
      {
        hs_code: "610990",
        importer: "",
        country_of_origin: "",
        count: 247
      },
      {
        hs_code: "640399",
        importer: "",
        country_of_origin: "",
        count: 90
      },
      {
        hs_code: "721391",
        importer: "",
        country_of_origin: "",
        count: 156
      },
      {
        hs_code: "721399",
        importer: "",
        country_of_origin: "",
        count: 65
      },
      {
        hs_code: "730429",
        importer: "",
        country_of_origin: "",
        count: 185
      },
      {
        hs_code: "730439",
        importer: "",
        country_of_origin: "",
        count: 523
      },
      {
        hs_code: "780600",
        importer: "",
        country_of_origin: "",
        count: 65
      },
      {
        hs_code: "841581",
        importer: "",
        country_of_origin: "",
        count: 133
      },
      {
        hs_code: "842230",
        importer: "",
        country_of_origin: "",
        count: 106
      },
      {
        hs_code: "843049",
        importer: "",
        country_of_origin: "",
        count: 88
      },
      {
        hs_code: "843280",
        importer: "",
        country_of_origin: "",
        count: 256
      },
      {
        hs_code: "847130",
        importer: "",
        country_of_origin: "",
        count: 310
      },
      {
        hs_code: "847141",
        importer: "",
        country_of_origin: "",
        count: 120
      },
      {
        hs_code: "848310",
        importer: "",
        country_of_origin: "",
        count: 88
      },
      {
        hs_code: "848340",
        importer: "",
        country_of_origin: "",
        count: 164
      },
      {
        hs_code: "848790",
        importer: "",
        country_of_origin: "",
        count: 72
      },
      {
        hs_code: "850440",
        importer: "",
        country_of_origin: "",
        count: 282
      },
      {
        hs_code: "854231",
        importer: "",
        country_of_origin: "",
        count: 195
      },
      {
        hs_code: "854232",
        importer: "",
        country_of_origin: "",
        count: 78
      },
      {
        hs_code: "870421",
        importer: "",
        country_of_origin: "",
        count: 1240
      },
      {
        hs_code: "870422",
        importer: "",
        country_of_origin: "",
        count: 500
      },
      {
        hs_code: "870431",
        importer: "",
        country_of_origin: "",
        count: 215
      },
      {
        hs_code: "940350",
        importer: "",
        country_of_origin: "",
        count: 165
      },
      {
        hs_code: "070200",
        importer: "",
        country_of_origin: "",
        count: 420
      }
    ],
    declarations_10_1y: [],
    declarations_10_3m: [
      {
        hs_code: "640399",
        importer: "",
        country_of_origin: "",
        count: 0
      },
      {
        hs_code: "3305900009",
        importer: "",
        country_of_origin: "",
        count: 130
      },
      {
        hs_code: "3926900000",
        importer: "",
        country_of_origin: "",
        count: 220
      },
      {
        hs_code: "8704210000",
        importer: "",
        country_of_origin: "",
        count: 1240
      },
      {
        hs_code: "8704220000",
        importer: "",
        country_of_origin: "",
        count: 380
      },
      {
        hs_code: "8704310000",
        importer: "",
        country_of_origin: "",
        count: 215
      },
      {
        hs_code: "7304399309",
        importer: "",
        country_of_origin: "",
        count: 145
      },
      {
        hs_code: "7304390000",
        importer: "",
        country_of_origin: "",
        count: 320
      },
      {
        hs_code: "8432800000",
        importer: "",
        country_of_origin: "",
        count: 180
      },
      {
        hs_code: "8415810010",
        importer: "",
        country_of_origin: "",
        count: 95
      },
      {
        hs_code: "8422300003",
        importer: "",
        country_of_origin: "",
        count: 78
      },
      {
        hs_code: "8483405109",
        importer: "",
        country_of_origin: "",
        count: 112
      },
      {
        hs_code: "8483109500",
        importer: "",
        country_of_origin: "",
        count: 88
      },
      {
        hs_code: "7806008009",
        importer: "",
        country_of_origin: "",
        count: 65
      },
      {
        hs_code: "6109902000",
        importer: "",
        country_of_origin: "",
        count: 205
      },
      {
        hs_code: "7213910000",
        importer: "",
        country_of_origin: "",
        count: 156
      },
      {
        hs_code: "0702000002",
        importer: "",
        country_of_origin: "",
        count: 420
      },
      {
        hs_code: "8487909000",
        importer: "",
        country_of_origin: "",
        count: 72
      },
      {
        hs_code: "7304293004",
        importer: "",
        country_of_origin: "",
        count: 185
      },
      {
        hs_code: "4907009000",
        importer: "",
        country_of_origin: "",
        count: 48
      },
      {
        hs_code: "8504400000",
        importer: "",
        country_of_origin: "",
        count: 240
      },
      {
        hs_code: "9403500000",
        importer: "",
        country_of_origin: "",
        count: 165
      },
      {
        hs_code: "8542310000",
        importer: "",
        country_of_origin: "",
        count: 195
      },
      {
        hs_code: "8471300000",
        importer: "",
        country_of_origin: "",
        count: 310
      },
      {
        hs_code: "8430490000",
        importer: "",
        country_of_origin: "",
        count: 88
      },
      {
        hs_code: "6109902001",
        importer: "",
        country_of_origin: "",
        count: 42
      },
      {
        hs_code: "8704220001",
        importer: "",
        country_of_origin: "",
        count: 120
      },
      {
        hs_code: "7304399301",
        importer: "",
        country_of_origin: "",
        count: 58
      },
      {
        hs_code: "8432800001",
        importer: "",
        country_of_origin: "",
        count: 76
      },
      {
        hs_code: "8415810001",
        importer: "",
        country_of_origin: "",
        count: 38
      },
      {
        hs_code: "8422300001",
        importer: "",
        country_of_origin: "",
        count: 28
      },
      {
        hs_code: "8483405101",
        importer: "",
        country_of_origin: "",
        count: 52
      },
      {
        hs_code: "6403990001",
        importer: "",
        country_of_origin: "",
        count: 90
      },
      {
        hs_code: "7213990000",
        importer: "",
        country_of_origin: "",
        count: 65
      },
      {
        hs_code: "8504401000",
        importer: "",
        country_of_origin: "",
        count: 42
      },
      {
        hs_code: "8542320000",
        importer: "",
        country_of_origin: "",
        count: 78
      },
      {
        hs_code: "8471411000",
        importer: "",
        country_of_origin: "",
        count: 120
      }
    ]
  }
};
