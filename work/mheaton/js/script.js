////////
// refresh box
var element = document.getElementById("refresh-button");
element.addEventListener("click", function() {
  console.log("AAA");
  // Reload the page
  location.reload();
});

var element = document.getElementById("refresh-button-2");
element.addEventListener("click", function() {
  console.log("AAA");
  // Reload the page
  location.reload();
});


window.addEventListener('load', function() {
  var windows = document.getElementsByClassName('window');
  var svg = createSvgElement();

  for (var i = 0; i < windows.length; i++) {
      // var offset = Math.random() * 10;
      // windows[i].style.transform = 'translate(' + offset + '%, ' + offset + '%)';
      // windows[i].style.top = Math.random() * 1 + '%'; // limit to 5%
      // windows[i].style.left = Math.random() * 1 + '%'; // limit to 20%

      var duration = Math.random() * (15 - 10) + 10; // Random duration between 10 and 20 seconds
      var delay = Math.random() * 1; // Random delay up to 1 second
      windows[i].style.animationDuration = duration + 's';
      windows[i].style.animationDelay = delay + 's';

      // Update lines for SVG
      updateLines(svg, windows[i]);
  }

  document.body.appendChild(svg);
});

// Create the SVG element
function createSvgElement() {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.zIndex = '0'; // Place the SVG below other elements
  svg.style.pointerEvents = 'none';
  return svg;
}

// Update lines for SVG
function updateLines(svg, floater) {
  var lines = svg.getElementsByTagName('line');

  // If there are not enough lines, create more
  while (lines.length < floater.length - 1) {
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('stroke', '#eeff00');
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
  }

  // Update the position of each line
  for (var i = 0; i < floater.length - 1; i++) {
      var rect1 = floater[i].getBoundingClientRect();
      var x1 = rect1.left + window.scrollX + rect1.width / 2;
      var y1 = rect1.top + window.scrollY + rect1.height / 2;

      var rect2 = floater[i + 1].getBoundingClientRect();
      var x2 = rect2.left + window.scrollX + rect2.width / 2;
      var y2 = rect2.top + window.scrollY + rect2.height / 2;

      lines[i].setAttribute('x1', x1);
      lines[i].setAttribute('y1', y1);
      lines[i].setAttribute('x2', x2);
      lines[i].setAttribute('y2', y2);
  }

  // Call this function again on the next frame
  requestAnimationFrame(function() {
      updateLines(svg, floater);
  });
}


// jquery dragging / resizing functions
$(document).ready(function() {
  let maxZIndex = 1;

  $(".window").draggable({
    start: function(event, ui) {
      maxZIndex++;
      $(this).css('z-index', maxZIndex);
    },
    stop: function(event, ui) {
      // Keep the dragged window at the front after dragging is done
      $(this).css('z-index', maxZIndex);
    }
  });
  
  // Make window elements resizable
  // $(".window").resizable({
  //     handles: "n, e, s, w, ne, se, sw, nw",
  //     minWidth: 100, // Set minimum width
  //     minHeight: 100, // Set minimum height
  //     maxWidth: window.innerWidth, // Set maximum width
  //     maxHeight: window.innerHeight, // Set maximum height
  //     resize: function(event, ui) {
  //         // Update lines for SVG (if needed)
  //         updateLines(svg, windows);
  //     }
  // });
});




////// bouncer animation

// Array of image URLs
// var images = [
//     'assets/bouncing/18468.png',
//     'assets/bouncing/39412.png',
//     'assets/bouncing/84319.png',
//     'assets/bouncing/119687.png',
//     'assets/bouncing/159877.png',
//     'assets/bouncing/167237.png',
//     'assets/bouncing/173078.png',
//     'assets/bouncing/182174.png',
//   ];

var images = [
  'assets/sprites/computer-4.png',
  'assets/sprites/channels-2.png',
  'assets/sprites/entire_network_globe-0.png',
  'assets/sprites/msg_error-0.png',
  'assets/sprites/world_phonereceiver.png',
  'assets/sprites/magnifying_glass-0.png',
  'assets/sprites/cd_drive-3.png',
  'assets/sprites/modem-5.png',
  'assets/sprites/msg_warning-0.png',
  'assets/sprites/help_question_mark-0.png',
];

  document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('.window');
    var floatingContainer = document.querySelector('.floating-container');
    var bouncingContainers = document.getElementsByClassName('bouncing-container'); // Get elements by class name
    var windows = document.querySelectorAll('.window'); // Get all window elements

    // Calculate the height based on the position of the float-container
    var height = 0;
    for (var i = 0; i < sections.length; i++) {
        if (sections[i] === floatingContainer) break;
        height += sections[i].offsetHeight + 2; // 2 is for the top and bottom margin
    }

  // Initialize the index of the current image
  var currentImageIndex = 0;

    // Loop through all bouncing containers
    for (var i = 0; i < bouncingContainers.length; i++) {
      var bouncingContainer = bouncingContainers[i];

      // Number of bouncing divs
      var numDivs = 10;

      // Create and animate the bouncing divs
      for (var j = 0; j < numDivs; j++) {
          var div = document.createElement('div');
          div.className = 'bouncing';

          // Get the image URL based on the current index
          var selectedImage = images[currentImageIndex];

          // Randomly choose a scale factor between 0.95 and 1.05
          var scaleFactor = 0.95 + Math.random() * 0.1;
          var resizedImage = `url(${selectedImage})`;

          // Set the background image with the resized image
          div.style.backgroundImage = resizedImage;
          div.style.backgroundSize = 'cover'; // Cover the entire div
          div.style.transform = `scale(${scaleFactor})`; // Apply the scaling

          bouncingContainer.appendChild(div);

          // Increment the index and reset if necessary
          currentImageIndex++;
          if (currentImageIndex >= images.length) {
              currentImageIndex = 0;
          }

          // Initial position and velocity
          var x = Math.random() * document.documentElement.scrollWidth;
          var y = Math.random() * document.documentElement.scrollHeight;
          var vx = (Math.random() - 0.5) * 0.85;
          var vy = (Math.random() - 0.5) * 0.85;

          // Animate the div
          animateDiv(div, x, y, vx, vy, height); // Pass the calculated height
      }
  }

    ///
    // add audio player
    const audio = document.getElementById("myAudio");
    const playButton = document.getElementById("playButton");
    const pauseButton = document.getElementById("pauseButton");
    const volumeSlider = document.getElementById("range26");

    // Set up play and pause button click listeners
    playButton.addEventListener("click", () => {
      audio.play();
      playButton.style.display = "none";
      pauseButton.style.display = "inline";
    });

    pauseButton.addEventListener("click", () => {
      audio.pause();
      pauseButton.style.display = "none";
      playButton.style.display = "inline";
    });

    // Set up volume slider change listener
    volumeSlider.addEventListener("input", () => {
      audio.volume = volumeSlider.value;
    });

    // Initialize audio volume to slider value
    audio.volume = volumeSlider.value;

  

    // Adjust window widths randomly
    // windows.forEach(function(windowElement) {
    //     var currentWidth = windowElement.offsetWidth;
    //     var randomPercentage = Math.random() * 0.4 + 0.45; // Random value between 0.9 and 1.1
    //     var newWidth = currentWidth * randomPercentage;

    //     windowElement.style.width = newWidth + 'px';
    // });

    // Code for attaching event listeners to window buttons
    windows.forEach(windowElement => {
      const windowBody = windowElement.querySelector('.window-body');
      const maximizeButton = windowElement.querySelector('.maximize-button');
      const restoreButton = windowElement.querySelector('.restore-button');
      const closeButton = windowElement.querySelector('[aria-label="Close"]');
      const minimizeButton = windowElement.querySelector('[aria-label="Minimize"]');

      // Hide the Restore button on page load
      restoreButton.style.display = 'none';

      maximizeButton.addEventListener('click', () => {
        if (windowElement.style.position !== 'fixed') {
            // Save the original position, dimensions, and z-index
            windowElement.dataset.originalPosition = windowElement.style.position;
            windowElement.dataset.originalWidth = windowElement.style.width;
            windowElement.dataset.originalHeight = windowElement.style.height;
            windowElement.dataset.originalZIndex = windowElement.style.zIndex;
            
            // Set the element to fixed position
            windowElement.style.position = 'fixed';
            windowElement.style.width = '100vw';
            windowElement.style.height = '100vh';
            windowElement.style.top = '0';
            windowElement.style.left = '0';
            windowElement.style.zIndex = '9999'; // Set a high z-index
            maximizeButton.style.display = 'none'; // Hide the Maximize button
            restoreButton.style.display = 'block'; // Show the Restore button
        }
    });

    restoreButton.addEventListener('click', () => {
        if (windowElement.style.position === 'fixed') {
            // Restore the original position, dimensions, and z-index
            windowElement.style.position = windowElement.dataset.originalPosition;
            windowElement.style.width = windowElement.dataset.originalWidth;
            windowElement.style.height = windowElement.dataset.originalHeight;
            windowElement.style.zIndex = windowElement.dataset.originalZIndex;
            maximizeButton.style.display = 'block'; // Show the Maximize button
            restoreButton.style.display = 'none'; // Hide the Restore button
        }
    });

        closeButton.addEventListener('click', () => {
            windowElement.remove();
        });

        minimizeButton.addEventListener('click', () => {
            windowBody.classList.toggle('hidden');
        });
    });

  // Get a reference to the container element
  // const contentContainer = document.getElementById('content-container');

  // // Fetch the content of the second HTML file
  // fetch('zine_inline.html')
  //   .then(response => response.text())
  //   .then(html => {
  //     // Insert the fetched HTML content into the container
  //     contentContainer.innerHTML = html;
  //     console.log("INSENRGTAS")
  //   })
  //   .catch(error => {
  //     console.error('Error fetching content:', error);
  //   });

});



function animateDiv(div, x, y, vx, vy, containerHeight) {
    // Update position
    x += vx;
    y += vy;
  
    // Get the width and height of the div
    var divWidth = div.offsetWidth;
    var divHeight = div.offsetHeight;
  
    // Check for collisions with the edges of the container
    if (x < 0 || x > window.innerWidth - divWidth) {
      vx = -vx;
    }
    if (y < 0 || y > containerHeight - divHeight) {
      vy = -vy;
    }
  
    // Apply the new position
    div.style.left = x + 'px';
    div.style.top = y + 'px';
  
    // Call this function again on the next frame
    requestAnimationFrame(function () {
      animateDiv(div, x, y, vx, vy, containerHeight);
    });
  }
  
  // URLs of the GIFs
const gifUrls = [
    '../assets/gif/processed_imagery_area.gif',
    '../assets/gif/processed_imagery_point.gif',
    '../assets/gif/processed_imagery_polyline.gif',
    '../assets/gif/combined.gif',
  ];
  
  // Preload the GIFs and attach load event listeners
  let loadedCount = 0;
  gifUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === gifUrls.length) {
        // All GIFs have loaded, so display them
        displayGifs();
      }
    };
  });
  
  // Function to display the GIFs
  function displayGifs() {
    const gifs = document.querySelectorAll('.monochrome');
    gifs.forEach(gif => {
      gif.style.visibility = 'visible'; // or gif.style.display = 'block';
    });
  }
  

///////////////////////
// css98 custom behavior

const windowElement = document.querySelector('.window');
const windowBody = windowElement.querySelector('.window-body');

const maximizeButton = document.querySelector('[aria-label="Maximize"]');
const closeButton = document.querySelector('[aria-label="Close"]');
const minimizeButton = document.querySelector('[aria-label="Minimize"]');

// Maximize Button
maximizeButton.addEventListener('click', () => {
  windowElement.style.width = '100vw';
  windowElement.style.height = '100vh';
});

// Close Button
closeButton.addEventListener('click', () => {
  windowElement.remove();
});

// Minimize Button
minimizeButton.addEventListener('click', () => {
  windowBody.classList.toggle('hidden');
  console.log("MINN")
});

// Add the 'hide-scrollbar' class to the body on page load
document.body.classList.add('hide-scrollbar');

// splash window config
var splashInProgress = false; // Flag to track if the splash behavior is already in progress
var currentMessage = ''; // Variable to store the current message

document.getElementById('command-prompt').addEventListener('keydown', function(event) {
  // Check if the pressed key is the "Escape" key
  if (event.key === 'Escape') {
    console.log("CLOSED")
    closeSplash();
    return; // Exit the function if the "Escape" key was pressed
  }

  // If the splash behavior is in progress, append the current message on every keypress
  if (splashInProgress) {
    this.value += '\n' + currentMessage;
    return;
  }

  splashInProgress = true; // Set the flag to true to prevent further triggering

  // Append the countdown message to the text area
  this.value += '\nC:\\> Closing in 3 seconds...';
  
  // Make the text area read-only to prevent further typing
  this.readOnly = true;

  // Define the unique messages
  var messages = [
    'just kidding they all do the same thing',
    'Im a computer',
    'Stop all the downloading',
    'beepbeepbeepbeepbeepbeepbeepbeepbeepbeep',
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
  ];

  // Define the time intervals for displaying the messages (in milliseconds)
  var messageIntervals = [3000, 1800, 1000, 500, 250];

  // Start a separate timer for the countdown display
  var displayCountdown = 3 * 10; // 3 seconds, with 10 updates per second
  var messageIndex = 0;
  var displayTimer = setInterval(function() {
    displayCountdown--;
    var wholeNumberCountdown = Math.ceil(displayCountdown / 10); // Round up to the nearest whole number
    currentMessage = 'C:\\> Closing in ' + wholeNumberCountdown + ' seconds...'; // Assign the current message
    document.getElementById('command-prompt').value = document.getElementById('command-prompt').value.replace(/\d+ seconds...$/, wholeNumberCountdown + ' seconds...');
    
    // Check if it's time to display the next message
    if (displayCountdown * 100 <= messageIntervals[messageIndex]) {
      currentMessage = messages[messageIndex]; // Update the current message
      document.getElementById('command-prompt').value += '\n' + currentMessage;
      messageIndex++;
    }

    if (displayCountdown <= 0) {
      clearInterval(displayTimer);
      closeSplash();
    }
  }, 100); // Update 10 times per second
});

function closeSplash() {
  document.getElementById('splash-window').style.display = 'none';

  // Remove the 'hide-scrollbar' class from the body to restore the scrollbar
  document.body.classList.remove('hide-scrollbar');
}


////////////////
// desktop image carousel
// Array of image URLs for background images
const backgroundImages = [
    'assets/wallpapers/wind.jpg',
    'assets/wallpapers/clouds.jpg',
    'assets/wallpapers/diet_bliss.jpg',
  ];
  
  // Function to select a random image URL from the array
  function getRandomBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  }
  
  // Function to set the background image
  function setBackgroundImage(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
  }
  
  // Function to be called on page load
  function onPageLoad() {
    const randomImageUrl = getRandomBackgroundImage();
    setBackgroundImage(randomImageUrl);
  }
  
  // Call the onPageLoad function when the page has finished loading
  window.addEventListener('load', onPageLoad);
  

//////////
function updateBouncingContainerSize() {
  const bouncingContainer = document.querySelector('.bouncing-container');
  bouncingContainer.style.width = window.innerWidth + 'px';
  bouncingContainer.style.height = fullBodyHeight + 'px'; // Set height to full body height
}

// Call the function initially and whenever the window is resized
updateBouncingContainerSize();
window.addEventListener('resize', updateBouncingContainerSize);

// change cursor when dragging windows
$(document).ready(function() {
  let maxZIndex = 1;

  $(".window").draggable({
      start: function(event, ui) {
          maxZIndex++;
          $(this).css('z-index', maxZIndex);
          $(this).css('cursor', 'grabbing'); // Change cursor when dragging starts
      },
      stop: function(event, ui) {
          $(this).css('z-index', maxZIndex);
          $(this).css('cursor', 'grab'); // Change cursor back to "grab" when dragging stops
      }
  });
});


//////
// audio player
const audio = document.getElementById("myAudio");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");

playButton.addEventListener("click", () => {
  console.log("Play button clicked."); // Add this line
  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "inline";
});

pauseButton.addEventListener("click", () => {
  console.log("Pause button clicked."); // Add this line
  audio.pause();
  pauseButton.style.display = "none";
  playButton.style.display = "inline";
});

// Function to update the zoom value based on window width
function updateZoom() {
  const windowWidth = window.innerWidth;
  let zoomValue = 1;

  // Adjust the zoom value based on the window width
  if (windowWidth < 600) {
    zoomValue = 0.8;
  } else if (windowWidth < 1000) {
    zoomValue = 0.9;
  }

  // Apply the new zoom value to the body
  document.body.style.zoom = zoomValue;
}

// Initial update on page load
updateZoom();

// Listen for the window resize event
window.addEventListener('resize', updateZoom);


/////// update CPU ticker text
const cpuUsageElement = document.querySelector('.status-bar-field#cpu');
let cpuUsage = 1000000000;

function updateCpuUsage() {
  const randomIncrement = Math.floor(Math.random() * 30) + 1;
  const randomSign = Math.random() < 0.5 ? -1 : 1;
  cpuUsage += randomIncrement * randomSign;
  cpuUsageElement.textContent = `CPU Usage: ${cpuUsage}%`;
}

setInterval(updateCpuUsage, 1);

