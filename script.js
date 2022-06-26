const imageCount = 5;
let imageNum = 1;
const changeImageTime = 5000;

let autoToNextImage = setInterval(toNextImage, changeImageTime);

function getNextImageNum() {
  return imageNum < imageCount ? imageNum + 1 : 1;
}

function getPrevImageNum() {
  return imageNum > 1 ? imageNum - 1 : imageCount;
}

//add classes for next and previous image, so they translate to the right place in advance
function updateNearbyImages() {
  const imageList = document.querySelectorAll(".sliderImage");
  for (let i = 0; i < imageList.length; i++) {
    imageList[i].classList.remove("nextImage");
    imageList[i].classList.remove("prevImage");
  }
  const nextImage = document.querySelector(`#imageContainer1 :nth-child(${getNextImageNum()})`);
  nextImage.classList.add("nextImage");
  const prevImage = document.querySelector(`#imageContainer1 :nth-child(${getPrevImageNum()})`);
  prevImage.classList.add("prevImage");
}

function toNextImage() {
  //reset the timer
  clearInterval(autoToNextImage);
  autoToNextImage = setInterval(toNextImage, changeImageTime);

  const currentImage = document.querySelector(`#imageContainer1 :nth-child(${imageNum})`);
  const nextImage = document.querySelector(`#imageContainer1 :nth-child(${getNextImageNum()})`);
  currentImage.classList.remove("shownImage");
  nextImage.classList.add("shownImage");

  const currentDot = document.querySelector(`#dotContainer1 :nth-child(${imageNum})`);
  const nextDot = document.querySelector(`#dotContainer1 :nth-child(${getNextImageNum()})`);
  currentDot.classList.remove("chosenDot");
  nextDot.classList.add("chosenDot");

  imageNum = getNextImageNum();
  updateNearbyImages();
}

function toPrevImage() {
  //reset the timer
  clearInterval(autoToNextImage);
  autoToNextImage = setInterval(toNextImage, changeImageTime);

  const currentImage = document.querySelector(`#imageContainer1 :nth-child(${imageNum})`);
  const prevImage = document.querySelector(`#imageContainer1 :nth-child(${getPrevImageNum()})`);
  currentImage.classList.remove("shownImage");
  prevImage.classList.add("shownImage");

  const currentDot = document.querySelector(`#dotContainer1 :nth-child(${imageNum})`);
  const prevDot = document.querySelector(`#dotContainer1 :nth-child(${getPrevImageNum()})`);
  currentDot.classList.remove("chosenDot");
  prevDot.classList.add("chosenDot");

  imageNum = getPrevImageNum();
  updateNearbyImages();
}

function toImage(val) {
  if (val > imageNum) {
    for (let i = imageNum; i < val; i++)
      toNextImage();
  }
  else {
    for (let i = imageNum; i > val; i--)
      toPrevImage();
  }
}

function addDot() {
  const dotContainer = document.getElementById("dotContainer1");
  for (let i = 0; i < imageCount; i++) {
    const dot = document.createElement("img");
    dot.src = "./assets/dot.svg";
    dot.classList.add("dot");
    if (i == 0) {
      dot.classList.add("chosenDot");
    }
    dot.addEventListener("click", () => {
      toImage(i + 1);
    })

    dotContainer.appendChild(dot);
  }
}

addDot();