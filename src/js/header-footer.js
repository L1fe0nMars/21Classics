const BODY = document.querySelector("body")
const HOME_PAGE_DOTS = document.getElementsByClassName("swiper-pagination")
const MOBILE_CONTAINER = document.getElementById("mobile-container")
const MOBILE_MENU = document.getElementById("mobile-menu-open")

function openMobileMenu() {
    MOBILE_MENU.style.display = "block"
    /*MOBILE_MENU.style.transform = "translate(0%)"*/
    /*MOBILE_MENU.style.visibility = "visible"
    MOBILE_MENU.style.opacity = 1*/
    BODY.style.overflow = "hidden"

    if (HOME_PAGE_DOTS[0] != null) {
        HOME_PAGE_DOTS[0].style.visibility = "hidden"
    }
}

function closeMobileMenu() {
    MOBILE_MENU.style.display = "none"
    /*MOBILE_MENU.style.transform = "translate(100%)"*/
    /*MOBILE_MENU.style.visibility = "hidden"
    MOBILE_MENU.style.opacity = 0*/
    BODY.style.overflow = "auto"

    if (HOME_PAGE_DOTS[0] != null) {
        HOME_PAGE_DOTS[0].style.visibility = "visible"
    }
}



MOBILE_CONTAINER.addEventListener("click", function() {
    MOBILE_CONTAINER.classList.toggle("change")
    MOBILE_MENU.style.display == "block" ? closeMobileMenu() : openMobileMenu()
    /*MOBILE_MENU.style.transform === "translate(0%)" ? closeMobileMenu() : openMobileMenu()*/
    /*MOBILE_MENU.style.visibility == "visible" ? closeMobileMenu() : openMobileMenu()*/
})