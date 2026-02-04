@echo off
echo Preparing to deploy Cleanora website...
echo.

echo Checking files...
if exist "index.html" (
    echo ✓ index.html found
) else (
    echo ✗ index.html not found
    pause
    exit /b 1
)

if exist "css\style.css" (
    echo ✓ CSS directory found
) else (
    echo ✗ CSS directory not found
    pause
    exit /b 1
)

if exist "js\script.js" (
    echo ✓ JS directory found
) else (
    echo ✗ JS directory not found
    pause
    exit /b 1
)

if exist "assets\images" (
    echo ✓ Assets directory found
) else (
    echo ✗ Assets directory not found
    pause
    exit /b 1
)

echo.
echo Deployment checklist:
echo 1. Make sure all your changes are committed and pushed to GitHub
echo 2. Go to your GitHub repository page
echo 3. Click on Settings tab
echo 4. Scroll down to the "Pages" section
echo 5. Under "Source", select "Deploy from a branch"
echo 6. Select your main branch and click Save
echo 7. Wait for the deployment to complete
echo 8. Visit the provided URL to see your live site
echo.
echo Alternative deployment options:
echo - Netlify: Drag and drop the entire folder
echo - Vercel: Connect to your GitHub repo
echo - Firebase: Use firebase deploy command
echo.
echo Your site is ready for deployment!
pause