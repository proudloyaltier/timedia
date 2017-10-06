function updateBackgroundImg() {
  localStorage.bgImg = document.getElementById('backgroundImg').value;
  location.reload();
}

if (localStorage.bgImg !== undefined) {
  document.getElementById('body').background = localStorage.bgImg;
}
