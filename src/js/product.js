import Swiper from "swiper";
import { Thumbs, Navigation } from "swiper/modules";

Swiper.use([Thumbs, Navigation]);

const $product = document.querySelector(".product");
if ($product) {
  const $sliderItems = $product.querySelectorAll(".product__slider-item");
  $sliderItems.forEach(($sliderItem) => {
    const $navSlider = $sliderItem.querySelector(".product-nav-slider");
    const $mainSlider = $sliderItem.querySelector(".product-main-slider");

    const navSlider = new Swiper($navSlider, {
      slidesPerView: "auto",
      spaceBetween: 8,
      direction: "horizontal",
      breakpoints: {
        1261: {
          spaceBetween: 8,
          direction: "vertical",
          slidesPerView: "auto",
        },
        992: {
          direction: "vertical",
        },
      },
    });

    new Swiper($mainSlider, {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      thumbs: {
        swiper: navSlider,
      },
      mousewheel: {
        sensitivity: 1.4,
      },
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992 && navSlider.params.direction === "horizontal") {
        navSlider.update();
      } else if (window.innerWidth < 992 && navSlider.params.direction === "vertical") {
        navSlider.update();
      }
    });
  });

  const $sliderSwitchItems = $product.querySelectorAll(".product__switch-item");
  const $sliderSwitchInput = $product.querySelector(".product__switch-main .switch__input");
  $sliderSwitchInput.addEventListener("change", () => {
    switchSliderHandler({
      $input: $sliderSwitchInput,
      $switchItems: $sliderSwitchItems,
      $sliderItems: $sliderItems,
    });
  });

  $sliderSwitchItems.forEach(($switchItem, index) => {
    $switchItem.addEventListener("click", () => {
      if ((!$sliderSwitchInput.checked && index === 0) || ($sliderSwitchInput.checked && index === 1)) {
        return;
      }

      $sliderSwitchInput.checked = index !== 0;

      switchSliderHandler({
        $input: $sliderSwitchInput,
        $switchItems: $sliderSwitchItems,
        $sliderItems: $sliderItems,
      });
    });
  });

  const $bookmarkBtn = $product.querySelector(".product-info__bookmark-btn");
  $bookmarkBtn?.addEventListener("click", () => {
    $bookmarkBtn.classList.toggle("product-info__bookmark-btn--active");
  });
}

function switchSliderHandler({ $input, $switchItems, $sliderItems }) {
  $switchItems.forEach(($item) => $item.classList.remove("product__switch-item--active"));
  $sliderItems.forEach(($sliderItem) => $sliderItem.classList.remove("product__slider-item--active"));

  if ($input.checked) {
    $switchItems[1].classList.add("product__switch-item--active");
    $sliderItems[1].classList.add("product__slider-item--active");
  } else {
    $switchItems[0].classList.add("product__switch-item--active");
    $sliderItems[0].classList.add("product__slider-item--active");
  }
}
