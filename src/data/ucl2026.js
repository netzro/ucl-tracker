// Manchester United — 2026/27 UEFA Champions League league phase.
// Real draw (Monaco, 27 Aug 2026). Venue confirmed; exact dates = matchweek window (TBD per fixture).
// score: [Utd goals, opponent goals] once played, else null.
// pot = opponent's draw pot. mw = matchweek (1-8).

export const TEAM = "Manchester United";
export const SEASON = "2026/27";

export const LEAGUE_PHASE = [
  { mw: 1, opponent: "Bayern Munich", pot: 1, venue: "H", date: "Sep 8-10", score: null },
  { mw: 2, opponent: "Atletico Madrid", pot: 1, venue: "A", date: "Oct 13-14", score: null },
  { mw: 3, opponent: "Roma", pot: 2, venue: "H", date: "Oct 20-21", score: null },
  { mw: 4, opponent: "Sporting Lisbon", pot: 2, venue: "A", date: "Nov 3-4", score: null },
  { mw: 5, opponent: "RB Leipzig", pot: 3, venue: "H", date: "Nov 24-25", score: null },
  { mw: 6, opponent: "Villarreal", pot: 3, venue: "A", date: "Dec 8-9", score: null },
  { mw: 7, opponent: "Sabah", pot: 4, venue: "H", date: "Jan 19-20", score: null },
  { mw: 8, opponent: "Como", pot: 4, venue: "A", date: "Jan 27", score: null },
];

// Knockout phase — populated as Utd clinch each berth.
// round: "R16" | "QF" | "SF" | "Final"; status: "pending" | "qualified" | "eliminated" | "winner"
export const KNOCKOUT = [
  { round: "R16", opponent: null, venue: null, date: null, score: null, status: "pending" },
  { round: "QF", opponent: null, venue: null, date: null, score: null, status: "pending" },
  { round: "SF", opponent: null, venue: null, date: null, score: null, status: "pending" },
  { round: "Final", opponent: null, venue: null, date: null, score: null, status: "pending" },
];
