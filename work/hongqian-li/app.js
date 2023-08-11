const container = document.querySelector('.container');
document.querySelector('.slider').addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
})

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  var img = document.getElementById('zoom-img');
  var textBox = document.getElementById('text-box');
  var section = document.getElementById('section3');
  
  // 获取元素的顶部距离
  var elementPosition = section.offsetTop;

  // 设置开始放大的滚动位置
  var zoomStart = 0.8 * window.innerWidth;  

  // 设置放大的速率和最大放大比例
  var zoomRateImg = 0.01;  // 图片的放大速率，可以根据需要进行调整
  var maxScaleImg = 2;  // 图片的最大放大比例，可以根据需要进行调整
  var zoomRateBox = 0.01;  // 文本框的放大速率，可以根据需要进行调整
  var maxScaleBox = 2;  // 文本框的最大放大比例，可以根据需要进行调整

  // 判断滚动位置是否大于元素的顶部距离加上开始放大的滚动位置
  if (scrollPosition >= elementPosition + zoomStart) {
      // 计算图片的放大比例
      var scaleImg = 1 + (scrollPosition - elementPosition - zoomStart) * zoomRateImg;
      // 计算文本框的放大比例
      var scaleBox = 1 + (scrollPosition - elementPosition - zoomStart) * zoomRateBox;
      
      // 判断图片的放大比例是否超过最大放大比例
      if (scaleImg > maxScaleImg) {
          scaleImg = maxScaleImg;
      }
      
      // 判断文本框的放大比例是否超过最大放大比例
      if (scaleBox > maxScaleBox) {
          scaleBox = maxScaleBox;
      }

      // 改变图片和文本框的大小，设置变形基点为左上角
      img.style.transform = 'scale(' + scaleImg + ')';
      img.style.transformOrigin = 'right bottom';  // 图片从中心放大
      textBox.style.transform = 'scale(' + scaleBox + ')';
      textBox.style.transformOrigin = 'left bottom';  // 文本框从左上角放大
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // 选择所有的.image-slider元素
  const sliders = document.querySelectorAll('.image-slider');

  sliders.forEach(slider => {
      let direction = 1; // 1 for forward, -1 for backward

      // Function to scroll the images
      function scrollImages() {
          // Check if we've reached the end or the beginning
          if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth) && direction === 1) {
              direction = -1; // Change direction to backward
          } else if (slider.scrollLeft === 0 && direction === -1) {
              direction = 1; // Change direction to forward
          }

          // Scroll by 5 pixels in the current direction
          slider.scrollBy(direction * 5, 0);
      }

      // Scroll every 30 milliseconds
      setInterval(scrollImages, 30);
  });
});


const typewriters = document.querySelectorAll('.typewriter');

function typeWriter(container) {
    const elements = container.querySelectorAll('[data-content]');
    let currentElementIndex = 0;
    let charIndex = 0;

    function innerTypeWriter() {
        if (currentElementIndex < elements.length) {
            const currentElement = elements[currentElementIndex];
            const content = currentElement.getAttribute('data-content');
            if (charIndex < content.length) {
                currentElement.textContent += content.charAt(charIndex);
                charIndex++;
                setTimeout(innerTypeWriter, 38); // Adjust speed as needed
            } else {
                currentElementIndex++;
                charIndex = 0;
                setTimeout(innerTypeWriter, 500); // Gap before next element starts typing
            }
        } else {
            // Reset for the next loop
            elements.forEach(el => el.textContent = "");
            currentElementIndex = 0;
            setTimeout(innerTypeWriter, 1000); // Gap before typing starts again for the entire section
        }
    }

    innerTypeWriter();
}

typewriters.forEach(typeWriter);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.imageToHover').forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.filter = "brightness(300%)";
        });

        img.addEventListener('mouseout', function() {
            this.style.filter = "brightness(100%)";
        });
    });
});


