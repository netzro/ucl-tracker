import { describe, it, expect } from "vitest";
import { computeRecord } from "./standings.js";

// Helper: build a league-phase array of scores.
function fixturesWith(scores) {
  return scores.map((s, i) => ({
    mw: i + 1,
    opponent: `Opp${i}`,
    pot: 1,
    venue: "H",
    date: "x",
    score: s, // [utd, opp] or null
  }));
}

describe("computeRecord", () => {
  it("returns zeros for an unplayed phase", () => {
    const r = computeRecord(fixturesWith([null, null, null, null, null, null, null, null]));
    expect(r).toMatchObject({ P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 });
    expect(r.status).toBe("pending");
  });

  it("tallies a perfect 8/8 record correctly", () => {
    const r = computeRecord(fixturesWith([
      [2, 0], [1, 0], [3, 1], [4, 1], [2, 1], [5, 2], [3, 0], [2, 0],
    ]));
    expect(r).toMatchObject({ P: 8, W: 8, D: 0, L: 0, GF: 22, GA: 5, GD: 17, Pts: 24 });
  });

  it("applies 3/1/0 points and computes GD with losses", () => {
    const r = computeRecord(fixturesWith([
      [1, 1], [0, 2], [2, 0], null, null, null, null, null,
    ]));
    expect(r).toMatchObject({ P: 3, W: 1, D: 1, L: 1, GF: 3, GA: 3, GD: 0, Pts: 4 });
  });

  it("ignores null (unplayed) fixtures in the tally", () => {
    const r = computeRecord(fixturesWith([[2, 0], null, [1, 1], null, null, null, null, null]));
    expect(r.P).toBe(2);
    expect(r.Pts).toBe(4);
  });

  it("maps a top-8 points total to auto status (>=18 pts example)", () => {
    // 6 wins 0 draws 2 losses = 18 pts -> within top-8 auto band
    const r = computeRecord(fixturesWith([
      [2, 0], [1, 0], [3, 1], [4, 1], [2, 1], [5, 2], [0, 1], [1, 2],
    ]));
    expect(r.Pts).toBe(18);
    expect(r.status).toBe("auto");
  });

  it("maps a mid-table total to playoff status (9-24)", () => {
    // 4 wins, 2 draws, 2 losses = 14 pts
    const r = computeRecord(fixturesWith([
      [1, 0], [1, 1], [2, 0], [0, 1], [3, 2], [1, 1], [0, 2], [2, 1],
    ]));
    expect(r.Pts).toBe(14);
    expect(r.status).toBe("playoff");
  });

  it("maps a bottom total to eliminated status (< 8 pts)", () => {
    // 1 win, 2 draws, 5 losses = 5 pts (< playoff floor)
    const r = computeRecord(fixturesWith([
      [1, 0], [0, 1], [1, 1], [0, 2], [0, 1], [0, 3], [1, 1], [0, 4],
    ]));
    expect(r.Pts).toBe(5);
    expect(r.status).toBe("eliminated");
  });
});
