function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotive();


function pageOne(){
  gsap.to("#page1",{
    scrollTrigger:{
      trigger:"#page1",
      scroller: `#main`,
      start:"top 10%",
      end:"top 100%",
      markers:true,
      pin:true,
    }
  })
}
//pageOne()

function load() {
  var h1 = document.querySelector("#loader h1")
  var num = 0
  setInterval(() => {
      num++
      var val = num + Math.floor(Math.random()*10)
      h1.textContent = `${val}%`
      if (val < 100) {
          h1.textContent = `${val}%`
      }else{
      h1.textContent = "100%"
      }
  }, 20);  
}

var vid = document.querySelector("#page1 video")
vid.pause()
var tl = gsap.timeline()
tl
.to("#loader",{
  onStart:load(),
  opacity:0,
  delay:3,
  onComplete:function(){
  vid.play()
  }
})
.from("#page1 h1",{
  y:120,
  duration:0.8,
  stagger:0.3,
  delay:2,
  opacity:0,
})
.from("#page1 img",{
  opacity:0,

})
load()

function canvas(){
  
const canvas = document.querySelector("#page4>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
  ./ayush-canvas/egg1.jpeg
  ./ayush-canvas/egg2.jpeg
  ./ayush-canvas/egg3.jpeg
  ./ayush-canvas/egg4.jpeg
  ./ayush-canvas/egg5.jpeg
  ./ayush-canvas/egg6.jpeg
  ./ayush-canvas/egg7.jpeg
  ./ayush-canvas/egg8.jpeg
  ./ayush-canvas/egg9.jpeg
  ./ayush-canvas/egg10.jpeg
  ./ayush-canvas/egg11.jpeg
  ./ayush-canvas/egg12.jpeg
  ./ayush-canvas/egg13.jpeg
  ./ayush-canvas/egg14.jpeg
  ./ayush-canvas/egg15.jpeg
  ./ayush-canvas/egg16.jpeg
  ./ayush-canvas/egg17.jpeg
  ./ayush-canvas/egg18.jpeg
  ./ayush-canvas/egg19.jpeg
  ./ayush-canvas/egg20.jpeg
  ./ayush-canvas/egg21.jpeg
  ./ayush-canvas/egg22.jpeg
  ./ayush-canvas/egg23.jpeg
  ./ayush-canvas/egg24.jpeg
  ./ayush-canvas/egg25.jpeg
  ./ayush-canvas/egg26.jpeg
  ./ayush-canvas/egg27.jpeg
  ./ayush-canvas/egg28.jpeg
  ./ayush-canvas/egg29.jpeg
  ./ayush-canvas/egg30.jpeg
  ./ayush-canvas/egg31.jpeg
  ./ayush-canvas/egg32.jpeg
  ./ayush-canvas/egg33.jpeg
  ./ayush-canvas/egg34.jpeg
  ./ayush-canvas/egg35.jpeg
  ./ayush-canvas/egg36.jpeg
  ./ayush-canvas/egg37.jpeg
  ./ayush-canvas/egg38.jpeg
  ./ayush-canvas/egg39.jpeg
  ./ayush-canvas/egg40.jpeg
  ./ayush-canvas/egg41.jpeg
  ./ayush-canvas/egg42.jpeg
  ./ayush-canvas/egg43.jpeg
  ./ayush-canvas/egg44.jpeg
  ./ayush-canvas/egg45.jpeg
  ./ayush-canvas/egg46.jpeg
  ./ayush-canvas/egg47.jpeg
  ./ayush-canvas/egg48.jpeg
  ./ayush-canvas/egg49.jpeg
  ./ayush-canvas/egg50.jpeg
  ./ayush-canvas/egg51.jpeg
  ./ayush-canvas/egg52.jpeg
  ./ayush-canvas/egg53.jpeg
  ./ayush-canvas/egg54.jpeg
  ./ayush-canvas/egg55.jpeg
  ./ayush-canvas/egg56.jpeg
  ./ayush-canvas/egg57.jpeg
  ./ayush-canvas/egg58.jpeg
  ./ayush-canvas/egg59.jpeg
  ./ayush-canvas/egg60.jpeg
 `;
  return data.split("\n")[index];
}

const frameCount = 60;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page4>canvas`,
    //   set start end according to preference
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page4",
  pin: true,
  // markers:true,
  scroller: `#main`,
//   set start end according to preference
  start: `top top`,
  end: `600% top`,
});
}
canvas()

function menu(){
  var menu = document.querySelector("#menu");
  var menuPage = document.querySelector("#menu-page");

  menu.addEventListener("click", function(){
    menuPage.style.opacity = 1;
  })
}