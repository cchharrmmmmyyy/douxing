const track = document.getElementById("carouselTrack");
const indicators = document.getElementById("carouselIndicators");
const prevButton = document.getElementById("carouselPrev");
const nextButton = document.getElementById("carouselNext");
const toggleButton = document.getElementById("carouselToggle");
const activeProfile = document.getElementById("activeProfile");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));

const athleteProfiles = [
  {
    key: "kobe",
    badge: "01",
    name: "科比·布莱恩特",
    sport: "篮球",
    link: "./pages/zy/kobe.html",
    summary: "凌晨训练、关键投篮、极致胜负心，是他的页面关键词。",
    scores: { speed: 88, power: 90, skill: 94, clutch: 98, influence: 99 }
  },
  {
    key: "table",
    badge: "02",
    name: "国乒三重火力",
    sport: "乒乓球",
    link: "./pages/star2/index.html",
    summary: "速度、旋转和连续判断，让每一板都像压缩过的战术选择。",
    scores: { speed: 96, power: 86, skill: 98, clutch: 95, influence: 94 }
  },
  {
    key: "zhu",
    badge: "03",
    name: "朱婷",
    sport: "排球",
    link: "./pages/star3/index.html",
    summary: "进攻高度和队伍责任感同时在线，是团队核心型选手的代表。",
    scores: { speed: 84, power: 96, skill: 92, clutch: 94, influence: 97 }
  },
  {
    key: "haaland",
    badge: "04",
    name: "埃尔林·哈兰德",
    sport: "足球",
    link: "./pages/star4/index.html",
    summary: "跑位冷静、终结果断，用很少触球制造很大杀伤。",
    scores: { speed: 92, power: 98, skill: 88, clutch: 93, influence: 91 }
  }
];

const abilityItems = [
  { key: "speed", label: "速度", note: "速度不只是谁跑得快，也包括判断和出手反应。" },
  { key: "power", label: "力量", note: "力量代表身体对抗、击球质量和终结动作的压迫感。" },
  { key: "skill", label: "技术", note: "技术越高，越能在复杂局面里找到更稳的解决办法。" },
  { key: "clutch", label: "关键分", note: "关键分能力看的是压力最大时还能不能主动做选择。" },
  { key: "influence", label: "影响力", note: "影响力来自成绩、风格、记忆点和对后来者的带动。" }
];

const quizQuestions = [
  {
    text: "比赛最后一刻，你更相信什么？",
    options: [
      { text: "反复训练出来的手感", target: "kobe" },
      { text: "快速判断和线路变化", target: "table" },
      { text: "把球交给团队核心", target: "zhu" },
      { text: "冷静等一个终结机会", target: "haaland" }
    ]
  },
  {
    text: "你最喜欢哪种高光镜头？",
    options: [
      { text: "压哨投篮", target: "kobe" },
      { text: "高速对拉", target: "table" },
      { text: "重扣得分", target: "zhu" },
      { text: "单刀破门", target: "haaland" }
    ]
  },
  {
    text: "如果训练只剩一个小时，你会练什么？",
    options: [
      { text: "重复最关键的动作", target: "kobe" },
      { text: "发接发和前三板", target: "table" },
      { text: "扣球线路和拦网", target: "zhu" },
      { text: "跑位和射门选择", target: "haaland" }
    ]
  },
  {
    text: "你更像哪种队友？",
    options: [
      { text: "愿意扛最后一攻", target: "kobe" },
      { text: "用节奏拖住局面", target: "table" },
      { text: "关键时刻稳住全队", target: "zhu" },
      { text: "少说话，直接进球", target: "haaland" }
    ]
  }
];

let current = 0;
let timer;
let isPlaying = true;
let activeAbility = "speed";
let quizIndex = 0;
const quizScores = { kobe: 0, table: 0, zhu: 0, haaland: 0 };

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

function updateProfile() {
  const profile = athleteProfiles[current];
  activeProfile.innerHTML = `
    <span class="profile-badge">${profile.badge}</span>
    <strong>${profile.name} / ${profile.sport}</strong>
    <span>${profile.summary}</span>
  `;
}

function updateCarousel() {
  track.style.transform = `translateX(-${current * 100}%)`;
  Array.from(indicators.children).forEach((dot, index) => {
    dot.classList.toggle("is-active", index === current);
  });
  updateProfile();
}

function goTo(index) {
  current = normalizeIndex(index);
  updateCarousel();
}

function resetTimer() {
  clearInterval(timer);
  if (!isPlaying) {
    return;
  }
  timer = setInterval(() => {
    goTo(current + 1);
  }, 4000);
}

function renderAbilityTabs() {
  const tabs = document.getElementById("abilityTabs");
  tabs.innerHTML = "";
  abilityItems.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item.label;
    button.classList.toggle("is-active", item.key === activeAbility);
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(item.key === activeAbility));
    button.addEventListener("click", () => {
      activeAbility = item.key;
      renderAbility();
    });
    tabs.appendChild(button);
  });
}

function renderAbility() {
  const board = document.getElementById("abilityBoard");
  const note = document.getElementById("abilityNote");
  const activeItem = abilityItems.find((item) => item.key === activeAbility);
  const sortedProfiles = [...athleteProfiles].sort((a, b) => b.scores[activeAbility] - a.scores[activeAbility]);

  renderAbilityTabs();
  board.innerHTML = sortedProfiles.map((profile) => {
    const score = profile.scores[activeAbility];
    return `
      <article class="ability-card">
        <strong>${profile.name}</strong>
        <small>${profile.sport}</small>
        <div class="ability-meter" aria-label="${profile.name}${activeItem.label}${score}分">
          <span style="--score: ${score}%"></span>
        </div>
        <div class="ability-score">${score}</div>
      </article>
    `;
  }).join("");
  note.textContent = activeItem.note;
}

function renderQuiz() {
  const card = document.getElementById("quizCard");
  const question = quizQuestions[quizIndex];
  card.innerHTML = `
    <div class="quiz-progress">Question ${quizIndex + 1} / ${quizQuestions.length}</div>
    <p class="quiz-question">${question.text}</p>
    <div class="quiz-options">
      ${question.options.map((option) => `<button type="button" data-target="${option.target}">${option.text}</button>`).join("")}
    </div>
  `;

  card.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      quizScores[button.dataset.target] += 1;
      quizIndex += 1;
      if (quizIndex >= quizQuestions.length) {
        renderQuizResult();
      } else {
        renderQuiz();
      }
    });
  });
}

function renderQuizResult() {
  const card = document.getElementById("quizCard");
  const winnerKey = Object.keys(quizScores).sort((a, b) => quizScores[b] - quizScores[a])[0];
  const profile = athleteProfiles.find((item) => item.key === winnerKey);

  card.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-progress">Your Match</div>
      <h3>${profile.name}</h3>
      <p>${profile.summary}</p>
      <div class="quiz-result-actions">
        <a href="${profile.link}">进入对应页面</a>
        <button class="quiz-reset" type="button">重新测试</button>
      </div>
    </div>
  `;

  card.querySelector(".quiz-reset").addEventListener("click", () => {
    quizIndex = 0;
    Object.keys(quizScores).forEach((key) => {
      quizScores[key] = 0;
    });
    renderQuiz();
  });
}

prevButton.addEventListener("click", () => {
  goTo(current - 1);
  resetTimer();
});

nextButton.addEventListener("click", () => {
  goTo(current + 1);
  resetTimer();
});

toggleButton.addEventListener("click", () => {
  isPlaying = !isPlaying;
  toggleButton.textContent = isPlaying ? "暂停" : "播放";
  toggleButton.setAttribute("aria-label", isPlaying ? "暂停轮播" : "播放轮播");
  resetTimer();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    goTo(current - 1);
    resetTimer();
  }
  if (event.key === "ArrowRight") {
    goTo(current + 1);
    resetTimer();
  }
});

renderIndicators();
updateCarousel();
renderAbility();
renderQuiz();
resetTimer();
