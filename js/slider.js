document.addEventListener("DOMContentLoaded", () => {
  //all elements to be manipulated and flags

  const slider = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slider-item");
  // let currentIndex = 0;
  const nextBtn = document.querySelector(".slider-next");
  const prevBtn = document.querySelector(".slider-prev");
  let screenWidth = window.innerWidth;

  const bar = document.querySelector(".slider-progress-bar");
  const thumb = bar.querySelector("span");

  let hoveredVideo = null;

  let offset = 0;
  let maxOffset = (slides.length / 3 - 1) * screenWidth;

  // progress bar visual fill
  function updateProgressBar() {
    thumb.style.width = `${(offset / maxOffset) * 100}%`;
  }

  // resize event to ensure slider stays visually consistent in position and no mobile slider
  window.addEventListener("resize", () => {
    const progress = offset / maxOffset;
    screenWidth = window.innerWidth;
    maxOffset = (slides.length / 3 - 1) * screenWidth;

    if (screenWidth < 1024) {
      // currentIndex = 0;
      offset = 0;
      slider.style.transform = "";
    } else {
      offset = progress * maxOffset;
      slider.style.transform = `translateX(-${offset}px)`;
    }

    updateProgressBar();
  });

  // previous button logic
  function previousSlide() {
    offset = Math.max(offset - screenWidth, 0);
    slider.style.transition = "";
    thumb.style.transition = "";
    slider.style.transform = `translateX(-${offset}px)`;
    updateProgressBar();
  }

  // next button logic

  function nextSlide() {
    offset = Math.min(offset + screenWidth, maxOffset);
    slider.style.transition = "";
    thumb.style.transition = "";
    slider.style.transform = `translateX(-${offset}px)`;
    updateProgressBar();
  }

  // naviagtion buttons event listners
  nextBtn.addEventListener("click", () => {
    nextSlide();
  });

  prevBtn.addEventListener("click", () => {
    previousSlide();
  });

  // mouse scroll event listener
  slider.addEventListener("wheel", (event) => {

      if (window.innerWidth < 1024) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      const target = Math.min(Math.max(offset + delta, 0), maxOffset);

      if (target === offset) return;

      event.preventDefault();
      offset = target;

      slider.style.transition = "none";
      thumb.style.transition = "none";
      slider.style.transform = `translateX(-${offset}px)`;
      updateProgressBar();
    },
    { passive: false },
  );

  // video playback on hover event handler
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
