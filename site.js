(() => {
  'use strict';
  const root = document.documentElement;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-toggle');
  let motionChoice = null;
  try { motionChoice = localStorage.getItem('beavo.site.motion'); } catch {}
  function updateMotion() {
    const off = motionPreference.matches || motionChoice === 'off';
    root.dataset.motion = off ? 'off' : 'on';
    motionButton.setAttribute('aria-pressed', String(off));
    motionButton.setAttribute('aria-label', off ? 'Turn website motion on' : 'Turn website motion off');
    motionButton.querySelector('span').textContent = off ? 'off' : 'on';
    // The operating system's Reduce Motion setting takes precedence.
    motionButton.disabled = motionPreference.matches;
    if (motionPreference.matches) motionButton.setAttribute('aria-label', 'Motion off: follows your device setting');
  }
  motionButton.addEventListener('click', () => {
    motionChoice = root.dataset.motion === 'off' ? 'on' : 'off';
    try { localStorage.setItem('beavo.site.motion', motionChoice); } catch {}
    updateMotion();
  });
  motionPreference.addEventListener('change', updateMotion);
  updateMotion();
  root.classList.add('enhanced');

  const menu = document.querySelector('.menu-toggle');
  const links = document.getElementById('nav-links');
  function closeMenu(returnFocus = false) {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    links.classList.remove('is-open');
    if (returnFocus) menu.focus();
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    links.classList.toggle('is-open', open);
  });
  links.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav') && menu.getAttribute('aria-expanded') === 'true') closeMenu();
  });
  window.matchMedia('(min-width: 651px)').addEventListener('change', () => closeMenu());

  const tabs = Array.from(document.querySelectorAll('.feature-tab'));
  const compactTools = window.matchMedia('(max-width: 650px)');
  const orientTabs = () => document.querySelector('.feature-tabs').setAttribute('aria-orientation', compactTools.matches ? 'horizontal' : 'vertical');
  compactTools.addEventListener('change', orientTabs);
  orientTabs();
  function selectFeature(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => selectFeature(tab));
    tab.addEventListener('keydown', event => {
      const current = tabs.indexOf(tab);
      let next = current;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (current + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectFeature(tabs[next], true);
    });
  });

  const milestones = [
    { week:4, title:'A new beginning', description:'Your pregnancy care starts by contacting NHS maternity services. The first appointment is a chance to ask questions and make a plan.', action:'Ask what support would feel useful today. Start a shared list of questions.' },
    { week:8, title:'The booking appointment', description:'Usually at 8 to 12 weeks, this first midwife appointment covers health, history and the plan for pregnancy care.', action:'If your partner would like you there, make space in your calendar and bring your questions.' },
    { week:11, title:'The first scan', description:'Usually at 11 to 14 weeks, this scan checks the due date, development and whether there is more than one baby.', action:'Check the appointment details together. Leave time to talk afterwards.' },
    { week:15, title:'A midwife check-in', description:'At around 16 weeks, the midwife discusses earlier results, answers questions and explains the next scan.', action:'Help keep track of questions and the next appointment.' },
    { week:18, title:'The 20-week scan', description:"Usually offered between 18 and 21 weeks, this scan checks your baby's development. Make room for questions you both want to ask.", action:"Ask your partner whether they'd like you there, and write down a question together." },
    { week:22, title:'Making space for change', description:'The middle weeks can bring new questions. Your care team will confirm which checks and appointments you are offered.', action:'Pick a practical job to own, from planning a meal to updating the calendar.' },
    { week:28, title:'Looking towards birth', description:'The 28-week appointment includes checks and conversations about labour, birth and wellbeing.', action:'Ask what your partner wants from your support. Keep important contact numbers easy to find.' },
    { week:31, title:'Preparation, together', description:'Later appointments include conversations about preparing for birth, preferences and signs of labour.', action:'Talk through the practical things: your bag, contacts, and how you will get to the maternity unit.' },
    { week:36, title:'The weeks before hello', description:"At around 36 weeks, the midwife checks your baby's position and discusses preparing for birth.", action:'Check the bag together and make sure you both know how to contact the maternity team.' },
    { week:38, title:'A little room for waiting', description:"Later appointments include your choices if pregnancy continues beyond 40 weeks. Your care team will explain the plan.", action:'Keep plans flexible. Ask what would make today a little easier.' },
    { week:40, title:'Your due-date week', description:'Your care team will discuss the next steps and the choices available if pregnancy continues.', action:'Listen, check the plan together, and keep your maternity contact close.' }
  ];
  const slider = document.getElementById('week-slider');
  const art = document.getElementById('growth-art');
  function paintWeek() {
    const week = Math.max(4, Math.min(40, Number(slider.value)));
    const stage = week < 13 ? 'First trimester' : week < 28 ? 'Second trimester' : 'Third trimester';
    const milestone = milestones.filter(item => item.week <= week).at(-1);
    document.getElementById('week-output').textContent = week;
    document.getElementById('week-stage').textContent = stage.toUpperCase();
    document.getElementById('week-title').textContent = milestone.title;
    document.getElementById('week-description').textContent = milestone.description;
    document.getElementById('week-action').textContent = milestone.action;
    slider.setAttribute('aria-valuetext', 'Week ' + week + ', ' + stage.toLowerCase());
    slider.style.setProperty('--progress', ((week - 4) / 36 * 100) + '%');
    const file = 'assets/growth' + (week < 13 ? 1 : week < 23 ? 2 : week < 33 ? 3 : 4) + '.webp';
    if (art.getAttribute('src') !== file) art.src = file;
  }
  slider.addEventListener('input', paintWeek);
  paintWeek();

  // A once-only entrance; content is never hidden awaiting the observer.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        if (root.dataset.motion !== 'off') entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    }, { threshold:0.12 });
    document.querySelectorAll('.intro-grid, .product-copy, .journey-heading, .week-explorer, .night-heading, .night-card, .price-card, .questions>div').forEach(element => observer.observe(element));
  }
})();
