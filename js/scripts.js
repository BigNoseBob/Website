// Oliver Rayner
// June 2022

function fadeOutOnScroll(element) {

  if (!element) return
  
  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  
  var opacity = 1;
  
  if (scrollTop > distanceToTop) {
    opacity = 1 - (scrollTop - (distanceToTop - 75)) / (elementHeight + 75);
  }

  console.log(opacity)
  
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

let title = document.getElementById('title')
console.log('Hello')

function scrollHandler() {
  fadeOutOnScroll(title)
}

window.addEventListener('scroll', scrollHandler)