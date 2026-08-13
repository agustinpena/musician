/* ---------- Data ---------- */
const musicData = [
  {
    title: "Менуэт «Иллюзия»",
    year: "1986",
    img: "/images/music/nocturno.jpg?auto=format&fit=crop&w=600&q=80",
    audio: "/audio/minueto.mp3",
  },

  {
    title: "Мерседес Вальс",
    year: "2018",
    img: "/images/music/memorias.jpg?auto=format&fit=crop&w=600&q=80",
    audio: "/audio/mercedes.mp3",
  },

  {
    title: "Прелюдия и фуга Баха",
    year: "2021",
    img: "/images/music/preludio.jpg?auto=format&fit=crop&w=600&q=80",
    audio: "/audio/preludio.mp3",
  },

  {
    title: "Ин Парадисум",
    year: "2021",
    img: "/images/music/vals.jpg?auto=format&fit=crop&w=600&q=80",
    audio: "/audio/paradisum.mp3",
  },
];

const videoData = [
  {
    title: "Реквием по Младенцу Коренных народов.",
    type: "Концерт вживую, 2022",
    thumb: "/images/videos/concurso.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "c0xHaeUXakc",
  },

  {
    title: "Концерт Звуки двух культур - Часть I",
    type: "Концерт вживую, 2017",
    thumb: "/images/videos/culturas.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "6pRHu5vnZzU",
  },

  {
    title: "Аве Мария - Ансамбль Гватемальской гармоники",
    type: "Студия, 2023",
    thumb: "/images/videos/ave_maria.jpg?auto=format&fit=crop&w=800&q=80",
    ytId: "NZ0tpb2Di-E",
  },
];

const concertData = [
  {
    day: "28",
    month: "авг",
    title: "Ноктюрны — Сольный концерт",
    venue: "Зал Несауалькойотль",
    city: "Мехико, MX",
    time: "20:00",
  },
  {
    day: "14",
    month: "сен",
    title: "Воспоминания о юге — Презентация альбома",
    venue: "Театр Колон",
    city: "Буэнос-Айрес, AR",
    time: "21:00",
  },
  {
    day: "05",
    month: "окт",
    title: "Вечер с Шопеном",
    venue: "Дворец музыки",
    city: "Барселона, ES",
    time: "19:30",
  },
];

const galleryImages = [
  "/images/gallery/gallery-01.jpg?auto=format&fit=crop&w=900&q=80",
  "/images/gallery/gallery-02.jpg?auto=format&fit=crop&w=600&q=80",
  "/images/gallery/gallery-03.jpg?auto=format&fit=crop&w=600&q=80",
  "/images/gallery/gallery-04.jpg?auto=format&fit=crop&w=600&q=80",
  "/images/gallery/gallery-05.jpg?auto=format&fit=crop&w=600&q=80",
  "/images/gallery/gallery-06.jpg?auto=format&fit=crop&w=900&q=80",
  "/images/gallery/gallery-07.jpg?auto=format&fit=crop&w=600&q=80",
  "/images/gallery/gallery-08.jpg?auto=format&fit=crop&w=600&q=80",
];

/* ---------- Render dynamic sections ---------- */

function renderMusic() {
  const grid = document.getElementById("musicGrid");
  grid.innerHTML = musicData
    .map(
      (m, index) => `
    <article class="music-card fade-in" data-index="${index}">
      <div class="music-art">
        <img src="${m.img}" alt="${m.title}" loading="lazy" />
        <button class="play-btn" aria-label="Воспроизвести ${m.title}"><i class="fas fa-play"></i></button>
      </div>
      <div class="music-info">
        <h3>${m.title}</h3>
        <span class="year">Сочинено в ${m.year}</span>
      </div>
    </article>
  `,
    )
    .join("");

  // --- Audio playback logic ---
  let currentAudio = null;
  let currentPlayingIndex = null;

  grid.querySelectorAll(".music-card").forEach((card) => {
    const index = parseInt(card.dataset.index);
    const playBtn = card.querySelector(".play-btn");
    const musicItem = musicData[index];

    // Skip if no audio file is defined
    if (!musicItem.audio) return;

    playBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      // If same track is clicked, toggle play/pause
      if (currentPlayingIndex === index && currentAudio) {
        if (currentAudio.paused) {
          currentAudio.play();
          this.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
          currentAudio.pause();
          this.innerHTML = '<i class="fas fa-play"></i>';
        }
        return;
      }

      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        const prevBtn = document.querySelector(
          `.music-card[data-index="${currentPlayingIndex}"] .play-btn`,
        );
        if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-play"></i>';
      }

      // Create and play new audio
      currentAudio = new Audio(musicItem.audio);
      currentAudio.play();
      currentPlayingIndex = index;
      this.innerHTML = '<i class="fas fa-pause"></i>';

      // Reset button when track ends
      currentAudio.onended = () => {
        this.innerHTML = '<i class="fas fa-play"></i>';
        currentPlayingIndex = null;
        currentAudio = null;
      };
    });
  });
}

// function renderMusic() {
//   const grid = document.getElementById("musicGrid");
//   grid.innerHTML = musicData
//     .map(
//       (m) => `
//     <article class="music-card fade-in">
//       <div class="music-art">
//         <img src="${m.img}" alt="${m.title}" loading="lazy" />
//         <button class="play-btn" aria-label="Воспроизвести ${m.title}"><i class="fas fa-play"></i></button>
//       </div>
//       <div class="music-info">
//         <h3>${m.title}</h3>
//         <span class="year">Сочинено в ${m.year}</span>
//       </div>
//     </article>
//   `,
//     )
//     .join("");
// }

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
      <a href="#" class="btn btn-primary btn-sm">Купить билеты</a>
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
      <img src="${src}" alt="Фото галереи ${i + 1}" loading="lazy" />
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
  document.getElementById("nav").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
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
    formStatus.textContent = "Пожалуйста, заполните все поля.";
    return;
  }
  if (!emailRe.test(email)) {
    formStatus.className = "form-status error";
    formStatus.textContent =
      "Пожалуйста, введите действительный адрес электронной почты.";
    return;
  }

  formStatus.className = "form-status success";
  formStatus.textContent =
    "✓ Благодарю, " +
    name +
    ". Ваше сообщение отправлено. Я отвечу в течение 48 часов.";
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

const initialHash = location.hash.replace("#", "") || "home";
if (initialHash !== "home") navigateTo(initialHash);
