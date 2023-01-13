// Menu
let menu = document.getElementById('menu')
if (menu) {
    menu.scrollLeft = localStorage.getItem("menu-scroll-position");
    menu.onscroll = () => {
        localStorage.setItem("menu-scroll-position", menu.scrollLeft);
    }
}

// Scroll to top
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        let id = this.getAttribute("href").substr(1);
        document.querySelector(`[id='${decodeURIComponent(id)}']`).scrollIntoView();
        if (id === "top") {
            history.replaceState(null, null, " ");
        } else {
            history.pushState(null, null, `#${id}`);
        }
    });
});
let toplink = document.getElementById("top-link");
window.onscroll = () => {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        toplink.style.visibility = "visible";
        toplink.style.opacity = "1";
    } else {
        toplink.style.visibility = "hidden";
        toplink.style.opacity = "0";
    }
};