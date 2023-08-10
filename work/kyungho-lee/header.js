// Animate year counter and cover images on wheel event
const YEAR_START = 1984;
const counter = document.querySelector('.header__counter');
const images = document.querySelectorAll('.cover');
const now = new Date();
const nowYear = now.getFullYear();
let currYear = YEAR_START;
let currImageIdx = (currYear - YEAR_START) / 2;
let prevImageIdx = null;

counter.textContent = YEAR_START;
header.addEventListener('wheel', handleWheelEvent);

function updateCounter(delta) {
  const prevYear = currYear;
  currYear += delta;
  counter.textContent = currYear;

  if (currYear % 2 === 0) {
    prevImageIdx = currImageIdx;
    currImageIdx = (currYear - YEAR_START) / 2;
    images[prevImageIdx].classList.add('invisible');
    images[currImageIdx].classList.remove('invisible');
  }
}

function handleWheelEvent(event) {
  const delta = Math.sign(event.deltaY);
  // when 'year - delta' is in the year range
  if (!((counter.textContent == nowYear && delta > 0) || 
    (counter.textContent == YEAR_START && delta < 0))) {
      updateCounter(delta);
  }
  if (counter.textContent == nowYear) {
    return;
  }
  if (window.scrollY === 0) {
    event.preventDefault();
  }
}