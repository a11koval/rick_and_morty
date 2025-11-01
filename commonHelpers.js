import"./assets/vendor-6837a909.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const M=["Animated","the adventures","Justin Roiland","superpower","creative","amazing","Sitcom","comics","follows","characters","whoa","Rick and Morty"],b=document.getElementById("divider");M.forEach((n,o)=>{const t=document.createElement("span");t.textContent=n,t.className=`chip ${o%2===0?"light":"dark"}`;const e=(Math.random()>.6?180:0)+(Math.random()*30-15);t.style.setProperty("--angle",`${e}deg`),t.style.animationDelay=`${Math.random()*2}s`,b.appendChild(t)});const k="https://rickandmortyapi.com/api/episode",h=document.getElementById("episodesContainer"),v=document.getElementById("loadMoreBtn"),S=document.getElementById("selectSeason"),C=document.getElementById("searchName"),$=document.getElementById("searchBtn");let l=[],u=[],g=20;async function B(){try{let n=k;for(;n;){const t=await(await fetch(n)).json();l.push(...t.results),n=t.info.next}l=l.filter(o=>{const t=o.episode.slice(0,3);return["S01","S02","S03","S04","S05"].includes(t)}),u=l,w()}catch(n){console.error("Error fetching episodes:",n),E(!0)}}function w(){h.innerHTML="";const n=u.slice(0,g);if(n.length===0){E(!0);return}E(!1),n.forEach(o=>{const t=document.createElement("div");t.classList.add("episode-card"),t.setAttribute("data-episode-id",o.id),t.innerHTML=`
      <img src="images/season-corect.png" alt="${o.name}" onerror="this.src='img/portal.png'">
      <div class="episode-info">
        <h3>${o.name}</h3>
        <p>Season: ${o.episode.slice(1,3)}</p>
        <p>Air date: ${o.air_date}</p>
      </div>
    `,h.appendChild(t)}),v.style.display=u.length>g?"block":"none"}function L(){const n=S.value,o=C.value.trim().toLowerCase();u=l.filter(t=>{const r=n==="all"||t.episode.startsWith(n),e=t.name.toLowerCase().includes(o);return r&&e}),g=20,w()}function E(n){n&&(h.innerHTML=`
      <div class="placeholder">
        <img src="images/portal.png" alt="Portal" />
        <p>Oops! Try looking for something else...</p>
      </div>
    `,v.style.display="none")}v.addEventListener("click",()=>{g+=20,w()});S.addEventListener("change",L);$.addEventListener("click",L);C.addEventListener("keydown",n=>{n.key==="Enter"&&L()});B();(function(){if(!h){console.error("episodesContainer не знайдено — перевір, що id='episodesContainer' в HTML.");return}async function n(r){var e,s;try{const a=document.querySelector(".episode-modal");a&&a.remove();const i=document.createElement("div");i.className="episode-modal",i.innerHTML=`
        <div class="modal-season-backdrop"></div>
        <div class="modal-window" role="dialog" aria-modal="true">
          <button class="modal-close" aria-label="Close">&times;</button>
          <h2 class="modal-title">${o(r.name)}</h2>
          <div class="modal-details">
            <p><strong>ID:</strong> ${r.id}</p>
            <p><strong>Air date:</strong> ${o(r.air_date)}</p>
            <p><strong>Code:</strong> ${o(r.episode)}</p>
          </div>
          <h3>Characters</h3>
          <div class="modal-characters"><p>Loading characters...</p></div>
        </div>
      `,document.body.appendChild(i),(s=(e=i.querySelector(".modal-window")).focus)==null||s.call(e);const p=()=>i.remove();i.querySelector(".modal-close").addEventListener("click",p),i.querySelector(".modal-season-backdrop").addEventListener("click",p),window.addEventListener("keydown",function c(d){d.key==="Escape"&&(p(),window.removeEventListener("keydown",c))});const m=i.querySelector(".modal-characters"),f=r.characters.slice(0,6);if(f.length===0){m.innerHTML="<p>No characters</p>";return}try{const c=await Promise.all(f.map(d=>fetch(d).then(y=>{if(!y.ok)throw new Error("character fetch failed: "+y.status);return y.json()})));m.innerHTML=c.map(d=>`
            <div class="char">
              <img src="${t(d.image)}" alt="${t(d.name)}">
              <div class="char-name">${o(d.name)}</div>
            </div>`).join("")}catch(c){console.error("Error loading characters:",c),m.innerHTML="<p>Error loading characters</p>"}}catch(a){console.error("openEpisodeModal error:",a)}}function o(r){return typeof r!="string"?r:r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function t(r){return o(r).replace(/"/g,"&quot;")}h.addEventListener("click",function(r){var p,m,f,c;const e=r.target.closest(".episode-card");if(!e)return;const s=(m=(p=e.querySelector(".episode-info h3"))==null?void 0:p.textContent)==null?void 0:m.trim();(c=(f=e.querySelector(".episode-info p"))==null?void 0:f.textContent)==null||c.trim();let a=e.getAttribute("data-episode-id"),i;if(a&&window.allEpisodes?i=window.allEpisodes.find(d=>String(d.id)===String(a)):s&&window.filteredEpisodes&&(i=window.filteredEpisodes.find(d=>d.name===s)),!i){console.warn("Episode object not found for clicked card. Consider adding data-episode-id to cards.");return}n(i)}),!window.allEpisodes&&typeof l<"u"&&(window.allEpisodes=l),!window.filteredEpisodes&&typeof u<"u"&&(window.filteredEpisodes=u)})();
//# sourceMappingURL=commonHelpers.js.map
