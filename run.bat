@echo off
title Tovar kodi moduli
echo Tovar kodi moduli ishga tushmoqda: http://localhost:3000 ...
echo.
echo (Ushbu oynani yopish serverni to'xtatadi.)
echo.
node scripts\build-data.js
start "" "http://localhost:3000"
npx --yes serve dashboard -l 3000
