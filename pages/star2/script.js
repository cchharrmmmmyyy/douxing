document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(".magazine-cover, .section");
  const staggerGroups = [
    ".cover-actions",
    ".issue-strip",
    ".story-board",
    ".player-tabs",
    ".cast-grid",
    ".arsenal-grid",
    ".rally-stack",
    ".gallery-masonry",
    ".keyword-grid"
  ];

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
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
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -80px 0px"
    }
  );

  revealTargets.forEach((target) => observer.observe(target));

  const tabs = document.querySelectorAll("[data-player]");
  const cards = document.querySelectorAll("[data-player-card]");
  const collage = document.querySelector(".cover-collage");
  const castGrid = document.querySelector(".cast-grid");

  const activatePlayer = (player) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.player === player;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    cards.forEach((card) => {
      card.classList.toggle("is-active", card.dataset.playerCard === player);
    });

    if (collage) {
      collage.dataset.active = player;
    }

    if (castGrid) {
      castGrid.classList.add("has-active");
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activatePlayer(tab.dataset.player));
  });
});
