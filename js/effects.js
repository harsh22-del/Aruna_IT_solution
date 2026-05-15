// Visual effects: parallax orbs in hero
(function(){
  const orbs=document.querySelectorAll('.hero .orb, .hero .float-card');
  if(!orbs.length) return;
  window.addEventListener('mousemove',e=>{
    const x=(e.clientX/window.innerWidth-.5);
    const y=(e.clientY/window.innerHeight-.5);
    orbs.forEach((el,i)=>{
      const f=(i+1)*8;
      el.style.translate=`${x*f}px ${y*f}px`;
    });
  });
})();
