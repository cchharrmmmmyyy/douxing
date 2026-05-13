document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const statBars = document.querySelectorAll('.stat-bar');
  const honorCards = document.querySelectorAll('.honor-card');
  const badgeItems = document.querySelectorAll('.badge-item');
  const highlightCards = document.querySelectorAll('.highlight-card');
  const quoteCards = document.querySelectorAll('.quote-card');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, observerOptions);

  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
  });

  statBars.forEach((bar, index) => {
    bar.style.opacity = '0';
    bar.style.transform = 'scaleX(0)';
    bar.style.transformOrigin = 'left';
    bar.style.transition = `all 1s ease-out ${index * 0.15}s`;
    observer.observe(bar.parentElement);
  });

  honorCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
    observer.observe(card);
  });

  badgeItems.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.8)';
    badge.style.transition = `all 0.4s ease-out ${index * 0.08}s`;
    observer.observe(badge);
  });

  highlightCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
    observer.observe(card);
  });

  quoteCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(30px)';
    card.style.transition = `all 0.5s ease-out ${index * 0.2}s`;
    observer.observe(card);
  });

  document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    const navbar = document.querySelector('.navbar');
    
    if (hero) {
      hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
    
    if (navbar) {
      if (scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 26, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(61, 61, 92, 0.8)';
      } else {
        navbar.style.background = 'rgba(15, 15, 26, 0.95)';
        navbar.style.borderBottom = '1px solid var(--color-border)';
      }
    }
  });

  const animateInClass = document.createElement('style');
  animateInClass.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateX(0) translateY(0) scale(1) !important;
    }
  `;
  document.head.appendChild(animateInClass);

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.classList.add('hero-animate');
  }

  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('navbar-expanded');
      }
    });
  }

  const navBack = document.querySelector('.nav-back');
  if (navBack) {
    navBack.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  }
});