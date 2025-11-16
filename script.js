// CoGrazer VR – Demo v0.7
// Global search + quick links + Street View button

const iframe = document.getElementById("cityView");
const searchInput = document.getElementById("mapSearch");
const streetViewBtn = document.getElementById("streetViewBtn");
const quickLinkButtons = document.querySelectorAll(".quick-link-btn");

// Basit embed URL (API key yokken bu iş görür)
function buildMapUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;
}

// Varsayılan başlangıç konumu (tabii ki Gökçeada 😎)
let currentQuery = "Gökçeada, Çanakkale";

function updateMap(query) {
  currentQuery = query;
  iframe.src = buildMapUrl(query);
}

// Arama çubuğu – Enter ile arama
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = searchInput.value.trim();
    if (!text) return;
    updateMap(text);
  }
});

// Quick link butonları
quickLinkButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const q = btn.dataset.q;
    if (!q) return;
    searchInput.value = q;
    updateMap(q);
  });
});

// Street View – yeni sekmede aç
streetViewBtn.addEventListener("click", () => {
  if (!currentQuery) return;

  const q = encodeURIComponent(currentQuery);
  const url = `https://www.google.com/maps/search/?api=1&query=${q}&layer=c`;

  window.open(url, "_blank");
});

// İlk yükleme
updateMap(currentQuery);
