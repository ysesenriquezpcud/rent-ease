const ADMIN_EMAIL = "admin@rentease.com";
const ADMIN_PASSWORD = "admin123";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("rentease_user") || "null");
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem("rentease_user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("rentease_user");
  window.location.href = "login.html";
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  return user;
}

function getRegisterDraft() {
  try {
    return JSON.parse(localStorage.getItem("rentease_register_draft") || "{}");
  } catch {
    return {};
  }
}

function saveRegisterDraft(data) {
  const current = getRegisterDraft();
  localStorage.setItem(
    "rentease_register_draft",
    JSON.stringify({ ...current, ...data })
  );
}

function clearRegisterDraft() {
  localStorage.removeItem("rentease_register_draft");
}

function getUserRecord(email) {
  if (!email) return null;
  const users = JSON.parse(localStorage.getItem("rentease_users") || "[]");
  return (
    users.find(
      (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
    ) || null
  );
}

function getAccountStatus(user) {
  if (!user) return "unverified";
  if (user.role === "admin") return "verified";
  if (user.status) return user.status;
  if (user.verified) return "verified";
  const rec = getUserRecord(user.email);
  if (rec) {
    if (rec.status) return rec.status;
    if (rec.verified) return "verified";
  }
  return "unverified";
}

function updateUserStatus(email, status, verified) {
  const users = JSON.parse(localStorage.getItem("rentease_users") || "[]");
  const i = users.findIndex(
    (u) => u.email && u.email.toLowerCase() === email.toLowerCase()
  );
  if (i >= 0) {
    users[i].status = status;
    users[i].verified = !!verified;
    localStorage.setItem("rentease_users", JSON.stringify(users));
  }
  const cur = getCurrentUser();
  if (cur && cur.email && cur.email.toLowerCase() === email.toLowerCase()) {
    cur.status = status;
    cur.verified = !!verified;
    setCurrentUser(cur);
  }
}

function syncUserFromStorage() {
  const cur = getCurrentUser();
  if (!cur || cur.role === "admin") return cur;
  const rec = getUserRecord(cur.email);
  if (rec) {
    cur.status = rec.status || (rec.verified ? "verified" : "unverified");
    cur.verified = !!rec.verified;
    setCurrentUser(cur);
  }
  return cur;
}