const CATEGORIES = [
  "apartment",
  "condominium",
  "dormitory",
  "duplex",
  "house",
  "townhouse"
];

function getHeaderSuggestions(query) {
  const q = query.trim().toLowerCase();
  if (!q) return { categories: [], properties: [], empty: true };

  const categories = CATEGORIES.filter((c) => c.startsWith(q) || c.includes(q));
  const props = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
  );

  return {
    categories,
    properties: props.slice(0, 6),
    empty: categories.length === 0 && props.length === 0
  };
}

function renderHeaderDropdown(query) {
  const dropdown = document.getElementById("headerSearchDropdown");
  if (!dropdown) return;

  const { categories, properties: props, empty } = getHeaderSuggestions(query);

  if (!query.trim()) {
    dropdown.innerHTML = `<div class="hs-empty">No Search Found.</div>`;
    return;
  }

  if (empty) {
    dropdown.innerHTML = `<div class="hs-empty">No Search Found.</div>`;
    return;
  }

  let html = "";

  if (categories.length) {
    html += `<div class="hs-section-label">Categories</div>`;
    categories.forEach((c) => {
      const label = c.charAt(0).toUpperCase() + c.slice(1);
      html += `
        <a class="hs-item" href="search.html?type=${encodeURIComponent(c)}">
          <span class="hs-item-title">${label}</span>
          <span class="hs-item-sub">Property type</span>
        </a>`;
    });
  }

  if (props.length) {
    html += `<div class="hs-section-label">Properties</div>`;
    props.forEach((p) => {
      html += `
        <a class="hs-item" href="detail.html?id=${p.id}">
          <span class="hs-item-title">${p.name}</span>
          <span class="hs-item-sub">${p.location} · ${p.type}</span>
        </a>`;
    });
  }

  dropdown.innerHTML = html;
}

function openHeaderDropdown() {
  const dropdown = document.getElementById("headerSearchDropdown");
  const input = document.getElementById("headerSearchInput");
  if (!dropdown || !input) return;
  renderHeaderDropdown(input.value);
  dropdown.classList.add("open");
}

function closeHeaderDropdown() {
  const dropdown = document.getElementById("headerSearchDropdown");
  if (dropdown) dropdown.classList.remove("open");
}

function initHeaderSearch() {
  const wrap = document.getElementById("headerSearchWrap");
  const input = document.getElementById("headerSearchInput");
  const dropdown = document.getElementById("headerSearchDropdown");
  if (!wrap || !input || !dropdown) return;

  input.addEventListener("focus", openHeaderDropdown);
  input.addEventListener("click", openHeaderDropdown);

  input.addEventListener("input", () => {
    renderHeaderDropdown(input.value);
    dropdown.classList.add("open");
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const q = input.value.trim();
      if (q) {
        window.location.href = `search.html?q=${encodeURIComponent(q)}`;
      }
    }
    if (e.key === "Escape") {
      closeHeaderDropdown();
      input.blur();
    }
  });

  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) {
      closeHeaderDropdown();
    }
  });
}

initHeaderSearch();