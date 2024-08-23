import noUiSlider from "nouislider";
import { extractNumber, getYearString } from "./helpers";

const $priceFilters = document.querySelectorAll(".filter-price");
$priceFilters.forEach(($filter) => {
  const $slider = $filter.querySelector(".filter-price__slider");
  const data = {
    min: +$slider.dataset.min,
    max: +$slider.dataset.max,
    startMin: +$slider.dataset.startMin,
    startMax: +$slider.dataset.startMax,
    step: +$slider.dataset.step,
    maxPercent: +$slider.dataset.maxPercent,
    minLabel: $slider.dataset.minLabel ?? "",
    maxLabel: $slider.dataset.maxLabel ?? "",
  };

  const sliderStart = [];
  if (data.startMin) sliderStart.push(data.startMin);
  if (data.startMax) sliderStart.push(data.startMax);

  noUiSlider.create($slider, {
    start: sliderStart,
    connect: sliderStart.length === 1 ? "lower" : true,
    step: data.step,
    range: {
      min: data.min,
      max: data.max,
    },
    format: {
      from: (value) => Math.round(value),
      to: (value) => Math.round(value),
    },
  });

  const $minInput = $filter.querySelector(".filter-price__input--min");
  const $maxInput = $filter.querySelector(".filter-price__input--max");
  $minInput?.addEventListener("blur", () => {
    $slider.noUiSlider.set(extractNumber($minInput.value));
    updateFilterCheckInput($filter);
  });
  $maxInput?.addEventListener("blur", () => {
    $slider?.noUiSlider.set([null, extractNumber($maxInput.value)]);
    updateFilterCheckInput($filter);
  });

  const $minInputText = $filter.querySelector(".filter-price__input-text");
  const $minWidthElem = $minInput?.closest(".filter-price__field").querySelector(".filter-price__field-width");
  if ($minWidthElem) {
    $minInput?.addEventListener("input", () => {
      updateInputWidth($minInput, $minWidthElem);

      if ($minInputText && $minInputText.dataset.type === 'year') {
        $minInputText.textContent = getYearString($minInput.value, true);
      }
    });
    const resizeObserver = new ResizeObserver(() => {
      if ($minWidthElem.offsetWidth !== $minInput.offsetWidth) {
        updateInputWidth($minInput, $minWidthElem);
      }
    });
    resizeObserver.observe($minWidthElem);
  }

  const $maxWidthElem = $maxInput?.closest(".filter-price__field").querySelector(".filter-price__field-width");
  if ($maxWidthElem) {
    $maxInput?.addEventListener("input", () => updateInputWidth($maxInput, $maxWidthElem));
    const resizeObserver = new ResizeObserver(() => {
      if ($maxWidthElem.offsetWidth !== $maxInput.offsetWidth) {
        updateInputWidth($minInput, $maxWidthElem);
      }
    });
    resizeObserver.observe($maxWidthElem);
  }

  $slider.noUiSlider.on("update", (values) => {
    const minValue = `${data.minLabel} ${values[0]}`.trim();
    const maxValue = `${data.maxLabel} ${values[1]}`.trim();

    if ($minInput) {
      $minInput.imask ? ($minInput.imask.value = minValue) : ($minInput.value = minValue);
    }

    if ($maxInput) {
      $maxInput.imask ? ($maxInput.imask.value = maxValue) : ($maxInput.value = maxValue);
    }

    if ($minInputText && $minInputText.dataset.type === 'year') {
      $minInputText.textContent = getYearString($minInput.value, true);
    }

    setTimeout(() => {
      updateInputWidth($minInput, $minWidthElem);
      updateInputWidth($maxInput, $maxWidthElem);
    });
  });

  $slider.noUiSlider.on("slide", () => updateFilterCheckInput($filter));

  const $dropdown = $filter.closest(".dropdown");
  $dropdown?.addEventListener("dropdown:show", () => {
    updateInputWidth($minInput, $minWidthElem);
    updateInputWidth($maxInput, $maxWidthElem);
  });

  const $headerPercent = $filter.querySelector(".filter-price__header-percent");
  if ($headerPercent) {
    $slider.noUiSlider.on("update", (values) => {
      $headerPercent.textContent = `${Math.floor((values[0] / data.maxPercent) * 100) || 0}%`;
    });
  }

  $slider.noUiSlider.on("start", () => document.dispatchEvent(new Event("nouislider:start")));
  $slider.noUiSlider.on("end", () => document.dispatchEvent(new Event("nouislider:end")));
});

const $updateInputs = document.querySelectorAll("[data-filter-price-name]");
$updateInputs.forEach(($updateInput) => {
  $updateInput.addEventListener("change", () => {
    const filterPriceName = $updateInput.dataset.filterPriceName;
    const $filterPrice = document.querySelector(`[data-name="${filterPriceName}"]`);
    const $slider = $filterPrice.querySelector(".filter-price__slider");
    const minValue = $updateInput.dataset.filterPriceMin;
    const maxValue = $updateInput.dataset.filterPriceMax;

    $slider?.noUiSlider.set([minValue, maxValue]);
  });
});

function updateInputWidth($input, $widthElem) {
  if (!$input || !$widthElem) {
    return;
  }

  $widthElem.textContent = $input.value || $input.placeholder;
  $input.style.width = $widthElem.offsetWidth + "px";
}

function updateFilterCheckInput($filter) {
  const $checkInput = document.querySelector(`#${$filter.dataset.updateCheckInputId}`);
  if ($checkInput && !$checkInput.checked) {
    $checkInput.checked = true;
    $checkInput.dispatchEvent(new Event("change"));
  }
}
