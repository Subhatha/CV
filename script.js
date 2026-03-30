// ------------------------
// Firebase Initialization
// ------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDIOZ2Kihi4-h5ielsYqLo0rjef1vPBUik",
  authDomain: "my-portfolio-c9444.firebaseapp.com",
  projectId: "my-portfolio-c9444",
  storageBucket: "my-portfolio-c9444.appspot.com",
  messagingSenderId: "887110929640",
  appId: "1:887110929640:web:5cbffbf60d089bf6978d5d",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ------------------------
// EmailJS Initialization
// ------------------------
emailjs.init("5Q5uSi6mrokaZM-cS"); // Replace with your public key

// ------------------------
// DOM Ready
// ------------------------
document.addEventListener("DOMContentLoaded", () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('nav ul');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // --- Smooth Scroll & Active Link ---
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      if (navLinks) navLinks.classList.remove('open'); // Close mobile menu

      document.querySelectorAll('nav a').forEach(el => el.classList.remove('active'));
      link.classList.add('active');

      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formStatus.style.color = 'red';
        formStatus.textContent = 'Please fill in all fields.';
        return;
      }

      try {
        // Save to Firebase Firestore
        await db.collection('contacts').add({
          name,
          email,
          message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Send via EmailJS
        await emailjs.send("service_mnhzbph", "template_j6g0hmg", { name, email, message });

        formStatus.style.color = 'green';
        formStatus.textContent = '✅ Message sent successfully!';
        contactForm.reset();

      } catch (error) {
        formStatus.style.color = 'red';
        formStatus.textContent = '❌ Failed to send message. Please try again later.';
        console.error('Contact Form Error:', error);
      }
    });
  }

});