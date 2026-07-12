@echo off
title Birthday Gift SPA Server
cd /d "%~dp0"

echo ========================================
echo   Birthday Gift SPA - Starting Server
echo ========================================
echo.

:: Check if node_modules exists, if not install
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
)

:: Try to start Vite dev server
echo Starting Vite development server...
echo.
echo The website will open in your browser shortly.
echo Press Ctrl+C to stop the server.
echo.
start http://localhost:3000
npx vite --host 0.0.0.0 --port 3000

:: If Vite fails, try serving the built dist folder
if errorlevel 1 (
    echo.
    echo Vite dev server failed. Trying to serve built version...
    if exist "dist\" (
        npx serve dist -l 3000
    ) else (
        echo ERROR: No dist folder found. Run 'npm run build' first.
        pause
        exit /b 1
    )
)

pause