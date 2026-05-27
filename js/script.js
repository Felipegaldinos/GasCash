/* ════════════════════════════════════════════════
   GASCASH — script.js
   1. Menu mobile (toggleMenu)
   2. Nav scroll shadow
   3. Dropdown login (teclado / ESC)
   4. Reveal on scroll
   5. Canvas partículas hero
   6. Fecha menu ao clicar num link
════════════════════════════════════════════════ */

/* ── 1. MENU MOBILE ─────────────────────────── */
function toggleMenu() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  const isOpen = menu.classList.toggle('open');
  btn.classList.toggle('active', isOpen);
  btn.setAttribute('aria-expanded', String(isOpen));

  /* impede scroll do body enquanto menu está aberto */
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

/* Fecha menu ao clicar em qualquer link dentro dele */
document.addEventListener('DOMContentLoaded', function () {
  const mobileLinks = document.querySelectorAll('#mobileMenu a');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      const menu = document.getElementById('mobileMenu');
      const btn  = document.querySelector('.hamburger');
      if (menu) menu.classList.remove('open');
      if (btn)  { btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
      document.body.style.overflow = '';
    });
  });

  /* Fecha menu ao pressionar ESC */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const menu = document.getElementById('mobileMenu');
      const btn  = document.querySelector('.hamburger');
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        btn.focus();
      }
    }
  });

  /* ── 2. NAV SCROLL SHADOW ─────────────────── */
  var nav = document.getElementById('mainNav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 3. DROPDOWN LOGIN — fecha ao pressionar ESC ── */
  var loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        loginBtn.blur();
      }
    });
  }

  /* ── 4. REVEAL ON SCROLL ──────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    /* Fallback para browsers sem IntersectionObserver */
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── 5. CANVAS — PARTÍCULAS HERO ─────────── */
  var canvas = document.getElementById('heroCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var count = 60;

    function resizeCanvas() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    function randomParticle() {
      return {
        x:    Math.random() * canvas.width,
        y:    Math.random() * canvas.height,
        r:    Math.random() * 1.8 + 0.4,
        dx:   (Math.random() - 0.5) * 0.4,
        dy:   (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1
      };
    }

    for (var i = 0; i < count; i++) {
      particles.push(randomParticle());
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(249,115,22,' + p.alpha + ')';
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }
});