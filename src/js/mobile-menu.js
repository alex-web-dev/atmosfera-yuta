const $menu = document.querySelector('.mobile-menu');
const delay = 600;

if ($menu) {
  const $menuToggleBtns = document.querySelectorAll('.js-toggle-menu');
  $menuToggleBtns.forEach($menuToggle => {
    $menuToggle.addEventListener('click', () => {
      toggle($menu, $menuToggleBtns)
    
      if ($menu.classList.contains('mobile-menu--show')) {
        $menu.classList.remove("mobile-menu--show");
      } else {
        setTimeout(() => $menu.classList.add("mobile-menu--show"), delay);
      }
    });
  });

  const $closeMenuBtns = document.querySelectorAll('.js-close-menu');
  $closeMenuBtns.forEach($closeBtn => {
    $closeBtn.addEventListener('click', () => close($menu, $menuToggleBtns));
  });
}

function toggle($menu, $menuToggleBtns) {
  $menu?.classList.toggle('mobile-menu--active');
  $menuToggleBtns.forEach($menuToggle => $menuToggle.classList.toggle('menu-toggle--active'));
  document.body.classList.toggle('body--lock')
}

function close($menu, $menuToggleBtns) {
  $menu?.classList.remove('mobile-menu--active');
  $menuToggleBtns.forEach($menuToggle => $menuToggle.classList.remove('menu-toggle--active'));
  document.body.classList.remove('body--lock')
}