#!/bin/bash

# Get commit message from user
read -p "Enter commit message: " commit_message

# Check if commit message is provided
if [ -z "$commit_message" ]; then
    echo "Commit message is required!"
    exit 1
fi

echo "Starting git operations..."

# Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# Add all changes
echo "Adding all changes..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "$commit_message"

# Push changes
echo "Pushing changes..."
git push origin main

echo "Git operations completed successfully!"