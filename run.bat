@echo off
title Tovar kodi moduli
echo Tovar kodi moduli ishga tushmoqda: http://localhost:3000 ...
echo.
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

REM ---- Serve the dashboard ----
start "" "http://localhost:3000"
where python >nul 2>nul
if %errorlevel%==0 (
    py -m http.server 3000 --directory dashboard
    goto :eof
)
where py >nul 2>nul
if %errorlevel%==0 (
    py -m http.server 3000 --directory dashboard
    goto :eof
)
where npx >nul 2>nul
if %errorlevel%==0 (
    npx --yes serve dashboard -l 3000
    goto :eof
)
echo [ERROR] Server ishga tushirish uchun Python yoki Node kerak.
pause
