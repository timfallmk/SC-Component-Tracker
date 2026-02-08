# SC-Component-Tracker Project Memory

## Gotchas & Pitfalls
- After editing `data.js` or `app.js`: hard refresh (`Ctrl+Shift+R`) required due to browser caching
- Snub ships legitimately have size 0 quantumDrive/powerPlants/coolers - not a bug
- Gimbal size: parse from ClassName (`Mount_Gimbal_S4` = S4), NOT from MaxSize
- scunpacked `MaxSize: 0` is common for valid components; extraction scripts fall back to ClassName parsing (e.g., `_S01_` = size 1)
- Component undersizing is intentional: S1 cooler in S2 slot is valid (uses `<=` comparison, matches in-game behavior)

## Turret Classification Quick-Reference
- MannedTurret - crew-operated, NOT swappable (skip these for pilot weapon counts)
- RemoteTurret - automated, swappable
- BallTurret/TopTurret - pilot-controlled, treat as remote (swappable)
- CanardTurret - nose turrets, weapons count as PILOT weapons
- PDCTurret - point defense, SKIP (non-swappable)
- Door guns (`WeaponMount.WeaponControl`) - crew-operated, SKIP

## Validation Noise (not bugs)
- ~120 count mismatches are normal: spec shows ALL hardpoints, stock shows only EQUIPPED weapons
- ~11 oversized items are scunpacked data bugs, display works fine in-app
- Do not attempt to fix these

## Session Checklist
- [ ] Run `node validate.js` after any data changes
- [ ] Update 4 version locations on release (see CLAUDE.md "Releasing a New Version")
- [ ] Check SKIP_SHIPS list before auto-updating (see CLAUDE.md)
