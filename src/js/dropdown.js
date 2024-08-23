let isMouseDown = false;

const $dropdowns = document.querySelectorAll(".dropdown");
$dropdowns.forEach(($dropdown) => {
  const $btn = $dropdown.querySelector(".dropdown__btn");
  $btn.addEventListener("click", (e) => dropdownBtnHandler($btn, $dropdown, e));

  $dropdown.addEventListener("mousedown", () => isMouseDown = true);
});

window.addEventListener("click", (e) => {
  const $activeDropdown = document.querySelector(".dropdown--active");
  const isInner = e.target.closest(".dropdown") && !e.target.classList.contains("dropdown");

  if (!$activeDropdown || isInner || isMouseDown) {
    return;
  }

  closeDropdown($activeDropdown);
});

document.addEventListener("nouislider:start", () => (isMouseDown = true));
document.addEventListener("nouislider:end", () => setTimeout(() => (isMouseDown = false)));
window.addEventListener("mouseup", () => setTimeout(() => isMouseDown = false));

function dropdownBtnHandler($btn, $dropdown, e) {
  e.stopPropagation();

  const isActive = $dropdown.classList.contains("dropdown--active");

  document.querySelectorAll(".dropdown--active").forEach(($activeDropdown) => closeDropdown($activeDropdown));

  if (!isActive && (!$btn.dataset.dropdownMinWidth || window.innerWidth > $btn.dataset.dropdownMinWidth)) {
    openDropdown($dropdown);
  }
}

export function openDropdown($dropdown) {
  if (!$dropdown) return;

  const $btn = $dropdown.querySelector(".dropdown__btn");
  $dropdown.classList.add("dropdown--active");
  $btn.classList.add("dropdown__btn--active");

  const event = new Event("dropdown:show");
  $dropdown.dispatchEvent(event);
}

export function closeDropdown($dropdown) {
  if (!$dropdown) return;

  const $btn = $dropdown.querySelector(".dropdown__btn");
  $dropdown.classList.remove("dropdown--active");
  $btn.classList.remove("dropdown__btn--active");

  const event = new Event("dropdown:hide");
  $dropdown.dispatchEvent(event);
}

export default {
  openDropdown,
  closeDropdown,
};
