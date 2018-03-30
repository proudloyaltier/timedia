var slideshow = ["<br><br><br><br><br><br><br><br>"];

var current_slide = 0;

var slide_text = document.querySelector("#currentSlide");
var slide = document.querySelector("#slide");

var slideContainer = document.querySelector('#slide');

function stopDrag() {
  document.onmousemove = null;
  document.onmouseup = null;
}

function dragElement(element, dragX, dragY) {
  var e = e || window.event;
  if (e.clientX > 0 && e.clientY > 0) {
    element.style.left = (e.clientX + dragX) + 'px';
    element.style.top = (e.clientY + dragY) + 'px';
  }
}

function beginDrag(element) {
  var e = e || window.event;
  var dragX = element.offsetLeft - e.clientX;
  var dragY = element.offsetTop - e.clientY;
  document.onmousemove = function() {
    dragElement(element, dragX, dragY);
  };
  document.onmouseup = stopDrag;
}

  function addHeader() {
    var text = document.createElement('h3');
    text.innerHTML = 'New Header';
    text.contentEditable = 'true';
    text.style = 'position: absolute; margin: 0px;';
    text.onmousedown = function() {beginDrag(this);};
    slideContainer.appendChild(text);
  }

  function addSubtitle() {
    var text = document.createElement('h5');
    text.innerHTML = 'New Subtitle';
    text.contentEditable = 'true';
    text.style = 'position: absolute; margin: 0px; color: gray;';
    text.onmousedown = function() {beginDrag(this);};
    slideContainer.appendChild(text);
  }

function addText() {
  var text = document.createElement('p');
  text.innerHTML = "Click to enter text";
  text.contentEditable = true;
  text.style = 'position: absolute; margin: 0px;';
  text.onmousedown = function() {
    beginDrag(this);
  };
  slideContainer.appendChild(text);
}

function addImage(src) {
  var text = document.createElement('img');
  text.draggable = false;
  text.src = src;
  text.classList.add("draggable-slides")
  text.onmousedown = function() {
    beginDrag(this);
  };
  slideContainer.appendChild(text);
}

function addSlide() {
  slideshow.push(" <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>");
  current_slide = slideshow.length - 1;
  updateSlide();
}

function removeSlide() {
  if (slideshow.length > 1) {
    var remove = confirm("Are you sure you want to remove this slide?");

    if (remove == true) {
      slideshow.splice(current_slide, 1);

      if (current_slide > slideshow.length - 1) {
        current_slide = slideshow.length - 1;
      }

      updateSlide();
    }
  }
}

function previousSlide() {
  if (current_slide > 0) {
    current_slide--;
    updateSlide();
  }
}

function saveSlide() {
  slideshow[current_slide] = slide.innerHTML;
}

function updateSlide() {
  slide.innerHTML = slideshow[current_slide];
  slide_text.innerText = current_slide + 1;
}

function nextSlide() {
  if (current_slide < slideshow.length - 1) {
    current_slide++;
    updateSlide();
  }
}

function exportSlide() {
  prompt("Copy", btoa(JSON.stringify(slideshow)));
}

function importSlide() {
  var slide_code = prompt("Paste Slide");

  slideshow = JSON.parse(atob(slide_code));
  current_slide = 0;
  slide.innerHTML = slideshow[current_slide];
}

function stopPresentation() {
  document.querySelector("#controls").style.display = "";
  document.querySelector("#presentSlide").style.display = "";
  document.querySelector("#stopPresentation").style.display = "none";
}

function presentSlide() {
  document.querySelector("#controls").style.display = "none";
  document.querySelector("#presentSlide").style.display = "none";
  document.querySelector("#stopPresentation").style.display = "";
}
