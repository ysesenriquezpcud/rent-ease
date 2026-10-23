function renderCard(p) {
  const saved = isSaved(p.id);
  const typeLabel = p.type.charAt(0).toUpperCase() + p.type.slice(1);
  const beds = p.bedrooms != null ? p.bedrooms : p.beds;
  const baths = p.bathrooms != null ? p.bathrooms : p.baths;
  const amenityPreview = (p.amenities || []).slice(0, 4);
  const hasMore = (p.amenities || []).length > 4;

  return `
    <article class="card" data-id="${p.id}">
      <div class="card-image">
        <img src="${p.image}" alt="${p.name}" />
        <button type="button" class="bookmark-btn ${saved ? "saved" : ""}" data-id="${p.id}" aria-label="Save">
          <svg viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span class="heart-splash"></span>
        </button>
        <span class="card-type type-${p.type}">${typeLabel}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-location">${p.location}</p>
        <div class="card-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span>${p.rating.toFixed(1)} (${p.reviews} review${p.reviews === 1 ? "" : "s"})</span>
        </div>
        <div class="card-price">${formatPrice(p.price)}<span>/month</span></div>
        <div class="card-specs">
          <span class="spec"><img src="${icons.bed}" alt="" /> ${beds} Bedroom${beds !== 1 ? "s" : ""}</span>
          <span class="spec"><img src="${icons.bath}" alt="" /> ${baths} Bathroom${baths !== 1 ? "s" : ""}</span>
          <span class="spec"><img src="${icons.area}" alt="" /> ${p.area} m²</span>
          ${
            p.storeys
              ? `<span class="spec"><img src="${icons.storey}" alt="" /> ${p.storeys} Storey</span>`
              : ""
          }
        </div>
        <div class="card-amenities">
          ${amenityPreview.map((a) => `<span>${a}</span>`).join("")}
          ${hasMore ? `<a class="more" href="detail.html?id=${p.id}">More...</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

function bindCardEvents(container) {
  if (!container) return;

  container.querySelectorAll(".bookmark-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(btn.dataset.id, 10);
      toggleSave(id);
      btn.classList.toggle("saved", isSaved(id));
      btn.classList.remove("splash");
      void btn.offsetWidth;
      btn.classList.add("splash");
    });
  });

  container.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".bookmark-btn") || e.target.closest(".more")) return;
      window.location.href = "detail.html?id=" + card.dataset.id;
    });
  });
}