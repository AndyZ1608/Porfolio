/* ========================================
   PORTFOLIO — INTERACTIVE JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ========== TYPING EFFECT ==========
  const typingConfig = {
    name: 'Nguyen Nang Duc [AndyZ]',
    titles: [
      'Network/Cloud Engineer',
      'Entrepreneur',
      'Investor',
      'Cooking Enthusiast'
    ],
    nameSpeed: 80,
    titleSpeed: 70,
    deleteSpeed: 40,
    pauseAfterType: 2000,
    pauseAfterDelete: 500,
  };

  const nameEl = document.getElementById('typed-name');
  const titleEl = document.getElementById('typed-title');

  // Type the name once
  function typeName() {
    let i = 0;
    const interval = setInterval(() => {
      if (i < typingConfig.name.length) {
        nameEl.textContent += typingConfig.name.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        // Start cycling titles after name is typed
        setTimeout(() => cycleTitles(), 600);
      }
    }, typingConfig.nameSpeed);
  }

  // Cycle through titles
  let currentTitleIndex = 0;
  function cycleTitles() {
    const title = typingConfig.titles[currentTitleIndex];
    typeTitle(title, () => {
      setTimeout(() => {
        deleteTitle(() => {
          currentTitleIndex = (currentTitleIndex + 1) % typingConfig.titles.length;
          setTimeout(() => cycleTitles(), typingConfig.pauseAfterDelete);
        });
      }, typingConfig.pauseAfterType);
    });
  }

  function typeTitle(text, callback) {
    let i = 0;
    titleEl.textContent = '';
    const interval = setInterval(() => {
      if (i < text.length) {
        titleEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, typingConfig.titleSpeed);
  }

  function deleteTitle(callback) {
    const interval = setInterval(() => {
      const text = titleEl.textContent;
      if (text.length > 0) {
        titleEl.textContent = text.slice(0, -1);
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, typingConfig.deleteSpeed);
  }

  // Start typing after a brief delay
  setTimeout(typeName, 800);

  // ========== NAVBAR ==========
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll-based navbar styling
  function handleNavScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Active nav link on scroll
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleNavScroll();
    updateActiveLink();
    handleBackToTop();
  });

  // Mobile menu toggle
  let overlay = null;

  function openMobileMenu() {
    navMenu.classList.add('open');
    navToggle.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay active';
      overlay.addEventListener('click', closeMobileMenu);
      document.body.appendChild(overlay);
    } else {
      overlay.classList.add('active');
    }
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
    if (overlay) overlay.classList.remove('active');
  }

  navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // ========== THEME TOGGLE ==========
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (theme === 'light') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }

  // Check saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ========== SCROLL REVEAL ==========
  function setupRevealAnimations() {
    // Add reveal class to elements
    const revealSelectors = [
      '.about-card',
      '.about-image-card',
      '.about-stats .stat-item',
      '.skill-category',
      '.project-card',
      '.contact-info-card',
      '.contact-form',
      '.contact-socials',
    ];

    revealSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        if (i <= 4) {
          el.classList.add(`reveal-delay-${Math.min(i + 1, 4)}`);
        }
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  setupRevealAnimations();

  // ========== SKILL LEVEL ANIMATION ==========
  function animateSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute('data-level');
          entry.target.style.setProperty('--level', `${level}%`);
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillLevels.forEach(el => observer.observe(el));
  }

  animateSkillLevels();

  // ========== STAT COUNTER ==========
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          let current = 0;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target;
              clearInterval(timer);
            } else {
              entry.target.textContent = Math.floor(current);
            }
          }, 40);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  animateCounters();

  // ========== PROJECT FILTER ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = `fadeInUp 0.5s ${index * 0.08}s forwards`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.className = 'form-status error';
      return;
    }

    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Telegram Bot Details
    const telegramToken = '8612166473:AAFC9qthqnQplRjbgMviX9zWIJMZVWBmEIc';
    const chatId = '5882107869';

    // Format the message content
    const textMessage = `📩 *Tin nhắn mới từ Portfolio*\n\n👤 *Họ tên:* ${name}\n📧 *Email:* ${email}\n💬 *Nội dung:* ${message}`;

    // Send using Fetch API
    fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: textMessage,
        parse_mode: 'Markdown'
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        formStatus.textContent = '✓ Message sent successfully! Thank you for reaching out.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error('Telegram API responded with error');
      }
    })
    .catch(error => {
      console.error('Error sending message to Telegram:', error);
      formStatus.textContent = '✗ Failed to send message. Please try again later.';
      formStatus.className = 'form-status error';
    })
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }, 5000);
    });
  });

  // ========== BACK TO TOP ==========
  const backToTop = document.getElementById('back-to-top');

  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== PARTICLE EFFECT ==========
  function createParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    let width, height;
    let particles = [];
    const particleCount = 60;
    let animationId;

    function resize() {
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      };
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (isLight) {
          ctx.fillStyle = `rgba(108, 99, 255, ${p.opacity * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(100, 200, 255, ${p.opacity})`;
        }
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - dist / 120) * 0.12;
            if (isLight) {
              ctx.strokeStyle = `rgba(108, 99, 255, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(100, 200, 255, ${alpha})`;
            }
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    init();
    draw();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        draw();
      }
    });
  }

  createParticles();

  // ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ========== INITIAL CHECK ==========
  handleNavScroll();
  handleBackToTop();
});
