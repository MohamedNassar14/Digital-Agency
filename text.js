let mainColor = localStorage.getItem("color_option");
if(mainColor !== null){
  document.documentElement.style.setProperty('--main-color', localStorage.getItem("color_option"));
}
let backgroundOption = true;
let backgroundInterval; 

let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  if(backgroundLocalItem === 'true') {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".back-option span").forEach(element => {
    element.classList.remove("active");
  });
  if(backgroundLocalItem === 'true') {
    document.querySelector(".back-option .yes").classList.add("active"); 
  } else {
    document.querySelector(".back-option .no").classList.add("active");
  }
}

document.querySelector(".toggle .fa-cog").onclick = function () {
   this.classList.toggle("fa-spin");
   document.querySelector(".setting-box").classList.toggle("open");
};

let colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
   li.addEventListener("click", (e) => {
   document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
   localStorage.setItem("color_option",e.target.dataset.color);
   });
});

let randomBack = document.querySelectorAll(".back-option span");
randomBack.forEach(span => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active");
     });
      e.target.classList.add("active");
      if (e.target.dataset.background === 'yes'){
        backgroundOption = true;
        randomizeImgs();
        localStorage.setItem("background_option", true);

      } else {
        backgroundOption = false;
        clearInterval(backgroundInterval);
        localStorage.setItem("background_option", false);
      }
  }); 
});

let landingPage = document.querySelector(".landing");
let imgsArray = ["ph1.jpg", "ph2.jpg", "ph3.jpg", "ph4.jpg"];
function randomizeImgs() {
if (backgroundOption === true){
  backgroundInterval = setInterval(() => {
  let randomNumber = Math.floor(Math.random() * imgsArray.length);
  landingPage.style.backgroundImage = 'url("css/'+ imgsArray[randomNumber] +'")';
   }, 1000);
 }
} 
randomizeImgs();

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
   let skillsOffsetTop = ourSkills.offsetTop;
   let skillsOuterHeight = ourSkills.offsetHeight;
   let windowHeight = this.innerHeight;
   let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
       skill.style.width = skill.dataset.progress;
    });
  }
};

let ourGallery = document.querySelectorAll(".gallery-imges img");
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
      let overlay = document.createElement("div");
      overlay.className = "popup-overlay";
      document.body.appendChild(overlay);
      let popupBox = document.createElement("div");
      popupBox.className = "popupBox";
      if (img.alt !== null){
        let imageHeading = document.createElement("div");
        let textHeading = document.createTextNode(img.alt);
        imageHeading.appendChild(textHeading);
        popupBox.appendChild(imageHeading);
      }
      let popupImage = document.createElement("img");
      popupImage.src = img.src;
      popupBox.appendChild(popupImage);
      document.body.appendChild(popupBox);
      let buttonClose = document.createElement("span");
      let textButton = document.createTextNode("x");
      buttonClose.className = "buttonClose";
      buttonClose.appendChild(textButton);
      popupBox.appendChild(buttonClose);
    });
});
document.addEventListener('click', (e)=> {
      if(e.target.className == "buttonClose"){
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
      }
});
let allBullets = document.querySelectorAll(".bullets .bullet");
let allLinks = document.querySelectorAll(".links a"); 
function scrollSomeWhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e)=> {
      e.preventDefault();
          document.querySelector(e.target.dataset.section).scrollIntoView({
             behavior:"smooth"
          });
    });
  });
}
scrollSomeWhere(allBullets);
scrollSomeWhere(allLinks);

let buttuActive = document.querySelector(".toggle-menu");
let myLinks = document.querySelector(".links");
buttuActive.onclick = function () {
  this.classList.toggle("menu-active");
  myLinks.classList.toggle("open");
}