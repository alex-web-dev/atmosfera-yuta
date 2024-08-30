import Swiper from "swiper";
import { Navigation } from "swiper/modules";

Swiper.use([Navigation]);

const $customSliders = document.querySelectorAll(".custom-slider");
$customSliders.forEach(($customSlider) => {
  const $sliderMain = $customSlider.querySelector(".custom-slider__main");
  const $prevBtn = $customSlider.querySelector(".slider-controls__btn--prev");
  const $nextBtn = $customSlider.querySelector(".slider-controls__btn--next");
  const $pagination = $customSlider.querySelector(".custom-slider__pagination");
  const $controls = $customSlider.querySelector(".slider-controls");

  const handleSwiperUpdate = (swiper) => {
    controlsHandler($controls, {
      swiper,
      valueThis: +swiper.params.slidesPerView + +swiper.activeIndex,
      valueTotal: swiper.slides.length,
    });
  };

  const slidesPerView1341 = $sliderMain.dataset["slidesPerView-1341"] ?? 3;
  const slidesPerView1181 = $sliderMain.dataset["slidesPerView-1181"] ?? 3;
  const slidesPerView992 = $sliderMain.dataset["slidesPerView-992"] ?? 3;
  const slidesPerView641 = $sliderMain.dataset["slidesPerView-641"] ?? 2;
  const slidesPerView = $sliderMain.dataset.slidesPerView ?? 1;
  const spaceBetween = $sliderMain.dataset.spaceBetween ?? 21;
  const spaceBetween641 = $sliderMain.dataset["spaceBetween-641"] ?? 21;
  const spaceBetween992 = $sliderMain.dataset["spaceBetween-992"] ?? 21;
  const spaceBetween1181 = $sliderMain.dataset["spaceBetween-1181"] ?? 21;
  const spaceBetween1341 = $sliderMain.dataset["spaceBetween-1341"] ?? 21;

  new Swiper($sliderMain, {
    slidesPerView,
    spaceBetween,
    speed: 500,
    navigation: {
      prevEl: $prevBtn,
      nextEl: $nextBtn,
    },
    pagination: {
      el: $pagination,
      clickable: true,
    },
    breakpoints: {
      641: {
        slidesPerView: slidesPerView641,
        spaceBetween: spaceBetween641,
      },
      992: {
        slidesPerView: slidesPerView992,
        spaceBetween: spaceBetween992,
      },
      1181: {
        slidesPerView: slidesPerView1181,
        spaceBetween: spaceBetween1181,
      },
      1341: {
        slidesPerView: slidesPerView1341,
        spaceBetween: spaceBetween1341,
      },
    },
    on: {
      init: handleSwiperUpdate,
      slideChange: handleSwiperUpdate,
      lock: handleSwiperUpdate,
      unlock: handleSwiperUpdate,
      breakpoint: handleSwiperUpdate,
    },
  });
});

function controlsHandler($controls, { swiper, valueThis = 0, valueTotal = 0 }) {
  if (!$controls) return;

  if (swiper.isLocked) {
    $controls.classList.remove("custom-slider__controls--show");
  } else {
    $controls.classList.add("custom-slider__controls--show");
  }

  const $valueThis = $controls.querySelector(".slider-controls__value-this");
  const $valueTotal = $controls.querySelector(".slider-controls__value-total");
  if ($valueThis && $valueTotal) {
    $valueThis.innerText = valueThis;
    $valueTotal.innerText = valueTotal;
  }
}
