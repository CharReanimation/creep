@echo off
cd /d E:\Git\git\GitHub\creep\backend\services\user-service

echo ------------------------------------
echo Current working directory:
cd
echo ------------------------------------

echo Starting user-service...
node server.js

:: Keep the window open
cmd /k
