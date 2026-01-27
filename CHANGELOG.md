# Changelog

All notable changes to this project are documented here.

## 2026-01-26 — v-2026-01-26-corsair-validation

- Drake Corsair corrections:
  - Ship spec: pilotWeapons updated to 4× S4 + 2× S5; turrets set to two manned turrets (2× S2 each).
  - Stock loadout: pilot 4× M6A + 2× M7A; turrets 4× CF-227.
- Data integrity tools:
  - Added `validate.js` to systematically scan SC_DATA for mismatches (unknown names, size > mount, turret list length issues). Output captured in `validation_report.txt`.
  - Initial validation results summary: 51 oversized weapons, 66 unknown weapons, 6 turret length mismatches, 11 ships with too many pilot weapons. See `validation_report.txt` for details.
- Data mapping fixes in `data.js`:
  - Repaired `getDefaultComponents` turret mapping (per-gun → per-turret representative) and added `findWeaponSizeByName` helper.
  - Guarded mapping when stock arrays are missing; removed corrupted stray lines.
- Frontend/cache:
  - Bumped `index.html` script versions to ensure cache busting (v=14).
- Versioning for rollback:
  - Created branch `version/2026-01-26-corsair-validation` and tag `v-2026-01-26-corsair-validation` capturing these changes.

## 2026-01-25

- Starfarer Gemini:
  - Turrets set to S5, S3, S3; stock turret weapons aligned to 2× CF-557 (S5) + 4× CF-337 (S3). UI clamps oversized selections and prefers CF-337 on S3.
- RSI Constellation Andromeda:
  - Pilot 4× S5; turrets 2× S3. Stock: pilot CF-557; turrets CF-337.
- Anvil Scorpius:
  - Pilot 4× S3; turret 4× S3, stock CF-337.
- RSI Aurora MR:
  - Pilot 4× S1; stock intentionally 2× CF-117 with two empty hardpoints.
- Mirai Fury:
  - Corrected shield size to S1; pilot weapons corrected to S1 mounts.
- UI logic improvements (`app.js`):
  - Clamp oversized turret weapons to mount size in display and selection; improve turret labels to reflect per-gun size vs mount; prefer CF-337 when clamping S5→S3 where applicable.

