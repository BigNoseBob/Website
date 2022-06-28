// Oliver Rayner
// June 2022

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

function fadeOutOnScroll(element) {

  if (!element) return
  
  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  
  var opacity = 1;
  
  if (scrollTop > distanceToTop) {
    opacity = 1 - (scrollTop - (distanceToTop - 75)) / (elementHeight + 75);
  }
  
  if (opacity >= 0) {
    element.style.opacity = opacity;
  }
}

function fadeInOnScroll(element) {

  if (!element) return

  var distanceToBottom = window.pageYOffset + element.getBoundingClientRect().top
  var elementHeight = element.offsetHeight
  var scrollTop = document.documentElement.scrollTop

  var opacity = 0;
  
  if (scrollTop > distanceToBottom - 100) {
    opacity = (scrollTop - distanceToBottom + 100) / elementHeight
  }
  
  if (opacity >= 0) {
    element.style.opacity = opacity
    element.style.disabled = false
  } else {
    element.style.disabled = true
  }

}

window.onload = () => {
  let title = document.getElementById('title')

  function scrollHandler() {
    fadeOutOnScroll(title)
  }

  window.addEventListener('scroll', scrollHandler)
}