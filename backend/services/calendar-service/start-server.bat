@echo off
cd /d E:\Git\git\GitHub\creep\backend\services\calendar-service

echo ------------------------------------
echo Current working directory:
cd
echo ------------------------------------

echo Starting calendar-service...
node server.js

:: Keep the window open
cmd /k
