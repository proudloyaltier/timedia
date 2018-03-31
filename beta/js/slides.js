if (getQueryVariable("s") == false) {
  var slideshow = ["<br><br><br><br><br><br><br><br>"];
}

var current_slide = 0;

var slide_text = document.querySelector("#currentSlide");
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
  current_slide = localStorage.slideshow.length - 1;
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
  slideshow[current_slide] = slideContainer.innerHTML;
  if (localStorage.tislidessave == undefined) {
  var tislidessave = generateRandString()
  storeInDatabase(tislidessave, CryptoJS.AES.encrypt(btoa(JSON.stringify(slideshow)), localStorage.password) + "");
  localStorage.tislidessave = tislidessave;
  var urlRef = window.dbRef.child(tislidessave);
  urlRef.on("value", function(snapshot) {
  snapshot.forEach(function(child) {
  localStorage.owner = child.key;
  });
 });
  var url = "index.html?app=9"+ '&s=' + tislidessave;
  localStorage.recentUrl = url;
  localStorage.workToSaveTitle = "Slides" //document.getElementById('slidesTitle').value;
  localStorage.workToSave = url;
} else {
  window.dbRef.child(localStorage.tislidessave).child(localStorage.owner).set(CryptoJS.AES.encrypt(btoa(JSON.stringify(slideshow)), localStorage.password) + "");
  var tislidessave = localStorage.tislidessave
  }
}

function updateSlide() {
  if (localStorage.slideshow !== undefined) {
    alert(1)
    var slideshow = localStorage.slideshow;
  }
  document.querySelector('#slide').innerHTML = slideshow[current_slide];
  document.querySelector("#currentSlide").innerText = current_slide + 1;
}

function nextSlide() {
  if (current_slide < slideshow.length - 1) {
    current_slide++;
    updateSlide();
  }
}

function importSlide() {
  var slide_code = prompt("Paste Slide");

  localStorage.slideshow = JSON.parse(atob(slide_code));
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

if (getQueryVariable("s") !== false) {
  var urlRef = window.dbRef.child(getQueryVariable("s"));
  urlRef.on("value", function(snapshot) {
  snapshot.forEach(function(child) {
    localStorage.owner = child.key;
    if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
      window.location.href = 'index.html?app=7';
      alert("Access Denied! Get TIed!")
    }
    localStorage.tislidessave = getQueryVariable("s");
    var slideshow = JSON.parse(atob(CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8)));
    alert(slideshow)
    updateSlide();
    });
  });
}

window.addEventListener('DOMContentLoaded', function() {if(getQueryVariable("s") == false){localStorage.removeItem('tislidessave'); localStorage.removeItem('slideshow'); sessionStorage.removeItem('slideLoad');}}, false);
