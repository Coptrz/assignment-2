(function () {
  // ===== Grab references to DOM elements =====
  const docEl = document.documentElement;      // <html> element (for theme toggle)
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const greeting = document.getElementById('greeting');
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const year = document.getElementById('year');

  // ===== Footer year =====
  if (year) year.textContent = new Date().getFullYear();

  // ===== Greeting message by time of day =====
  const hour = new Date().getHours();
  let msg = 'Hello!';
  if (hour < 12) msg = 'Good morning!';
  else if (hour < 18) msg = 'Good afternoon!';
  else msg = 'Good evening!';
  if (greeting) greeting.textContent = msg;

  // ===== Theme Toggle with persistence =====
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    docEl.setAttribute('data-theme', 'dark');   // apply dark theme
    themeToggle?.setAttribute('aria-pressed', 'true');
    if (themeLabel) themeLabel.textContent = 'Light'; // update label
  }

  // Toggle theme on button click
  themeToggle?.addEventListener('click', () => {
    const isDark = docEl.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    docEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);        // save preference
    themeToggle.setAttribute('aria-pressed', String(!isDark));
    if (themeLabel) themeLabel.textContent = isDark ? 'Dark' : 'Light';
  });

  // ===== Contact Form validation (demo only) =====
  form?.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent actual submission

    // Collect field values
    const name = /** @type {HTMLInputElement} */ (document.getElementById('name'));
    const email = /** @type {HTMLInputElement} */ (document.getElementById('email'));
    const message = /** @type {HTMLTextAreaElement} */ (document.getElementById('message'));

    let errors = [];

    // Basic validation
    if (!name.value.trim()) errors.push('Name is required.');
    if (!email.value.trim()) errors.push('Email is required.');
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)) errors.push('Enter a valid email.');
    if (!message.value.trim()) errors.push('Message is required.');

    // Display results
    if (errors.length) {
      formStatus.textContent = errors.join(' ');
      formStatus.classList.remove('hidden');
      return;
    }

    formStatus.textContent = 'Thanks! Your message has been prepared (demo only).';
    formStatus.classList.remove('hidden');
    form.reset(); // clear fields
  });
})();
