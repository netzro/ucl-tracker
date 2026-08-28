# UCL 2026/27 — Manchester United Tracker

A small Vite dashboard that tracks Manchester United's 2026/27 UEFA Champions League
run under the new 36-team "Swiss model" league phase.

## The format (why this matters)
- **36 teams, one single league table** — no groups (the old format was 8 groups of 4).
- Each club plays **8 different opponents** (4 home / 4 away), 2 drawn from each of 4 pots.
- **1st–8th** → direct to Round of 16. **9th–24th** → two-legged play-off. **25th–36th** → out.
- Up to **17 games** to the final (was 13).

## Utd's 2026/27 draw (real, Monaco 27 Aug 2026)
Seated Pot 2. Venue confirmed:

| MW | Date | Opponent | Pot | Venue |
|----|------|----------|-----|-------|
| 1 | Sep 8-10 | Bayern Munich | 1 | H |
| 2 | Oct 13-14 | Atletico Madrid | 1 | A |
| 3 | Oct 20-21 | Roma | 2 | H |
| 4 | Nov 3-4 | Sporting Lisbon | 2 | A |
| 5 | Nov 24-25 | RB Leipzig | 3 | H |
| 6 | Dec 8-9 | Villarreal | 3 | A |
| 7 | Jan 19-20 | Sabah | 4 | H |
| 8 | Jan 27 | Como | 4 | A |

## How to use
- Enter scores live in the dashboard inputs as `Utd-Opp` (e.g. `2-0`). The summary
  recomputes points, GD and a points-based qualification trajectory.
- Or edit `src/data/ucl2026.js` directly (source of truth) and re-run.

## Commands
```
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run test     # vitest (TDD: standings logic)
```

## Structure
```
src/
  data/ucl2026.js     # real Utd fixtures + knockout placeholders (source of truth)
  standings.js        # pure computeRecord(fixtures) -> {P,W,D,L,GF,GA,GD,Pts,status}
  standings.test.js   # TDD tests (vitest)
  main.js             # dashboard render + live score inputs
  style.css
index.html
```

## Notes
- Qualification bands are points-based estimates (top-8 ≈ 15+ pts, playoff floor ≈ 8 pts).
  The exact cut line is set by the live 36-team table after each matchday.
- Utd returned to the UCL after two seasons away (they were in the Europa League in 2025/26).
