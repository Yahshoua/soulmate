jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore  soulmatebug.keystore app-release-unsigned.apk android

PAUSE

zipalign -f -v 4 app-release-unsigned.apk outfile.apk

PAUSE