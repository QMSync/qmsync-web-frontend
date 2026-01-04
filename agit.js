const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter commit message: ', (commitMessage) => {
  if (!commitMessage.trim()) {
    console.log('Commit message is required!');
    rl.close();
    return;
  }

  try {
    console.log('Starting git operations...');
    
    console.log('Pulling latest changes...');
    execSync('git pull origin main', { stdio: 'inherit' });
    
    console.log('Adding all changes...');
    execSync('git add .', { stdio: 'inherit' });
    
    console.log('Committing changes...');
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    
    console.log('Pushing changes...');
    execSync('git push origin main', { stdio: 'inherit' });
    
    console.log('Git operations completed successfully!');
  } catch (error) {
    console.error('Git operation failed:', error.message);
  }
  
  rl.close();
});