/* ============================================
   Ukraine Strategic Partners
   Lightweight Vanilla JS — 2026 Edition
   ============================================ */
(function () {
  'use strict';

  const mainCss = document.querySelector('link[href="css/main.css"]');
  function applyMainCss() {
    if (!mainCss) return;
    if (mainCss.rel === 'preload') {
      mainCss.rel = 'stylesheet';
    }
    document.documentElement.classList.add('css-loaded');
  }
  if (mainCss && mainCss.rel === 'preload') {
    if (mainCss.sheet) {
      applyMainCss();
    } else {
      mainCss.addEventListener('load', applyMainCss);
    }
  }

  /* ── Mobile Navigation ───────────────────── */
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const header = document.querySelector('.site-header');
  let lockedScrollY = 0;

  function isInternalPageLink(link) {
    if (!link || link.target === '_blank') return false;

    const href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;

    let url;
    try {
      url = new URL(link.href, location.href);
    } catch (err) {
      return false;
    }

    if (url.origin !== location.origin) return false;
    if (/\.pdf(\?|#|$)/i.test(url.pathname)) return false;

    return true;
  }

  function isSamePage(url) {
    const current = new URL(location.href);
    return url.pathname === current.pathname &&
      url.search === current.search &&
      !url.hash;
  }

  function isMenuOpen() {
    return menu && menu.classList.contains('is-open');
  }

  function lockScroll() {
    lockedScrollY = window.scrollY;
    document.body.classList.add('menu-open');
    document.body.style.top = '-' + lockedScrollY + 'px';
    if (header) {
      header.classList.add('menu-open');
      header.classList.remove('header--hidden');
    }
  }

  function unlockScroll() {
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    if (header) header.classList.remove('menu-open');
    window.scrollTo(0, lockedScrollY);
  }

  function releaseScrollLockForNavigation() {
    document.body.classList.remove('menu-open');
    document.body.style.top = '';
    if (header) header.classList.remove('menu-open');
  }

  function openMobileMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    lockScroll();
  }

  function closeMobileMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    unlockScroll();
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      if (isMenuOpen()) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href') || '';

        if (/^(mailto:|tel:)/i.test(href)) {
          closeMobileMenu();
          return;
        }

        if (link.target === '_blank') {
          closeMobileMenu();
          return;
        }

        if (isInternalPageLink(link)) {
          const destination = new URL(link.href, location.href);
          if (isSamePage(destination)) {
            e.preventDefault();
            closeMobileMenu();
            return;
          }
          releaseScrollLockForNavigation();
          return;
        }

        closeMobileMenu();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isMenuOpen()) {
        closeMobileMenu();
        toggle.focus();
      }
    });

    window.addEventListener('pageshow', function () {
      if (isMenuOpen()) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
      if (document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        if (header) header.classList.remove('menu-open');
      }
    });
  }

  /* ── Header: Transparent → Frosted + Smart Hide ── */
  if (header) {
    let lastScrollY = 0;
    const hideThreshold = 100;
    let ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (isMenuOpen()) {
            header.classList.remove('header--hidden');
            ticking = false;
            return;
          }

          const y = window.scrollY;

          /* Frosted glass after 10px */
          header.classList.toggle('scrolled', y > 10);

          /* Smart hide: hide on scroll ↓, show on scroll ↑ */
          if (y > hideThreshold) {
            if (y > lastScrollY + 5) {
              header.classList.add('header--hidden');
            } else if (y < lastScrollY - 5) {
              header.classList.remove('header--hidden');
            }
          } else {
            header.classList.remove('header--hidden');
          }

          lastScrollY = y;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Scroll Reveal (IntersectionObserver) ── */
  const allReveals = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');

  if (allReveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    });

    allReveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    allReveals.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ── Team Card Tap-to-Reveal (touch tablets only) */
  const teamCards = document.querySelectorAll('.team-card');
  const teamMobileMq = window.matchMedia('(max-width: 767px)');
  const teamTouchMq = window.matchMedia('(hover: none)');

  function isTeamMobileLayout() {
    return teamMobileMq.matches;
  }

  function isTeamTapReveal() {
    return teamTouchMq.matches && !isTeamMobileLayout();
  }

  function syncTeamOverlayA11y() {
    teamCards.forEach(function (card) {
      const overlay = card.querySelector('.team-card__overlay');
      if (overlay) {
        overlay.setAttribute('aria-hidden', isTeamMobileLayout() ? 'false' : 'true');
      }
    });
  }

  if (teamCards.length) {
    teamCards.forEach(function (card) {
      card.addEventListener('click', function () {
        if (!isTeamTapReveal()) return;
        card.classList.toggle('is-active');
      });

      /* Close on Escape */
      card.addEventListener('keydown', function (e) {
        if (!isTeamTapReveal()) return;
        if (e.key === 'Escape' && card.classList.contains('is-active')) {
          card.classList.remove('is-active');
        }
      });
    });

    /* Close any open card when clicking outside */
    document.addEventListener('click', function (e) {
      if (!isTeamTapReveal()) return;
      if (!e.target.closest('.team-card')) {
        teamCards.forEach(function (c) {
          c.classList.remove('is-active');
        });
      }
    });

    syncTeamOverlayA11y();
    function onTeamLayoutChange() {
      syncTeamOverlayA11y();
      if (isTeamTapReveal()) return;
      teamCards.forEach(function (c) {
        c.classList.remove('is-active');
      });
    }
    if (teamMobileMq.addEventListener) {
      teamMobileMq.addEventListener('change', onTeamLayoutChange);
    } else if (teamMobileMq.addListener) {
      teamMobileMq.addListener(onTeamLayoutChange);
    }
  }

  /* ── Testimonial Carousel ─────────────────── */
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel__track');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dotsWrap = carousel.querySelector('.carousel__dots');
    let currentIdx = 0;
    const total = slides.length;
    let autoplayInterval;

    /* Build dots */
    slides.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.carousel__dot');

    function goTo(idx) {
      currentIdx = ((idx % total) + total) % total;
      track.style.transform = 'translateX(-' + (currentIdx * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === currentIdx);
      });
      resetAutoplay();
    }

    prevBtn.addEventListener('click', function () { goTo(currentIdx - 1); });
    nextBtn.addEventListener('click', function () { goTo(currentIdx + 1); });

    /* Swipe support */
    let startX = 0;
    let dragging = false;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      dragging = true;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (!dragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goTo(currentIdx + (diff > 0 ? 1 : -1));
      }
      dragging = false;
    });

    /* Autoplay */
    function resetAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(function () { goTo(currentIdx + 1); }, 6000);
    }
    resetAutoplay();

    /* Pause on hover */
    carousel.addEventListener('mouseenter', function () { clearInterval(autoplayInterval); });
    carousel.addEventListener('mouseleave', function () { resetAutoplay(); });

    /* Keyboard */
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') goTo(currentIdx - 1);
      if (e.key === 'ArrowRight') goTo(currentIdx + 1);
    });
  }

  /* ── Copyright Year ──────────────────────── */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Active Nav Link ─────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── Smooth Anchor Scroll ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Interactive Timeline ─────────────────── */
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const body = timeline.querySelector('.timeline__body');
    const spine = timeline.querySelector('.timeline__spine');
    const rows = timeline.querySelectorAll('.timeline__row');
    let activeRowIdx = -1;

    /* Spine height animation on scroll */
    function updateSpine() {
      if (!body || !spine) return;
      const bodyRect = body.getBoundingClientRect();
      const viewMid = window.innerHeight * 0.65;
      const drawn = Math.max(0, viewMid - bodyRect.top);
      const maxH = body.scrollHeight;
      spine.style.height = Math.min(drawn, maxH) + 'px';
    }

    /* Row entrance + active state */
    const rowObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('tl-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    rows.forEach(function (row) {
      rowObserver.observe(row);
    });

    /* Track which row is closest to viewport centre → active */
    function updateActiveRow() {
      let best = -1;
      let bestDist = Infinity;
      const centre = window.innerHeight * 0.5;

      rows.forEach(function (row, i) {
        const rect = row.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centre);
        if (dist < bestDist && rect.top < window.innerHeight && rect.bottom > 0) {
          bestDist = dist;
          best = i;
        }
      });

      if (best !== activeRowIdx) {
        if (activeRowIdx >= 0 && rows[activeRowIdx]) {
          rows[activeRowIdx].classList.remove('tl-active-row');
        }
        activeRowIdx = best;
        if (activeRowIdx >= 0) {
          rows[activeRowIdx].classList.add('tl-active-row');
        }
      }
    }

    /* Activate timeline on first view */
    const tlObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          timeline.classList.add('tl-active');
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    tlObserver.observe(timeline);

    /* Card hover: activate row */
    rows.forEach(function (row) {
      const cards = row.querySelectorAll('.timeline__card');
      cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          row.classList.add('tl-active-row');
        });
        card.addEventListener('mouseleave', function () {
          /* Only remove if this row is not the scroll-active one */
          if (rows[activeRowIdx] !== row) {
            row.classList.remove('tl-active-row');
          }
        });
      });
    });

    /* Scroll handler — throttled with rAF */
    let tlTicking = false;
    window.addEventListener('scroll', function () {
      if (!tlTicking) {
        requestAnimationFrame(function () {
          updateSpine();
          updateActiveRow();
          tlTicking = false;
        });
        tlTicking = true;
      }
    }, { passive: true });

    /* Initial call */
    updateSpine();
    updateActiveRow();
  }

  /* Below-the-fold photos — keep them off the LCP network */
  const deferredImgs = document.querySelectorAll('img[data-src]');
  if (deferredImgs.length) {
    function hydrateDeferredImage(img) {
      const src = img.getAttribute('data-src');
      if (!src) return;
      img.src = src;
      img.removeAttribute('data-src');
    }

    if ('IntersectionObserver' in window) {
      const lazyBg = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          hydrateDeferredImage(entry.target);
          lazyBg.unobserve(entry.target);
        });
      }, { rootMargin: '200px 0px' });
      deferredImgs.forEach(function (img) {
        lazyBg.observe(img);
      });
    } else {
      deferredImgs.forEach(hydrateDeferredImage);
    }
  }

})();
