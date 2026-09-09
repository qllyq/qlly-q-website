const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('done'),700));

const gear=[
 ['01','SP-004','SUMMER MIKU','summer-miku.webp','https://wallhack.com/products/sp-004-summer-miku?variant=55211267948913'],
 ['02','SP-004','TWIN PAD','twin-pad.webp','https://wallhack.com/en-jp/pages/museum'],
 ['03','CR-005','WALLHACK CR-005','cr-005.webp','https://wallhack.com/ja-jp/products/cr-005-black'],
 ['04','ULX','FINALMOUSE FROSTLORD','frostlord.webp','https://finalmouse.com/products/ulx-frostlord'],
 ['05','PRO SLEEVE','WALLHACK PRO SLEEVE','pro-sleeve.webp','https://wallhack.com/ja-jp/products/pro-sleeve-miku-os'],
 ['06','SKATES DOTS','WALLHACK SKATES DOTS','skates-dots.webp','https://wallhack.com/en-jp/products/wallhack-skates-ptfe-black-dots'],
 ['07','60HE V2','WOOTING 60HE V2','wooting-60he-v2.webp','https://wooting.io/ja/wooting-60he-v2']
];
const track=document.getElementById('gearTrack');
gear.forEach((g,i)=>{const el=document.createElement('article');el.className='gear-card';el.style.setProperty('--r',i%2?'1deg':'-1deg');el.innerHTML=`<a class="gear-link" href="${g[4]}" target="_blank" rel="noopener noreferrer"><img src="${g[3]}" alt="${g[2]}"><div class="meta"><div><strong>${g[2]}</strong><br><span>${g[1]}</span></div><span>[${g[0]}]</span></div><div class="access">ACCESS ↗</div></a>`;track.appendChild(el)});
const cards=[...document.querySelectorAll('.gear-card')], current=document.getElementById('gearCurrent'), progress=document.getElementById('gearProgress');
function activeCard(){const center=track.scrollLeft+track.clientWidth/2;let best=0,dist=Infinity;cards.forEach((c,i)=>{const d=Math.abs(c.offsetLeft+c.offsetWidth/2-center);if(d<dist){dist=d;best=i}});cards.forEach((c,i)=>c.classList.toggle('active',i===best));current.textContent=String(best+1).padStart(2,'0');progress.style.width=`${((best+1)/gear.length)*100}%`}
function move(n){cards[Math.max(0,Math.min(cards.length-1,n))].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'})}
document.querySelector('.gear-arrow.prev').onclick=()=>move(cards.findIndex(c=>c.classList.contains('active'))-1);
document.querySelector('.gear-arrow.next').onclick=()=>move(cards.findIndex(c=>c.classList.contains('active'))+1);
track.addEventListener('scroll',()=>requestAnimationFrame(activeCard));
activeCard();
let down=false,startX=0,startScroll=0;track.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;startScroll=track.scrollLeft;track.classList.add('dragging');track.setPointerCapture(e.pointerId)});track.addEventListener('pointermove',e=>{if(!down)return;track.scrollLeft=startScroll-(e.clientX-startX)*1.15});track.addEventListener('pointerup',()=>{down=false;track.classList.remove('dragging')});track.addEventListener('pointercancel',()=>{down=false;track.classList.remove('dragging')});

const video=document.querySelector('.hero-video video');
if(video){ video.addEventListener('canplay',()=>{video.classList.add('ready')});}

const sections=[...document.querySelectorAll('section[id]')];
const links=[...document.querySelectorAll('.nav nav a')];
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -50% 0px'});sections.forEach(s=>io.observe(s));
