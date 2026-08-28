// Pure logic: tally a club's Champions League league-phase record from its fixtures.
// Points: win 3, draw 1, loss 0. Status derived from points vs the 36-team
// single-table cut lines (top-8 auto / 9-24 playoff / 25-36 eliminated).
//
// Thresholds: in practice the live 36-team table decides the exact cut line, but
// historical league phases show ~15-18 pts for top-8 and ~8-11 pts for the playoff
// floor. We use defensible fixed bands and let the live table override status later.

export function computeRecord(fixtures) {
  const rec = { P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 };

  for (const f of fixtures) {
    if (!f.score) continue; // unplayed
    const [utd, opp] = f.score;
    rec.P += 1;
    rec.GF += utd;
    rec.GA += opp;
    if (utd > opp) { rec.W += 1; rec.Pts += 3; }
    else if (utd === opp) { rec.D += 1; rec.Pts += 1; }
    else { rec.L += 1; }
  }
  rec.GD = rec.GF - rec.GA;

  rec.status = statusFromPoints(rec.Pts, rec.P);
  return rec;
}

// Points-based status band. If fewer than 8 played, status stays "pending"
// until the phase completes — but we still expose a provisional band so the
// dashboard can show trajectory.
export function statusFromPoints(pts, played) {
  if (played === 0) return "pending";
  if (pts >= 15) return "auto";      // realistic top-8 threshold
  if (pts >= 8) return "playoff";    // 9-24 playoff band (8 pts = floor)
  return "eliminated";               // 25-36 (< 8 pts)
}
