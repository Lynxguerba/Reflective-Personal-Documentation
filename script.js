function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const icon = document.getElementById("theme-icon");
  icon.textContent = document.body.classList.contains("dark-mode")
    ? "🌙"
    : "☀️";
}

const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.1 },
);

sections.forEach((sec) => observer.observe(sec));
