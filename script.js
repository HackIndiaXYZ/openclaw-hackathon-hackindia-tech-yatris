console.log("JS RUNNING ✅");

let area = document.getElementById("demoArea");

let curiosity = 0;
let attention = 0;
let flow = 0;

let lastTime = Date.now();
let lastX = 0;
let lastY = 0;

/* =========================
   MAIN TRACKING (IMPORTANT)
========================= */
area.addEventListener("mousemove", (e) => {

  let now = Date.now();

  let dx = Math.abs(e.clientX - lastX);
  let dy = Math.abs(e.clientY - lastY);
  let distance = dx + dy;

  let timeDiff = now - lastTime;

  // Curiosity
  if (distance > 5) curiosity++;

  // Attention
  if (timeDiff > 50 && timeDiff < 300) attention++;

  // Flow
  if (distance < 50) flow++;

  // Score
  let score = Math.min(curiosity + attention + flow, 100);

  // ✅ SEND TO BACKEND
  sendScore(score);

  // Update UI
  document.getElementById("curiosity").innerText = curiosity;
  document.getElementById("attention").innerText = attention;
  document.getElementById("flow").innerText = flow;
  document.getElementById("score").innerText = score;

  document.getElementById("progressFill").style.width = score + "%";

  // Status
  let status = document.getElementById("status");

  if (score < 30) {
    status.innerText = "Bot-like behavior";
    status.style.color = "red";
  } else if (score < 70) {
    status.innerText = "Analyzing...";
    status.style.color = "orange";
  } else {
    status.innerText = "Human detected ✅";
    status.style.color = "lime";
  }

  lastX = e.clientX;
  lastY = e.clientY;
  lastTime = now;

  updateVerdict(score);
});

/* =========================
   FINAL VERDICT
========================= */
let verdict = document.getElementById("finalVerdict");

function updateVerdict(score) {
  if (!verdict) return;

  if (score > 70) {
    verdict.innerText = "Human ✅";
    verdict.style.color = "lime";
  } else {
    verdict.innerText = "Bot ❌";
    verdict.style.color = "red";
  }
}

/* =========================
   SCROLL BAR
========================= */
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scrollTop / height) * 100;

  document.querySelector(".scroll-bar").style.width = progress + "%";
});

/* =========================
   BACKGROUND ANIMATION
========================= */
document.addEventListener("mousemove", (e) => {
  let x = (window.innerWidth / 2 - e.clientX) / 40;
  let y = (window.innerHeight / 2 - e.clientY) / 40;

  document.querySelector(".hero").style.transform =
    `translate(${x}px, ${y}px)`;
});

/* =========================
   API KEY
========================= */
async function getApiKey() {
  const res = await fetch("http://localhost:3000/generate-key", {
    method: "POST"
  });

  const data = await res.json();

  localStorage.setItem("apiKey", data.apiKey);

  alert("API Key saved ✅");
}

/* =========================
   SEND SCORE TO BACKEND
========================= */
async function sendScore(score) {
  const apiKey = localStorage.getItem("apiKey");

  if (!apiKey) return;

  const res = await fetch("http://localhost:3000/verify-human", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ score, apiKey })
  });

  const data = await res.json();
  console.log("Result:", data);
}