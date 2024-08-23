const $resetFiltersBtns = document.querySelectorAll(".js-reset-filters");
$resetFiltersBtns.forEach(($resetFiltersBtn) => {
  $resetFiltersBtn.addEventListener("click", () => {
    const $catalog = document.querySelector(".catalog");
    resetFilter($catalog);
  });
});

function resetFilter($catalog) {
  const $filterMenues = $catalog.querySelectorAll(".catalog-filter__menu");
  $filterMenues.forEach(($filterMenu) => {
    const $firstCheckboxInput = $filterMenu.querySelector(".filter-menu__checkbox .filter-checkbox__input");
    $firstCheckboxInput.checked = true;
    $firstCheckboxInput.dispatchEvent(new Event("change"));

    const $filtersPrice = $filterMenu.querySelectorAll(".filter-price");
    $filtersPrice.forEach(($filterPrice) => {
      const $slider = $filterPrice.querySelector(".filter-price__slider");
      const startMin = $slider.dataset.startMin;
      const startMax = $slider.dataset.startMax;
      $slider.noUiSlider.set([startMin, startMax]);
    });

    const $numCheckboxes = $filterMenu.querySelectorAll(".filter-menu__checkboxes-num .checkboxes-num__item");
    $numCheckboxes.forEach(($numCheckbox) => {
      const $input = $numCheckbox.querySelector(".checkbox-num__input");
      $input.checked = false;
    });
  });
}
