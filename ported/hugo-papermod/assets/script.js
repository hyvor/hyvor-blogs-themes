// Menu
var menu = document.getElementById("menu");
if (menu) {
    menu.scrollLeft = localStorage.getItem("menu-scroll-position");
    menu.onscroll = () => {
        localStorage.setItem("menu-scroll-position", menu.scrollLeft);
    }
}

// Scroll to top
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        let id = this.getAttribute("href").substr(1);
        document.querySelector(`[id="${decodeURIComponent(id)}"]`).scrollIntoView();
        if (id === "top") {
            history.replaceState(null, null, " ");
        } else {
            history.pushState(null, null, `#${id}`);
        }
    });
});
var toplink = document.getElementById("top-link");
window.onscroll = () => {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        toplink.style.visibility = "visible";
        toplink.style.opacity = "1";
    } else {
        toplink.style.visibility = "hidden";
        toplink.style.opacity = "0";
    }
};

// Archive
function renderArchivePosts() {
    let archivePosts = document.querySelector(".archive-posts");
    let data;
    if(archivePosts){
        data = _hb.dataApi("v0", "posts", {
            keys: "title, url, published_at, authors",
            limit: 250,
        }, (response) => {
            let postsdata = response.data;
            let outputcontent = "";
            postsdata.forEach((post) => {
                const postauthors = post.authors;
                postauthors.forEach(author => authorname = author.name );
                const options = {year: "numeric", month: "short", day: "numeric"};
                publishedDate = new Intl.DateTimeFormat("en-US", options).format(new Date(post.published_at*1000));
        
                outputcontent +=
                `<div class="archive-entry">
                    <h3 class="archive-entry-title">${post.title}</h3>
                    <div class="archive-meta"><span title="${publishedDate}">${publishedDate}</span>&nbsp;·&nbsp;${authorname}</div>
                    <a class="entry-link" aria-label="post link to ${post.title}" href="${post.url}"></a>
                </div>`
            });
            archivePosts.innerHTML = outputcontent;
        });
    }
}
document.addEventListener("flashload:navigationEnded", renderArchivePosts);
document.addEventListener("DOMContentLoaded", renderArchivePosts);

// Search
function initSearch() {
    let searchInput = document.querySelector("#searchInput");
    let searchResult = document.querySelector("#searchResults");
    let searchXhr;
    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            if (e.target.value.trim() === "" || e.target.value.length < 1) {
                searchResult.innerHTML = "";
            } else {
                searchXhr && searchXhr.abort();
                searchXhr = _hb.dataApi("v0", "posts/search", {
                    search: e.target.value,
                    keys: "title, url"
                }, (response) => {
                    let posts = response.data;
                    let output = "";
                    if(posts){
                        posts.forEach((post) => {
                            output +=
                            `<li class="post-entry">
                            <header class="entry-header">${post.title}&nbsp;»</header>
                            <a href="${post.url}" aria-label="${post.title}"></a>
                            </li>`
                        });
                    }
                    searchResult.innerHTML = output;
                });
            }
        });
    }       
}
document.addEventListener("flashload:navigationEnded", initSearch);
document.addEventListener("DOMContentLoaded", initSearch);

// Tags
function renderTags() {
    let allTags = document.querySelector(".terms-tags");
    let data;
    if(allTags){
        data = _hb.dataApi("v0", "tags", {
            keys: "name, url",
            limit: 250,
        }, (response) => {
            let tagsdata = response.data;
            let outputtags = "";
            tagsdata.forEach((tag) => {
                outputtags +=
                    `<li>
                    <a href="${tag.url}">${tag.name}</a>
                    </li>`
            });
            allTags.innerHTML = outputtags;
        });
    }
}
document.addEventListener("flashload:navigationEnded", renderTags);
document.addEventListener("DOMContentLoaded", renderTags);

// External links
function externalLinks() {
    for (
        let links_collection = document.getElementsByTagName("a"), link = 0; link < links_collection.length; link++) {
        let links = links_collection[link];
        is_external = links.getAttribute("href") && links.hostname !== location.hostname;
        is_external && (links.classList.add("external"));
    }
};
externalLinks();

// Index page
function isIndexPage(){
    const indexMain = document.querySelector(".index-main");
    const indexBody = document.querySelector("body");
    if(indexMain && indexBody){
        indexBody.classList.add("list");
    }
}
document.addEventListener("flashload:navigationEnded", isIndexPage);
document.addEventListener("DOMContentLoaded", isIndexPage);