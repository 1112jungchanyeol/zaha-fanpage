const express = require("express");
const fs = require("fs");
const path = require("path");
const { ZAHA, CAREER, INTERNATIONAL, HONORS, SEASONS, GOALS } = require("./js/data.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const DATA_DIR = path.join(__dirname, "data");
const GB_FILE = path.join(DATA_DIR, "guestbook.json");
const SC_FILE = path.join(DATA_DIR, "scores.json");

function load(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return fallback;
  }
}
function save(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("storage write failed", e.message);
  }
}
function cleanText(v, max, fallback) {
  if (typeof v !== "string" || !v.trim()) return fallback;
  return v.trim().slice(0, max);
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "zaha-fanpage", time: new Date().toISOString() });
});

app.get("/api/profile", (req, res) => {
  res.json({ player: ZAHA, career: CAREER, international: INTERNATIONAL, honors: HONORS });
});

app.get("/api/seasons", (req, res) => {
  res.json(SEASONS);
});

app.get("/api/goals", (req, res) => {
  const season = req.query.season;
  if (season) {
    const filtered = GOALS.filter(g => g.season === season);
    return res.json({ season, total: filtered.length, goals: filtered });
  }
  res.json({ total: GOALS.length, goals: GOALS });
});

app.get("/api/guestbook", (req, res) => {
  const entries = load(GB_FILE, []);
  res.json(entries.slice(-100).reverse());
});

app.post("/api/guestbook", (req, res) => {
  const body = req.body || {};
  const message = cleanText(body.message, 300, null);
  if (!message) return res.status(400).json({ error: "응원 메시지를 입력해주세요" });
  const entry = {
    id: Date.now(),
    name: cleanText(body.name, 20, "익명의 이글"),
    message: message,
    date: new Date().toISOString()
  };
  const entries = load(GB_FILE, []);
  entries.push(entry);
  save(GB_FILE, entries.slice(-500));
  res.status(201).json(entry);
});

app.get("/api/scores", (req, res) => {
  const scores = load(SC_FILE, []);
  res.json(
    scores
      .sort((a, b) => b.streak - a.streak)
      .slice(0, 10)
  );
});

app.post("/api/scores", (req, res) => {
  const body = req.body || {};
  const streak = parseInt(body.streak, 10);
  if (!Number.isFinite(streak) || streak < 1 || streak > 999) {
    return res.status(400).json({ error: "점수가 올바르지 않습니다" });
  }
  const entry = {
    name: cleanText(body.name, 20, "익명의 이글"),
    streak: streak,
    date: new Date().toISOString()
  };
  const scores = load(SC_FILE, []);
  scores.push(entry);
  save(SC_FILE, scores.slice(-500));
  const rank = scores
    .slice()
    .sort((a, b) => b.streak - a.streak)
    .indexOf(entry) + 1;
  res.status(201).json({ ...entry, rank });
});

app.use("/api", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`ZAHA FAN PAGE server running on port ${PORT}`);
});
