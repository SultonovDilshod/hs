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
          pct: 58,
          cases: 19
        },
        {
          code: "7304390009",
          pct: 30,
          cases: 10
        },
        {
          code: "7304399100",
          pct: 12,
          cases: 4
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
          pct: 58,
          cases: 19
        },
        {
          code: "7304390009",
          pct: 30,
          cases: 10
        },
        {
          code: "7304399100",
          pct: 12,
          cases: 4
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
          pct: 53,
          cases: 16
        },
        {
          code: "8432890000",
          pct: 33,
          cases: 10
        },
        {
          code: "8432800090",
          pct: 14,
          cases: 4
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
          pct: 64,
          cases: 7
        },
        {
          code: "8415819010",
          pct: 36,
          cases: 4
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
          pct: 70,
          cases: 7
        },
        {
          code: "8422390003",
          pct: 30,
          cases: 3
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
      totalCases: 2,
      misclassCases: 17,
      hitRate: 1500,
      misclassRate: 1500,
      revenueImpact: 4,
      lift: 0.82,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8483405101",
          pct: 60,
          cases: 9
        },
        {
          code: "8483400009",
          pct: 40,
          cases: 6
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
      totalCases: 2,
      misclassCases: 11,
      hitRate: 900,
      misclassRate: 900,
      revenueImpact: 3.5,
      lift: 0.73,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8483109501",
          pct: 56,
          cases: 5
        },
        {
          code: "8483100500",
          pct: 44,
          cases: 4
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
      totalCases: 3,
      misclassCases: 19,
      hitRate: 1400,
      misclassRate: 1400,
      revenueImpact: 3.3,
      lift: 0.69,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "7806008001",
          pct: 57,
          cases: 8
        },
        {
          code: "7806000009",
          pct: 43,
          cases: 6
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
          pct: 57,
          cases: 4
        },
        {
          code: "6109900000",
          pct: 43,
          cases: 3
        }
      ],
      examples: []
    },
    {
      id: "P010",
      level: 6,
      hsCode: "721391",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS6=721391 AND Importer=310631855 AND Departure=398 AND Country=398",
      totalCases: 20,
      misclassCases: 13,
      hitRate: 61,
      misclassRate: 61,
      revenueImpact: 156000,
      lift: 2.9,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "721399",
          pct: 54,
          cases: 7
        },
        {
          code: "721310",
          pct: 46,
          cases: 6
        }
      ],
      examples: []
    },
    {
      id: "P011",
      level: 10,
      hsCode: "0702000002",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=0702000002 AND Importer=311270964 AND Departure=795 AND Country=795",
      totalCases: 21,
      misclassCases: 12,
      hitRate: 54,
      misclassRate: 54,
      revenueImpact: 108000,
      lift: 2.6,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "0702000001",
          pct: 58,
          cases: 7
        },
        {
          code: "0702000009",
          pct: 42,
          cases: 5
        }
      ],
      examples: []
    },
    {
      id: "P012",
      level: 10,
      hsCode: "8487909000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=8487909000 AND Importer=310490526 AND Departure=156 AND Country=156",
      totalCases: 13,
      misclassCases: 7,
      hitRate: 50,
      misclassRate: 50,
      revenueImpact: 119000,
      lift: 2.4,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8487909001",
          pct: 57,
          cases: 4
        },
        {
          code: "8487900000",
          pct: 43,
          cases: 3
        }
      ],
      examples: []
    },
    {
      id: "P013",
      level: 6,
      hsCode: "330590",
      indicators: [
        "TIF TN kod",
        "Importyor"
      ],
      conditions: "HS6=330590 AND Importer=311716558",
      totalCases: 2,
      misclassCases: 11,
      hitRate: 600,
      misclassRate: 600,
      revenueImpact: 2.3,
      lift: 0.5,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "330591",
          pct: 67,
          cases: 4
        },
        {
          code: "330599",
          pct: 33,
          cases: 2
        }
      ],
      examples: []
    },
    {
      id: "P014",
      level: 10,
      hsCode: "7304293004",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=7304293004 AND Importer=311543774 AND Departure=156 AND Country=156",
      totalCases: 16,
      misclassCases: 7,
      hitRate: 42,
      misclassRate: 42,
      revenueImpact: 112000,
      lift: 2,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "7304293001",
          pct: 57,
          cases: 4
        },
        {
          code: "7304290004",
          pct: 43,
          cases: 3
        }
      ],
      examples: []
    },
    {
      id: "P015",
      level: 6,
      hsCode: "490700",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS6=490700 AND Importer=306801374 AND Departure=203 AND Country=203",
      totalCases: 11,
      misclassCases: 5,
      hitRate: 42,
      misclassRate: 42,
      revenueImpact: 55000,
      lift: 1.9,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "490790",
          pct: 60,
          cases: 3
        },
        {
          code: "490710",
          pct: 40,
          cases: 2
        }
      ],
      examples: []
    },
    {
      id: "P016",
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
          pct: 63,
          cases: 22
        },
        {
          code: "8704310000",
          pct: 37,
          cases: 13
        }
      ],
      examples: []
    },
    {
      id: "P017",
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
          pct: 68,
          cases: 15
        },
        {
          code: "8504401000",
          pct: 32,
          cases: 7
        }
      ],
      examples: []
    },
    {
      id: "P018",
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
          pct: 64,
          cases: 9
        },
        {
          code: "9403700000",
          pct: 36,
          cases: 5
        }
      ],
      examples: []
    },
    {
      id: "P019",
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
          pct: 63,
          cases: 12
        },
        {
          code: "8542390000",
          pct: 37,
          cases: 7
        }
      ],
      examples: []
    },
    {
      id: "P020",
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
          pct: 67,
          cases: 14
        },
        {
          code: "8471490000",
          pct: 33,
          cases: 7
        }
      ],
      examples: []
    },
    {
      id: "P021",
      level: 6,
      hsCode: "640399",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS6=640399 AND Importer=306998877 AND Departure=156 AND Country=156",
      totalCases: 17,
      misclassCases: 10,
      hitRate: 59,
      misclassRate: 59,
      revenueImpact: 98000,
      lift: 2.8,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "640391",
          pct: 60,
          cases: 6
        },
        {
          code: "640351",
          pct: 40,
          cases: 4
        }
      ],
      examples: []
    },
    {
      id: "P022",
      level: 6,
      hsCode: "610990",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS6=610990 AND Importer=310112233 AND Departure=764 AND Country=764",
      totalCases: 22,
      misclassCases: 12,
      hitRate: 55,
      misclassRate: 55,
      revenueImpact: 87000,
      lift: 2.6,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "611030",
          pct: 67,
          cases: 8
        },
        {
          code: "611020",
          pct: 33,
          cases: 4
        }
      ],
      examples: []
    },
    {
      id: "P023",
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
          pct: 63,
          cases: 5
        },
        {
          code: "3926909000",
          pct: 37,
          cases: 3
        }
      ],
      examples: []
    },
    {
      id: "P024",
      level: 10,
      hsCode: "7213910000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat",
        "Broker"
      ],
      conditions: "HS10=7213910000 AND Importer=310667788 AND Departure=398 AND Country=398 AND Broker=IMP-BRK01",
      totalCases: 19,
      misclassCases: 11,
      hitRate: 58,
      misclassRate: 58,
      revenueImpact: 134000,
      lift: 2.7,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "7213990000",
          pct: 64,
          cases: 7
        },
        {
          code: "7228300000",
          pct: 36,
          cases: 4
        }
      ],
      examples: []
    },
    {
      id: "P025",
      level: 10,
      hsCode: "8430490000",
      indicators: [
        "TIF TN kod",
        "Importyor",
        "Jo'natuvchi davlat",
        "Mamlakat"
      ],
      conditions: "HS10=8430490000 AND Importer=311889900 AND Departure=156 AND Country=156",
      totalCases: 16,
      misclassCases: 9,
      hitRate: 56,
      misclassRate: 56,
      revenueImpact: 165000,
      lift: 2.6,
      period: "2024-2025",
      status: "new",
      actualCodes: [
        {
          code: "8430410000",
          pct: 67,
          cases: 6
        },
        {
          code: "8430500000",
          pct: 33,
          cases: 3
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
      value: 25,
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
    amendments_6_1y: [
      {
        first_hs_code: "870421",
        corrected_hs_code: "870422",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 14,
        tax_amount: 68000
      },
      {
        first_hs_code: "870421",
        corrected_hs_code: "870431",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 9,
        tax_amount: 42000
      },
      {
        first_hs_code: "870421",
        corrected_hs_code: "870422",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 11,
        tax_amount: 53000
      },
      {
        first_hs_code: "870422",
        corrected_hs_code: "870431",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 7,
        tax_amount: 31000
      },
      {
        first_hs_code: "870422",
        corrected_hs_code: "870421",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 5,
        tax_amount: 24000
      },
      {
        first_hs_code: "870431",
        corrected_hs_code: "870421",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 8,
        tax_amount: 39000
      },
      {
        first_hs_code: "730439",
        corrected_hs_code: "730429",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 12,
        tax_amount: 58000
      },
      {
        first_hs_code: "730439",
        corrected_hs_code: "730429",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 6,
        tax_amount: 29000
      },
      {
        first_hs_code: "730429",
        corrected_hs_code: "730439",
        importer: "IMP-005",
        country_of_origin: "410",
        count: 4,
        tax_amount: 18000
      },
      {
        first_hs_code: "843280",
        corrected_hs_code: "843049",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 10,
        tax_amount: 95000
      },
      {
        first_hs_code: "843280",
        corrected_hs_code: "848340",
        importer: "IMP-001",
        country_of_origin: "392",
        count: 6,
        tax_amount: 47000
      },
      {
        first_hs_code: "841581",
        corrected_hs_code: "842230",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 8,
        tax_amount: 62000
      },
      {
        first_hs_code: "841581",
        corrected_hs_code: "842230",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 5,
        tax_amount: 38000
      },
      {
        first_hs_code: "842230",
        corrected_hs_code: "841581",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 3,
        tax_amount: 15000
      },
      {
        first_hs_code: "848340",
        corrected_hs_code: "848310",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 9,
        tax_amount: 72000
      },
      {
        first_hs_code: "848340",
        corrected_hs_code: "848790",
        importer: "IMP-012",
        country_of_origin: "764",
        count: 4,
        tax_amount: 33000
      },
      {
        first_hs_code: "848310",
        corrected_hs_code: "848340",
        importer: "IMP-007",
        country_of_origin: "682",
        count: 6,
        tax_amount: 48000
      },
      {
        first_hs_code: "780600",
        corrected_hs_code: "721391",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 7,
        tax_amount: 35000
      },
      {
        first_hs_code: "610990",
        corrected_hs_code: "611030",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 13,
        tax_amount: 45000
      },
      {
        first_hs_code: "610990",
        corrected_hs_code: "611030",
        importer: "IMP-009",
        country_of_origin: "764",
        count: 5,
        tax_amount: 17000
      },
      {
        first_hs_code: "611030",
        corrected_hs_code: "610990",
        importer: "IMP-012",
        country_of_origin: "410",
        count: 4,
        tax_amount: 14000
      },
      {
        first_hs_code: "070200",
        corrected_hs_code: "070200",
        importer: "IMP-002",
        country_of_origin: "036",
        count: 2,
        tax_amount: 5000
      },
      {
        first_hs_code: "330590",
        corrected_hs_code: "392690",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 6,
        tax_amount: 28000
      },
      {
        first_hs_code: "490700",
        corrected_hs_code: "490700",
        importer: "IMP-004",
        country_of_origin: "276",
        count: 1,
        tax_amount: 3000
      },
      {
        first_hs_code: "854231",
        corrected_hs_code: "853710",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 10,
        tax_amount: 125000
      },
      {
        first_hs_code: "854231",
        corrected_hs_code: "853710",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 7,
        tax_amount: 87000
      },
      {
        first_hs_code: "853710",
        corrected_hs_code: "854231",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 3,
        tax_amount: 42000
      },
      {
        first_hs_code: "392690",
        corrected_hs_code: "401699",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 8,
        tax_amount: 36000
      },
      {
        first_hs_code: "401699",
        corrected_hs_code: "392690",
        importer: "IMP-001",
        country_of_origin: "764",
        count: 5,
        tax_amount: 22000
      },
      {
        first_hs_code: "690790",
        corrected_hs_code: "690790",
        importer: "IMP-006",
        country_of_origin: "156",
        count: 2,
        tax_amount: 8000
      },
      {
        first_hs_code: "847130",
        corrected_hs_code: "850440",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 9,
        tax_amount: 110000
      },
      {
        first_hs_code: "847130",
        corrected_hs_code: "850440",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 6,
        tax_amount: 73000
      },
      {
        first_hs_code: "850440",
        corrected_hs_code: "847130",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 4,
        tax_amount: 49000
      },
      {
        first_hs_code: "940350",
        corrected_hs_code: "940350",
        importer: "IMP-008",
        country_of_origin: "156",
        count: 3,
        tax_amount: 12000
      },
      {
        first_hs_code: "640399",
        corrected_hs_code: "610990",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 5,
        tax_amount: 19000
      },
      {
        first_hs_code: "720839",
        corrected_hs_code: "721391",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 7,
        tax_amount: 34000
      },
      {
        first_hs_code: "720839",
        corrected_hs_code: "780600",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 4,
        tax_amount: 21000
      },
      {
        first_hs_code: "843049",
        corrected_hs_code: "843280",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 6,
        tax_amount: 55000
      },
      {
        first_hs_code: "843049",
        corrected_hs_code: "843280",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 3,
        tax_amount: 28000
      },
      {
        first_hs_code: "848790",
        corrected_hs_code: "848340",
        importer: "IMP-003",
        country_of_origin: "682",
        count: 5,
        tax_amount: 41000
      },
      {
        first_hs_code: "721391",
        corrected_hs_code: "720839",
        importer: "IMP-010",
        country_of_origin: "156",
        count: 4,
        tax_amount: 19000
      },
      {
        first_hs_code: "721391",
        corrected_hs_code: "780600",
        importer: "IMP-001",
        country_of_origin: "036",
        count: 3,
        tax_amount: 15000
      },
      {
        first_hs_code: "330590",
        corrected_hs_code: "330590",
        importer: "IMP-011",
        country_of_origin: "356",
        count: 2,
        tax_amount: 7000
      },
      {
        first_hs_code: "870421",
        corrected_hs_code: "870422",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 6,
        tax_amount: 29000
      },
      {
        first_hs_code: "854231",
        corrected_hs_code: "850440",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 5,
        tax_amount: 65000
      },
      {
        first_hs_code: "841581",
        corrected_hs_code: "848310",
        importer: "IMP-003",
        country_of_origin: "410",
        count: 4,
        tax_amount: 32000
      },
      {
        first_hs_code: "610990",
        corrected_hs_code: "640399",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 3,
        tax_amount: 11000
      },
      {
        first_hs_code: "730439",
        corrected_hs_code: "720839",
        importer: "IMP-012",
        country_of_origin: "276",
        count: 5,
        tax_amount: 24000
      },
      {
        first_hs_code: "392690",
        corrected_hs_code: "330590",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 4,
        tax_amount: 16000
      },
      {
        first_hs_code: "847130",
        corrected_hs_code: "843280",
        importer: "IMP-003",
        country_of_origin: "840",
        count: 3,
        tax_amount: 38000
      }
    ],
    amendments_6_3m: [
      {
        first_hs_code: "870421",
        corrected_hs_code: "870422",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 4,
        tax_amount: 19000
      },
      {
        first_hs_code: "870421",
        corrected_hs_code: "870431",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 3,
        tax_amount: 14000
      },
      {
        first_hs_code: "870421",
        corrected_hs_code: "870422",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 3,
        tax_amount: 15000
      },
      {
        first_hs_code: "870422",
        corrected_hs_code: "870431",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 2,
        tax_amount: 9000
      },
      {
        first_hs_code: "870431",
        corrected_hs_code: "870421",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "730439",
        corrected_hs_code: "730429",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 4,
        tax_amount: 19000
      },
      {
        first_hs_code: "730439",
        corrected_hs_code: "730429",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "843280",
        corrected_hs_code: "843049",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 3,
        tax_amount: 28000
      },
      {
        first_hs_code: "843280",
        corrected_hs_code: "848340",
        importer: "IMP-001",
        country_of_origin: "392",
        count: 2,
        tax_amount: 16000
      },
      {
        first_hs_code: "841581",
        corrected_hs_code: "842230",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 2,
        tax_amount: 16000
      },
      {
        first_hs_code: "848340",
        corrected_hs_code: "848310",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 3,
        tax_amount: 24000
      },
      {
        first_hs_code: "610990",
        corrected_hs_code: "611030",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 4,
        tax_amount: 14000
      },
      {
        first_hs_code: "610990",
        corrected_hs_code: "611030",
        importer: "IMP-009",
        country_of_origin: "764",
        count: 2,
        tax_amount: 7000
      },
      {
        first_hs_code: "854231",
        corrected_hs_code: "853710",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 3,
        tax_amount: 38000
      },
      {
        first_hs_code: "854231",
        corrected_hs_code: "853710",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 2,
        tax_amount: 25000
      },
      {
        first_hs_code: "392690",
        corrected_hs_code: "401699",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 2,
        tax_amount: 9000
      },
      {
        first_hs_code: "847130",
        corrected_hs_code: "850440",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 3,
        tax_amount: 37000
      },
      {
        first_hs_code: "847130",
        corrected_hs_code: "850440",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 2,
        tax_amount: 24000
      },
      {
        first_hs_code: "640399",
        corrected_hs_code: "610990",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 2,
        tax_amount: 7000
      },
      {
        first_hs_code: "720839",
        corrected_hs_code: "721391",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "780600",
        corrected_hs_code: "721391",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "843049",
        corrected_hs_code: "843280",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 2,
        tax_amount: 18000
      },
      {
        first_hs_code: "848790",
        corrected_hs_code: "848340",
        importer: "IMP-003",
        country_of_origin: "682",
        count: 2,
        tax_amount: 17000
      },
      {
        first_hs_code: "850440",
        corrected_hs_code: "847130",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 1,
        tax_amount: 12000
      },
      {
        first_hs_code: "330590",
        corrected_hs_code: "392690",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 2,
        tax_amount: 9000
      }
    ],
    amendments_10_1y: [
      {
        first_hs_code: "8704210001",
        corrected_hs_code: "8704220001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 8,
        tax_amount: 39000
      },
      {
        first_hs_code: "8704210001",
        corrected_hs_code: "8704220002",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 5,
        tax_amount: 24000
      },
      {
        first_hs_code: "8704210002",
        corrected_hs_code: "8704220001",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 6,
        tax_amount: 29000
      },
      {
        first_hs_code: "8704210002",
        corrected_hs_code: "8704310001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 4,
        tax_amount: 18000
      },
      {
        first_hs_code: "8704220001",
        corrected_hs_code: "8704310001",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 5,
        tax_amount: 22000
      },
      {
        first_hs_code: "8704220002",
        corrected_hs_code: "8704210001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 3,
        tax_amount: 15000
      },
      {
        first_hs_code: "8704310001",
        corrected_hs_code: "8704210001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 5,
        tax_amount: 24000
      },
      {
        first_hs_code: "8704310002",
        corrected_hs_code: "8704210002",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 3,
        tax_amount: 14000
      },
      {
        first_hs_code: "7304390001",
        corrected_hs_code: "7304290001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 7,
        tax_amount: 34000
      },
      {
        first_hs_code: "7304390002",
        corrected_hs_code: "7304290001",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 4,
        tax_amount: 19000
      },
      {
        first_hs_code: "7304390001",
        corrected_hs_code: "7304290002",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 3,
        tax_amount: 15000
      },
      {
        first_hs_code: "7304290001",
        corrected_hs_code: "7304390001",
        importer: "IMP-005",
        country_of_origin: "410",
        count: 3,
        tax_amount: 13000
      },
      {
        first_hs_code: "8432800001",
        corrected_hs_code: "8430490001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 6,
        tax_amount: 57000
      },
      {
        first_hs_code: "8432800002",
        corrected_hs_code: "8483400001",
        importer: "IMP-001",
        country_of_origin: "392",
        count: 4,
        tax_amount: 31000
      },
      {
        first_hs_code: "8432800001",
        corrected_hs_code: "8483400002",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 3,
        tax_amount: 28000
      },
      {
        first_hs_code: "8415810001",
        corrected_hs_code: "8422300001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 5,
        tax_amount: 39000
      },
      {
        first_hs_code: "8415810002",
        corrected_hs_code: "8422300001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 3,
        tax_amount: 23000
      },
      {
        first_hs_code: "8422300001",
        corrected_hs_code: "8415810001",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "8483400001",
        corrected_hs_code: "8483100001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 6,
        tax_amount: 48000
      },
      {
        first_hs_code: "8483400002",
        corrected_hs_code: "8487900001",
        importer: "IMP-012",
        country_of_origin: "764",
        count: 3,
        tax_amount: 25000
      },
      {
        first_hs_code: "8483100001",
        corrected_hs_code: "8483400001",
        importer: "IMP-007",
        country_of_origin: "682",
        count: 4,
        tax_amount: 32000
      },
      {
        first_hs_code: "7806000001",
        corrected_hs_code: "7213910001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 5,
        tax_amount: 25000
      },
      {
        first_hs_code: "6109900001",
        corrected_hs_code: "6110300001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 7,
        tax_amount: 24000
      },
      {
        first_hs_code: "6109900002",
        corrected_hs_code: "6110300001",
        importer: "IMP-009",
        country_of_origin: "764",
        count: 4,
        tax_amount: 14000
      },
      {
        first_hs_code: "6110300001",
        corrected_hs_code: "6109900001",
        importer: "IMP-012",
        country_of_origin: "410",
        count: 3,
        tax_amount: 10000
      },
      {
        first_hs_code: "6109900001",
        corrected_hs_code: "6110300002",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 3,
        tax_amount: 11000
      },
      {
        first_hs_code: "3305900001",
        corrected_hs_code: "3926900001",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 4,
        tax_amount: 19000
      },
      {
        first_hs_code: "8542310001",
        corrected_hs_code: "8537100001",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 6,
        tax_amount: 75000
      },
      {
        first_hs_code: "8542310002",
        corrected_hs_code: "8537100001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 4,
        tax_amount: 50000
      },
      {
        first_hs_code: "8537100001",
        corrected_hs_code: "8542310001",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 2,
        tax_amount: 28000
      },
      {
        first_hs_code: "3926900001",
        corrected_hs_code: "4016990001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 5,
        tax_amount: 22000
      },
      {
        first_hs_code: "4016990001",
        corrected_hs_code: "3926900001",
        importer: "IMP-001",
        country_of_origin: "764",
        count: 3,
        tax_amount: 14000
      },
      {
        first_hs_code: "8471300001",
        corrected_hs_code: "8504400001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 5,
        tax_amount: 62000
      },
      {
        first_hs_code: "8471300002",
        corrected_hs_code: "8504400001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 4,
        tax_amount: 48000
      },
      {
        first_hs_code: "8504400001",
        corrected_hs_code: "8471300001",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 3,
        tax_amount: 37000
      },
      {
        first_hs_code: "6403990001",
        corrected_hs_code: "6109900001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 3,
        tax_amount: 12000
      },
      {
        first_hs_code: "7208390001",
        corrected_hs_code: "7213910001",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 4,
        tax_amount: 20000
      },
      {
        first_hs_code: "7208390001",
        corrected_hs_code: "7806000001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 3,
        tax_amount: 16000
      },
      {
        first_hs_code: "8430490001",
        corrected_hs_code: "8432800001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 4,
        tax_amount: 37000
      },
      {
        first_hs_code: "8487900001",
        corrected_hs_code: "8483400001",
        importer: "IMP-003",
        country_of_origin: "682",
        count: 3,
        tax_amount: 25000
      },
      {
        first_hs_code: "7213910001",
        corrected_hs_code: "7208390001",
        importer: "IMP-010",
        country_of_origin: "156",
        count: 3,
        tax_amount: 14000
      },
      {
        first_hs_code: "8542310001",
        corrected_hs_code: "8504400001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 3,
        tax_amount: 39000
      },
      {
        first_hs_code: "8415810001",
        corrected_hs_code: "8483100001",
        importer: "IMP-003",
        country_of_origin: "410",
        count: 3,
        tax_amount: 24000
      },
      {
        first_hs_code: "6109900002",
        corrected_hs_code: "6403990001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 2,
        tax_amount: 8000
      },
      {
        first_hs_code: "7304390002",
        corrected_hs_code: "7208390001",
        importer: "IMP-012",
        country_of_origin: "276",
        count: 3,
        tax_amount: 15000
      },
      {
        first_hs_code: "3926900001",
        corrected_hs_code: "3305900001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 2,
        tax_amount: 9000
      },
      {
        first_hs_code: "8471300001",
        corrected_hs_code: "8432800001",
        importer: "IMP-003",
        country_of_origin: "840",
        count: 2,
        tax_amount: 25000
      },
      {
        first_hs_code: "9403500001",
        corrected_hs_code: "9403500002",
        importer: "IMP-008",
        country_of_origin: "156",
        count: 2,
        tax_amount: 8000
      },
      {
        first_hs_code: "6907900001",
        corrected_hs_code: "6907900002",
        importer: "IMP-006",
        country_of_origin: "156",
        count: 2,
        tax_amount: 6000
      },
      {
        first_hs_code: "4907000001",
        corrected_hs_code: "4907000002",
        importer: "IMP-004",
        country_of_origin: "276",
        count: 1,
        tax_amount: 2000
      }
    ],
    amendments_10_3m: [
      {
        first_hs_code: "8704210001",
        corrected_hs_code: "8704220001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "8704210001",
        corrected_hs_code: "8704220002",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 2,
        tax_amount: 9000
      },
      {
        first_hs_code: "8704210002",
        corrected_hs_code: "8704220001",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "8704220001",
        corrected_hs_code: "8704310001",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 2,
        tax_amount: 8000
      },
      {
        first_hs_code: "7304390001",
        corrected_hs_code: "7304290001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "8432800001",
        corrected_hs_code: "8430490001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 2,
        tax_amount: 19000
      },
      {
        first_hs_code: "8415810001",
        corrected_hs_code: "8422300001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 2,
        tax_amount: 16000
      },
      {
        first_hs_code: "8483400001",
        corrected_hs_code: "8483100001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 2,
        tax_amount: 16000
      },
      {
        first_hs_code: "6109900001",
        corrected_hs_code: "6110300001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 2,
        tax_amount: 7000
      },
      {
        first_hs_code: "6109900002",
        corrected_hs_code: "6110300001",
        importer: "IMP-009",
        country_of_origin: "764",
        count: 1,
        tax_amount: 4000
      },
      {
        first_hs_code: "8542310001",
        corrected_hs_code: "8537100001",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 2,
        tax_amount: 25000
      },
      {
        first_hs_code: "8542310002",
        corrected_hs_code: "8537100001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 1,
        tax_amount: 13000
      },
      {
        first_hs_code: "3926900001",
        corrected_hs_code: "4016990001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 2,
        tax_amount: 9000
      },
      {
        first_hs_code: "8471300001",
        corrected_hs_code: "8504400001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 2,
        tax_amount: 24000
      },
      {
        first_hs_code: "8471300002",
        corrected_hs_code: "8504400001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 1,
        tax_amount: 12000
      },
      {
        first_hs_code: "6403990001",
        corrected_hs_code: "6109900001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 1,
        tax_amount: 4000
      },
      {
        first_hs_code: "7208390001",
        corrected_hs_code: "7213910001",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 1,
        tax_amount: 5000
      },
      {
        first_hs_code: "8430490001",
        corrected_hs_code: "8432800001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 1,
        tax_amount: 9000
      },
      {
        first_hs_code: "8487900001",
        corrected_hs_code: "8483400001",
        importer: "IMP-003",
        country_of_origin: "682",
        count: 1,
        tax_amount: 8000
      },
      {
        first_hs_code: "7806000001",
        corrected_hs_code: "7213910001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 2,
        tax_amount: 10000
      },
      {
        first_hs_code: "3305900001",
        corrected_hs_code: "3926900001",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 1,
        tax_amount: 5000
      },
      {
        first_hs_code: "8504400001",
        corrected_hs_code: "8471300001",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 1,
        tax_amount: 9000
      },
      {
        first_hs_code: "8432800002",
        corrected_hs_code: "8483400001",
        importer: "IMP-001",
        country_of_origin: "392",
        count: 1,
        tax_amount: 8000
      },
      {
        first_hs_code: "7304390002",
        corrected_hs_code: "7304290001",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 1,
        tax_amount: 5000
      },
      {
        first_hs_code: "8537100001",
        corrected_hs_code: "8542310001",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 1,
        tax_amount: 14000
      }
    ],
    declarations_6_1y: [
      {
        hs_code: "870421",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 85
      },
      {
        hs_code: "870421",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 62
      },
      {
        hs_code: "870421",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 74
      },
      {
        hs_code: "870421",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 48
      },
      {
        hs_code: "870422",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 56
      },
      {
        hs_code: "870422",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 42
      },
      {
        hs_code: "870422",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 38
      },
      {
        hs_code: "870431",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 65
      },
      {
        hs_code: "870431",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 43
      },
      {
        hs_code: "730439",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 78
      },
      {
        hs_code: "730439",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 52
      },
      {
        hs_code: "730439",
        importer: "IMP-012",
        country_of_origin: "276",
        count: 35
      },
      {
        hs_code: "730429",
        importer: "IMP-005",
        country_of_origin: "410",
        count: 41
      },
      {
        hs_code: "730429",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 60
      },
      {
        hs_code: "843280",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 70
      },
      {
        hs_code: "843280",
        importer: "IMP-001",
        country_of_origin: "392",
        count: 45
      },
      {
        hs_code: "843280",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 33
      },
      {
        hs_code: "841581",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 55
      },
      {
        hs_code: "841581",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 40
      },
      {
        hs_code: "841581",
        importer: "IMP-003",
        country_of_origin: "410",
        count: 38
      },
      {
        hs_code: "842230",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 36
      },
      {
        hs_code: "842230",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 48
      },
      {
        hs_code: "848340",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 62
      },
      {
        hs_code: "848340",
        importer: "IMP-012",
        country_of_origin: "764",
        count: 35
      },
      {
        hs_code: "848340",
        importer: "IMP-007",
        country_of_origin: "682",
        count: 41
      },
      {
        hs_code: "848310",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 50
      },
      {
        hs_code: "848310",
        importer: "IMP-007",
        country_of_origin: "682",
        count: 38
      },
      {
        hs_code: "780600",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 44
      },
      {
        hs_code: "721391",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 48
      },
      {
        hs_code: "721391",
        importer: "IMP-010",
        country_of_origin: "156",
        count: 37
      },
      {
        hs_code: "721391",
        importer: "IMP-001",
        country_of_origin: "036",
        count: 29
      },
      {
        hs_code: "610990",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 90
      },
      {
        hs_code: "610990",
        importer: "IMP-009",
        country_of_origin: "764",
        count: 42
      },
      {
        hs_code: "610990",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 55
      },
      {
        hs_code: "611030",
        importer: "IMP-012",
        country_of_origin: "410",
        count: 38
      },
      {
        hs_code: "611030",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 52
      },
      {
        hs_code: "070200",
        importer: "IMP-002",
        country_of_origin: "036",
        count: 30
      },
      {
        hs_code: "330590",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 45
      },
      {
        hs_code: "330590",
        importer: "IMP-011",
        country_of_origin: "356",
        count: 28
      },
      {
        hs_code: "490700",
        importer: "IMP-004",
        country_of_origin: "276",
        count: 22
      },
      {
        hs_code: "854231",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 65
      },
      {
        hs_code: "854231",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 50
      },
      {
        hs_code: "854231",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 42
      },
      {
        hs_code: "853710",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 35
      },
      {
        hs_code: "392690",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 55
      },
      {
        hs_code: "392690",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 40
      },
      {
        hs_code: "392690",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 47
      },
      {
        hs_code: "401699",
        importer: "IMP-001",
        country_of_origin: "764",
        count: 38
      },
      {
        hs_code: "401699",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 33
      },
      {
        hs_code: "690790",
        importer: "IMP-006",
        country_of_origin: "156",
        count: 26
      },
      {
        hs_code: "847130",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 58
      },
      {
        hs_code: "847130",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 45
      },
      {
        hs_code: "847130",
        importer: "IMP-003",
        country_of_origin: "840",
        count: 32
      },
      {
        hs_code: "850440",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 40
      },
      {
        hs_code: "850440",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 52
      },
      {
        hs_code: "940350",
        importer: "IMP-008",
        country_of_origin: "156",
        count: 35
      },
      {
        hs_code: "640399",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 42
      },
      {
        hs_code: "720839",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 50
      },
      {
        hs_code: "720839",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 38
      },
      {
        hs_code: "843049",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 44
      },
      {
        hs_code: "843049",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 36
      },
      {
        hs_code: "848790",
        importer: "IMP-003",
        country_of_origin: "682",
        count: 40
      },
      {
        hs_code: "780600",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 30
      },
      {
        hs_code: "843280",
        importer: "IMP-012",
        country_of_origin: "764",
        count: 28
      },
      {
        hs_code: "841581",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 47
      },
      {
        hs_code: "854231",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 30
      },
      {
        hs_code: "610990",
        importer: "IMP-012",
        country_of_origin: "410",
        count: 35
      },
      {
        hs_code: "730429",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 33
      },
      {
        hs_code: "870421",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 40
      },
      {
        hs_code: "848340",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 45
      },
      {
        hs_code: "847130",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 38
      },
      {
        hs_code: "850440",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 43
      },
      {
        hs_code: "640399",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 32
      },
      {
        hs_code: "611030",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 40
      },
      {
        hs_code: "842230",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 34
      }
    ],
    declarations_6_3m: [
      {
        hs_code: "870421",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 22
      },
      {
        hs_code: "870421",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 16
      },
      {
        hs_code: "870421",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 19
      },
      {
        hs_code: "870422",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 15
      },
      {
        hs_code: "870431",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 17
      },
      {
        hs_code: "730439",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 20
      },
      {
        hs_code: "730439",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 14
      },
      {
        hs_code: "843280",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 18
      },
      {
        hs_code: "843280",
        importer: "IMP-001",
        country_of_origin: "392",
        count: 12
      },
      {
        hs_code: "841581",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 14
      },
      {
        hs_code: "848340",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 16
      },
      {
        hs_code: "610990",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 23
      },
      {
        hs_code: "610990",
        importer: "IMP-009",
        country_of_origin: "764",
        count: 11
      },
      {
        hs_code: "854231",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 17
      },
      {
        hs_code: "854231",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 13
      },
      {
        hs_code: "392690",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 14
      },
      {
        hs_code: "847130",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 15
      },
      {
        hs_code: "847130",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 12
      },
      {
        hs_code: "640399",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 11
      },
      {
        hs_code: "720839",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 13
      },
      {
        hs_code: "780600",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 12
      },
      {
        hs_code: "843049",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 12
      },
      {
        hs_code: "848790",
        importer: "IMP-003",
        country_of_origin: "682",
        count: 10
      },
      {
        hs_code: "850440",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 10
      },
      {
        hs_code: "330590",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 12
      },
      {
        hs_code: "611030",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 14
      },
      {
        hs_code: "853710",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 9
      },
      {
        hs_code: "730429",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 15
      },
      {
        hs_code: "842230",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 12
      },
      {
        hs_code: "848310",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 13
      },
      {
        hs_code: "401699",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 9
      },
      {
        hs_code: "721391",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 12
      },
      {
        hs_code: "870421",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 12
      },
      {
        hs_code: "843280",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 9
      },
      {
        hs_code: "841581",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 10
      },
      {
        hs_code: "610990",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 14
      },
      {
        hs_code: "854231",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 8
      },
      {
        hs_code: "392690",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 10
      },
      {
        hs_code: "847130",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 10
      },
      {
        hs_code: "850440",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 13
      }
    ],
    declarations_10_1y: [
      {
        hs_code: "8704210001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 45
      },
      {
        hs_code: "8704210001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 33
      },
      {
        hs_code: "8704210002",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 40
      },
      {
        hs_code: "8704210002",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 28
      },
      {
        hs_code: "8704210002",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 35
      },
      {
        hs_code: "8704220001",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 30
      },
      {
        hs_code: "8704220001",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 25
      },
      {
        hs_code: "8704220002",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 22
      },
      {
        hs_code: "8704220002",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 20
      },
      {
        hs_code: "8704310001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 35
      },
      {
        hs_code: "8704310001",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 28
      },
      {
        hs_code: "8704310002",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 25
      },
      {
        hs_code: "7304390001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 42
      },
      {
        hs_code: "7304390001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 20
      },
      {
        hs_code: "7304390002",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 28
      },
      {
        hs_code: "7304390002",
        importer: "IMP-012",
        country_of_origin: "276",
        count: 18
      },
      {
        hs_code: "7304290001",
        importer: "IMP-005",
        country_of_origin: "410",
        count: 24
      },
      {
        hs_code: "7304290001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 32
      },
      {
        hs_code: "7304290002",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 18
      },
      {
        hs_code: "8432800001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 38
      },
      {
        hs_code: "8432800001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 22
      },
      {
        hs_code: "8432800002",
        importer: "IMP-001",
        country_of_origin: "392",
        count: 25
      },
      {
        hs_code: "8415810001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 30
      },
      {
        hs_code: "8415810001",
        importer: "IMP-003",
        country_of_origin: "410",
        count: 22
      },
      {
        hs_code: "8415810002",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 24
      },
      {
        hs_code: "8422300001",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 20
      },
      {
        hs_code: "8422300001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 28
      },
      {
        hs_code: "8483400001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 35
      },
      {
        hs_code: "8483400001",
        importer: "IMP-007",
        country_of_origin: "682",
        count: 22
      },
      {
        hs_code: "8483400002",
        importer: "IMP-012",
        country_of_origin: "764",
        count: 20
      },
      {
        hs_code: "8483100001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 28
      },
      {
        hs_code: "8483100001",
        importer: "IMP-007",
        country_of_origin: "682",
        count: 22
      },
      {
        hs_code: "7806000001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 26
      },
      {
        hs_code: "6109900001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 48
      },
      {
        hs_code: "6109900001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 30
      },
      {
        hs_code: "6109900002",
        importer: "IMP-009",
        country_of_origin: "764",
        count: 25
      },
      {
        hs_code: "6109900002",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 20
      },
      {
        hs_code: "6110300001",
        importer: "IMP-012",
        country_of_origin: "410",
        count: 22
      },
      {
        hs_code: "6110300001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 30
      },
      {
        hs_code: "6110300002",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 18
      },
      {
        hs_code: "3305900001",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 25
      },
      {
        hs_code: "8542310001",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 35
      },
      {
        hs_code: "8542310001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 28
      },
      {
        hs_code: "8542310002",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 28
      },
      {
        hs_code: "8537100001",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 22
      },
      {
        hs_code: "3926900001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 30
      },
      {
        hs_code: "3926900001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 26
      },
      {
        hs_code: "3926900001",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 22
      },
      {
        hs_code: "4016990001",
        importer: "IMP-001",
        country_of_origin: "764",
        count: 22
      },
      {
        hs_code: "4016990001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 18
      },
      {
        hs_code: "8471300001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 32
      },
      {
        hs_code: "8471300001",
        importer: "IMP-003",
        country_of_origin: "840",
        count: 20
      },
      {
        hs_code: "8471300002",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 25
      },
      {
        hs_code: "8504400001",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 24
      },
      {
        hs_code: "8504400001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 30
      },
      {
        hs_code: "6403990001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 24
      },
      {
        hs_code: "6403990001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 18
      },
      {
        hs_code: "7208390001",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 28
      },
      {
        hs_code: "7208390001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 22
      },
      {
        hs_code: "8430490001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 26
      },
      {
        hs_code: "8430490001",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 20
      },
      {
        hs_code: "8487900001",
        importer: "IMP-003",
        country_of_origin: "682",
        count: 22
      },
      {
        hs_code: "7213910001",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 28
      },
      {
        hs_code: "7213910001",
        importer: "IMP-010",
        country_of_origin: "156",
        count: 22
      },
      {
        hs_code: "7213910001",
        importer: "IMP-001",
        country_of_origin: "036",
        count: 18
      },
      {
        hs_code: "9403500001",
        importer: "IMP-008",
        country_of_origin: "156",
        count: 20
      },
      {
        hs_code: "9403500002",
        importer: "IMP-008",
        country_of_origin: "156",
        count: 18
      },
      {
        hs_code: "6907900001",
        importer: "IMP-006",
        country_of_origin: "156",
        count: 16
      },
      {
        hs_code: "6907900002",
        importer: "IMP-006",
        country_of_origin: "156",
        count: 14
      },
      {
        hs_code: "4907000001",
        importer: "IMP-004",
        country_of_origin: "276",
        count: 12
      },
      {
        hs_code: "4907000002",
        importer: "IMP-004",
        country_of_origin: "276",
        count: 10
      },
      {
        hs_code: "0702000001",
        importer: "IMP-002",
        country_of_origin: "036",
        count: 18
      },
      {
        hs_code: "8504400001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 25
      },
      {
        hs_code: "8483400001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 26
      },
      {
        hs_code: "8432800001",
        importer: "IMP-012",
        country_of_origin: "764",
        count: 16
      }
    ],
    declarations_10_3m: [
      {
        hs_code: "8704210001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 12
      },
      {
        hs_code: "8704210001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 9
      },
      {
        hs_code: "8704210002",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 10
      },
      {
        hs_code: "8704220001",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 8
      },
      {
        hs_code: "8704220001",
        importer: "IMP-007",
        country_of_origin: "410",
        count: 7
      },
      {
        hs_code: "8704220002",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 6
      },
      {
        hs_code: "8704310001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 9
      },
      {
        hs_code: "8704310001",
        importer: "IMP-001",
        country_of_origin: "276",
        count: 7
      },
      {
        hs_code: "7304390001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 11
      },
      {
        hs_code: "7304390002",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 7
      },
      {
        hs_code: "7304290001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 8
      },
      {
        hs_code: "8432800001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 10
      },
      {
        hs_code: "8432800002",
        importer: "IMP-001",
        country_of_origin: "392",
        count: 7
      },
      {
        hs_code: "8415810001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 8
      },
      {
        hs_code: "8422300001",
        importer: "IMP-012",
        country_of_origin: "840",
        count: 7
      },
      {
        hs_code: "8483400001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 9
      },
      {
        hs_code: "8483100001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 7
      },
      {
        hs_code: "6109900001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 13
      },
      {
        hs_code: "6109900002",
        importer: "IMP-009",
        country_of_origin: "764",
        count: 7
      },
      {
        hs_code: "6110300001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 8
      },
      {
        hs_code: "6110300001",
        importer: "IMP-012",
        country_of_origin: "410",
        count: 6
      },
      {
        hs_code: "8542310001",
        importer: "IMP-001",
        country_of_origin: "410",
        count: 9
      },
      {
        hs_code: "8542310002",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 7
      },
      {
        hs_code: "8537100001",
        importer: "IMP-007",
        country_of_origin: "840",
        count: 6
      },
      {
        hs_code: "3926900001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 8
      },
      {
        hs_code: "4016990001",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 5
      },
      {
        hs_code: "8471300001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 8
      },
      {
        hs_code: "8471300002",
        importer: "IMP-012",
        country_of_origin: "156",
        count: 7
      },
      {
        hs_code: "8504400001",
        importer: "IMP-007",
        country_of_origin: "276",
        count: 6
      },
      {
        hs_code: "8504400001",
        importer: "IMP-003",
        country_of_origin: "392",
        count: 8
      },
      {
        hs_code: "6403990001",
        importer: "IMP-001",
        country_of_origin: "156",
        count: 6
      },
      {
        hs_code: "7208390001",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 7
      },
      {
        hs_code: "8430490001",
        importer: "IMP-007",
        country_of_origin: "156",
        count: 7
      },
      {
        hs_code: "8487900001",
        importer: "IMP-003",
        country_of_origin: "682",
        count: 6
      },
      {
        hs_code: "7806000001",
        importer: "IMP-003",
        country_of_origin: "156",
        count: 7
      },
      {
        hs_code: "7213910001",
        importer: "IMP-003",
        country_of_origin: "276",
        count: 7
      },
      {
        hs_code: "3305900001",
        importer: "IMP-005",
        country_of_origin: "156",
        count: 7
      },
      {
        hs_code: "9403500001",
        importer: "IMP-008",
        country_of_origin: "156",
        count: 5
      },
      {
        hs_code: "6907900001",
        importer: "IMP-006",
        country_of_origin: "156",
        count: 4
      },
      {
        hs_code: "4907000001",
        importer: "IMP-004",
        country_of_origin: "276",
        count: 3
      }
    ]
  }
};
