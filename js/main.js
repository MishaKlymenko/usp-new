/* ============================================
   Ukraine Strategic Partners
   Lightweight Vanilla JS — 2026 Edition
   ============================================ */
(function () {
  'use strict';

  /* ── Mobile Navigation ───────────────────── */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.querySelector('.nav__menu');
  var header = document.querySelector('.site-header');
  var lockedScrollY = 0;

  function isInternalPageLink(link) {
    if (!link || link.target === '_blank') return false;

    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;

    var url;
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
    var current = new URL(location.href);
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
        var href = link.getAttribute('href') || '';

        if (/^(mailto:|tel:)/i.test(href)) {
          closeMobileMenu();
          return;
        }

        if (link.target === '_blank') {
          closeMobileMenu();
          return;
        }

        if (isInternalPageLink(link)) {
          var destination = new URL(link.href, location.href);
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
    var lastScrollY = 0;
    var hideThreshold = 100;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (isMenuOpen()) {
            header.classList.remove('header--hidden');
            ticking = false;
            return;
          }

          var y = window.scrollY;

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
  var allReveals = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');

  if (allReveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
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

  /* ── Team Card Tap-to-Reveal (touch devices) */
  var teamCards = document.querySelectorAll('.team-card');
  var teamMobileMq = window.matchMedia('(max-width: 767px)');

  function isTeamMobileLayout() {
    return teamMobileMq.matches;
  }

  function syncTeamOverlayA11y() {
    teamCards.forEach(function (card) {
      var overlay = card.querySelector('.team-card__overlay');
      if (overlay) {
        overlay.setAttribute('aria-hidden', isTeamMobileLayout() ? 'false' : 'true');
      }
    });
  }

  if (teamCards.length) {
    teamCards.forEach(function (card) {
      card.addEventListener('click', function () {
        if (isTeamMobileLayout()) return;
        card.classList.toggle('is-active');
      });

      /* Close on Escape */
      card.addEventListener('keydown', function (e) {
        if (isTeamMobileLayout()) return;
        if (e.key === 'Escape' && card.classList.contains('is-active')) {
          card.classList.remove('is-active');
        }
      });
    });

    /* Close any open card when clicking outside */
    document.addEventListener('click', function (e) {
      if (isTeamMobileLayout()) return;
      if (!e.target.closest('.team-card')) {
        teamCards.forEach(function (c) {
          c.classList.remove('is-active');
        });
      }
    });

    syncTeamOverlayA11y();
    if (teamMobileMq.addEventListener) {
      teamMobileMq.addEventListener('change', syncTeamOverlayA11y);
    } else if (teamMobileMq.addListener) {
      teamMobileMq.addListener(syncTeamOverlayA11y);
    }
  }

  /* ── Testimonial Carousel ─────────────────── */
  var carousel = document.querySelector('.carousel');
  if (carousel) {
    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var prevBtn = carousel.querySelector('.carousel__btn--prev');
    var nextBtn = carousel.querySelector('.carousel__btn--next');
    var dotsWrap = carousel.querySelector('.carousel__dots');
    var currentIdx = 0;
    var total = slides.length;
    var autoplayInterval;

    /* Build dots */
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });

    var dots = dotsWrap.querySelectorAll('.carousel__dot');

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
    var startX = 0;
    var dragging = false;
    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      dragging = true;
    }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (!dragging) return;
      var diff = startX - e.changedTouches[0].clientX;
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
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Active Nav Link ─────────────────────── */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── Smooth Anchor Scroll ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Interactive Timeline ─────────────────── */
  var timeline = document.querySelector('.timeline');
  if (timeline) {
    var body = timeline.querySelector('.timeline__body');
    var spine = timeline.querySelector('.timeline__spine');
    var rows = timeline.querySelectorAll('.timeline__row');
    var activeRowIdx = -1;

    /* Spine height animation on scroll */
    function updateSpine() {
      if (!body || !spine) return;
      var bodyRect = body.getBoundingClientRect();
      var viewMid = window.innerHeight * 0.65;
      var drawn = Math.max(0, viewMid - bodyRect.top);
      var maxH = body.scrollHeight;
      spine.style.height = Math.min(drawn, maxH) + 'px';
    }

    /* Row entrance + active state */
    var rowObserver = new IntersectionObserver(function (entries) {
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
      var best = -1;
      var bestDist = Infinity;
      var centre = window.innerHeight * 0.5;

      rows.forEach(function (row, i) {
        var rect = row.getBoundingClientRect();
        var mid = rect.top + rect.height / 2;
        var dist = Math.abs(mid - centre);
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
    var tlObserver = new IntersectionObserver(function (entries) {
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
      var cards = row.querySelectorAll('.timeline__card');
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
    var tlTicking = false;
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

})();
