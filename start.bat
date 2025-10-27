@echo off
echo Starting SafeTap Sphere Application...
echo.

echo Installing backend dependencies...
cd backend
call npm install
echo.

echo Starting backend server...
start "SafeTap Backend" cmd /k "npm start"
echo Backend started on http://localhost:3001
echo.

echo Starting frontend...
cd ..
start "SafeTap Frontend" "Safetap.html"
echo.

echo SafeTap Sphere is now running!
echo Backend: http://localhost:3001
echo Frontend: Open Safetap.html in your browser
echo.
pause