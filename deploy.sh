git clone https://github.com/deep-js/doc.git
mv documentation/* doc/
cd doc
git status
git add -A && \
git commit -m "Deploy to GitHub Pages" && \
git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages
