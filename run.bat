@echo off
title Tovar kodi moduli

REM ---- Detect the LAN IPv4 address so the dashboard can be opened from
REM ---- other devices on the same network ----
set "LANIP="
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    if not defined LANIP set "LANIP=%%a"
)
if defined LANIP set "LANIP=%LANIP: =%"

echo Tovar kodi moduli ishga tushmoqda...
echo.
echo   Shu kompyuterda:      http://localhost:3000
if defined LANIP echo   Lokal tarmoq orqali:  http://%LANIP%:3000
echo.
echo (Boshqa qurilmalar bir xil Wi-Fi/tarmoqda bo'lsa, yuqoridagi
echo  "Lokal tarmoq" havolasi orqali kira oladi. Brauzerda Ctrl+Shift+R bilan yangilang.)
echo (Ushbu oynani yopish serverni to'xtatadi.)
echo.

REM ---- Build dashboard/data.generated.js from CSVs ----
where python >nul 2>nul
if %errorlevel%==0 (
    py scripts\build_data.py
    goto :build_done
)
where py >nul 2>nul
if %errorlevel%==0 (
    py scripts\build_data.py
    goto :build_done
)
where node >nul 2>nul
if %errorlevel%==0 (
    node scripts\build-data.js
    goto :build_done
)
echo [WARN] Python yoki Node topilmadi - data.generated.js yangilanmadi.
echo        Mavjud fayl bilan davom etamiz.
:build_done
echo.

REM ---- Serve the dashboard (0.0.0.0 = LAN orqali ham ochiq) ----
start "" "http://localhost:3000"
where python >nul 2>nul
if %errorlevel%==0 (
    py -m http.server 3000 --bind 0.0.0.0 --directory dashboard
    goto :eof
)
where py >nul 2>nul
if %errorlevel%==0 (
    py -m http.server 3000 --bind 0.0.0.0 --directory dashboard
    goto :eof
)
where npx >nul 2>nul
if %errorlevel%==0 (
    npx --yes serve dashboard -l tcp://0.0.0.0:3000
    goto :eof
)
echo [ERROR] Server ishga tushirish uchun Python yoki Node kerak.
pause
