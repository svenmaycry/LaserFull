// Модуль работы с табами.
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