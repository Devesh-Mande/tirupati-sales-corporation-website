/* =============================================
   TIRUPATI SALES CORPORATION — script.js
============================================= */

// // ── SMOOTH NAVBAR SCROLL EFFECT ──
// const navbar = document.getElementById("navbar");

// let lastScrollY = window.scrollY;
// let ticking = false;

// function updateNavbar() {
//   const currentScrollY = window.scrollY;

//   // Scrolled background effect
//   if (currentScrollY > 60) {
//     navbar.classList.add("scrolled");
//   } else {
//     navbar.classList.remove("scrolled");
//   }

//   // Hide only after a meaningful downward movement
//   if (currentScrollY > lastScrollY + 10 && currentScrollY > 120) {
//     navbar.classList.add("hide");
//   }

//   // Show only after a meaningful upward movement
//   else if (currentScrollY < lastScrollY - 10) {
//     navbar.classList.remove("hide");
//   }

//   lastScrollY = currentScrollY;
//   ticking = false;
// }

// window.addEventListener(
//   "scroll",
//   () => {
//     if (!ticking) {
//       window.requestAnimationFrame(updateNavbar);
//       ticking = true;
//     }
//   },
//   { passive: true }
// );


const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveNav);

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
  });
});

// ── DEALS CAROUSEL ──
const carousel = document.getElementById('dealsCarousel');
const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;

function getCardsVisible() {
  if (window.innerWidth < 680) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

function getCardWidth() {
  const cards = carousel.querySelectorAll('.deal-card');
  if (!cards.length) return 0;
  const style = window.getComputedStyle(cards[0]);
  const marginRight = parseInt(style.marginRight) || 0;
  return cards[0].offsetWidth + 24 + marginRight; // 24 = gap
}

function getTotalSlides() {
  const total = carousel.querySelectorAll('.deal-card').length;
  return Math.max(0, total - getCardsVisible());
}

function buildDots() {
  dotsContainer.innerHTML = '';
  const total = carousel.querySelectorAll('.deal-card').length;
  const visible = getCardsVisible();
  const dots = Math.ceil(total / visible);
  for (let i = 0; i < dots; i++) {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i * visible));
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const visible = getCardsVisible();
  const dotIndex = Math.floor(currentIndex / visible);
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === dotIndex);
  });
}

function goToSlide(index) {
  const maxIndex = getTotalSlides();
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  const offset = currentIndex * getCardWidth();
  carousel.scrollTo({ left: offset, behavior: 'smooth' });
  updateDots();
}

nextBtn.addEventListener('click', () => goToSlide(currentIndex + getCardsVisible()));
prevBtn.addEventListener('click', () => goToSlide(currentIndex - getCardsVisible()));

// Auto-play carousel
let autoplayInterval = setInterval(() => {
  const maxIndex = getTotalSlides();
  if (currentIndex >= maxIndex) {
    goToSlide(0);
  } else {
    goToSlide(currentIndex + 1);
  }
}, 3200);

carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
carousel.addEventListener('mouseleave', () => {
  autoplayInterval = setInterval(() => {
    const maxIndex = getTotalSlides();
    if (currentIndex >= maxIndex) goToSlide(0);
    else goToSlide(currentIndex + 1);
  }, 3200);
});

window.addEventListener('resize', () => {
  buildDots();
  goToSlide(0);
});

buildDots();

// ── PRICE TABS ──
const priceTabs = document.querySelectorAll('.price-tab');
const pricePanels = document.querySelectorAll('.price-panel');

priceTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    priceTabs.forEach(t => t.classList.remove('active'));
    pricePanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});



// ===============================
// PRICE LIST ACCORDION
// ===============================


function toggleBrand(id){


    let content = document.getElementById(id);


    let arrow = document.getElementById(id + "-arrow");



    if(content.style.display === "grid"){


        // CLOSE

        content.style.display = "none";

        arrow.innerHTML = "▼";


    }

    else{


        // OPEN

        content.style.display = "grid";

        arrow.innerHTML = "▲";


    }



}



// ── STATS COUNTER ──
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ── SCROLL REVEAL ──
const revealElements = document.querySelectorAll(
  '.deal-card, .contact-card, .about-content, .founder-card, .stat-item, .price-section, .section-header'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(n => animateCounter(n));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) counterObserver.observe(statsSection);

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── ENQUIRY FORM ──

const enquiryForm = document.getElementById("enquiryForm");
const enquiryStatus = document.getElementById("enquiryStatus");
const enquirySubmit = document.getElementById("enquirySubmit");


enquiryForm.addEventListener("submit", async function(e){

    e.preventDefault();

    enquirySubmit.disabled = true;
    enquirySubmit.innerText = "Sending...";


    const formData = new FormData(enquiryForm);


    try {

        const response = await fetch(
            "https://formsubmit.co/ajax/rajtsc@hotmail.com",
            {
                method: "POST",
                body: formData
            }
        );


        const result = await response.json();


        if(result.success){

            enquiryStatus.innerHTML =
            "✅ Thank you! Your enquiry has been submitted successfully. Our team will get back to you shortly.";


            enquiryForm.reset();

        }
        else{

            enquiryStatus.innerHTML =
            "❌ Something went wrong. Please try again.";

        }


    }
    catch(error){

        enquiryStatus.innerHTML =
        "❌ Unable to submit enquiry. Please try again.";

    }


    enquirySubmit.disabled = false;
    enquirySubmit.innerText = "Submit Enquiry";


});
// ── TOUCH SWIPE for carousel ──
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) goToSlide(currentIndex + 1);
    else goToSlide(currentIndex - 1);
  }
}, { passive: true });


const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");

function openPDF(pdfURL) {
    pdfFrame.src = pdfURL;
    pdfModal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closePDF() {
    pdfModal.style.display = "none";
    pdfFrame.src = "";
    document.body.style.overflow = "";
}

window.addEventListener("click", (e) => {
    if (e.target === pdfModal) {
        closePDF();
    }
});


function openPDF(pdfURL) {

    const modal = document.getElementById("pdfModal");
    const frame = document.getElementById("pdfFrame");

    frame.src = pdfURL;

    modal.style.display = "flex";

    // Lock website background scrolling
    document.body.style.overflow = "hidden";
}

function closePDF() {

    const modal = document.getElementById("pdfModal");
    const frame = document.getElementById("pdfFrame");

    modal.style.display = "none";

    // Stop PDF loading
    frame.src = "";

    // Enable website scrolling again
    document.body.style.overflow = "";
}