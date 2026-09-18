let _uidCounter = 0;
function uid() { return "u" + (++_uidCounter); }

function logoSVG(cls) {
  const id = "clip" + uid();
  return `<svg ${cls ? `class="${cls}"` : ""} viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Crystal Palace badge">
<defs><clipPath id="${id}"><path d="M100 10 L182 35 V120 C182 168 150 198 100 220 C50 198 18 168 18 120 V35 Z"/></clipPath></defs>
<g clip-path="url(#${id})"><rect x="18" y="10" width="82" height="212" fill="#C8102E"/><rect x="100" y="10" width="82" height="212" fill="#1C4FA1"/></g>
<path d="M100 10 L182 35 V120 C182 168 150 198 100 220 C50 198 18 168 18 120 V35 Z" fill="none" stroke="#E8C15A" stroke-width="5"/>
<g fill="#FFFFFF">
<polygon points="96,88 66,74 40,70 50,82 24,86 36,94 14,100 36,100 24,112 50,106 78,100"/>
<polygon points="104,88 134,74 160,70 150,82 176,86 164,94 186,100 164,100 176,112 150,106 122,100"/>
<polygon points="100,82 106,88 108,110 104,134 96,134 92,110 94,88"/>
<polygon points="100,134 88,152 95,150 100,158 105,150 112,152"/>
<circle cx="100" cy="76" r="7"/>
<polygon points="107,72 120,77 107,82" fill="#E8C15A"/>
<circle cx="100" cy="180" r="17" stroke="#0A1734" stroke-width="2.5"/>
<polygon points="100,174 94,178 96,185 104,185 106,178" fill="#0A1734"/>
</g>
<circle cx="102" cy="74.5" r="1.6" fill="#0A1734"/>
</svg>`;
}

function kitSVG(pattern, number, kid) {
  const red = "#C8102E", blue = "#1C4FA1", navy = "#0A1734", white = "#F4F7FC";
  const id = "kit" + (kid || uid());
  let pat;
  if (pattern === "halves") {
    pat = `<pattern id="${id}" patternUnits="userSpaceOnUse" width="200" height="235"><rect width="100" height="235" fill="${red}"/><rect x="100" width="100" height="235" fill="${blue}"/></pattern>`;
  } else if (pattern === "stripes") {
    pat = `<pattern id="${id}" patternUnits="userSpaceOnUse" width="168" height="235"><rect width="42" height="235" fill="${red}"/><rect x="42" width="42" height="235" fill="${blue}"/><rect x="84" width="42" height="235" fill="${red}"/><rect x="126" width="42" height="235" fill="${blue}"/></pattern>`;
  } else {
    pat = `<pattern id="${id}" patternUnits="userSpaceOnUse" width="200" height="235"><rect width="200" height="235" fill="${white}"/><rect x="-60" y="86" width="320" height="42" fill="${red}" transform="rotate(-22 100 107)"/><rect x="-60" y="128" width="320" height="13" fill="${blue}" transform="rotate(-22 100 134)"/></pattern>`;
  }
  const numColor = pattern === "sash" ? navy : "#FFFFFF";
  return `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Crystal Palace kit">
<defs>${pat}</defs>
<path d="M63 28 L84 19 Q100 32 116 19 L137 28 L170 47 L156 72 L139 62 L139 196 L61 196 L61 62 L44 72 L30 47 Z" fill="url(#${id})" stroke="${navy}" stroke-width="4" stroke-linejoin="round"/>
<path d="M84 19 Q100 34 116 19" fill="none" stroke="${navy}" stroke-width="4"/>
<path d="M61 180 L139 180" stroke="${navy}" stroke-width="3" opacity=".3"/>
<text x="100" y="128" text-anchor="middle" font-family="Oswald, sans-serif" font-size="52" font-weight="700" fill="${numColor}" stroke="${navy}" stroke-width="1">${number}</text>
<text x="100" y="164" text-anchor="middle" font-family="Oswald, sans-serif" font-size="12" letter-spacing="5" fill="${numColor}" opacity=".92">ZAHA</text>
</svg>`;
}

function yt(q) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q); }
function fmtDate(d) { return d.replace(/-/g, "."); }
function fmtWon(n) { return "₩" + n.toLocaleString("ko-KR"); }
function calcAge(birth) {
  const b = new Date(birth), t = new Date();
  let a = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--;
  return a;
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
const API_BASE = location.hostname.indexOf("onrender.com") !== -1 ? "" : "https://zaha-fanpage.onrender.com";
async function apiGet(path) {
  const r = await fetch(API_BASE + path);
  if (!r.ok) throw new Error("api error");
  return r.json();
}
async function apiPost(path, body) {
  const r = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error("api error");
  return r.json();
}

const NAV = [
  ["home", "index.html", "홈"],
  ["profile", "profile.html", "선수 프로필"],
  ["goals", "goals.html", "골 컬렉션"],
  ["seasons", "seasons.html", "시즌&유니폼"],
  ["photos", "photos.html", "포토"],
  ["game", "game.html", "득점 게임"],
  ["shop", "shop.html", "굿즈샵"]
];

function buildChrome() {
  const page = document.body.dataset.page || "home";
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `<div class="container nav">
<a class="brand" href="index.html">${logoSVG()}<span class="wordmark"><b>ZAHA</b><span>FAN PAGE</span></span></a>
<nav class="nav-links" id="navLinks">${NAV.map(n => `<a href="${n[1]}" data-nav="${n[0]}" class="${n[0] === page ? "active" : ""}">${n[2]}</a>`).join("")}</nav>
<button class="nav-toggle" id="navToggle" aria-label="메뉴">☰</button>
</div>`;
  document.body.prepend(header);
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<div class="container">
<div class="row">
<div class="fbrand">${logoSVG()}<div><b style="font-family:Oswald;font-size:1.05rem;letter-spacing:.12em;display:block">WILFRIED ZAHA</b><span style="font-size:.62rem;letter-spacing:.34em;color:var(--gold)">FAN PAGE</span></div></div>
<p>본 사이트는 비공식 팬 페이지로 Crystal Palace F.C. 및 윌프리드 자하 선수와 무관합니다. 기록 데이터는 위키백과 등 공개 자료 기준이며, 유니폼·엠블럼 이미지는 팬 아트 재현입니다. 영상 링크는 유튜브 검색으로 연결됩니다.</p>
</div>
<p style="margin-top:14px;font-size:.72rem;color:#5E7093">© ${new Date().getFullYear()} ZAHA FAN PAGE · For the Eagles · in Red &amp; Blue</p>
</div>`;
  document.body.append(footer);
  document.getElementById("navToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("open");
  });
  document.querySelectorAll("[data-logo]").forEach(el => { el.innerHTML = logoSVG(); });
}

function renderGoals() {
  const root = document.getElementById("goals-app");
  if (!root) return;
  const counts = {};
  GOALS.forEach(g => { counts[g.season] = (counts[g.season] || 0) + 1; });
  const chips = [`<button class="chip active" data-filter="all">전체 · ${GOALS.length}</button>`]
    .concat(SEASONS.filter(s => counts[s.key]).map(s => `<button class="chip" data-filter="${s.key}">${s.key} · ${counts[s.key]}</button>`))
    .join("");
  const blocks = SEASONS.filter(s => counts[s.key]).map((s, i) => {
    const cards = GOALS.filter(g => g.season === s.key).map(g => `
<article class="goal-card card reveal" data-season="${s.key}">
<div class="minute">${g.minute || ""}</div>
<div class="gc-top"><span class="badge badge-red">${g.comp}</span><span class="gc-date">${fmtDate(g.date)}</span>${g.badge ? `<span class="badge badge-gold">${g.badge}</span>` : ""}</div>
<h4>${g.title}</h4>
<p>${g.desc}</p>
<div class="gc-foot"><span class="scoreline">vs ${g.opp}<br>${g.score}</span><a class="watch" href="${yt(g.query)}" target="_blank" rel="noopener">▶ 골 영상 보기</a></div>
</article>`).join("");
    return `
<section class="season-block reveal ${i % 2 ? "alt" : ""}" data-season="${s.key}">
<div class="sb-head">
<h3>${s.key} 시즌</h3>
<span class="badge badge-blue">${s.comp}</span>
<span class="totals">전대회 ${s.totalApps}경기 ${s.totalGoals}골 · 리그 ${s.leagueApps}경기 ${s.leagueGoals}골 · 어시스트 ${s.assists}${s.assistsExact ? "" : "*"}</span>
<a class="yt" href="${yt("Wilfried Zaha all goals " + s.key + " Crystal Palace")}" target="_blank" rel="noopener">시즌 전체 골 모아보기 ↗</a>
</div>
<div class="goal-cards">${cards}</div>
</section>`;
  }).join("");
  root.innerHTML = `<div class="goal-filters" id="goalFilters">${chips}</div>${blocks}
<p class="kit-note" style="text-align:center;margin-top:40px">위 목록은 검증된 대표 골과 명장면을 기준으로 정리되어 있으며, 각 카드의 버튼을 누르면 해당 골 영상을 유튜브 검색으로 직접 보실 수 있습니다. 더 많은 골은 <a style="color:var(--gold)" href="${yt("Wilfried Zaha all goals for Crystal Palace")}" target="_blank" rel="noopener">전체 골 컴필레이션 검색</a>으로 만나보실 수 있습니다.</p>`;
  root.querySelectorAll("#goalFilters .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      root.querySelectorAll("#goalFilters .chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      root.querySelectorAll(".season-block").forEach(b => {
        b.style.display = (f === "all" || b.dataset.season === f) ? "" : "none";
      });
    });
  });
}

function renderSeasons() {
  const root = document.getElementById("seasons-app");
  if (!root) return;
  const cards = SEASONS.map(s => `
<article class="kit-card card reveal">
<div class="kit-visual">${kitSVG(s.pattern, s.number, "s" + s.key)}</div>
<div class="kit-body">
<h3>${s.key} <span class="comp">${s.comp}</span></h3>
<div class="kit-stats">
<div class="ks"><b>${s.leagueApps}</b><span>리그 출장</span></div>
<div class="ks"><b>${s.leagueGoals}</b><span>리그 골</span></div>
<div class="ks"><b>${s.totalGoals}</b><span>전대회 골</span></div>
</div>
<div class="kit-stats">
<div class="ks"><b>${s.assists}${s.assistsExact ? "" : "*"}</b><span>어시스트</span></div>
<div class="ks"><b>${s.totalApps}</b><span>전대회 출장</span></div>
<div class="ks"><b>No.${s.number}</b><span>등번호</span></div>
</div>
<p class="kit-note">${s.note}</p>
</div>
</article>`).join("");
  root.innerHTML = `
<div class="season-summary">
<div class="sbox reveal"><div class="n">12</div><div class="l">팰리스에서 보낸 시즌</div></div>
<div class="sbox reveal"><div class="n">458</div><div class="l">전대회 출장</div></div>
<div class="sbox reveal"><div class="n">90</div><div class="l">전대회 득점</div></div>
<div class="sbox reveal"><div class="n">68</div><div class="l">PL 득점 (구단 최다)</div></div>
</div>
<div class="kit-grid">${cards}</div>
<div style="margin-top:30px;border-top:1px dashed var(--line);padding-top:18px">
<p class="kit-note">* 어시스트는 집계 기관마다 다소 차이가 있어 일부 시즌은 추정치로 표기했습니다. 2010-11 / 2011-12 / 2014-15 / 2015-16 시즌은 공식 집계값입니다. 출장·득점은 위키백과 공개 자료 기준입니다.</p>
<p class="kit-note" style="margin-top:8px">유니폼 그림은 실제 디자인의 팬 아트 재현으로, 시즌별 대표 패턴(하프·스트라이프·샤시)을 기준으로 그렸습니다.</p>
</div>`;
}

function renderProfile() {
  const root = document.getElementById("profile-app");
  if (!root) return;
  const age = calcAge(ZAHA.birth);
  const info = [
    ["나이", `${age}세 <small>(자동 계산)</small>`],
    ["생년월일", "1992.11.10"],
    ["키", ZAHA.height],
    ["몸무게", ZAHA.weight],
    ["출생지", ZAHA.birthPlace],
    ["국적", ZAHA.nationality],
    ["주발", ZAHA.foot],
    ["현재 소속", ZAHA.currentClub]
  ].map(i => `<div class="info-card reveal"><div class="k">${i[0]}</div><div class="v">${i[1]}</div></div>`).join("");
  const tl = CAREER.map(c => {
    const cls = c.type === "loan" ? "blue" : (c.type === "transfer" || c.type === "debut" ? "gold" : "");
    const tag = { youth: "유스", debut: "데뷔", club: "소속", transfer: "이적", loan: "임대" }[c.type];
    return `<div class="tl-item ${cls} reveal"><div class="when">${c.years}</div><h3>${c.club}</h3><p>${c.note}</p><div class="tl-badges"><span class="badge badge-blue">${tag}</span></div></div>`;
  }).join("");
  const intl = INTERNATIONAL.map(i => `<tr><td style="padding:10px 12px;border-bottom:1px solid var(--line)">${i.team}</td><td style="padding:10px 12px;border-bottom:1px solid var(--line);font-family:Oswald">${i.years}</td><td style="padding:10px 12px;border-bottom:1px solid var(--line);color:var(--muted)">${i.record}</td></tr>`).join("");
  const honors = HONORS.map(h => `<li><span>${h.name} <small style="color:var(--muted)">· ${h.club}</small></span><span class="yr">${h.year}</span></li>`).join("");
  const facts = FACTS.map(f => `<div class="fact reveal"><h4>${f.title}</h4><p>${f.desc}</p></div>`).join("");
  root.innerHTML = `
<div class="profile-hero">
<div class="profile-card card reveal">
<div class="jersey">${kitSVG("halves", 11, "prof")}</div>
<div class="pname">Wilfried Zaha</div>
<div class="prole">Crystal Palace Legend · 2010–2023</div>
</div>
<div>
<h2 class="oswald" style="font-size:2rem;text-transform:uppercase">${ZAHA.nameKo} <span style="color:var(--gold)">WILF</span></h2>
<p style="color:var(--muted);margin-top:12px">만 8세에 팰리스 유스에 입단해 18년을 한몸으로 보낸 심장. 상대 수비수를 미치게 만드는 드리블로 2013년 PL 승격과 그 이후 9시즌의 정착을 이끌었고, 떠날 때는 구단 PL 역대 최다 득점자였다.</p>
<div class="info-grid">${info}</div>
</div>
</div>
<div class="palace-stats">
<div class="box reveal"><div class="n">458</div><div class="l">팰리스 전대회 출장</div></div>
<div class="box reveal"><div class="n">90</div><div class="l">팰리스 전대회 득점</div></div>
<div class="box reveal"><div class="n">68</div><div class="l">구단 PL 최다 득점</div></div>
<div class="box reveal"><div class="n">약 57</div><div class="l">어시스트 (집계별 상이)</div></div>
</div>
<div class="section-head"><span class="kicker">Career</span><h2>거쳐 간 팀들</h2></div>
<div class="timeline">${tl}</div>
<div class="section-head" style="margin-top:56px"><span class="kicker">National Team</span><h2>국가대표팀</h2></div>
<table style="width:100%;border-collapse:collapse;background:var(--navy-2);border:1px solid var(--line)">${intl}</table>
<div class="section-head" style="margin-top:56px"><span class="kicker">Honours</span><h2>수상 경력</h2></div>
<ul class="honors-list">${honors}</ul>
<div class="section-head" style="margin-top:56px"><span class="kicker">Legend Facts</span><h2>자하 레전드 이야기</h2></div>
<div class="fact-grid">${facts}</div>`;
}

function renderPhotos() {
  const root = document.getElementById("photos-app");
  if (!root) return;
  const slots = PHOTO_CAPTIONS.map((cap, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `<div class="ph-slot" data-idx="${i}">
<img src="images/photos/zaha-${n}.jpg" alt="${cap}" loading="lazy" onerror="this.closest('.ph-slot').classList.add('noimg')">
<div class="ph-empty"><div class="no">${n}</div><div class="cap">${cap}</div></div>
<div class="ph-cap">${cap}</div>
</div>`;
  }).join("");
  root.innerHTML = `<div class="photos-info"><div class="ic">PHOTO</div><p>직접 사진을 추가하려면 <code>images/photos</code> 폴더에 <code>zaha-01.jpg</code>부터 <code>zaha-36.jpg</code>까지 파일명으로 사진을 넣으면 자동으로 이 갤러리에 표시됩니다. 사진이 없는 칸은 위 카드로 표시됩니다.</p></div>
<div class="photo-grid">${slots}</div>`;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `<button class="lb-close">×</button><img alt=""><div class="lb-cap"></div>`;
  document.body.append(lb);
  root.querySelectorAll(".ph-slot").forEach(slot => {
    slot.addEventListener("click", () => {
      const img = slot.querySelector("img");
      if (slot.classList.contains("noimg") || !img.complete || img.naturalWidth === 0) return;
      lb.querySelector("img").src = img.src;
      lb.querySelector(".lb-cap").textContent = PHOTO_CAPTIONS[+slot.dataset.idx];
      lb.classList.add("open");
    });
  });
  lb.querySelector(".lb-close").addEventListener("click", () => lb.classList.remove("open"));
  lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("open"); });
}

function renderGuestbook() {
  const form = document.getElementById("gbForm");
  if (!form) return;
  const list = document.getElementById("gbList");
  const status = document.getElementById("gbStatus");
  async function refresh() {
    try {
      const entries = await apiGet("/api/guestbook");
      status.textContent = `지금까지 팬들이 남긴 응원 ${entries.length}개`;
      list.innerHTML = entries.length
        ? entries.map(e => `<div class="gb-item reveal on"><div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline"><span class="gb-name">${esc(e.name)}</span><span class="gb-date">${fmtDate(String(e.date).slice(0, 10))}</span></div><p>${esc(e.message)}</p></div>`).join("")
        : `<div class="kit-note">아직 응원이 없습니다. 첫 번째 한마디를 남겨보세요!</div>`;
    } catch (err) {
      status.textContent = "방명록 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
      list.innerHTML = "";
    }
  }
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const message = document.getElementById("gbMessage").value;
    if (!message.trim()) return;
    try {
      await apiPost("/api/guestbook", {
        name: document.getElementById("gbName").value,
        message: message
      });
      document.getElementById("gbMessage").value = "";
      status.textContent = "응원이 등록되었습니다!";
      refresh();
    } catch (err) {
      status.textContent = "전송에 실패했습니다. 잠시 후 다시 시도해주세요.";
    }
  });
  refresh();
}

function animateCounters() {
  document.querySelectorAll(".count").forEach(el => {
    const target = +el.dataset.target || 0;
    const t0 = performance.now();
    const dur = 1300;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("ko-KR");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function setupReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  buildChrome();
  renderGoals();
  renderSeasons();
  renderProfile();
  renderPhotos();
  renderGuestbook();
  animateCounters();
  setupReveal();
});
