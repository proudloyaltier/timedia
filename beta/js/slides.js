if (getQueryVariable("s") == false) {
  var slideshow = ["<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"];
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
  document.onmousemove = function () {
    dragElement(element, dragX, dragY);
  };
  document.onmouseup = stopDrag;
}

function addHeader() {
  var text = document.createElement('h3');
  text.innerHTML = 'New Header';
  text.contentEditable = 'true';
  text.classList.add("edit-slides");
  text.style = 'position: absolute; margin: 0px;';
  text.onmousedown = function () {
    beginDrag(this);
  };
  slideContainer.appendChild(text);
}

function addSubtitle() {
  var text = document.createElement('h5');
  text.innerHTML = 'New Subtitle';
  text.contentEditable = 'true';
  text.classList.add("edit-slides");
  text.style = 'position: absolute; margin: 0px; color: gray;';
  text.onmousedown = function () {
    beginDrag(this);
  };
  slideContainer.appendChild(text);
}

function addText() {
  var text = document.createElement('p');
  text.innerHTML = "Click to enter text";
  text.contentEditable = true;
  text.classList.add("edit-slides");
  text.style = 'position: absolute; margin: 0px;';
  text.onmousedown = function () {
    beginDrag(this);
  };
  slideContainer.appendChild(text);
}

function addImage() {
  alertify
    .prompt("Image Url",
      function(val) {
        var src = val;
        var image = document.createElement('img');
        image.draggable = false;
        image.src = src;
        image.classList.add("edit-slides");
        image.classList.add("draggable-slides");
        image.onmousedown = function () {
         beginDrag(this);
        };
        initSpecialElement(image);
        image.onmouseover = function () {
        specialElement = true
        };
        image.onmouseout = function () {
        specialElement = false
        };
        image.className += ' slides-img';
       slideContainer.appendChild(image);
       saveSlide();
     });
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
  slideshow[current_slide] = slideContainer.innerHTML;
  if (localStorage.tislidessave == undefined) {
    var tislidessave = generateRandString()
    storeInDatabase(tislidessave, CryptoJS.AES.encrypt(slideshow + "", localStorage.password) + "");
    localStorage.tislidessave = tislidessave;
    var urlRef = window.dbRef.child(tislidessave);
    urlRef.on("value", function (snapshot) {
      snapshot.forEach(function (child) {
        localStorage.owner = child.key;
      });
    });
    var url = "index.html?app=9" + '&s=' + tislidessave;
    localStorage.recentUrl = url;
    localStorage.workToSaveTitle = document.getElementById('slidesTitle').value;
    localStorage.workToSave = url;
  } else {
    window.dbRef.child(localStorage.tislidessave).child(localStorage.owner).set(CryptoJS.AES.encrypt(slideshow + "", localStorage.password) + "");
    var tislidessave = localStorage.tislidessave
  }
}

function deleteItem(i) {
  document.getElementsByClassName('edit-slides')[i].remove();
  updateSlide();
}

function updateSlide() {
  slide.innerHTML = slideshow[current_slide];
  var currentSlideText = current_slide + 1
  document.querySelector('#currentSlide').innerText = currentSlideText + '/' + slideshow.length;
  if (getQueryVariable("s") !== false) {
      for (var i = 0; i < document.getElementsByClassName('edit-slides').length; i++) {
        document.getElementsByClassName('edit-slides')[i].onmousedown = function() {beginDrag(this);};
        document.getElementsByClassName('edit-slides')[i].oncontextmenu = function() {deleteItem(i);};
        if (i == document.getElementsByClassName('edit-slides').length - 1) {
          return false
        }
     }
  }
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
  document.querySelector("#controls").style.visibility = "";
  document.querySelector("#presentSlide").style.display = "";
  document.querySelector("#stopPresentation").style.display = "none";
}

function presentSlide() {
  document.querySelector('#controls').style.visibility = 'hidden';
  document.querySelector("#presentSlide").style.display = "none";
  document.querySelector("#stopPresentation").style.display = "";
}

window.addEventListener('DOMContentLoaded', function () {
  if (getQueryVariable("s") == false) {
    localStorage.removeItem('tislidessave');
    localStorage.removeItem('slideshow');
    sessionStorage.removeItem('slideLoad');
  } else {
      var urlRef = window.dbRef.child(getQueryVariable("s"));
      urlRef.on("value", function (snapshot) {
      snapshot.forEach(function (child) {
      localStorage.owner = child.key;
      if (localStorage.owner.toLowerCase() !== localStorage.name.toLowerCase()) {
        window.location.href = 'index.html?app=7';
        alert("Access Denied! Get TIed!")
      }
      document.getElementById('slidesTitle').remove();
      localStorage.tislidessave = getQueryVariable("s");
      slideshow1 = CryptoJS.AES.decrypt(child.val(), localStorage.password).toString(CryptoJS.enc.Utf8);
      slideshow = slideshow1.split(",")
      updateSlide();
      for (var i = 0; i < document.getElementsByClassName('edit-slides').length; i++) {
        document.getElementsByClassName('edit-slides')[i].onmousedown = function() {beginDrag(this);};
        document.getElementsByClassName('edit-slides')[i].oncontextmenu = function() {deleteItem(i);};
        if (i == document.getElementsByClassName('edit-slides').length - 1) {
          return false
        }
      }
    });
  });
 }
}, false);

if (localStorage.slidesMobile !== undefined) {
  document.querySelector('#controls').style.visibility = 'hidden';
}
