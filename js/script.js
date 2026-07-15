/* ---------- Data ---------- */
const musicData = [
  {
    title: "Nocturno en Mi Mayor",
    year: "2024",
    img: "https://images.unsplash.com/photo-1494232410401-ad00d543398f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Memorias del Sur",
    year: "2023",
    img: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Preludio en Azul",
    year: "2022",
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Vals para Elena",
    year: "2021",
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Lluvia en la Ventana",
    year: "2020",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Canción de Cuna",
    year: "2019",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Reflejos",
    year: "2018",
    img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "El Último Adiós",
    year: "2017",
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80",
  },
];

const videoData = [
  {
    title: "Nocturno en Mi Mayor — Sala Nezahualcóyotl",
    type: "Concierto en Vivo 2024",
    thumb:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    ytId: "jFbWGBV8kcI",
  },
  {
    title: "Memorias del Sur — Recital Teatro Colón",
    type: "Concierto en Vivo 2024",
    thumb:
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80",
    ytId: "HEFNBpbGg5M",
  },
  {
    title: "Preludio en Azul — Sesión de Estudio",
    type: "Estudio 2023",
    thumb:
      "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=800&q=80",
    ytId: "4Tr0otuiQuU",
  },
  {
    title: "Vals para Elena — Festival de Invierno",
    type: "Concierto en Vivo 2023",
    thumb:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80",
    ytId: "lTRiuFIWV54",
  },
  {
    title: "Lluvia en la Ventana — Casa de la Cultura",
    type: "Concierto en Vivo 2022",
    thumb:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    ytId: "9B3QQSXbBP0",
  },
  {
    title: "Reflejos — Recital Íntimo",
    type: "Concierto en Vivo 2022",
    thumb:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80",
    ytId: "MPE5MfLu2AE",
  },
];

const concertData = [
  {
    day: "28",
    month: "Ago",
    title: "Nocturnos — Recital en Solitario",
    venue: "Sala Nezahualcóyotl",
    city: "Ciudad de México, MX",
    time: "20:00 h",
  },
  {
    day: "14",
    month: "Sep",
    title: "Memorias del Sur — Lanzamiento de Álbum",
    venue: "Teatro Colón",
    city: "Buenos Aires, AR",
    time: "21:00 h",
  },
  {
    day: "05",
    month: "Oct",
    title: "Una Noche con Chopin",
    venue: "Palau de la Música",
    city: "Barcelona, ES",
    time: "19:30 h",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1494232410401-ad00d543398f?auto=format&fit=crop&w=600&q=80",
];

/* ---------- Render dynamic sections ---------- */
function renderMusic() {
  const grid = document.getElementById("musicGrid");
  grid.innerHTML = musicData
    .map(
      (m) => `
    <article class="music-card fade-in">
      <div class="music-art">
        <img src="${m.img}" alt="${m.title}" loading="lazy" />
        <button class="play-btn" aria-label="Reproducir ${m.title}"><i class="fas fa-play"></i></button>
      </div>
      <div class="music-info">
        <h3>${m.title}</h3>
        <span class="year">Compuesta en ${m.year}</span>
      </div>
    </article>
  `,
    )
    .join("");
}

function renderVideos() {
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = videoData
    .map(
      (v, i) => `
    <article class="video-card fade-in" data-yt="${v.ytId}">
      <div class="video-thumb">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy" />
      </div>
      <div class="video-info">
        <h3>${v.title}</h3>
        <span class="event-type">${v.type}</span>
      </div>
    </article>
  `,
    )
    .join("");

  grid.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => openVideoModal(card.dataset.yt));
  });
}

function renderConcerts() {
  const list = document.getElementById("concertList");
  list.innerHTML = concertData
    .map(
      (c) => `
    <div class="concert-item fade-in">
      <div class="concert-date">
        <span class="day">${c.day}</span>
        <span class="month">${c.month}</span>
      </div>
      <div class="concert-details">
        <h3>${c.title}</h3>
        <div class="concert-meta">
          <span><i class="fas fa-map-marker-alt"></i>${c.venue}, ${c.city}</span>
          <span><i class="fas fa-clock"></i>${c.time}</span>
        </div>
      </div>
      <a href="#" class="btn btn-primary btn-sm">Comprar Entradas</a>
    </div>
  `,
    )
    .join("");
}

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = galleryImages
    .map(
      (src, i) => `
    <div class="gallery-item fade-in">
      <img src="${src}" alt="Imagen de galería ${i + 1}" loading="lazy" />
    </div>
  `,
    )
    .join("");
}

/* ---------- Routing ---------- */
const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll("[data-link]");

function navigateTo(pageId) {
  pages.forEach((p) => p.classList.toggle("active", p.id === pageId));
  document.querySelectorAll(".nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.link === pageId);
  });
  window.scrollTo({ top: 0, behavior: "instant" });
  // close mobile menu
  document.getElementById("nav").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
  // re-trigger fade-ins
  setTimeout(initFadeObserver, 50);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.dataset.link;
    if (target) {
      history.pushState({ page: target }, "", `#${target}`);
      navigateTo(target);
    }
  });
});

window.addEventListener("popstate", () => {
  const hash = location.hash.replace("#", "") || "home";
  navigateTo(hash);
});

/* ---------- Header scroll ---------- */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

/* ---------- Mobile menu ---------- */
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  nav.classList.toggle("open");
});

/* ---------- Fade-in on scroll ---------- */
let fadeObserver;
function initFadeObserver() {
  if (fadeObserver) fadeObserver.disconnect();
  fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );

  document
    .querySelectorAll(".fade-in:not(.visible)")
    .forEach((el) => fadeObserver.observe(el));
}

/* ---------- Video modal ---------- */
const modal = document.getElementById("videoModal");
const modalIframe = document.getElementById("modalIframe");
const modalClose = document.getElementById("modalClose");

function openVideoModal(ytId) {
  modalIframe.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeVideoModal() {
  modal.classList.remove("active");
  modalIframe.src = "";
  document.body.style.overflow = "";
}
modalClose.addEventListener("click", closeVideoModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeVideoModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideoModal();
});

/* ---------- Contact form ---------- */
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formStatus.className = "form-status error";
    formStatus.textContent = "Por favor, completa todos los campos.";
    return;
  }
  if (!emailRe.test(email)) {
    formStatus.className = "form-status error";
    formStatus.textContent = "Por favor, ingresa un correo electrónico válido.";
    return;
  }

  // Simulate sending
  formStatus.className = "form-status success";
  formStatus.textContent =
    "✓ Gracias, " +
    name +
    ". Tu mensaje ha sido enviado. Responderé en un plazo de 48 horas.";
  form.reset();
  setTimeout(() => {
    formStatus.className = "form-status";
    formStatus.textContent = "";
  }, 6000);
});

/* ---------- Init ---------- */
renderMusic();
renderVideos();
renderConcerts();
renderGallery();
initFadeObserver();

// Handle initial hash
const initialHash = location.hash.replace("#", "") || "home";
if (initialHash !== "home") navigateTo(initialHash);
