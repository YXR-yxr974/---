const projects = {
  brocade: {
    title: '城市经纬之织', subtitle: '蜀锦文旅应用与沉浸式体验设计', category: '界面与交互', date: '2026.07 — 2026.09', role: '用户研究 / 信息架构 / 界面与交互', type: '个人项目', cover: 'brocade-01.webp', pages: ['brocade'],
    summary: '以蜀锦非遗为文化基底，以成都文旅为体验场景，将增强现实互动、路线导览与数字藏品串联成完整旅程。从“了解—探索—体验—分享”梳理用户需求，让传统文化从静态展示走向可参与、可感知的数字体验。',
    next: 'robot'
  },
  robot: {
    title: '伴星 · 让陪伴被看见', subtitle: '智能陪伴机器人与家长端应用设计', category: '界面与交互', date: '2026.08 — 2026.09', role: '体验策略 / 交互设计 / 家长端界面', type: '个人项目', cover: 'robot-01.webp', pages: ['robot'],
    summary: '围绕“儿童—陪伴机器人—家长端应用”构建多触点服务体验。以低认知负荷的交互回应儿童使用需求，通过情绪记录、陪伴任务与状态反馈，帮助家长更清晰地理解儿童状态，让信息与关怀自然连接。',
    next: 'hunan-kv'
  },
  'hunan-kv': {
    title: '湖南卫视 · KV视觉设计', subtitle: '综艺主视觉语言与传播设计过程', category: '视觉与数字体验', date: '2024.06 — 2024.09', role: '视觉语言 / 图形元素 / 版式设计', type: '实习项目', cover: 'hunan-04.webp', pages: ['hunan'],
    summary: '围绕《城市捉迷藏》的节目气质与传播场景，整理主视觉的色彩、字体、角色图形和版式语言。通过统一的视觉元素组织艺人内容，形成适用于不同传播物料的设计表达。',
    next: 'hunan'
  },
  hunan: {
    title: '湖南卫视 · 城市捉迷藏', subtitle: '五位艺人的收官长图海报系列', category: '视觉与数字体验', date: '2024.06 — 2024.09', role: '艺人海报 / 内容编排 / 视觉延展', type: '实习项目', cover: 'cover-hunan.webp', pages: ['hunan-posters'],
    summary: '围绕《城市捉迷藏》收官阶段的传播需求，完成敖子逸、郭俊辰、王勉、谢可寅与周也的系列长图海报。结合每位艺人的节目片段与人物特点，在统一视觉语言下组织丰富内容，让收官回顾保持鲜明个性与阅读节奏。',
    next: 'vibe'
  },
  vibe: {
    title: '摩梭红白', subtitle: '从书籍叙事到非遗数字体验', category: '视觉与数字体验', date: '文化与数字体验探索', role: '书籍设计 / 视觉叙事 / 数字交互探索', type: '设计项目', cover: 'vibe-03.webp', pages: ['vibe'],
    summary: '以泸沽湖摩梭文化为线索，围绕母系文化、红白礼俗、走婚情感与生死信仰构建书籍叙事。进一步探索增强现实互动与沉浸式数字场景，将纸本中的文化内容延伸为可体验的非遗叙事。',
    next: 'brand'
  },
  brand: {
    title: '润心药业 · 品牌视觉系统', subtitle: '从基础识别到品牌应用', category: '品牌设计', date: '品牌视觉识别系统', role: '标志规范 / 品牌视觉 / 应用设计', type: '品牌设计项目', cover: 'brand-base-01.webp', pages: ['brand-base','brand-use'],
    summary: '以“润养、护心、温情”为品牌理念，建立从标志、品牌色、字体与图标，到品牌形象及应用的完整视觉识别系统。将统一的品牌语言延展至办公、导视、制服、包装与日常物料，保持跨场景的一致表达。',
    next: 'brocade'
  },
  campaign: {
    title: '一丝成城 · 成都非遗广告策划', subtitle: '城市文化叙事与非遗数字传播', category: 'AIGC / 广告策划', date: '文化传播方案', role: '团队策划参与 / 个人海报与数字媒体设计', type: '团队项目与个人实践', cover: 'campaign/page-001.webp', pages: ['campaign'],
    summary: '围绕成都漆艺、邛窑、竹编、银花丝与蜀锦蜀绣开展文化调研，以“城市文化DNA重启”构建未来叙事。将非遗主题短片与海报、折页、动态影像相互连接，探索传统工艺面向当代受众的传播方式。',
    next: 'brocade'
  }
};

const key = new URLSearchParams(location.search).get('id');
const project = projects[key];
const container = document.getElementById('project-content');
let currentPages = [];
let currentIndex = 0;
let viewerTrigger = null;
const viewer = document.querySelector('.image-viewer');
const viewerBody = document.querySelector('.viewer-body');
const viewerImage = viewerBody.querySelector('img');
const zoomButton = document.getElementById('zoom-image');
const pageData = window.PORTFOLIO_PAGES || {};

if (!project) {
  container.innerHTML = '<div class="missing-project"><h1>这个项目暂时没有找到。</h1><a href="index.html#works">← 返回作品集</a></div>';
} else {
  document.title = `${project.title} · 杨欣润`;
  container.innerHTML = `
  <section class="project-intro"><div class="project-kicker"><span>${project.category}</span><span>${project.type}</span></div><h1>${project.title}</h1><div class="project-information"><p class="project-summary">${project.summary}</p><dl class="project-metadata"><div><dt>项目方向</dt><dd>${project.subtitle}</dd></div><div><dt>项目时间 / 范围</dt><dd>${project.date}</dd></div><div><dt>承担工作</dt><dd>${project.role}</dd></div><div><dt>项目类型</dt><dd>${project.type}</dd></div></dl></div>${key==='hunan'?'<a class="project-related-link" href="project.html?id=hunan-kv">查看KV视觉设计与创作过程 ↗</a>':key==='hunan-kv'?'<a class="project-related-link" href="project.html?id=hunan">查看五位艺人的成品长图海报 ↗</a>':''}</section>
  ${key==='campaign'?'<section class="campaign-film"><div class="campaign-film-heading"><h2>蓉城重启</h2><p>非遗主题概念短片 · 02:09</p></div><video controls playsinline preload="metadata" poster="assets/videos/film-02-cover.webp" aria-label="蓉城重启，成都非遗主题短片"><source src="assets/videos/film-02.mp4" type="video/mp4"></video></section>':key==='hunan'?'':`<figure class="project-hero"><img src="assets/${project.cover}" alt="${project.title}项目封面"  fetchpriority="high"></figure>`}
  <section class="project-gallery" aria-labelledby="gallery-title"><div class="gallery-heading"><h2 id="gallery-title">${key==='hunan'?'艺人收官长图海报':key==='campaign'?'广告策划与个人设计':'设计过程与完整呈现'}</h2><p>${key==='hunan'?'点击展开完整长图 · 支持滚动阅读':'点击图片查看 · 支持放大细节'}</p></div>${key === 'brand' ? '<div class="gallery-tabs" role="group" aria-label="品牌项目章节"><button class="filter active" data-gallery="selected" aria-pressed="true">精选展示</button><button class="filter" data-gallery="brand-base" aria-pressed="false">基础规范 · 36页</button><button class="filter" data-gallery="brand-use" aria-pressed="false">应用规范 · 41页</button></div>' : key==='campaign'?'<div class="gallery-tabs" role="group" aria-label="广告策划章节"><button class="filter active" data-gallery="selected" aria-pressed="true">策划精选</button><button class="filter" data-gallery="campaign" aria-pressed="false">策划正文 · 84页</button><button class="filter" data-gallery="campaign-personal" aria-pressed="false">个人设计 · 杨欣润</button></div>':''}<div class="gallery-pages"></div></section>
  ${key==='campaign'?'<section class="campaign-motion"><div class="gallery-heading"><h2>非遗动态海报</h2><p>漆艺、邛窑与银花丝的数字表达</p></div><div class="campaign-motion-grid">'+[['lacquer','漆艺 · 光影重构'],['pottery','邛窑 · 器物新生'],['silver','银花丝 · 一缕成花']].map(([id,title])=>`<figure><video controls playsinline loop preload="none" poster="assets/videos/${id}-cover.webp" aria-label="${title}动态海报"><source src="assets/videos/${id}.mp4" type="video/mp4"></video><figcaption>${title}</figcaption></figure>`).join('')+'</div></section>':''}
  <a class="next-project" href="project.html?id=${project.next}"><div><p>下一个项目</p><h2>${projects[project.next].title}</h2></div><span aria-hidden="true">↗</span></a>`;

  function renderGallery(mode = 'selected') {
    if (key === 'brand' && mode === 'selected') {
      currentPages = [pageData['brand-base'][4],pageData['brand-base'][15],pageData['brand-base'][23],pageData['brand-base'][25],pageData['brand-base'][27],pageData['brand-use'][1],pageData['brand-use'][14],pageData['brand-use'][19],pageData['brand-use'][24],pageData['brand-use'][32],pageData['brand-use'][38],pageData['brand-use'][39]];
    } else if (key === 'brand') currentPages = pageData[mode];
    else if(key==='campaign') currentPages=mode==='selected'?[0,3,5,6,8,11,20,31,40,47,55,58,69,70,71,72,75,79,82].map(index=>pageData.campaign[index]):pageData[mode];
    else currentPages = project.pages.flatMap(name => pageData[name] || []);
    const gallery=document.querySelector('.gallery-pages');
    gallery.classList.toggle('poster-gallery',key==='hunan');
    gallery.classList.toggle('personal-gallery',key==='campaign'&&mode==='campaign-personal');
    gallery.innerHTML = currentPages.map((page,index) => key==='hunan'?`<figure class="poster-item"><button class="gallery-page" data-image="${index}" aria-label="查看${page.person}完整长图海报"><img src="${page.thumb}" alt="${page.label}预览" loading="lazy"><span>展开长图 ↗</span></button><figcaption>${page.person}<p>收官长图海报</p></figcaption></figure>`:`<button class="gallery-page" data-image="${index}" aria-label="查看${page.label||project.title+'，第'+(index+1)+'张设计图'}"><img src="${page.src}" alt="${page.label||project.title+'设计过程与作品，第'+(index+1)+'张'}" width="${page.width}" height="${page.height}" loading="lazy"><span>放大查看 ↗</span></button>`).join('');
    document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => openViewer(Number(button.dataset.image),button)));
    window.PortfolioMotion?.observe(gallery);
  }
  renderGallery();
  document.querySelectorAll('[data-gallery]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-gallery]').forEach(other => { const active = other === button; other.classList.toggle('active',active);other.setAttribute('aria-pressed',String(active)); });
    renderGallery(button.dataset.gallery);
  }));
}

function updateViewer() {
  const page = currentPages[currentIndex];
  viewerImage.src = page.src;
  viewerImage.alt = page.label||`${project.title}，第${currentIndex+1}张设计图`;
  document.getElementById('viewer-counter').textContent = `作品图片 ${currentIndex+1} / ${currentPages.length}`;
  document.getElementById('previous-image').disabled = currentIndex === 0;
  document.getElementById('next-image').disabled = currentIndex === currentPages.length-1;
  viewerBody.classList.remove('zoomed');viewerBody.classList.toggle('long-poster',Boolean(page.long));zoomButton.textContent=page.long?'原尺寸查看':'放大细节';viewerBody.scrollTop=0;viewerBody.scrollLeft=0;
}
function openViewer(index,trigger) {
  currentIndex = index; viewerTrigger=trigger; updateViewer();viewer.showModal();document.body.style.overflow='hidden';
}
function closeViewer() { viewer.close();document.body.style.overflow='';if(viewerTrigger)viewerTrigger.focus({preventScroll:true}); }
document.getElementById('close-viewer').addEventListener('click',closeViewer);
viewer.addEventListener('cancel',event => {event.preventDefault();closeViewer();});
document.getElementById('previous-image').addEventListener('click',() => {if(currentIndex>0){currentIndex--;updateViewer();}});
document.getElementById('next-image').addEventListener('click',() => {if(currentIndex<currentPages.length-1){currentIndex++;updateViewer();}});
zoomButton.addEventListener('click',() => {const zoomed=viewerBody.classList.toggle('zoomed');zoomButton.textContent=viewerBody.classList.contains('long-poster')?(zoomed?'适应宽度':'原尺寸查看'):(zoomed?'适应屏幕':'放大细节');});
viewer.addEventListener('keydown',event => {
  if(event.key==='ArrowLeft' && currentIndex>0){event.preventDefault();currentIndex--;updateViewer();}
  if(event.key==='ArrowRight' && currentIndex<currentPages.length-1){event.preventDefault();currentIndex++;updateViewer();}
});
