#!/usr/bin/env bash

sed -i -e "s/%ANDROID_SECRET%/${ANDROID_SECRET}/g" 'android/app/src/main/assets/appcenter-config.json'
sed -i -e "s/%IOS_SECRET%/${IOS_SECRET}/g" 'ios/Schooltoring/AppCenter-Config.plist'