const entrance=document.querySelector('#entrance');
const openButton=document.querySelector('#openInvitation');
const music=document.querySelector('#weddingMusic');
const musicToggle=document.querySelector('#musicToggle');

openButton.addEventListener('click',async()=>{
  entrance.classList.add('opened');
  document.body.classList.remove('locked');
  musicToggle.classList.add('show');
  try{await music.play()}catch(error){musicToggle.classList.add('paused');musicToggle.textContent='♪'}
  setTimeout(()=>entrance.remove(),1000);
});

musicToggle.addEventListener('click',async()=>{
  if(music.paused){
    try{await music.play();musicToggle.classList.remove('paused');musicToggle.textContent='♫';musicToggle.setAttribute('aria-label','Pausar música')}
    catch(error){musicToggle.classList.add('paused')}
  }else{
    music.pause();musicToggle.classList.add('paused');musicToggle.textContent='♪';musicToggle.setAttribute('aria-label','Reproduzir música');
  }
});

const weddingDate=new Date('2026-10-24T15:00:00-03:00').getTime();
const fields={days:document.querySelector('#days'),hours:document.querySelector('#hours'),minutes:document.querySelector('#minutes'),seconds:document.querySelector('#seconds')};
function updateCountdown(){
  const distance=Math.max(0,weddingDate-Date.now());
  fields.days.textContent=String(Math.floor(distance/86400000)).padStart(3,'0');
  fields.hours.textContent=String(Math.floor(distance%86400000/3600000)).padStart(2,'0');
  fields.minutes.textContent=String(Math.floor(distance%3600000/60000)).padStart(2,'0');
  fields.seconds.textContent=String(Math.floor(distance%60000/1000)).padStart(2,'0');
}
updateCountdown();setInterval(updateCountdown,1000);

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
