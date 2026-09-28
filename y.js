// Next service countdown
(function(){
  var el=document.getElementById('next'); if(!el) return;
  function tick(){
    var n=new Date(), t=new Date(n); t.setHours(9,30,0,0);
    t.setDate(n.getDate()+((7-n.getDay())%7));
    if(n.getDay()===0 && n>=t){
      var end=new Date(n); end.setHours(14,0,0,0);
      if(n<end){ el.textContent='Services are on today until 2:00 PM. Join us!'; return; }
      t.setDate(t.getDate()+7);
    }
    var d=t-n, days=Math.floor(d/864e5), hrs=Math.floor(d%864e5/36e5), mins=Math.floor(d%36e5/6e4);
    el.textContent='Next service: Sunday 9:30 AM · in '+days+'d '+hrs+'h '+mins+'m';
  }
  tick(); setInterval(tick,60000);
})();
// Highlight current section in nav
(function(){
  var links={}; document.querySelectorAll('nav a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a;});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){
      Object.keys(links).forEach(function(k){links[k].classList.toggle('active',k===e.target.id);});
    }});
  },{rootMargin:'-35% 0px -60% 0px'});
  Object.keys(links).forEach(function(k){var s=document.getElementById(k); if(s) io.observe(s);});
})();
// Gallery lightbox
(function(){
  var lb=document.getElementById('lb'), big=lb.querySelector('img');
  document.querySelectorAll('.gal-grid img').forEach(function(im){
    im.addEventListener('click',function(){ big.src=im.src; big.alt=im.alt; lb.classList.add('open'); });
  });
  lb.addEventListener('click',function(){ lb.classList.remove('open'); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') lb.classList.remove('open'); });
})();
// Copy M-Pesa number
(function(){
  var b=document.getElementById('copy'); if(!b) return;
  b.addEventListener('click',function(){
    var done=function(m){ b.textContent=m; setTimeout(function(){b.textContent='Copy number';},2000); };
    try{ navigator.clipboard.writeText('0714287437').then(function(){done('Copied!');},function(){done('Copy failed');}); }
    catch(e){ done('Copy failed'); }
  });
})();