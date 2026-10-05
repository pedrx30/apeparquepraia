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
  const sections = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { nav.querySelectorAll('a').forEach(link => { const active = link.hash === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, {rootMargin: '-15% 0px -50% 0px'});
  document.querySelectorAll('main section, footer').forEach(section => sections.observe(section));
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
    video.poster = 'assets/sacada.jpg'; video.src = url.href; video.setAttribute('aria-label', 'Como abrir a sacada do AP Park Praia');
    video.textContent = 'Seu navegador não suporta vídeo. Solicite as instruções ao anfitrião.';
    document.querySelector('#video-container').replaceWith(video);
  }
}
