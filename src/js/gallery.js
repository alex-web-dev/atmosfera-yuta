import Swiper from "swiper";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { createElem } from "./helpers";

Swiper.use([Navigation, Thumbs, FreeMode]);

const $boxes = document.querySelectorAll(".gallery");
$boxes.forEach(($galleryBox, boxIndex) => {
  const duration = $galleryBox.dataset.duration ? $galleryBox.dataset.duration : 400;
  createGalleryModal($galleryBox, boxIndex, duration);

  const $items = $galleryBox.querySelectorAll(".gallery__item");
  $items.forEach(($item, index) => {
    const $btns = $item.querySelectorAll(".gallery__btn");
    $btns.forEach(($btn) => {
      $btn.addEventListener("click", () => {
        openGalleryModal(boxIndex, index);
      });
    });
  });
});

function openGalleryModal(boxIndex, imgIndex) {
  const $modal = document.querySelectorAll(".gallery-modal")[boxIndex];
  const $slider = $modal.querySelector(".gallery-modal__slider");

  $slider.swiper.slideTo(imgIndex, 0, false);
  $modal.classList.add("gallery-modal--hide");
  $modal.classList.add("gallery-modal--active");
  setTimeout(() => $modal.classList.remove("gallery-modal--hide"), 10);
}

function closeGalleryModal(boxIndex) {
  const $modal = document.querySelectorAll(".gallery-modal")[boxIndex];

  $modal.classList.add("gallery-modal--hide");
  setTimeout(() => {
    $modal.classList.remove("gallery-modal--hide");
    $modal.classList.remove("gallery-modal--active");
  }, 400);
}

function createGalleryModal($galleryBox, boxIndex, duration) {
  const $modal = document.createElement("div");
  $modal.className = "gallery-modal";
  $modal.style.transitionDuration = `${duration}ms`;
  $modal.innerHTML = `
    <div class="gallery-modal__content">
      <div class="gallery-modal__main">
        <div class="gallery-modal__slider swiper"></div>
        <div class="gallery-modal__controls">
          <button class="btn-prev btn-prev--white gallery-modal__prev"></button>
          <button class="btn-next btn-next--white gallery-modal__next"></button>
        </div>
      </div>
      <div class="gallery-modal__thumbnails swiper"></div>
    </div>
    <div class="gallery-modal__backdrop"></div>
    <button class="gallery-modal__close"></button>
  `;

  const $items = $galleryBox.querySelectorAll(".gallery__item");
  if ($items.length === 1) $modal.classList.add("gallery-modal--single");

  const $sliderWrapper = document.createElement("div");
  $sliderWrapper.className = "swiper-wrapper";
  $items.forEach(($item) => {
    const $slide = document.createElement("div");
    $slide.className = "swiper-slide";
    $slide.innerHTML = `<img src="${$item.dataset.img}">`;
    $sliderWrapper.append($slide);
  });

  document.body.appendChild($modal);

  const $slider = $modal.querySelector(".gallery-modal__slider");
  $slider.append($sliderWrapper);

  const $thumbnails = $modal.querySelector(".gallery-modal__thumbnails");
  const $thumbnailsWrapper = createElem("div", "swiper-wrapper");
  $items.forEach(($items) => {
    const $thumbnail = document.createElement("div");
    $thumbnail.className = "gallery-modal__thumbnail";
    $thumbnail.innerHTML = `<img src="${$items.dataset.img}">`;

    const $slide = createElem("div", "swiper-slide gallery-modal__thumbnails-slide");
    $slide.append($thumbnail);

    $thumbnailsWrapper.append($slide);
  });

  $thumbnails.append($thumbnailsWrapper);

  const $content = $modal.querySelector(".gallery-modal__content");
  $content.append($thumbnails);

  const $prev = $modal.querySelector(".gallery-modal__prev");
  const $next = $modal.querySelector(".gallery-modal__next");

  const thumnailsSlider = new Swiper($thumbnails, {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
  });

  const slidesPerView = $items.length === 1 ? "auto" : 1;
  const spaceBetween = $items.length === 1 ? 0 : 20;
  new Swiper($slider, {
    slidesPerView,
    spaceBetween,
    speed: 600,
    navigation: {
      prevEl: $prev,
      nextEl: $next,
    },
    thumbs: {
      swiper: thumnailsSlider,
    },
    on: {
      click: (_, e) => {
        if (e.target.classList.contains("swiper-slide")) {
          closeGalleryModal(boxIndex);
        }
      },
    },
  });

  const $close = $modal.querySelector(".gallery-modal__close");
  $close.addEventListener("click", () => closeGalleryModal(boxIndex));

  const $backdrop = $modal.querySelector(".gallery-modal__backdrop");
  $backdrop.addEventListener("click", () => closeGalleryModal(boxIndex));
}
