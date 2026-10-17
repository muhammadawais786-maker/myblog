(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (header && toggle) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var copy = document.querySelector('[data-copy-link]');
  if (copy && navigator.clipboard) {
    copy.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        var old = copy.textContent;
        copy.textContent = 'Link copied';
        setTimeout(function () { copy.textContent = old; }, 1800);
      });
    });
  }

  var slots = [].slice.call(document.querySelectorAll('[data-tv-src]'));
  function load(el) {
    if (el.getAttribute('data-loaded')) return;
    el.setAttribute('data-loaded', '1');
    var wrap = document.createElement('div');
    wrap.className = 'tradingview-widget-container';
    var inner = document.createElement('div');
    inner.className = 'tradingview-widget-container__widget';
    wrap.appendChild(inner);
    var s = document.createElement('script');
    s.async = true;
    s.src = el.getAttribute('data-tv-src');
    s.text = el.getAttribute('data-tv-config');
    wrap.appendChild(s);
    el.appendChild(wrap);
    el.classList.add('is-loaded');
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { io.unobserve(e.target); load(e.target); }
      });
    }, { rootMargin: '400px 0px' });
    slots.forEach(function (el) { io.observe(el); });
  } else {
    slots.forEach(load);
  }
})();
