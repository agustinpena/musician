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

// ---------- Concerts (loaded from server) ----------
let concertData = [];

// Fetch concerts from server
async function loadConcerts() {
  try {
    const response = await fetch("/api/concerts-admin.php");
    if (!response.ok) throw new Error("Failed to load concerts");
    concertData = await response.json();
    return concertData;
  } catch (error) {
    console.error("Error loading concerts:", error);
    concertData = [];
    return concertData;
  }
}

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

/* ---------- Press Data ---------- */
const pressData = [
  {
    id: 1,
    title: "Мечта, преодолевшая моря",
    magazine: "Дневник Центральной Америки",
    date: "Май 2026",
    images: ["/images/press/article-01-page1.jpg"],
    text: `
      <p>От кофейных плантаций Почуты, Чимальтенанго, до Москвы: Роберто Перес Чамалье переосмысливает майянскую идентичность через фортепиано в России.</p>

      <p> Автор: Нарси Васкес, &nbsp Фото: Р. Перес </p><br>

      <p>В недрах Сан-Рафаэля, поместья, источающего аромат кофейных плантаций в Почуте, Чимальтенанго, жизнь никогда не умолкает. Там бриз разносит на рассвете отзвуки маримбы, колыбельные матери и ноты приходского органа. В этом звуковом ландшафте вырос Роберто Перес Чамалье, который уже в 9 лет, услышав пластинку композитора Петра Чайковского, понял, что мир может быть таким же безграничным, как 88 клавиш фортепиано.<br><br>
      Этот мальчик стал пианистом и музыковедом, который воплощает тоску по родине в своём академическом и художественном пути, требующем непреклонной технической подготовки в этой стране.</p>

      <p><h3>Стипендия в России</h3>
      Карьера музыканта — это партитура настойчивости. То практическое обучение, которое началось в 5 лет под руководством брата и при поддержке польских миссионеров, вылилось в строгую дисциплину. После тайного обучения в Консерватории Германа Алькантары и работы пианистом в Национальном хоре, в 2018 году судьба музыканта изменилась благодаря стипендии в России.<br><br>

      Адаптация была не просто вопросом выживания в 38-градусные морозы или изучения нового алфавита. Это было столкновение с творческими требованиями.<br><br>

      Для него интерпретация — это не просто исполнение нот, а расшифровка послания композитора. Это требование заставляло его заниматься минимум шесть часов ежедневно, часто арендуя фортепиано по утрам, чтобы оттачивать технику в трёх специализациях: камерной музыке, аккомпанементе для певцов и сольном исполнении.</p>

      <p><h3>Космовидение в Xk'un</h3>
      Несмотря на расстояние, сущность Переса Чамалье остаётся привязанной к своим корням. Его исследовательская и творческая работа сосредоточена на таких фигурах, как композитор Хесус Кастильо, пионер музыкального национализма в Гватемале. Но он идёт дальше: включает своё майянское наследие в собственные творения.<br><br>

      Примером служит его произведение Xk'un (что означает «умер» на языке какчикель). Через него музыкант размышляет о социальном безразличии к смерти, сопоставляя воспоминания о своём детстве в деревне с современной реальностью. Также его произведение «Реквием по индейскому младенцу», удостоенное награды в Москве, — это пьеса для оркестра и сопрано, использующая семь майянских языков, чтобы рассказать о боли матери, построенная на основе колыбельной песни, которую пела его собственная мать.<br><br>

      После получения степени в области фортепианной интерпретации и магистратуры, сейчас он учится на первом курсе докторантуры по музыковедению с музыкальной и культурной интерпретацией.<br><br>

      Его жизнь — это смесь борща (свекольного супа) и воспоминаний о тортильях, русской степи и гор Чимальтенанго. Интервьюируемый не просто играет на фортепиано; он переосмысливает Гватемалу для мира, демонстрирует, что академическая музыка может иметь лицо коренного народа, голос народа и превосходство, не знающее границ. </p>

      <p><h3>Дисциплина исполнителя</h3>
      Он укрепился в Национальной консерватории и Университете Сан-Карлос. В 2018 году совершил скачок, присоединившись к Российской академии музыки Гнесина. В 2023 году занял первое место на Международном конкурсе пианистов-аккомпаниаторов в Санкт-Петербурге. Особенность его пути — продвижение национального репертуара на требовательных европейских сценах, где он сочетает классическое с творениями, утверждающими его древнее наследие.<br><br>

      В 2018 году национальный музыкант во время турне по Португалии и Италии продвигал гватемальский фортепианный сборник. </p><br>

      <p><b>Цитата</b>:<i> «Русская школа очень строга. В первый год я чувствовал, что ничего не знаю, но это был процесс самокритики, чтобы воспринимать музыку с другой точки зрения».</i><br><br>

     &nbsp;&nbsp; — Роберто Перес Чамалье</p>
  
    `,
  },
  {
    id: 2,
    title: "Роберто Перес Чамалье: Музыка как мост между культурами",
    magazine: "Журнал «Свободная пресса»",
    date: "Январь 2026",
    images: [
      "/images/press/article-02-page1.jpg",
      "/images/press/article-02-page2.jpg",
      "/images/press/article-02-page3.jpg",
    ],
    text: `
<p>Автор: Эсдрас Лас</p>

   <p>Роберто Перес Чамале, уроженец Сан-Мигель-Почута (департамент Чимальтенанго), построил музыкальную карьеру, которая привела его на сцены более чем 15 стран Азии, Европы и Америки. Пианист, органист, композитор и педагог, имеющий майя-какчикельское происхождение, свою творческую миссию он видит в ясной цели: построить культурный мост между Гватемалой и остальным миром.</p>

   <p>Его страсть к музыке проявилась рано, хотя первые формальные шаги были сделаны вопреки течению. Он поступил в Национальную консерваторию имени Хермана Алькантары, не поставив в известность родителей, а в 17 лет уже учился на двух факультетах одновременно. Это решение положило начало пути, который позже привёл его в Национальный хор Гватемалы и побудил обосноваться в России с 2019 года.</p>

  <p>В настоящее время он учится в аспирантуре (докторантуре) по специальности «Музыковедение» с упором на музыкальное и культурное исполнительство в Российской академии музыки имени Гнесиных в Москве. Там он ставит перед собой задачу популяризировать латиноамериканскую музыку и внести вклад в культурное наследие через изучение и исполнение русских произведений.</p>

  <p>Италия, Турция, Мексика и Кыргызстан — лишь некоторые из стран, где звучал его талант. Каждая нота, которую исполняет Перес Чамале, укрепляет его намерение прославить имя Гватемалы далеко за её пределами.</p>

  <h3>Как у вас зародилась эта страсть к музыке?</h3>

  <p>Интерес к музыке возник у меня в 5 лет благодаря старшему брату Хосе Луису, который был органистом в приходе и руководил хором. Это побудило меня сначала вступить в детский хор. Открыв для себя музыку, я с тех пор начал учиться игре на органе под его руководством.</p>

<p>Музыкальная атмосфера в доме сыграла ключевую роль: пение моей матери, Мерседес Чамале, спустя годы вдохновило меня на создание одного из моих сочинений, а мой отец, Хорхе Перес, часто слушал маримбу, что пробудило мой интерес к инструментальной музыке.</p>

  <p>Со временем я освоил гитару, маримбу и другие инструменты. Но именно в 10 лет, когда один польский миссионер подарил мне пластинку с классической музыкой — произведениями Шуберта, Шопена, Вагнера и Чайковского, — я открыл для себя любовь к этому жанру.</p>

  <p>Особенно поразила меня первая часть Первого концерта Чайковского. Я подумал: «Разве такое можно сыграть на фортепиано?» — и с тех пор понял, что хочу освоить этот инструмент. Эта страсть сохраняется у меня и поныне.</p>

  <h3>Когда вы решили превратить своё увлечение музыкой в профессию?</h3>

  <p>Мой академический и профессиональный путь начался, когда мы с родителями переехали в город Гватемала, чтобы я мог учиться в Нормальной школе музыкального образования имени Хесуса Марии Альварадо, где уже учился мой брат.</p>

  <p>Мы перебрались в Эль-Порвенир, Бока-дель-Монте, чтобы быть вместе и облегчить учёбу. Однако я всегда хотел поступить в Консерваторию. Мы с братом сходили туда за информацией, и мне разрешили сдать вступительный экзамен. Хотя моя семья считала, что учиться на двух специальностях одновременно невозможно, я сделал это тайком. И я поступил.</p>

  <p>Какое-то время я говорил им, что занимаюсь в Музыкальной школе с 7 до 18 часов, но в 14 часов я уже уходил в Консерваторию. Так мне удалось учиться на обоих отделениях.</p>

  <p>Мой первый концерт состоялся в 17 лет, в Консерватории. Я исполнил Ноктюрн ми-бемоль мажор Шопена. Я никогда не забуду тот опыт: это был переход от игры по зову души к тому, чтобы делиться своей музыкой с публикой. Это стало началом моей артистической карьеры и придало мне уверенности продолжать этот путь.</p>

  <h3>Как складывался ваш профессиональный путь и что привело вас на учёбу в Россию?</h3>

  <p>В 19 лет меня выбрали пианистом Национального хора Гватемалы. Этот опыт стал отправной точкой моей профессиональной карьеры. Я проработал там 12 лет и впервые выступил на международном фестивале духовной музыки в Памплоне, Колумбия.</p>

  <p>Параллельно с карьерой я продолжал обучение игре на фортепиано в Высшей школе искусств Университета Сан-Карлос и получил стипендию в Университете дель Валье для обучения по программе «Преподаватель музыки».</p>

  <p>В 2012 году я дал свой первый международный сольный концерт в Санта-Ане, Сальвадор, с проектом «Гватемальская пианистическая антология», посвящённым возрождению малоизвестных произведений страны. Спустя годы посол Норвегии Ян Герхард Лассен предоставил мне стипендию для учёбы в Лиссабоне у маэстро Анне Кааса. Та поездка привела меня в Португалию, Испанию, Италию, Норвегию и Германию, где я давал концерты гватемальской музыки.</p>

  <p>В 2018 году открылась ещё одна возможность: я самостоятельно изучал григорианское пение и сотрудничал с бенедиктинскими монахами из Бока-дель-Монте и Эскипулас. Благодаря стипендии монсеньора Альберто Турко и поддержке бенедиктинцев я посетил летние курсы в Италии.</p>

  <p>Я разослал запросы в несколько посольств, чтобы продолжить выступления за рубежом. Ответило посольство России. При их поддержке я участвовал в концертах в России, Италии и Португалии, а также вернулся в Польшу по приглашению миссионера Хорхе Кривзды.</p>

  <p>Концерт в Санкт-Петербурге, организованный гватемальцем Фернандо Каррерой, и ещё один концерт в Академии Гнесиных открыли для меня новый этап. Там мне предложили продолжить академическое обучение. С 2019 года я живу в России, осуществляя мечту изучать музыку на международных сценах.</p>

  <h3>Каково это — представлять Гватемалу на международных сценах в качестве пианиста?</h3>

  <p>С детства я мечтал выехать за пределы страны, получить образование и давать концерты. Постепенно эта мечта сбывается. Представлять Гватемалу на международных сценах — это волнительно, но также накладывает большую ответственность.</p>

  <p>Речь идёт не только обо мне как об артисте: в каждом месте, где я выступаю, я несу с собой историю и культуру Гватемалы. Делиться нашей музыкой с миром стало для меня обязанностью, которую я принимаю с гордостью.</p>

  <p>Одним из самых больших сюрпризов стало первое исполнение гватемальской музыки в Европе. По окончании кто-то сказал мне: «Мы никогда не слышали такую музыку». Речь шла о таких произведениях, как сочинения Хесуса Кастильо, написанные изначально для фортепиано.</p>

  <p>Поэтому в России я стремился глубже изучить его наследие. Хесус Кастильо и Рикардо Кастильо считаются предшественниками музыкального национализма в Гватемале, и их творчество вдохновило меня написать диссертацию на русском языке: «Европейские и национальные черты в фортепианной музыке гватемальских композиторов Хесуса и Рикардо Кастильо».</p>

  <p>Нередко после концертов публика спрашивает: «Откуда вы?» Когда я отвечаю, что из Гватемалы, многие не знают, где находится эта страна. Поэтому каждое выступление — это не просто концерт, а акт культурного представительства, личная и общественная миссия, которую я несу ответственно.</p>

  <h3>Каковы ваши следующие шаги в музыкальной карьере?</h3>

  <p>В этом году я завершил магистратуру по фортепианному исполнительству, а сейчас учусь на первом курсе аспирантуры благодаря стипендии российского правительства, которую, с Божьей помощью, мне удалось получить.</p>

  <p>Мои ближайшие планы сосредоточены на дальнейшем распространении гватемальской музыки — не только с технической стороны, но и с научной, философской и культурной точек зрения.</p>

  <p>Как композитор я продолжу писать произведения для хора и органа, а также выступать в качестве органиста. Я также буду поддерживать мой проект «Гватемальская пианистическая антология», а также проект «Музыкальная прогулка по Латинской Америке», который я развиваю в России. Последний не просто представляет музыку, но и анализирует влияние традиционного на академическое через творчество таких композиторов, как Вилла-Лобос, Джинастера, Мануэль Понсе или Мойсес Молейро.</p>

  <p>Моя цель — продолжать создавать, учить и популяризировать музыкальное богатство Гватемалы и Латинской Америки. Я не исключаю возвращения на родину, но сейчас моя задача — прокладывать путь там, где я нахожусь.</p>

   `,
  },
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

async function renderConcerts() {
  const list = document.getElementById("concertList");
  if (!list) return;

  await loadConcerts();

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
    </div>
  `,
    )
    .join("");

  setTimeout(initFadeObserver, 100);
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

/* ---------- Render Press ---------- */
function renderPress() {
  const grid = document.getElementById("pressGrid");
  if (!grid) return;

  grid.innerHTML = pressData
    .map((p, index) => {
      // Generate image gallery HTML
      const imagesHtml = p.images
        .map(
          (img, imgIndex) => `
          <div class="press-image-item ${imgIndex === 0 ? "active" : ""}" data-img-index="${imgIndex}">
            <img src="${img}" alt="${p.magazine} — страница ${imgIndex + 1}" loading="lazy" />
          </div>
        `,
        )
        .join("");

      // Generate pagination dots if multiple images
      const dotsHtml =
        p.images.length > 1
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

      // Navigation arrows if multiple images
      const navHtml =
        p.images.length > 1
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
            <div class="press-image-slider" data-total="${p.images.length}">
              <div class="press-image-wrapper">
                ${imagesHtml}
              </div>
              ${navHtml}
              ${dotsHtml}
            </div>
            <div class="press-info">
              <div class="press-meta">
                <span class="press-magazine"><i class="fas fa-newspaper"></i>${p.magazine}</span>
                <span class="press-date"><i class="fas fa-calendar-alt"></i>${p.date}</span>
              </div>
              <h3>${p.title}</h3>
              <div class="press-text">
                ${p.text}
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

  // Add click handlers for press toggle buttons
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
  const wrapper = slider.querySelector(".press-image-wrapper");
  const items = slider.querySelectorAll(".press-image-item");
  const dots = slider.querySelectorAll(".press-dot");
  const prevBtn = slider.querySelector(".press-nav-prev");
  const nextBtn = slider.querySelector(".press-nav-next");
  const currentPage = slider.querySelector(".press-current-page");
  const total = items.length;
  let currentIndex = 0;

  function goTo(index) {
    // Update items
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Update current page number
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

  // Event listeners
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

  // Keyboard navigation for accessibility
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  // Auto-advance every 5 seconds, but pause on hover
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

  // Close any other open articles
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

  // Toggle current
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

    // Scroll to the card so the user sees the text expand
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
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
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate fields
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

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
  submitBtn.disabled = true;

  try {
    // Send data to PHP endpoint
    const response = await fetch("/api/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    // Restore button
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;

    // Clear status after 6 seconds
    setTimeout(() => {
      formStatus.className = "form-status";
      formStatus.textContent = "";
    }, 6000);
  }
});

/* ---------- Initialization / Init ---------- */
renderMusic();
renderVideos();
renderGallery();
renderPress();
initFadeObserver();

// Load concerts asynchronously
(async function init() {
  await renderConcerts();
})();

const initialHash = location.hash.replace("#", "") || "home";
if (initialHash !== "home") navigateTo(initialHash);
