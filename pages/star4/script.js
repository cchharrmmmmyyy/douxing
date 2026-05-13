document.addEventListener("DOMContentLoaded", () => {
  const revealSections = document.querySelectorAll(".section");
  const staggerGroups = [
    ".bio-points",
    ".stats-grid",
    ".chapter-list",
    ".archive-layout",
    ".route-track",
    ".story-grid",
    ".honors-wall"
  ];

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
