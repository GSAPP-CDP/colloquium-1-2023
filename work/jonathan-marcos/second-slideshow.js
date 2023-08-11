// second-slideshow.js

const secondSlidesContainer = document.querySelector('.second-slideshow .slides');
const secondSlides = document.querySelectorAll('.second-slideshow .slide2');
const secondPrevButton = document.querySelector('.second-slideshow .prev-button');
const secondNextButton = document.querySelector('.second-slideshow .next-button');
let secondCurrentIndex = 0;

function showSecondSlide(index) {
  const offset = -index * 100;
  secondSlidesContainer.style.transform = `translateX(${offset}%)`;
}

secondPrevButton.addEventListener('click', () => {
  secondCurrentIndex = (secondCurrentIndex - 1 + secondSlides.length) % secondSlides.length;
  showSecondSlide(secondCurrentIndex);
});

secondNextButton.addEventListener('click', () => {
  secondCurrentIndex = (secondCurrentIndex + 1) % secondSlides.length;
  showSecondSlide(secondCurrentIndex);
});

showSecondSlide(secondCurrentIndex);