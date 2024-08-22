import Swiper from "swiper";
import { Navigation, EffectFade } from "swiper/modules";

Swiper.use([Navigation, EffectFade]);

const $projectCost = document.querySelector(".project-cost");
if ($projectCost) {
  const $calc = $projectCost.querySelector(".project-cost__calc");
  const $result = $projectCost.querySelector(".project-cost__result");
  const $slider = $calc.querySelector(".project-calc__main");
  const $prevBtn = $calc.querySelector(".project-calc__footer-btn--prev");
  const $nextBtn = $calc.querySelector(".project-calc__footer-btn--next");
  const nextBtnText = $nextBtn.innerText;
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
      slideChange: (swiper) => {
        if (swiper.activeIndex + 1 >= swiper.slides.length) {
          $nextBtn.innerText = $nextBtn.dataset.lastText;
        } else {
          $nextBtn.innerText = nextBtnText;
        }
      },
    }
  });

  $nextBtn.addEventListener("click", () => {
    if (swiper.activeIndex + 1 < swiper.slides.length) {
      swiper.slideNext(500);
    } else {
      $calc.classList.add("project-cost__calc--hide");
      $result.classList.add("project-cost__result--show");
    }
  });

  const $checkboxes = $projectCost.querySelectorAll(".project-calc__checkbox");
  $checkboxes.forEach(($checkbox) => {
    const $input = $checkbox.querySelector(".btn-checkbox__input");
    $input.addEventListener("change", () => {
      const groupsName = $checkbox.dataset.groupsName;
      if (groupsName) {
        const index = $checkbox.dataset.index;
        const $childGroups = $projectCost.querySelector(`.project-calc__child-groups[data-groups-name="${groupsName}"]`);
        const $oldGroup = $childGroups.querySelector('.project-calc__group--active');
        $oldGroup?.classList.remove('project-calc__group--active');

        const $newGroup = $childGroups.querySelectorAll('.project-calc__group')[index];
        $newGroup?.classList.add('project-calc__group--active');

        const $newGroupFirstCheckboxInput = $newGroup.querySelector('.btn-checkbox__input');
        $newGroupFirstCheckboxInput.checked = true;
      }
    });
  });
}
