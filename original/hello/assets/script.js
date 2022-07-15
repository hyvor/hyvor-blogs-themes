function toggleLanguageDropdown() {
    document.getElementById('lang-selector').classList.toggle("open");
    document.getElementById('lang-selector-closer').classList.toggle("open");
}

document.addEventListener('flashload:navigationEnded', function() {
    document.getElementById('lang-selector').classList.remove('open');
    document.getElementById('lang-selector-closer').classList.remove('open');
});