// CoGrazer VR – country → city → map demo

// 1) Ülke → şehir → harita URL verisi
const data = {
  turkiye: {
    label: "Türkiye",
    cities: {
      istanbul: {
        label: "İstanbul – Taksim",
        q: "Taksim Meydanı, İstanbul"
      },
      ankara: {
        label: "Ankara – Kızılay",
        q: "Kızılay, Ankara"
      },
      gokceada: {
        label: "Gökçeada",
        q: "Gökçeada, Çanakkale"
      }
    }
  },
  almanya: {
    label: "Almanya",
    cities: {
      berlin: { label: "Berlin – Brandenburg Gate", q: "Brandenburg Gate" },
      munih: { label: "Münih – Marienplatz", q: "Marienplatz, Munich" }
    }
  },
  bk: {
    label: "Birleşik Krallık",
    cities: {
      london: { label: "Londra – Big Ben", q: "Big Ben, London" },
      manchester: { label: "Manchester City Centre", q: "Manchester City Centre" }
    }
  },
  fransa: {
    label: "Fransa",
    cities: {
      paris: { label: "Paris – Eiffel Tower", q: "Eiffel Tower, Paris" },
      nice: { label: "Nice – Seaside", q: "Nice, France" }
    }
  },
  ispanya: {
    label: "İspanya",
    cities: {
      madrid: { label: "Madrid – City Center", q: "Puerta del Sol, Madrid" },
      barcelona: {
        label: "Barselona – Sagrada Familia",
        q: "Sagrada Familia, Barcelona"
      }
    }
  },
  hollanda: {
    label: "Hollanda",
    cities: {
      amsterdam: {
        label: "Amsterdam – City Center",
        q: "Amsterdam, Netherlands"
      },
      rotterdam: { label: "Rotterdam", q: "Rotterdam, Netherlands" }
    }
  }
};

// HTML elemanları
const iframe = document.getElementById("cityView");
const countryButtons = document.querySelectorAll(".country-btn");
const cityButtonsContainer = document.getElementById("cityButtons");
const searchInput = document.getElementById("mapSearch");

// Seçili ülke/şehir
let currentCountryKey = "turkiye";
let currentCityKey = "gokceada";

// Google Maps embed URL üretici
function buildMapUrl(query) {
  const encoded = encodeURIComponent(query);
  return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encoded}`;
  // Şimdilik API key yoksa aşağıdaki basit embed de kullanılabilir:
  // return `https://www.google.com/maps?q=${encoded}&output=embed`;
}

// Şehir listesini seçili ülkeye göre doldur
function renderCityButtons() {
  const country = data[currentCountryKey];
  if (!country) return;

  cityButtonsContainer.innerHTML = "";

  Object.entries(country.cities).forEach(([cityKey, cityObj], index) => {
    const btn = document.createElement("button");
    btn.className = "pill-btn city-btn";
    if (cityKey === currentCityKey || (index === 0 && !currentCityKey)) {
      btn.classList.add("active");
      currentCityKey = cityKey;
    }
    btn.dataset.city = cityKey;
    btn.innerText = cityObj.label;
    btn.addEventListener("click", () => {
      setCity(cityKey);
    });
    cityButtonsContainer.appendChild(btn);
  });
}

// Ülke seçimi
function setCountry(countryKey) {
  currentCountryKey = countryKey;
  currentCityKey = null;

  countryButtons.forEach((btn) => {
    if (btn.dataset.country === countryKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderCityButtons();
  updateMap();
}

// Şehir seçimi
function setCity(cityKey) {
  currentCityKey = cityKey;

  const cityBtns = document.querySelectorAll(".city-btn");
  cityBtns.forEach((btn) => {
    if (btn.dataset.city === cityKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  updateMap();
}

// Haritayı güncelle
function updateMap(customQuery) {
  const country = data[currentCountryKey];
  if (!country) return;

  const city = country.cities[currentCityKey];
  const query = customQuery || (city && city.q) || country.label;

  // Şimdilik API key kullanılmayan versiyon:
  const url = `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;

  iframe.src = url;
}

// Ülke butonlarına olay bağla
countryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setCountry(btn.dataset.country);
  });
});

// Arama çubuğu – Enter’a basınca o şehir içinde arama
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = searchInput.value.trim();
    if (!text) return;
    updateMap(text);
  }
});

// İlk yükleme
setCountry("turkiye");
