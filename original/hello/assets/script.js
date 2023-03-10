function toggleLanguageDropdown() {
    document.getElementById('lang-selector').classList.toggle("open");
    document.getElementById('lang-selector-closer').classList.toggle("open");
}

document.addEventListener('flashload:navigationEnded', function() {
    document.getElementById('lang-selector').classList.remove('open');
    document.getElementById('lang-selector-closer').classList.remove('open');
});



/**
 * Search
 * =======
 */
function initSearchOverlay() {
    'use strict';

    var modalOverlay = document.querySelector('.search-wrapper');
    var modal = document.querySelector('.search');
    var modalInput = document.querySelector('.search-field');

    document.getElementById('search').addEventListener('click', function (e) {
        e.preventDefault();
        modalOverlay.style.display = 'block';

        document.body.classList.add('search-active');
        modalInput.focus();

        if(document.body.classList.contains('menu-active')) {
            document.body.classList.remove('menu-active');
        }
    });

    function closeSearch() {
        document.body.classList.remove('search-active');
    }

    modalOverlay.addEventListener('click', closeSearch)
    document.querySelector('.search-wrapper-close').addEventListener('click', closeSearch)

    modal.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    document.body.addEventListener('keyup', function(e) {

        if (e.keyCode === 27 && document.body.classList.contains('search-active')) {
            closeSearch();
            modalInput.value = "";
        }

    });

    modalOverlay.addEventListener('transitionend', function (e) {
        if (!document.body.classList.contains('search-active')) {
            modalOverlay.style.display = 'none';
        }
    });

    modal.addEventListener('transitionend', function (e) {
        e.stopPropagation();
    });

}


function initSearch() {

    initSearchOverlay()

    var searchInput = document.querySelector('.search-field');
    var searchButton = document.querySelector('.search-button');
    var searchResult = document.querySelector('.search-result');
    var popular = document.querySelector('.popular-wrapper');

    var lastXhr;

    searchInput.addEventListener('keyup', function (e) {

        if (e.target.value.trim() === "") {
            searchResult.innerHTML = '';
            popular.style.display = 'block'
        }

        lastXhr && lastXhr.abort();

        lastXhr = _hb.dataApi('v0', 'posts/search', {
            search: e.target.value,
            keys: "title, url, description"
        }, function(response) {
            var posts = response.data;
            var output = '';
            posts.forEach(function(post) {
                output +=
                    '<div class="search-result-row">' +
                    '<a class="search-result-row-link" href="' +
                    post.url +
                    '">' +
                    '<div class="search-result-row-title">' +
                    post.title +
                    '</div><div class="search-result-row-excerpt">' +
                    post.description +
                    '</div></a>' +
                    '</div>';
            })

            searchResult.innerHTML = output;

            if (e.target.value.length > 0) {
                searchButton.classList.add('search-button-clear');
            } else {
                searchButton.classList.remove('search-button-clear');
            }

            if (posts.length > 0) {
                popular.style.display = 'none'
            } else {
                popular.style.display = 'block'
            }
        })

    });

}

document.addEventListener('flashload:navigationEnded', initSearch)
document.addEventListener('DOMContentLoaded', initSearch)
