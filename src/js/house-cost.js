import Swiper from "swiper";
import { Navigation, EffectFade } from "swiper/modules";

Swiper.use([Navigation, EffectFade]);

const $houseCost = document.querySelector(".house-cost");
if ($houseCost) {
  const $main = $houseCost.querySelector(".house-cost__main");
  const $result = $houseCost.querySelector(".house-cost__result");
  const $calc = $houseCost.querySelector(".house-calc");
  const $slider = $calc.querySelector(".house-calc__main");
  const $prevBtn = $calc.querySelector(".house-calc__footer-btn--prev");
  const $nextBtn = $calc.querySelector(".house-calc__footer-btn--next");
  const swiper = new Swiper($slider, {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 500,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: false,
    watchSlidesProgress: true,
    navigation: {
      prevEl: $prevBtn,
    },
    on: {
      init: (swiper) => updateProgress(swiper),
      slideChange: (swiper) => {
        updateProgress(swiper);
      },
    },
  });

  const $items = $calc.querySelectorAll(".product-category");
  $items.forEach(($item) => {
    const $checkboxBtn = $item.querySelector(".product-category__checkbox-btn");
    $checkboxBtn.addEventListener("click", () => {
      if (swiper.activeIndex + 1 < swiper.slides.length) {
        swiper.slideNext(500);
      } else {
        $main.classList.add("house-cost__main--hide");
        $result.classList.add("house-cost__result--show");
      }
    });
  });

  $nextBtn.addEventListener("click", () => {
    if (swiper.activeIndex + 1 < swiper.slides.length) {
      swiper.slideNext(500);
    } else {
      $main.classList.add("house-cost__main--hide");
      $result.classList.add("house-cost__result--show");
    }
  });
}

function updateProgress(swiper) {
  const progress = ((swiper.activeIndex + 1) / swiper.slides.length) * 100;
  document.querySelector(".progress-bar__fill").style.width = progress + "%";
}
