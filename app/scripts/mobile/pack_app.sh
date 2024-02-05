#!/bin/bash
# Script to build the mobile package of this app with capacitor-cli

# Use: ./package.sh <appName> <appId>
# - appName: This should be a human-friendly app name, like what you'd see in the App Store
# - appId: Package IDs (aka Bundle ID in iOS and Application ID in Android) are unique identifiers for apps. They must be in reverse domain name notation, generally representing a domain name that you or your company owns.

# install @capacitor cli and core
echo "about to install @capacitor/cli"
npm install @capacitor/cli @capacitor/core

# remove capacitor config if it exists
rm -f capacitor.config.ts;

#initialize capacitor
echo "Initializing capacitor"
npx cap init $1 $2;

# install capacitor android and ios plugins
npm install @capacitor/android @capacitor/ios;
npx cap add android;
npx cap add ios;

npx cap sync;

cd android;
./gradlew bundle;

exit 1; 
