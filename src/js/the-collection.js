const UNSOLD_TAB = document.getElementById("unsold-tab")
const SOLD_TAB = document.getElementById("sold-tab")
const CARD = document.getElementsByClassName("card")
const NAME = document.getElementsByClassName("name")

/*console.log(NAME[0].parentElement.parentElement.parentElement)*/

UNSOLD_TAB.addEventListener("click", () => {
    for (let i = 0; i < CARD.length; i ++) {
        let isSold = CARD[i].classList.contains("sold")
        let isHidden = CARD[i].classList.contains("hidden")

        if (
            (isSold && !isHidden)
            || (!isSold && isHidden)
        ) {
            CARD[i].classList.toggle("hidden")
        }
    }
    
    if (!UNSOLD_TAB.classList.contains("selected")) {
        UNSOLD_TAB.classList.toggle("selected")
    }

    if (SOLD_TAB.classList.contains("selected")) {
        SOLD_TAB.classList.toggle("selected")
    }
    /*
    for (let i = 0; i < NAME.length; i++) {
        let str = NAME[i].innerHTML

        console.log(str.substring(0, str.indexOf(' ')))
    }
    */
})

SOLD_TAB.addEventListener("click", () => {
    for (let i = 0; i < CARD.length; i ++) {
        let isSold = CARD[i].classList.contains("sold")
        let isHidden = CARD[i].classList.contains("hidden")

        if (
            (isSold && isHidden)
            || (!isSold && !isHidden)
        ) {
            CARD[i].classList.toggle("hidden")
        }
    }

    if (!SOLD_TAB.classList.contains("selected")) {
        SOLD_TAB.classList.toggle("selected")
    }

    if (UNSOLD_TAB.classList.contains("selected")) {
        UNSOLD_TAB.classList.toggle("selected")
    }
})