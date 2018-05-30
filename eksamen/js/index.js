const images = ["intro1.jpg", "intro2.jpg", "intro3.jpg", "intro4.jpg",];
const imagePrefix = "assets/";
const slideshow = document.getElementById("slideshow");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;

const getImageUrl = () => imagePrefix + images[index];

const changeImage = indexDifference => {
  index += indexDifference;
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  slideshow.style.backgroundImage = `url('${getImageUrl()}')`;
};

const prevImage = evt => {
  changeImage(-1);
};

const nextImage = evt => {
  changeImage(1);
};

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);
