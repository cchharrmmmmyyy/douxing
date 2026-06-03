document.addEventListener("DOMContentLoaded", () => {
  /* ── Welcome splash ── */
  const splash = document.getElementById("welcome-splash");

  if (splash) {
    if (sessionStorage.getItem("welcome-shown")) {
      splash.remove();
    } else {
      const canvas = document.getElementById("splash-particles");
      const ctx = canvas.getContext("2d");
      const isMobile = window.innerWidth < 560;
      const particleCount = isMobile ? 40 : 80;
      let animId;
      let particles = [];
      let exiting = false;

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      function createParticle() {
        const colors = [
          { r: 18, g: 174, b: 234 },
          { r: 251, g: 248, b: 239 },
          { r: 202, g: 167, b: 92 },
          { r: 255, g: 255, b: 255 }
        ];
        const c = colors[Math.floor(Math.random() * colors.length)];
        return {
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 200,
          r: 0.8 + Math.random() * 3.2,
          alpha: 0.08 + Math.random() * 0.45,
          vy: -(0.3 + Math.random() * 1.6),
          vx: (Math.random() - 0.5) * 0.5,
          color: `rgba(${c.r},${c.g},${c.b},`
        };
      }

      for (let i = 0; i < particleCount; i++) {
        const p = createParticle();
        p.y = Math.random() * canvas.height;
        particles.push(p);
      }

      function animateParticles() {
        if (exiting) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -20) {
            p.y = canvas.height + 20;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -20) p.x = canvas.width + 20;
          if (p.x > canvas.width + 20) p.x = -20;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color + p.alpha + ")";
          ctx.fill();
        }
        animId = requestAnimationFrame(animateParticles);
      }

      animateParticles();

      /* Split title into character spans */
      const titleEl = document.querySelector(".splash-title");
      const rawText = titleEl.textContent.trim();
      titleEl.innerHTML = "";
      for (const ch of rawText) {
        const span = document.createElement("span");
        span.textContent = ch === " " ? " " : ch;
        if (ch === " ") span.classList.add("space-char");
        span.style.animationDelay = Math.random() * 60 + "ms";
        titleEl.appendChild(span);
      }

      const numberEl = document.querySelector(".splash-number");
      const barEl = document.querySelector(".splash-bar span");
      const hintEl = document.querySelector(".splash-hint");
      const skipBtn = document.querySelector(".splash-skip");
      const titleSpans = titleEl.querySelectorAll("span:not(.space-char)");

      function removeSplashElement() {
        window.removeEventListener("resize", resizeCanvas);
        document.removeEventListener("keydown", onSkip);
        splash.remove();
      }

      function exitSplash() {
        if (exiting) return;
        exiting = true;
        cancelAnimationFrame(animId);
        splash.classList.add("splash-exit");
        sessionStorage.setItem("welcome-shown", "1");
        splash.addEventListener("transitionend", removeSplashElement, { once: true });
        setTimeout(removeSplashElement, 900);
      }

      function onSkip() {
        if (exiting) return;
        clearTimeout(autoTimer);
        exitSplash();
      }

      /* Animation sequence */
      const schedule = [
        [100,  () => numberEl.classList.add("splash-active")],
        [400,  () => titleSpans.forEach((s, i) => {
                 s.style.animationDelay = (i * 55) + "ms";
                 s.classList.add("splash-active");
               })],
        [1300, () => barEl.classList.add("splash-active")],
        [2100, () => hintEl.classList.add("splash-active")],
        [1600, () => skipBtn.classList.add("show")]
      ];

      for (const [delay, fn] of schedule) {
        setTimeout(fn, delay);
      }

      const autoTimer = setTimeout(exitSplash, 4000);

      skipBtn.addEventListener("click", onSkip);
      document.addEventListener("keydown", onSkip);
    }
  }

  /* ── Existing reveal logic ── */
  const revealSections = document.querySelectorAll(".section");
  const staggerGroups = [
    ".bio-points",
    ".stats-grid",
    ".chapter-list",
    ".archive-layout",
    ".route-track",
    ".story-grid",
    ".honors-wall",
    ".feature-grid",
    ".season-list"
  ];

  document.querySelectorAll(".season-panel").forEach((panel, index, panels) => {
    const goalStat = Array.from(panel.querySelectorAll(".season-stat")).find((stat) => {
      const label = stat.querySelector("dt");
      return label && label.textContent.trim().toLowerCase().includes("goals");
    });
    const goalValue = goalStat ? goalStat.querySelector("dd") : null;
    const rawGoal = goalValue ? goalValue.textContent.trim() : "0";
    const numericGoal = parseInt(rawGoal.replace(/[^\d]/g, ""), 10) || 0;
    const maxGoal = 100;
    const progress = Math.min(100, Math.max(8, Math.round((numericGoal / maxGoal) * 100)));

    panel.style.setProperty("--season-progress", progress + "%");
    panel.style.setProperty("--season-position", (index / Math.max(panels.length - 1, 1)) * 100 + "%");

    panel.querySelectorAll(".season-stat dd").forEach((value) => {
      const text = value.textContent.trim();
      const number = parseInt(text.replace(/[^\d]/g, ""), 10);
      if (!Number.isNaN(number) && number > 0) {
        value.dataset.countTo = number;
        value.dataset.countSuffix = text.replace(String(number), "");
        value.textContent = "0" + value.dataset.countSuffix;
      }
    });
  });

  revealSections.forEach((section) => {
    section.classList.add("reveal");
  });

  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.classList.add("stagger-child");
        child.style.setProperty("--stagger-index", index);
      });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll("[data-count-to]").forEach((value) => {
            if (value.dataset.counted === "true") return;
            value.dataset.counted = "true";

            const target = Number(value.dataset.countTo);
            const suffix = value.dataset.countSuffix || "";
            const start = performance.now();
            const duration = 900 + Math.min(target, 100) * 8;

            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              value.textContent = Math.round(target * eased) + suffix;
              if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  revealSections.forEach((section) => observer.observe(section));
});
