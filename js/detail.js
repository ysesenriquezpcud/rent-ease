function startInquiry(propertyId, landlordName, propertyName) {
  const user = syncUserFromStorage();
  if (!user) return;

  const status = getAccountStatus(user);

  if (status === "unverified") {
    window.location.href = "unverified.html";
    return;
  }

  let list = [];
  try {
    list = JSON.parse(localStorage.getItem("rentease_messages") || "[]");
  } catch {}

  let conv = list.find(
    (c) => c.propertyId === propertyId && c.userEmail === user.email
  );

  if (!conv) {
    conv = {
      id: Date.now(),
      propertyId,
      propertyName,
      landlordName,
      userEmail: user.email,
      userName: user.name,
      status: status,
      messages: []
    };
    list.unshift(conv);
    localStorage.setItem("rentease_messages", JSON.stringify(list));
  } else {
    conv.status = status;
    localStorage.setItem("rentease_messages", JSON.stringify(list));
  }

  window.location.href = "messages.html?c=" + conv.id;
}

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

function renderDetail() {
  const id = getQueryId();
  const p = properties.find((x) => x.id === id);
  const root = document.getElementById("detailContent");
  if (!root) return;

  if (!p) {
    root.innerHTML = `<p class="empty-state">Property not found. <a href="index.html">Go home</a></p>`;
    return;
  }

  const typeLabel = p.type.charAt(0).toUpperCase() + p.type.slice(1);
  const reviews = p.reviewList || [];
  const beds = p.bedrooms != null ? p.bedrooms : p.beds;
  const baths = p.bathrooms != null ? p.bathrooms : p.baths;

  const similar = properties
    .filter((x) => x.id !== p.id && x.type === p.type)
    .slice(0, 4);
  const similarFallback =
    similar.length > 0
      ? similar
      : properties.filter((x) => x.id !== p.id).slice(0, 4);

  const landlord = p.landlord || { name: "Property Owner", verified: false };

  root.innerHTML = `
    <a href="javascript:history.back()" class="back-btn">← Back</a>

    <div class="detail-hero">
      <img src="${p.image}" alt="${p.name}" />
    </div>

    <div class="detail-top">
      <div class="detail-top-left">
        <h1 class="detail-title">${p.name}</h1>
        <p class="detail-location">${p.location}</p>
      </div>
      <div class="detail-top-meta">
        <span class="detail-type type-${p.type}">${typeLabel}</span>
        <div class="detail-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span>${p.rating.toFixed(1)} (${p.reviews} reviews)</span>
        </div>
        <div class="detail-price">${formatPrice(p.price)}<span>/month</span></div>
      </div>
    </div>

    <div class="detail-section">
      <h3>Description</h3>
      <p>${p.description || "No description available."}</p>
    </div>

    <div class="detail-grid-2">
      <div class="detail-section">
        <h3>Details</h3>
        <div class="detail-specs">
          <span class="spec">
            <img src="${icons.bed}" alt="" /> ${beds} Bedroom${beds !== 1 ? "s" : ""}
          </span>
          <span class="spec">
            <img src="${icons.bath}" alt="" /> ${baths} Bathroom${baths !== 1 ? "s" : ""}
          </span>
          <span class="spec">
            <img src="${icons.area}" alt="" /> ${p.area} m²
          </span>
        </div>
      </div>
      <div class="detail-section">
        <h3>Amenities</h3>
        <div class="detail-amenities">
          ${(p.amenities || [])
            .map((a) => `<span class="amenity-chip">${a}</span>`)
            .join("")}
        </div>
      </div>
    </div>

    <div class="detail-section landlord-section">
      <h3>Landlord</h3>
      <div class="landlord-row">
        <div class="landlord-avatar">${landlord.name.charAt(0)}</div>
        <div>
          <div class="landlord-name">${landlord.name}</div>
          <div class="landlord-meta">${landlord.verified ? "✓ Verified landlord" : "Landlord"}</div>
          ${landlord.phone ? `<div class="landlord-meta">${landlord.phone}</div>` : ""}
        </div>
        <button type="button" class="btn-inquire" id="inquireBtn">Inquire</button>
      </div>
    </div>

    <div class="detail-grid-2">
      <div class="detail-section">
        <h3>Reviews</h3>
        ${
          reviews.length === 0
            ? `<p style="color:var(--text-secondary);font-size:0.9rem">No reviews yet.</p>`
            : reviews
                .map(
                  (r) => `
          <div class="review-item">
            <div class="review-top">
              <div class="review-user">
                <div class="review-avatar">${r.name.charAt(0)}</div>
                <div>
                  <div class="review-name">${r.name}</div>
                  <div class="review-meta">${r.date}${r.stayed ? " · Stayed " + r.stayed : ""}</div>
                </div>
              </div>
              <span class="stars">${renderStars(r.rating)}</span>
            </div>
            <p class="review-text">${r.text}</p>
          </div>`
                )
                .join("")
        }
      </div>

      <div class="detail-section">
        <h3>More like this</h3>
        <div class="similar-list">
          ${
            similarFallback.length === 0
              ? `<p style="color:var(--text-secondary);font-size:0.9rem">No similar properties.</p>`
              : similarFallback
                  .map(
                    (s) => `
            <a class="similar-card" href="detail.html?id=${s.id}">
              <img src="${s.image}" alt="${s.name}" />
              <div class="similar-info">
                <h4>${s.name}</h4>
                <p>${s.location}</p>
                <div class="price">${formatPrice(s.price)}/mo</div>
              </div>
            </a>`
                  )
                  .join("")
          }
        </div>
      </div>
    </div>
  `;

  const inquireBtn = document.getElementById("inquireBtn");
  if (inquireBtn) {
    inquireBtn.addEventListener("click", () => {
      startInquiry(p.id, landlord.name, p.name);
    });
  }
}

requireAuth();
renderDetail();