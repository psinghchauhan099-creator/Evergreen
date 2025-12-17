// ================= BASE DATE =================
const relationshipStart = new Date(2022, 11, 14);

// ================= COUNTDOWNS =================
function getNextAnniversary() {
  const now = new Date();
  let year = now.getFullYear();
  let next = new Date(year, 11, 14);
  if (next < now) next = new Date(year + 1, 11, 14);
  return next;
}

function formatRemaining(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${d} days • ${h} hrs • ${m} mins`;
}

function updateCountdowns() {
  const now = new Date();

  document.getElementById("anniversaryCountdown").textContent =
    formatRemaining(getNextAnniversary() - now);

  let nextMonth = new Date(now.getFullYear(), now.getMonth(), 14);
  if (nextMonth < now) nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 14);

  document.getElementById("monthlyCountdown").textContent =
    formatRemaining(nextMonth - now);

  const diff = now - relationshipStart;
  const days = Math.floor(diff / 86400000);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(months / 12);

  document.getElementById("sinceMet").textContent =
    `${years} years • ${months % 12} months • ${days % 30} days together 💚`;
}

setInterval(updateCountdowns, 60000);
updateCountdowns();

// ================= MESSAGES =================
const categories = {
  cute: [
    "Sometimes I smile for no reason, and then I realise it’s you.",
    "Tumhari presence meri life ko soft bana deti hai.",
    "You make ordinary days feel peaceful.",
    "Tum ho toh cheezein easy lagti hain.",
    "You’re my calm thought in a busy world."
  ],
  romantic: [
    "Loving you feels natural, not forced.",
    "Tum meri choice ho, pressure nahi.",
    "With you, love feels safe and steady."
  ],
  future: [
    "I imagine a future where we grow together.",
    "Tum mere tomorrow ka comfort ho."
  ],
  comfort: [
    "Tum jaise ho, waise hi enough ho.",
    "I’m always on your side, quietly."
  ]
};

let currentCategory = "cute";
let order = [];
let index = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function switchCategory(cat, btn) {
  currentCategory = cat;
  index = 0;
  order = [...Array(categories[cat].length).keys()];
  shuffle(order);

  document.querySelectorAll(".tabs button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  newMessage();
}

function newMessage() {
  const box = document.getElementById("messageBox");
  if (index >= order.length) {
    shuffle(order);
    index = 0;
  }
  box.textContent = categories[currentCategory][order[index]];
  index++;
}

switchCategory("cute", document.querySelector(".tabs button.active"));

// ================= MUSIC (LOW VOLUME) =================
const music = new Audio("music/love.mp3");
music.loop = true;
music.volume = 0.2; // 🔉 SOFT BACKGROUND VOLUME

function toggleMusic() {
  const btn = document.querySelector(".music-btn");
  if (music.paused) {
    music.play();
    btn.textContent = "Pause Music ⏸️";
  } else {
    music.pause();
    btn.textContent = "Play Music 🎵";
  }
}