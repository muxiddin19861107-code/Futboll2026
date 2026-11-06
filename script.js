
const players = [
    {name:"Cristiano Ronaldo",age:41,club:"Al Nassr",country:"Portugal",goals:950},
    {name:"Lionel Messi",age:39,club:"Inter Miami",country:"Argentina",goals:890},
    {name:"Robert Lewandowski",age:38,club:"Barcelona",country:"Poland",goals:700},
    {name:"Mohamed Salah",age:34,club:"Liverpool",country:"Egypt",goals:350},
    {name:"Neymar Jr",age:34,club:"Santos",country:"Brazil",goals:440},
    {name:"Kylian Mbappe",age:27,club:"Real Madrid",country:"France",goals:400},
    {name:"Erling Haaland",age:26,club:"Manchester City",country:"Norway",goals:280},
    {name:"Harry Kane",age:33,club:"Bayern Munich",country:"England",goals:450},
    {name:"Vinicius Junior",age:26,club:"Real Madrid",country:"Brazil",goals:120},
    {name:"Jude Bellingham",age:23,club:"Real Madrid",country:"England",goals:80},
    {name:"Luka Modric",age:41,club:"AC Milan",country:"Croatia",goals:100},
    {name:"Kevin De Bruyne",age:35,club:"Napoli",country:"Belgium",goals:110},
    {name:"Sadio Mane",age:34,club:"Al Nassr",country:"Senegal",goals:220},
    {name:"Lamine Yamal",age:19,club:"Barcelona",country:"Spain",goals:35},
    {name:"Phil Foden",age:26,club:"Manchester City",country:"England",goals:100},
    {name:"Bukayo Saka",age:25,club:"Arsenal",country:"England",goals:75},
    {name:"Abbosbek Fayzullayev",age:23,club:"Istanbul Basaksehir",country:"Uzbekistan",goals:15},
    {name:"Abduqodir Husanov",age:22,club:"Manchester City",country:"Uzbekistan",goals:2},
    {name:"Son Heung-min",age:34,club:"LAFC",country:"South Korea",goals:250},
    {name:"Antoine Griezmann",age:35,club:"Atletico Madrid",country:"France",goals:280}
];

const grid = document.getElementById("playersGrid");
const search = document.getElementById("searchInput");
const sort = document.getElementById("sortSelect");
const count = document.getElementById("playerCount");
const empty = document.getElementById("emptyMessage");

function renderPlayers() {
    if (!grid || !search || !sort) {
        console.error("HTML elementlari topilmadi!");
        return;
    }

    const query = search.value.trim().toLowerCase();

    let list = players.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.club.toLowerCase().includes(query) ||
        p.country.toLowerCase().includes(query)
    );

    if (sort.value === "goals") {
        list.sort((a,b) => b.goals - a.goals);
    } else if (sort.value === "age") {
        list.sort((a,b) => a.age - b.age);
    } else {
        list.sort((a,b) => a.name.localeCompare(b.name));
    }

    const ranked = [...players].sort((a,b) => b.goals - a.goals);

    grid.innerHTML = "";

    count.textContent = list.length + " futbolchi";

    if (empty) empty.hidden = list.length !== 0;

    list.forEach(player => {
        const rank = ranked.findIndex(p => p.name === player.name) + 1;

        const card = document.createElement("div");
        card.className = "player-card";

        card.innerHTML = `
            <div class="player-image">
                <div style="height:220px;display:flex;align-items:center;justify-content:center;background:#1b2940;font-size:55px;font-weight:900;color:#b5f32d">
                    ${player.name.split(" ").map(x=>x[0]).join("")}
                </div>
                <span class="rank">#${rank}</span>
            </div>
            <div class="player-details">
                <h3>${player.name}</h3>
                <p>${player.club} · ${player.country}</p>
                <div class="player-stats">
                    <div><span>Yoshi</span><br><strong>${player.age}</strong></div>
                    <div><span>Gollari</span><br><strong>${player.goals}</strong></div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

function renderRanking() {
    const tbody = document.getElementById("rankingBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    [...players].sort((a,b) => b.goals-a.goals).forEach((p,i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>#${i+1}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.club}</td>
            <td>${p.goals}</td>
        `;
        tbody.appendChild(row);
    });
}

search.addEventListener("input", renderPlayers);
sort.addEventListener("change", renderPlayers);

renderPlayers();
renderRanking();

