/* ---------- Data ---------- */
// Data will be loaded from server APIs

// ---------- Load Functions ----------
let concertData = [];
let musicData = [];
let videoData = [];
let pressData = [];
let galleryImages = [];

// Load all data from server
async function loadAllData() {
  try {
    const [concerts, music, videos, press, gallery] = await Promise.all([
      fetch("/api/concerts-admin.php")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/music-admin.php")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/videos-admin.php")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/press-admin.php")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/gallery-admin.php")
        .then((r) => r.json())
        .catch(() => []),
    ]);

    concertData = concerts;
    musicData = music;
    videoData = videos;
    pressData = press;
    galleryImages = gallery;
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

/* ---------- Render Functions ---------- */

// Render Music
function renderMusic() {
  const grid = document.getElementById("musicGrid");
  if (!grid) return;

  if (musicData.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-dim); grid-column: 1 / -1;">
        <p>Музыкальные произведения будут добавлены позже.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = musicData
    .map(
      (m, index) => `
    <article class="music-card fade-in" data-index="${index}">
      <div class="music-art">
        <img src="${m.img || "/images/music/default.jpg"}" alt="${m.title}" loading="lazy" />
        ${m.audio ? `<button class="play-btn" data-index="${index}" aria-label="Воспроизвести ${m.title}"><i class="fas fa-play"></i></button>` : ""}
      </div>
      <div class="music-info">
        <h3>${m.title}</h3>
        <span class="year">${m.year || ""}</span>
      </div>
    </article>
  `,
    )
    .join("");

  // Audio playback logic
  let currentAudio = null;
  let currentPlayingIndex = null;

  grid.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const index = parseInt(this.dataset.index);
      const musicItem = musicData[index];
      if (!musicItem.audio) return;

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

      if (currentAudio) {
        currentAudio.pause();
        const prevBtn = document.querySelector(
          `.music-card[data-index="${currentPlayingIndex}"] .play-btn`,
        );
        if (prevBtn) prevBtn.innerHTML = '<i class="fas fa-play"></i>';
      }

      currentAudio = new Audio(musicItem.audio);
      currentAudio.play();
      currentPlayingIndex = index;
      this.innerHTML = '<i class="fas fa-pause"></i>';

      currentAudio.onended = () => {
        this.innerHTML = '<i class="fas fa-play"></i>';
        currentPlayingIndex = null;
        currentAudio = null;
      };
    });
  });
}

// Render Videos
function renderVideos() {
  const grid = document.getElementById("videoGrid");
  if (!grid) return;

  if (videoData.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-dim); grid-column: 1 / -1;">
        <p>Видео будут добавлены позже.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = videoData
    .map(
      (v, i) => `
    <article class="video-card fade-in" data-yt="${v.ytId}">
      <div class="video-thumb">
        <img src="${v.thumb || "/images/videos/default.jpg"}" alt="${v.title}" loading="lazy" />
        <div class="play-overlay">
          <i class="fas fa-play"></i>
        </div>
      </div>
      <div class="video-info">
        <h3>${v.title}</h3>
        <span class="event-type">${v.type || ""}</span>
      </div>
    </article>
  `,
    )
    .join("");

  grid.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => openVideoModal(card.dataset.yt));
  });
}

// Render Concerts
async function renderConcerts() {
  const list = document.getElementById("concertList");
  if (!list) return;

  if (concertData.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-dim);">
        <p>На данный момент концертов нет. Загляните позже!</p>
      </div>
    `;
    return;
  }

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
      ${
        c.image
          ? `
        <div class="concert-image-container">
          <img src="${c.image}" alt="${c.title}" loading="lazy" />
          <div class="concert-image-overlay">
            <i class="fas fa-search-plus"></i>
          </div>
        </div>
      `
          : ""
      }
    </div>
  `,
    )
    .join("");

  document.querySelectorAll(".concert-image-container").forEach((container) => {
    container.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (img) {
        openImageModal(img.src, img.alt);
      }
    });
  });

  setTimeout(initFadeObserver, 100);
}

// Render Gallery
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  if (galleryImages.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-dim); grid-column: 1 / -1;">
        <p>Фотографии будут добавлены позже.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = galleryImages
    .map(
      (src, i) => `
    <div class="gallery-item fade-in">
      <img src="${src}" alt="Фото галереи ${i + 1}" loading="lazy" />
    </div>
  `,
    )
    .join("");

  grid.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (img) {
        openImageModal(img.src, "Фото галереи");
      }
    });
  });
}

// Render Press
function renderPress() {
  const grid = document.getElementById("pressGrid");
  if (!grid) return;

  if (pressData.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-dim);">
        <p>Публикации будут добавлены позже.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = pressData
    .map((p, index) => {
      const imagesHtml =
        p.images && p.images.length > 0
          ? p.images
              .map(
                (img, imgIndex) => `
              <div class="press-image-item ${imgIndex === 0 ? "active" : ""}" data-img-index="${imgIndex}">
                <img src="${img}" alt="${p.magazine} — страница ${imgIndex + 1}" loading="lazy" />
              </div>
            `,
              )
              .join("")
          : "";

      const dotsHtml =
        p.images && p.images.length > 1
          ? `
          <div class="press-dots">
            ${p.images
              .map(
                (_, imgIndex) => `
              <span class="press-dot ${imgIndex === 0 ? "active" : ""}" data-img-index="${imgIndex}"></span>
            `,
              )
              .join("")}
          </div>
        `
          : "";

      const navHtml =
        p.images && p.images.length > 1
          ? `
          <button class="press-nav press-nav-prev" data-index="${index}" aria-label="Предыдущая страница">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="press-nav press-nav-next" data-index="${index}" aria-label="Следующая страница">
            <i class="fas fa-chevron-right"></i>
          </button>
          <div class="press-page-counter">
            <span class="press-current-page">1</span> / <span class="press-total-pages">${p.images.length}</span>
          </div>
        `
          : "";

      return `
        <article class="press-item fade-in" data-index="${index}">
          ${
            p.images && p.images.length > 0
              ? `
            <div class="press-image-slider" data-total="${p.images.length}">
              <div class="press-image-wrapper">
                ${imagesHtml}
              </div>
              ${navHtml}
              ${dotsHtml}
            </div>
          `
              : ""
          }
          <div class="press-info">
            <div class="press-meta">
              <span class="press-magazine"><i class="fas fa-newspaper"></i>${p.magazine}</span>
              <span class="press-date"><i class="fas fa-calendar-alt"></i>${p.date}</span>
            </div>
            <h3>${p.title}</h3>
            <div class="press-text">
              ${p.text ? p.text.replace(/\n/g, "<br>") : ""}
            </div>
            <button class="press-toggle btn btn-outline btn-sm" data-index="${index}">
              <i class="fas fa-chevron-down"></i> <span>Читать полностью</span>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  // Initialize image sliders for articles with multiple images
  document.querySelectorAll(".press-image-slider").forEach((slider) => {
    const total = parseInt(slider.dataset.total);
    if (total > 1) {
      initPressSlider(slider);
    }
  });

  grid.querySelectorAll(".press-toggle").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const index = parseInt(this.dataset.index);
      togglePressArticle(index);
    });
  });
}

/* ---------- Press Slider Function ---------- */
function initPressSlider(slider) {
  const items = slider.querySelectorAll(".press-image-item");
  const dots = slider.querySelectorAll(".press-dot");
  const prevBtn = slider.querySelector(".press-nav-prev");
  const nextBtn = slider.querySelector(".press-nav-next");
  const currentPage = slider.querySelector(".press-current-page");
  const total = items.length;
  let currentIndex = 0;

  function goTo(index) {
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    if (currentPage) {
      currentPage.textContent = index + 1;
    }
    currentIndex = index;
  }

  function next() {
    const newIndex = (currentIndex + 1) % total;
    goTo(newIndex);
  }

  function prev() {
    const newIndex = (currentIndex - 1 + total) % total;
    goTo(newIndex);
  }

  if (nextBtn)
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      next();
    });
  if (prevBtn)
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prev();
    });

  dots.forEach((dot) => {
    dot.addEventListener("click", function (e) {
      e.stopPropagation();
      const index = parseInt(this.dataset.imgIndex);
      goTo(index);
    });
  });

  let autoAdvance = setInterval(next, 5000);
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoAdvance);
  });
  slider.addEventListener("mouseleave", () => {
    autoAdvance = setInterval(next, 5000);
  });
}

/* ---------- Toggle Press Article ---------- */
function togglePressArticle(index) {
  const cards = document.querySelectorAll(".press-item");
  const card = cards[index];
  if (!card) return;

  const text = card.querySelector(".press-text");
  const btn = card.querySelector(".press-toggle");
  const icon = btn.querySelector("i");
  const label = btn.querySelector("span");

  document.querySelectorAll(".press-item.open").forEach((openCard) => {
    if (openCard !== card) {
      const openText = openCard.querySelector(".press-text");
      const openBtn = openCard.querySelector(".press-toggle");
      const openIcon = openBtn.querySelector("i");
      const openLabel = openBtn.querySelector("span");
      openText.style.maxHeight = "0";
      openText.style.opacity = "0";
      openCard.classList.remove("open");
      openIcon.className = "fas fa-chevron-down";
      openLabel.textContent = "Читать полностью";
    }
  });

  if (card.classList.contains("open")) {
    text.style.maxHeight = "0";
    text.style.opacity = "0";
    card.classList.remove("open");
    icon.className = "fas fa-chevron-down";
    label.textContent = "Читать полностью";
  } else {
    text.style.maxHeight = text.scrollHeight + "px";
    text.style.opacity = "1";
    card.classList.add("open");
    icon.className = "fas fa-chevron-up";
    label.textContent = "Скрыть текст";
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
}

/* ---------- Image Modal ---------- */
const imageModal = document.getElementById("imageModal");
const imageModalClose = document.getElementById("imageModalClose");
const modalImage = document.getElementById("modalImage");

function openImageModal(src, alt) {
  modalImage.src = src;
  modalImage.alt = alt || "Image";
  imageModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeImageModal() {
  imageModal.classList.remove("active");
  document.body.style.overflow = "";
}

if (imageModalClose) {
  imageModalClose.addEventListener("click", closeImageModal);
}
if (imageModal) {
  imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) closeImageModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeImageModal();
});

/* ---------- Video Modal ---------- */
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
if (modalClose) {
  modalClose.addEventListener("click", closeVideoModal);
}
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeVideoModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideoModal();
});

/* ---------- Fade-in on Scroll ---------- */
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

/* ---------- Contact form ---------- */
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
if (form) {
  form.addEventListener("submit", async (e) => {
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

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();

      if (data.success) {
        formStatus.className = "form-status success";
        formStatus.textContent = data.message;
        form.reset();
      } else {
        formStatus.className = "form-status error";
        formStatus.textContent =
          data.message || "Произошла ошибка. Попробуйте позже.";
      }
    } catch (error) {
      console.error("Error sending message:", error);
      formStatus.className = "form-status error";
      formStatus.textContent =
        "Извините, произошла ошибка при отправке. Пожалуйста, попробуйте позже.";
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      setTimeout(() => {
        formStatus.className = "form-status";
        formStatus.textContent = "";
      }, 6000);
    }
  });
}

/* ---------- Initialization ---------- */
async function init() {
  await loadAllData();
  renderMusic();
  renderVideos();
  await renderConcerts();
  renderGallery();
  renderPress();
  initFadeObserver();
}

init();

const initialHash = location.hash.replace("#", "") || "home";
if (initialHash !== "home") navigateTo(initialHash);
