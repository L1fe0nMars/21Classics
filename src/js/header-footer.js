const BODY = document.querySelector("body")
const ROOT = document.querySelector(":root")
const HOME_PAGE_DOTS = document.getElementsByClassName("swiper-pagination")
const MOBILE_CONTAINER = document.getElementById("mobile-container")
const MOBILE_MENU = document.getElementById("mobile-menu-open")
const LIGHT_BTN = document.getElementsByClassName("light-btn")
const DARK_BTN = document.getElementsByClassName("dark-btn")

let darkMode = localStorage.getItem("darkMode")

const THEME_COLORS = {
    "--dark-mode": ["rgb(28, 28, 28)", "rgb(248, 248, 248)"],
    "--off-white": ["rgb(248, 248, 248)", "rgb(28, 28, 28)"],
    "--white": ["white", "rgb(38, 38, 38)"],
    "--swiper-heading-color": ["#333", "rgb(248, 248, 248)"],
    "--rolls-color": ["rgb(47, 1, 1)", "rgb(190, 182, 142)"],
    "--tiger-color": ["rgb(7, 38, 56)", "rgb(61, 111, 142)"],
    "--oldsmobile-white-color": ["rgb(16, 18, 19)", "rgb(230, 230, 230)"],
}

if (darkMode == null) {
    if (
        window.matchMedia
        && window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
        toggleDarkMode(true)
    } else {
        toggleDarkMode(false)
    }
} else if (darkMode == "enabled") {
    toggleDarkMode(true)
} else if (darkMode == "disabled") {
    toggleDarkMode(false)
}

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

function toggleDarkMode(toggled) {
    for (const key in THEME_COLORS) {
        ROOT.style.setProperty(key, THEME_COLORS[key][+toggled])
    }

    for (let i = 0; i < LIGHT_BTN.length; i++) {
        if (toggled) {
            DARK_BTN[i].style.display = "none"
            LIGHT_BTN[i].style.display = "inline"
            localStorage.setItem("darkMode", "enabled")
        } else {
            LIGHT_BTN[i].style.display = "none"
            DARK_BTN[i].style.display = "inline"
            localStorage.setItem("darkMode", "disabled")
        }
    }
}


MOBILE_CONTAINER.addEventListener("click", function() {
    MOBILE_CONTAINER.classList.toggle("change")
    MOBILE_MENU.style.display == "block" ? closeMobileMenu() : openMobileMenu()
    /*MOBILE_MENU.style.transform === "translate(0%)" ? closeMobileMenu() : openMobileMenu()*/
    /*MOBILE_MENU.style.visibility == "visible" ? closeMobileMenu() : openMobileMenu()*/
})

for (let i = 0; i < LIGHT_BTN.length; i++) {
    LIGHT_BTN[i].addEventListener("click", function() {
        toggleDarkMode(false)
    })
}

for (let i = 0; i < DARK_BTN.length; i++) {
    DARK_BTN[i].addEventListener("click", function() {
        toggleDarkMode(true)
    })
}