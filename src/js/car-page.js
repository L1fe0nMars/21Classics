const MAIN_IMG = document.getElementsByClassName("main-img")
const SWIPER_CONTAINER = document.getElementsByClassName("swiperContainter")
const MODAL = document.getElementById("modal")
const CLOSE_BUTTON = document.getElementById("close")

let bottomSwiper = new Swiper(".bottomSwiper", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 2,
    breakpoints: {
        640: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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
    keyboard: {
        enabled: true,
    },
})
/*
let modalBottomSwiper = new Swiper(".modalBottomSwiper", {
    loop: false,
    spaceBetween: 10,
    slidesPerView: 2,
    breakpoints: {
        640: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    freeMode: true,
    watchSlidesProgress: true,
})
*/
let modalSwiper = new Swiper(".modalSwiper", {
    loop: true,
    spaceBetween: 10,
    grabCursor: true,
    /*
    thumbs: {
      swiper: modalBottomSwiper,
    },*/
    keyboard: {
        enabled: true,
    },
})

function openModal(slideIndex) {
    MODAL.setAttribute("style", "display:block !important")
    modalSwiper.slideToLoop(slideIndex)
    BODY.style.overflow = "hidden"
}

function closeModal() {
    MODAL.setAttribute("style", "display:none !important")
    BODY.style.overflow = "auto"
}

function isModalOpen() {
    return (MODAL.style.display == "block" ? true : false)
}


for (let i = 0; i < MAIN_IMG.length; i++) {
    MAIN_IMG[i].addEventListener("click", () => {
        openModal(i)
    })
}

CLOSE_BUTTON.addEventListener("click", closeModal)

document.addEventListener("keydown", (event) => {
    if (isModalOpen() && event.key === "Escape") {
        closeModal()
    }
})