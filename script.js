// Simple nav toggle for small screens
const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');
if(toggle && nav){
  // initialize
  if(!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded','false');

  toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });

  // ensure nav visibility resets on resize
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 640){
      nav.style.display = '';
      toggle.setAttribute('aria-expanded','false');
    }
  });
}

// Simple contact form handler
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // Basic validation demo
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      formMsg.textContent = 'Please fill all fields.';
      formMsg.style.color = 'crimson';
      return;
    }
    formMsg.textContent = 'Thanks! Your message was sent (demo).';
    formMsg.style.color = 'green';
    form.reset();
  });
}