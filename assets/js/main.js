/**
* Template Name: Kelly
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

/* Parallax for fullscreen hero image (.img-bg-index) */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const el = document.querySelector('.img-bg-index');
    if (!el) return;

    // Ensure element has fixed full-viewport styles if it's an <img>
    el.style.position = 'fixed';
    el.style.top = '0';
    el.style.left = '50%';
    el.style.width = '100vw';
    el.style.height = '100vh';
    el.style.transform = 'translateX(-50%) translateY(0)';
    el.style.objectFit = 'cover';
    el.style.zIndex = '-1';
    el.style.pointerEvents = 'none';
    el.style.willChange = 'transform';

    let lastScroll = window.scrollY || 0;
    let ticking = false;

    function update(){
      // parallax factor: 0.2 = moves 20% of scroll speed (slower) for depth
      const y = Math.round(lastScroll * 0.2);
      el.style.transform = `translateX(-50%) translateY(${y}px)`;
      ticking = false;
    }

    window.addEventListener('scroll', function(){
      lastScroll = window.scrollY || 0;
      if (!ticking){
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    // initialize position
    requestAnimationFrame(function(){ lastScroll = window.scrollY || 0; update(); });
  });
})();

// Theme toggle (persistent)
(function() {
  const storageKey = 'site-theme';
  const body = document.body;

  function applyStoredTheme() {
    try {
      const t = localStorage.getItem(storageKey);
      if (t === 'dark') {
        body.classList.add('dark-theme');
        document.documentElement.classList.add('dark-theme');
      } else {
        body.classList.remove('dark-theme');
        document.documentElement.classList.remove('dark-theme');
      }
    } catch (e) {
      // ignore
    }
  }

  applyStoredTheme();

  function updateToggleIcon(btn) {
    if (!btn) return;
    const isDark = document.documentElement.classList.contains('dark-theme') || body.classList.contains('dark-theme');
    btn.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    btn.setAttribute('aria-pressed', !!isDark);
  }

  // Wire up toggle button if present on the page.
  // Use a small readiness helper so this works even if the script runs
  // after DOMContentLoaded or if the page was already loaded (mobile browsers can vary).
  function wireThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    updateToggleIcon(btn);
    if (!btn) return;

    function toggleHandler(e) {
      // For touchstart we don't want the synthetic click to double-run, so
      // prevent default and stop propagation here.
      if (e) { e.preventDefault(); e.stopPropagation(); }
      body.classList.toggle('dark-theme');
      document.documentElement.classList.toggle('dark-theme');
      try { localStorage.setItem(storageKey, body.classList.contains('dark-theme') ? 'dark' : 'light'); } catch(e) {}
      updateToggleIcon(btn);
    }

    // Support both click and touchstart for better responsiveness on Android devices
    btn.addEventListener('click', toggleHandler, {passive: false});
    btn.addEventListener('touchstart', toggleHandler, {passive: false});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireThemeToggle);
  } else {
    // DOM already available
    wireThemeToggle();
  }

  // Keep the toggle icon in sync when theme class is changed externally
  try {
    const observer = new MutationObserver(function(){
      const btn = document.getElementById('theme-toggle');
      if (!btn) return;
      updateToggleIcon(btn);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    if (document.body) observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    else document.addEventListener('DOMContentLoaded', function(){
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    });
  } catch (e) { /* ignore */ }
})();

/* About image hover -> play/pause music + spin */
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const aboutImg = document.querySelector('.about-img');
    if (!aboutImg) return;

    // Try to use an existing <audio id="hover-audio"> element if present (preferred),
    // otherwise fall back to creating an Audio() from a local path.
    let audio = null;
    const audioEl = document.getElementById('hover-audio');
    if (audioEl) {
      audio = audioEl;
      try { audio.loop = true; } catch (e) {}
    } else {
      // Array of available audio files for randomization
      const audioFiles = ['assets/audio/hover_music.mp3', 'assets/audio/Cloud 9.mp3', 'assets/audio/I Wouldn\'t Mind.mp3'];
      let audioSrc = sessionStorage.getItem('about_audio_src');
      // Only randomize if this is a true page load (not navigation)
      // Use performance.navigation.type for legacy, and performance.getEntriesByType for modern browsers
      let shouldRandomize = false;
      try {
        if (!audioSrc || !audioFiles.includes(audioSrc)) {
          shouldRandomize = true;
        } else {
          // If the page was reloaded (not just navigated), randomize
          if (performance && performance.getEntriesByType) {
            const navs = performance.getEntriesByType('navigation');
            if (navs.length && navs[0].type === 'reload') shouldRandomize = true;
          } else if (performance && performance.navigation && performance.navigation.type === 1) {
            shouldRandomize = true;
          }
        }
      } catch(e){}
      if (shouldRandomize) {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        audioSrc = audioFiles[randomIndex];
        sessionStorage.setItem('about_audio_src', audioSrc);
      }
      if (!audioSrc || !audioFiles.includes(audioSrc)) {
        // fallback to first song if something went wrong
        audioSrc = audioFiles[0];
        sessionStorage.setItem('about_audio_src', audioSrc);
      }
      try {
        audio = new Audio(audioSrc);
        audio.loop = true;
      } catch (e) {
        console.warn('Could not create audio for ' + audioSrc + ':', e);
        audio = null;
      }
    }

    // Visual-only hover: start/stop spin without audio
    let stopTimer = null;
    let isAudioPlaying = false;
    let isHover = false;

    function startVisual(){
      if (stopTimer) { clearTimeout(stopTimer); stopTimer = null; }
      aboutImg.classList.remove('paused');
      aboutImg.classList.add('spinning');
    }

    function stopVisual(){
      // debounce to allow small pointer moves
      if (stopTimer) clearTimeout(stopTimer);
      stopTimer = setTimeout(function(){
        // only pause visual if audio is not playing
        if (!isAudioPlaying){
          if (!aboutImg.classList.contains('spinning')) aboutImg.classList.add('spinning');
          aboutImg.classList.add('paused');
        }
        stopTimer = null;
      }, 180);
    }

    aboutImg.addEventListener('mouseenter', function(){ isHover = true; startVisual(); });
    aboutImg.addEventListener('mouseleave', function(){ isHover = false; stopVisual(); });
    aboutImg.addEventListener('focus', function(){ isHover = true; startVisual(); });
    aboutImg.addEventListener('blur', function(){ isHover = false; stopVisual(); });

    // Touch devices: treat touch as hover toggle for visuals only
    aboutImg.addEventListener('touchstart', function(e){
      e.preventDefault();
      if (!isHover){ isHover = true; startVisual(); }
      else { isHover = false; stopVisual(); }
    }, {passive:false});

    // If we have a visible audio element, prevent it intercepting touchstart
    if (audio instanceof HTMLElement && audio.tagName === 'AUDIO'){
      const audioElNode = audio;
      audioElNode.addEventListener('touchstart', function(e){ e.stopPropagation(); }, {passive:true});
    }

    // Play/pause button behavior
    const zoom = document.querySelector('.about-img-zoom');
    const playBtn = zoom ? zoom.querySelector('.about-play-btn') : null;
    // particle start/stop functions will be assigned later by the noteParticles IIFE
    let startParticles = function(){};
    let stopParticles = function(){};

    function playAudio(){
      if (!audio) return;
      audio.play().then(()=>{
        isAudioPlaying = true;
        if (playBtn) { playBtn.classList.add('playing'); playBtn.setAttribute('aria-pressed','true'); }
        // ensure visual stays spinning
        aboutImg.classList.remove('paused');
        aboutImg.classList.add('spinning');
        // start particles
        if (typeof startParticles === 'function') startParticles();
        // start leaves
        if (typeof startLeaves === 'function') startLeaves();
        // persist playing state so other pages can show a mini widget
        try {
          sessionStorage.setItem('about_audio_playing', '1');
          const src = (audio && audio.currentSrc) ? audio.currentSrc : (audio && audio.src) ? audio.src : '';
          if (src) sessionStorage.setItem('about_audio_src', src);
          // store the about image src so other pages can show the correct image
          try { const imgSrc = (aboutImg && (aboutImg.currentSrc || aboutImg.src || aboutImg.getAttribute('src'))) || ''; if (imgSrc) sessionStorage.setItem('about_image_src', imgSrc); } catch(e){}
          sessionStorage.setItem('about_audio_time', String(Math.floor((audio && audio.currentTime) ? audio.currentTime : 0)));
        } catch(e){}
        // start periodic time saver
        startStorageTicker();
      }).catch((err)=>{
        console.warn('Audio play failed:', err);
      });
    }

    function pauseAudio(){
      if (!audio) return;
      try { audio.pause(); } catch(e){}
      isAudioPlaying = false;
      if (playBtn) { playBtn.classList.remove('playing'); playBtn.setAttribute('aria-pressed','false'); }
      // stop particles
      if (typeof stopParticles === 'function') stopParticles();
      // if not hovering, stop visual
      if (!isHover) stopVisual();
      // persist paused state so rotation / widget state is preserved across pages
      try {
        sessionStorage.setItem('about_audio_playing', '0');
        sessionStorage.setItem('about_audio_time', String(Math.floor((audio && audio.currentTime) ? audio.currentTime : 0)));
        const src = (audio && audio.currentSrc) ? audio.currentSrc : (audio && audio.src) ? audio.src : '';
        if (src) sessionStorage.setItem('about_audio_src', src);
        try { const imgSrc = (aboutImg && (aboutImg.currentSrc || aboutImg.src || aboutImg.getAttribute('src'))) || ''; if (imgSrc) sessionStorage.setItem('about_image_src', imgSrc); } catch(e){}
      } catch(e){}
      stopStorageTicker();
    }

    if (playBtn){
      playBtn.addEventListener('click', function(e){
        e.stopPropagation();
        if (!isAudioPlaying) playAudio(); else pauseAudio();
      });
    }

    // Simple musical-note particle system around the about image
    (function noteParticles(){
      const zoomEl = document.querySelector('.about-img-zoom');
      if (!zoomEl) return;
      const container = zoomEl.querySelector('.note-particles');
      if (!container) return;

      let timer = null;
      const spawn = () => {
        const note = document.createElement('span');
        note.className = 'note';
        note.textContent = Math.random() < 0.5 ? '🎵' : '♪';
        const x = (Math.random() * 140) - 20; // percent
        const y = (Math.random() * 30) + 10; // percent start
        const r = (Math.random() * 60) - 30; // deg
        const size = Math.floor(12 + Math.random() * 14);
        note.style.left = x + '%';
        note.style.top = (50 + (Math.random() * 10) - 5) + '%';
        note.style.fontSize = size + 'px';
        note.style.setProperty('--tx', x + '%');
        note.style.setProperty('--ty', y + '%');
        note.style.setProperty('--r', r + 'deg');
        container.appendChild(note);
        note.addEventListener('animationend', () => note.remove());
      };

      const start = () => {
        if (timer) return;
        spawn();
        timer = setInterval(spawn, 600);
      };
      const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

      // expose start/stop to outer scope used by play/pause
      try { window.__about_note_start = start; window.__about_note_stop = stop; } catch(e){}

      // cleanup on page hide
      document.addEventListener('visibilitychange', function(){ if (document.hidden) stop(); });
    })();

    // Autumn leaf falling particle system across the website
    (function leafParticles(){
      let container = document.querySelector('.leaf-particles');
      if (!container) {
        container = document.createElement('div');
        container.className = 'leaf-particles';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
      }

      let timer = null;
      // Improved leaf spawn: smaller, vertical fall, gentle sway
      const spawn = () => {
        // Use an <img> element instead of an emoji so we can control visuals
        const leaf = document.createElement('img');
        leaf.className = 'leaf';
        // Path to the autumn leaf image in the project's img folder
        leaf.src = 'assets/img/autumnleaf.png';
        leaf.alt = '';
        // Smaller size for realism (use image width)
        const size = Math.floor(12 + Math.random() * 18);
        // Start position and sway
        const x = Math.random() * 100; // percent across screen
        const sway = 10 + Math.random() * 20; // px sway amplitude
        const swaySpeed = 2 + Math.random() * 2; // seconds for one sway cycle
        const duration = 6 + Math.random() * 4; // seconds to fall
        leaf.style.left = x + '%';
        leaf.style.width = size + 'px';
        leaf.style.height = 'auto';
        leaf.style.display = 'block';
        leaf.style.position = 'absolute';
        // Custom animation for sway and fall with 3D spin
        leaf.style.animation = `fall-leaf ${duration}s linear forwards, sway-spin ${swaySpeed}s ease-in-out infinite alternate`;
        leaf.style.setProperty('--fall-duration', duration + 's');
        leaf.style.setProperty('--sway-amplitude', sway + 'px');
        container.appendChild(leaf);
        leaf.addEventListener('animationend', () => leaf.remove());
      };

      const start = () => {
        if (timer) return;
        spawn();
        timer = setInterval(spawn, 900);
      };
      const stop = () => {
        if (timer) { clearInterval(timer); timer = null; }
        // remove all existing leaves to stop them immediately
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      };

      // expose start/stop to outer scope used by play/pause
      try { window.__about_leaf_start = start; window.__about_leaf_stop = stop; } catch(e){}

      // cleanup on page hide
      document.addEventListener('visibilitychange', function(){ if (document.hidden) stop(); });
    })();

    // Add CSS for improved leaf animation
    (function addLeafCSS(){
      if (document.getElementById('leaf-anim-css')) return;
      const style = document.createElement('style');
      style.id = 'leaf-anim-css';
      style.textContent = `
        .leaf-particles .leaf {
          position: absolute;
          top: 0;
          will-change: transform;
          pointer-events: none;
          user-select: none;
          display: block;
          transform-origin: 50% 20%;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        @keyframes fall-leaf {
          0% { top: -10vh; opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100vh; opacity: 0.18; }
        }
        @keyframes sway-spin {
          0% { transform: translateX(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          50% { transform: translateX(calc(var(--sway-amplitude, 20px))) rotateX(180deg) rotateY(20deg) rotateZ(30deg); }
          100% { transform: translateX(0) rotateX(360deg) rotateY(0deg) rotateZ(60deg); }
        }
      `;
      document.head.appendChild(style);
    })();

    // link particle start/stop to our play/pause functions if available
    if (typeof window.__about_note_start === 'function') startParticles = window.__about_note_start;
    if (typeof window.__about_note_stop === 'function') stopParticles = window.__about_note_stop;
    // link leaf start/stop to our play/pause functions if available
    if (typeof window.__about_leaf_start === 'function') startLeaves = window.__about_leaf_start;
    if (typeof window.__about_leaf_stop === 'function') stopLeaves = window.__about_leaf_stop;

    // If the user previously had the about audio playing/paused (sessionStorage), restore UI state here
    try{
      const stored = sessionStorage.getItem('about_audio_playing');
      const storedSrc = sessionStorage.getItem('about_audio_src');
      const storedTime = parseFloat(sessionStorage.getItem('about_audio_time') || '0');
      if (stored === '1'){
        // Check if the current audio src matches the stored src; if not, reset time
        if (storedSrc && audio && audio.src !== storedSrc){
          sessionStorage.setItem('about_audio_time', '0');
        } else {
          if (audio && !isNaN(storedTime) && storedTime > 0){ try { audio.currentTime = Math.max(0, storedTime - 0); } catch(e){} }
        }
        // attempt to resume play and rehydrate UI (playAudio handles UI and particles)
        try { playAudio(); } catch(e){}
      } else if (stored === '0'){
        // If different song, reset time in storage
        if (storedSrc && audio && audio.src !== storedSrc){
          sessionStorage.setItem('about_audio_time', '0');
        }
        // restore paused visual: preserve computed rotation by keeping spinning + paused classes
        try {
          if (aboutImg) { aboutImg.classList.add('spinning'); aboutImg.classList.add('paused'); }
          if (playBtn) { playBtn.classList.remove('playing'); playBtn.setAttribute('aria-pressed','false'); }
          // ensure particles are stopped
          if (typeof stopParticles === 'function') stopParticles();
          // ensure leaves are stopped
          if (typeof stopLeaves === 'function') stopLeaves();
        } catch(e){}
      }
    }catch(e){}
  });
})();

/* Persist about-audio time periodically and create mini widget on other pages
   when the audio was playing during the last navigation. This helps show a
   minimized about image at bottom-left if the user had the audio playing. */
(function(){
  const STORAGE_PLAY_KEY = 'about_audio_playing';
  const STORAGE_TIME_KEY = 'about_audio_time';
  const STORAGE_SRC_KEY = 'about_audio_src';
  const STORAGE_IMAGE_KEY = 'about_image_src';

  let storageTicker = null;

  function startStorageTicker(){
    stopStorageTicker();
    try{
      storageTicker = setInterval(()=>{
        const playing = sessionStorage.getItem(STORAGE_PLAY_KEY);
        if (playing !== '1') return;
        // attempt to update time if an in-page audio exists
        const a = document.getElementById('hover-audio') || document.querySelector('audio');
        if (a && typeof a.currentTime === 'number'){
          sessionStorage.setItem(STORAGE_TIME_KEY, String(Math.floor(a.currentTime)));
          const src = (a.currentSrc) ? a.currentSrc : (a.src || '');
          if (src) sessionStorage.setItem(STORAGE_SRC_KEY, src);
        }
      }, 1000);
    }catch(e){}
  }

  function stopStorageTicker(){ if (storageTicker) { clearInterval(storageTicker); storageTicker = null; } }

  // Expose helpers to about page code if available
  try{ window.__about_start_storage = startStorageTicker; window.__about_stop_storage = stopStorageTicker; }catch(e){}

  // On all pages, if session says audio was playing, create a mini widget.
  document.addEventListener('DOMContentLoaded', function(){
    try{
        const wasPlaying = sessionStorage.getItem(STORAGE_PLAY_KEY) === '1';
        const isAboutPage = !!document.querySelector('.about-img');
        // If not playing, nothing to do. If we're on the About page, About's own script will
        // restore the playback/UI state — so skip creating the mini widget on About.
        if (!wasPlaying || isAboutPage) return;
        const imgSrc = sessionStorage.getItem(STORAGE_IMAGE_KEY) || 'assets/img/bruh.jpg';

      // create mini widget
      const mini = document.createElement('div');
      mini.className = 'mini-about';
      mini.innerHTML = `
        <img class="mini-about-img" src="${imgSrc}" alt="Mini about">
        <button class="mini-about-btn" aria-label="Pause about audio" title="Pause"></button>
      `;
      document.body.appendChild(mini);

      // Try to resume audio on this page
      let miniAudio = null;
      const src = sessionStorage.getItem(STORAGE_SRC_KEY) || 'assets/audio/hover_music.mp3';
      const time = parseFloat(sessionStorage.getItem(STORAGE_TIME_KEY) || '0');
      try{
        miniAudio = new Audio(src);
        miniAudio.loop = true;
        if (time && !isNaN(time)) miniAudio.currentTime = Math.max(0, time - 0);
        // Attempt to play; if browser blocks, the widget still appears and user can press pause/play
        miniAudio.play().then(()=>{
          // playing
          mini.classList.add('playing');
        }).catch(()=>{
          // couldn't auto-play; show widget but not playing state
          mini.classList.remove('playing');
        });
      }catch(e){ miniAudio = null; }

      // clicking pause should stop audio and remove widget + clear session storage (but keep src for consistency)
      const btn = mini.querySelector('.mini-about-btn');
      btn.addEventListener('click', function(e){
        e.preventDefault();
        try{ if (miniAudio) miniAudio.pause(); }catch(_){}
        try{ sessionStorage.removeItem(STORAGE_PLAY_KEY); sessionStorage.removeItem(STORAGE_TIME_KEY); }catch(e){}
        mini.remove();
      });

      // cleanup on pagehide to save final time
      window.addEventListener('pagehide', function(){
        try{
          if (miniAudio && typeof miniAudio.currentTime === 'number'){
            sessionStorage.setItem(STORAGE_TIME_KEY, String(Math.floor(miniAudio.currentTime)));
          }
        }catch(e){}
      });

    }catch(e){ /* ignore */ }
  });
})();
