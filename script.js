const cityFacts = {
  chu: {
    title: "Чувашия",
    image: "img/city-photo-3.png",
    imageAlt: "Старинный вид Иркутска",
    text:
      "Здесь в 1777 году родился Никита Яковлевич Бичурин. Родной край и духовное училище заложили основу его образования и интереса к языкам. От Поволжья начинался путь, который позже привёл его в духовную миссию в Китае."
  },
  irk: {
    title: "Иркутск",
    image: "img/city-photo-2.png",
    imageAlt: "Историческая фотография города Чебоксары",
    text:
      "Иркутск на обратном пути из Китая был одним из ключевых сибирских пунктов: здесь пересекались дороги империи, останавливались купцы и путешественники. Для Бичурина это был этап возвращения к научной и издательской работе в России."
  },
  pek: {
    title: "Пекин",
    image: "img/city-photo-1.png",
    imageAlt: "Старинная фотография Пекина",
    text:
      "В Пекине Бичурин провёл много лет в составе духовной миссии: изучал китайский язык, работал с источниками, переводил и готовил материалы для первых в России систематических трудов о Китае. Именно здесь сложился его масштаб как китаеведа."
  }
};

const modal = document.getElementById("city-modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalFigure = document.getElementById("modal-figure");
const modalImage = document.getElementById("modal-image");
const mapPins = document.querySelectorAll(".map-pin");
const closeModalControls = document.querySelectorAll("[data-close-modal]");

function openModal(city) {
  if (!modal || !modalTitle || !modalText) {
    return;
  }
  modalTitle.textContent = city.title;
  modalText.textContent = city.text;
  if (modalFigure && modalImage && city.image) {
    modalImage.src = city.image;
    modalImage.alt = city.imageAlt || city.title;
    modalFigure.hidden = false;
  } else if (modalFigure) {
    modalFigure.hidden = true;
    if (modalImage) {
      modalImage.removeAttribute("src");
      modalImage.alt = "";
    }
  }
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  if (!modal) {
    return;
  }
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  if (modalFigure) {
    modalFigure.hidden = true;
  }
  if (modalImage) {
    modalImage.removeAttribute("src");
    modalImage.alt = "";
  }
}

if (mapPins.length > 0) {
  mapPins.forEach((pin) => {
    pin.addEventListener("click", () => {
      const cityCode = pin.dataset.city;
      const city = cityFacts[cityCode];
      if (city) {
        openModal(city);
      }
    });
  });
}

if (closeModalControls.length > 0) {
  closeModalControls.forEach((el) => {
    el.addEventListener("click", closeModal);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeModal();
  }
});

const revealItems = document.querySelectorAll(".fade-section, .timeline-item");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view", "is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const quizItems = document.querySelectorAll(".quiz-item");

if (quizItems.length > 0) {
  quizItems.forEach((item) => {
    const correctAnswer = item.dataset.correct;
    const buttons = item.querySelectorAll("button");
    const result = item.querySelector(".quiz-result");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.dataset.option;
        buttons.forEach((btn) => {
          btn.classList.remove("is-correct", "is-wrong");
          btn.disabled = true;
        });

        if (selected === correctAnswer) {
          button.classList.add("is-correct");
          result.textContent = "Верно!";
          result.classList.add("ok");
          result.classList.remove("nope");
        } else {
          button.classList.add("is-wrong");
          result.textContent = "Неверно. Попробуйте следующий вопрос.";
          result.classList.add("nope");
          result.classList.remove("ok");
        }
      });
    });
  });
}
