#!/usr/bin/env bash

sed -i '' -e "s/%ANDROID_SECRET%/${ANDROID_SECRET}/g" 'android/app/src/main/assets/appcenter-config.json'
sed -i '' -e "s/%ANDROID_PROJECT_ID%/${ANDROID_PROJECT_ID}/g" 'android/app/google-services.json'
sed -i '' -e "s/%ANDROID_MOBILESDK_APP_ID%/${ANDROID_MOBILESDK_APP_ID}/g" 'android/app/google-services.json'
sed -i '' -e "s/%ANDROID_CLIENT_ID%/${ANDROID_CLIENT_ID}/g" 'android/app/google-services.json'
sed -i '' -e "s/%ANDROID_API_KEY%/${ANDROID_API_KEY}/g" 'android/app/google-services.json'

sed -i '' -e "s/%IOS_SECRET%/${IOS_SECRET}/g" 'ios/Schooltoring/AppCenter-Config.plist'
sed -i '' -e "s/%IOS_CLIENT_ID%/${IOS_CLIENT_ID}/g" 'ios/Schooltoring/GoogleService-Info.plist'
sed -i '' -e "s/%IOS_REVERSED_CLIENT_ID%/${IOS_REVERSED_CLIENT_ID}/g" 'ios/Schooltoring/GoogleService-Info.plist'
sed -i '' -e "s/%IOS_API_KEY%/${IOS_API_KEY}/g" 'ios/Schooltoring/GoogleService-Info.plist'
sed -i '' -e "s/%IOS_PROJECT_ID%/${IOS_PROJECT_ID}/g" 'ios/Schooltoring/GoogleService-Info.plist'
sed -i '' -e "s/%IOS_GOOGLE_APP_ID%/${IOS_GOOGLE_APP_ID}/g" 'ios/Schooltoring/GoogleService-Info.plist'

sed -i '' -e "s,%PLATFORM_ADDRESS%,${PLATFORM_ADDRESS},g" 'app.json'
sed -i '' -e "s/%CLIENT_ID%/${CLIENT_ID}/g" 'app.json'
sed -i '' -e "s/%CLIENT_SECRET%/${CLIENT_SECRET}/g" 'app.json'
sed -i '' -e "s/%CLIENT_SCOPE%/${CLIENT_SCOPE}/g" 'app.json'
