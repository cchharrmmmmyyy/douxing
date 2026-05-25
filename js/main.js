const sections = document.querySelectorAll(".showcase-section");

sections.forEach((section) => {
  section.classList.add("reveal-section");
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
    rootMargin: "0px 0px -70px 0px"
  }
);

sections.forEach((section) => observer.observe(section));
