// 卡片悬停效果
const cards = document.querySelectorAll(".star-card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-4px)";
    card.style.transition = "transform 180ms ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// 轮播
const track = document.getElementById("carouselTrack");
const indicators = document.getElementById("carouselIndicators");
const slides = track.querySelectorAll(".carousel-slide");
let current = 0;
let timer;

// 创建指示器
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goTo(i);
    resetTimer();
  });
  indicators.appendChild(dot);
});

function goTo(index) {
  current = index;
  track.style.transform = `translateX(-${current * 100}%)`;
  indicators.querySelectorAll("span").forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    goTo((current + 1) % slides.length);
  }, 1000);
}

resetTimer();
