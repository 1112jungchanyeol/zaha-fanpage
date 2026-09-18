(function () {
  const root = document.getElementById("shop-app");
  if (!root) return;

  function shopArt(p) {
    const red = "#C8102E", blue = "#1C4FA1", navy = "#0A1734", white = "#F4F7FC", gold = "#E8C15A";
    if (p.art === "kit") return kitSVG(p.pattern, p.number, "shop" + p.id);
    if (p.art === "scarf") {
      const stripes = [];
      for (let i = 0; i < 7; i++) {
        stripes.push(`<rect x="60" y="${14 + i * 16}" width="80" height="16" fill="${i % 2 ? blue : red}"/>`);
      }
      const tassels = [];
      for (let i = 0; i < 6; i++) {
        tassels.push(`<line x1="${66 + i * 13}" y1="126" x2="${66 + i * 13}" y2="146" stroke="${gold}" stroke-width="3"/>`);
      }
      return `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">${stripes.join("")}${tassels.join("")}
<rect x="60" y="14" width="80" height="112" fill="none" stroke="${navy}" stroke-width="4"/>
<text x="100" y="84" text-anchor="middle" font-family="Oswald, sans-serif" font-size="20" font-weight="700" fill="#fff" stroke="${navy}" stroke-width=".8">WILF</text></svg>`;
    }
    if (p.art === "mousepad") {
      return `<svg viewBox="0 0 210 110" xmlns="http://www.w3.org/2000/svg">
<rect x="8" y="10" width="194" height="90" rx="12" fill="${red}"/>
<path d="M103 10 H202 A12 12 0 0 1 214 22 V88 A12 12 0 0 1 202 100 H103 Z" fill="${blue}" transform="translate(-4 0)"/>
<rect x="8" y="10" width="194" height="90" rx="12" fill="none" stroke="${navy}" stroke-width="4"/>
<circle cx="105" cy="55" r="26" fill="${white}" stroke="${navy}" stroke-width="3"/>
<text x="105" y="63" text-anchor="middle" font-family="Oswald, sans-serif" font-size="20" font-weight="700" fill="${navy}">WZ</text></svg>`;
    }
    if (p.art === "tee") {
      return `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
<path d="M63 24 L84 16 Q100 28 116 16 L137 24 L168 42 L154 64 L139 55 L139 168 L61 168 L61 55 L46 64 L32 42 Z" fill="${white}" stroke="${navy}" stroke-width="4" stroke-linejoin="round"/>
<path d="M84 16 Q100 30 116 16" fill="none" stroke="${red}" stroke-width="5"/>
<text x="100" y="105" text-anchor="middle" font-family="Oswald, sans-serif" font-size="30" font-weight="700" fill="${navy}">WILF</text>
<text x="100" y="132" text-anchor="middle" font-family="Oswald, sans-serif" font-size="15" fill="${red}">12 SEASONS</text>
<line x1="68" y1="145" x2="132" y2="145" stroke="${blue}" stroke-width="4"/></svg>`;
    }
    if (p.art === "poster") {
      return `<svg viewBox="0 0 150 190" xmlns="http://www.w3.org/2000/svg">
<rect x="10" y="8" width="130" height="174" fill="${navy}" stroke="${gold}" stroke-width="3"/>
<text x="75" y="58" text-anchor="middle" font-family="Oswald, sans-serif" font-size="19" font-weight="700" fill="${white}">WILFRIED</text>
<text x="75" y="86" text-anchor="middle" font-family="Oswald, sans-serif" font-size="28" font-weight="700" fill="${red}">ZAHA</text>
<circle cx="75" cy="118" r="16" fill="none" stroke="${gold}" stroke-width="3"/>
<text x="75" y="124" text-anchor="middle" font-family="Oswald, sans-serif" font-size="15" font-weight="700" fill="${gold}">90</text>
<text x="75" y="156" text-anchor="middle" font-family="Oswald, sans-serif" font-size="12" fill="${white}" opacity=".75">PALACE 2010-2023</text>
<text x="75" y="172" text-anchor="middle" font-family="Oswald, sans-serif" font-size="10" fill="${gold}">FAN ART PRINT</text></svg>`;
    }
    if (p.art === "mug") {
      const cid = "mug" + p.id;
      return `<svg viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="${cid}"><rect x="45" y="34" width="96" height="104" rx="10"/></clipPath></defs>
<g clip-path="url(#${cid})"><rect x="45" y="34" width="48" height="104" fill="${red}"/><rect x="93" y="34" width="48" height="104" fill="${blue}"/></g>
<rect x="45" y="34" width="96" height="104" rx="10" fill="none" stroke="${navy}" stroke-width="4"/>
<path d="M141 60 q34 4 34 26 q0 22 -34 26" fill="none" stroke="${navy}" stroke-width="9"/>
<text x="93" y="95" text-anchor="middle" font-family="Oswald, sans-serif" font-size="22" font-weight="700" fill="#fff" stroke="${navy}" stroke-width=".8">CPFC</text></svg>`;
    }
    if (p.art === "keyring") {
      return `<svg viewBox="0 0 160 190" xmlns="http://www.w3.org/2000/svg">
<circle cx="80" cy="30" r="20" fill="none" stroke="${gold}" stroke-width="7"/>
<line x1="80" y1="50" x2="80" y2="74" stroke="${gold}" stroke-width="6"/>
<circle cx="80" cy="122" r="46" fill="${red}"/>
<path d="M80 76 A46 46 0 0 1 80 168 Z" fill="${blue}"/>
<circle cx="80" cy="122" r="46" fill="none" stroke="${navy}" stroke-width="4"/>
<text x="80" y="131" text-anchor="middle" font-family="Oswald, sans-serif" font-size="26" font-weight="700" fill="#fff" stroke="${navy}" stroke-width=".8">WZ</text></svg>`;
    }
    if (p.art === "socks") {
      const s = x => `<g transform="translate(${x},0)">
<path d="M18 20 h36 v64 q0 10 10 14 l22 10 q16 8 10 26 q-6 18 -26 12 l-34 -14 q-18 -8 -18 -28 Z" fill="${white}" stroke="${navy}" stroke-width="4"/>
<rect x="18" y="20" width="36" height="14" fill="${red}"/>
<rect x="18" y="48" width="36" height="14" fill="${blue}"/>
<rect x="30" y="86" width="42" height="13" fill="${red}" transform="rotate(24 30 86)"/></g>`;
      return `<svg viewBox="0 0 180 190" xmlns="http://www.w3.org/2000/svg">${s(16)}${s(96)}</svg>`;
    }
    if (p.art === "figure") {
      return `<svg viewBox="0 0 180 190" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="90" cy="176" rx="52" ry="8" fill="rgba(0,0,0,.35)"/>
<rect x="72" y="138" width="36" height="34" rx="8" fill="${navy}"/>
<path d="M60 60 q30 -18 60 0 l6 44 q-36 14 -72 0 Z" fill="${red}"/>
<path d="M90 42 l6 18 q-6 4 -12 0 Z" fill="#8D5A3B"/>
<circle cx="90" cy="46" r="13" fill="#8D5A3B"/>
<path d="M77 44 q13 -16 26 0 q-13 -8 -26 0" fill="${navy}"/>
<path d="M66 60 L44 88 l10 8 L74 72 Z" fill="${red}"/>
<path d="M114 60 l22 28 l-10 8 l-20 -24 Z" fill="${red}"/>
<circle cx="49" cy="93" r="6" fill="${gold}"/>
<circle cx="131" cy="93" r="6" fill="${gold}"/>
<text x="90" y="88" text-anchor="middle" font-family="Oswald, sans-serif" font-size="15" font-weight="700" fill="#fff">11</text></svg>`;
    }
    return "";
  }

  function loadCart() {
    try { return JSON.parse(localStorage.getItem("zaha-cart") || "{}"); } catch (e) { return {}; }
  }
  function saveCart(c) { localStorage.setItem("zaha-cart", JSON.stringify(c)); }
  let cart = loadCart();

  function renderProducts() {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = PRODUCTS.map(p => `
<article class="product card reveal on">
<div class="p-art">${shopArt(p)}</div>
<div class="p-body">
${p.tag ? `<span class="badge badge-gold" style="align-self:flex-start">${p.tag}</span>` : ""}
<h3>${p.name}</h3>
<p class="p-desc">${p.desc}</p>
<div class="p-row"><span class="price">${fmtWon(p.price)}</span><button class="add" data-id="${p.id}">담기 +</button></div>
</div>
</article>`).join("");
    grid.querySelectorAll(".add").forEach(b => {
      b.addEventListener("click", () => {
        cart[b.dataset.id] = (cart[b.dataset.id] || 0) + 1;
        saveCart(cart);
        renderCart();
      });
    });
  }

  function renderCart() {
    const box = document.getElementById("cartItems");
    const ids = Object.keys(cart).filter(id => cart[id] > 0);
    if (!ids.length) {
      box.innerHTML = `<div class="cart-empty">장바구니가 비어 있습니다.<br>마음에 드는 자하 굿즈를 담아보세요!</div>`;
    } else {
      box.innerHTML = ids.map(id => {
        const p = PRODUCTS.find(x => x.id === id);
        if (!p) return "";
        return `<div class="cart-item">
<span class="ci-name">${p.name}</span>
<span class="qty"><button data-q="-1" data-id="${id}">−</button><b>${cart[id]}</b><button data-q="1" data-id="${id}">+</button></span>
<span class="ci-price">${fmtWon(p.price * cart[id])}</span>
</div>`;
      }).join("");
      box.querySelectorAll("button").forEach(b => {
        b.addEventListener("click", () => {
          const id = b.dataset.id;
          cart[id] = (cart[id] || 0) + (+b.dataset.q);
          if (cart[id] <= 0) delete cart[id];
          saveCart(cart);
          renderCart();
        });
      });
    }
    const total = ids.reduce((sum, id) => {
      const p = PRODUCTS.find(x => x.id === id);
      return sum + (p ? p.price * cart[id] : 0);
    }, 0);
    document.getElementById("cartTotal").textContent = fmtWon(total);
    document.getElementById("btnCheckout").disabled = !ids.length;
    document.getElementById("btnCheckout").style.opacity = ids.length ? 1 : 0.5;
  }

  const modal = document.getElementById("checkoutModal");
  document.getElementById("btnCheckout").addEventListener("click", () => {
    if (!Object.keys(cart).filter(id => cart[id] > 0).length) return;
    modal.classList.add("open");
  });
  document.querySelector("#checkoutModal .m-close").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("open"); });
  document.getElementById("checkoutForm").addEventListener("submit", e => {
    e.preventDefault();
    cart = {};
    saveCart(cart);
    renderCart();
    modal.classList.remove("open");
    const ok = document.getElementById("orderDone");
    ok.classList.add("open");
    setTimeout(() => ok.classList.remove("open"), 3500);
  });
  document.getElementById("cartClear").addEventListener("click", () => {
    cart = {};
    saveCart(cart);
    renderCart();
  });

  renderProducts();
  renderCart();
})();
