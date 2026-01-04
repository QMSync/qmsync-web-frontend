@echo off
set /p commit_message="Enter commit message: "

if "%commit_message%"=="" (
    echo Commit message is required!
    exit /b 1
)

echo Starting git operations...

echo Pulling latest changes...
git pull origin main

echo Adding all changes...
git add .

echo Committing changes...
git commit -m "%commit_message%"

echo Pushing changes...
git push origin main

echo Git operations completed successfully!
pause