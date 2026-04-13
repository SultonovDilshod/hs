window.MOCK = {
  summary: {
    totalDeclarations: 2842,
    totalInspected: 406,
    misclassifications: 289,
    activeRules: 12,
    revenueImpact: 3815000,
    avgHitRate: 66.4,
    weeklyNewPatterns: 5,
    weeklyStrengthened: 5,
    weeklyWeakened: 5,
  },
  monthlyTrend: [
    {month:'Apr 24',declarations:198,misclass:18,revenue:215000,hitRate:62},
    {month:'May 24',declarations:212,misclass:20,revenue:238000,hitRate:63},
    {month:'Jun 24',declarations:225,misclass:21,revenue:255000,hitRate:65},
    {month:'Jul 24',declarations:240,misclass:23,revenue:272000,hitRate:66},
    {month:'Aug 24',declarations:232,misclass:22,revenue:260000,hitRate:67},
    {month:'Sep 24',declarations:258,misclass:25,revenue:295000,hitRate:68},
    {month:'Oct 24',declarations:270,misclass:26,revenue:310000,hitRate:70},
    {month:'Nov 24',declarations:262,misclass:25,revenue:298000,hitRate:71},
    {month:'Dec 24',declarations:280,misclass:27,revenue:325000,hitRate:72},
    {month:'Jan 25',declarations:295,misclass:28,revenue:342000,hitRate:73},
    {month:'Feb 25',declarations:285,misclass:27,revenue:330000,hitRate:72},
    {month:'Mar 25',declarations:310,misclass:30,revenue:358000,hitRate:74},
  ],
  topSignals: [
    {id:1,hs6:'730439',country:'Xitoy (156)',hitRate:85.0,revenue:528000,cases:28,change:'+4.1%',trend:'up'},
    {id:2,hs6:'730439',country:'Gonkong (344)',hitRate:80.0,revenue:435000,cases:24,change:'+2.8%',trend:'up'},
    {id:3,hs6:'843280',country:'Xitoy (156)',hitRate:87.0,revenue:390000,cases:30,change:'+3.5%',trend:'up'},
    {id:4,hs6:'841581',country:'Turkiya (792)',hitRate:73.0,revenue:275000,cases:8,change:'+1.2%',trend:'up'},
    {id:5,hs6:'780600',country:'Koreya (410)',hitRate:69.0,revenue:252000,cases:14,change:'-1.5%',trend:'down'},
  ],
  patterns: [
    // P001 — 7304399309 + importer 306764904 + country 156 (96% fraud)
    {id:'P001',level:10,hsCode:'7304399309',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=7304399309 AND Importer=306764904 AND Country=156',misclassRate:85.0,totalCases:33,misclassCases:28,revenueImpact:528000,hitRate:85.0,period:'2024-2025',status:'new',
      actualCodes:[{code:'7304399301',pct:58,cases:19},{code:'7304390009',pct:30,cases:10},{code:'7304399100',pct:12,cases:4}],
      examples:[{declId:'DEC-2025-00142',oldHs:'7304399309',newHs:'7304399301',importer:'306764904',revenue:16000},{declId:'DEC-2025-00187',oldHs:'7304399309',newHs:'7304390009',importer:'306764904',revenue:12400}]},

    // P002 — 7304399309 + importer 308234604 + country 344 (92% fraud)
    {id:'P002',level:10,hsCode:'7304399309',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=7304399309 AND Importer=308234604 AND Country=344',misclassRate:80.0,totalCases:30,misclassCases:24,revenueImpact:435000,hitRate:80.0,period:'2024-2025',status:'strengthened',
      actualCodes:[{code:'7304399301',pct:62,cases:18},{code:'7304391009',pct:38,cases:11}],
      examples:[{declId:'DEC-2025-00298',oldHs:'7304399309',newHs:'7304399301',importer:'308234604',revenue:14500}]},

    // P003 — 8432800000 + importer 307968499 + country 156 (87% fraud)
    {id:'P003',level:10,hsCode:'8432800000',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=8432800000 AND Importer=307968499 AND Country=156',misclassRate:87.0,totalCases:33,misclassCases:30,revenueImpact:390000,hitRate:87.0,period:'2024-2025',status:'new',
      actualCodes:[{code:'8432800001',pct:53,cases:16},{code:'8432890000',pct:33,cases:10},{code:'8432800090',pct:14,cases:4}],
      examples:[{declId:'DEC-2025-00315',oldHs:'8432800000',newHs:'8432800001',importer:'307968499',revenue:13000},{declId:'DEC-2025-00334',oldHs:'8432800000',newHs:'8432890000',importer:'307968499',revenue:11200}]},

    // P004 — 8415810010 + importer 306693258 + country 792 (88% fraud)
    {id:'P004',level:10,hsCode:'8415810010',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=8415810010 AND Importer=306693258 AND Country=792',misclassRate:73.0,totalCases:11,misclassCases:8,revenueImpact:275000,hitRate:73.0,period:'2024-2025',status:'strengthened',
      actualCodes:[{code:'8415810001',pct:64,cases:7},{code:'8415819010',pct:36,cases:4}],
      examples:[{declId:'DEC-2025-00401',oldHs:'8415810010',newHs:'8415810001',importer:'306693258',revenue:25000}]},

    // P005 — 8422300003 + importer 311498197 + country 276 (88% fraud)
    {id:'P005',level:10,hsCode:'8422300003',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=8422300003 AND Importer=311498197 AND Country=276',misclassRate:70.0,totalCases:10,misclassCases:7,revenueImpact:260000,hitRate:70.0,period:'2024-2025',status:'new',
      actualCodes:[{code:'8422300001',pct:70,cases:7},{code:'8422390003',pct:30,cases:3}],
      examples:[{declId:'DEC-2025-00456',oldHs:'8422300003',newHs:'8422300001',importer:'311498197',revenue:26000}]},

    // P006 — 8483405109 + importer 200244767 (82% fraud)
    {id:'P006',level:10,hsCode:'8483405109',indicators:['HS kod','Importyor'],conditions:'HS10=8483405109 AND Importer=200244767',misclassRate:82.0,totalCases:17,misclassCases:15,revenueImpact:225000,hitRate:82.0,period:'2024-2025',status:'strengthened',
      actualCodes:[{code:'8483405101',pct:60,cases:9},{code:'8483400009',pct:40,cases:6}],
      examples:[{declId:'DEC-2025-00512',oldHs:'8483405109',newHs:'8483405101',importer:'200244767',revenue:15000}]},

    // P007 — 8483109500 + importer 305862324 (73% fraud)
    {id:'P007',level:10,hsCode:'8483109500',indicators:['HS kod','Importyor'],conditions:'HS10=8483109500 AND Importer=305862324',misclassRate:73.0,totalCases:11,misclassCases:9,revenueImpact:171000,hitRate:73.0,period:'2024-2025',status:'strengthened',
      actualCodes:[{code:'8483109501',pct:56,cases:5},{code:'8483100500',pct:44,cases:4}],
      examples:[{declId:'DEC-2025-00567',oldHs:'8483109500',newHs:'8483109501',importer:'305862324',revenue:19000}]},

    // P008 — 7806008009 + importer 200244767 + country 410 (69% fraud)
    {id:'P008',level:10,hsCode:'7806008009',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=7806008009 AND Importer=200244767 AND Country=410',misclassRate:69.0,totalCases:19,misclassCases:14,revenueImpact:252000,hitRate:69.0,period:'2024-2025',status:'weakened',
      actualCodes:[{code:'7806008001',pct:57,cases:8},{code:'7806000009',pct:43,cases:6}],
      examples:[{declId:'DEC-2025-00623',oldHs:'7806008009',newHs:'7806008001',importer:'200244767',revenue:18000}]},

    // P009 — 6109902000 + importer 200202620 + country 398 (63% fraud)
    {id:'P009',level:10,hsCode:'6109902000',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=6109902000 AND Importer=200202620 AND Country=398',misclassRate:63.0,totalCases:10,misclassCases:7,revenueImpact:84000,hitRate:63.0,period:'2024-2025',status:'weakened',
      actualCodes:[{code:'6109902001',pct:57,cases:4},{code:'6109900000',pct:43,cases:3}],
      examples:[{declId:'DEC-2025-00689',oldHs:'6109902000',newHs:'6109902001',importer:'200202620',revenue:12000}]},

    // P010 — 7213911000 + importer 310631855 + country 398 (61% fraud)
    {id:'P010',level:6,hsCode:'721391',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS6=721391 AND Importer=310631855 AND Country=398',misclassRate:61.0,totalCases:20,misclassCases:13,revenueImpact:156000,hitRate:61.0,period:'2024-2025',status:'strengthened',
      actualCodes:[{code:'721399',pct:54,cases:7},{code:'721310',pct:46,cases:6}],
      examples:[{declId:'DEC-2025-00712',oldHs:'7213911000',newHs:'7213991000',importer:'310631855',revenue:12000}]},

    // P011 — 0702000002 + importer 311270964 + country 795 (54% fraud)
    {id:'P011',level:10,hsCode:'0702000002',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=0702000002 AND Importer=311270964 AND Country=795',misclassRate:54.0,totalCases:21,misclassCases:12,revenueImpact:108000,hitRate:54.0,period:'2024-2025',status:'weakened',
      actualCodes:[{code:'0702000001',pct:58,cases:7},{code:'0702000009',pct:42,cases:5}],
      examples:[{declId:'DEC-2025-00734',oldHs:'0702000002',newHs:'0702000001',importer:'311270964',revenue:9000}]},

    // P012 — 8487909000 + importer 310490526 + country 156 (50% fraud)
    {id:'P012',level:10,hsCode:'8487909000',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=8487909000 AND Importer=310490526 AND Country=156',misclassRate:50.0,totalCases:13,misclassCases:7,revenueImpact:119000,hitRate:50.0,period:'2024-2025',status:'weakened',
      actualCodes:[{code:'8487909001',pct:57,cases:4},{code:'8487900000',pct:43,cases:3}],
      examples:[{declId:'DEC-2025-00789',oldHs:'8487909000',newHs:'8487909001',importer:'310490526',revenue:17000}]},

    // P013 — 3305900009 + importer 311716558 (50% fraud)
    {id:'P013',level:6,hsCode:'330590',indicators:['HS kod','Importyor'],conditions:'HS6=330590 AND Importer=311716558',misclassRate:50.0,totalCases:11,misclassCases:6,revenueImpact:72000,hitRate:50.0,period:'2024-2025',status:'weakened',
      actualCodes:[{code:'330591',pct:67,cases:4},{code:'330599',pct:33,cases:2}],
      examples:[{declId:'DEC-2025-00812',oldHs:'3305900009',newHs:'3305910009',importer:'311716558',revenue:12000}]},

    // P014 — 7304293004 + importer 311543774 + country 156 (42% fraud)
    {id:'P014',level:10,hsCode:'7304293004',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS10=7304293004 AND Importer=311543774 AND Country=156',misclassRate:42.0,totalCases:16,misclassCases:7,revenueImpact:112000,hitRate:42.0,period:'2024-2025',status:'new',
      actualCodes:[{code:'7304293001',pct:57,cases:4},{code:'7304290004',pct:43,cases:3}],
      examples:[{declId:'DEC-2025-00845',oldHs:'7304293004',newHs:'7304293001',importer:'311543774',revenue:16000}]},

    // P015 — 4907009000 + importer 306801374 + country 203 (42% fraud)
    {id:'P015',level:6,hsCode:'490700',indicators:['HS kod','Importyor','Mamlakat'],conditions:'HS6=490700 AND Importer=306801374 AND Country=203',misclassRate:42.0,totalCases:11,misclassCases:5,revenueImpact:55000,hitRate:42.0,period:'2024-2025',status:'new',
      actualCodes:[{code:'490790',pct:60,cases:3},{code:'490710',pct:40,cases:2}],
      examples:[{declId:'DEC-2025-00867',oldHs:'4907009000',newHs:'4907900000',importer:'306801374',revenue:11000}]},
  ],
  rules: [
    // Statistical rules derived from top patterns
    {id:'R001',name:'Po\'lat quvurlar — Xitoy (306764904)',type:'statistical',status:'active',indicators:['HS kod','Importyor','Mamlakat'],condition:'HS10=7304399309 AND Importer=306764904 AND Country=156',hitRate:85.0,hitRateTrend:[78,80,82,84,85],falsePositive:15.0,coverage:8.13,revenueRecovered:528000,activeSince:'2024-05-10',lastTriggered:'2025-03-12',flagged:33,confirmed:28},
    {id:'R002',name:'Po\'lat quvurlar — Gonkong (308234604)',type:'statistical',status:'active',indicators:['HS kod','Importyor','Mamlakat'],condition:'HS10=7304399309 AND Importer=308234604 AND Country=344',hitRate:80.0,hitRateTrend:[73,75,77,79,80],falsePositive:20.0,coverage:7.39,revenueRecovered:435000,activeSince:'2024-06-15',lastTriggered:'2025-03-10',flagged:30,confirmed:24},
    {id:'R003',name:'Qishloq xo\'jalik mashinalari — Xitoy (307968499)',type:'statistical',status:'active',indicators:['HS kod','Importyor','Mamlakat'],condition:'HS10=8432800000 AND Importer=307968499 AND Country=156',hitRate:87.0,hitRateTrend:[80,82,84,86,87],falsePositive:13.0,coverage:8.13,revenueRecovered:390000,activeSince:'2024-07-20',lastTriggered:'2025-03-11',flagged:33,confirmed:30},
    {id:'R004',name:'Konditsionerlar — Turkiya (306693258)',type:'statistical',status:'active',indicators:['HS kod','Importyor','Mamlakat'],condition:'HS10=8415810010 AND Importer=306693258 AND Country=792',hitRate:73.0,hitRateTrend:[65,67,69,71,73],falsePositive:27.0,coverage:2.71,revenueRecovered:275000,activeSince:'2024-08-01',lastTriggered:'2025-03-09',flagged:11,confirmed:8},
    {id:'R005',name:'Qadoqlash mashinalari — Germaniya (311498197)',type:'statistical',status:'active',indicators:['HS kod','Importyor','Mamlakat'],condition:'HS10=8422300003 AND Importer=311498197 AND Country=276',hitRate:70.0,hitRateTrend:[62,64,66,68,70],falsePositive:30.0,coverage:2.46,revenueRecovered:260000,activeSince:'2024-09-05',lastTriggered:'2025-03-08',flagged:10,confirmed:7},
    {id:'R006',name:'Podshipniklar — 200244767',type:'statistical',status:'active',indicators:['HS kod','Importyor'],condition:'HS10=8483405109 AND Importer=200244767',hitRate:82.0,hitRateTrend:[75,77,79,81,82],falsePositive:18.0,coverage:4.19,revenueRecovered:225000,activeSince:'2024-06-20',lastTriggered:'2025-03-07',flagged:17,confirmed:15},
    {id:'R007',name:'Qo\'rg\'oshin buyumlari — Koreya (200244767)',type:'statistical',status:'active',indicators:['HS kod','Importyor','Mamlakat'],condition:'HS10=7806008009 AND Importer=200244767 AND Country=410',hitRate:69.0,hitRateTrend:[74,73,71,70,69],falsePositive:31.0,coverage:4.68,revenueRecovered:252000,activeSince:'2024-05-15',lastTriggered:'2025-03-06',flagged:19,confirmed:14},
    {id:'R008',name:'Trikotaj kiyimlar — Qozog\'iston (200202620)',type:'statistical',status:'active',indicators:['HS kod','Importyor','Mamlakat'],condition:'HS10=6109902000 AND Importer=200202620 AND Country=398',hitRate:63.0,hitRateTrend:[58,60,61,62,63],falsePositive:37.0,coverage:2.46,revenueRecovered:84000,activeSince:'2024-10-10',lastTriggered:'2025-03-05',flagged:10,confirmed:7},
    // Business rules
    {id:'R009',name:'MHT suiiste\'mol — MDB mamlakatlari',type:'business',status:'active',indicators:['HS kod','Mamlakat'],condition:'HS6 IN [610990,721391,730429] AND Country IN [417,762,398]',hitRate:56.2,hitRateTrend:[53,54,55,56,56],falsePositive:43.8,coverage:5.2,revenueRecovered:198000,activeSince:'2024-04-01',lastTriggered:'2025-03-12',flagged:45,confirmed:25},
    {id:'R010',name:'Sanktsiya tovarlar — maxsus rejim',type:'business',status:'active',indicators:['HS kod','Mamlakat'],condition:'HS4 STARTS WITH 8483 AND Country IN [156,344]',hitRate:61.5,hitRateTrend:[57,58,60,61,62],falsePositive:38.5,coverage:3.1,revenueRecovered:185000,activeSince:'2024-03-15',lastTriggered:'2025-03-11',flagged:26,confirmed:16},
    // Draft rule
    {id:'R011',name:'Sabzavotlar tavsifi — import',type:'business',status:'draft',indicators:['HS kod','Tovar tavsifi'],condition:'HS4=0702 AND Description CONTAINS "pomidor"',hitRate:null,hitRateTrend:[],falsePositive:null,coverage:null,revenueRecovered:null,activeSince:null,lastTriggered:null,flagged:0,confirmed:0},
    // Archived rule
    {id:'R012',name:'Metall prokat — 2024-tarif o\'zgarishi',type:'business',status:'archived',indicators:['HS kod','Mamlakat'],condition:'HS6=721041 AND Country=156',hitRate:43.5,hitRateTrend:[60,55,50,46,44],falsePositive:56.5,coverage:0.5,revenueRecovered:67000,activeSince:'2024-02-01',lastTriggered:'2025-01-15',flagged:23,confirmed:10},
  ],
  ruleTypeDistribution: [
    {name:'Statistik',value:8,color:'#06B6D4'},
    {name:'Biznes',value:4,color:'rgba(6,182,212,0.5)'},
  ],
  weeklyReport: {
    new: ['P001','P003','P005','P014','P015'],
    strengthened: ['P002','P004','P006','P007','P010'],
    weakened: ['P008','P009','P011','P012','P013'],
  }
};
