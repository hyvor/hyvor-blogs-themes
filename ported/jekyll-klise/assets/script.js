window.onload = () => {
    const body = document.body;

    // Blur the content when the menu is open
    const cbox = document.getElementById("menu-trigger");

    cbox.addEventListener("change", function () {
        const area = document.querySelector(".wrapper");
        this.checked
            ? area.classList.add("blurry")
            : area.classList.remove("blurry");
    });
};

/**
 * Theme
 * =======
 */
function changeTheme() {
    var mode = _hb.getColorMode();
    if (mode === "light") {
        mode = "dark";
    } else if (mode === "dark") {
        mode = "light";
    }
    _hb.changeColorMode(mode);
}

/**
 * Search
 * =======
 */

function initSearch() {
    var searchInput = document.querySelector(".search-field");
    var searchButton = document.querySelector(".search-button");
    var searchResult = document.querySelector(".search-result");

    var lastXhr;

    searchInput.addEventListener("keyup", function (e) {
        if (e.target.value.trim() === "") {
            searchResult.innerHTML = "";
        }

        lastXhr && lastXhr.abort();

        lastXhr = _hb.dataApi(
            "v0",
            "posts/search",
            {
                search: e.target.value,
                keys: "title, url, description",
            },
            function (response) {
                var posts = response.data;
                var output = "";
                posts?.forEach(function (post) {
                    output +=
                        '<li><a class="search-result-row-link" href="' +
                        post.url +
                        '">' +
                        post.title +
                        "</a></li>";
                });

                searchResult.innerHTML = output;

                if (e.target.value.length > 0) {
                    searchButton?.classList.add("search-button-clear");
                } else {
                    searchButton?.classList.remove("search-button-clear");
                }
            }
        );
    });
}

document.addEventListener("DOMContentLoaded", initSearch);

/**
 * Language
 */
function toggleLanguageDropdown() {
    document.querySelector(".lang-selector").classList.toggle("open");
    document.querySelector(".lang-selector-closer").classList.toggle("open");
}
document.addEventListener("flashload:navigationEnded", function () {
    document.querySelector(".lang-selector").classList.remove("open");
    document.querySelector(".lang-selector-closer").classList.remove("open");
});
