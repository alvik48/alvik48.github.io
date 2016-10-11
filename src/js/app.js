import {
  startAnimation as startCanvasAnimation
} from './app-canvas';

startCanvasAnimation();

const navItems = document.getElementsByClassName('app-nav__item');
const pages = document.getElementsByClassName('page-content');

window.setPage = function(el, page) {
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove('active');
  }
  el.classList.add('active');

  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }
  document.getElementById(page).classList.add('active');
}
