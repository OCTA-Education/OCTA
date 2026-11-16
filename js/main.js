// OCTA Interactive Animations, Continuous 5-Star Review Marquee & Contact Handler (2026)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Scroll Reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Clone marquee review items automatically so the infinite loop is 100% seamless
  document.querySelectorAll('.marquee-track').forEach((track) => {
    const items = Array.from(track.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  });

  // Contact Form -> hkcadtutorial@gmail.com
  const contactForm = document.getElementById('octaContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const track = document.getElementById('serviceTrack').value;
      const message = document.getElementById('message').value.trim();
      const statusBox = document.getElementById('formStatus');

      const targetEmail = 'hkcadtutorial@gmail.com';
      const subject = encodeURIComponent(`[OCTA Inquiry - ${track}] from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nInquiry Category: ${track}\n\nDetails:\n${message}`
      );

      statusBox.style.display = 'block';
      statusBox.innerHTML = `
        <div style="background:#ecfdf5; border:1px solid #10b981; color:#065f46; padding:16px; border-radius:10px; margin-top:16px;">
          <strong>Thank you, ${name}!</strong> Your inquiry is ready to send to <strong>${targetEmail}</strong>. 
          If your email client did not open automatically, click here: 
          <a href="mailto:${targetEmail}?subject=${subject}&body=${body}" style="text-decoration:underline; font-weight:700;">Send Email Now</a>.
        </div>
      `;
      window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    });
  }
});
