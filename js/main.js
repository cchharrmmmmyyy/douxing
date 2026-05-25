const track = document.getElementById("carouselTrack");
const indicators = document.getElementById("carouselIndicators");
const prevButton = document.getElementById("carouselPrev");
const nextButton = document.getElementById("carouselNext");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));

let current = 0;
let timer;

function normalizeIndex(index) {
  return (index + slides.length) % slides.length;
}

function renderIndicators() {
  indicators.innerHTML = "";
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `切换到第 ${index + 1} 张`);
    dot.classList.toggle("is-active", index === current);
    dot.addEventListener("click", () => {
      goTo(index);
      resetTimer();
    });
    indicators.appendChild(dot);
  });
}

function updateCarousel() {
  track.style.transform = `translateX(-${current * 100}%)`;
  Array.from(indicators.children).forEach((dot, index) => {
    dot.classList.toggle("is-active", index === current);
  });
}

function goTo(index) {
  current = normalizeIndex(index);
  updateCarousel();
}

function goRight() {
  goTo(current + 1);
}

function goLeft() {
  goTo(current - 1);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    goTo(current + 1);
  }, 4000);
}

prevButton.addEventListener("click", () => {
  goLeft();
  resetTimer();
});

nextButton.addEventListener("click", () => {
  goRight();
  resetTimer();
});

renderIndicators();
updateCarousel();
resetTimer();
