let currentType = "all";
let currentSort = "rating";

function getHomeFiltered() {
  let list = [...properties];
  if (currentType !== "all") list = list.filter((p) => p.type === currentType);
  if (currentSort === "rating") list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  else if (currentSort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (currentSort === "price-desc") list.sort((a, b) => b.price - a.price);
  return list;
}

function renderHome() {
  const list = getHomeFiltered();
  const grid = document.getElementById("listingsGrid");
  const count = document.getElementById("listingsCount");
  count.textContent = `${list.length} listing${list.length !== 1 ? "s" : ""} found`;
  grid.innerHTML = list.length
    ? list.map(renderCard).join("")
    : `<div class="empty-state"><p>No properties match your filters.</p></div>`;
  bindCardEvents(grid);
}

document.getElementById("typeFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".type-btn");
  if (!btn) return;
  document.querySelectorAll("#typeFilters .type-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentType = btn.dataset.type;
  renderHome();
});

const sortBtn = document.getElementById("sortBtn");
const sortMenu = document.getElementById("sortMenu");
const sortLabel = document.getElementById("sortLabel");

sortBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  sortMenu.classList.toggle("open");
});

sortMenu.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  currentSort = btn.dataset.sort;
  sortLabel.textContent = btn.textContent;
  sortMenu.classList.remove("open");
  renderHome();
});

document.addEventListener("click", () => sortMenu.classList.remove("open"));

const mapBtn = document.querySelector(".map-btn");
if (mapBtn) {
  mapBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    mapBtn.classList.add("active");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        alert(`Location detected!\nLat: ${pos.coords.latitude.toFixed(4)}\nLng: ${pos.coords.longitude.toFixed(4)}`);
      },
      (err) => {
        mapBtn.classList.remove("active");
        alert(err.code === err.PERMISSION_DENIED
          ? "Location permission denied."
          : "Unable to retrieve your location.");
      }
    );
  });
}

renderHome();