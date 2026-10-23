function renderProfile() {
  const user = syncUserFromStorage();
  const root = document.getElementById("profileRoot");
  if (!root || !user) return;

  const full = getUserRecord(user.email);
  const status = getAccountStatus(user);
  const name =
    user.name || (full ? `${full.firstName} ${full.surname}` : "User");
  const email = user.email || "—";
  const phone = full && full.phone ? `+63 ${full.phone}` : "—";
  const avatarKey = "rentease_avatar_" + (user.email || "user");
  const savedAvatar = localStorage.getItem(avatarKey);
  const initial = name.charAt(0).toUpperCase();

  const statusLabel =
    status === "verified"
      ? "Verified"
      : status === "pending"
      ? "Pending verification"
      : "Unverified";

  const badgeClass = status === "verified" ? "verified" : "unverified";
  const badgeText =
    status === "verified"
      ? "✓ Verified account"
      : status === "pending"
      ? "⏳ Pending verification"
      : "○ Not verified yet";

  root.innerHTML = `
    <div class="profile-layout">
      <aside class="profile-sidebar">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar" id="avatarDisplay">
            ${savedAvatar ? `<img src="${savedAvatar}" alt="Avatar" />` : initial}
          </div>
          <label class="profile-avatar-btn" title="Change photo">
            ✎
            <input type="file" accept="image/*" id="avatarInput" />
          </label>
        </div>
        <div class="profile-name">${name}</div>
        <span class="profile-badge ${badgeClass}">${badgeText}</span>
        ${
          status === "unverified"
            ? `<a href="verify.html" class="btn-auth btn-auth-primary" style="margin-top:1rem;display:inline-block">Verify account</a>`
            : ""
        }
      </aside>

      <div class="profile-main">
        <h2>Account information</h2>
        <div class="profile-row">
          <span class="profile-label">Email</span>
          <span class="profile-value">${email}</span>
        </div>
        <div class="profile-row">
          <span class="profile-label">Phone</span>
          <span class="profile-value">${phone}</span>
        </div>
        <div class="profile-row">
          <span class="profile-label">Status</span>
          <span class="profile-value">${statusLabel}</span>
        </div>
        ${
          full && full.suffix
            ? `<div class="profile-row">
                <span class="profile-label">Suffix</span>
                <span class="profile-value">${full.suffix}</span>
              </div>`
            : ""
        }
        <div class="profile-actions">
          <button type="button" class="btn-logout" id="logoutBtn">Log out</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Log out of RentEase?")) logout();
  });

  document.getElementById("avatarInput").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem(avatarKey, reader.result);
      document.getElementById("avatarDisplay").innerHTML =
        `<img src="${reader.result}" alt="Avatar" />`;
    };
    reader.readAsDataURL(file);
  });
}

renderProfile();