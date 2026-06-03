document.addEventListener("DOMContentLoaded", () => {
  const syncHomeNavState = () => {
    const navLinks = document.querySelectorAll(".poster-nav a");
    if (!document.getElementById("players")) {
      return;
    }

    navLinks.forEach((link) => link.classList.remove("is-current"));
    const targetHref = window.location.hash === "#players" ? "#players" : "./index.html";
    const activeLink = Array.from(navLinks).find((link) => link.getAttribute("href") === targetHref);
    if (activeLink) {
      activeLink.classList.add("is-current");
    }
  };

  syncHomeNavState();
  window.addEventListener("hashchange", syncHomeNavState);

  const playerResources = [
    {
      key: "fzd",
      name: "樊振东",
      english: "Fan Zhendong",
      page: "./fan-zhendong.html",
      image: "./assets/fan-zhendong-2.png",
      role: "相持压迫 / 反手拧拉",
      intro: "正反手质量厚，连续对抗能力强，是国乒新周期代表人物。",
      videoTitle: "樊振东巴黎奥运男单冠军瞬间",
      bvid: "BV1fsdtYREdM",
      baikeUrl: "https://zh.wikipedia.org/wiki/%E6%A8%8A%E6%8C%AF%E4%B8%9C"
    },
    {
      key: "ml",
      name: "马龙",
      english: "Ma Long",
      page: "./ma-long.html",
      image: "./assets/ma-long-2.png",
      role: "体系控制 / 全面技术",
      intro: "发接发、衔接、相持和变线都极完整，是技术系统型选手代表。",
      videoTitle: "马龙东京奥运男单决赛",
      bvid: "BV1Nz4y1s7Dz",
      baikeUrl: "https://zh.wikipedia.org/wiki/%E9%A9%AC%E9%BE%99_%28%E4%B9%92%E4%B9%93%E7%90%83%E8%BF%90%E5%8A%A8%E5%91%98%29"
    },
    {
      key: "zjk",
      name: "张继科",
      english: "Zhang Jike",
      page: "./zhang-jike.html",
      image: "./assets/zhang-jike-2.png",
      role: "大赛爆发 / 反手锋芒",
      intro: "关键分气质鲜明，反手技术和舞台表现都极具辨识度。",
      videoTitle: "张继科伦敦奥运男单决赛",
      bvid: "BV1rW4y1w71M",
      baikeUrl: "https://zh.wikipedia.org/wiki/%E5%BC%A0%E7%BB%A7%E7%A7%91"
    }
  ];

  const gearItems = [
    {
      id: "fzd-alc",
      name: "Butterfly Fan Zhendong ALC",
      brand: "Butterfly",
      type: "明星同款方向",
      player: "樊振东",
      level: "advanced",
      style: "loop",
      budget: "high",
      imageType: "blade",
      imageLabel: "FZD ALC",
      imageUrl: "./assets/gear/fan-zhendong-alc.jpg",
      feature: "ALC 结构，速度、控制和持球感比较均衡，适合主动上手和连续弧圈。",
      suitable: "适合有基础、能主动发力、喜欢正反手连续进攻的人。",
      unsuitable: "刚入门直接用会觉得弹，动作还没固定时不好控。",
      rating: "★★★★★",
      buyUrl: "https://s.taobao.com/search?q=Butterfly%20Fan%20Zhendong%20ALC"
    },
    {
      id: "w968",
      name: "DHS W968 / Hurricane Long 5 National",
      brand: "DHS 红双喜",
      type: "明星同款方向",
      player: "马龙",
      level: "advanced",
      style: "control",
      budget: "high",
      imageType: "blade",
      imageLabel: "W968",
      imageUrl: "./assets/gear/w968.jpg",
      feature: "偏弧圈和中远台发力，底劲足，适合正手质量和线路控制。",
      suitable: "适合动作完整、正手发力比较充分的进阶或高水平玩家。",
      unsuitable: "不太适合纯新手，也不适合只想轻松借力的人。",
      rating: "★★★★★",
      buyUrl: "https://s.taobao.com/search?q=DHS%20W968%20%E9%A9%AC%E9%BE%99"
    },
    {
      id: "zjk-alc",
      name: "Butterfly Zhang Jike ALC / Viscaria 方向",
      brand: "Butterfly",
      type: "明星同款方向",
      player: "张继科",
      level: "advanced",
      style: "fast",
      budget: "high",
      imageType: "blade",
      imageLabel: "ZJK ALC",
      imageUrl: "./assets/gear/viscaria.jpg",
      feature: "ALC 外置纤维手感，速度直接，反手抢攻和近台衔接很舒服。",
      suitable: "适合近台快节奏、反手发力多、喜欢抢先上手的人。",
      unsuitable: "防守型和慢节奏练球用户可能会觉得太冲。",
      rating: "★★★★☆",
      buyUrl: "https://s.taobao.com/search?q=Butterfly%20Zhang%20Jike%20ALC"
    },
    {
      id: "beginner-control",
      name: "五夹纯木控制型套装",
      brand: "入门通用",
      type: "普通推荐",
      level: "beginner",
      style: "control",
      budget: "low",
      imageType: "blade",
      imageLabel: "5 Ply",
      imageUrl: "./assets/gear/viscaria.jpg",
      feature: "速度不夸张，手感清楚，比较容易知道自己有没有打到球。",
      suitable: "适合刚开始学动作、练定点、练发球和搓球的人。",
      unsuitable: "如果已经能稳定拉冲，可能会觉得力量上限不够。",
      rating: "★★★★☆",
      buyUrl: "https://s.taobao.com/search?q=%E4%B9%92%E4%B9%93%E7%90%83%E6%8B%8D%20%E4%BA%94%E5%A4%B9%E7%BA%AF%E6%9C%A8"
    },
    {
      id: "loop-training",
      name: "七夹或内置纤维弧圈套装",
      brand: "进阶通用",
      type: "普通推荐",
      level: "intermediate",
      style: "loop",
      budget: "mid",
      imageType: "blade",
      imageLabel: "Loop",
      imageUrl: "./assets/gear/fan-zhendong-alc.jpg",
      feature: "比入门板更有底劲，但不至于太弹，适合练摩擦和连续拉球。",
      suitable: "适合能稳定对拉、想提升弧圈质量的人。",
      unsuitable: "只打娱乐局、动作还没成型的话没必要太早上。",
      rating: "★★★★☆",
      buyUrl: "https://s.taobao.com/search?q=%E4%B9%92%E4%B9%93%E7%90%83%E6%8B%8D%20%E4%B8%83%E5%A4%B9%20%E5%86%85%E7%BD%AE%E7%BA%A4%E7%BB%B4"
    },
    {
      id: "fast-attack",
      name: "外置纤维快攻套装",
      brand: "进攻通用",
      type: "普通推荐",
      level: "intermediate",
      style: "fast",
      budget: "mid",
      imageType: "blade",
      imageLabel: "Fast",
      imageUrl: "./assets/gear/viscaria.jpg",
      feature: "出球快，借力轻松，适合近台抢攻和反手速度。",
      suitable: "适合喜欢站近台、打速度和落点的人。",
      unsuitable: "退台多、以慢拉和控制为主的人可能不顺手。",
      rating: "★★★★☆",
      buyUrl: "https://s.taobao.com/search?q=Butterfly%20Viscaria%20%E4%B9%92%E4%B9%93%E7%90%83%E6%8B%8D"
    }
  ];

  const ballItems = [
    {
      name: "Butterfly R40+",
      brand: "Butterfly",
      imageLabel: "R40+",
      imageUrl: "./assets/gear/table-tennis-ball.png",
      feature: "弹跳和线路比较稳定，比赛感强。",
      suitable: "适合比赛、考试展示、正式对练。",
      unsuitable: "日常多球训练用起来成本偏高。",
      rating: "★★★★★",
      buyUrl: "https://detail.tmall.com/item.htm?id=603859108746&skuId=5131087261815"
    },
    {
      name: "DHS DJ/D40+",
      brand: "DHS 红双喜",
      imageLabel: "D40+",
      imageUrl: "./assets/gear/balls-40mm.jpg",
      feature: "手感偏硬，速度快，国内球馆很常见。",
      suitable: "适合快节奏对拉和日常训练。",
      unsuitable: "刚上手可能会觉得声音和弹跳偏硬。",
      rating: "★★★★☆",
      buyUrl: "https://detail.tmall.com/item.htm?id=614444985778&skuId=4538569558846"
    },
    {
      name: "Nittaku Premium 40+",
      brand: "Nittaku",
      imageLabel: "NP40+",
      imageUrl: "./assets/gear/table-tennis-ball.png",
      feature: "圆度和一致性口碑好，手感比较细。",
      suitable: "适合认真练单球、发球和控制。",
      unsuitable: "价格一般偏高，不适合大量消耗。",
      rating: "★★★★☆",
      buyUrl: "https://uland.taobao.com/sem/tbsearch?keyword=Nittaku%20Premium%2040%2B&q=Nittaku%20Premium%2040%2B"
    },
    {
      name: "Double Fish V40+",
      brand: "Double Fish 双鱼",
      imageLabel: "V40+",
      imageUrl: "./assets/gear/balls-40mm.jpg",
      feature: "稳定、耐打，性价比方向比较明显。",
      suitable: "适合社团训练、多人轮换和日常对练。",
      unsuitable: "如果追求特别细腻的比赛手感，可以先试再买。",
      rating: "★★★★☆",
      buyUrl: "https://detail.tmall.com/item.htm?id=668580582391&skuId=4809318308158"
    }
  ];

  const recommendRules = {
    beginner: {
      control: "beginner-control",
      loop: "beginner-control",
      fast: "beginner-control"
    },
    intermediate: {
      control: "loop-training",
      loop: "loop-training",
      fast: "fast-attack"
    },
    advanced: {
      control: "w968",
      loop: "fzd-alc",
      fast: "zjk-alc"
    }
  };

  const buildBiliEmbedUrl = (bvid) => `https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=0&danmaku=0`;

  const createGearVisual = (item, extraClass = "") => `
    <div class="gear-visual ${item.imageType === "ball" ? "is-ball" : ""} ${extraClass}" role="img" aria-label="${item.name}图片示意">
      ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" loading="lazy" onerror="this.classList.add('is-hidden')">` : ""}
      <span>${item.imageLabel}</span>
    </div>
  `;

  const renderResourceSections = () => {
    const archiveGrid = document.getElementById("archiveGrid");
    const videoLinkList = document.getElementById("videoLinkList");
    const baikeGrid = document.getElementById("baikeGrid");

    if (archiveGrid) {
      archiveGrid.innerHTML = playerResources.map((player) => `
        <article class="archive-card">
          <img src="${player.image}" alt="${player.name}资料页封面">
          <div>
            <span>${player.english}</span>
            <h3>${player.name}</h3>
            <p>${player.intro}</p>
            <a href="${player.page}">查看资料</a>
          </div>
        </article>
      `).join("");
    }

    if (videoLinkList) {
      videoLinkList.innerHTML = playerResources.map((player, index) => `
        <button class="video-link-card" type="button" data-bvid="${player.bvid}">
          <span>Video 0${index + 1}</span>
          <strong>${player.videoTitle}</strong>
          <em>${player.name}</em>
        </button>
      `).join("");

      const biliPlayer = document.getElementById("biliPlayer");
      videoLinkList.querySelectorAll("[data-bvid]").forEach((button, index) => {
        button.classList.toggle("is-active", index === 0);
        button.addEventListener("click", () => {
          videoLinkList.querySelectorAll("[data-bvid]").forEach((item) => item.classList.remove("is-active"));
          button.classList.add("is-active");
          if (biliPlayer) {
            biliPlayer.src = buildBiliEmbedUrl(button.dataset.bvid);
          }
        });
      });
    }

    if (baikeGrid) {
      baikeGrid.innerHTML = playerResources.map((player) => `
        <a class="baike-card" href="${player.baikeUrl}" target="_blank" rel="noopener noreferrer">
          <span>${player.role}</span>
          <strong>${player.name}</strong>
          <em>打开网络介绍</em>
        </a>
      `).join("");
    }

    const gearPreviewGrid = document.getElementById("gearPreviewGrid");
    if (gearPreviewGrid) {
      gearPreviewGrid.innerHTML = gearItems.slice(0, 3).map((item) => `
        <article class="gear-card compact">
          ${createGearVisual(item)}
          <span>${item.player || item.type}</span>
          <h3>${item.name}</h3>
          <p>${item.feature}</p>
        </article>
      `).join("");
    }
  };

  renderResourceSections();

  const renderGearPage = () => {
    const starGearGrid = document.getElementById("starGearGrid");
    const normalGearGrid = document.getElementById("normalGearGrid");
    const ballGearGrid = document.getElementById("ballGearGrid");
    const resultBox = document.getElementById("gearResult");
    const gearGroups = document.querySelectorAll("[data-gear-group]");
    const gearState = {
      level: "beginner",
      style: "control",
      budget: "low"
    };

    const renderGearCard = (item) => `
      <article class="gear-card" id="${item.id || ""}">
        ${createGearVisual(item)}
        <span>${item.brand} / ${item.type || "比赛球"}</span>
        <h3>${item.name}</h3>
        <p>${item.feature}</p>
        <dl>
          <div><dt>适合</dt><dd>${item.suitable}</dd></div>
          <div><dt>不太适合</dt><dd>${item.unsuitable}</dd></div>
          <div><dt>推荐</dt><dd>${item.rating}</dd></div>
        </dl>
        ${item.buyUrl ? `<a class="gear-buy-link" href="${item.buyUrl}" target="_blank" rel="noopener noreferrer">淘宝参考</a>` : ""}
      </article>
    `;

    if (starGearGrid) {
      starGearGrid.innerHTML = gearItems.filter((item) => item.type === "明星同款方向").map(renderGearCard).join("");
    }

    if (normalGearGrid) {
      normalGearGrid.innerHTML = gearItems.filter((item) => item.type === "普通推荐").map(renderGearCard).join("");
    }

    if (ballGearGrid) {
      ballGearGrid.innerHTML = ballItems.map((item) => renderGearCard({ ...item, imageType: "ball", type: "乒乓球" })).join("");
    }

    const updateResult = () => {
      if (!resultBox) {
        return;
      }
      const level = gearState.level;
      const style = gearState.style;
      const targetId = recommendRules[level][style];
      const pick = gearItems.find((item) => item.id === targetId);
      const ballPick = gearState.budget === "low" ? ballItems[3] : gearState.budget === "high" ? ballItems[0] : ballItems[1];

      resultBox.innerHTML = `
        <div>
          <span>推荐球拍</span>
          <h3>${pick.name}</h3>
          <p>${pick.suitable}</p>
          <a class="gear-buy-link" href="${pick.buyUrl}" target="_blank" rel="noopener noreferrer">淘宝参考</a>
        </div>
        <div>
          <span>胶皮方向</span>
          <h3>${style === "fast" ? "反手速度 + 正手稳定" : style === "loop" ? "正手摩擦 + 反手衔接" : "两面控制型"}</h3>
          <p>先把动作打稳，再考虑特别硬、特别弹的专业胶皮。</p>
        </div>
        <div>
          <span>乒乓球</span>
          <h3>${ballPick.name}</h3>
          <p>${ballPick.suitable}</p>
          <a class="gear-buy-link" href="${ballPick.buyUrl}" target="_blank" rel="noopener noreferrer">淘宝参考</a>
        </div>
      `;
    };

    gearGroups.forEach((group) => {
      const key = group.dataset.gearGroup;
      group.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          gearState[key] = button.dataset.value;
          group.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
          button.classList.add("is-active");
          updateResult();
        });
      });
    });
    updateResult();
  };

  renderGearPage();

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
    ".keyword-grid",
    ".archive-grid",
    ".video-link-list",
    ".baike-grid"
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

  const techItems = [
    { key: "serve", label: "发接发", note: "先看旋转，再抢前三板。发接发决定这一分从谁的节奏开始。" },
    { key: "link", label: "正反手衔接", note: "脚步和重心接上，防守才会立刻变成进攻。" },
    { key: "rally", label: "相持抗压", note: "连续对拉时不掉质量，才是真正把对手拖进深水区。" },
    { key: "clutch", label: "关键分爆发", note: "越胶着越要敢出手，冠军气质常常藏在最后一板。" }
  ];
  const techSwitcher = document.getElementById("techSwitcher");
  const techCards = document.querySelectorAll("[data-tech-card]");
  const techNote = document.getElementById("techNote");
  const coverKeywords = document.querySelectorAll("[data-cover-keyword]");
  let activeTech = "serve";

  const renderTechSwitcher = () => {
    if (!techSwitcher) {
      return;
    }
    techSwitcher.innerHTML = "";
    techItems.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = item.label;
      button.classList.toggle("is-active", item.key === activeTech);
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(item.key === activeTech));
      button.addEventListener("click", () => activateTech(item.key));
      techSwitcher.appendChild(button);
    });
  };

  const activateTech = (tech) => {
    if (!techSwitcher || !techNote || techCards.length === 0) {
      return;
    }
    activeTech = tech;
    const activeItem = techItems.find((item) => item.key === tech);

    techCards.forEach((card) => {
      card.classList.toggle("is-active", card.dataset.techCard === tech);
    });
    const arsenalGrid = document.querySelector(".arsenal-grid");
    if (arsenalGrid) {
      arsenalGrid.classList.add("has-active");
    }

    coverKeywords.forEach((keyword) => {
      keyword.classList.toggle("is-active", keyword.dataset.coverKeyword === tech);
    });

    if (collage) {
      collage.dataset.tech = tech;
    }

    techNote.textContent = activeItem.note;
    renderTechSwitcher();
  };

  const rallySteps = [
    { key: "serve", label: "发球", x: "18%", y: "72%", text: "发球落点压到近网，先把旋转藏起来。", china: 0, opponent: 0, smash: false },
    { key: "rally", label: "对拉", x: "72%", y: "35%", text: "对手回到中台，双方进入高速相持。", china: 0, opponent: 0, smash: false },
    { key: "smash", label: "扣杀", x: "58%", y: "64%", text: "看到半高球，主动上手把速度打满。", china: 0, opponent: 0, smash: true },
    { key: "score", label: "得分", x: "86%", y: "24%", text: "线路打穿空当，中国队拿下一分。", china: 1, opponent: 0, smash: false }
  ];
  const rallyButtons = document.getElementById("rallyButtons");
  const pingTable = document.getElementById("pingTable");
  const pingBall = document.getElementById("pingBall");
  const simulatorStatus = document.getElementById("simulatorStatus");
  const chinaScore = document.getElementById("chinaScore");
  const opponentScore = document.getElementById("opponentScore");
  const simulatorReset = document.getElementById("simulatorReset");
  let score = { china: 0, opponent: 0 };

  const runRallyStep = (step) => {
    pingBall.style.setProperty("--ball-x", step.x);
    pingBall.style.setProperty("--ball-y", step.y);
    pingTable.classList.toggle("is-smash", step.smash);
    simulatorStatus.textContent = step.text;

    score.china += step.china;
    score.opponent += step.opponent;
    chinaScore.textContent = score.china;
    opponentScore.textContent = score.opponent;

    if (step.key === "serve") {
      activateTech("serve");
    }
    if (step.key === "rally") {
      activateTech("rally");
    }
    if (step.key === "smash" || step.key === "score") {
      activateTech("clutch");
    }
  };

  rallySteps.forEach((step) => {
    if (!rallyButtons) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = step.label;
    button.addEventListener("click", () => runRallyStep(step));
    rallyButtons.appendChild(button);
  });

  if (simulatorReset) {
    simulatorReset.addEventListener("click", () => {
    score = { china: 0, opponent: 0 };
    chinaScore.textContent = "0";
    opponentScore.textContent = "0";
    pingBall.style.setProperty("--ball-x", "18%");
    pingBall.style.setProperty("--ball-y", "70%");
    pingTable.classList.remove("is-smash");
    simulatorStatus.textContent = "点击“发球”开始一分，观察球路和比分变化。";
    activateTech("serve");
    });
  }

  const galleryItems = Array.from(document.querySelectorAll(".gallery-card")).map((card) => {
    const image = card.querySelector("img");
    const caption = card.querySelector("figcaption");
    return {
      src: image.getAttribute("src"),
      alt: image.getAttribute("alt"),
      caption: caption.textContent
    };
  });
  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let lightboxIndex = 0;

  const openLightbox = (index) => {
    lightboxIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[lightboxIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = item.alt;
    lightboxCaption.textContent = item.caption;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll(".gallery-card").forEach((card, index) => {
    card.addEventListener("click", () => openLightbox(index));
  });

  if (lightbox && lightboxClose && lightboxPrev && lightboxNext) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", () => openLightbox(lightboxIndex - 1));
    lightboxNext.addEventListener("click", () => openLightbox(lightboxIndex + 1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) {
      return;
    }
    if (event.key === "Escape") {
      closeLightbox();
    }
    if (event.key === "ArrowLeft") {
      openLightbox(lightboxIndex - 1);
    }
    if (event.key === "ArrowRight") {
      openLightbox(lightboxIndex + 1);
    }
  });

  activateTech(activeTech);
});
