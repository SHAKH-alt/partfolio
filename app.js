(function() {
  "use strict";

  // ========== TYPED TEXT EFFECT ==========
  const typedSpan = document.getElementById('typed-text');
  if (typedSpan) {
    const texts = ['JavaScript Developer', 'Frontend Developer', 'Web Developer'];
    let idx = 0, charIdx = 0, isDeleting = false;
    
    function type() {
      const current = texts[idx];
      if (isDeleting) {
        typedSpan.textContent = current.substring(0, charIdx--);
      } else {
        typedSpan.textContent = current.substring(0, charIdx++);
      }
      
      if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      
      if (isDeleting && charIdx === 0) {
        isDeleting = false;
        idx = (idx + 1) % texts.length;
      }
      
      setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
  }

  // ========== MOBILE SIDEBAR TOGGLE ==========
  const toggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');
  
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
      });
    });
  }

  // ========== ACTIVE NAVIGATION ON SCROLL ==========
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  function setActive() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', setActive);
  window.addEventListener('load', setActive);

  // ========== SCROLL TOP BUTTON ==========
  const scrollBtn = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('active');
    } else {
      scrollBtn.classList.remove('active');
    }
  });
  
  scrollBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== ANIMATE COUNTERS ==========
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      let current = 0;
      const step = target / 40;
      
      const update = () => {
        current += step;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };
      update();
    });
  };
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('#stats');
  if (statsSection) statsObserver.observe(statsSection);

  // ========== ANIMATE SKILLS ==========
  const fillBars = document.querySelectorAll('.progress-fill');
  
  const animateSkills = () => {
    fillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (width) {
        bar.style.width = width + '%';
      }
    });
  };
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) skillsObserver.observe(skillsSection);

  // ========== PORTFOLIO FILTER ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      portfolioCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-cat') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ========== CONTACT FORM ==========
  const form = document.getElementById('contactForm');
  const msgDiv = document.getElementById('formMessage');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !subject || !message) {
        msgDiv.className = 'form-message error';
        msgDiv.textContent = 'Iltimos, barcha maydonlarni to\'ldiring!';
        setTimeout(() => msgDiv.style.display = 'none', 3000);
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        msgDiv.className = 'form-message error';
        msgDiv.textContent = 'Email manzil noto\'g\'ri!';
        setTimeout(() => msgDiv.style.display = 'none', 3000);
        return;
      }
      
      const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      messages.push({ name, email, subject, message, date: new Date().toISOString() });
      localStorage.setItem('contact_messages', JSON.stringify(messages));
      
      msgDiv.className = 'form-message success';
      msgDiv.textContent = 'Xabaringiz yuborildi. Rahmat!';
      form.reset();
      
      setTimeout(() => {
        msgDiv.style.display = 'none';
      }, 4000);
    });
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('.nav-menu a, .scroll-top').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if (hash && hash !== '#' && hash.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();