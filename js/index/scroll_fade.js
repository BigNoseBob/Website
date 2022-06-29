// Oliver Rayner
// June 2022

// Simple text fade-out

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

export function main() {

    let title = document.getElementById('title')
    function scrollHandler() {
        fadeOutOnScroll(title)
    }
    window.addEventListener('scroll', scrollHandler)

}