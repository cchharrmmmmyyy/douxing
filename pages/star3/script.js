// Star3 页面动画增强版：滚动出现、错位入场、顶部进度条、返回顶部按钮。
document.addEventListener("DOMContentLoaded", function () {
  // 1. 顶部滚动进度条
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = percent + "%";
  }

  window.addEventListener("scroll", updateProgress);
  updateProgress();

  // 2. 首屏标签依次出现
  var tags = document.querySelectorAll(".hero-tags span");
  tags.forEach(function (tag, index) {
    tag.style.animationDelay = 0.35 + index * 0.12 + "s";
    tag.classList.add("tag-pop");
  });

  // 3. 页面内容滚动出现，带轻微错位延迟
  var items = document.querySelectorAll(
    ".info-panel, .basic-card, .quote-card, .content-section, .achievement-card, .timeline-item"
  );

  items.forEach(function (item, index) {
    item.classList.add("reveal-item");
    item.style.transitionDelay = Math.min(index * 0.04, 0.28) + "s";
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  items.forEach(function (item) {
    observer.observe(item);
  });

  // 4. 成就卡片年份轻微数字跳动效果，不改变原文字内容
  var years = document.querySelectorAll(".achievement-card strong");
  years.forEach(function (year) {
    year.addEventListener("mouseenter", function () {
      year.classList.remove("year-bounce");
      void year.offsetWidth;
      year.classList.add("year-bounce");
    });
  });

  // 5. 返回顶部按钮：滚动后出现
  var backTop = document.createElement("button");
  backTop.className = "back-top";
  backTop.type = "button";
  backTop.textContent = "↑";
  backTop.setAttribute("aria-label", "返回顶部");
  document.body.appendChild(backTop);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 420) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  });

  backTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  // 6. 栏目导航：点击后平滑定位，并自动高亮当前栏目
  var navLinks = document.querySelectorAll(".section-nav a");
  var sections = Array.prototype.map.call(navLinks, function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  function updateActiveNav() {
    var currentId = "";
    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= 140) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // 7. 成就卡片展开说明：增加一点可交互内容
  var moreButtons = document.querySelectorAll(".more-btn");
  moreButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var card = button.closest(".achievement-card");
      if (!card) return;
      var isOpen = card.classList.toggle("open");
      button.textContent = isOpen ? "收起说明" : "查看说明";
    });
  });

});
