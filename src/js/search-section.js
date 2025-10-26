const API_URL = "https://rickandmortyapi.com/api/episode";
const episodeContainer = document.getElementById("episodeContainer");
const seasonSelect = document.getElementById("seasonSelect");
const searchBtn = document.getElementById("searchBtn");
const nameInput = document.getElementById("nameInput");

// Показуємо заставку при старті
showPlaceholder();

// При зміні сезону або натисканні пошуку — оновлюємо список
seasonSelect.addEventListener("change", loadEpisodes);
searchBtn.addEventListener("click", loadEpisodes);

async function loadEpisodes() {
  const season = seasonSelect.value;
  const name = nameInput.value.trim().toLowerCase();

  if (season === "all" && !name) {
    showPlaceholder();
    return;
  }

  episodeContainer.innerHTML = "<p>Loading...</p>";

  let url = API_URL;
  if (name) {
    url += `?name=${name}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results) {
      showPlaceholder();
      return;
    }

    // Фільтруємо епізоди по сезону
    const filtered = data.results.filter(ep => {
      if (season === "all") return true;
      return ep.episode.startsWith(season);
    });

    if (filtered.length === 0) {
      showPlaceholder();
      return;
    }

    // Відображаємо епізоди
    episodeContainer.innerHTML = filtered.map(ep => `
      <div class="card">
        <h3>${ep.name}</h3>
        <p><b>Season:</b> ${ep.episode.slice(1, 3)}</p>
        <p><b>Episode code:</b> ${ep.episode}</p>
        <p><b>Air date:</b> ${ep.air_date}</p>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    showPlaceholder();
  }
}

function showPlaceholder() {
  episodeContainer.innerHTML = `
    <div class="placeholder">
      <img src="https://upload.wikimedia.org/wikipedia/en/c/c8/Rick_and_Morty_logo.png" alt="Portal">
      <p>Oops! Try looking for something else...</p>
    </div>
  `;
}
// Завантажуємо всі епізоди при старті
loadEpisodes();
