const allCard = document.getElementById("allCard");
const all = document.getElementById("all");
const open = document.getElementById("open");
const closed = document.getElementById("closed");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const count = document.getElementById("count");

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
  count.innerText = details.length;
  allCard.innerHTML = "";

  details.forEach((detail) => {
    const borderColor =
      detail.status === "open"
        ? "border-t-4 border-t-green-500"
        : "border-t-4 border-t-[#A855F7]";

    const card = document.createElement("div");

    card.className = `space-y-3 p-5 rounded-sm shadow-sm bg-white gap-4 ${borderColor}`;

    card.innerHTML = `
    <div class="flex justify-between items-center ">
         <img class = "w-5 h-5" src="${detail.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png"}"  />
    
          <button class="btn rounded-full 
${
  detail.priority === "low"
    ? "bg-[#EEEFF2] text-[#9CA3AF]"
    : detail.priority === "medium"
      ? "bg-[#FFF6D1] text-[#F59E0B]"
      : "bg-[#FEECEC] text-[#EF4444]"
}">
${detail.priority}
</button>
        </div>
       <h2 class="text-xl font-bold">${detail.title}</h2>
       <p class="line-clamp-2">${detail.description}</p>
       <div class="flex gap-1"> 
  ${
    detail.labels[0]
      ? `<button class="btn rounded-2xl ${
          detail.labels[0] === "enhancement"
            ? "bg-[#BBF7D0] text-[#00A96E]"
            : detail.labels[0] === "bug"
              ? "bg-[#FECACA] text-[#EF4444]"
              : "bg-gray-200"
        }">${detail.labels[0]}</button>`
      : ""
  }

  ${
    detail.labels[1]
      ? `<button class="btn rounded-2xl ${
          detail.labels[1] === "enhancement"
            ? "bg-[#BBF7D0] text-[#00A96E]"
            : "bg-[#FFF8DB] text-[#F59E0B]"
        }">${detail.labels[1]}
        </button>`
      : ""
  }
</div>
  

      
    <div class="border-t-1 border-t-gray-500">
          <p> #${detail.author}</p>
       <p> ${new Date(detail.createdAt).toLocaleDateString()}</p>
        </div>
        </div>
    
    `;
    card.addEventListener("click", function () {
      lodeWordDetails(detail.id);
    });
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
selectcatagory();

const lodeWordDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displyWorddetails(details.data);
};

const displyWorddetails = (text) => {
  const datailscontainer = document.getElementById("datails-container");

  datailscontainer.innerHTML = `
        <h2>${text.title}</h2>
        <div class="flex gap-3">
          <button class="py-1 px-4 rounded-full ${
            text.status === "open"
              ? "bg-[#00A96E] text-[#FFFFFF]"
              : "bg-[#A855F7] text-[#FFFFFF]"
          }">
${text.status}
</button>
          <p>open by${text.author}</p>
         <p>|| ${new Date(text.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="flex gap-2">
        ${
          text.labels[0]
            ? `<button class="btn rounded-2xl ${
                text.labels[0] === "enhancement"
                  ? "bg-[#BBF7D0] text-[#00A96E]"
                  : text.labels[0] === "bug"
                    ? "bg-[#FECACA] text-[#EF4444]"
                    : "bg-gray-200"
              }">${text.labels[0]}</button>`
            : ""
        }

  ${
    text.labels[1]
      ? `<button class="btn rounded-2xl ${
          text.labels[1] === "enhancement"
            ? "bg-[#BBF7D0] text-[#00A96E]"
            : "bg-[#FFF8DB] text-[#F59E0B]"
        }">${text.labels[1]}
        </button>`
      : ""
  }
       
        </div>
        <p class="text-[#64748B]">
        ${text.description}
        </p>
        <div class="flex justify-between p-3 shadow-sm">
          <div class="space-y-1">
            <p>Assignee:</p>
            <p class = "font-bold">${text.author}</p>
          </div>
          <div class="space-y-1">
            <p class ="p-2"> Priority:</p>
<button class="btn rounded-full ${
    text.priority === "low"
      ? "bg-[#EEEFF2] text-[#9CA3AF]"
      : text.priority === "medium"
        ? "bg-[#FFF6D1] text-[#F59E0B]"
        : "bg-[#FEECEC] text-[#EF4444]"
  }">
${text.priority}
</button>
          </div>
        </div>


    `;

  document.getElementById("my_modal_5").showModal();
};

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
  const text = searchInput.value.toLowerCase();
  const filtared = allData.filter((item) =>
    item.title.toLowerCase().includes(text),
  );
  showCards(filtared);
});

loadData();
