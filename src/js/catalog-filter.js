import { closeDropdown } from "./dropdown";

const $catalogFilters = document.querySelectorAll(".catalog-filter");
$catalogFilters.forEach(($catalogFilter) => {
  const $btn = $catalogFilter.querySelector(".catalog-filter__btn");
  const $btnValue = $btn.querySelector(".catalog-filter__btn-value");
  const $checkboxesInputs = $catalogFilter.querySelectorAll(".filter-checkbox .filter-checkbox__input");
  const $dropdown = $catalogFilter.closest('.dropdown');
  
  $checkboxesInputs.forEach(($checkboxInput) => {
    $checkboxInput.addEventListener("change", () => {
      closeDropdown($dropdown);
      if ($checkboxInput.dataset.label) $btnValue.innerHTML = $checkboxInput.dataset.label;
    });
  });
});
