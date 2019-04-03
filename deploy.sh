cd documentation
git add . && \
git commit -m "Deploy to GitHub Pages" && \
git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
