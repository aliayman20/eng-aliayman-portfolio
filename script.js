const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll('.nav-link')];
const linksBySection = new Map(
  navLinks.map(link => [link.getAttribute('href').slice(1), link])
);

function setActiveLink(activeId) {
  navLinks.forEach(link => {
    const isActive = link === linksBySection.get(activeId);
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

const visibleSections = new Set();
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visibleSections.add(entry.target.id);
    } else {
      visibleSections.delete(entry.target.id);
    }
  });

  const activeId = [...linksBySection.keys()].find(id => visibleSections.has(id));
  setActiveLink(activeId);
}, {
  rootMargin: '-100px 0px -60% 0px',
  threshold: 0
});

linksBySection.forEach((link, id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

const navCollapse = document.querySelector('.navbar-collapse');
const navToggle = document.querySelector('.navbar-toggler');

function setMenuOpen(open) {
  if (!navCollapse || !navToggle) return;
  navCollapse.classList.toggle('show', open);
  navToggle.setAttribute('aria-expanded', String(open));
}

navToggle?.addEventListener('click', () => {
  setMenuOpen(!navCollapse.classList.contains('show'));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  setActiveLink(link.getAttribute('href').slice(1));
  setMenuOpen(false);
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navCollapse?.classList.contains('show')) {
    setMenuOpen(false);
    navToggle.focus();
  }
});

const desktopNav = window.matchMedia('(min-width: 992px)');
desktopNav.addEventListener('change', event => {
  if (event.matches) setMenuOpen(false);
});
