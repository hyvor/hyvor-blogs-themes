/* ================
// Menu
================ */
function menuToggle() {
  document.getElementById('hamburger').classList.toggle("is-open");
  document.getElementById('menuList').classList.toggle("is-visible");
};


/* ================
// Language
================ */
function toggleLanguageDropdown() {
  document.getElementById('lang-selector').classList.toggle("open");
  document.getElementById('lang-selector-closer').classList.toggle("open");
}

document.addEventListener('flashload:navigationEnded', function() {
  document.getElementById('lang-selector').classList.remove('open');
  document.getElementById('lang-selector-closer').classList.remove('open');
});


/* =======================
// Scroll Top Button
======================= */
function btnScrollToTop() {
  if (window.scrollY != 0) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
}