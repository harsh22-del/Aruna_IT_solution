// Lightweight smooth scroll easing on wheel for non-mobile (keeps site dependency-free).
(function(){
  if(matchMedia('(pointer:coarse)').matches) return;
  let target=window.scrollY,current=window.scrollY,raf;
  const ease=0.12;
  function loop(){
    current+=(target-current)*ease;
    if(Math.abs(target-current)<0.5){current=target;cancelAnimationFrame(raf);raf=null;return}
    window.scrollTo(0,current);
    raf=requestAnimationFrame(loop);
  }
  window.addEventListener('wheel',e=>{
    if(e.ctrlKey)return;
    e.preventDefault();
    target=Math.max(0,Math.min(document.documentElement.scrollHeight-window.innerHeight,target+e.deltaY));
    if(!raf) raf=requestAnimationFrame(loop);
  },{passive:false});
  window.addEventListener('scroll',()=>{if(!raf){target=window.scrollY;current=window.scrollY}});
})();
