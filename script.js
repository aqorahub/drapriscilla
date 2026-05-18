document.addEventListener('DOMContentLoaded', () => {
  // FAQ
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Carousel
  let cur = 0;
  const slides = document.querySelectorAll('.dep-slide');
  const dots = document.querySelectorAll('.dep-dot');
  const track = document.getElementById('depTrack');
  
  // Make goTo globally accessible for onclick attributes, or attach event listeners
  window.goTo = function(n) {
    cur = Math.max(0, Math.min(n, slides.length - 1));
    if (track) {
        track.style.transform = `translateX(-${cur * 100}%)`;
    }
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  };
  
  window.dep = function(d) {
    window.goTo(cur + d);
  };
  
  const depPrev = document.getElementById('depPrev');
  if (depPrev) depPrev.addEventListener('click', () => window.dep(-1));
  
  const depNext = document.getElementById('depNext');
  if (depNext) depNext.addEventListener('click', () => window.dep(1));
  
  if (slides.length > 0) {
      setInterval(() => window.dep(cur === slides.length - 1 ? -(slides.length - 1) : 1), 5000);
  }

  // Simple reveal animation on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply animation initial state to elements
  const elementsToAnimate = document.querySelectorAll('.dor-card, .pq-card, .area-card, .step, .dep-card, .faq-item');
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.1, 0.7, 0.1, 1)';
    observer.observe(el);
  });
});
