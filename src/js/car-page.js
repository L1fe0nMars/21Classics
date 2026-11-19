'use strict';

const MAIN_IMG = document.getElementsByClassName('main-img');
const MODAL = document.getElementById('modal');
const CLOSE_BUTTON = document.getElementById('close');
const FULLSCREEN_BUTTON = document.getElementById('gallery-fullscreen');
const GALLERY_PREV = document.getElementById('gallery-prev');
const GALLERY_NEXT = document.getElementById('gallery-next');
const THUMB_PREV = document.getElementById('thumb-prev');
const THUMB_NEXT = document.getElementById('thumb-next');
const MODAL_PREV = document.getElementById('modal-prev');
const MODAL_NEXT = document.getElementById('modal-next');

let bottomSwiper = new Swiper('.bottomSwiper', {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 2,
    breakpoints: {
        640: {
            slidesPerView: setNumVisibleSlides(4),
        },
        1024: {
            slidesPerView: setNumVisibleSlides(6),
        },
    },
    navigation: {
        nextEl: THUMB_NEXT,
        prevEl: THUMB_PREV,
    },
    freeMode: true,
    watchSlidesProgress: true,
})

let mainSwiper = new Swiper('.swiperContainer', {
    loop: true,
    spaceBetween: 10,
    thumbs: {
        swiper: bottomSwiper,
    },
    navigation: {
        nextEl: GALLERY_NEXT,
        prevEl: GALLERY_PREV,
    },
    keyboard: {
        enabled: true,
    },
});

let modalSwiper = new Swiper('.modalSwiper', {
    loop: true,
    spaceBetween: 10,
    grabCursor: true,
    navigation: {
        nextEl: MODAL_NEXT,
        prevEl: MODAL_PREV,
    },
    keyboard: {
        enabled: true,
    },
    zoom: {
        maxRatio: 3,
    },
});

if (modalSwiper.slides.length === 1) {
    modalSwiper.unsetGrabCursor();
}

/**
 * Sets the number of shown slides to either the passed value or the total number of slides there are
 * 
 * @param {number} expectedNum The expected number of slides to display
 * 
 * @return {number} The number of slides to display
 */
function setNumVisibleSlides(expectedNum) {
    return expectedNum > MAIN_IMG.length ? MAIN_IMG.length : expectedNum;
}

/**
 * Opens the image modal
 * 
 * @param {number} slideIndex The current slide
 */
function openModal(slideIndex) {
    MODAL.setAttribute('style', 'display: block !important');
    modalSwiper.slideToLoop(slideIndex);
    BODY.style.overflow = 'hidden';
}

/**
 * Closes the image modal
 */
function closeModal() {
    modalSwiper.zoom.out();
    MODAL.setAttribute('style', 'display: none !important');
    BODY.style.overflow = 'auto';
}

/**
 * Checks if the modal is open
 * 
 * @return {boolean} Whether the modal is open or not
 */
function isModalOpen() {
    return MODAL.style.display === 'block';
}

for (let i = 0; i < MAIN_IMG.length; i++) {
    MAIN_IMG[i].addEventListener('click', () => {
        openModal(i);
    });
}

FULLSCREEN_BUTTON.addEventListener('click', () => {
    openModal(mainSwiper.realIndex);
});

CLOSE_BUTTON.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
    if (isModalOpen() && event.key === 'Escape') {
        closeModal();
    }
});