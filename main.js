'use strict';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const nav=document.querySelector('nav'),toggle=document.querySelector('.menu-toggle');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.querySelector('span').textContent='＋';}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('span').textContent=open?'−':'＋';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
nav.addEventListener('keydown',e=>{if(e.key==='Tab'&&e.target===nav.lastElementChild&&!e.shiftKey&&nav.classList.contains('open')){e.preventDefault();toggle.focus();}});
document.querySelectorAll('.whatsapp').forEach(a=>{a.href='https://wa.me/351938529424?text='+encodeURIComponent('Olá! Gostaria de pedir um orçamento para uma remodelação.');a.target='_blank';a.rel='noopener noreferrer';});
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){document.documentElement.classList.add('js');const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));}
const film=document.querySelector('#film'),play=document.querySelector('#play');let userPaused=false;
function syncPlay(){play.textContent=film.paused?'▷':'Ⅱ';play.setAttribute('aria-label',film.paused?'Reproduzir vídeo':'Pausar vídeo');}
play.addEventListener('click',()=>{userPaused=!film.paused;if(film.paused){film.play().catch(()=>{});}else{film.pause();}});
film.addEventListener('play',syncPlay);film.addEventListener('pause',syncPlay);
if(reduced.matches){film.autoplay=false;film.pause();syncPlay();}
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!userPaused&&!reduced.matches){film.play().catch(syncPlay);}else{film.pause();}});},{threshold:.15}).observe(film);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause();else if(!userPaused&&!reduced.matches&&film.getBoundingClientRect().bottom>0)film.play().catch(()=>{});});
const modal=document.querySelector('#lightbox');document.querySelectorAll('.enlarge').forEach(b=>b.addEventListener('click',()=>{modal.querySelector('img').src=b.dataset.image;modal.querySelector('img').alt=b.querySelector('img').alt;modal.querySelector('p').textContent=b.dataset.caption;modal.showModal();}));modal.querySelector('button').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
// Revelação editorial e movimento de scroll: sem dependências externas.
const headline=document.querySelector('h1');
headline.innerHTML='<span class="title-line"><span style="--line-index:0">Transformamos</span></span><span class="title-line"><span style="--line-index:1">espaços. <em>Criamos</em></span></span><span class="title-line"><span style="--line-index:2"><em>novas possibilidades.</em></span></span>';
requestAnimationFrame(()=>requestAnimationFrame(()=>headline.classList.add('title-visible')));
if('IntersectionObserver' in window){const lines=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');lines.unobserve(e.target);}}),{threshold:.15});document.querySelectorAll('.chapter-line').forEach(e=>lines.observe(e));}
const progress=document.querySelector('.reading-progress'),contact=document.querySelector('.contact');
let ticking=false;
function updateScroll(){const distance=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(distance>0?scrollY/distance:0)+')';if(!reduced.matches&&innerWidth>760){const bounds=contact.getBoundingClientRect();if(bounds.top<innerHeight&&bounds.bottom>0)contact.style.setProperty('--scroll-offset',Math.round((innerHeight-bounds.top)*.035)+'px');}ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});window.addEventListener('resize',updateScroll);updateScroll();
reduced.addEventListener('change',()=>{if(reduced.matches){film.pause();contact.style.removeProperty('--scroll-offset');}});
