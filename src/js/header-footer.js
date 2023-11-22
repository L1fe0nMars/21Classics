"use strict";

const ROOT = document.querySelector(":root");
const BODY = document.querySelector("body");
const PAGINATION_DOTS = document.querySelector(".swiper-pagination");
const MOBILE_CONTAINER = document.getElementById("mobile-container");
const MOBILE_MENU = document.getElementById("mobile-menu-open");
const LIGHT_BTN = document.getElementsByClassName("light-btn");
const DARK_BTN = document.getElementsByClassName("dark-btn");
const YEAR = document.getElementById("current-year");
const MOBILE_MENU_CUTOFF_WIDTH = 875;
const date = new Date();

let darkMode = localStorage.getItem("darkMode");

const THEME_COLORS = {
    "color-scheme": ["light", "dark"],
    "--dark-mode": ["rgb(28, 28, 28)", "rgb(245, 245, 245)"],
    "--off-white": ["rgb(245, 245, 245)", "rgb(28, 28, 28)"],
    "--white": ["white", "rgb(38, 38, 38)"],
    "--swiper-heading-color": ["#333", "rgb(245, 245, 245)"],
    "--rolls-color": ["rgb(47, 1, 1)", "rgb(190, 182, 142)"],
    "--tiger-color": ["rgb(7, 38, 56)", "rgb(61, 111, 142)"],
    "--oldsmobile-white-color": ["rgb(16, 18, 19)", "rgb(230, 230, 230)"],
    "--shelby-color": ["rgb(13, 40, 105)", "rgb(18, 89, 169)"],
};

YEAR.innerHTML = date.getFullYear();

if (darkMode === "enabled") {
    toggleDarkMode(true);
}
else if (darkMode === "disabled") {
    toggleDarkMode(false);
}
else {
    if (
        window.matchMedia
        && window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        toggleDarkMode(true);
    }
    else {
        toggleDarkMode(false);
    }
}

/**
 * Opens the mobile menu
 */
function openMobileMenu() {
    MOBILE_MENU.style.display = "block";
    BODY.style.overflow = "hidden";
    
    if (PAGINATION_DOTS) {
        PAGINATION_DOTS.style.visibility = "hidden";
    }
}

/**
 * Closes the mobile menu
 */
function closeMobileMenu() {
    MOBILE_MENU.style.display = "none";
    BODY.style.overflow = "auto";

    if (PAGINATION_DOTS) {
        PAGINATION_DOTS.style.visibility = "visible";
    }
}

/**
 * Checks if the mobile menu is open
 * 
 * @return {boolean} Whether the menu is open or not
 */
function isMobileMenuOpen() {
    return MOBILE_MENU.style.display === "block";
}

/**
 * Toggle dark mode on or off
 * 
 * @param {boolean} toggled Whether to toggle dark mode or light mode
 */
function toggleDarkMode(toggled) {
    for (const key in THEME_COLORS) {
        ROOT.style.setProperty(key, THEME_COLORS[key][+toggled]);
    }

    for (let i = 0; i < LIGHT_BTN.length; i++) {
        if (toggled) {
            DARK_BTN[i].style.display = "none";
            LIGHT_BTN[i].style.display = "inline";
            localStorage.setItem("darkMode", "enabled");
        }
        else {
            LIGHT_BTN[i].style.display = "none";
            DARK_BTN[i].style.display = "inline";
            localStorage.setItem("darkMode", "disabled");
        }
    }
}

MOBILE_CONTAINER.addEventListener("click", () => {
    MOBILE_CONTAINER.classList.toggle("change");
    MOBILE_MENU.style.display === "block" ? closeMobileMenu() : openMobileMenu();
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= MOBILE_MENU_CUTOFF_WIDTH && isMobileMenuOpen()) {
        MOBILE_CONTAINER.classList.toggle("change");
        closeMobileMenu();
    }
});

for (let i = 0; i < LIGHT_BTN.length; i++) {
    LIGHT_BTN[i].addEventListener("click", () => toggleDarkMode(false));
}

for (let i = 0; i < DARK_BTN.length; i++) {
    DARK_BTN[i].addEventListener("click", () => toggleDarkMode(true));
}