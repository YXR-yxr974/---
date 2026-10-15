const videoProjects = [
  {
    id:'film-01',title:'糖果机械城',kind:'超现实视觉实验',duration:'00:24',
    description:'粉彩建筑、透明滑道与金属装置构成一座微缩乐园。通过材质反差与连续运动，让机械的秩序拥有轻盈、甜美的节奏。'
  },
  {
    id:'film-02',title:'蓉城重启',kind:'城市文化概念短片',duration:'02:09',detail:'project.html?id=campaign',
    description:'从陶器火光、金属丝线与竹林，走向数据流动的未来城市。以蜀锦般的光彩串联文明记忆与科技想象，探索成都文化在未来语境中的新生。'
  },
  {
    id:'film-03',title:'向着日落出发',kind:'汽车生活方式影像',duration:'00:30',
    description:'由城市办公场景切入，跟随一位女性的驾驶旅程驶向海岸日落。以柔和光线、紫色车身与情绪化镜头，呈现从忙碌日常到自在时刻的转换。'
  },
  {
    id:'film-04',title:'紫境驰行',kind:'汽车产品视觉探索',duration:'00:36',
    description:'以紫色车身为视觉线索，串联展厅、座舱、轮毂与雪山公路。通过近景细节和行驶镜头的交替，探索汽车产品影像中的材质、速度与空间感。'
  },
  {
    id:'lacquer',title:'漆艺 · 光影重构',kind:'成都非遗动态海报',duration:'00:05',poster:true,loop:true,
    description:'漆盘纹样在粒子与光环之间显现，让传统器物的层次与细节以未来感影像重新展开。'
  },
  {
    id:'pottery',title:'邛窑 · 器物新生',kind:'成都非遗动态海报',duration:'00:06',poster:true,loop:true,
    description:'以邛窑器物为中心，在粒子聚散、光束与环绕运动中呈现陶瓷的造型和釉色，探索古老工艺的数字表达。'
  },
  {
    id:'silver',title:'银花丝 · 一缕成花',kind:'成都非遗动态海报',duration:'00:06',poster:true,loop:true,
    description:'细密银丝随光影凝聚为花形，将手工编织的精巧转化为流动的数字视觉，延展非遗纹样的细腻质感。'
  }
];

const videoGrid = document.getElementById('video-grid');
const excerpts={
  'film-01':'粉彩建筑、透明滑道与机械运动的超现实实验。',
  'film-02':'以成都非遗为线索，探索城市记忆与未来想象之间的连接。',
  'film-03':'从城市日常驶向海岸日落，记录自在出行的情绪。',
  'film-04':'以材质、细节与行驶镜头，探索汽车的视觉表达。',
  lacquer:'漆盘纹样在粒子与光环之间重新展开。',
  pottery:'以光影呈现邛窑器物的造型与釉色。',
  silver:'将细密银丝的手工纹样转化为流动的数字视觉。'
};
const displayOrder=[1,0,2,3,4,5,6];
videoGrid.innerHTML=displayOrder.map((index,position)=>{
  const film=videoProjects[index];
  const size=window.PORTFOLIO_COVER_SIZES?.[film.id]||[720,1280];
  const heading=position===0?'<div class="video-genre"><p>概念叙事</p><span>城市文化与生成影像</span></div>':position===1?'<div class="video-genre"><p>影像实验</p><span>材质、情绪与产品表达</span></div>':position===4?'<div class="video-genre"><p>非遗动态海报</p><span>漆艺 · 邛窑 · 银花丝</span></div>':'';
  return heading+`<article id="video-${film.id}" class="video-item${film.poster?' is-motion-poster':''}${index===1?' is-featured':''}"><button class="project-card video-card" data-video="${index}" aria-label="播放视频：${film.title}"><div class="project-image video-poster"><img src="assets/videos/${film.id}-cover.webp" alt="${film.title}完整画面封面" width="${size[0]}" height="${size[1]}" loading="lazy"></div><div class="card-caption"><div><span class="card-type">${film.kind}</span><h4>${film.title}</h4><p>${excerpts[film.id]}</p></div><div class="card-meta"><span class="card-year">${film.duration}${film.loop?' · 循环':''}</span><span class="card-arrow" aria-hidden="true">播放 ↗</span></div></div></button>${film.detail?`<a class="video-case-link" href="${film.detail}"><span>广告策划 · 一丝成城<small>查看文化调研、短片方案与个人设计</small></span><span aria-hidden="true">↗</span></a>`:''}</article>`;
}).join('');

const videoDialog=document.querySelector('.video-viewer');
const filmPlayer=document.getElementById('portfolio-video');
const videoError=document.querySelector('.video-error');
let activeFilm=0;
let videoOrigin=null;
let playbackGeneration=0;
function loadFilm(index){
  activeFilm=index;
  playbackGeneration++;
  const generation=playbackGeneration;
  const film=videoProjects[index];
  filmPlayer.pause();
  filmPlayer.poster=`assets/videos/${film.id}-cover.webp`;
  filmPlayer.src=`assets/videos/${film.id}.mp4`;
  filmPlayer.loop=Boolean(film.loop);
  filmPlayer.setAttribute('aria-label',`${film.title}，视频播放器`);
  document.getElementById('video-dialog-title').textContent=film.title;
  document.getElementById('video-dialog-description').textContent=film.description;
  const position=displayOrder.indexOf(index);
  document.getElementById('video-counter').textContent=`${String(position+1).padStart(2,'0')} / ${String(videoProjects.length).padStart(2,'0')}`;
  const detail=document.getElementById('video-case-detail');
  detail.hidden=!film.detail;
  if(film.detail)detail.href=film.detail;else detail.removeAttribute('href');
  document.getElementById('previous-video').disabled=position===0;
  document.getElementById('next-video').disabled=position===displayOrder.length-1;
  const download=document.getElementById('download-video');
  download.href=filmPlayer.getAttribute('src');download.download=`杨欣润-${film.title}.mp4`;
  videoError.hidden=true;
  filmPlayer.load();
  filmPlayer.play().catch(()=>{if(generation===playbackGeneration && filmPlayer.error)videoError.hidden=false;});
}
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{
  videoOrigin=button;
  videoDialog.showModal();document.body.style.overflow='hidden';
  loadFilm(Number(button.dataset.video));
}));
function closeFilm(){
  playbackGeneration++;
  filmPlayer.pause();filmPlayer.removeAttribute('src');filmPlayer.load();
  videoDialog.close();document.body.style.overflow='';
  if(videoOrigin)videoOrigin.focus({preventScroll:true});
}
document.getElementById('close-video').addEventListener('click',closeFilm);
videoDialog.addEventListener('cancel',event=>{event.preventDefault();closeFilm();});
document.getElementById('previous-video').addEventListener('click',()=>{const position=displayOrder.indexOf(activeFilm);if(position>0)loadFilm(displayOrder[position-1]);});
document.getElementById('next-video').addEventListener('click',()=>{const position=displayOrder.indexOf(activeFilm);if(position<displayOrder.length-1)loadFilm(displayOrder[position+1]);});
filmPlayer.addEventListener('error',()=>{if(videoDialog.open&&filmPlayer.getAttribute('src'))videoError.hidden=false;});
