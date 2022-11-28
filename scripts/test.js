'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// Ensure environment variables are read.
require('dotenv').config();

const jest = require('jest');
const execSync = require('child_process').execSync;
let argv = process.argv.slice(2);

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function isInMercurialRepository() {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// https://github.com/facebook/create-react-app/issues/5210
const hasSourceControl = isInGitRepository() || isInMercurialRepository();

// Watch unless on CI or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf('--watchAll') === -1 &&
  argv.indexOf('--watchAll=false') === -1
) {
  argv.push(hasSourceControl ? '--watch' : '--watchAll');
}

const CORE_FILES = [
  '.nvmrc',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'jest.config.js',
  'src/setupTests.ts',
];

// Check if changed files includes core file(s)
const changedSinceIdx = argv.indexOf('--changedSince');
if (hasSourceControl && changedSinceIdx !== -1) {
  const SHA = argv[changedSinceIdx + 1];
  let changedFiles = [];
  try {
    const result = execSync(`git diff --name-only ${SHA}...HEAD`).toString();
    changedFiles = result.split('\n').filter(Boolean);
  } catch (e) {
    console.error('Failed to get list of changed files from git');
  }

  const coreFileChanged = changedFiles.reduce(
    (acc, changedFile) => acc || CORE_FILES.includes(changedFile),
    false,
  );

  if (coreFileChanged) {
    // Remove changedSince param/value from args
    argv.splice(changedSinceIdx, 2);
    console.log('A core file was changed, running all tests...');
  } else {
    console.log(
      `Running only subset of tests for code changed since the base SHA ${SHA} ...`,
    );
  }
}

jest.run(argv);
