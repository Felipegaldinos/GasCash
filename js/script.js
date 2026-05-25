 window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  function toggleMenu() {
    const links = document.querySelector('.nav-links');
    if (links.style.display === 'flex') {
      links.style.display = 'none';
    } else {
      links.style.cssText = 'display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:var(--navy);padding:20px 5%;gap:16px;border-top:1px solid rgba(255,255,255,.1);z-index:99';
    }
  }

  // Animated counter on scroll
  function animateCount(el, target, prefix = '') {
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = prefix + current;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bigs = e.target.querySelectorAll('.big');
        bigs.forEach(b => {
          const text = b.textContent;
          if (text.includes('300')) {
            const dec = b.querySelector('.dec');
            b.innerHTML = '';
            if (dec) b.appendChild(dec);
            const span = document.createElement('span');
            b.appendChild(span);
            animateCount(span, 300);
          }
        });
        statObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.sobre-stats').forEach(s => statObserver.observe(s));


  //sobre 
   (function() {
            window.addEventListener('DOMContentLoaded', () => {
                const scrollContainer = document.getElementById('gscshTickerScroll');
                const list = document.getElementById('gscshTickerList');
                
                if(scrollContainer && list) {
                    const clone = list.cloneNode(true);
                    scrollContainer.appendChild(clone);

                    let scrollPos = 0;
                    const speed = 1.2;

                    function animateGscshTicker() {
                        scrollPos += speed;
                        if (scrollPos >= list.offsetWidth) {
                            scrollPos = 0;
                        }
                        scrollContainer.style.transform = `translateX(-${scrollPos}px)`;
                        requestAnimationFrame(animateGscshTicker);
                    }
                    animateGscshTicker();
                }
            });
        })();