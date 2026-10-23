const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.setAttribute("aria-checked", document.body.classList.contains("dark") ? "true" : "false");
  toggle.addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("dark"));
  });
}

document.getElementById("clearSavedBtn").addEventListener("click", () => {
  if (savedIds.length === 0) {
    alert("No saved properties to clear.");
    return;
  }
  if (confirm("Clear all saved properties?")) {
    savedIds = [];
    localStorage.setItem("rentease_saved", "[]");
    alert("All saved properties cleared.");
  }
});