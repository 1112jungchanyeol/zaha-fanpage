(function () {
  const canvas = document.getElementById("gameCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const W = 900, H = 600;
  canvas.width = W;
  canvas.height = H;

  const goal = { x: W / 2 - 185, y: 130, w: 370, h: 205 };
  const start = { x: W / 2, y: H - 80, r: 30 };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - t, 2);

  const S = {
    mode: "idle",
    aim: { x: W / 2, y: 260 },
    power: 0,
    powerDir: 1,
    aimHistory: [],
    shot: null,
    keeper: { x: W / 2, dive: null, phase: Math.random() * 9 },
    outcome: null,
    outcomeT: 0,
    outcomeText: "",
    score: 0,
    attempts: 0,
    streak: 0,
    best: +(localStorage.getItem("zaha-bestStreak") || 0),
    particles: [],
    scenario: null,
    scGoals: 0,
    scAttempts: 0,
    muted: false,
    flash: 0,
    shake: 0,
    netRipple: 0,
    crowdBoost: 0
  };

  const crowd = [];
  for (let i = 0; i < 420; i++) {
    crowd.push({
      x: Math.random() * W,
      y: 30 + Math.random() * 150,
      c: ["rgba(200,16,46,.85)", "rgba(28,79,161,.9)", "rgba(234,240,250,.7)", "rgba(232,193,90,.5)"][Math.floor(Math.random() * 4)],
      p: Math.random() * 9
    });
  }

  let AC = null;
  function ac() {
    if (!AC) {
      try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { AC = null; }
    }
    if (AC && AC.state === "suspended") AC.resume();
    return AC;
  }
  function tone(freq, dur, type, vol, slideTo) {
    if (S.muted) return;
    const a = ac(); if (!a) return;
    const o = a.createOscillator(), g = a.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, a.currentTime);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, a.currentTime + dur);
    g.gain.setValueAtTime(vol || 0.15, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + dur);
    o.connect(g); g.connect(a.destination);
    o.start(); o.stop(a.currentTime + dur);
  }
  function noise(dur, vol, freq) {
    if (S.muted) return;
    const a = ac(); if (!a) return;
    const len = a.sampleRate * dur;
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource();
    src.buffer = buf;
    const f = a.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq || 900;
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, a.currentTime);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, a.currentTime + dur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + dur);
    src.connect(f); f.connect(g); g.connect(a.destination);
    src.start();
  }
  const sKick = () => { noise(0.12, 0.5, 300); tone(90, 0.15, "sine", 0.4, 40); };
  const sCheer = () => { noise(1.4, 0.35, 850); noise(1.2, 0.2, 1500); tone(520, 0.5, "triangle", 0.05, 700); };
  const sAww = () => tone(320, 0.7, "sawtooth", 0.06, 140);
  const sPost = () => { tone(1250, 0.35, "square", 0.12, 1180); tone(620, 0.5, "sine", 0.1, 600); };
  const sWhistle = () => { tone(2350, 0.14, "square", 0.07); setTimeout(() => tone(2350, 0.14, "square", 0.07), 190); };

  function pointerPos(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (W / r.width),
      y: (e.clientY - r.top) * (H / r.height)
    };
  }
  function setAim(p) {
    S.aim.x = clamp(p.x, goal.x - 90, goal.x + goal.w + 90);
    S.aim.y = clamp(p.y, goal.y - 70, goal.y + goal.h + 60);
  }

  canvas.addEventListener("pointerdown", e => {
    e.preventDefault();
    ac();
    if (S.mode !== "idle") return;
    setAim(pointerPos(e));
    S.mode = "charging";
    S.power = 0;
    S.powerDir = 1;
    S.aimHistory = [{ x: S.aim.x, t: performance.now() }];
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", e => {
    if (S.mode === "idle" || S.mode === "charging") {
      setAim(pointerPos(e));
      if (S.mode === "charging") S.aimHistory.push({ x: S.aim.x, t: performance.now() });
    }
  });
  function releaseShot(e) {
    if (S.mode !== "charging") return;
    if (e) setAim(pointerPos(e));
    shoot();
  }
  canvas.addEventListener("pointerup", releaseShot);
  canvas.addEventListener("pointercancel", () => { if (S.mode === "charging") { S.mode = "idle"; S.power = 0; } });

  function shoot() {
    const p = S.power;
    const ex = (Math.random() * 2 - 1) * (9 + p * 0.22);
    const ey = (Math.random() * 2 - 1) * (5 + p * 0.1);
    let vx = 0;
    const now = performance.now();
    const hist = S.aimHistory.filter(s => now - s.t < 260);
    if (hist.length > 1) {
      const a = hist[0], b = hist[hist.length - 1];
      const dt = Math.max(30, b.t - a.t);
      vx = (b.x - a.x) / dt;
    }
    const curve = clamp(vx * 55, -85, 85);
    const target = { x: S.aim.x + ex, y: S.aim.y + ey, curve };
    const dur = 620 + p * 2.4;
    const skill = S.scenario ? S.scenario.skill : 0.5;
    let diveTo;
    if (Math.random() < skill) diveTo = target.x + (Math.random() * 2 - 1) * 34;
    else diveTo = goal.x + Math.random() * goal.w;
    S.keeper.dive = {
      fromX: S.keeper.x,
      toX: clamp(diveTo, goal.x + 26, goal.x + goal.w - 26),
      y: goal.y + goal.h * 0.42 + (Math.random() * 2 - 1) * 42,
      t: 0,
      dur: dur * 0.85
    };
    S.shot = { t: 0, dur, to: target, power: p, spin: 0 };
    S.mode = "flight";
    S.attempts++;
    if (S.scenario) S.scAttempts++;
    sKick();
    updateHUD();
  }

  function resolveShot() {
    const to = S.shot.to;
    const kx = S.keeper.x;
    const ky = S.keeper.dive ? S.keeper.dive.y : goal.y + goal.h * 0.42;
    const inX = to.x > goal.x + 12 && to.x < goal.x + goal.w - 12;
    const inY = to.y > goal.y + 8 && to.y < goal.y + goal.h - 4;
    const nearL = Math.abs(to.x - goal.x), nearR = Math.abs(to.x - (goal.x + goal.w));
    const nearPost = (nearL < 22 || nearR < 22) && inY;
    const onTarget = inX && inY;
    const reach = 62 - S.shot.power * 0.26;
    const saved = onTarget && Math.abs(kx - to.x) < reach && Math.abs(ky - to.y) < 95;
    if (saved) {
      finish("save", "선방당했다!", "#BFD2EE");
      sAww();
    } else if (onTarget) {
      S.score++;
      S.streak++;
      if (S.streak > S.best) { S.best = S.streak; localStorage.setItem("zaha-bestStreak", S.best); }
      if (S.scenario) S.scGoals++;
      spawnConfetti();
      S.flash = 1;
      S.shake = 10;
      S.netRipple = 1;
      S.crowdBoost = 2;
      finish("goal", pick(["GOOOOAL!", "자하다운 마무리!", "셀허스트가 폭발했다!", "그물이 흔들린다!"]), "#E8C15A");
      sCheer();
    } else if (nearPost) {
      finish("post", "포스트를 맞췄다!", "#FFFFFF");
      sPost();
    } else {
      finish("miss", "빗나갔다...", "#BFD2EE");
      sAww();
    }
    updateHUD();
    if (S.scenario && S.scAttempts >= S.scenario.attempts) {
      if (S.scGoals >= S.scenario.target) {
        completeScenario(S.scenario.id);
      } else {
        setTimeout(() => {
          showOutcome("시나리오 실패", "#FF7D92", 1800);
          setTimeout(() => { setScenario(null); }, 1900);
        }, 1000);
      }
    } else if (S.scenario && S.scGoals >= S.scenario.target) {
      completeScenario(S.scenario.id);
    }
  }

  function finish(kind, text, color) {
    S.mode = "result";
    S.outcome = kind;
    S.outcomeText = text;
    S.outcomeColor = color;
    S.outcomeT = 0;
    if (kind !== "goal") S.streak = 0;
    setTimeout(() => {
      S.mode = "idle";
      S.shot = null;
      S.keeper.dive = null;
      S.keeper.x = W / 2;
      S.power = 0;
      updateHUD();
    }, 1250);
  }
  function showOutcome(text, color, dur) {
    S.outcome = "info";
    S.outcomeText = text;
    S.outcomeColor = color;
    S.outcomeT = 0;
    setTimeout(() => { if (S.outcome === "info") S.outcome = null; }, dur || 1600);
  }
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  function spawnConfetti() {
    for (let i = 0; i < 90; i++) {
      S.particles.push({
        x: goal.x + Math.random() * goal.w,
        y: goal.y + Math.random() * goal.h * 0.6,
        vx: (Math.random() * 2 - 1) * 4.5,
        vy: -Math.random() * 5 - 1,
        rot: Math.random() * Math.PI,
        vr: (Math.random() * 2 - 1) * 0.25,
        c: ["#C8102E", "#1C4FA1", "#FFFFFF", "#E8C15A"][Math.floor(Math.random() * 4)],
        life: 1,
        w: 6 + Math.random() * 6,
        h: 3 + Math.random() * 4
      });
    }
  }

  function rr(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw(t) {
    ctx.save();
    if (S.shake > 0.3) {
      ctx.translate((Math.random() * 2 - 1) * S.shake, (Math.random() * 2 - 1) * S.shake);
      S.shake *= 0.86;
    }
    const sky = ctx.createLinearGradient(0, 0, 0, 190);
    sky.addColorStop(0, "#04070F");
    sky.addColorStop(1, "#0A1734");
    ctx.fillStyle = sky;
    ctx.fillRect(-20, -20, W + 40, 210);

    ctx.fillStyle = "#0D1B3F";
    ctx.fillRect(-20, 180, W + 40, 46);
    ctx.font = "700 26px Oswald, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(232,193,90,.9)";
    ctx.fillText("S E L H U R S T   P A R K", W / 2, 212);

    crowd.forEach(c => {
      const bounce = Math.sin(t * 0.004 + c.p) * (1.5 + S.crowdBoost * 2.5);
      ctx.fillStyle = c.c;
      ctx.fillRect(c.x, c.y + bounce, 3.4, 4.6);
    });
    if (S.crowdBoost > 0) S.crowdBoost = Math.max(0, S.crowdBoost - 0.02);

    ctx.fillStyle = "#0B1836";
    ctx.fillRect(-20, 226, W + 40, 104);
    for (let i = 0; i < 9; i++) {
      ctx.fillStyle = i % 3 === 0 ? "#C8102E" : (i % 3 === 1 ? "#1C4FA1" : "#132244");
      ctx.fillRect(-20 + i * 100, 296, 96, 30);
    }
    ctx.fillStyle = "rgba(244,247,252,.85)";
    ctx.font = "700 13px Oswald, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("R E D   &   B L U E   F O R E V E R", W / 2, 316);

    const glow = ctx.createRadialGradient(W / 2, 0, 30, W / 2, 0, 620);
    glow.addColorStop(0, "rgba(234,240,250,.16)");
    glow.addColorStop(1, "rgba(234,240,250,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, 300);

    const pitch = ctx.createLinearGradient(0, 330, 0, H);
    pitch.addColorStop(0, "#12351B");
    pitch.addColorStop(1, "#1B5C2D");
    ctx.fillStyle = pitch;
    ctx.fillRect(-20, 330, W + 40, H - 310);
    const goalLineY = goal.y + goal.h;
    ctx.fillStyle = "#0F2C17";
    ctx.fillRect(-20, goalLineY, W + 40, 14);
    for (let i = 0; i < 6; i++) {
      const y0 = lerp(goalLineY, H, i / 6);
      const y1 = lerp(goalLineY, H, (i + 1) / 6);
      const spread0 = lerp(1, 2.4, i / 6);
      const spread1 = lerp(1, 2.4, (i + 1) / 6);
      if (i % 2 === 0) {
        ctx.fillStyle = "rgba(255,255,255,.045)";
        ctx.beginPath();
        ctx.moveTo(W / 2 - (W / 2 + 60) * spread0, y0);
        ctx.lineTo(W / 2 + (W / 2 + 60) * spread0, y0);
        ctx.lineTo(W / 2 + (W / 2 + 60) * spread1, y1);
        ctx.lineTo(W / 2 - (W / 2 + 60) * spread1, y1);
        ctx.closePath();
        ctx.fill();
      }
    }
    ctx.strokeStyle = "rgba(255,255,255,.65)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(60, goalLineY);
    ctx.lineTo(W - 60, goalLineY);
    ctx.stroke();
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 150, goalLineY);
    ctx.lineTo(W / 2 - 110, goalLineY + 46);
    ctx.lineTo(W / 2 + 110, goalLineY + 46);
    ctx.lineTo(W / 2 + 150, goalLineY);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(W / 2, H - 150, 9, 4, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "rgba(220,230,245,.14)";
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    ctx.strokeStyle = "rgba(220,230,245,.35)";
    ctx.lineWidth = 1;
    const ripple = S.netRipple > 0 ? Math.sin(t * 0.05) * 9 * S.netRipple : 0;
    if (S.netRipple > 0) S.netRipple = Math.max(0, S.netRipple - 0.02);
    for (let i = 0; i <= 10; i++) {
      const x = goal.x + (goal.w / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, goal.y);
      ctx.quadraticCurveTo(x + ripple, goal.y + goal.h / 2, x, goal.y + goal.h);
      ctx.stroke();
    }
    for (let j = 0; j <= 6; j++) {
      const y = goal.y + (goal.h / 6) * j;
      ctx.beginPath();
      ctx.moveTo(goal.x, y);
      ctx.lineTo(goal.x + goal.w, y + ripple * 0.4);
      ctx.stroke();
    }
    ctx.fillStyle = "#F4F7FC";
    ctx.shadowColor = "rgba(0,0,0,.5)";
    ctx.shadowBlur = 10;
    ctx.fillRect(goal.x - 10, goal.y - 10, 10, goal.h + 10);
    ctx.fillRect(goal.x + goal.w, goal.y - 10, 10, goal.h + 10);
    ctx.fillRect(goal.x - 10, goal.y - 12, goal.w + 20, 12);
    ctx.shadowBlur = 0;

    drawKeeper(t);

    if (S.mode === "idle" || S.mode === "charging") {
      ctx.fillStyle = "rgba(0,0,0,.35)";
      ctx.beginPath();
      ctx.ellipse(start.x, start.y + start.r * 0.75, start.r * 1.05, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      drawBall(start.x, start.y, start.r, t * 0.002);
    }

    if (S.mode === "charging") {
      ctx.strokeStyle = "rgba(232,193,90,.95)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(S.aim.x, S.aim.y, 26, -Math.PI / 2, -Math.PI / 2 + (S.power / 100) * Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(232,193,90,.14)";
      ctx.fillRect(30, H - 46, 260, 18);
      ctx.fillStyle = S.power > 80 ? "#C8102E" : "#E8C15A";
      ctx.fillRect(30, H - 46, 260 * (S.power / 100), 18);
      ctx.strokeStyle = "rgba(255,255,255,.5)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(30, H - 46, 260, 18);
      ctx.font = "600 13px Oswald, sans-serif";
      ctx.textAlign = "left";
      ctx.fillStyle = "#fff";
      ctx.fillText("POWER " + Math.round(S.power), 34, H - 56);
    }
    if (S.mode === "idle" || S.mode === "charging") {
      ctx.strokeStyle = "rgba(255,255,255,.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(S.aim.x, S.aim.y, 17, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(S.aim.x - 27, S.aim.y); ctx.lineTo(S.aim.x - 8, S.aim.y);
      ctx.moveTo(S.aim.x + 8, S.aim.y); ctx.lineTo(S.aim.x + 27, S.aim.y);
      ctx.moveTo(S.aim.x, S.aim.y - 27); ctx.lineTo(S.aim.x, S.aim.y - 8);
      ctx.moveTo(S.aim.x, S.aim.y + 8); ctx.lineTo(S.aim.x, S.aim.y + 27);
      ctx.stroke();
    }

    if (S.mode === "flight" && S.shot) {
      const sh = S.shot;
      const p = clamp(sh.t / sh.dur, 0, 1);
      const e = easeOut(p);
      const bx = lerp(start.x, sh.to.x, e) + Math.sin(p * Math.PI) * sh.to.curve;
      const by = lerp(start.y, sh.to.y, e);
      const br = lerp(start.r, 9, e);
      const sc = lerp(1, 0.32, e);
      ctx.fillStyle = "rgba(0,0,0,.3)";
      ctx.beginPath();
      ctx.ellipse(bx, by + br * 0.7 + 8 * sc, br * 1.05, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      drawBall(bx, by, br, p * 12);
    }

    S.particles = S.particles.filter(pp => pp.life > 0);
    S.particles.forEach(pp => {
      pp.x += pp.vx;
      pp.y += pp.vy;
      pp.vy += 0.14;
      pp.rot += pp.vr;
      pp.life -= 0.008;
      ctx.save();
      ctx.translate(pp.x, pp.y);
      ctx.rotate(pp.rot);
      ctx.globalAlpha = Math.max(0, pp.life);
      ctx.fillStyle = pp.c;
      ctx.fillRect(-pp.w / 2, -pp.h / 2, pp.w, pp.h);
      ctx.restore();
    });
    ctx.globalAlpha = 1;

    if (S.outcome) {
      S.outcomeT += 16.7;
      const pop = Math.min(1, S.outcomeT / 240);
      const scale = 0.6 + 0.4 * (1 - Math.pow(1 - pop, 3));
      ctx.save();
      ctx.translate(W / 2, H * 0.42);
      ctx.scale(scale, scale);
      ctx.font = "700 56px Oswald, sans-serif";
      ctx.textAlign = "center";
      ctx.lineWidth = 8;
      ctx.strokeStyle = "rgba(6,15,36,.85)";
      ctx.strokeText(S.outcomeText, 0, 0);
      ctx.fillStyle = S.outcomeColor || "#fff";
      ctx.fillText(S.outcomeText, 0, 0);
      ctx.restore();
    }

    if (S.scenario) {
      ctx.font = "600 17px Oswald, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(234,240,250,.85)";
      ctx.fillText(`${S.scenario.title}  ·  ${S.scGoals}/${S.scenario.target}골  ·  남은 시도 ${Math.max(0, S.scenario.attempts - S.scAttempts)}`, W / 2, 42);
    }

    if (S.flash > 0) {
      ctx.fillStyle = `rgba(255,255,255,${S.flash * 0.35})`;
      ctx.fillRect(-20, -20, W + 40, H + 40);
      S.flash = Math.max(0, S.flash - 0.05);
    }
    ctx.restore();
  }

  function drawBall(x, y, r, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(10,23,52,.7)";
    ctx.lineWidth = Math.max(1, r * 0.08);
    ctx.stroke();
    ctx.fillStyle = "#0A1734";
    const pr = r * 0.36;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / 5);
      const px = Math.cos(a) * pr, py = Math.sin(a) * pr;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * (Math.PI * 2 / 5) + Math.PI / 5;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * pr * 0.6, Math.sin(a) * pr * 0.6);
      ctx.lineTo(Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawKeeper(t) {
    const k = S.keeper;
    let x = k.x;
    let lean = Math.sin(t * 0.003 + k.phase) * 0.05;
    if (k.dive) {
      const p = clamp(k.dive.t / k.dive.dur, 0, 1);
      x = lerp(k.dive.fromX, k.dive.toX, easeOut(p));
      lean = Math.sign(k.dive.toX - k.dive.fromX) * Math.min(1, p * 1.35) * 1.15;
    }
    k.x = x;
    const baseY = goal.y + goal.h - 4;
    ctx.save();
    ctx.translate(x, baseY);
    ctx.rotate(lean * 0.55);
    ctx.fillStyle = "#0A1734";
    ctx.fillRect(-10, -26, 7, 24);
    ctx.fillRect(3, -26, 7, 24);
    ctx.fillStyle = "#E8C15A";
    rr(-15, -66, 30, 44, 9);
    ctx.fill();
    ctx.strokeStyle = "#0A1734";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-15, -56);
    ctx.lineTo(15, -56);
    ctx.stroke();
    ctx.fillStyle = "#8D5A3B";
    ctx.beginPath();
    ctx.arc(0, -76, 9.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#E8C15A";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-13, -60);
    ctx.lineTo(-30, -78 - lean * 14);
    ctx.moveTo(13, -60);
    ctx.lineTo(30, -78 + lean * 14);
    ctx.stroke();
    ctx.fillStyle = "#F4F7FC";
    ctx.beginPath();
    ctx.arc(-30, -79 - lean * 14, 6.5, 0, Math.PI * 2);
    ctx.arc(30, -79 + lean * 14, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let last = performance.now();
  function loop(t) {
    const dt = Math.min(50, t - last);
    last = t;
    if (S.mode === "charging") {
      S.power += S.powerDir * dt * 0.11;
      if (S.power >= 100) { S.power = 100; S.powerDir = -1; }
      if (S.power <= 0) { S.power = 0; S.powerDir = 1; }
    }
    if (S.mode === "flight" && S.shot) {
      S.shot.t += dt;
      if (S.keeper.dive) S.keeper.dive.t += dt;
      if (S.shot.t >= S.shot.dur) resolveShot();
    } else if (S.keeper.dive) {
      S.keeper.dive.t += dt;
    }
    draw(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function updateHUD() {
    const el = id => document.getElementById(id);
    if (!document.getElementById("hudScore")) return;
    el("hudScore").textContent = S.score;
    el("hudAtt").textContent = S.attempts;
    el("hudStreak").textContent = S.streak;
    el("hudBest").textContent = S.best;
    el("hudAcc").textContent = S.attempts ? Math.round(S.score / S.attempts * 100) + "%" : "-";
    if (S.scenario) {
      el("scStatus").innerHTML = `${S.scenario.meta} · 목표 ${S.scenario.target}골 / 시도 ${S.scenario.attempts}회`;
    } else {
      el("scStatus").textContent = "자유 연습 모드 · 마음껏 슛을 날려보세요";
    }
    renderScenarioList();
  }

  function doneIds() {
    try { return JSON.parse(localStorage.getItem("zaha-scDone") || "[]"); } catch (e) { return []; }
  }
  function completeScenario(id) {
    const done = doneIds();
    if (!done.includes(id)) {
      done.push(id);
      localStorage.setItem("zaha-scDone", JSON.stringify(done));
    }
    sWhistle();
    setTimeout(() => {
      showOutcome("시나리오 클리어!", "#5DD97C", 2200);
      spawnConfetti();
      sCheer();
      if (done.length === SCENARIOS.length) {
        setTimeout(() => {
          showOutcome("자하 레전드 등극! 전 시나리오 완료", "#E8C15A", 3200);
          spawnConfetti();
        }, 2400);
      }
      setTimeout(() => { setScenario(null); }, 2200);
    }, 1100);
  }
  function setScenario(sc) {
    S.scenario = sc;
    S.scGoals = 0;
    S.scAttempts = 0;
    S.mode = "idle";
    S.shot = null;
    S.keeper.dive = null;
    S.keeper.x = W / 2;
    updateHUD();
    renderScenarioList();
  }

  function renderScenarioList() {
    const list = document.getElementById("scenarioList");
    if (!list) return;
    const done = doneIds();
    const btns = SCENARIOS.map(sc => `
<button class="scenario ${S.scenario && S.scenario.id === sc.id ? "active" : ""}" data-sc="${sc.id}">
<span class="sc-title">${sc.title} ${done.includes(sc.id) ? '<span class="done">✔</span>' : ""}</span>
<span class="sc-meta">${sc.meta}</span>
<p>${sc.desc}</p>
</button>`).join("");
    list.innerHTML = `<button class="scenario ${S.scenario ? "" : "active"}" data-sc="free">
<span class="sc-title">자유 연습 모드</span>
<span class="sc-meta">FREE PLAY</span>
<p>시나리오 제한 없이 무한 슛 연습. 골키퍼 난이도 보통.</p>
</button>` + btns;
    list.querySelectorAll(".scenario").forEach(b => {
      b.addEventListener("click", () => {
        const id = b.dataset.sc;
        if (id === "free") { setScenario(null); sWhistle(); return; }
        const sc = SCENARIOS.find(x => x.id === id);
        setScenario(sc);
        sWhistle();
      });
    });
  }

  const muteBtn = document.getElementById("btnMute");
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      S.muted = !S.muted;
      muteBtn.textContent = S.muted ? "소리 OFF" : "소리 ON";
    });
  }
  const resetBtn = document.getElementById("btnReset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      S.score = 0; S.attempts = 0; S.streak = 0;
      S.scGoals = 0; S.scAttempts = 0;
      updateHUD();
      sWhistle();
    });
  }
  renderScenarioList();
  updateHUD();
})();
