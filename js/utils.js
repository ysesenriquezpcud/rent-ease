let savedIds = JSON.parse(localStorage.getItem("rentease_saved") || "[]");

function formatPrice(n) {
  return "₱" + n.toLocaleString("en-PH");
}

function renderStars(rating) {
  const full = Math.floor(rating);
  let html = "";
  for (let i = 0; i < 5; i++) {
    html += `<svg class="star ${i < full ? "filled" : ""}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  }
  return html;
}

function isSaved(id) {
  return savedIds.includes(id);
}

function toggleSave(id) {
  if (isSaved(id)) {
    savedIds = savedIds.filter((x) => x !== id);
  } else {
    savedIds.push(id);
  }
  localStorage.setItem("rentease_saved", JSON.stringify(savedIds));
}

function bookmarkSvg() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
}

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("rentease_theme", isDark ? "dark" : "light");
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.setAttribute("aria-checked", isDark ? "true" : "false");
}

function initTheme() {
  const saved = localStorage.getItem("rentease_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved === "dark" || (!saved && prefersDark));
}

function initHeaderScroll() {
  const header = document.getElementById("mainHeader");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });
}

initTheme();
initHeaderScroll();