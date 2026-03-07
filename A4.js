const allCard = document.getElementById("allCard");
const all = document.getElementById("all");
const open = document.getElementById("open");
const closed = document.getElementById("closed");

// async function lodeCatagories() {
//   const res = await fetch(
//     "https://phi-lab-server.vercel.app/api/v1/lab/issues",
//   );

//   const data = await res.json();
//   const details = data.data;

//   details.forEach((detail) => {
//     const card = document.createElement("div");
//     card.className = `w-11/12 mx-auto space-y-3 p-5 rounded-sm shadow-sm bg-white gap-4 border border-gray-200 ${detail.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-red-500"}`;

//     card.innerHTML = `

//       <div class="flex justify-between ">
//         <img src="${detail.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png"}"  />
//         <button>${detail.priority}</button>
//       </div>
//       <h2 class="text-xl font-bold">${detail.title}</h2>
//       <p class="line-clamp-2">
//         ${detail.description}
//       </p>
//       <div class="flex gap-4">
//           <button class="btn rounded-2xl bg-yellow-100 border-yellow-600">
//             Bug
//           </button>
//           <button class="btn rounded-2xl bg-red-200 border-red-950">
//             help wanted
//           </button>
//         </div>
//   `;

//     allCard.append(card);
//   });
// }
// lodeCatagories();

// async function selectcatagory() {
//   const allBtn = document.querySelectorAll("#button button");
//   allBtn.forEach((btn) => {
//     btn.addEventListener("click", function () {
//       allBtn.forEach((item) => {
//         item.classList.remove("btn-primary");
//         item.classList.add("btn-outline");
//       });
//       this.classList.add("btn-primary");
//       this.classList.remove("btn-outline");
//     });
//   });
// }
// selectcatagory();

// open.addEventListener("click", async function () {
//   allCard.innerHTML = ""; // clear previous cards

//   const res = await fetch(
//     "https://phi-lab-server.vercel.app/api/v1/lab/issues",
//   );
//   const data = await res.json();
//   const details = data.data;

//   details.forEach((detail) => {
//     if (detail.status === "open") {
//       // show only open issues
//       const card = document.createElement("div");

//       card.className = `w-11/12 mx-auto space-y-3 p-5 rounded-sm shadow-sm bg-white gap-4 ${detail.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-red-500"}`;

//       card.innerHTML = `
//         <div class="flex justify-between ">
//           <img src="assets/Open-Status.png" />
//           <button>${detail.priority}</button>
//         </div>
//         <h2 class="text-xl font-bold">${detail.title}</h2>
//         <p class="line-clamp-2">${detail.description}</p>
//         <div class="flex gap-4">
//             <button class="btn rounded-2xl bg-yellow-100 border-yellow-600">Bug</button>
//             <button class="btn rounded-2xl bg-red-200 border-red-950">help wanted</button>
//         </div>
//       `;

//       allCard.append(card);
//     }
//   });
// });

// closed.addEventListener("click", async function () {
//   allCard.innerHTML = ""; // clear previous cards

//   const res = await fetch(
//     "https://phi-lab-server.vercel.app/api/v1/lab/issues",
//   );
//   const data = await res.json();
//   const details = data.data;

//   details.forEach((detail) => {
//     if (detail.status === "closed") {
//       // show only open issues
//       const card = document.createElement("div");

//       card.className = `w-11/12 mx-auto space-y-3 p-5 rounded-sm shadow-sm bg-white gap-4  ${detail.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-red-500"}`;

//       card.innerHTML = `
//         <div class="flex justify-between ">
//           <img src="assets/Open-Status.png" />
//           <button>${detail.priority}</button>
//         </div>
//         <h2 class="text-xl font-bold">${detail.title}</h2>
//         <p class="line-clamp-2">${detail.description}</p>
//         <div class="flex gap-4">
//             <button class="btn rounded-2xl bg-yellow-100 border-yellow-600">Bug</button>
//             <button class="btn rounded-2xl bg-red-200 border-red-950">help wanted</button>
//         </div>
//       `;

//       allCard.append(card);
//     }
//   });
// });
// // "id": 1,
// // "title": "Fix navigation menu on mobile devices",
// // "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// // "status": "open",
// // "labels": [
// // "bug",
// // "help wanted"
// // ],
// // "priority": "high",
// // "author": "john_doe",
// // "assignee": "jane_smith",
// // "createdAt": "2024-01-15T10:30:00Z",
// // "updatedAt": "2024-01-15T10:30:00Z"
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let allData = [];

async function loadData() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allData = data.data;

  showCards(allData);
}

function showCards(details) {
  allCard.innerHTML = "";

  details.forEach((detail) => {
    const card = document.createElement("div");
    card.className = `w-11/12 mx-auto space-y-3 p-5 rounded-sm shadow-sm bg-white gap-4  ${detail.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-red-500"}`;
    card.innerHTML = `
    <div class="flex justify-between ">
         <img src="${detail.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png"}"  />
    
          <button class="btn rounded-full">${detail.priority}</button>
        </div>
       <h2 class="text-xl font-bold">${detail.title}</h2>
       <p class="line-clamp-2">${detail.description}</p>
         <div class="flex gap-4">
            <button class="btn rounded-2xl bg-yellow-100 border-yellow-600">Bug</button>
            <button class="btn rounded-2xl bg-red-200 border-red-950">help wanted</button>
        </div>
    <div class="border-t-1 border-t-gray-500">
          <p> #${detail.author}</p>
          <p>${detail.createdAt}</p>
        </div>
        </div>
    
    `;
    allCard.append(card);
  });
}
async function selectcatagory() {
  const allBtn = document.querySelectorAll("#button button");
  allBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      allBtn.forEach((item) => {
        item.classList.remove("btn-primary");
        item.classList.add("btn-outline");
      });
      this.classList.add("btn-primary");
      this.classList.remove("btn-outline");
    });
  });
}

document.getElementById("button").addEventListener("click", function (e) {
  const status = e.target.id;

  if (status === "all") {
    showCards(allData);
  } else {
    const filtered = allData.filter((item) => item.status === status);
    showCards(filtered);
  }
});
searchBtn.addEventListener("click", function () {
  const text = searchInput.value;
  const filtared = allData.filter((item) => item.title.includes(text));
  showCards(filtared);
});

loadData();
