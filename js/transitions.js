// when user enters
gsap.registerPlugin(SplitText);

document.addEventListener("DOMContentLoaded", () => {
let split = SplitText.create(".loading-text", { type: "words, chars" });

let tl = gsap.timeline();

tl.from(split.chars, {
  duration: .6, 
  y: 80,
  autoAlpha: 0,
  stagger: 0.015,
  ease: "power3.out" 
})
.to(split.chars,{
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
});

});

// page should slide in then text animates
// then text animates out then page slides out