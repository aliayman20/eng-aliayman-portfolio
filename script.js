const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('section[id], header[id]')];
function setActiveLink(){
  const pos = window.scrollY + 130;
  let active = sections[0]?.id;
  sections.forEach(section => { if (pos >= section.offsetTop) active = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${active}`));
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

const navCollapse = document.querySelector('.navbar-collapse');
navLinks.forEach(link => link.addEventListener('click', () => {
  if (navCollapse && navCollapse.classList.contains('show')) {
    bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
  }
}));
