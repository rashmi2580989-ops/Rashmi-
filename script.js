/* ============================================================
   KHUSHI AGENCY — script.js (shared)
   ============================================================ */

// Year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// Burger
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !burger.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// Header shrink
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('shrunk', window.scrollY > 40);
}, { passive: true });

// Active nav link (same page)
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navItems.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// Contact form
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fields = [
      { id: 'name',    errId: 'name-error',    msg: 'Please enter your full name.' },
      { id: 'email',   errId: 'email-error',   msg: 'Please enter a valid email.' },
      { id: 'message', errId: 'message-error', msg: 'Please enter a message.' },
    ];
    fields.forEach(f => {
      const el = document.getElementById(f.id);
      const err = document.getElementById(f.errId);
      if (!el || !err) return;
      if (!el.value.trim()) { err.textContent = f.msg; valid = false; }
      else { err.textContent = ''; }
    });
    if (valid) {
      form.style.display = 'none';
      if (success) { success.hidden = false; }
    }
  });
}
