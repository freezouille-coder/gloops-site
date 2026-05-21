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
    "nav.videos": `Videos`, "nav.eco": `The Ecosystem`, "nav.invest": `Invest`, "nav.decors": `Sets`,
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

  /* ---------- STORY SCROLLER ---------- */
  const scenes = $("#scenes");
  const bar = $("#story-bar");
  if (scenes && bar) {
    const update = () => {
      const max = scenes.scrollWidth - scenes.clientWidth;
      bar.style.width = (max > 0 ? (scenes.scrollLeft / max) * 100 : 0) + "%";
    };
    scenes.addEventListener("scroll", update, { passive: true });
    update();
    // drag to scroll (desktop)
    let down = false, sx = 0, sl = 0;
    scenes.addEventListener("mousedown", (e) => { down = true; sx = e.pageX; sl = scenes.scrollLeft; });
    window.addEventListener("mouseup", () => { down = false; });
    scenes.addEventListener("mousemove", (e) => { if (down) { e.preventDefault(); scenes.scrollLeft = sl - (e.pageX - sx); } });
    // wheel -> horizontal
    scenes.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { scenes.scrollLeft += e.deltaY; }
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
