(function () {
  document.body.classList.add('js-reveal');

  var figures = Array.prototype.slice.call(document.querySelectorAll('.photo-section figure'));
  var overlay, overlayImg, overlayCaption;

  figures.forEach(function (figure) {
    var img = figure.querySelector('img');
    if (!img) return;

    var frame = document.createElement('div');
    frame.className = 'photo-frame';
    img.parentNode.insertBefore(frame, img);
    frame.appendChild(img);

    var hint = document.createElement('span');
    hint.className = 'zoom-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = '⤢';
    frame.appendChild(hint);

    img.addEventListener('click', function () {
      var caption = figure.querySelector('figcaption');
      openLightbox(img.src, img.alt, caption ? caption.textContent : '');
    });
  });

  if ('IntersectionObserver' in window && figures.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    figures.forEach(function (figure, i) {
      figure.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
      io.observe(figure);
    });
  } else {
    figures.forEach(function (figure) { figure.classList.add('is-visible'); });
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    var closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close photo');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closeLightbox);

    overlayImg = document.createElement('img');
    overlayCaption = document.createElement('p');
    overlayCaption.className = 'lightbox-caption';

    overlay.appendChild(closeBtn);
    overlay.appendChild(overlayImg);
    overlay.appendChild(overlayCaption);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function openLightbox(src, alt, caption) {
    if (!overlay) buildOverlay();
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlayCaption.textContent = caption || '';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      overlay.classList.add('is-open');
    });
  }

  function closeLightbox() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
})();
