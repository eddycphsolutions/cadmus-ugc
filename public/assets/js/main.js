/* Cadmus UGC — Montoya-inspired GSAP motion */
(function () {
  'use strict';

  var doc = document;
  var body = doc.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav ── */
  var mobileNav = doc.querySelector('[data-mobile-nav]');
  var openBtns = doc.querySelectorAll('[data-nav-open]');
  var closeBtns = doc.querySelectorAll('[data-nav-close]');

  function openNav() {
    if (!mobileNav) return;
    mobileNav.hidden = false;
    requestAnimationFrame(function () { mobileNav.classList.add('is-open'); });
    body.classList.add('nav-open');
    openBtns.forEach(function (btn) { btn.setAttribute('aria-expanded', 'true'); });
  }

  function closeNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('is-open');
    body.classList.remove('nav-open');
    openBtns.forEach(function (btn) { btn.setAttribute('aria-expanded', 'false'); });
    window.setTimeout(function () {
      if (!mobileNav.classList.contains('is-open')) mobileNav.hidden = true;
    }, reduceMotion ? 0 : 350);
  }

  openBtns.forEach(function (btn) { btn.addEventListener('click', openNav); });
  closeBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (btn.matches('a[href^="#"]')) { setTimeout(closeNav, 10); return; }
      e.preventDefault();
      closeNav();
    });
  });
  if (mobileNav) {
    mobileNav.addEventListener('click', function (e) {
      if (e.target === mobileNav) closeNav();
    });
  }

  /* ── Portfolio filters + pagination ── */
  var filterWrap = doc.querySelector('[data-portfolio-filters]');
  var portfolioGrid = doc.querySelector('[data-portfolio-grid]');
  var items = doc.querySelectorAll('[data-portfolio-item]');
  var pagination = doc.querySelector('[data-portfolio-pagination]');
  var pagesWrap = doc.querySelector('[data-portfolio-pages]');
  var prevBtn = doc.querySelector('[data-portfolio-prev]');
  var nextBtn = doc.querySelector('[data-portfolio-next]');
  var perPage = portfolioGrid ? parseInt(portfolioGrid.getAttribute('data-per-page') || '6', 10) : 6;
  var activeFilter = 'all';
  var currentPage = 1;

  function getFilteredItems() {
    return Array.prototype.filter.call(items, function (item) {
      var platform = item.getAttribute('data-platform');
      return activeFilter === 'all' || platform === activeFilter;
    });
  }

  function getTotalPages() {
    return Math.max(1, Math.ceil(getFilteredItems().length / perPage));
  }

  function renderPaginationControls(totalPages) {
    if (!pagination || !pagesWrap) return;

    pagination.hidden = totalPages <= 1;
    pagesWrap.innerHTML = '';

    for (var page = 1; page <= totalPages; page++) {
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'cadmus-pagination__page' + (page === currentPage ? ' is-active' : '');
      btn.textContent = String(page);
      btn.setAttribute('data-portfolio-page', String(page));
      btn.setAttribute('aria-label', 'Page ' + page);
      if (page === currentPage) {
        btn.setAttribute('aria-current', 'page');
      }
      pagesWrap.appendChild(btn);
    }

    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
  }

  function updatePortfolioView(animateNew) {
    var filtered = getFilteredItems();
    var totalPages = getTotalPages();

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    var start = (currentPage - 1) * perPage;
    var visibleItems = filtered.slice(start, start + perPage);
    var visibleSet = new Set(visibleItems);

    items.forEach(function (item) {
      var shouldShow = visibleSet.has(item);
      var wasHidden = item.hasAttribute('hidden');

      if (shouldShow) {
        item.removeAttribute('hidden');
        item.classList.remove('is-filtered-out');
        if (animateNew && wasHidden && window.gsap) {
          window.gsap.fromTo(item,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        }
        return;
      }

      item.setAttribute('hidden', '');
      item.classList.remove('is-filtered-out');
    });

    renderPaginationControls(totalPages);
  }

  function goToPage(page, animateNew) {
    var totalPages = getTotalPages();
    currentPage = Math.min(Math.max(page, 1), totalPages);
    updatePortfolioView(animateNew);

    if (portfolioGrid) {
      portfolioGrid.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }
  }

  if (filterWrap) {
    filterWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filterWrap.querySelectorAll('.cadmus-filter').forEach(function (el) {
        var active = el === btn;
        el.classList.toggle('is-active', active);
        el.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      activeFilter = btn.getAttribute('data-filter') || 'all';
      currentPage = 1;
      updatePortfolioView(false);
    });
  }

  if (pagination) {
    pagination.addEventListener('click', function (e) {
      var pageBtn = e.target.closest('[data-portfolio-page]');
      if (pageBtn) {
        goToPage(parseInt(pageBtn.getAttribute('data-portfolio-page') || '1', 10), true);
        return;
      }
      if (e.target.closest('[data-portfolio-prev]')) {
        goToPage(currentPage - 1, true);
        return;
      }
      if (e.target.closest('[data-portfolio-next]')) {
        goToPage(currentPage + 1, true);
      }
    });
  }

  if (items.length) {
    updatePortfolioView(false);
  }

  function resetMotionFallbacks() {
    doc.querySelectorAll('.has-animation').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    var heroReveal = doc.querySelector('[data-hero-reveal]');
    if (heroReveal) heroReveal.style.clipPath = 'inset(0% 0% 0% 0% round 20px)';
    doc.querySelectorAll('.cadmus-hero__display .caption-word__inner').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  var motionReady = false;

  function initMotion() {
    if (motionReady) return;
    motionReady = true;

    if (reduceMotion) {
      resetMotionFallbacks();
      return;
    }

    if (!window.gsap || !window.ScrollTrigger) {
      resetMotionFallbacks();
      return;
    }

    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

  /* ── Hero — Ayana-style load + scroll transitions ── */
  function animateCaption(container, baseDelay) {
    if (!container) return;
    baseDelay = baseDelay || 0;
    var chars = container.querySelectorAll('.caption-char');
    var words = container.querySelectorAll('.caption-word__inner');

    if (chars.length) {
      gsap.fromTo(chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power4.out',
          stagger: 0.035,
          delay: baseDelay,
        }
      );
      return;
    }

    if (words.length) {
      gsap.fromTo(words,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          delay: baseDelay,
        }
      );
    }
  }

  var heroTitle = doc.querySelector('[data-hero-title]');
  if (heroTitle) {
    animateCaption(heroTitle, 0.15);

    var heroWords = heroTitle.querySelectorAll('.caption-word__inner');
    if (heroWords.length) {
      var heroHoverTween;
      var heroHoverTarget = heroTitle;

      heroHoverTarget.addEventListener('mouseenter', function () {
        heroTitle.classList.add('is-hover');
        if (heroHoverTween) heroHoverTween.kill();
        heroHoverTween = gsap.to(heroWords, {
          yPercent: -14,
          scale: 1.04,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.09,
          overwrite: 'auto',
        });
      });

      heroHoverTarget.addEventListener('mouseleave', function () {
        heroTitle.classList.remove('is-hover');
        if (heroHoverTween) heroHoverTween.kill();
        heroHoverTween = gsap.to(heroWords, {
          yPercent: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.06,
          overwrite: 'auto',
        });
      });
    }
  }

  var heroMetaItems = doc.querySelectorAll('[data-hero-meta-item]');
  if (heroMetaItems.length) {
    gsap.set(heroMetaItems, { y: 36, opacity: 0 });
    gsap.to(heroMetaItems, {
      y: 0,
      opacity: 1,
      duration: 0.95,
      ease: 'power3.out',
      stagger: 0.14,
      delay: 0.55,
    });
  }

  var heroMedia = doc.querySelector('[data-hero-media]');
  var heroReveal = doc.querySelector('[data-hero-reveal]');
  var heroPortrait = doc.querySelector('[data-hero-portrait]');

  if (heroMedia) {
    gsap.fromTo(heroMedia,
      { y: 72, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 1.15, ease: 'power3.out', delay: 0.75 }
    );
  }

  if (heroReveal && heroMedia) {
    gsap.fromTo(heroReveal,
      { clipPath: 'inset(12% 6% 12% 6% round 20px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 20px)',
        ease: 'none',
        scrollTrigger: {
          trigger: heroMedia,
          start: 'top 88%',
          end: 'top 35%',
          scrub: 0.45,
        },
      }
    );

    gsap.to(heroMedia, {
      height: window.matchMedia('(max-width: 960px)').matches ? '56vh' : '80vh',
      ease: 'none',
      scrollTrigger: {
        trigger: heroMedia,
        start: 'top 75%',
        end: 'top 15%',
        scrub: 0.5,
      },
    });
  }

  if (heroPortrait && heroMedia) {
    gsap.to(heroPortrait, {
      y: -28,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: {
        trigger: heroMedia,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.65,
      },
    });
  }

  /* ── Scroll reveal (Montoya has-animation) ── */
  doc.querySelectorAll('.has-animation').forEach(function (el) {
    var delay = parseInt(el.getAttribute('data-delay') || '0', 10) / 1000;
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Section title word reveals ── */
  doc.querySelectorAll('.cadmus-section-title.caption-timeline, .cadmus-contact__title.caption-timeline').forEach(function (title) {
    var words = title.querySelectorAll('.caption-word__inner');
    if (!words.length) return;
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.to(words, {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
      },
    });
  });

  /* ── Header sticky state on scroll ── */
  var header = doc.getElementById('cadmus-header');
  if (header) {
    function updateHeaderScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }

    updateHeaderScroll();
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  }

  /* ── Niche hover lift (batch) ── */
  gsap.utils.toArray('.cadmus-niches__list li').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      gsap.to(item.querySelector('span'), { y: -4, duration: 0.3, ease: 'power2.out' });
    });
    item.addEventListener('mouseleave', function () {
      gsap.to(item.querySelector('span'), { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
  }

  if (document.readyState === 'complete') {
    window.requestAnimationFrame(initMotion);
  } else {
    window.addEventListener('load', function () {
      window.requestAnimationFrame(initMotion);
    });
  }
})();
