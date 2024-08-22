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
    connect: sliderStart.length === 1 ? 'lower' : true,
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
  if ($minInput && $maxInput) {
    $minInput?.addEventListener("blur", () => {
      $slider.noUiSlider.set(extractNumber($minInput.value));
    });
    $maxInput.addEventListener("blur", () => {
      $slider?.noUiSlider.set([null, extractNumber($maxInput.value)]);
    });

    const $minWidthElem = $minInput.closest(".filter-price__field").querySelector(".filter-price__field-width");
    $minInput.addEventListener("input", () => updateInputWidth($minInput, $minWidthElem));

    const $maxWidthElem = $maxInput.closest(".filter-price__field").querySelector(".filter-price__field-width");
    $maxInput.addEventListener("input", () => updateInputWidth($maxInput, $maxWidthElem));

    $slider.noUiSlider.on("update", (values) => {
      const minValue = `${data.minLabel} ${values[0].toLocaleString("ru-RU")}`.trim();
      const maxValue = `${data.maxLabel} ${values[1].toLocaleString("ru-RU")}`.trim();

      $minInput.imask ? ($minInput.imask.value = minValue) : ($minInput.value = minValue);
      $maxInput.imask ? ($maxInput.imask.value = maxValue) : ($maxInput.value = maxValue);

      setTimeout(() => {
        updateInputWidth($minInput, $minWidthElem);
        updateInputWidth($maxInput, $maxWidthElem);
      });
    });

    const $dropdown = $filter.closest(".dropdown");
    $dropdown?.addEventListener("dropdown:show", () => {
      updateInputWidth($minInput, $minWidthElem);
      updateInputWidth($maxInput, $maxWidthElem);
    });
  }

  const $headerNumValue = $filter.querySelector(".filter-price__header-value");
  if ($headerNumValue) {
    $slider.noUiSlider.on("update", (values) => {
      if ($headerNumValue.dataset.filterType === "rub") {
        $headerNumValue.textContent = `${values[0].toLocaleString("ru-RU")} руб.`;
      } else if ($headerNumValue.dataset.filterType === "year") {
        $headerNumValue.textContent = getYearString(values[0]);
      } else {
        $headerNumValue.textContent = values[0].toLocaleString("ru-RU");
      }
    });
  }

  const $headerPercent = $filter.querySelector(".filter-price__header-percent");
  if ($headerPercent) {
    $slider.noUiSlider.on("update", (values) => {
      $headerPercent.textContent = `${Math.floor((values[0] / data.maxPercent) * 100) || 0}%`;
    });
  }

  $slider.noUiSlider.on("start", () => {
    const event = new Event("nouislider:start");
    document.dispatchEvent(event);
  });

  $slider.noUiSlider.on("end", () => {
    const event = new Event("nouislider:end");
    document.dispatchEvent(event);
  });

  $filter.addEventListener("mousedown", () => {
    const event = new Event("price-filter:mouse-down");
    document.dispatchEvent(event);
  });

  document.addEventListener("mouseup", () => {
    const event = new Event("price-filter:mouse-up");
    document.dispatchEvent(event);
  });
});

function updateInputWidth($input, $widthElem) {
  if (!$input || !$widthElem) {
    return;
  }

  $widthElem.textContent = $input.value || $input.placeholder;
  $input.style.width = $widthElem.offsetWidth + "px";
}
