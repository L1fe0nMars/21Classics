'use strict';

const ROOT = document.querySelector(':root');
const BODY = document.querySelector('body');
const MOBILE_CONTAINER = document.getElementById('mobile-container');
const MOBILE_MENU = document.getElementById('mobile-menu-open');
const SUN = document.getElementsByClassName('sun');
const MOON = document.getElementsByClassName('moon');
const YEAR = document.getElementById('current-year');
const MOBILE_MENU_CUTOFF_WIDTH = 875;
const date = new Date();

let darkMode = localStorage.getItem('darkMode');

const THEME_COLORS = {
    'color-scheme': ['light', 'dark'],
    '--dark-mode': ['#1c1c1c', '#f5f5f5'],
    '--off-white': ['#f5f5f5', '#1c1c1c'],
    '--white': ['white', '#262626'],
    '--swiper-heading-color': ['#333', '#f5f5f5'],
    '--rolls-color': ['#2f0101', '#beb68e'],
    '--tiger-color': ['#072638', '#3d6f8e'],
    '--oldsmobile-white-color': ['#101213', '#e6e6e6'],
    '--shelby-color': ['#0d2869', '#1259a9'],
};

YEAR.innerHTML = date.getFullYear();

detectTheme();

/**
 * Opens the mobile menu
 */
function openMobileMenu() {
    MOBILE_MENU.style.transform = 'scaleY(1)';
}

/**
 * Closes the mobile menu
 */
function closeMobileMenu() {
    MOBILE_MENU.style.transform = 'scaleY(0)';
}

/**
 * Checks if the mobile menu is open
 * 
 * @return {boolean} Whether the menu is open or not
 */
function isMobileMenuOpen() {
    return MOBILE_MENU.style.transform === 'scaleY(1)';
}

/**
 * Checks the saved theme or user's preferences on page load and sets the theme accordingly
 */
function detectTheme() {
    if (darkMode === 'enabled') {
        toggleDarkMode(true);
    }
    else if (darkMode === 'disabled') {
        toggleDarkMode(false);
    }
    else {
        if (
            window.matchMedia
            && window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            toggleDarkMode(true);
        }
        else {
            toggleDarkMode(false);
        }
    }
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

    for (let i = 0; i < SUN.length; i++) {
        if (toggled) {
            MOON[i].style.transform = 'translate(0, -100%)';
            MOON[i].style.opacity = '0';
            MOON[i].style.pointerEvents = 'none';
        
            SUN[i].style.transform = 'translate(0, 0)';
            SUN[i].style.opacity = '1';
            SUN[i].style.pointerEvents = 'auto';
    
            localStorage.setItem('darkMode', 'enabled');
        }
        else {
            SUN[i].style.transform = 'translate(0, 100%)';
            SUN[i].style.opacity = '0';
            SUN[i].style.pointerEvents = 'none';
        
            MOON[i].style.transform = 'translate(0, 0)';
            MOON[i].style.opacity = '1';
            MOON[i].style.pointerEvents = 'auto';
    
            localStorage.setItem('darkMode', 'disabled');
        }
    }
}

MOBILE_CONTAINER.addEventListener('click', () => {
    MOBILE_CONTAINER.classList.toggle('change');
    MOBILE_MENU.style.transform === 'scaleY(1)' ? closeMobileMenu() : openMobileMenu();
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= MOBILE_MENU_CUTOFF_WIDTH && isMobileMenuOpen()) {
        MOBILE_CONTAINER.classList.toggle('change');
        closeMobileMenu();
    }
});

for (let i = 0; i < SUN.length; i++) {
    SUN[i].addEventListener('click', () => toggleDarkMode(false));
}

for (let i = 0; i < MOON.length; i++) {
    MOON[i].addEventListener('click', () => toggleDarkMode(true));
}