import IMask from "imask";

const $inputs = document.querySelectorAll(".js-imask");
$inputs.forEach(($input) => {
  const mask = $input.dataset.mask;
  let imask = null;

  if (mask === "int") {
    const min = $input.dataset.maskMin ? parseInt($input.dataset.maskMin, 10) : null;
    const max = $input.dataset.maskMax ? parseInt($input.dataset.maskMax, 10) : null;

    let maskValue = $input.dataset.maskLabel ? `${$input.dataset.maskLabel} num` : "num";
    if ($input.dataset.maskText) {
      maskValue += ` ${$input.dataset.maskText}`;
    }

    imask = IMask($input, {
      mask: maskValue,
      lazy: false,
      signed: false,
      blocks: {
        num: {
          mask: Number,
          min,
          max,
          thousandsSeparator: " ",
          scale: 0,
        },
      },
    });
  } else {
    imask = IMask($input, { mask });
  }

  $input.imask = imask;
});
