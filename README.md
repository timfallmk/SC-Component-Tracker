# SC Component Tracker

A simple browser app to track Star Citizen ships and their components.

- Live in-browser, no backend required
- Ships, weapons, and components defined in `data.js`
- UI logic in `app.js`; styles in `styles.css`

## Getting Started

1. Start a static server in this folder:

```bash
python3 -m http.server 8000
```

2. Open http://127.0.0.1:8000 in your browser.

3. If you edit `data.js` or `app.js`, hard refresh with `Ctrl+Shift+R`.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for recent updates.

## Validation

Run a consistency check on stock loadouts vs specs and catalogs:

```bash
node validate.js | tee validation_report.txt
```

Review [validation_report.txt](validation_report.txt) for details.
