let searchType = "all";
let searchSort = "rating";
let minPrice = null;
let maxPrice = null;
let minBeds = "all";
let activeArea = null;
let map = null;
let mapMarkers = [];

function hasActiveSearch() {
  const q = document.getElementById("pageSearchInput")?.value.trim() || "";
  return (
    q.length > 0 ||
    activeArea !== null ||
    searchType !== "all" ||
    (minPrice !== null && minPrice !== "") ||
    (maxPrice !== null && maxPrice !== "") ||
    minBeds !== "all"
  );
}

function getSearchFiltered() {
  if (!hasActiveSearch()) return [];

  let list = [...properties];
  if (searchType !== "all") list = list.filter((p) => p.type === searchType);
  if (activeArea) list = list.filter((p) => p.areaKey === activeArea);
  if (minPrice !== null && minPrice !== "") list = list.filter((p) => p.price >= Number(minPrice));
  if (maxPrice !== null && maxPrice !== "") list = list.filter((p) => p.price <= Number(maxPrice));
  if (minBeds !== "all") list = list.filter((p) => p.bedrooms >= Number(minBeds));

  const q = document.getElementById("pageSearchInput").value.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }

  if (searchSort === "rating") list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  else if (searchSort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (searchSort === "price-desc") list.sort((a, b) => b.price - a.price);
  return list;
}

function applyUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const q = params.get("q");

  if (type) {
    searchType = type;
    document.querySelectorAll("#searchTypeFilters .type-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.type === type);
    });
  }

  if (q) {
    const input = document.getElementById("pageSearchInput");
    if (input) input.value = q;
  }
}

function renderSearch() {
  const list = getSearchFiltered();
  const grid = document.getElementById("searchListingsGrid");
  const count = document.getElementById("searchListingsCount");
  count.textContent = `${list.length} listing${list.length !== 1 ? "s" : ""} found`;

  if (!hasActiveSearch()) {
    grid.innerHTML = `<div class="empty-state"><p>Search or use filters to see available properties.</p></div>`;
  } else if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state"><p>No properties match your filters.</p></div>`;
  } else {
    grid.innerHTML = list.map(renderCard).join("");
    bindCardEvents(grid);
  }
  updateMapPins();
}

function getAreaCounts() {
  const counts = {};
  mapAreas.forEach((a) => (counts[a.key] = 0));
  properties.forEach((p) => {
    if (counts[p.areaKey] !== undefined) counts[p.areaKey]++;
  });
  return counts;
}

function updateMapPins() {
  if (!map) return;
  mapMarkers.forEach((m) => map.removeLayer(m));
  mapMarkers = [];
  const counts = getAreaCounts();

  mapAreas.forEach((area) => {
    const count = counts[area.key] || 0;
    if (count === 0) return;

    const icon = L.divIcon({
      className: "",
      html: `<div class="map-pin ${activeArea === area.key ? "active" : ""}">${count}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const marker = L.marker([area.lat, area.lng], { icon }).addTo(map);
    marker.on("click", () => {
      activeArea = area.key;
      document.getElementById("pageSearchInput").value = area.name;
      renderSearch();
    });
    mapMarkers.push(marker);
  });
}

function initMap() {
  if (map) {
    setTimeout(() => map.invalidateSize(), 100);
    return;
  }

  map = L.map("map").setView([14.55, 121.0], 11);

  const CARTO_KEY = "cb1_4ta4_1_9f7743da3df55c5c06fbab74";

  L.tileLayer(
    "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=" + encodeURIComponent(CARTO_KEY),
    {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      maxZoom: 20
    }
  ).addTo(map);

  updateMapPins();
}

applyUrlParams();

document.getElementById("searchTypeFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".type-btn");
  if (!btn) return;
  document.querySelectorAll("#searchTypeFilters .type-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  searchType = btn.dataset.type;
  renderSearch();
});

document.getElementById("bedFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll("#bedFilters .chip").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  minBeds = btn.dataset.beds;
  renderSearch();
});

document.getElementById("minPrice").addEventListener("input", (e) => {
  minPrice = e.target.value;
  renderSearch();
});

document.getElementById("maxPrice").addEventListener("input", (e) => {
  maxPrice = e.target.value;
  renderSearch();
});

document.getElementById("searchSort").addEventListener("change", (e) => {
  searchSort = e.target.value;
  renderSearch();
});

let searchTimeout;
document.getElementById("pageSearchInput").addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    activeArea = null;
    renderSearch();
  }, 200);
});

renderSearch();
setTimeout(initMap, 100);