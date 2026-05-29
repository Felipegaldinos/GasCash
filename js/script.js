/* ════════════════════════════════════════════════
   GASCASH — script.js
   1. Menu mobile (toggleMenu)
   2. Nav scroll shadow
   3. Dropdown login (teclado / ESC)
   4. Reveal on scroll
   5. Canvas partículas hero
   6. Timeline progress on scroll
   7. Validação do formulário de contato
════════════════════════════════════════════════ */

/* ── 1. MENU MOBILE ─────────────────────────── */
function toggleMenu() {
  var btn = document.querySelector(".hamburger");
  var menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  var isOpen = menu.classList.toggle("open");
  btn.classList.toggle("active", isOpen);
  btn.setAttribute("aria-expanded", String(isOpen));
  menu.setAttribute("aria-hidden", String(!isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
}

document.addEventListener("DOMContentLoaded", function () {
  /* Fecha menu ao clicar em qualquer link */
  var mobileLinks = document.querySelectorAll("#mobileMenu a");
  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var menu = document.getElementById("mobileMenu");
      var btn = document.querySelector(".hamburger");
      if (menu) {
        menu.classList.remove("open");
        menu.setAttribute("aria-hidden", "true");
      }
      if (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
      }
      document.body.style.overflow = "";
    });
  });

  /* ESC fecha menu */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var menu = document.getElementById("mobileMenu");
      var btn = document.querySelector(".hamburger");
      if (menu && menu.classList.contains("open")) {
        menu.classList.remove("open");
        menu.setAttribute("aria-hidden", "true");
        if (btn) {
          btn.classList.remove("active");
          btn.setAttribute("aria-expanded", "false");
          btn.focus();
        }
        document.body.style.overflow = "";
      }
    }
  });

  /* ── 2. NAV SCROLL SHADOW ──────────────────── */
  var nav = document.getElementById("mainNav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ── 3. DROPDOWN LOGIN — ESC ───────────────── */
  var loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("keydown", function (e) {
      if (e.key === "Escape") loginBtn.blur();
    });
  }

  /* ── 4. REVEAL ON SCROLL ───────────────────── */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ── 5. CANVAS — PARTÍCULAS HERO ──────────── */
  var canvas = document.getElementById("heroCanvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var count = 60;

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    function randomParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      };
    }

    for (var i = 0; i < count; i++) particles.push(randomParticle());

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249,115,22," + p.alpha + ")";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ── 6. TIMELINE PROGRESS ON SCROLL ────────── */
  var timeline = document.getElementById("timeline");
  var progressLine = document.getElementById("progress-line");
  var containers = document.querySelectorAll(".timeline-container");

  function updateTimeline() {
    if (!timeline || !progressLine) return;

    var timelineRect = timeline.getBoundingClientRect();
    var triggerPoint = window.innerHeight * 0.6;
    var progressHeight = triggerPoint - timelineRect.top;

    if (progressHeight < 0) progressHeight = 0;
    if (progressHeight > timelineRect.height)
      progressHeight = timelineRect.height;

    progressLine.style.height = progressHeight + "px";

    containers.forEach(function (container) {
      var rect = container.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        container.classList.add("visible");
        if (rect.top + 40 < triggerPoint) container.classList.add("active");
        else container.classList.remove("active");
      } else {
        container.classList.remove("visible", "active");
      }
    });
  }

  window.addEventListener("scroll", updateTimeline, { passive: true });
  window.addEventListener("resize", updateTimeline, { passive: true });
  updateTimeline();

  /* ── 7. FORMULÁRIO DE CONTATO ─────────────── */
  var form = document.getElementById("contatoForm");
  if (!form) return;

  /* Máscara de telefone */
  var telInput = document.getElementById("telefone");
  if (telInput) {
    telInput.addEventListener("input", function () {
      var v = telInput.value.replace(/\D/g, "").slice(0, 11);
      if (v.length <= 10) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      } else {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      }
      telInput.value = v;
    });
  }

  /* Validação inline ao sair do campo */
  function validateField(id, errorId, msg) {
    var el = document.getElementById(id);
    var err = document.getElementById(errorId);
    if (!el || !err) return true;

    var valid = el.value.trim() !== "";

    /* Validação extra para email */
    if (id === "email" && valid) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
    }

    el.classList.toggle("error", !valid);
    err.textContent = valid ? "" : msg;
    return valid;
  }

  var fields = [
    { id: "nome", errorId: "nomeError", msg: "Por favor, informe seu nome." },
    {
      id: "telefone",
      errorId: "telefoneError",
      msg: "Por favor, informe seu telefone.",
    },
    {
      id: "email",
      errorId: "emailError",
      msg: "Por favor, informe um e-mail válido.",
    },
    {
      id: "perfil",
      errorId: "perfilError",
      msg: "Por favor, selecione seu perfil.",
    },
    {
      id: "mensagem",
      errorId: "mensagemError",
      msg: "Por favor, escreva sua mensagem.",
    },
  ];

  fields.forEach(function (f) {
    var el = document.getElementById(f.id);
    if (el) {
      el.addEventListener("blur", function () {
        validateField(f.id, f.errorId, f.msg);
      });
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var allValid = fields.every(function (f) {
      return validateField(f.id, f.errorId, f.msg);
    });

    /* Valida checkbox LGPD */
    var lgpd = document.getElementById("lgpd");
    var lgpdErr = document.getElementById("lgpdError");
    var lgpdOk = lgpd && lgpd.checked;
    if (lgpdErr)
      lgpdErr.textContent = lgpdOk
        ? ""
        : "Você precisa concordar com a Política de Privacidade.";

    if (!allValid || !lgpdOk) return;

    /* Simula envio — substitua por fetch/axios para integração real */
    var submitBtn = form.querySelector(".form-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";
    }

    setTimeout(function () {
      form.reset();
      var success = document.getElementById("formSuccess");
      if (success) success.hidden = false;
      if (submitBtn) submitBtn.hidden = true;
    }, 1200);
  });
}); /* fim DOMContentLoaded */

 /*APP*/

 document.addEventListener("DOMContentLoaded", () => {
  const columns = document.querySelectorAll(".slider-column");

  columns.forEach((column) => {
    // Pega todas as imagens iniciais inseridas na coluna
    const images = Array.from(column.children);
    
    // Clona cada imagem e adiciona ao final da respectiva coluna
    images.forEach((img) => {
      const clonedImg = img.cloneNode(true);
      column.appendChild(clonedImg);
    });
  });
});