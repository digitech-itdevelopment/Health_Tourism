(function () {
  if (window.__abCtl) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) document.documentElement.setAttribute('data-ab-ready', '1');

  function reveal(el) {
    el.setAttribute('data-ab', '1');
    var live = window.__abLive;
    if (el.hasAttribute('data-counters') && live && live.count) live.count();
  }

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      reveal(e.target);
    });
  }, { threshold: 0.12 });

  var i = 0;
  function observe() {
    var nodes = document.querySelectorAll('[data-reveal]');
    for (var n = 0; n < nodes.length; n++) {
      var el = nodes[n];
      if (reduced || el.getAttribute('data-ab') === '1') continue;
      if (!el.hasAttribute('data-ab')) {
        el.setAttribute('data-ab', '0');
        el.setAttribute('data-ab-d', String(i++ % 8));
      }
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) reveal(el);
      else io.observe(el);
    }
  }

  function tick() {
    observe();
    var live = window.__abLive;
    var y = window.scrollY || 0;
    if (live && live.state && (y > 40) !== live.state.scrolled) live.setState({ scrolled: y > 40 });
    if (reduced) return;
    var px = document.querySelectorAll('[data-parallax]');
    for (var n = 0; n < px.length; n++) {
      var el = px[n];
      var r = el.getBoundingClientRect();
      var off = (r.top + r.height / 2 - window.innerHeight / 2) * parseFloat(el.getAttribute('data-parallax'));
      el.style.transform = 'translateY(' + (-off).toFixed(1) + 'px)';
    }
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick, { passive: true });
  setInterval(tick, 200);
  setTimeout(tick, 0);

  window.__abCtl = { observe: observe, paused: false, reduced: reduced };

  if (!reduced) {
    setInterval(function () {
      var l = window.__abLive;
      if (l && l.tickHero) l.tickHero();
    }, 6000);
    setInterval(function () {
      var l = window.__abLive;
      if (l && l.tickSlide && !window.__abCtl.paused) l.tickSlide();
    }, 5000);
  }
})();
