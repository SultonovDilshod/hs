# Tovar kodi moduli — Noto'g'ri tasniflashni aniqlash tizimi

HS (Harmonized System / Tovar kodi) bo'yicha noto'g'ri tasniflashni aniqlash uchun React asosidagi dashboard.

## Ishga tushirish

`run.bat` ga ikki marta bosing — brauzer avtomatik `http://localhost:3000` manziliga ochiladi.

Serverni to'xtatish uchun ochilgan terminal oynasini yoping yoki `Ctrl+C` bosing.

Talablar: Node.js o'rnatilgan bo'lishi kerak (`npx` buyrug'i ishlaydigan bo'lsin).

Lokal tarmoq (boshqa qurilmalar) orqali ochish uchun `run.bat` ishga
tushganda ko'rsatiladigan `http://<IP>:3000` havolasidan foydalaning.

## Haqiqiy ma'lumotlar bilan ishlash

Platforma demo ma'lumot bilan keladi. O'z bojxona ma'lumotlaringizni
ulash uchun Excel (`.xlsx`) yoki CSV fayllarni `dashboard/data/` papkasiga
joylab, `run.bat` ni ishga tushiring. Kerakli fayllar, ustun nomlari va
to'liq izoh:

- **Qo'llanma:** [`namuna/MAʼLUMOTLAR_QOLLANMASI.md`](namuna/MA%CA%BCLUMOTLAR_QOLLANMASI.md)
- **Shablon fayllar:** `namuna/` papkasi (`patterns`, `possible_corrections`,
  `all_hs`, `pattern_summary`, `monthly_trend`, `rules`).

## Tuzilma

```
├── run.bat              Ikki marta bosib ishga tushirish
├── dashboard/           React ilovasi
│   └── data/            Bu yerga haqiqiy .xlsx / .csv fayllar joylanadi
├── namuna/              Ustun shablonlari + ma'lumotlar qo'llanmasi
├── scripts/             data.generated.js ni quruvchi skriptlar (Python/Node)
└── README.md
```
