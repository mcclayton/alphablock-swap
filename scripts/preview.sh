#!/bin/bash

##############################################
# Executes a local preview environment using #
# locally built assets and local env vars.   #
##############################################

BUILD_DIR="./build"
LAST_BUILD_DATE=$(date -r $BUILD_DIR +"%F %T.%3N")

promptYesNo() {
  echo "   => $1 "
  read -p "      [Y/n] " -r
  echo
}

main() {
  clear

  if [ -z "$LAST_BUILD_DATE" ]; then
    echo "No build found, building assets..."
    npm run build
  else
    echo "Assets were last built: $LAST_BUILD_DATE"
    promptYesNo "Would you like to rebuild before previewing $1?"

    if [[ $REPLY =~ ^[Nn]$ ]]; then
      echo "Skipping rebuild."
    else
      echo "Building assets..."
      npm run build
    fi
  fi

  vite preview
}

# Start main
main
