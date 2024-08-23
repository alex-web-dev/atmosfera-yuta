const $equipment = document.querySelector(".equipment");
if ($equipment) {
  const $btn = $equipment.querySelector(".equipment__btn");
  const $table = $equipment.querySelector(".equipment-table");
  const $footer = $equipment.querySelector('.equipment__footer');

  $btn.addEventListener(
    "click",
    () => {
      $table.classList.add("equipment-table--active");
      $footer.classList.add("equipment__footer--hide");
    },
    { once: true }
  );
}
