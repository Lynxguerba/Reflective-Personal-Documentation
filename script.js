// Initialize Lucide icons
lucide.createIcons();

// Get Motion library
const motionLib = window.motion || window.Motion;

// Theme Management
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.setAttribute("data-lucide", isDark ? "moon" : "sun");
    lucide.createIcons();
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  updateThemeIcon(true);
}

// Scroll Handling & Animations
const sections = document.querySelectorAll(".view-section");
const dots = document.querySelectorAll(".dot");
const scrollContainer = document.querySelector(".scroll-container");

const observerOptions = {
  root: scrollContainer,
  threshold: 0.5,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      updateActiveDot(id);
      animateSectionContent(entry.target);
      // Update URL hash without jumping
      history.replaceState(null, null, `#${id}`);
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

function updateActiveDot(id) {
  dots.forEach((dot) => {
    dot.classList.toggle("active", dot.getAttribute("href") === `#${id}`);
  });
}

function animateSectionContent(section) {
  const wrapper = section.querySelector(".content-wrapper");
  if (wrapper && motionLib) {
    const { animate } = motionLib;
    animate(
      wrapper,
      { opacity: [0, 1], y: [30, 0] },
      { duration: 1, easing: "ease-out" }
    );
  }
}

// Handle smooth scroll for nav dots
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initial Load Animation
document.addEventListener("DOMContentLoaded", () => {
  const initialHash = window.location.hash || "#view-hero";
  const target = document.querySelector(initialHash);
  if (target) {
    target.scrollIntoView();
  }
});
