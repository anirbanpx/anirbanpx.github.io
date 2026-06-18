/* ═══════════════════════════════════════════════════════════
   NAV — transparent → solid on scroll
═══════════════════════════════════════════════════════════ */
const nav = document.getElementById('nav');

function handleNavScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

/* ═══════════════════════════════════════════════════════════
   MOBILE BURGER
═══════════════════════════════════════════════════════════ */
const burger = document.querySelector('.nav__burger');
const overlay = document.getElementById('navOverlay');
const overlayLinks = document.querySelectorAll('.nav__overlay-link');

function toggleMenu(open) {
  burger.classList.toggle('is-open', open);
  overlay.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => {
  const isOpen = overlay.classList.contains('is-open');
  toggleMenu(!isOpen);
});

overlayLinks.forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
═══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   SCROLL SPY — active nav link
═══════════════════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav__link');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}` || (href === '#about' && id === 'hero'));
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(section => spyObserver.observe(section));

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL — offset for fixed nav
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
