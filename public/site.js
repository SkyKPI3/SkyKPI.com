// Mobile nav toggle and scroll reveal. Kept as a file so the content
// security policy can allow scripts from this site only.
// Mobile nav toggle
const toggle = document.querySelector('.site-nav__toggle');
const list = document.getElementById('site-nav-list');
if (toggle && list) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.textContent = open ? 'Menu' : 'Close';
    list.classList.toggle('is-open', !open);
  });
}

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal
const revealed = document.querySelectorAll('.reveal');
if (!reduced && 'IntersectionObserver' in window && revealed.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add('is-in'));
}
