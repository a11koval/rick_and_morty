const API_URL = "https://rickandmortyapi.com/api/episode";
const episodesContainer = document.getElementById("episodesContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const selectSeason = document.getElementById("selectSeason");
const searchInput = document.getElementById("searchName");
const searchBtn = document.getElementById("searchBtn");

let allEpisodes = [];
let filteredEpisodes = [];
let visibleCount = 20;


async function fetchEpisodes() {
  try {
    let nextPage = API_URL;

    while (nextPage) {
      const res = await fetch(nextPage);
      const data = await res.json();
      allEpisodes.push(...data.results);
      nextPage = data.info.next;
    }

   
    allEpisodes = allEpisodes.filter(ep => {
      const seasonCode = ep.episode.slice(0, 3); 
      return ["S01", "S02", "S03", "S04", "S05"].includes(seasonCode);
    });

    filteredEpisodes = allEpisodes;
    renderEpisodes();
  } catch (error) {
    console.error("Error fetching episodes:", error);
    showPlaceholder(true);
  }
}


function renderEpisodes() {
  episodesContainer.innerHTML = "";

  const visibleEpisodes = filteredEpisodes.slice(0, visibleCount);

  if (visibleEpisodes.length === 0) {
    showPlaceholder(true);
    return;
  }

  showPlaceholder(false);

  visibleEpisodes.forEach((ep) => {
    const card = document.createElement("div");
    card.classList.add("episode-card");
    card.innerHTML = `
      <img src="images/season-corect.png" alt="${ep.name}" onerror="this.src='img/portal.png'">
      <div class="episode-info">
        <h3>${ep.name}</h3>
        <p>Season: ${ep.episode.slice(1, 3)}</p>
        <p>Air date: ${ep.air_date}</p>
      </div>
    `;
    episodesContainer.appendChild(card);
  });

  loadMoreBtn.style.display = filteredEpisodes.length > visibleCount ? "block" : "none";
}


function applyFilters() {
  const season = selectSeason.value;
  const searchValue = searchInput.value.trim().toLowerCase();

  filteredEpisodes = allEpisodes.filter((ep) => {
    const matchSeason = season === "all" || ep.episode.startsWith(season);
    const matchName = ep.name.toLowerCase().includes(searchValue);
    return matchSeason && matchName;
  });

  visibleCount = 20;
  renderEpisodes();
}


function showPlaceholder(show) {
  if (show) {
    episodesContainer.innerHTML = `
      <div class="placeholder">
        <img src="images/portal.png" alt="Portal" />
        <p>Oops! Try looking for something else...</p>
      </div>
    `;
    loadMoreBtn.style.display = "none";
  }
}


loadMoreBtn.addEventListener("click", () => {
  visibleCount += 20;
  renderEpisodes();
});


selectSeason.addEventListener("change", applyFilters);
searchBtn.addEventListener("click", applyFilters);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") applyFilters();
});


fetchEpisodes();
