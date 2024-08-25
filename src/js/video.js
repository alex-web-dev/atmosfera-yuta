const $videos = document.querySelectorAll(".video");
$videos.forEach(($video) => {
  const preview = $video.querySelector(".video__preview");
  preview.addEventListener("click", () => loadVideo($video));
});

function loadVideo($video) {
  const $main = $video.querySelector(".video__main");
  const $iframe = $main.querySelector("iframe");
  const $preview = $video.querySelector(".video__preview");

  if ($iframe.dataset.src) {
    $iframe.src = $iframe.getAttribute("data-src");
  }
  
  $main.classList.add("video__main--show");

  $preview.classList.add("video__preview--hide");
}
