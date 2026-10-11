// Preencher com arquivos locais quando os vídeos forem fornecidos.
const MEDIA = { checkinVideo: '', balconyVideo: '' };
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const menu=document.querySelector('#menu'),nav=document.querySelector('#navigation');
let menuShade;
function closeMenu(){
 if(!menu)return;
 nav.hidden=true;menu.setAttribute('aria-expanded','false');menuShade.hidden=true;
}
if(menu){
 menuShade=document.createElement('button');menuShade.className='menu-shade';menuShade.hidden=true;
 menuShade.setAttribute('aria-label','Fechar menu');document.body.append(menuShade);
 menu.addEventListener('click',()=>{const open=nav.hidden;nav.hidden=!open;menuShade.hidden=!open;menu.setAttribute('aria-expanded',String(open));});
 menuShade.addEventListener('click',closeMenu);
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
}
function photoFor(card,i,kind){const files=['sacada.jpg','beto carrero.jpg','fort atacadista.jfifs.webp','mcdonalds.jpg','Praia Alegre.png'];const importantFiles=['farmafaita-24h.jpg','farmacia-preco-popular.webp','pa-24h.jpg'];return 'assets/'+encodeURIComponent((kind==='locations'?files:importantFiles)[i]);}
for(const stage of document.querySelectorAll('[data-places]')){
 const kind=stage.dataset.places,items=kind==='locations'?LOCATIONS:IMPORTANT;
 stage.innerHTML=items.map((c,i)=>{const image=photoFor(c,i,kind);return `<article class="place-card vertical-stack-card" style="--stack-order:${i}" data-card="${kind}-${i}" aria-label="${esc(c.name)}"><div class="card-photo">${image?`<img src="${image}" alt="${esc(c.name)}" loading="lazy" decoding="async">`:`<span class="photo-pending">${kind==='locations'?`Foto de ${esc(c.name.replace(' 500m',''))} a inserir`:esc(c.name)}</span>`}</div><div class="place-body"><div class="place-details"><h3>${esc(c.name)}</h3>${c.hours?`<p class="place-hours">${esc(c.hours)}</p>`:''}${c.info?`<p class="info">${esc(c.info)}</p>`:''}${c.address?`<address>${esc(c.address)}</address>`:''}${c.unit?`<p class="unit">${esc(c.unit)}</p>`:''}</div><div class="card-actions">${c.address?`<button data-copy="${esc(c.copyAddress ?? c.address)}">Copiar endereço</button><a href="${c.url}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${arrow}</a>`:`<a href="praias.html">Conhecer as praias ${arrow}</a>`}</div></div></article>`;}).join('');
}
for(const group of document.querySelectorAll('[data-beaches]')){
 group.innerHTML=BEACHES.filter(b=>b.group===Number(group.dataset.beaches)).map((b,i)=>`<article class="beach-card vertical-stack-card" style="--stack-order:${i}"><div class="card-photo"><img src="assets/${encodeURIComponent(b.image)}" alt="${esc(b.name)}" loading="lazy" decoding="async"></div><div class="beach-body"><h3>${esc(b.name)}</h3><p>${esc(b.description)}</p><a href="${b.url}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${arrow}</a></div></article>`).join('');
}
const statusEl=document.querySelector('#copy-status');let toastTimer;
document.addEventListener('click',async event=>{const button=event.target.closest('[data-copy]');if(!button)return;try{await navigator.clipboard.writeText(button.dataset.copy);statusEl.textContent='Copiado!';}catch{statusEl.textContent='Não foi possível copiar. Selecione o texto e copie manualmente.';}statusEl.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>statusEl.hidden=true,3000);});
function equalizeCards(){
 const all=[...document.querySelectorAll('.place-card')];
 if(!all.length)return;
 all.forEach(card=>card.style.minHeight='0px');
 const importantDetails=[...document.querySelectorAll('[data-places="important"] .place-details')];
 importantDetails.forEach(detail=>detail.style.minHeight='0px');
 const detailsHeight=Math.ceil(Math.max(0,...importantDetails.map(detail=>detail.offsetHeight)));
 importantDetails.forEach(detail=>detail.style.minHeight=detailsHeight+'px');
 const reference=all.filter(card=>['locations-0','locations-1'].includes(card.dataset.card));
 const referenceHeight=Math.max(...reference.map(card=>card.offsetHeight));
 const requiredHeight=Math.max(...all.map(card=>card.offsetHeight));
 const height=Math.ceil(Math.max(referenceHeight,requiredHeight));
 all.forEach(card=>card.style.minHeight=height+'px');
}
function goToSection(id,smooth=true){
 const target=document.getElementById(id);
 if(!target)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const behavior=smooth&&!reduced?'smooth':'instant';
 if(id==='praias-inicio')window.scrollTo({top:0,behavior});
 else target.scrollIntoView({behavior,block:'start'});
}
let interacted=false;
for(const type of ['wheel','touchstart','keydown'])window.addEventListener(type,()=>interacted=true,{passive:true,once:true});
document.fonts.ready.then(()=>{
 equalizeCards();
 const id=location.hash.slice(1);
 if(!interacted&&id)goToSection(id,false);
 const stage=document.querySelector('[data-places]');
 if(stage&&'ResizeObserver'in window){
  let width=stage.clientWidth,frame;
  new ResizeObserver(entries=>{
   const nextWidth=entries[0].contentRect.width;
   if(Math.abs(nextWidth-width)<1)return;
   width=nextWidth;cancelAnimationFrame(frame);frame=requestAnimationFrame(equalizeCards);
  }).observe(stage);
 }
});
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#"]');
 if(a&&document.getElementById(a.hash.slice(1))){
  e.preventDefault();history.replaceState(null,'',a.hash);goToSection(a.hash.slice(1));
 }
});
function setupEntrances(){
 const sections=[...document.querySelectorAll('[data-scroll-reveal]')];
 const cards=[...document.querySelectorAll('.place-card,.beach-card')];
 const targets=[...sections,...cards];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let observer;
 function show(target){
  target.classList.add(target.matches('.place-card,.beach-card')?'shown':'reveal-visible');
  observer?.unobserve(target);
 }
 function showAll(){
  observer?.disconnect();
  document.documentElement.classList.remove('reveal-enabled');targets.forEach(show);
 }
 if(!('IntersectionObserver'in window)||motion.matches){showAll();window.appearReady=true;return;}
 document.documentElement.classList.add('reveal-enabled');
 cards.forEach(card=>card.dataset.appear='');
 observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting)show(entry.target);
 }),{threshold:0.025,rootMargin:'-64px 0px -6% 0px'});
 targets.forEach(target=>observer.observe(target));
 document.addEventListener('focusin',event=>{
  const target=event.target.closest('[data-scroll-reveal],.place-card,.beach-card');if(target)show(target);
 });
 motion.addEventListener('change',event=>{if(event.matches)showAll();});
 window.appearReady=true;
}
setupEntrances();

for(const [key,selector] of [['checkinVideo','#checkin .checkin-video'],['balconyVideo','#video-container']]){
 const source=MEDIA[key],holder=document.querySelector(selector);
 if(!source||!holder)continue;
 const url=new URL(source,location.href);
 if(url.origin!==location.origin)continue;
 const video=document.createElement('video');
 video.controls=true;video.playsInline=true;video.preload='metadata';video.src=url.href;
 video.setAttribute('aria-label',key==='checkinVideo'?'Como fazer o check-in':'Como abrir a sacada');
 if(key==='balconyVideo')video.poster='assets/sacada.jpg';
 holder.replaceWith(video);
}
if(menu){
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!nav.hidden){closeMenu();menu.focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('.topbar'))closeMenu();});
}
