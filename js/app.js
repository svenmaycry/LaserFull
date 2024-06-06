//=========================JS БЛОК ШАПКИ=======================

const body = document.querySelector('body');
const iconMenuButton = document.querySelector('.js-icon-menu');
const searchButton = document.querySelector('.js-search-header-button');
const overlay = document.querySelector('.js-header-overlay');
const mainHeader = document.querySelector('.js-main-header');
const headerContainer = document.querySelector('.js-main-header-container');
const mainNavItemButton = document.querySelectorAll('.js-main-nav-item-button');

// Модуль работы с меню (бургер).
let bodyLockStatus = true;

let bodyLockToggle = () => {
  if (body.classList.contains("lock")) bodyUnlock();
  else bodyLock();
};

let bodyUnlock = () => {
  if (bodyLockStatus) {
    body.classList.remove("lock");
    bodyLockStatus = true;
  }
};

let bodyLock = () => {
  if (bodyLockStatus) {
    body.classList.add("lock");
    bodyLockStatus = true;
  }
};

function menuInit() {
  if (iconMenuButton)
    document.addEventListener("click", function (e) {
      if (bodyLockStatus && e.target.closest(".js-icon-menu")) {
        bodyLockToggle();
        body.classList.toggle("main-nav-open");
      }
    });
}

menuInit();

// Модуль работы со спойлерами.
function spoilers() {
  const spoilersArray = document.querySelectorAll("[data-spoilers]");

  if (spoilersArray.length > 0) {
    const spoilersRegular = Array.from(spoilersArray).filter(function (item) {
      return !item.dataset.spoilers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spoilersRegular.length) initSpoilers(spoilersRegular);

    // Инициализация
    function initSpoilers(spoilersArray, matchMedia = false) {
      spoilersArray.forEach((spoilersBlock) => {
        spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
        if (matchMedia.matches || !matchMedia) {
          spoilersBlock.classList.add("--spoiler-init");
          initSpoilerBody(spoilersBlock);
          spoilersBlock.addEventListener("click", setSpoilerAction);
        } else {
          spoilersBlock.classList.remove("--spoiler-init");
          initSpoilerBody(spoilersBlock, false);
          spoilersBlock.removeEventListener("click", setSpoilerAction);
        }
      });
    }

    // Работа с контентом
    function initSpoilerBody(spoilersBlock) {
      let spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
      if (spoilerTitles.length)
        spoilerTitles = Array.from(spoilerTitles).filter(
          (item) => item.closest("[data-spoilers]") === spoilersBlock
        );
    }

    function setSpoilerAction(e) {
      const el = e.target;
      if (el.closest("[data-spoiler]")) {
        const spoilerTitle = el.closest("[data-spoiler]");
        const spoilersBlock = spoilerTitle.closest("[data-spoilers]");
        const oneSpoiler = spoilersBlock.hasAttribute("data-one-spoiler");

        if (
          oneSpoiler &&
          !spoilerTitle.classList.contains("--spoiler-active")
        ) {
          hideSpoilersBody(spoilersBlock);
        }

        if (window.innerWidth >= 1279) {
          overlay.classList.toggle("--active");
        }

        if (!body.classList.contains("main-nav-open")) {
          body.classList.toggle("lock");
        }

        spoilerTitle.classList.toggle("--spoiler-active");
        e.preventDefault();
      }
    }

    // Закрытие при клике вне спойлера
    function hideSpoilersBody(spoilersBlock) {
      const spoilerActiveTitle = spoilersBlock.querySelector(
        "[data-spoiler].--spoiler-active"
      );
      if (spoilerActiveTitle) {
        overlay.classList.remove("--active");

        body.classList.remove("lock");

        spoilerActiveTitle.classList.remove("--spoiler-active");
      }
    }

    const spoilersClose = document.querySelectorAll("[data-spoiler-close]");

    const isEscapeKey = (e) => "Escape" === e.key;

    if (spoilersClose.length) {
      document.addEventListener("click", function (e) {
        if (!e.target.closest("[data-spoilers]"))
          spoilersClose.forEach((spoilerClose) => {
            overlay.classList.remove("--active");
            if (!body.classList.contains("main-nav-open"))
              body.classList.remove("lock");
            spoilerClose.classList.remove("--spoiler-active");
          });
      });
      document.addEventListener("keydown", function (e) {
        if (isEscapeKey(e))
          spoilersClose.forEach((spoilerClose) => {
            overlay.classList.remove("--active");
            if (!body.classList.contains("main-nav-open"))
              body.classList.remove("lock");
            spoilerClose.classList.remove("--spoiler-active");
          });
      });
    }
  }
}

spoilers();

// Модуль работы с табами шапки
function tabsHeader() {
  const tabs = document.querySelectorAll('[data-tabs-header]');
  let tabsActiveHash = [];

  tabs.forEach((tabsBlock, index) => {
    tabsBlock.classList.add('--tab-init');
    tabsBlock.setAttribute('data-tabs-header-index', index);
    tabsBlock.addEventListener('mouseover', setTabsAction);
    initTabs(tabsBlock);
  });

  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-header-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-header-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] === tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        '[data-tabs-header-titles]>.main-nav-tab-active'
      );
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-header-title', '');
        tabsContentItem.setAttribute('data-tabs-header-item', '');

        if (tabsActiveHashBlock && index === tabsActiveHash[1]) {
          tabsTitles[index].classList.add('main-nav-tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains(
          'main-nav-tab-active'
        );
      });
    }
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-header-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-header-item]');

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-header-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }

    const tabsBlockAnimate = isTabsAnimate(tabsBlock);
    if (tabsContent.length > 0) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs-header]') === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('main-nav-tab-active')) {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = false;
          }
        } else {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-header-title]')) {
      const tabTitle = el.closest('[data-tabs-header-title]');
      const tabsBlock = tabTitle.closest('[data-tabs-header]');
      if (
        !tabTitle.classList.contains('main-nav-tab-active') &&
        !tabsBlock.querySelector('._slide')
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          '[data-tabs-header-title].main-nav-tab-active'
        );
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
            (item) => item.closest('[data-tabs-header]') === tabsBlock
          ))
          : null;
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove('main-nav-tab-active')
          : null;
        tabTitle.classList.add('main-nav-tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}

tabsHeader();


// Модуль с моим кодом.

// При клике на поиск закрытие Меню-бургер + Сохранение класса lock.
const closeBurgerMenu = () => {
  if (body.classList.contains("main-nav-open"))
    body.classList.remove("main-nav-open", "lock");
};

// При клике на поиск добавлять/убирать оверлей. Меняем класс lock у body.
const overlayClassToggle = () => {
  if (window.innerWidth <= 1279) overlay.classList.toggle("--active");
};

// При клике на меню удаление класса --active оверлея.
const overlayClose = () => {
  overlay.classList.remove("--active");
};

// При клике на меню закрытие поиска + Сохранение класса lock.
const closeSearchWrapper = () => {
  if (searchButton.classList.contains("--spoiler-active")) {
    searchButton.classList.remove("--spoiler-active");
    body.classList.remove("lock");
  }
};

// При клике на меню и поиск закрытие спойлеров мобильного меню.
const closeSpoilersContent = () => {
  if (body.classList.contains("main-nav-open")) {
    mainNavItemButton.forEach((oneButton) => {
      if (oneButton.classList.contains("--spoiler-active")) {
        oneButton.classList.remove("--spoiler-active");
      }
    });
  }
};

// При скролле страницы показ и скрытие шапки.
let prevScrollPos = window.scrollY;
const headerHeight = mainHeader.offsetHeight;
const scrollThreshold = 200;

const showAndHideHeader = () => {
  let currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) mainHeader.style.top = "0px";
  else if (currentScrollPos > scrollThreshold)
    mainHeader.style.top = `-${headerHeight}px`;
  prevScrollPos = currentScrollPos;
};

// Изменить атрибут у контейнера шапки для изменения логики работы Спойлеров.
const changeContainerAttribute = () => {
  if (window.innerWidth <= 1279)
    headerContainer.removeAttribute("data-one-spoiler");
  else if (window.innerWidth >= 1279)
    headerContainer.setAttribute("data-one-spoiler", "");
};

// Закрыть спойлера, оверлея и lock body, при ресайзе страницы.
const closeSpoiler = () => {
  if (!body.classList.contains("main-nav-open") && window.innerWidth <= 1279) {
    mainNavItemButton.forEach((spoiler) => {
      if (spoiler.classList.contains("--spoiler-active")) {
        spoiler.classList.remove("--spoiler-active");
        overlay.classList.remove("--active");
        body.classList.remove("lock");
      }
    });
  }

  if (body.classList.contains("main-nav-open") && window.innerWidth >= 1279) {
    body.classList.remove("lock", "main-nav-open");
    mainNavItemButton.forEach((spoiler) => {
      spoiler.classList.remove("--spoiler-active");
    });
  }
};

// Функции-хендлеры.
const onSearchClick = () => {
  closeSpoilersContent();
  closeBurgerMenu();
  overlayClassToggle();
};

const onIconMenuClick = (e) => {
  closeSearchWrapper();
  overlayClose(e);
  closeSpoilersContent();
};

const onDocumentScroll = () => {
  showAndHideHeader();
};

const onDocumentResize = () => {
  changeContainerAttribute();
  closeSpoiler();
};

// События на странице.
searchButton.addEventListener("click", onSearchClick);
iconMenuButton.addEventListener("click", onIconMenuClick);
document.addEventListener("scroll", onDocumentScroll);
window.addEventListener("resize", onDocumentResize);
window.addEventListener("load", onDocumentResize);


//=========================JS БЛОК ОТЗЫВОВ=======================

// Модуль работы с табами отзывов
function tabsReview() {
  const tabs = document.querySelectorAll("[data-tabs-review]");
  let tabsActiveHash = [];

  tabs.forEach((tabsBlock, index) => {
    tabsBlock.classList.add("--tab-init");
    tabsBlock.setAttribute("data-tabs-review-index", index);
    tabsBlock.addEventListener("click", setTabsAction);
    initTabs(tabsBlock);
  });

  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-review-titles]>*");
    let tabsContent = tabsBlock.querySelectorAll("[data-tabs-review-body]>*");
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        "[data-tabs-review-titles]>.--tab-active"
      );
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest("[data-tabs-review]") === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest("[data-tabs-review]") === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute("data-tabs-review-title", "");
        tabsContentItem.setAttribute("data-tabs-review-item", "");

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add("--tab-active");
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains(
          "--tab-active"
        );
      });
    }
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-review-title]");
    let tabsContent = tabsBlock.querySelectorAll("[data-tabs-review-item]");

    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute("data-tabs-review-animate")) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }

    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest("[data-tabs-review]") === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest("[data-tabs-review]") === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains("--tab-active")) {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = false;
          }
        } else {
          if (tabsBlockAnimate) {
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    if (el.closest("[data-tabs-review-title]")) {
      const tabTitle = el.closest("[data-tabs-review-title]");
      const tabsBlock = tabTitle.closest("[data-tabs-review]");
      if (
        !tabTitle.classList.contains("--tab-active") &&
        !tabsBlock.querySelector("._slide")
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          "[data-tabs-review-title].--tab-active"
        );
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
            (item) => item.closest("[data-tabs-review]") === tabsBlock
          ))
          : null;
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove("--tab-active")
          : null;
        tabTitle.classList.add("--tab-active");
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}

tabsReview();

//Свайпер отзывов
const swiper = new Swiper('.js-swiper-reviews', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: true,
  slidesPerView: 1,
  slidesPerGroup: 2,
  spaceBetween: 50,
  speed: 600,
  parallax: true,
  preloadImages: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    autoHeight: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Брейкпоинты

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 50,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    992: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1268: {
      slidesPerView: 2,
    },
  }

});

//=========================JS БЛОК CTRL+ENTER=======================

const modalMistakes = document.querySelector('.modal-mistakes');
const closeModalButton = document.querySelector('.modal-mistakes__close');
const formMistakes = document.querySelector('.form-mistakes');
const formMessage = document.querySelector('.form-mistakes__textarea');
const formName = document.querySelector('.form-mistakes__name');
const formSubmitButton = document.querySelector('.js-form-send');
const formCancelButton = document.querySelector('.js-form-cancel');
const selectedTextContainer = document.querySelector('.form-mistakes__selected-text');

const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 50;
const MAX_SELECTED_TEXT_LENGTH = 1000;


// Показать модалку с формой
const showModal = (evt) => {

  if (evt.ctrlKey && evt.keyCode === 13) {
    evt.preventDefault();
    let selectedText = window.getSelection().toString().trim();
    let sourceText = document.getElementById('source-text');
    (selectedText.length > 0) ? sourceText.setAttribute('value', selectedText) : null;

    if (modalMistakes.style.display === 'none' && selectedText === '') {
      alert('Выделите нужный текст для отправки формы!');
    } else if (modalMistakes.style.display === 'none') {
      if (selectedText.length > MAX_SELECTED_TEXT_LENGTH) {
        alert('Можно выделить не более 1000 символов!');
      } else {
        modalMistakes.style.display = 'flex';
        formMessage.focus();
        selectedTextContainer.textContent = selectedText;
        selectedTextContainer.style.cssText = 'color:red';
      }
    }
  }
}

// Отправка формы
const sendForm = () => {
  if (formMessage.value.trim() !== '') {
    formMistakes.submit();
    modalMistakes.style.display = 'none';
  } else {
    formMessage.style.borderColor = 'red';
  }
}

// Закрытие формы
const closeForm = () => {
  modalMistakes.style.display = 'none';
  formMessage.style.cssText = 'height:108px';
  formMessage.value = '';
  formName.value = '';

}

// При нажатии на ctrl+enter - показ формы, при клике на esp - закрытие формы.
const onDocumentKeydown = (evt) => {
  showModal(evt);
  if (evt.key === 'Escape') {
    closeForm();
  }
}

// При клике на отправить - отправка формы.
const onSubmitFormButtonClick = (evt) => {
  evt.preventDefault();
  sendForm();
}

// При клике на отмену - закрытие формы.
const onCancelFormButtonClick = () => {
  closeForm();
}

// Закрытие формы при клике на крестик.
const onCloseModalButtonClick = () => {
  closeForm();
}

// При клике вне модалки - закрытие формы.
const onWindowClick = (evt) => {
  if (evt.target === modalMistakes) {
    closeForm();
  }
}

// Обработчик события фокусировки на поле имени.
const onFocusFormMessage = () => {
  formMessage.style.borderColor = ''; // Снимаем подсветку границы
}

// Обработчик события потери фокуса на поле имени.
const onBlurFormMessage = () => {
  if (formMessage.value.trim() === '') {
    formMessage.style.borderColor = 'red'; // Устанавливаем красную подсветку границы
  }
}

// В textarea если длина вводимых символов больше MAX_MESSAGE_LENGTH - обрезка символов.
const onMessageInput = () => {
  if (formMessage.value.length > MAX_MESSAGE_LENGTH) {
    formMessage.value = formMessage.value.slice(0, MAX_MESSAGE_LENGTH);
  }
}

// В input если длина вводимых символов больше MAX_NAME_LENGTH - обрезка символов.
const onNameInput = () => {
  if (formName.value.length > MAX_NAME_LENGTH) {
    formName.value = formName.value.slice(0, MAX_NAME_LENGTH);
  }
}

document.addEventListener('keydown', onDocumentKeydown);
formSubmitButton.addEventListener('click', onSubmitFormButtonClick);
formCancelButton.addEventListener('click', onCancelFormButtonClick);
closeModalButton.addEventListener('click', onCloseModalButtonClick);
window.addEventListener('click', onWindowClick);
formMessage.addEventListener('focus', onFocusFormMessage);
formMessage.addEventListener('blur', onBlurFormMessage);
formMessage.addEventListener('input', onMessageInput);
formName.addEventListener('input', onNameInput);

//=============================СВАЙПЕР СТРАНИЦЫ БЛОГЕРА==================================
const videoSwiper = new Swiper('.js-swiper-blogger-videos', {
  // Optional parameters
  observer: true,
  observeParents: true,
  loop: true,
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 20,
  speed: 600,
  parallax: true,
  preloadImages: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    autoHeight: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Брейкпоинты

  breakpoints: {
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    992: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1268: {
      slidesPerView: 4,
    },
  }

});





