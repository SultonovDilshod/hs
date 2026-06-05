# Haqiqiy ma'lumotlar bilan ishlash — qo'llanma

Bu platforma **demo** ma'lumot bilan keladi. Haqiqiy bojxona ma'lumotlaringiz
bilan ishlatish uchun ma'lumotlarni **Excel (`.xlsx`)** yoki **CSV (`.csv`)**
fayllarda, quyida ko'rsatilgan **aniq ustun nomlari** bilan tayyorlab,
`dashboard/data/` papkasiga joylashtirasiz va `run.bat` ni ishga tushirasiz.

`run.bat` har safar ishga tushganda shu fayllardan
`dashboard/data.generated.js` ni qayta quradi va dashboard yangilanadi.

---

## 1. Tezkor yo'riqnoma

1. `namuna/` papkasidagi shablon fayllarni oching (ular kerakli ustunlarni
   ko'rsatadi).
2. Har bir faylni o'z haqiqiy ma'lumotingiz bilan to'ldiring. Excelda
   to'ldirsangiz **`.xlsx`** ko'rinishida saqlang (yoki **CSV UTF-8**).
3. Tayyor fayllarni **`dashboard/data/`** papkasiga joylashtiring. Fayl nomlari
   aniq quyidagicha bo'lishi shart (kengaytma `.xlsx` yoki `.csv`):
   - `patterns` (majburiy — asosiy)
   - `possible_corrections`
   - `all_hs`
   - `pattern_summary`
   - `monthly_trend`
   - `rules`
4. `run.bat` ni ishga tushiring.
5. Brauzer ochilganda **Ctrl + Shift + R** bilan yangilang.

> Skript har bir jadval uchun avval **`.xlsx`** ni, topilmasa **`.csv`** ni
> qidiradi. Ikkalasi ham bo'lsa `.xlsx` ustun.

---

## 2. Umumiy qoidalar

- **Ustun nomlari** aynan quyidagidek bo'lsin (katta/kichik harf farqi yo'q,
  ortiqcha ustunlar e'tiborsiz qoldiriladi).
- **HS / TIF TN kodlar** matn (text) sifatida saqlansin — boshidagi nol
  yo'qolmasligi uchun Excelda katakni "Text" formatига qo'ying.
- **Bo'sh katak = ixtiyoriy** (shart emas) degani.
- **Raqamlar** formatsiz (ming ajratgich, valyuta belgisisiz) bo'lsin:
  `528000`, `0.85`.
- Birinchi qator — **sarlavha** (ustun nomlari).

---

## 3. Fayllar va ustunlar

### 3.1. `patterns` — asosiy statistik shablonlar (MAJBURIY)
"Statistik tahlil" jadvali, "Umumiy ko'rinish" kartalari, top signallar va
xavf yo'laklari shu fayldan quriladi.

| Ustun | Ma'no (bojxona) | Misol | Majburiy |
|---|---|---|---|
| `pattern_id` | Shablon kodi | `P001` | ha |
| `hs_level` | HS kod uzunligi (6 yoki 10) | `10` | yo'q (default 10) |
| `g33` | TIF TN (HS) kodi — graf 33 | `7304399309` | ha |
| `g8code2` | Importyor STIR/ID — graf 8 | `306764904` | yo'q |
| `g15` | Jo'natuvchi davlat kodi — graf 15 | `156` | yo'q |
| `g34` | Kelib chiqish mamlakati kodi — graf 34 | `156` | yo'q |
| `g14code1` | Bojxona broker ID — graf 14 | `200244767` | yo'q |
| `g54regcode` | Deklarant ro'yxat kodi — graf 54 | `306764904` | yo'q |
| `support` | Shu shartga mos jami deklaratsiyalar soni | `33` | ha |
| `misclass_cases` | Noto'g'ri tasniflangan (tuzatilgan) holatlar | `28` | ha |
| `conditional_probability` | Shartli ehtimollik **0–1** (tasdiqlanish foiziga aylanadi) | `0.85` | ha |
| `extra_revenue` | Qo'shimcha undirilishi mumkin boj | `528000` | ha |
| `lift` | Lift ko'rsatkichi | `3.10` | yo'q |

> `g8code2`, `g15`, `g34`, `g14code1`, `g54regcode` to'ldirilgan bo'lsa, ular
> avtomatik indikator va shart matniga (`Importer=...`, `Country=...`) aylanadi.

### 3.2. `possible_corrections` — tuzatishlar (qaysi koddan qaysi kodga)
Shablon oynasidagi "Mumkin bo'lgan haqiqiy TIF TN kodlar" va "Tarmoq tahlili"
yo'nalishlari shu fayldan quriladi.

| Ustun | Ma'no | Misol | Majburiy |
|---|---|---|---|
| `first_hs_code` | Dastlabki (e'lon qilingan) HS kod | `7304399309` | ha |
| `corrected_hs_code` | Tuzatilgan (haqiqiy) HS kod | `7304399301` | ha |
| `count` | Necha marta uchragan | `19` | ha |
| `tax_amount` | Shu tuzatishdan qo'shimcha boj | `16000` | ha |

### 3.3. `all_hs` — barcha deklaratsiyalar HS bo'yicha
"Tarmoq tahlili" tugunlari (har bir HS kod uchun hajm) shu fayldan quriladi.

| Ustun | Ma'no | Misol | Majburiy |
|---|---|---|---|
| `hs_code` | HS kod | `7304399309` | ha |
| `count` | Shu kod bo'yicha deklaratsiyalar soni | `120` | ha |

### 3.4. `pattern_summary` — umumiy yig'indi (ixtiyoriy)
"Umumiy ko'rinish" yuqori kartalarini aniqlashtiradi. Faqat bitta qator
(sarlavhadan keyin).

| Ustun | Ma'no | Misol |
|---|---|---|
| `total_patterns` | Jami shablonlar/qoidalar | `1113` |
| `total_extra_revenue` | Jami qo'shimcha boj | `66208789019` |
| `total_declarations` | Jami deklaratsiyalar | `2842` |
| `total_inspected` | Tekshirilgan deklaratsiyalar | `406` |
| `misclassifications` | Aniqlangan noto'g'ri tasniflashlar | `289` |
| `avg_hit_rate` | O'rtacha tasdiqlanish foizi | `66.4` |

### 3.5. `monthly_trend` — oylik dinamika (ixtiyoriy, lekin tavsiya etiladi)
"Umumiy ko'rinish"dagi trend grafigi, vaqt oralig'ini tanlash va haftalik
raqamlar shu fayldan quriladi. Har bir oy — alohida qator (eskidan yangiga).

| Ustun | Ma'no | Misol | Majburiy |
|---|---|---|---|
| `month` | Oy nomi | `Yan 25` | ha |
| `declarations` | Shu oydagi deklaratsiyalar | `210` | ha |
| `misclass` | Shu oyda aniqlangan noto'g'ri tasniflashlar | `18` | ha |
| `revenue` | Shu oyda undirilgan qo'shimcha boj | `210000` | ha |
| `hit_rate` | Shu oydagi o'rtacha tasdiqlanish foizi | `78` | ha |

### 3.6. `rules` — qoidalar (ixtiyoriy)
"Qoidalar boshqaruvi" va "Monitoring" shu fayldan quriladi.

| Ustun | Ma'no | Misol | Majburiy |
|---|---|---|---|
| `id` | Qoida kodi | `R001` | ha |
| `name` | Qoida nomi | `Po'lat quvurlar — Xitoy` | ha |
| `type` | Turi: `statistical` yoki `business` | `statistical` | yo'q |
| `status` | Holati: `active` / `draft` / `archived` | `active` | yo'q |
| `condition` | Shart matni (quyidagi formatda) | `HS10=7304399309 AND Importer=306764904 AND Country=156` | ha |
| `hit_rate` | Tasdiqlanish foizi | `85` | ha |
| `false_positive` | Noto'g'ri signal % | `15` | ha |
| `coverage` | Qamrov % | `8.1` | yo'q |
| `revenue_recovered` | Undirilgan boj | `528000` | ha |
| `flagged` | Belgilangan deklaratsiyalar | `33` | yo'q |
| `confirmed` | Tasdiqlangan | `28` | yo'q |
| `active_since` | Faollik boshlangan sana | `2024-05-10` | yo'q |
| `last_triggered` | Oxirgi ishga tushish sanasi | `2025-03-12` | yo'q |
| `hit_rate_trend` | Trend (vergul bilan ajratilgan) | `78,80,82,84,85` | yo'q |

> **`condition` formati** (xavf yo'lagi va tahrirlash to'g'ri ishlashi uchun):
> maydon nomlari `HS10` / `HS6` / `Importer` / `Country` / `Departure` /
> `Declarant` / `Broker`, amallar `=` (yoki `STARTS WITH`, `CONTAINS`, `IN`),
> shartlar `AND` bilan ulanadi.

---

## 4. Joylashtirish va ishga tushirish

1. Tayyor fayllarni shu papkaga joylang:
   ```
   <loyiha>/dashboard/data/
   ```
   Masalan: `dashboard/data/patterns.xlsx`, `dashboard/data/rules.xlsx`, ...
2. `run.bat` ni ishga tushiring. U avtomatik:
   - `dashboard/data/` dagi fayllardan `dashboard/data.generated.js` ni quradi
     (Python bo'lsa Python, bo'lmasa Node orqali — `.xlsx` ham, `.csv` ham
     o'qiladi),
   - serverni `http://localhost:3000` da ochadi.
3. Faqat bir nechta faylni bersangiz ham bo'ladi — qolganlari demo holida
   qoladi. Eng kami: `patterns`.

---

## 5. Tez-tez uchraydigan xatolar

- **Bo'sh dashboard / o'zgarmadi** → brauzerni **Ctrl + Shift + R** bilan
  yangilang (eski kesh).
- **HS kod oldidagi 0 yo'qolgan** → Excelda katakni **Text** formatiga
  o'tkazing yoki CSVda qo'shtirnoq ichida yozing.
- **Foizlar noto'g'ri** → `conditional_probability` **0–1 oralig'ida** bo'lsin
  (`0.85`, `85` emas).
- **Fayl o'qilmadi** → fayl nomi aniqligini (`patterns.xlsx`) va birinchi
  qator sarlavha ekanini tekshiring.
