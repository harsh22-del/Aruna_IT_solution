/* Core interactions: navbar, mobile menu, scroll progress, cursor, reveal, counters, tilt */
(function(){
  // Loader
  window.addEventListener('load',()=>{
    const l=document.querySelector('.loader');
    if(l){setTimeout(()=>l.classList.add('hide'),500);setTimeout(()=>l.remove(),1300)}
  });

  // Active nav link
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a=>{
    if((a.getAttribute('href')||'')===path) a.classList.add('active');
  });

  // Mobile menu
  const burger=document.querySelector('.burger');
  const nav=document.querySelector('.nav');
  const mm=document.querySelector('.mobile-menu');
  if(burger){
    burger.addEventListener('click',()=>{
      nav.classList.toggle('open');
      mm.classList.toggle('open');
    });
    mm?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');mm.classList.remove('open');
    }));
  }

  // Scroll progress
  const prog=document.querySelector('.progress');
  const onScroll=()=>{
    const h=document.documentElement;
    const p=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
    if(prog) prog.style.width=p+'%';
    if(nav){
      if(window.scrollY>40) nav.style.background='rgba(9,4,40,.78)';
      else nav.style.background='rgba(9,4,40,.55)';
    }
  };
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Cursor glow
  const cur=document.querySelector('.cursor-glow');
  if(cur && matchMedia('(pointer:fine)').matches){
    window.addEventListener('mousemove',e=>{
      cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
    });
  }else if(cur){cur.style.display='none'}

  // Card hover light
  document.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('mousemove',e=>{
      const r=c.getBoundingClientRect();
      c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  // Reveal on scroll
  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.12});
  document.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach(el=>io.observe(el));

  // Counters
  const cio=new IntersectionObserver((es)=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target;const target=+el.dataset.count;const dur=1600;const start=performance.now();
      const step=(t)=>{
        const p=Math.min((t-start)/dur,1);const ease=1-Math.pow(1-p,3);
        el.textContent=Math.floor(target*ease).toLocaleString();
        if(p<1) requestAnimationFrame(step);else el.textContent=target.toLocaleString();
      };requestAnimationFrame(step);cio.unobserve(el);
    });
  },{threshold:.4});
  document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

  // Magnetic buttons
  document.querySelectorAll('.btn-primary, .btn-gold').forEach(b=>{
    b.addEventListener('mousemove',e=>{
      const r=b.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)/r.width;
      const y=(e.clientY-r.top-r.height/2)/r.height;
      b.style.transform=`translate(${x*8}px,${y*8}px)`;
    });
    b.addEventListener('mouseleave',()=>b.style.transform='');
  });

  // Hero text reveal
  document.querySelectorAll('.hero h1 .word i').forEach((el,i)=>{
    el.style.transition='transform .9s cubic-bezier(.2,.7,.2,1), opacity .9s';
    el.style.transitionDelay=(i*70)+'ms';
    requestAnimationFrame(()=>{el.style.transform='none';el.style.opacity='1'});
  });

  // Particles
  document.querySelectorAll('.particles').forEach(p=>{
    for(let i=0;i<24;i++){
      const s=document.createElement('i');
      s.style.left=Math.random()*100+'%';
      s.style.bottom='-10px';
      s.style.animationDuration=(8+Math.random()*10)+'s';
      s.style.animationDelay=(Math.random()*8)+'s';
      s.style.background=Math.random()>.5?'#FFCC00':'#B13BFF';
      p.appendChild(s);
    }
  });

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');if(id.length<2)return;
      const t=document.querySelector(id);if(!t)return;
      e.preventDefault();
      window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-90,behavior:'smooth'});
    });
  });

  // Form submit (no backend)
  document.querySelectorAll('form[data-demo]').forEach(f=>{
    f.addEventListener('submit',e=>{
      e.preventDefault();
      const btn=f.querySelector('button[type=submit]');
      const t=btn.textContent;btn.textContent='Sent ✓';btn.disabled=true;
      f.reset();setTimeout(()=>{btn.textContent=t;btn.disabled=false},2500);
    });
  });
})();
