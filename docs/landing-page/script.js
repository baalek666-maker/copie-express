/* ============================================
   Copie Express — Interactive Layer
   Scroll reveals, form validation, accordion enhancement
   ============================================ */

(function() {
  'use strict';

  // ===== SCROLL REVEAL =====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });

  // ===== SMOOTH ANCHOR SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // ===== NAV BACKGROUND ON SCROLL =====
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 10) {
      nav.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.05)';
    } else {
      nav.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ===== FORM SUBMIT (email capture) =====
  const form = document.querySelector('.cta-form');
  if (form) {
    const input = form.querySelector('.cta-input');
    const button = form.querySelector('button');
    const originalButtonHTML = button.innerHTML;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!email || !email.includes('@')) {
        input.focus();
        return;
      }

      // Loading state
      button.disabled = true;
      button.innerHTML = '<span style="opacity:0.7">Envoi en cours...</span>';

      // Simulate API call (replace with real endpoint)
      await new Promise((r) => setTimeout(r, 800));

      // Success state
      button.innerHTML = '✓ Bienvenue !';
      button.style.background = 'hsl(145 30% 45%)';
      button.style.color = 'white';

      // Reset after 3s
      setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalButtonHTML;
        button.style.background = '';
        button.style.color = '';
        input.value = '';
      }, 3000);

      // In production: fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    });
  }

  // ===== PARALLAX HERO GLOW =====
  const ambientGlow = document.querySelector('.ambient-glow');
  if (ambientGlow) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          ambientGlow.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.05}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ===== TRACK ACTIVE SECTION IN NAV =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'hsl(var(--accent))';
              link.style.fontWeight = '600';
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => navObserver.observe(section));

  // ===== KEYBOARD SHORTCUT (Cmd/Ctrl+K for scroll to top) =====
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

})();