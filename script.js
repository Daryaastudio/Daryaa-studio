const menu = document.getElementById('menuToggle');
const nav = document.getElementById('navMenu');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.dropbtn').forEach(btn => btn.addEventListener('click', e => {
  e.stopPropagation();
  const d = btn.parentElement;
  document.querySelectorAll('.dropdown').forEach(x => x !== d && x.classList.remove('open'));
  d.classList.toggle('open');
}));

document.querySelectorAll('#navMenu a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  document.querySelectorAll('.dropdown').forEach(x => x.classList.remove('open'));
}));

document.addEventListener('click', () => document.querySelectorAll('.dropdown').forEach(x => x.classList.remove('open')));

// Culture filters
const portfolioMessage = document.getElementById('portfolioMessage');
document.querySelectorAll('.culture-grid button').forEach(card => card.addEventListener('click', () => {
  const category = card.dataset.filter;
  portfolioMessage.textContent = `${category} wedding and celebration examples.`;
  document.querySelectorAll('.gallery article').forEach(item => {
    item.style.display = item.dataset.category.toLowerCase().includes(category.toLowerCase()) ? '' : 'none';
  });
  document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
}));

// Booking form — Formspree handles the email delivery without exposing the business email publicly.
const bookingForm = document.getElementById('bookingForm');
const formStatus = document.getElementById('formStatus');
const submitButton = document.getElementById('bookingSubmit');

bookingForm.addEventListener('submit', async e => {
  e.preventDefault();
  const endpoint = bookingForm.dataset.endpoint;

  if (endpoint.includes('REPLACE_WITH_FORM_ID')) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'The booking form is designed and ready. One final Formspree connection is needed before it can receive live inquiries.';
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(bookingForm),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      bookingForm.reset();
      formStatus.className = 'form-status success';
      formStatus.textContent = 'Thank you! Your inquiry has been sent. Daryaa Studios will be in touch shortly.';
    } else {
      const data = await response.json().catch(() => ({}));
      throw new Error(data?.errors?.map(x => x.message).join(', ') || 'Unable to send the inquiry.');
    }
  } catch (error) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'We could not send the inquiry right now. Please use WhatsApp to contact Daryaa Studios.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Booking Inquiry';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
