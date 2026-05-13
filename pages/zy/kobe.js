/* ================================================
   科比·布莱恩特 介绍页面 - JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ===========================================
       第一部分：统计数据滚动动画
       =========================================== */
    function animateCounter(element, target, suffix = '') {
        const speed = Math.max(20, Math.floor(2000 / target)); // 动态速度
        let current = 0;

        const update = () => {
            current += Math.ceil(target / 60); // 每帧增加量
            if (current >= target) {
                element.textContent = target.toLocaleString() + suffix;
                return;
            }
            element.textContent = current.toLocaleString() + suffix;
            requestAnimationFrame(update);
        };

        update();
    }

    // 科比生涯数据
    const stats = {
        points: 33643,
        games: 1346,
        championships: 5
    };

    animateCounter(document.getElementById('stat-points'), stats.points, '+');
    animateCounter(document.getElementById('stat-games'), stats.games, '');
    animateCounter(document.getElementById('stat-championships'), stats.championships, '×');

    /* ===========================================
       第二部分：滚动入场（时间线）
       =========================================== */
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observerOptions = {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 只触发一次
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => observer.observe(item));

    /* ===========================================
       第三部分：导航高亮（滚动监听）
       =========================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    function highlightNav() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    /* ===========================================
       第四部分：名言轮播
       =========================================== */
    const quotes = document.querySelectorAll('.quote-item');
    const prevBtn = document.getElementById('prevQuote');
    const nextBtn = document.getElementById('nextQuote');
    let currentQuote = 0;

    function showQuote(index) {
        quotes.forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });
    }

    function nextQuoteFn() {
        currentQuote = (currentQuote + 1) % quotes.length;
        showQuote(currentQuote);
    }

    function prevQuoteFn() {
        currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
        showQuote(currentQuote);
    }

    nextBtn.addEventListener('click', nextQuoteFn);
    prevBtn.addEventListener('click', prevQuoteFn);

    // 自动轮播（每 5 秒切换）
    let autoSlide = setInterval(nextQuoteFn, 5000);

    // 用户交互时暂停自动轮播 8 秒
    const quoteSlider = document.querySelector('.quote-slider');
    const resetAutoSlide = () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextQuoteFn, 5000);
    };

    quoteSlider.addEventListener('click', resetAutoSlide);
    quoteSlider.addEventListener('touchstart', resetAutoSlide);

    /* ===========================================
       第五部分：Header 透明效果
       =========================================== */
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.background = 'rgba(44, 16, 61, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.92)';
        }
    });

});
