//your code here
const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
const container = document.getElementById('flex-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
const h3Header = document.getElementById('h');

let selectedImages = [];

// Initialize and generate tiles
function init() {
  container.innerHTML = '';
  selectedImages = [];
  
  // Reset buttons & text state
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  para.innerText = '';
  h3Header.innerText = 'Please click on the identical tiles to verify that you are not a robot.';

  // Select 1 random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * imageClasses.length);
  const sixImages = [...imageClasses, imageClasses[duplicateIndex]];

  // Fisher-Yates Shuffle
  for (let i = sixImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sixImages[i], sixImages[j]] = [sixImages[j], sixImages[i]];
  }

  // Render images
  sixImages.forEach((className, index) => {
    const img = document.createElement('img');
    img.classList.add(className);
    img.dataset.index = index;
    img.dataset.class = className;

    img.addEventListener('click', handleImageClick);
    container.appendChild(img);
  });
}

// Handle image selections
function handleImageClick(e) {
  const clickedImg = e.target;

  // Prevent selecting already selected image or clicking after 2 selections
  if (clickedImg.classList.contains('selected') || selectedImages.length >= 2) {
    return;
  }

  clickedImg.classList.add('selected');
  selectedImages.push(clickedImg);

  // State 2: Show Reset button on at least 1 selection
  if (selectedImages.length > 0) {
    resetButton.style.display = 'inline-block';
  }

  // State 3: Show Verify button when exactly 2 tiles are selected
  if (selectedImages.length === 2) {
    verifyButton.style.display = 'inline-block';
  } else {
    verifyButton.style.display = 'none';
  }
}

// State 4: Handle verification
verifyButton.addEventListener('click', () => {
  verifyButton.style.display = 'none';

  const [img1, img2] = selectedImages;
  if (img1.dataset.class === img2.dataset.class) {
    para.innerText = 'You are a human. Congratulations!';
  } else {
    para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Reset event handler
resetButton.addEventListener('click', init);

// Run on page load
init();