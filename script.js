// Main DOM elements
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const menuToggle = document.getElementById('menuToggle');
const navPanel = document.getElementById('navPanel');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const revealElements = document.querySelectorAll('.reveal');


const savedTheme = localStorage.getItem('portfolioTheme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  themeIcon.textContent = '☀';
} else {
  themeIcon.textContent = '☾';
}

function toggleTheme() {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');
  localStorage.setItem('portfolioTheme', isLightMode ? 'light' : 'dark');
  themeIcon.textContent = isLightMode ? '☀' : '☾';
}

themeToggle.addEventListener('click', toggleTheme);

function toggleMenu() {
  const isOpen = navPanel.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

menuToggle.addEventListener('click', toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navPanel.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});


function updateActiveLink() {
  let currentSection = 'home';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
}

function updateBackToTopButton() {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thank you! Your message has been submitted.');
  contactForm.reset();
});

window.addEventListener('scroll', () => {
  updateActiveLink();
  updateBackToTopButton();
});

updateActiveLink();
updateBackToTopButton();
