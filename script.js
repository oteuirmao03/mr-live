const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menu.focus();}});
const bars=document.querySelector('.signal-bars');
for(let n=0;n<100;n++){const bar=document.createElement('i');bar.style.setProperty('--h',`${12+Math.abs(Math.sin(n*.47)*Math.cos(n*.14))*53}px`);bars.appendChild(bar);}
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#brief-form').addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.currentTarget;
  const name=form.elements.name.value.trim();
  const message=form.elements.message.value.trim();
  if(!name||!message){document.querySelector('#form-status').textContent='Preencha o nome e uma breve descrição da ideia.';return;}
  const summary=`MR LIVE — RESUMO DO PROJECTO\n\nNome: ${name}\nServiço: ${form.elements.service.value}\n\nA ideia\n${message}\n\nPreparado em ${new Date().toLocaleDateString('pt-PT')}\n`;
  const url=URL.createObjectURL(new Blob(['\uFEFF',summary],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='mr-live-meu-projecto.txt';document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  document.querySelector('#form-status').textContent='Resumo preparado para descarregar. Guarde-o para a sua conversa com a MR Live.';
});

// Motion remains optional, including when the operating system requests less motion.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.createElement('button');
motionButton.className = 'motion-toggle';
motionButton.type = 'button';
let motionPaused = motionPreference.matches;
function updateMotion() {
  document.documentElement.classList.toggle('motion-paused', motionPaused);
  motionButton.textContent = motionPaused ? '▷ Ativar animações' : 'Ⅱ Pausar animações';
  motionButton.setAttribute('aria-pressed', String(motionPaused));
}
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
motionPreference.addEventListener('change', event => { motionPaused = event.matches; updateMotion(); });
document.body.appendChild(motionButton);
updateMotion();
bars.querySelectorAll('i').forEach((bar, index) => {
  bar.style.setProperty('--delay', `${-(index % 17) * .13}s`);
  bar.style.setProperty('--duration', `${1.1 + (index % 7) * .19}s`);
});
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.intro-body, .section-heading, .service, .statement, .process-layout h2, .steps article, .project-layout').forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 75}ms`);
    revealObserver.observe(element);
  });
  const waveObserver = new IntersectionObserver(entries => {
    bars.classList.toggle('offscreen', !entries[0].isIntersecting);
  });
  waveObserver.observe(bars);
}
