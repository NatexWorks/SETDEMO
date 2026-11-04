/* Mobile-only motion additions. Existing desktop/tablet animation code remains the owner of those viewports. */
(() => {
  const mobile = window.matchMedia('(max-width: 760px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.site-header .menu-toggle');
  const nav = document.querySelector('#primary-nav');
  let priorOverflow = '';

  // Keep one source of truth: script.js toggles .is-open; this observer handles mobile state only.
  if (menuButton && nav) {
    const syncMenu = () => {
      const open = nav.classList.contains('is-open') && mobile.matches;
      menuButton.setAttribute('aria-expanded', String(open));
      if (open) {
        if (document.body.style.overflow !== 'hidden') priorOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      } else if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = priorOverflow;
      }
    };
    new MutationObserver(syncMenu).observe(nav, {attributes:true, attributeFilter:['class']});
    mobile.addEventListener?.('change', syncMenu);
    syncMenu();
    document.addEventListener('keydown', event => {
      if (!mobile.matches || !nav.classList.contains('is-open')) return;
      if (event.key === 'Escape') { menuButton.click(); menuButton.focus(); return; }
      if (event.key !== 'Tab') return;
      const items = [menuButton, ...nav.querySelectorAll('a[href]')].filter(el => el.offsetParent !== null);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }

  const animateIfMobile = callback => {
    if (!mobile.matches || reducedMotion.matches) return;
    callback();
  };

  // Mobile service cards: scroll-linked sticky stack, with the next section taking over at the end.
  const serviceSection = document.querySelector('#services');
  const serviceGrid = serviceSection?.querySelector('.service-grid');
  const serviceCards = serviceGrid ? [...serviceGrid.querySelectorAll(':scope > .service-card')] : [];
  const nextSection = document.querySelector('#skills');
  if (serviceSection && serviceGrid && serviceCards.length === 4 && nextSection) {
    serviceCards.forEach((card, index) => {
      card.dataset.mobileStackIndex = String(index);
      card.style.setProperty('--mobile-stack-index', index);
    });
    let raf = 0;
    const updateStack = () => {
      raf = 0;
      if (!mobile.matches || reducedMotion.matches) {
        serviceSection.classList.remove('mobile-service-stack-active', 'mobile-service-stack-exit');
        serviceCards.forEach(card => { card.style.removeProperty('--stack-progress'); });
        return;
      }
      const rect = serviceSection.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = rect.top + window.scrollY - vh * .12;
      const stackDistance = Math.max(1, serviceGrid.offsetHeight - vh * .62);
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / stackDistance));
      serviceSection.classList.toggle('mobile-service-stack-active', rect.bottom > 0 && rect.top < vh);
      serviceCards.forEach((card, index) => {
        const cardProgress = Math.max(0, Math.min(1, progress * 4 - index));
        card.style.setProperty('--stack-progress', cardProgress.toFixed(4));
      });
      const exitStart = start + stackDistance + vh * .12;
      const exit = Math.max(0, Math.min(1, (window.scrollY - exitStart) / (vh * .7)));
      serviceSection.style.setProperty('--service-exit-progress', exit.toFixed(4));
      serviceSection.classList.toggle('mobile-service-stack-exit', exit > 0 && rect.bottom > vh * .1);
    };
    const requestStackUpdate = () => { if (!raf) raf = requestAnimationFrame(updateStack); };
    window.addEventListener('scroll', requestStackUpdate, {passive:true});
    window.addEventListener('resize', requestStackUpdate, {passive:true});
    mobile.addEventListener?.('change', requestStackUpdate);
    reducedMotion.addEventListener?.('change', requestStackUpdate);
    requestStackUpdate();
  }

  // The inventory preview's status chips are presentation-only; real inventory controls are untouched.
  // Mobile process-card press feedback uses transform, so neighbouring cards never reflow.
  document.querySelectorAll('#process .process-step').forEach(card => {
    card.addEventListener('pointerdown', () => { if (mobile.matches && !reducedMotion.matches) card.classList.add('mobile-pressed'); });
    ['pointerup','pointercancel','pointerleave','blur'].forEach(type => card.addEventListener(type, () => card.classList.remove('mobile-pressed')));
  });

  // Existing About heading markup already exposes the exact phrase for the underline.
  const aboutHeading = document.querySelector('.about-word-heading .headline-muted');
  if (aboutHeading) aboutHeading.classList.add('mobile-practical-underline');

  // Sequential word reveal helper: preserve the original text for assistive technology.
  const wrapWords = (element, delay = 70, maxDelay = 2200) => {
    if (!element || element.dataset.mobileWordReveal === 'true') return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    let index = 0;
    nodes.forEach(node => {
      if (!node.nodeValue.trim() || node.parentElement?.closest('script,style,.mobile-reveal-word')) return;
      const fragment = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { fragment.append(document.createTextNode(part)); return; }
        const span = document.createElement('span'); span.className = 'mobile-reveal-word';
        span.style.setProperty('--word-delay', `${Math.min(index * delay, maxDelay)}ms`); span.textContent = part; fragment.append(span); index++;
      });
      node.replaceWith(fragment);
    });
    element.dataset.mobileWordReveal = 'true';
  };

  const setupServicesText = () => {
    if (!mobile.matches || reducedMotion.matches) return;
    const hero = document.querySelector('.services-page-hero');
    const heading = hero?.querySelector('h1');
    const heroParagraph = hero?.querySelector('p');
    if (heading) wrapWords(heading, 90, 1600);
    if (heroParagraph) wrapWords(heroParagraph, 35, 900);
    const note = document.querySelector('.service-principle[data-services-motion="visibility-note"] p');
    if (note && !note.dataset.mobileLineRevealInit) {
      note.dataset.mobileLineRevealInit = 'true';
      const reveal = () => {
        if (note.dataset.mobileLineRevealDone) return;
        note.dataset.mobileLineRevealDone = 'true';
        wrapWords(note, 0, 0);
        const words = [...note.querySelectorAll('.mobile-reveal-word')];
        let previousTop = null, line = -1;
        words.forEach(word => {
          const top = Math.round(word.getBoundingClientRect().top);
          if (top !== previousTop) { line++; previousTop = top; }
          word.classList.add('mobile-line');
          word.style.setProperty('--line-index', line);
          word.style.setProperty('--smoke-delay', `${Math.min(line * 75, 450)}ms`);
        });
        note.classList.add('mobile-lines-visible');
      };
      if (reducedMotion.matches || !('IntersectionObserver' in window)) reveal();
      else {
        const observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) { reveal(); observer.disconnect(); }
        }, {threshold:.12});
        observer.observe(note);
        if (note.getBoundingClientRect().top < innerHeight) reveal();
      }
    }
  };
  setupServicesText();
  mobile.addEventListener?.('change', setupServicesText);

  // Reuse the inventory-style reveal timing for the four existing service detail rows on mobile.
  const serviceDetails = [...document.querySelectorAll('.service-detail-list > .service-detail')];
  if (serviceDetails.length && 'IntersectionObserver' in window && mobile.matches && !reducedMotion.matches) {
    serviceDetails.forEach((card, index) => card.style.setProperty('--detail-reveal-delay', `${index * 90}ms`));
    const detailObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('mobile-detail-visible');
        detailObserver.unobserve(entry.target);
      });
    }, {threshold:.12});
    serviceDetails.forEach(card => detailObserver.observe(card));
  }

  // Touch feedback for service-detail rows, while retaining their existing hover behavior on larger screens.
  document.querySelectorAll('.service-detail-list > .service-detail').forEach(card => {
    card.addEventListener('pointerdown', () => { if (mobile.matches && !reducedMotion.matches) card.classList.add('mobile-pressed'); });
    ['pointerup','pointercancel','pointerleave'].forEach(type => card.addEventListener(type, () => card.classList.remove('mobile-pressed')));
  });
})();
