import Swiper from "swiper";
import { Pagination, EffectFade } from "swiper/modules";

Swiper.use([Pagination, EffectFade]);

const $productCards = document.querySelectorAll(".product-card");
$productCards.forEach(($productCard) => {
  const $slider = $productCard.querySelector(".product-card__slider");
  if ($slider) {
    const $sliderPagination = $productCard.querySelector(".product-card__pagination");
    const $visualPagination = $productCard.querySelector(".product-card__visual-pagination");
    const swiper = new Swiper($slider, {
      slidesPerView: 1,
      speed: 500,
      effect: "fade",
      pagination: {
        el: [$sliderPagination, $visualPagination],
        clickable: true,
      },
    });

    const $bullets = $sliderPagination.querySelectorAll(".swiper-pagination-bullet");
    $bullets.forEach(($bullet, index) => {
      $bullet.addEventListener("mouseenter", () => {
        swiper.slideTo(index);
      });
    });

    const $link = $productCard.querySelector(".product-card__img-main");
    $sliderPagination.addEventListener("click", (e) => {
      e.stopPropagation();
      // $link.click();
    });
  }

  const $bookmarkBtn = $productCard.querySelector('.product-card__bookmark-btn');
  $bookmarkBtn?.addEventListener('click', () => {
    $bookmarkBtn.classList.toggle('product-card__bookmark-btn--active');
  })
});
