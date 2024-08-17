const $menu = document.querySelector('.mobile-menu');
const delay = 600;
let animate = false;

if ($menu) {
  const $menuToggleBtns = document.querySelectorAll('.js-toggle-menu');
  $menuToggleBtns.forEach($menuToggle => {
    $menuToggle.addEventListener('click', () => {
      toggle($menu, $menuToggleBtns)
      animate = true;
    
      if ($menu.classList.contains('mobile-menu--show')) {
        $menu.classList.remove("mobile-menu--show");
      } else {
        setTimeout(() => $menu.classList.add("mobile-menu--show"), delay);
      }
  
      setTimeout(() => animate = false, delay);
    });
  });
}

function toggle($menu, $menuToggleBtns) {
  $menu?.classList.toggle('mobile-menu--active');
  $menuToggleBtns.forEach($menuToggle => $menuToggle.classList.toggle('menu-toggle--active'));
  document.body.classList.toggle('body--lock')
}