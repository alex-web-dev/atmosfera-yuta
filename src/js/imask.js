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
  } else if (mask === "date") {
    imask = IMask($input, {
      mask: Date,
      pattern: "d{.}`m{.}`Y",
      lazy: true,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 2000,
          to: 2099,
        },
      },
      format: (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      },
      parse: (str) => {
        const [day, month, year] = str.split(".").map(Number);
        return new Date(year, month - 1, day);
      },
    });
  } else {
    imask = IMask($input, { mask });
  }

  $input.imask = imask;
});
