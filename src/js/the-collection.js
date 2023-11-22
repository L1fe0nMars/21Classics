"use strict";

const UNSOLD_TAB = document.getElementById("unsold-tab");
const SOLD_TAB = document.getElementById("sold-tab");
const CARD = document.getElementsByClassName("card");

//console.log(CARD[0].querySelector(".name").innerHTML);

UNSOLD_TAB.addEventListener("click", () => {
    for (let i = 0; i < CARD.length; i ++) {
        const isSold = CARD[i].classList.contains("sold");
        const isHidden = CARD[i].classList.contains("hidden");

        if (
            (isSold && !isHidden)
            || (!isSold && isHidden)
        ) {
            CARD[i].classList.toggle("hidden");
        }
    }
    
    if (!UNSOLD_TAB.classList.contains("selected")) {
        UNSOLD_TAB.classList.toggle("selected");
    }

    if (SOLD_TAB.classList.contains("selected")) {
        SOLD_TAB.classList.toggle("selected");
    }
});

SOLD_TAB.addEventListener("click", () => {
    for (let i = 0; i < CARD.length; i ++) {
        const isSold = CARD[i].classList.contains("sold");
        const isHidden = CARD[i].classList.contains("hidden");

        if (
            (isSold && isHidden)
            || (!isSold && !isHidden)
        ) {
            CARD[i].classList.toggle("hidden");
        }
    }

    if (!SOLD_TAB.classList.contains("selected")) {
        SOLD_TAB.classList.toggle("selected");
    }

    if (UNSOLD_TAB.classList.contains("selected")) {
        UNSOLD_TAB.classList.toggle("selected");
    }
});