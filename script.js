// CoGrazer VR Demo v0
// City switcher using embedded Google Maps (you can change links later)

const cityViews = {
  gokceada:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.6401511661564!2d25.838!3d40.201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGokceada!5e0!3m2!1str!2str!4v0000000000000",
  paris:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999!2d2.2922925!3d48.8583736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f!2sEiffel%20Tower!5e0!3m2!1str!2str!4v0000000000000",
  london:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19801.999!2d-0.1276!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLondon!5e0!3m2!1str!2str!4v0000000000000"
};

const iframe = document.getElementById("cityView");
const buttons = document.querySelectorAll(".city-btn");

function setCity(cityKey) {
  const url = cityViews[cityKey];

  if (!url) return;

  iframe.src = url;

  buttons.forEach((btn) => {
    if (btn.dataset.city === cityKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// İlk yüklemede Gökçeada
setCity("gokceada");

// Butonlara tıklama olayı
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cityKey = btn.dataset.city;
    setCity(cityKey);
  });
});
