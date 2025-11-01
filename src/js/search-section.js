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

    card.setAttribute('data-episode-id', ep.id);

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
/* ===========================
   Modal + Delegated Clicks
   =========================== */

(function () {
  // Переконаємось, що елементи існують
  if (!episodesContainer) {
    console.error("episodesContainer не знайдено — перевір, що id='episodesContainer' в HTML.");
    return;
  }

  // Створюємо/відкриваємо модалку
  async function openEpisodeModal(episode) {
    try {
      // Видаляємо стару модалку, якщо є
      const old = document.querySelector(".episode-modal");
      if (old) old.remove();

      // Контейнер модалки
      const modal = document.createElement("div");
      modal.className = "episode-modal";

      modal.innerHTML = `
        <div class="modal-season-backdrop"></div>
        <div class="modal-window" role="dialog" aria-modal="true">
          <button class="modal-close" aria-label="Close">&times;</button>
          <h2 class="modal-title">${escapeHtml(episode.name)}</h2>
          <div class="modal-details">
            <p><strong>ID:</strong> ${episode.id}</p>
            <p><strong>Air date:</strong> ${escapeHtml(episode.air_date)}</p>
            <p><strong>Code:</strong> ${escapeHtml(episode.episode)}</p>
          </div>
          <h3>Characters</h3>
          <div class="modal-characters"><p>Loading characters...</p></div>
        </div>
      `;

      document.body.appendChild(modal);
      // фокус на модалку
      modal.querySelector(".modal-window").focus?.();

      // Закриття
      const removeModal = () => modal.remove();
      modal.querySelector(".modal-close").addEventListener("click", removeModal);
      modal.querySelector(".modal-season-backdrop").addEventListener("click", removeModal);
      window.addEventListener(
        "keydown",
        function escHandler(e) {
          if (e.key === "Escape") {
            removeModal();
            window.removeEventListener("keydown", escHandler);
          }
        }
      );

      // Завантажуємо персонажів (перші 6)
      const charactersBox = modal.querySelector(".modal-characters");
      const charUrls = episode.characters.slice(0, 6);
      if (charUrls.length === 0) {
        charactersBox.innerHTML = "<p>No characters</p>";
        return;
      }

      try {
        const chars = await Promise.all(
          charUrls.map((url) =>
            fetch(url).then((res) => {
              if (!res.ok) throw new Error("character fetch failed: " + res.status);
              return res.json();
            })
          )
        );
        charactersBox.innerHTML = chars
          .map(
            (c) => `
            <div class="char">
              <img src="${escapeAttr(c.image)}" alt="${escapeAttr(c.name)}">
              <div class="char-name">${escapeHtml(c.name)}</div>
            </div>`
          )
          .join("");
      } catch (err) {
        console.error("Error loading characters:", err);
        charactersBox.innerHTML = "<p>Error loading characters</p>";
      }
    } catch (err) {
      console.error("openEpisodeModal error:", err);
    }
  }

  // Функція-утиліта для безпечного вставляння тексту
  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, "&quot;");
  }

  // Делегуємо клік на контейнері — коли створюєш картки, вони повинні мати data-attribute with index or id
  // Ми знайдемо епізод за ім'ям/ID у filteredEpisodes (змінна з твого коду).
  episodesContainer.addEventListener("click", function (e) {
    // шукаємо батьківський .episode-card
    const card = e.target.closest(".episode-card");
    if (!card) return;

    // Зчитуємо унікальні дані з DOM; краще покласти data-episode-id при рендері
    const epName = card.querySelector(".episode-info h3")?.textContent?.trim();
    const epCode = card.querySelector(".episode-info p")?.textContent?.trim();

    // Спосіб 1: якщо в карці помістили data-id при рендері — шукай по id
    let epId = card.getAttribute("data-episode-id");
    let episodeObj;

    if (epId && window.allEpisodes) {
      episodeObj = window.allEpisodes.find((x) => String(x.id) === String(epId));
    } else if (epName && window.filteredEpisodes) {
      // fallback - шукаємо по імені (менш надійно, але працює)
      episodeObj = window.filteredEpisodes.find((x) => x.name === epName);
    }

    if (!episodeObj) {
      console.warn("Episode object not found for clicked card. Consider adding data-episode-id to cards.");
      // Показати швидке повідомлення в консолі
      return;
    }

    openEpisodeModal(episodeObj);
  });

  // Рекомендація: коли рендериш картки, додавай data-episode-id — тоді делегування працює стабільно.
  // Тут приклад, як змінити рендерEpisodes (якщо хочеш мінімально змінити):
  // в renderEpisodes() при створенні card:
  // card.setAttribute('data-episode-id', ep.id);

  // ---------- Для безпеки зробимо allEpisodes та filteredEpisodes глобально доступними (тільки якщо вони існують) ----------
  if (!window.allEpisodes && typeof allEpisodes !== "undefined") window.allEpisodes = allEpisodes;
  if (!window.filteredEpisodes && typeof filteredEpisodes !== "undefined") window.filteredEpisodes = filteredEpisodes;
})();