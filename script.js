// CoGrazer VR – Demo v0.7
// Global search + quick links + Street View button

const iframe = document.getElementById("cityView");
const searchInput = document.getElementById("mapSearch");
const streetViewBtn = document.getElementById("streetViewBtn");

// Basit embed URL
function buildMapUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;
}

// Varsayılan başlangıç konumu
let currentQuery = "Gökçeada, Çanakkale";

// Quick link butonlarını tekrar seç → artık garanti
const quickLinkButtons = document.querySelectorAll(".quick-link-btn");

// Quick link ile haritayı güncelle
quickLinkButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const q = btn.dataset.q;
    searchInput.value = q;
    updateMap(q);
  });
});

// Arama → Enter ile çalışsın
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!searchInput.value.trim()) return;
    updateMap(searchInput.value.trim());
  }
});

// Haritayı yenile
function updateMap(query) {
  currentQuery = query;
  iframe.src = buildMapUrl(query);
}

// Street View → yeni sekmede aç
streetViewBtn.addEventListener("click", () => {
  const q = encodeURIComponent(currentQuery);

  // RESMİ GOOGLE STREET VIEW ARAMA
  const url = `https://www.google.com/maps/search/?api=1&query=${q}&layer=c`;

  window.open(url, "_blank", "noopener");
});

// İlk yükleme
updateMap(currentQuery);
