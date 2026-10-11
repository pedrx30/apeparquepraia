// Preencher com arquivos locais quando os vídeos forem fornecidos.
const MEDIA = { checkinVideo: '', balconyVideo: '' };
const arrow='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const menu=document.querySelector('#menu'),nav=document.querySelector('#navigation');
if(menu){menu.addEventListener('click',()=>{nav.hidden=!nav.hidden;menu.setAttribute('aria-expanded',String(!nav.hidden));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.hidden=true;menu.setAttribute('aria-expanded','false');}));}
function photoFor(card,i,kind){const files=['sacada.jpg','beto carrero.jpg','fort atacadista.jfifs.webp','mcdonalds.jpg','Praia Alegre.png'];const importantFiles=['farmafaita-24h.jpg','farmacia-preco-popular.webp','pa-24h.jpg'];return 'assets/'+encodeURIComponent((kind==='locations'?files:importantFiles)[i]);}
for(const stage of document.querySelectorAll('[data-rail]')){
 const kind=stage.dataset.rail,items=kind==='locations'?LOCATIONS:IMPORTANT;
 stage.innerHTML=items.map((c,i)=>{const image=photoFor(c,i,kind);return `<article class="place-card" data-card="${kind}-${i}" aria-label="${esc(c.name)}"><div class="card-photo">${image?`<img src="${image}" alt="${esc(c.name)}">`:`<span class="photo-pending">${kind==='locations'?`Foto de ${esc(c.name.replace(' 500m',''))} a inserir`:esc(c.name)}</span>`}</div><div class="place-body"><div class="place-details"><h3>${esc(c.name)}</h3>${c.info?`<p class="info">${esc(c.info)}</p>`:''}${c.unit?`<p class="unit">${esc(c.unit)}</p>`:''}${c.address?`<address>${esc(c.address)}</address>`:''}</div><div class="card-actions">${c.address?`<button data-copy="${esc(c.copyAddress ?? c.address)}">Copiar endereço</button><a href="${c.url}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${arrow}</a>`:`<a href="praias.html">Conhecer as praias ${arrow}</a>`}</div></div></article>`;}).join('');
}
for(const group of document.querySelectorAll('[data-beaches]')){
 group.innerHTML=BEACHES.filter(b=>b.group===Number(group.dataset.beaches)).map(b=>`<article class="beach-card"><div class="card-photo"><img src="assets/${encodeURIComponent(b.image)}" alt="${esc(b.name)}" loading="lazy"></div><div class="beach-body"><h3>${esc(b.name)}</h3><p>${esc(b.description)}</p><a href="${b.url}" target="_blank" rel="noopener noreferrer">Abrir no Google Maps ${arrow}</a></div></article>`).join('');
}
const statusEl=document.querySelector('#copy-status');let toastTimer;
document.addEventListener('click',async event=>{const button=event.target.closest('[data-copy]');if(!button)return;try{await navigator.clipboard.writeText(button.dataset.copy);statusEl.textContent='Copiado!';}catch{statusEl.textContent='Não foi possível copiar. Selecione o texto e copie manualmente.';}statusEl.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>statusEl.hidden=true,3000);});
let ctx;const railTriggers=new Map();
const rails=[...document.querySelectorAll('.rail')];
let journey=null,journeyContent=null,journeyPin=null;
if(rails.length){
 journey=document.createElement('div');journey.className='rail-journey';
 journeyContent=document.createElement('div');journeyContent.className='rail-journey-content';
 rails[0].before(journey);journey.append(journeyContent);
 let current=journey.nextElementSibling;
 while(current){const next=current.nextElementSibling;journeyContent.append(current);current=next;}
}
function equalizeCards(){
 const all=[...document.querySelectorAll('.place-card')];
 if(!all.length)return;
 all.forEach(card=>card.style.minHeight='0px');
 const importantDetails=[...document.querySelectorAll('[data-rail="important"] .place-details')];
 importantDetails.forEach(detail=>detail.style.minHeight='0px');
 const detailsHeight=Math.ceil(Math.max(0,...importantDetails.map(detail=>detail.offsetHeight)));
 importantDetails.forEach(detail=>detail.style.minHeight=detailsHeight+'px');
 const reference=all.filter(card=>['locations-0','locations-1'].includes(card.dataset.card));
 const referenceHeight=Math.max(...reference.map(card=>card.offsetHeight));
 const requiredHeight=Math.max(...all.map(card=>card.offsetHeight));
 const height=Math.ceil(Math.max(referenceHeight,requiredHeight));
 all.forEach(card=>card.style.minHeight=height+'px');
}
function setupRails(){
 if(ctx)ctx.revert();
 railTriggers.clear();journeyPin=null;
 if(!journey)return;
 journey.classList.remove('pinned-layout');
 journey.style.removeProperty('--journey-height');
 journeyContent.style.removeProperty('transform');
 rails.forEach(rail=>{
  const stage=rail.querySelector('.card-stage');
  stage.classList.remove('rail-pin-enabled');stage.style.removeProperty('height');
 });
 if(!window.gsap||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion: reduce)').matches){equalizeCards();return;}
 gsap.registerPlugin(ScrollTrigger);
 ScrollTrigger.config({ignoreMobileResize:true});
 rails.forEach(rail=>rail.querySelector('.card-stage').classList.add('rail-pin-enabled'));
 journey.classList.add('pinned-layout');
 let firstHeight=0,firstTravel=0,secondTravel=0;
 function measureScene(){
  equalizeCards();
  rails.forEach(rail=>{
   const stage=rail.querySelector('.card-stage');
   stage.style.height=Math.ceil(Math.max(...[...stage.querySelectorAll('.place-card')].map(card=>card.offsetHeight)))+'px';
  });
  firstHeight=rails[0].offsetHeight;
  const travel=rail=>Math.max(360,rail.querySelector('.card-stage').clientWidth*1.25)*(rail.querySelectorAll('.place-card').length-1);
  firstTravel=travel(rails[0]);secondTravel=travel(rails[1]);
  // A passagem vertical já ocupa firstHeight no percurso; não reservá-la duas vezes.
  journey.style.setProperty('--journey-height',Math.max(1,journeyContent.offsetHeight-firstHeight)+'px');
 }
 measureScene();
 ctx=gsap.context(()=>{
  const pin=ScrollTrigger.create({
   id:'journey-pin',trigger:journey,pin:journey,pinType:'fixed',pinSpacing:true,
   start:()=>`top ${document.querySelector('.topbar').offsetHeight}px`,
   end:()=>'+='+(firstTravel+firstHeight+secondTravel),
   invalidateOnRefresh:true,anticipatePin:0,onRefreshInit:measureScene
  });
  journeyPin=pin;
  rails.forEach((rail,index)=>{
   const stage=rail.querySelector('.card-stage'),cards=[...stage.querySelectorAll('.place-card')];
   gsap.set(cards,{zIndex:i=>i+1,x:i=>i===0?0:stage.clientWidth+20});
   let lastActive=-1;
   function setActiveCard(progress){
    const active=Math.min(cards.length-1,Math.floor(progress*(cards.length-1)+.85));
    if(active===lastActive)return;
    cards.forEach((card,i)=>card.inert=i!==active);lastActive=active;
   }
   setActiveCard(0);
   const timeline=gsap.timeline({
    onUpdate(){setActiveCard(this.progress());},
    scrollTrigger:{
     id:rail.id,trigger:journey,
     start:()=>pin.start+(index===0?0:firstTravel+firstHeight),
     end:()=>pin.start+(index===0?firstTravel:firstTravel+firstHeight+secondTravel),
     scrub:0.45,invalidateOnRefresh:true
    }
   });
   cards.slice(1).forEach((card,j)=>timeline.fromTo(card,{x:()=>stage.clientWidth+20},{x:()=>((j+1)*8),duration:1,ease:'none'},j));
   railTriggers.set(rail.id,timeline.scrollTrigger);
  });
  // Um pixel de scroll corresponde a um pixel vertical somente entre os trilhos.
  gsap.fromTo(journeyContent,{y:0},{y:()=>-firstHeight,ease:'none',scrollTrigger:{
   id:'journey-transition',trigger:journey,
   start:()=>pin.start+firstTravel,
   end:()=>pin.start+firstTravel+firstHeight,
   scrub:true,invalidateOnRefresh:true
  }});
 },journey);
 ScrollTrigger.refresh();
}
function goToSection(id){
 const target=document.getElementById(id);
 if(!target)return;
 const trigger=railTriggers.get(id);
 if(trigger){window.scrollTo({top:trigger.start,behavior:'instant'});ScrollTrigger.update();}
 else if(journeyPin&&journeyContent.contains(target)){
  const y=journeyPin.end+target.offsetTop-rails[0].offsetHeight;
  window.scrollTo({top:y,behavior:'instant'});ScrollTrigger.update();
 }else target.scrollIntoView({behavior:'instant'});
}
let interacted=false;
for(const type of ['wheel','touchstart','keydown'])window.addEventListener(type,()=>interacted=true,{passive:true,once:true});
document.fonts.ready.then(()=>{
 setupRails();
 const id=location.hash.slice(1);
 if(!interacted&&id)goToSection(id);
});
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#"]');
 if(a&&document.getElementById(a.hash.slice(1))){
  e.preventDefault();history.replaceState(null,'',a.hash);goToSection(a.hash.slice(1));
 }
});
window.addEventListener('pagehide',()=>ctx?.revert());
window.addEventListener('pageshow',event=>{if(event.persisted)setupRails();});
function setupEntrances(){
 const sections=[...document.querySelectorAll('[data-scroll-reveal]')];
 const beachCards=[...document.querySelectorAll('.beach-card')];
 const targets=[...sections,...beachCards];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let observer;
 function show(target){
  target.classList.add(target.classList.contains('beach-card')?'shown':'reveal-visible');
  observer?.unobserve(target);
 }
 function showAll(){
  observer?.disconnect();
  document.documentElement.classList.remove('reveal-enabled');targets.forEach(show);
 }
 if(!('IntersectionObserver'in window)||motion.matches){showAll();window.appearReady=true;return;}
 document.documentElement.classList.add('reveal-enabled');
 beachCards.forEach(card=>card.dataset.appear='');
 observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting)show(entry.target);
 }),{threshold:0.025,rootMargin:'-64px 0px -6% 0px'});
 targets.forEach(target=>observer.observe(target));
 document.addEventListener('focusin',event=>{
  const target=event.target.closest('[data-scroll-reveal],.beach-card');if(target)show(target);
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
 const closeMenu=()=>{nav.hidden=true;menu.setAttribute('aria-expanded','false');};
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!nav.hidden){closeMenu();menu.focus();}});
 document.addEventListener('click',event=>{if(!event.target.closest('.topbar'))closeMenu();});
}
