'use strict';

const CAROUSEL_PREV = document.getElementById('carousel-prev');
const CAROUSEL_NEXT = document.getElementById('carousel-next');

let swiper = new Swiper('.slide-content', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    navigation: {
        nextEl: CAROUSEL_NEXT,
        prevEl: CAROUSEL_PREV,
    },
    a11y: {
        prevSlideMessage: 'Previous cars',
        nextSlideMessage: 'Next cars',
    },
    breakpoints:{
        0: {
            slidesPerView: 1,
        },
        650: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});