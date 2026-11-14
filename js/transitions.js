// when user enters
gsap.registerPlugin(SplitText);

document.addEventListener("DOMContentLoaded", () => {
let split = SplitText.create(".loading-text", { type: "words, chars" });

let introLoaded = false;
let pageLoaded = document.readyState === "complete";
let isNavigating = false;

gsap.set(".loading-text", { autoAlpha: 1 });

let tlIntro = gsap.timeline();

tlIntro.from(split.chars, {
  duration: .6, 
  y: 80,
  autoAlpha: 0,
  stagger: 0.015,
  ease: "power3.out" ,
  onComplete: () => {
    introLoaded = true;
    if (pageLoaded) tlOutro.play();
  },
})

let tlOutro = gsap.timeline({ paused: true });
tlOutro.to(split.chars,{
    duration: .5,
    y:-100,
    autoAlpha: 0,
    stagger: 0.01,
    ease: "power3.in"
})
.to(".loading-screen",{
    xPercent: 100,
    ease: "power2.inOut",
    duration: .5
}, "-=.3");

window.addEventListener("load", () => {
    pageLoaded = true;
    if (introLoaded) tlOutro.play();
  });


  document.addEventListener("click", (event) => {

  const link = event.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
  if (link.target === "_blank") return;
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  if (link.protocol !== location.protocol || link.host !== location.host) return;
  if (link.href === location.href) return;


  if (isNavigating) return;

  event.preventDefault();
  isNavigating = true;

  gsap.fromTo(".loading-screen",
    { xPercent: -100 },
    {
      xPercent: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        window.location.href = link.href;
      },
    }
  );
});


});

// page should slide in then text animates
// then text animates out then page slides out