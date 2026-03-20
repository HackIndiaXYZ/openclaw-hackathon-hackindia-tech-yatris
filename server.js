// // const express = require("express");
// // const cors = require("cors");
// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // /* 🔑 Fake Database */
// // let apiKeys = [];

// // /* 🎯 GENERATE API KEY */
// // app.post("/generate-key", (req, res) => {
// //   const newKey = "HP_" + Math.random().toString(36).substring(2, 15);

// //   apiKeys.push(newKey);

// //   res.json({ apiKey: newKey });
// // });

// // /* ✅ VERIFY API KEY */
// // app.post("/verify-key", (req, res) => {
// //   const { apiKey } = req.body;

// //   if (apiKeys.includes(apiKey)) {
// //     res.json({ valid: true });
// //   } else {
// //     res.json({ valid: false });
// //   }
// // });

// // app.listen(3000, () => console.log("Server running on port 3000"));

// // async function getApiKey() {
// //   const res = await fetch("http://localhost:3000/generate-key", {
// //     method: "POST"
// //   });

// //   const data = await res.json();

// //   alert("Your API Key: " + data.apiKey);
// // }
// // const sections = document.querySelectorAll("section");

// // window.addEventListener("scroll", () => {
// //   sections.forEach(section => {
// //     const rect = section.getBoundingClientRect();

// //     if (rect.top < window.innerHeight - 100) {
// //       section.classList.add("show");
// //     }
// //   });
// // });

// // // 👉 Go to HOW WORK section
// // function goToWork() {
// //   document.getElementById("howWork").scrollIntoView({
// //     behavior: "smooth"
// //   });
// // }

// // // 👉 Go to CONTACT section
// // function goToContact() {
// //   document.getElementById("contact").scrollIntoView({
// //     behavior: "smooth"
// //   });
// // }


// // function goToWork() {
// //   document.body.style.transition = "0.4s";
// //   document.body.style.transform = "scale(0.98)";

// //   setTimeout(() => {
// //     document.getElementById("howWork").scrollIntoView({
// //       behavior: "smooth"
// //     });

// //     document.body.style.transform = "scale(1)";
// //   }, 200);
// // }

// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// let apiKeys = [];

// // Generate API key
// app.post("/generate-key", (req, res) => {
//   const key = "HP_" + Math.random().toString(36).substring(2, 15);
//   apiKeys.push(key);
//   res.json({ apiKey: key });
// });

// // Verify human or bot
// app.post("/verify-human", (req, res) => {
//   const { score, apiKey } = req.body;

//   if (!apiKeys.includes(apiKey)) {
//     return res.json({ success: false, message: "Invalid API Key" });
//   }

//   let result = "bot";
//   let confidence = 0;

//   if (score > 70) {
//     result = "human";
//     confidence = score;
//   } else if (score > 30) {
//     result = "suspicious";
//     confidence = score;
//   } else {
//     result = "bot";
//     confidence = score;
//   }

//   res.json({
//     success: true,
//     result,
//     confidence,
//     timestamp: Date.now()
//   });
// });

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let apiKeys = [];

app.post("/generate-key", (req, res) => {
  const key = "HP_" + Math.random().toString(36).substring(2, 15);
  apiKeys.push(key);
  res.json({ apiKey: key });
});

app.post("/verify-human", (req, res) => {
  const { score, apiKey } = req.body;

  if (!apiKeys.includes(apiKey)) {
    return res.json({ result: "invalid key" });
  }

  if (score > 70) return res.json({ result: "human" });
  if (score > 30) return res.json({ result: "suspicious" });

  return res.json({ result: "bot" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});