// Count stat numbers up from 0 the first time they scroll into view
const counters = document.querySelectorAll('.stat_number');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      observer.unobserve(target);

      const end = Number(target.dataset.value);
      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        target.textContent = Math.round(end * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => {
    counter.dataset.value = counter.textContent;
    counter.textContent = '0';
    observer.observe(counter);
  });
}
