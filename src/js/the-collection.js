'use strict';

const UNSOLD_TAB = document.getElementById('unsold-tab');
const SOLD_TAB = document.getElementById('sold-tab');
const CARDS = document.querySelectorAll('#car-gallery .card');
const SOLD_COUNT = document.querySelectorAll('#car-gallery .card.sold').length;

document.getElementById('unsold-count').textContent = CARDS.length - SOLD_COUNT;
document.getElementById('sold-count').textContent = SOLD_COUNT;

/**
 * Shows either the sold or the available cars and marks the matching tab as selected.
 * @param {boolean} showSold - true to show sold cars, false to show available cars
 * @return {void}
 */
function showCars(showSold) {
    CARDS.forEach((card) => {
        card.classList.toggle('hidden', card.classList.contains('sold') !== showSold);
    });

    UNSOLD_TAB.classList.toggle('selected', !showSold);
    UNSOLD_TAB.setAttribute('aria-pressed', String(!showSold));
    SOLD_TAB.classList.toggle('selected', showSold);
    SOLD_TAB.setAttribute('aria-pressed', String(showSold));
}

UNSOLD_TAB.addEventListener('click', () => {
    showCars(false);
});

SOLD_TAB.addEventListener('click', () => {
    showCars(true);
});
