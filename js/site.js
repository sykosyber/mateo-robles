const revealItems = [...document.querySelectorAll('[data-reveal]')];

const showAll = () => {
  revealItems.forEach((item) => item.classList.add('is-visible'));
};

if (!('IntersectionObserver' in window)) {
  showAll();
} else try {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  revealItems.forEach((item) => observer.observe(item));
} catch {
  // The start state is hidden, so anything that goes wrong here must still
  // end with the content on screen.
  showAll();
}
