document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slider-item");
  let currentIndex = 0;
  const nextBtn = document.querySelector(".slider-next");
  const prevBtn = document.querySelector(".slider-prev");
  let screenWidth = window.innerWidth;

  const bar = document.querySelector(".slider-progress-bar");
  const thumb = bar.querySelector("span");
  let wheelLocked = false;

  let hoveredVideo = null;


function updateProgressBar() {
  const progress = (currentIndex) / 3;
  thumb.style.width = `${progress * 100}%`;
}


  window.addEventListener("resize", () => {
    screenWidth = window.innerWidth;

    if (screenWidth < 1024) {
      currentIndex = 0;
      slider.style.transform = "";
    } else {
      slider.style.transform = `translateX(-${currentIndex * screenWidth}px)`;
    }

    updateProgressBar();
  });

  function previousSlide() {
    console.log("index " + currentIndex);
    if (currentIndex >= 1) {
      console.log("prev index: " + currentIndex);
      currentIndex--;
      slider.style.transform = `translateX(-${currentIndex * screenWidth}px)`;
      console.log("how prev moved by: " + currentIndex * screenWidth);
    }
    updateProgressBar();
  }

  function nextSlide() {
    const hardStop = slides.length / 3;
    console.log("hard stop: " + hardStop);
    if (screenWidth) {
      if (currentIndex > 0 && currentIndex < 3) {
        currentIndex++;
        slider.style.transform = `translateX(-${currentIndex * screenWidth}px)`;
        console.log(currentIndex * screenWidth);
        console.log("click number: " + currentIndex);
      } else if (currentIndex === 0) {
        slider.style.transform = `translateX(-${screenWidth}px)`;
        currentIndex++;
        console.log("first click: " + currentIndex);
      }
    }
    updateProgressBar();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
  });

  prevBtn.addEventListener("click", () => {
    previousSlide();
  });


  slider.addEventListener(
    "wheel",
    (event) => {
      if (window.innerWidth < 1024) return;

      const goingNext = event.deltaY > 0 || event.deltaX > 0;

      if (goingNext && currentIndex === 3) return;
      if (!goingNext && currentIndex === 0) return;

      event.preventDefault();

      if (wheelLocked) return;
      wheelLocked = true;

      if (goingNext) {
        nextSlide();
      } else {
        previousSlide();
      }

      setTimeout(() => {
        wheelLocked = false;
      }, 800);
    },
    { passive: false }
  );

  slider.addEventListener("mouseover", (event) => {
    const hovered = event.target.closest(".slider-item video");

    if (!hovered || hovered === hoveredVideo) {
      return;
    }

    hoveredVideo = hovered;
    hoveredVideo.play();
    console.log("video hovered");
  });

  slider.addEventListener("mouseout", (event) => {
    if (!hoveredVideo) {
      return;
    }

    if (!hoveredVideo.contains(event.relatedTarget)) {
      console.log("mouse left: ", hoveredVideo);
      hoveredVideo.pause();
      hoveredVideo = null;
    }
  });

  updateProgressBar();
});