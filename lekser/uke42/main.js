const imageContainer = document.querySelector('.images');
const images = document.querySelectorAll('.images .image');
const shadow = document.querySelector('.shadow');
const nextBtn = document.querySelector('button.next');
const prevBtn = document.querySelector('button.prev');
let numImages = 0;
let index = 0;

images.forEach(image => {
  image.addEventListener('click', startSlideshow);
  numImages++;
});
shadow.addEventListener('click', endSlideshow);
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function startSlideshow(evt) {
  let target = evt.target;
  if (evt.target.tagName === 'IMG') {
    target = evt.target.parentElement;
  }
  imageContainer.classList.add('active');
  images.forEach(image => {
    if (image !== target) {
      image.classList.add('hidden');
    } else {
      index = Array.prototype.indexOf.call(imageContainer.children, target);
    }

    image.removeEventListener('click', startSlideshow);
    addShadow();
    showButtons();
  });
}

function nextSlide() {
  let nextIndex = index + 1;
  if (index >= numImages - 1) {
    nextIndex = 0;
  }

  images[index].classList.add('hidden');
  images[nextIndex].classList.remove('hidden');
  index = nextIndex;
}

function prevSlide() {
  let nextIndex = index - 1;
  if (index <= 0) {
    nextIndex = numImages - 1;
  }

  images[index].classList.add('hidden');
  images[nextIndex].classList.remove('hidden');
  index = nextIndex;
}

function endSlideshow() {
  imageContainer.classList.remove('active');
  images.forEach(image => {
    image.classList.remove('hidden');
    image.addEventListener('click', startSlideshow);
  });
  removeShadow();
  hideButtons();
}

function addShadow() {
  shadow.classList.add('active');
}

function removeShadow() {
  shadow.classList.remove('active');
}

function showButtons() {
  nextBtn.classList.add('active');
  prevBtn.classList.add('active');
}

function hideButtons() {
  nextBtn.classList.remove('active');
  prevBtn.classList.remove('active');
}

function findActiveElement(nodeList) {
  activeNodes = nodeList.map(node => {
    if (node.classList.contains('active')) {
      return node;
    }
  });

  return activeNodes.length === 0 ? activeNodes[0] : activeNodes;
}
