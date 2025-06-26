
const firebaseConfig = {
   apiKey: "AIzaSyDIOZ2Kihi4-h5ielsYqLo0rjef1vPBUik",
  authDomain: "my-portfolio-c9444.firebaseapp.com",
  projectId: "my-portfolio-c9444",
  storageBucket: "my-portfolio-c9444.firebasestorage.app",
  messagingSenderId: "887110929640",
  appId: "1:887110929640:web:5cbffbf60d089bf6978d5d",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Mobile Navigation Toggle ---
const navToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('nav ul');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// --- Smooth Scroll and Active Link Handling ---
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.classList.remove('open'); // Close mobile menu on click
    document.querySelectorAll('nav a').forEach(el => el.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// --- Contact Form Handling ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

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
    await db.collection('contacts').add({
      name,
      email,
      message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    formStatus.style.color = 'green';
    formStatus.textContent = 'Message sent successfully! Thank you.';

    contactForm.reset();
  } catch (error) {
    formStatus.style.color = 'red';
    formStatus.textContent = 'Error sending message. Please try again later.';
    console.error('Error adding document: ', error);
  }
});
