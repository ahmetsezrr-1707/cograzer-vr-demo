// CoGrazer VR – Demo v0.7 (simple version)
// Global search + quick links + Street View button

const iframe = document.getElementById("cityView");
const searchInput = document.getElementById("mapSearch");

// Başlangıç konumu
let currentQuery = "Gökçeada, Çanakkale";

// Haritayı güncelle
function updateMap(query) {
  currentQuery = query;
  iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;
}

// Quick link butonları buradan çağrılıyor (HTML onclick ile)
function goQuick(q) {
  searchInput.value = q;
  updateMap(q);
}

// Arama kutusunda Enter’a basınca çalışsın
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = searchInput.value.trim();
    if (!text) return;
    updateMap(text);
  }
});

// Street View butonu – yeni sekme açar
function openStreetView() {
  if (!currentQuery) return;
  const q = encodeURIComponent(currentQuery);
  const url = `https://www.google.com/maps/search/?api=1&query=${q}&layer=c`;
  window.open(url, "_blank", "noopener");
}

// İlk yükleme
updateMap(currentQuery);

// Fonksiyonları global hale getir (HTML onclick için)
window.goQuick = goQuick;
window.openStreetView = openStreetView;
