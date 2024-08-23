export function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

export function lockBody(lockBy = "") {
  const scrollbarWidthPX = `${getScrollbarWidth()}px`;

  document.body.classList.add("body--lock");
  document.body.style.paddingRight = scrollbarWidthPX;
  document.body.dataset.lockedBy = lockBy;

  const $absoluteElems = document.querySelectorAll(".header");
  $absoluteElems.forEach(($elem) => ($elem.style.paddingRight = scrollbarWidthPX));
}

export function unlockBody() {
  document.body.classList.remove("body--lock");
  document.body.style.paddingRight = "";
  document.body.removeAttribute("data-locked-by");

  const $absoluteElems = document.querySelectorAll(".header");
  $absoluteElems.forEach(($elem) => ($elem.style.paddingRight = ""));
}

export function extractNumber(str) {
  let match = str.match(/\d[\d\s]*\d|\d/);
  return match ? parseInt(match[0].replace(/\s+/g, ""), 10) : null;
}

export function getYearString(N) {
  const lastDigit = N % 10;
  const lastTwoDigits = N % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "лет";
  }

  switch (lastDigit) {
    case 1:
      return "год";
    case 2:
    case 3:
    case 4:
      return "года";
    default:
      return "лет";
  }
}

export function createElem(type, className, options) {
  const $elem = document.createElement(type);
  $elem.className = className;
  for (let key in options) {
    $elem[key] = options[key];
  }

  return $elem;
}

export default {
  lockBody,
  unlockBody,
  extractNumber,
  getYearString,
  createElem,
};
