const SWIPER_SLIDES = document.getElementsByClassName("swiper-slide")

let bottomSwiper = new Swiper(".bottomSwiper", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 2.5,
    breakpoints: {
        640: {
          slidesPerView: 4.5,
        },
        1024: {
          slidesPerView: SWIPER_SLIDES.length / 2,
        },
    },
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
		dynamicBullets: true,
	},
    freeMode: true,
    watchSlidesProgress: true,
})

let mainSwiper = new Swiper(".swiperContainer", {
    loop: true,
    spaceBetween: 10,
    thumbs: {
      swiper: bottomSwiper,
    },
})

console.log(SWIPER_SLIDES[0].getBoundingClientRect().height)
console.log(SWIPER_SLIDES[2].getBoundingClientRect().height)

window.addEventListener('resize', function() {
	for (let i = 0; i < SWIPER_SLIDES.length / 2; i++) {
		SWIPER_SLIDES[i].getBoundingClientRect().height = SWIPER_SLIDES[0].getBoundingClientRect().height
		console.log(SWIPER_SLIDES[0].getBoundingClientRect().height)
		console.log(SWIPER_SLIDES[2].getBoundingClientRect().height)
	}
})