function getMessages() {
  try {
    return JSON.parse(localStorage.getItem("rentease_messages") || "[]");
  } catch {
    return [];
  }
}

function saveMessages(list) {
  localStorage.setItem("rentease_messages", JSON.stringify(list));
}

const PRESETS = [
  "Is this still available?",
  "Can I schedule a viewing?",
  "Are utilities included in the rent?",
  "Is the price negotiable?",
  "What is the minimum lease period?"
];

let activeConvId = null;

function renderConvList() {
  const user = getCurrentUser();
  if (!user) return;
  const list = getMessages().filter((c) => c.userEmail === user.email);
  const el = document.getElementById("convList");
  if (!el) return;
  el.innerHTML = `<h2>Messages</h2>`;

  if (list.length === 0) {
    el.innerHTML += `<p style="padding:1rem;font-size:0.85rem;color:var(--text-secondary)">No conversations yet. Use Inquire on a property page.</p>`;
    return;
  }

  list.forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "conv-item" + (c.id === activeConvId ? " active" : "");
    btn.innerHTML = `<strong>${c.landlordName}</strong><span>${c.propertyName}</span>`;
    btn.addEventListener("click", () => openConv(c.id));
    el.appendChild(btn);
  });
}

function openConv(id) {
  activeConvId = id;
  const user = syncUserFromStorage();
  if (!user) return;
  const status = getAccountStatus(user);
  const conv = getMessages().find((c) => c.id === id);
  if (!conv) return;

  document.getElementById("chatEmpty").style.display = "none";
  document.getElementById("chatThread").style.display = "flex";
  document.getElementById("chatHeader").textContent =
    conv.landlordName + " · " + conv.propertyName;

  const notice = document.getElementById("chatNotice");
  const presets = document.getElementById("chatPresets");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const sendBtn = form.querySelector("button");

  if (status === "unverified") {
    window.location.href = "unverified.html";
    return;
  }

  if (status === "pending") {
    notice.style.display = "block";
    notice.textContent =
      "Your account is being processed for verification. Chat is disabled until an admin verifies your documents. You will be notified once verification is complete.";
    presets.style.display = "none";
    input.disabled = true;
    sendBtn.disabled = true;
    form.classList.add("disabled");
  } else {
    notice.style.display = "none";
    presets.style.display = "flex";
    input.disabled = false;
    sendBtn.disabled = false;
    form.classList.remove("disabled");
    presets.innerHTML = PRESETS.map(
      (t) => `<button type="button" class="preset-chip">${t}</button>`
    ).join("");
    presets.querySelectorAll(".preset-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        input.value = chip.textContent;
        input.focus();
      });
    });
  }

  const body = document.getElementById("chatBody");
  body.innerHTML = (conv.messages || [])
    .map(
      (m) =>
        `<div class="msg-bubble ${m.from === "me" ? "me" : "them"}">${m.text}</div>`
    )
    .join("");
  body.scrollTop = body.scrollHeight;
  renderConvList();
}

const chatForm = document.getElementById("chatForm");
if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = syncUserFromStorage();
    if (!user || getAccountStatus(user) !== "verified") return;
    if (!activeConvId) return;

    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    const list = getMessages();
    const conv = list.find((c) => c.id === activeConvId);
    if (!conv) return;

    conv.messages.push({ from: "me", text, at: new Date().toISOString() });
    saveMessages(list);
    input.value = "";
    openConv(activeConvId);

    setTimeout(() => {
      const list2 = getMessages();
      const c2 = list2.find((c) => c.id === activeConvId);
      if (!c2) return;
      c2.messages.push({
        from: "them",
        text: "Thanks for your message! I'll get back to you shortly.",
        at: new Date().toISOString()
      });
      saveMessages(list2);
      openConv(activeConvId);
    }, 800);
  });
}

(function initMessagesPage() {
  const user = syncUserFromStorage();
  if (!user) return;

  if (getAccountStatus(user) === "unverified") {
    window.location.href = "unverified.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const openId = parseInt(params.get("c"), 10);
  renderConvList();
  if (openId) openConv(openId);
})();