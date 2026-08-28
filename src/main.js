import { LEAGUE_PHASE, KNOCKOUT, TEAM, SEASON } from "./data/ucl2026.js";
import { computeRecord } from "./standings.js";

// Live working copy (mutated by inputs). Source of truth stays in ucl2026.js;
// this lets the dashboard edit without writes, and we persist back on change.
import { LEAGUE_PHASE as SRC } from "./data/ucl2026.js";
const fixtures = SRC.map((f) => ({ ...f, score: f.score ? [...f.score] : null }));

const STATUS_LABEL = {
  pending: "Pending",
  auto: "On course: auto R16",
  playoff: "On course: play-off",
  eliminated: "On course: eliminated",
};
const STATUS_CLASS = { pending: "pending", auto: "auto", playoff: "playoff", eliminated: "eliminated" };

function resultOf(f) {
  if (!f.score) return "";
  const [u, o] = f.score;
  if (u > o) return "W";
  if (u === o) return "D";
  return "L";
}

function renderSummary(rec) {
  const el = document.getElementById("summary");
  el.innerHTML = `
    <div class="stat"><span>${rec.P}</span><label>Played</label></div>
    <div class="stat"><span>${rec.W}-${rec.D}-${rec.L}</span><label>W-D-L</label></div>
    <div class="stat"><span>${rec.GF}:${rec.GA}</span><label>GF:GA</label></div>
    <div class="stat"><span>${rec.GD > 0 ? "+" + rec.GD : rec.GD}</span><label>GD</label></div>
    <div class="stat"><span>${rec.Pts}</span><label>Pts</label></div>
    <div class="stat status ${STATUS_CLASS[rec.status]}"><span>${STATUS_LABEL[rec.status]}</span><label>Status</label></div>
  `;
}

function renderFixtures() {
  const tbody = document.querySelector("#fixtures tbody");
  tbody.innerHTML = "";
  fixtures.forEach((f, i) => {
    const tr = document.createElement("tr");
    const val = f.score ? `${f.score[0]}-${f.score[1]}` : "";
    tr.innerHTML = `
      <td>${f.mw}</td>
      <td>${f.date}</td>
      <td>${f.opponent}</td>
      <td>P${f.pot}</td>
      <td>${f.venue === "H" ? "vs" : "@"}</td>
      <td><input data-i="${i}" type="text" inputmode="numeric" placeholder="–" value="${val}" size="5" /></td>
      <td class="res ${resultOf(f).toLowerCase()}">${resultOf(f)}</td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("input").forEach((inp) => {
    inp.addEventListener("change", (e) => {
      const i = Number(e.target.dataset.i);
      const raw = e.target.value.trim();
      const m = raw.match(/^(\d+)\s*[-:]\s*(\d+)$/);
      if (!raw) {
        fixtures[i].score = null;
      } else if (m) {
        fixtures[i].score = [Number(m[1]), Number(m[2])];
      } else {
        e.target.value = fixtures[i].score ? `${fixtures[i].score[0]}-${fixtures[i].score[1]}` : "";
        return;
      }
      render();
    });
  });
}

function renderKnockout() {
  const el = document.getElementById("knockout");
  el.innerHTML = KNOCKOUT.map((k) => {
    const opp = k.opponent ? `${k.venue === "H" ? "vs" : "@"} ${k.opponent}` : "TBD";
    const sc = k.score ? `${k.score[0]}-${k.score[1]}` : "–";
    return `<div class="ko ${k.status}"><strong>${k.round}</strong><span>${opp}</span><span>${k.date || ""}</span><span>${sc}</span><span class="ko-status">${k.status}</span></div>`;
  }).join("");
}

function render() {
  const rec = computeRecord(fixtures);
  renderSummary(rec);
  renderFixtures();
  renderKnockout();
}

render();
