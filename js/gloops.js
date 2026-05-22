/* =================================================================
   GLOOPS — interactions
   ================================================================= */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- I18N (FR default, EN dictionary) ---------- */
  const EN = {
    "nav.conflit": `The Conflict`, "nav.chars": `Characters`, "nav.story": `The Story`,
    "nav.videos": `Videos`, "nav.eco": `The Ecosystem`, "nav.invest": `Invest`, "nav.decors": `Sets`, "nav.casting": `Cast`,
    "casting.eyebrow": `The voices`,
    "casting.title": `A top-tier<br><span class="text-grad-pink">voice cast</span>`,
    "casting.sub": `Target cast — to be confirmed. Iconic French voice actors envisioned to bring the Gloops to life. (Best-known dubbing roles shown for reference.)`,
    "casting.alt": `also considered`,
    "char.eka.role": `The defector`,
    "char.eka.desc": `First a ZogZog in the king's service, she switches to the Resistance when she realizes she was serving the wrong side.`,
    "cm.likes": `Likes`,
    "cm.dislikes": `Dislikes`,
    "cm.voice": `Voice · target cast`,
    "cm.storyboard": `Storyboard <em>(2D — AI version coming)</em>`,
    "decors.eyebrow": `Art direction`,
    "decors.title": `Worlds with <span class="text-grad-gold">character</span>`,
    "decors.sub": `From the candy-dystopian factory to the bucolic farm — every set tells the Green-vs-Pink conflict.`,
    "decor.usine.t": `The SugarMaxX Factory`,
    "decor.usine.x": `The heart of the Empire — where the pink syrup that enslaves the city flows.`,
    "decor.super.t": `The Convenience Store`,
    "decor.super.x": `Po and Lili's daily grind. Shelves drowning in SugarMaxX, the veggie fridge under watch.`,
    "decor.bureau.t": `The Manager's Office`,
    "decor.bureau.x": `The petty tyrant's kingdom: “BEST BOSS” posters, a full ashtray, empty cans.`,
    "decor.throne.t": `The Throne Room`,
    "decor.throne.x": `Kevin V's palace, under the giant screens of Shu Ga.`,
    "decor.ferme.t": `Papy Mush's Farm`,
    "decor.ferme.x": `A SweetLife-free zone. Veggies, fresh air, and wind in the leaves.`,
    "hero.badge": `3D Animated Series · Comedy · 11 × 11 min`,
    "hero.tagline": `Water is life.<br><span class="text-grad-pink">Sugar is power.</span>`,
    "hero.desc": `A mega-corporation gets an entire world hooked on its pink drink. A clumsy janitor is about to become the masked hero of a revolution… armed with smoothies. Welcome to the Gloops.`,
    "hero.cta1": `Watch the teaser`, "hero.cta2": `Investor deck`, "hero.cta3": `Play the demo`, "hero.scroll": `Explore`,
    "logline.quote": `In a world of gluttonous little creatures, <b class="text-grad-pink">SweetLife Industries</b> has hooked everyone on <b>SugarMaxX</b>. When the tap water turns pink and the Gloops go berserk, a clumsy janitor named Po reluctantly becomes <b class="text-grad-green">MushMaster</b> — sparking a resistance with real taste.`,
    "meta.format": `Format`, "meta.format.v": `Series 11 × 11 min`,
    "meta.tech": `Technique`, "meta.tech.v": `Stylized 3D animation`,
    "meta.genre": `Genre`, "meta.genre.v": `Action comedy · Satire`,
    "meta.aud": `Audience`, "meta.aud.v": `Ages 8-14 + family`,
    "meta.tone": `Tone`, "meta.status": `Status`, "meta.status.v": `Pilot &amp; bible ready`,
    "conflit.eyebrow": `Two worlds · One war`,
    "conflit.title": `The great conflict: <span class="text-grad-green">Green</span> vs <span class="text-grad-pink">Pink</span>`,
    "conflit.sub": `The whole universe lives in this visual tension. On one side, the Resistance — fresh, free, alive. On the other, the SweetLife Empire — sweet, addictive, under control. <strong>Drag the slider</strong> to flip between the two.`,
    "conflit.label.green": `The Resistance`, "conflit.label.pink": `The SweetLife Empire`,
    "conflit.cap.green": `Veggies, smoothies, fresh air. At Papy Mush's place, no ads, no logos — just the wind in the leaves.`,
    "conflit.cap.pink": `Pink water, neon, jingles on loop. “Drink, smile, repeat.” A total grip — right down to the tap.`,
    "conflit.hint": `↔ Drag to reveal both sides of the world`,
    "chars.eyebrow": `The Cast`, "chars.title": `Heroes you'll love,<br>villains you'll savor`,
    "chars.sub": `A cast built for merchandising and social: every Gloop has its silhouette, its color, its meme.`,
    "chars.tab.green": `The Resistance`, "chars.tab.pink": `The Empire`,
    "char.mush.role": `The masked hero`,
    "char.mush.desc": `Po, accidentally turned into a mushroom-hatted vigilante. His motto: “Be water.” His weapon: a broken broom and a lot of luck.`,
    "char.po.role": `The everyman`,
    "char.po.desc": `Convenience-store janitor, awkward geek, hopelessly in love with Lili. He dreams of showing “what he's capable of”… even with a lousy broom.`,
    "char.lili.role": `The brains`,
    "char.lili.desc": `Sassy, sharp, hooked on detox smoothies. She's the one who figures out green juice is the antidote — and builds the plan.`,
    "char.papy.role": `The mentor`,
    "char.papy.desc": `Philosopher farmer, a SweetLife-free zone. Dispenses wisdom between two snores and a rerun of Return of the Jedi.`,
    "char.ouss.role": `The heart`,
    "char.ouss.desc": `The father-and-son duo everyone wants to protect. “Orwar madame!” The first to flee the pink madness.`,
    "char.sugar.role": `The big bad`,
    "char.sugar.desc": `The mastermind of SweetLife Industries. An icy voice behind a wall of screens. His plan: replace the water, the veggies… and freedom.`,
    "char.kevin.role": `The puppet king`,
    "char.kevin.desc": `A childish monarch hooked on his Game Boy and donuts, manipulated by Shu Ga. He hates “toilet water” and loves banning vegetables.`,
    "char.manager.role": `The tyrant boss`,
    "char.manager.desc": `Po's abusive boss. Cigarette in mouth, SugarMaxX in hand, he lords over his store… until one sip too many turns him into a monster.`,
    "char.sugarhead.role": `The mass threat`,
    "char.sugarhead.desc": `What Gloops become once stuffed with SugarMaxX: glazed eyes, sugary rage, flaming burps. The Empire's involuntary army.`,
    "char.mito.role": `The right hand`,
    "char.mito.desc": `Dr. Sugar's zealous assistant. Manufactures artificial vegetables and applauds his master's every evil cackle.`,
    "char.zog.role": `The sugar police`,
    "char.zog.desc": `The kingdom's law enforcement, popcorn in hand. Sent after the “dangerous mushroom-hatted eco-terrorist.”`,
    "story.eyebrow": `Pilot · Season 1, Episode 1`, "story.title": `“Water is Life”`, "story.scroll": `Scroll`,
    "scene.1.t": `The Wellness Fountain`,
    "scene.1.x": `The King unveils a fountain gifted by SweetLife. The water turns neon pink, the crowd rushes in. A sponsored newscast, an obsessive jingle: the grip begins.`,
    "scene.2.n": `01 · COMFORT ZONE`, "scene.2.t": `The convenience store`,
    "scene.2.x": `Po stocks cans while ogling Lili. First awkward crush, first misunderstood “detox smoothie.” The radio blares SugarMaxX ads on loop.`,
    "scene.3.n": `02-03 · TRIGGER`, "scene.3.t": `The town goes weird`,
    "scene.3.x": `The manager bullies Po. Outside, glassy-eyed customers lose it, pink can in hand. Something is very wrong.`,
    "scene.4.n": `04 · THE MENTOR`, "scene.4.t": `At Papy Mush's`,
    "scene.4.x": `Far from the ads, on the farm. “Be water, my boy.” Po drinks a cup of tea… and glimpses his destiny as leader of the revolution.`,
    "scene.5.n": `05 · THE RETURN`, "scene.5.t": `Shaun of the Gloops`,
    "scene.5.x": `Po heads back, lost in his monologue, blind to the town sinking into pink chaos. The store is wrecked. Lili is in danger.`,
    "scene.6.n": `06 · TRANSFORMATION`, "scene.6.t": `The birth of MushMaster`,
    "scene.6.x": `Flour sacks, a giant mushroom, a broken broom: Po rises unrecognizable. A slick pose, a staff in the monster's eye. The hero is born.`,
    "scene.7.n": `07 · THE REAL WEAPON`, "scene.7.t": `The smoothie engineer`,
    "scene.7.x": `Lili gets it: green juice is the antidote. Blender maxed out, the little car loaded with green bottles. Next stop: the fountain.`,
    "scene.8.n": `08 · RESOLUTION`, "scene.8.t": `BOOM`,
    "scene.8.x": `The car slams into the fountain. The pipeline blows. The water runs clear again, the Gloops come to their senses. But sirens are closing in…`,
    "scene.9.n": `09 · CONSEQUENCES`, "scene.9.t": `The palace &amp; Shu Ga`,
    "scene.9.x": `At the palace, Kevin V loses at Mario Kart. Shu Ga looms on the screens: “The pipeline is destroyed.” A bounty on the mushroom. Vegetables, banned.`,
    "scene.10.n": `10 · BACK TO THE STORE`, "scene.10.t": `WANTED: MushMaster`,
    "scene.10.x": `Veggie fridge sealed, a brand-new SugarMaxX dispenser, a wanted poster at the door. Po smiles: “Be water… Mush… MushMASTER!”`,
    "scene.11.n": `11 · EPILOGUE`, "scene.11.t": `Dr. Sugar's laugh`,
    "scene.11.x": `In his lab, Mito presents an artificial vegetable. The SweetLife logo pulses. Dr. Sugar smiles… then bursts into an evil cackle. To be continued.`,
    "videos.eyebrow": `In motion`,
    "videos.title": `The project is <span class="text-grad-pink">already alive</span>`,
    "videos.sub": `Teaser, pilot animatic, rigs and collection: production is underway. See for yourself.`,
    "video.teaser.tag": `Official teaser`, "video.teaser.t": `GLOOPS — First look`,
    "video.animatic.tag": `Animatic`, "video.animatic.t": `Pilot storyboard`,
    "video.rig.tag": `3D pipeline`, "video.rig.t": `Rig &amp; transformation`,
    "eco.eyebrow": `More than a series`,
    "eco.title": `A transmedia universe in <span class="text-grad-gold">360°</span>`,
    "eco.sub": `GLOOPS is designed from day one as a franchise. Four pillars, one world, complementary revenue streams.`,
    "eco.1.t": `Animated series`,
    "eco.1.x": `The heart of the universe. 3D action comedy, short-form and tuned for streaming and kids' TV. Pilot written, bible and animatic ready.`,
    "eco.1.s": `● Pilot &amp; bible ready`,
    "eco.2.t": `Video game`,
    "eco.2.x": `A faction game — the Avenggies (green) vs the Sugarheads (pink). Wacky weapons, candy parade floats, islands to conquer. A Gloops customizer is already playable online.`,
    "eco.2.s": `● Playable demo online`,
    "eco.2.cta": `Play the customizer →`,
    "eco.3.t": `Figurines &amp; collection`,
    "eco.3.x": `Designs built for toy-art and blind-box. MushMaster, DemonSugar, the King… a premium collection already prototyped as product renders.`,
    "eco.3.s": `● Prototypes ready`,
    "eco.4.t": `Community &amp; social`,
    "eco.4.x": `Meme-ready characters made for TikTok, Instagram and YouTube Shorts. A social presence (@wearegloops) that turns audience into community.`,
    "eco.4.s": `● Live`,
    "invest.eyebrow": `Why now`,
    "invest.title": `An IP ready to <span class="text-grad-gold">pop</span>`,
    "invest.sub": `The right universe, at the right time, with the right team. Here's what makes GLOOPS investable today.`,
    "invest.stat1": `episodes written (S1)`, "invest.stat2": `characters designed`,
    "invest.stat3": `transmedia pillars`, "invest.stat4": `original IP owned`,
    "invest.t1.t": `A universal, timely theme`,
    "invest.t1.x": `Junk food vs nature, sugar addiction, the grip of brands: a satire parents and kids both get — and that makes everyone laugh.`,
    "invest.t2.t": `Built for merchandising`,
    "invest.t2.x": `Iconic silhouettes, two colorful camps, “cute villains.” Every Gloop is a piece of merch and a meme waiting to happen.`,
    "invest.t3.t": `A team that delivers`,
    "invest.t3.x": `Powered by Mooncake Studio — character design, modeling, rig, fur and full pipeline, with a track record on Netflix, Canal+ and AAA gaming projects.`,
    "invest.compare.t": `Playing in the big leagues`,
    "invest.compare.x": `GLOOPS targets the territory of irreverent kids' franchises that win across series, games and stores:`,
    "contact.eyebrow": `Let's talk`, "contact.title": `Join<br>the resistance.`,
    "contact.x": `Distributor, financier, co-producer? Get the full deck (bible, pilot, production plan) and let's talk next steps.`,
    "contact.cta": `Get the deck`,
    "form.name": `Name`, "form.email": `Email`, "form.org": `Company / Organization`,
    "form.msg": `Your message`, "form.send": `Send`,
    "footer.tag": `Water is life. Sugar is power.`,
    "footer.copy": `© 2026 GLOOPS — an original creation produced by Mooncake Studio. All rights reserved.`,
    "music.label": `Ambient`
  };

  let currentLang = "fr";
  const i18nNodes = $$("[data-i18n]");
  const FR = {};
  i18nNodes.forEach((n) => { FR[n.dataset.i18n] = n.innerHTML; });

  function setLang(lang) {
    currentLang = lang === "en" ? "en" : "fr";
    const dict = currentLang === "en" ? EN : FR;
    i18nNodes.forEach((n) => {
      const v = dict[n.dataset.i18n];
      if (v != null) n.innerHTML = v;
    });
    document.documentElement.lang = currentLang;
    document.body.dataset.lang = currentLang;
    try { localStorage.setItem("gloops-lang", currentLang); } catch (e) {}
  }

  // apply saved preference
  let saved = "fr";
  try { saved = localStorage.getItem("gloops-lang") || "fr"; } catch (e) {}
  document.body.dataset.lang = "fr";
  if (saved === "en") setLang("en");

  const langSwitch = $("#lang-switch");
  langSwitch && langSwitch.addEventListener("click", () => setLang(currentLang === "en" ? "fr" : "en"));

  /* ---------- LOADER ---------- */
  const loader = $("#loader");
  const fill = $("#loader-fill");
  const pct = $("#loader-pct");
  let p = 0;
  const tick = setInterval(() => {
    p += Math.random() * 18 + 6;
    if (p >= 100) { p = 100; clearInterval(tick); }
    if (fill) fill.style.width = p + "%";
    if (pct) pct.textContent = Math.floor(p) + "%";
    if (p === 100) {
      setTimeout(() => {
        loader && loader.classList.add("done");
        startReveals();
      }, 350);
    }
  }, 160);
  window.addEventListener("load", () => { p = Math.max(p, 92); });

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = $("#cursor");
  const dot = $("#cursor-dot");
  if (cursor && dot && window.matchMedia("(hover: hover)").matches) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      dot.style.left = tx + "px"; dot.style.top = ty + "px";
    });
    const loop = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.left = cx + "px"; cursor.style.top = cy + "px";
      requestAnimationFrame(loop);
    };
    loop();
    const hov = "a, button, .char-card, .video-card, .pillar, .scene, .split-handle, input, textarea, .compare-tag";
    document.addEventListener("mouseover", (e) => { if (e.target.closest(hov)) cursor.classList.add("hover"); });
    document.addEventListener("mouseout",  (e) => { if (e.target.closest(hov)) cursor.classList.remove("hover"); });
  }

  /* ---------- NAV ---------- */
  const nav = $("#nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    const tt = $("#to-top");
    if (tt) tt.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("#nav-toggle");
  const links = $("#nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
    });
    $$(".nav-link, .nav-cta", links).forEach((l) =>
      l.addEventListener("click", () => { toggle.classList.remove("open"); links.classList.remove("open"); })
    );
  }

  /* ---------- REVEAL ---------- */
  function startReveals() {
    const els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- DUALITY SPLIT ---------- */
  const split = $("#split");
  if (split) {
    const green = $("#split-green");
    const divider = $("#split-divider");
    const handle = $("#split-handle");
    let posPct = 50, dragging = false;

    const apply = (v) => {
      posPct = Math.max(4, Math.min(96, v));
      green.style.clipPath = `inset(0 ${100 - posPct}% 0 0)`;
      divider.style.left = posPct + "%";
      handle.style.left = posPct + "%";
    };
    apply(50);

    const setFromX = (clientX) => {
      const r = split.getBoundingClientRect();
      apply(((clientX - r.left) / r.width) * 100);
    };
    const down = (e) => { dragging = true; split.style.cursor = "ew-resize"; setFromX((e.touches ? e.touches[0] : e).clientX); };
    const move = (e) => { if (!dragging) return; setFromX((e.touches ? e.touches[0] : e).clientX); };
    const up = () => { dragging = false; split.style.cursor = ""; };

    handle.addEventListener("mousedown", down);
    split.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    handle.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", up);

    // gentle auto-demo until first interaction
    let demo = true, t = 0;
    const wobble = () => {
      if (!demo) return;
      t += 0.012;
      apply(50 + Math.sin(t) * 30);
      requestAnimationFrame(wobble);
    };
    if (!reduceMotion) {
      const startDemo = () => { if (demo) requestAnimationFrame(wobble); };
      const stopDemo = () => { demo = false; };
      ["mousedown", "touchstart"].forEach((ev) => split.addEventListener(ev, stopDemo, { once: true }));
      // start demo only when in view
      new IntersectionObserver((en) => {
        if (en[0].isIntersecting) { startDemo(); }
      }, { threshold: 0.4 }).observe(split);
    }
  }

  /* ---------- FACTION TABS ---------- */
  const tabs = $$(".faction-tab");
  const gridGreen = $("#grid-green");
  const gridPink = $("#grid-pink");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const green = tab.dataset.faction === "green";
      gridGreen.classList.toggle("hidden", !green);
      gridPink.classList.toggle("hidden", green);
      // re-trigger reveal on freshly shown cards
      $$(".char-card", green ? gridGreen : gridPink).forEach((c, i) => {
        c.classList.remove("in");
        setTimeout(() => c.classList.add("in"), 40 + i * 70);
      });
    });
  });

  /* ---------- CASTING: iconic-character badges ---------- */
  const ACTOR_ICON = {
    "Alexis Tomassian": ["fry.jpeg", "Fry (Futurama)"],
    "Dorothée Pousséo": ["Vanellope.jpeg", "Vanellope"],
    "Bernard Alane": ["Bernard Alane.jpg", "Aladdin"],
    "Christophe Lemoine": ["Cartman.jpeg", "Eric Cartman"],
    "Philippe Peythieu": ["Homer.png", "Homer Simpson"],
    "Féodor Atkine": ["Jafar.jpeg", "Jafar"],
    "Donald Reignoux": ["Titeuf.jpeg", "Titeuf"],
    "Brigitte Lecordier": ["sangoku.jpeg", "Son Goku"],
    "Eric Métayer": ["Iago.jpeg", "Iago"]
  };
  $$(".cast-card").forEach((card) => {
    const av = card.querySelector(".cast-avatar");
    const nameEl = card.querySelector(".cast-actor");
    if (!av || !nameEl) return;
    const info = ACTOR_ICON[nameEl.textContent.trim()];
    if (!info) return;
    const wrap = document.createElement("div");
    wrap.className = "cast-portrait";
    av.parentNode.insertBefore(wrap, av);
    wrap.appendChild(av);
    const ic = document.createElement("img");
    ic.className = "cast-icon";
    ic.src = "assets/img/actors/chr/" + encodeURIComponent(info[0]);
    ic.alt = info[1]; ic.title = "Voix de " + info[1]; ic.loading = "lazy";
    wrap.appendChild(ic);
  });

  /* ---------- STORY: pinned horizontal scroll ---------- */
  const story = $("#histoire");
  const track = $("#scenes-track");
  const scenes = $("#scenes");
  const bar = $("#story-bar");
  if (story && track) {
    const isMobile = () => window.innerWidth <= 860 || reduceMotion;
    let dist = 0;
    const update = () => {
      if (isMobile()) return;
      const max = story.offsetHeight - window.innerHeight;
      const prog = Math.min(1, Math.max(0, -story.getBoundingClientRect().top / (max || 1)));
      track.style.transform = "translateX(" + (-dist * prog) + "px)";
      if (bar) bar.style.width = (prog * 100) + "%";
    };
    const layout = () => {
      if (isMobile()) { story.style.height = ""; track.style.transform = ""; return; }
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      story.style.height = (window.innerHeight + dist) + "px";
      update();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", layout);
    window.addEventListener("load", layout);
    layout();
    // mobile fallback: progress bar from native horizontal scroll
    scenes && scenes.addEventListener("scroll", () => {
      if (!isMobile() || !bar) return;
      const m = scenes.scrollWidth - scenes.clientWidth;
      bar.style.width = (m > 0 ? (scenes.scrollLeft / m) * 100 : 0) + "%";
    }, { passive: true });
  }

  /* ---------- VIDEO PREVIEW on hover + LIGHTBOX ---------- */
  const lb = $("#lightbox");
  const lbVid = $("#lb-video");
  const lbClose = $("#lb-close");

  $$(".video-card").forEach((card) => {
    const v = $("video", card);
    if (v) {
      card.addEventListener("mouseenter", () => { v.play().catch(() => {}); });
      card.addEventListener("mouseleave", () => { v.pause(); });
    }
    card.addEventListener("click", () => {
      const src = card.dataset.video;
      if (!src || !lb || !lbVid) return;
      lbVid.src = src;
      lb.classList.add("open");
      document.body.classList.add("no-scroll");
      lbVid.play().catch(() => {});
    });
  });

  const closeLb = () => {
    if (!lb) return;
    lb.classList.remove("open");
    document.body.classList.remove("no-scroll");
    if (lbVid) { lbVid.pause(); lbVid.removeAttribute("src"); lbVid.load(); }
  };
  lbClose && lbClose.addEventListener("click", closeLb);
  lb && lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

  /* ---------- DÉCOR GALLERY MODAL ---------- */
  const dmodal = $("#decor-modal");
  if (dmodal) {
    const cards = $$(".decor-card");
    const data = cards.map((c) => ({
      src: c.querySelector("img").getAttribute("src"),
      name: (c.querySelector(".decor-name") || {}).textContent || "",
      desc: (c.querySelector(".decor-desc") || {}).textContent || "",
      faction: c.classList.contains("g") ? "g" : (c.classList.contains("p") ? "p" : "")
    }));
    const dmImg = $("#dm-img"), dmName = $("#dm-name"), dmDesc = $("#dm-desc"),
          dmCount = $("#dm-count"), dmPanel = $("#dm-panel");
    let idx = 0;
    const render = () => {
      const d = data[idx];
      dmImg.src = d.src; dmImg.alt = d.name;
      dmName.textContent = d.name; dmDesc.textContent = d.desc;
      dmCount.textContent = (idx + 1) + " / " + data.length;
      dmPanel.className = "dm-panel " + d.faction;
    };
    const open = (i) => { idx = i; render(); dmodal.classList.add("open"); dmodal.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); };
    const close = () => { dmodal.classList.remove("open"); dmodal.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); };
    const go = (step) => { idx = (idx + step + data.length) % data.length; render(); };
    cards.forEach((c, i) => {
      c.style.cursor = "pointer"; c.setAttribute("role", "button"); c.setAttribute("tabindex", "0");
      c.addEventListener("click", () => open(i));
      c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); } });
    });
    $("#dm-close").addEventListener("click", close);
    $("#dm-prev").addEventListener("click", () => go(-1));
    $("#dm-next").addEventListener("click", () => go(1));
    dmodal.addEventListener("click", (e) => { if (e.target === dmodal) close(); });
    window.addEventListener("keydown", (e) => {
      if (!dmodal.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    });
  }

  /* ---------- STAT COUNTERS ---------- */
  const stats = $$(".stat-num[data-count]");
  if (stats.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1400; const t0 = performance.now();
        const step = (now) => {
          const k = Math.min(1, (now - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.floor(eased * target) + (k === 1 ? suffix : "");
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    stats.forEach((s) => io.observe(s));
  }

  /* ---------- MUSIC ---------- */
  const mt = $("#music-toggle");
  const audio = $("#ambient");
  if (mt && audio) {
    audio.volume = 0.45;
    mt.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => mt.classList.add("playing")).catch(() => {});
      } else {
        audio.pause(); mt.classList.remove("playing");
      }
    });
  }

  /* ---------- SCROLL TOP ---------- */
  const tt = $("#to-top");
  tt && tt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- CONTACT FORM ---------- */
  const form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = $("button[type=submit]", form);
      const original = btn.textContent;
      btn.textContent = currentLang === "en" ? "Message sent ✓" : "Message envoyé ✓";
      btn.style.background = "linear-gradient(100deg,#aef06a,#3fb24a)";
      btn.style.color = "#16280a";
      form.reset();
      setTimeout(() => { btn.textContent = original; btn.style.background = ""; btn.style.color = ""; }, 2600);
    });
  }

  /* ---------- CHARACTER FICHE MODAL ---------- */
  const CHARS = {
    mushmaster: { faction: "g", name: "MushMaster", voice: "Alexis Tomassian", hero: "assets/img/ai/chr_v2/MushMaster.jpg", sb: ["06","10"],
      fr: { role: "Le héros masqué", desc: "L'alter ego de Po : chapeau de champignon, balai cassé, philosophie « Be water ». Maladroit mais redoutable, il devient malgré lui le visage de la résistance verte.", likes: ["« Be water »","Les poses stylées au ralenti","Protéger les Gloops"], dislikes: ["SweetLife Industries","Le SugarMaxX","L'injustice"] },
      en: { role: "The masked hero", desc: "Po's alter ego: mushroom hat, broken broom, the 'Be water' philosophy. Clumsy yet formidable, he becomes the face of the green resistance despite himself.", likes: ["'Be water'","Slow-mo hero poses","Protecting the Gloops"], dislikes: ["SweetLife Industries","SugarMaxX","Injustice"] } },
    po: { faction: "g", name: "Po", voice: "Alexis Tomassian", hero: "assets/img/ai/chr_v2/Po.jpg", sb: ["02","04"],
      fr: { role: "L'avatar du public", desc: "Balayeur-livreur de supérette, geek feignant accro à la télé et aux pubs. Amoureux transi de Lili, il enfile le champignon pour l'impressionner… et finit par y prendre goût.", likes: ["Lili","La sieste et la télé","Les conseils de Papy Mush"], dislikes: ["Son manager","Qu'on l'ignore","Son nom, « Potetoe »"] },
      en: { role: "The everyman", desc: "Lazy store clerk and delivery boy, a TV-and-ads-addicted geek. Smitten with Lili, he dons the mushroom to impress her — and ends up enjoying it.", likes: ["Lili","Naps and TV","Papy Mush's advice"], dislikes: ["His manager","Being ignored","His name, 'Potetoe'"] } },
    lili: { faction: "g", name: "Lili", voice: "Dorothée Pousséo", hero: "assets/img/ai/chr_v2/Lili.jpg", sb: ["02","07"],
      fr: { role: "La cerveau", desc: "Caissière bobo-écolo, fan de smoothies détox et de brunchs Instagrammables. Lucide et débrouillarde, c'est elle qui comprend que le jus vert est l'antidote.", likes: ["Les smoothies green détox","Le bio stylé","Avoir raison"], dislikes: ["Le SugarMaxX","Le manager lourdingue","Les plans foireux"] },
      en: { role: "The brains", desc: "Bobo-eco cashier, fan of detox smoothies and Instagrammable brunches. Sharp and resourceful — she's the one who figures out green juice is the antidote.", likes: ["Green detox smoothies","Stylish organic","Being right"], dislikes: ["SugarMaxX","Her creepy manager","Half-baked plans"] } },
    papymush: { faction: "g", name: "Papy Mush", voice: "Bernard Alane", hero: "assets/img/ai/chr/PapyMush.jpg", sb: ["04","05"],
      fr: { role: "Le mentor", desc: "Fermier écolo old-school, 240 ans au compteur, sage et lent, parle par citations à la JCVD. Son thé aux champignons donne une forme olympique. Zone sans SweetLife.", likes: ["Le calme de la campagne","Le thé aux champignons","Le Retour du Jedi"], dislikes: ["La pub","Le bruit","SweetLife"] },
      en: { role: "The mentor", desc: "Old-school eco-farmer, 240 years old, wise and slow, speaks in JCVD-style aphorisms. His mushroom tea gives Olympic energy. A SweetLife-free zone.", likes: ["The quiet countryside","Mushroom tea","Return of the Jedi"], dislikes: ["Advertising","Noise","SweetLife"] } },
    ouss: { faction: "g", name: "Ouss & Tito", voice: "Donald Reignoux · Brigitte Lecordier (Tito)", hero: "assets/img/ai/chr_v2/Ouss.jpg", sb: ["03","05"],
      fr: { role: "Le cœur", desc: "Ouss, opportuniste au grand cœur, élève le petit Tito (adopté) avec maladresse et tendresse. Tito, idéaliste et naïf, croit que tout le monde peut s'améliorer.", likes: ["Tito","Faire le bien (à sa façon)","La famille"], dislikes: ["Les ennuis","La police","Ses propres faiblesses"] },
      en: { role: "The heart", desc: "Ouss, a big-hearted opportunist, raises little (adopted) Tito with clumsiness and tenderness. Tito, idealistic and naive, believes everyone can change.", likes: ["Tito","Doing good (his way)","Family"], dislikes: ["Trouble","The cops","His own weaknesses"] } },
    sugar: { faction: "p", name: "Dr. Sugar / Shu Ga", voice: "Féodor Atkine", hero: "assets/img/ai/chr_v2/DemonSugar.jpg", sb: ["11","09"],
      fr: { role: "Le grand méchant", desc: "Capitaliste pur, incarnation des dérives à la Coca-Cola. Il rend les Gloops malades pour que son frère leur vende des médicaments. Le cerveau de SweetLife Industries.", likes: ["Le profit","Le contrôle total","Les rires diaboliques"], dislikes: ["Les légumes","La résistance","Perdre de l'argent"] },
      en: { role: "The big bad", desc: "Pure capitalist, the embodiment of Coca-Cola-style excess. He makes the Gloops sick so his brother can sell them medicine. The mastermind of SweetLife Industries.", likes: ["Profit","Total control","Evil cackles"], dislikes: ["Vegetables","The resistance","Losing money"] } },
    kevin: { faction: "p", name: "Kevin V", voice: "Christophe Lemoine", hero: "assets/img/ai/chr_v2/King.jpg", sb: ["01","09"],
      fr: { role: "Le roi-pantin", desc: "Jeune, ignorant, manipulable. Il se fout du peuple, adore l'argent, le pouvoir et surtout MANGER. Le pantin parfait pour Shu Ga.", likes: ["Les donuts","La Game Boy","Interdire les légumes"], dislikes: ["L'eau « des chiottes »","Perdre à Mario Kart","Qu'on le dérange"] },
      en: { role: "The puppet king", desc: "Young, ignorant, easily manipulated. He couldn't care less about his people; he loves money, power and above all EATING. The perfect puppet for Shu Ga.", likes: ["Donuts","His Game Boy","Banning vegetables"], dislikes: ["'Toilet' water","Losing at Mario Kart","Being disturbed"] } },
    manager: { faction: "p", name: "Le Manager", voice: "Philippe Peythieu", hero: "assets/img/ai/chr_v2/Manager.jpg", sb: ["10","03"],
      fr: { role: "Le petit chef", desc: "Manager de la supérette : méchant, esclavagiste, machiste et dégueu… mais peut-être un cœur quelque part. Carbure au SugarMaxX et à la clope.", likes: ["Le SugarMaxX","Donner des ordres","Son poster « Best Boss »"], dislikes: ["Po","Les smoothies","Travailler (lui)"] },
      en: { role: "The petty tyrant", desc: "Convenience-store manager: nasty, slave-driving, sexist and gross… but maybe a heart somewhere. Runs on SugarMaxX and cigarettes.", likes: ["SugarMaxX","Bossing people around","His 'Best Boss' poster"], dislikes: ["Po","Smoothies","Doing his own work"] } },
    sugarhead: { faction: "p", name: "SugarHead", voice: "—", hero: "assets/img/ai/chr_v2/SugarHead.jpg", sb: ["03","08"],
      fr: { role: "La menace de masse", desc: "Ce que deviennent les Gloops gavés de SugarMaxX : yeux vitreux, rage sucrée, rots enflammés. L'armée involontaire de l'Empire.", likes: ["Le SugarMaxX","Mordre","Foncer dans le tas"], dislikes: ["Le jus vert","Reprendre ses esprits","Les légumes"] },
      en: { role: "The mass threat", desc: "What Gloops become once stuffed with SugarMaxX: glassy eyes, sugary rage, flaming burps. The Empire's involuntary army.", likes: ["SugarMaxX","Biting","Charging the crowd"], dislikes: ["Green juice","Snapping out of it","Vegetables"] } },
    mito: { faction: "p", name: "Mito", voice: "Eric Métayer", hero: "assets/img/ai/chr_v2/Mito.jpg", sb: ["11","09"],
      fr: { role: "Le bras droit", desc: "Conseiller scientifique de Demon Sugar, pitchman de plans absurdes et très sournois. La morale ? À quoi ça sert ? Il fabrique des légumes artificiels.", likes: ["La science sans éthique","Plaire à son maître","Les inventions absurdes"], dislikes: ["Le vrai bio","Échouer","Les questions gênantes"] },
      en: { role: "The right hand", desc: "Demon Sugar's science advisor, pitchman of absurd schemes and very sneaky. Morals? What for? He manufactures artificial vegetables.", likes: ["Ethics-free science","Pleasing his master","Absurd inventions"], dislikes: ["Real organic","Failing","Awkward questions"] } },
    eka: { faction: "g", name: "Eka", voice: "—", hero: "assets/img/ai/chr_v2/Eka.jpg", sb: ["09","08"],
      fr: { role: "La transfuge", desc: "D'abord ZogZog au service du roi, Eka bascule du côté de la Résistance quand elle réalise qu'elle servait le mauvais camp.", likes: ["La vérité","La rédemption","Les légumes (finalement)"], dislikes: ["Avoir été manipulée","Shu Ga","L'injustice"] },
      en: { role: "The defector", desc: "First a ZogZog in the king's service, Eka switches to the Resistance when she realizes she was on the wrong side.", likes: ["The truth","Redemption","Vegetables (eventually)"], dislikes: ["Being manipulated","Shu Ga","Injustice"] } },
    zogzog: { faction: "p", name: "Les ZogZogs", voice: "Christophe Lemoine · Emmanuel Curtil", hero: "assets/img/ai/chr_v2/ZogZog.jpg", sb: ["09","10"],
      fr: { role: "La police du sucre", desc: "La police-armée du roi, à la botte de Shu Ga. Idiots mais obéissants (Brutus, Zak, Joe, Gogol…). Lancés aux trousses du dangereux champignon.", likes: ["Le popcorn","Obéir","Le pouvoir"], dislikes: ["Réfléchir","MushMaster","Les légumes verts"] },
      en: { role: "The sugar police", desc: "The king's police-army, at Shu Ga's command. Idiots but obedient (Brutus, Zak, Joe, Gogol…). On the hunt for the dangerous mushroom.", likes: ["Popcorn","Following orders","Power"], dislikes: ["Thinking","MushMaster","Green vegetables"] } }
  };
  const SRCMAP = { "MushMaster.jpg":"mushmaster", "Po.jpg":"po", "Lili.jpg":"lili", "PapyMush.jpg":"papymush", "Healfy-Ouss_N_Titp.png":"ouss", "Ouss.jpg":"ouss", "DemonSugar.jpg":"sugar", "King_N_ZogZog.jpg":"kevin", "King.jpg":"kevin", "Manager.jpg":"manager", "SugarHead.jpg":"sugarhead", "Scientific-Mito.png":"mito", "Mito.jpg":"mito", "ZogZog.jpg":"zogzog", "Eka.jpg":"eka" };

  const cmodal = $("#char-modal");
  if (cmodal) {
    const cmHero = $("#cm-hero-img"), cmRole = $("#cm-role"), cmName = $("#cm-name"),
          cmDesc = $("#cm-desc"), cmLikes = $("#cm-likes"), cmDislikes = $("#cm-dislikes"),
          cmVoice = $("#cm-voice"), cmSb = $("#cm-sb"), cmPanel = $("#cm-panel");
    let openId = null;

    const render = (id) => {
      const c = CHARS[id]; if (!c) return;
      const L = currentLang === "en" ? "en" : "fr";
      cmHero.src = c.hero; cmHero.alt = c.name;
      cmRole.textContent = c[L].role; cmRole.className = "cm-role " + c.faction;
      cmName.textContent = c.name;
      cmDesc.textContent = c[L].desc;
      cmLikes.innerHTML = c[L].likes.map((x) => "<li>" + x + "</li>").join("");
      cmDislikes.innerHTML = c[L].dislikes.map((x) => "<li>" + x + "</li>").join("");
      cmVoice.textContent = c.voice;
      cmSb.innerHTML = c.sb.map((n) => '<img src="assets/img/keyframes/DRAW/' + n + '.png" alt="" loading="lazy">').join("");
      cmPanel.className = "cm-panel " + c.faction;
    };
    const openChar = (id) => {
      if (!CHARS[id]) return;
      openId = id; render(id);
      cmodal.classList.add("open"); cmodal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    };
    const closeChar = () => {
      cmodal.classList.remove("open"); cmodal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll"); openId = null;
    };

    $$(".char-card").forEach((card) => {
      card.setAttribute("role", "button"); card.setAttribute("tabindex", "0");
      const go = () => {
        const img = card.querySelector(".char-img"); if (!img) return;
        const key = decodeURIComponent(img.getAttribute("src")).split("/").pop();
        const id = SRCMAP[key]; if (id) openChar(id);
      };
      card.addEventListener("click", go);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
    $("#cm-close").addEventListener("click", closeChar);
    cmodal.addEventListener("click", (e) => { if (e.target === cmodal) closeChar(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape" && cmodal.classList.contains("open")) closeChar(); });
    // re-render on language toggle while open
    const ls = $("#lang-switch");
    ls && ls.addEventListener("click", () => { if (openId) setTimeout(() => render(openId), 0); });
  }

  /* ---------- HERO PARALLAX (light) ---------- */
  if (!reduceMotion) {
    const heroLogo = $(".hero-logo");
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight && heroLogo) {
        heroLogo.style.transform = `translateY(${y * 0.18}px)`;
      }
    }, { passive: true });
  }
})();
