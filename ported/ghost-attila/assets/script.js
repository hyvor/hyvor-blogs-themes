/**
 * Theme
 * =======
 */
function changeTheme() {
    var pref = _hb.getColorModePreference();
    var mode = 'os';
    if (pref === 'os') {
        mode = 'dark';
    } else if (pref === 'dark') {
        mode = 'light';
    }
    _hb.changeColorMode(mode);
}

/**
 * Menu
 * =======
 */
function menu() {
    document.body.classList.toggle("menu-active");
}
function menuRemove() {
    document.body.classList.remove("menu-active");
}

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('resize', menuRemove)
    window.addEventListener('orientationchange', menuRemove)
})

/**
 * Cover Parallax
 * =======
 */

var coverPosition = 0;
function prlx() {
    var cover = document.querySelector('.cover');
    if (cover) {
        var windowPosition = window.scrollY;
        (windowPosition > 0) ? coverPosition = Math.floor(windowPosition * 0.25): coverPosition = 0;
        cover.style.transform = 'translate3d(0, ' + coverPosition + 'px, 0)';
        (window.scrollY < cover.getBoundingClientRect().height) ?
            document.body.classList.add('cover-active'):
            document.body.classList.remove('cover-active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    prlx();
    window.addEventListener('scroll', prlx)
    window.addEventListener('resize', prlx)
    window.addEventListener('orientationchange', prlx);
    document.addEventListener('flashload:navigationEnded', prlx)
})


/**
 * Search
 * =======
 */
function initSearchOverlay() {
    'use strict';

    var modalOverlay = document.querySelector('.search-wrapper');
    var modal = document.querySelector('.search');
    var modalInput = document.querySelector('.search-field');

    document.querySelectorAll('.nav-search').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            modalOverlay.style.display = 'block';

            document.body.classList.add('search-active');
            modalInput.focus();

            if(document.body.classList.contains('menu-active')) {
                document.body.classList.remove('menu-active');
            }
        });
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