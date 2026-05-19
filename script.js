// Initialize Lucide icons
lucide.createIcons();

// Get Motion library
const motionLib = window.motion || window.Motion;

// Theme Management
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
  if (window.myChart) updateChartColors(isDark);
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

// Chart.js Initialization
let myChart;
function initChart() {
  const ctx = document.getElementById('statChart');
  if (!ctx) return;

  const isDark = document.body.classList.contains('dark-mode');
  const textColor = isDark ? '#9ca3af' : '#666666';

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['21:00', '23:00', '01:00', '03:00', '04:40'],
      datasets: [
        {
          label: 'Cognitive Self-Regulation (%)',
          data: [100, 98, 95, 90, 85],
          backgroundColor: '#6366f1',
          borderRadius: 8,
        },
        {
          label: 'Physical Fatigue (%)',
          data: [5, 20, 50, 85, 100],
          backgroundColor: '#8b5cf6',
          borderRadius: 8,
        }
      ]
    },
    options: {
      responsive: true,
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { display: false },
          ticks: { color: textColor }
        },
        x: {
          grid: { display: false },
          ticks: { color: textColor }
        }
      },
      plugins: {
        legend: {
          labels: { color: textColor, font: { family: 'Inter', weight: '600' } }
        }
      }
    }
  });
}

function updateChartColors(isDark) {
  const textColor = isDark ? '#9ca3af' : '#666666';
  myChart.options.scales.y.ticks.color = textColor;
  myChart.options.scales.x.ticks.color = textColor;
  myChart.options.plugins.legend.labels.color = textColor;
  myChart.update();
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
      
      // Special trigger for chart
      if (id === 'stats' && !myChart) {
        initChart();
      } else if (id === 'stats' && myChart) {
        myChart.reset();
        myChart.update();
      }

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
  initCursor();
});

// Custom Cursor Logic
function initCursor() {
  const outline = document.querySelector(".cursor-outline");
  const glow = document.querySelector(".cursor-glow");

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Lagged tracking for outline (light trailing effect)
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;

    // Direct tracking for glow
    glow.style.left = `${mouseX}px`;
    glow.style.top = `${mouseY}px`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover states
  const interactives = document.querySelectorAll("a, button, .dot, .section-card");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}
