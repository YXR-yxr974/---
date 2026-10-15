const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-category]').forEach(section => {
    section.hidden = selected !== 'all' && section.dataset.category !== selected;
    if(!section.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      section.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'cubic-bezier(.22,.68,.24,1)'});
    }
  });
  const visible = document.querySelectorAll('.work-category:not([hidden]) .project-card').length;
  document.getElementById('filter-status').textContent = `显示${button.getAttribute('aria-label')||button.textContent}，共${visible}件作品`;
}));

document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
  const text = button.dataset.copy;
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else {
      const field = document.createElement('textarea');
      field.value = text; field.style.position = 'fixed'; field.style.opacity = '0';
      document.body.append(field); field.select();
      if (!document.execCommand('copy')) throw new Error('copy unavailable');
      field.remove(); button.focus();
    }
    const toast = document.querySelector('.toast');
    toast.textContent = '微信号已复制：17723162579'; toast.classList.add('visible');
    window.setTimeout(() => toast.classList.remove('visible'), 2800);
  } catch {
    const toast = document.querySelector('.toast');
    toast.textContent = '微信号：17723162579，请长按或选中复制'; toast.classList.add('visible');
    window.setTimeout(() => toast.classList.remove('visible'), 5000);
  }
}));
