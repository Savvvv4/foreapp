#!/bin/bash
# Builds index.html (the Claude artifact) and dist/ (the hosted iPhone version).
cd "$(dirname "$0")"
JS="src/2.js src/3.js src/4.js src/5.js src/6.js src/7.js src/8.js"
{ cat src/1.html; echo '<script>'; cat $JS; echo '</script>'; } > index.html
V=$(date -u +%Y%m%d%H%M%S)
mkdir -p dist/assets; cp assets/* dist/assets/; cp host/manifest.json dist/; cp host/icon-*.png dist/assets/
{ cat host/head.html; sed -n '1,/<\/style>/p' src/1.html; cat host/host.css; echo '</head><body>'; sed '1,/<\/style>/d' src/1.html; echo "<script>window.__BUILD='$V';"; cat $JS host/pwa.js; echo '</script></body></html>'; } > dist/index.html
echo "$V" > dist/version.txt
echo "built $V"
