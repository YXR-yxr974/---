(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const selector = '.project-card,.section-heading,.category-heading,.about-heading,.detail-section,.project-intro,.video-genre';
  const observer = 'IntersectionObserver' in window && !reduced.matches ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);} });
  }, {threshold:.04,rootMargin:'0px 0px -20px 0px'}) : null;
  function observe(scope=document){
    if(!observer)return;
    scope.querySelectorAll(selector).forEach((element,index)=>{
      if(element.classList.contains('will-reveal'))return;
      element.classList.add('will-reveal');
      element.style.setProperty('--reveal-delay',`${Math.min(index%3,2)*45}ms`);
      const bounds=element.getBoundingClientRect();
      if(bounds.top<innerHeight && bounds.bottom>0)element.classList.add('in-view');
      else observer.observe(element);
    });
  }
  window.PortfolioMotion={observe,reduced};
  if(!reduced.matches){root.classList.add('motion-ready');requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.add('page-loaded')));}
  observe();
  const header=document.querySelector('.site-header');
  const progress=document.querySelector('.reading-progress');
  const navLinks=[...document.querySelectorAll('.site-header nav a')];
  const sections=['works','about','contact'].map(id=>document.getElementById(id)).filter(Boolean);
  let scheduled=false;
  function update(){
    scheduled=false;
    const y=window.scrollY;
    header?.classList.toggle('scrolled',y>24);
    if(progress)progress.style.transform=`scaleX(${Math.min(1,y/Math.max(1,document.documentElement.scrollHeight-innerHeight))})`;
    let active='';
    sections.forEach(section=>{if(section.getBoundingClientRect().top<innerHeight*.4)active=section.id;});
    navLinks.forEach(link=>link.classList.toggle('is-current',link.getAttribute('href')==='#'+active));
  }
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});
  addEventListener('resize',update,{passive:true});
  update();
})();
