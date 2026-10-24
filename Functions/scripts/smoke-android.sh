#!/usr/bin/env bash
# Launches the dev build on the running emulator and fails on JS crashes/red-screens.
set -euo pipefail
ADB="${ANDROID_HOME:-$HOME/Android/Sdk}/platform-tools/adb"
PKG=com.anonymous.Functions
"$ADB" shell am force-stop "$PKG"
"$ADB" logcat -c
"$ADB" shell monkey -p "$PKG" 1 >/dev/null 2>&1
sleep 20
LOG=$("$ADB" logcat -d -s ReactNativeJS AndroidRuntime)
if echo "$LOG" | grep -Eq "FATAL EXCEPTION|Unmatched Route|auth/already-initialized| E ReactNativeJS"; then
  echo "$LOG" | grep -E "FATAL|Unmatched|already-initialized| E ReactNativeJS" | head -20
  echo "SMOKE FAILED"; exit 1
fi
"$ADB" exec-out screencap -p > /tmp/smoke.png
echo "SMOKE OK (screenshot: /tmp/smoke.png)"
