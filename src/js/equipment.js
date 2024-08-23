const $equipment = document.querySelector(".equipment");
if ($equipment) {
  const $btn = $equipment.querySelector(".equipment__btn");
  const $table = document.querySelector(".equipment-table");
  const delay = 700;

  $btn.addEventListener(
    "click",
    () => {
      $table.classList.add("equipment-table--active");
      $btn.classList.add("equipment__btn--hide");
      setTimeout(() => $btn.remove(), delay);
    },
    { once: true }
  );
}
