// Preencha quando o cliente enviar os dados. Número no formato 5547999999999.
const CONTACT = { whatsapp: '', balconyVideo: '' };
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const opened = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(opened)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const sections = [...document.querySelectorAll('main section, footer')];
  let framePending = false;
  function updateActiveSection() {
    const marker = document.querySelector('.header').getBoundingClientRect().bottom + 80;
    let current = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= marker) current = section; });
    nav.querySelectorAll('a').forEach(link => {
      const active = link.hash === '#' + current.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    framePending = false;
  }
  window.addEventListener('scroll', () => { if (!framePending) { framePending = true; requestAnimationFrame(updateActiveSection); } }, {passive: true});
  window.addEventListener('resize', () => { closeMenu(); updateActiveSection(); });
  updateActiveSection();
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.remove('pending'); observer.unobserve(entry.target); } }); }, {threshold: 0.08});
    reveals.forEach(el => { if (el.getBoundingClientRect().top > innerHeight) el.classList.add('pending'); observer.observe(el); });
    document.body.classList.add('motion');
  }
}
const whatsapp = document.querySelector('.whatsapp');
if (/^\d{10,15}$/.test(CONTACT.whatsapp)) {
  whatsapp.href = 'https://wa.me/' + CONTACT.whatsapp;
  whatsapp.target = '_blank'; whatsapp.rel = 'noopener noreferrer'; whatsapp.removeAttribute('aria-disabled');
  whatsapp.querySelector('span').textContent = '↗';
  document.querySelector('.contact-note').textContent = 'Fale com o anfitrião para tirar suas dúvidas.';
} else { whatsapp.addEventListener('click', event => event.preventDefault()); }
if (CONTACT.balconyVideo) {
  const url = new URL(CONTACT.balconyVideo, location.href);
  if (url.protocol === 'https:' || url.origin === location.origin) {
    const video = document.createElement('video'); video.controls = true; video.preload = 'metadata'; video.playsInline = true;
    video.poster = 'assets/sacada.jpg'; video.src = url.href; video.setAttribute('aria-label', 'Como abrir a sacada do Apê Parque Praia');
    video.textContent = 'Seu navegador não suporta vídeo. Solicite as instruções ao anfitrião.';
    document.querySelector('#video-container').replaceWith(video);
  }
}
