const menu=document.querySelector('.menu');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const motionButton=document.querySelector('.motion-toggle');
let paused=reducedMotion.matches;
function syncMotion(){document.documentElement.classList.toggle('motion-paused',paused);motionButton.textContent=paused?'▷ Ativar animações':'Ⅱ Pausar animações';motionButton.setAttribute('aria-pressed',String(paused));}
motionButton.addEventListener('click',()=>{paused=!paused;syncMotion();});
reducedMotion.addEventListener('change',e=>{paused=e.matches;syncMotion();});syncMotion();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.06});document.querySelectorAll('.intro-grid,.portfolio-heading,.work-card,.manifesto,.contact-grid').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}
const filters=[...document.querySelectorAll('[data-filter]')];
const cards=[...document.querySelectorAll('[data-category]')];
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});let count=0;cards.forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden){count++;card.classList.add('is-visible');}});document.querySelector('#filter-status').textContent=count===3?'3 áreas criativas':`${button.textContent.trim()} — 1 área criativa`;}));
const details={live:{label:'01 / LIVE',title:'A energia do agora.',copy:'Transmito o seu momento para quem está do outro lado. Imagem, som e atenção ao que acontece, para aproximar quem não pode estar presente.'},foto:{label:'02 / FOTOGRAFIA',title:'O que o olhar guarda.',copy:'Na fotografia, procuro o gesto, a luz e a emoção. Um olhar atento para guardar pessoas e momentos em imagens que continuam a contar a sua história.'},video:{label:'03 / VÍDEO',title:'Cada plano conta.',copy:'O movimento, o ritmo e o som dão outra dimensão à memória. Crio vídeos com uma linguagem cinematográfica, guiados pela história que queremos contar.'}};
const dialog=document.querySelector('#work-dialog');let opener;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const data=details[button.dataset.project];opener=button;document.querySelector('#dialog-category').textContent=data.label;document.querySelector('#dialog-title').textContent=data.title;document.querySelector('#dialog-copy').textContent=data.copy;dialog.showModal();document.body.classList.add('dialog-open');}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');opener?.focus();});
