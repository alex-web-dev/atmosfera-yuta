import { computePosition, flip, shift, offset } from "@floating-ui/dom";

const tooltips = document.querySelectorAll(".tooltip");
tooltips.forEach((tooltip) => {
  const tooltipBtn = tooltip.querySelector(".tooltip__btn");
  const tooltipMain = tooltip.querySelector(".tooltip__main");

  tooltipBtn.addEventListener("mouseenter", function () {
    tooltip.classList.add("tooltip--active");

    computePosition(tooltip, tooltipMain, {
      placement: "bottom-start",
      middleware: [offset(8), flip(), shift()],
    }).then(({ x, y }) => {
      Object.assign(tooltipMain.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  });

  tooltipBtn.addEventListener("mouseleave", function () {
    tooltip.classList.remove("tooltip--active");
  });

  tooltipMain.addEventListener("mouseleave", function () {
    tooltip.classList.remove("tooltip--active");
  });
});
