const $checkboxes = document.querySelectorAll(".btn-checkbox");
$checkboxes.forEach(($checkbox) => {
  const $btn = $checkbox.querySelector(".btn-checkbox__main");
  const $input = $checkbox.querySelector(".btn-checkbox__input");
  $btn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();

    if ($input.type === "radio") {
      $input.checked = true;
    } else {
      $input.checked = !$input.checked;
    }

    $input.dispatchEvent(new Event("change"));
  });
});
