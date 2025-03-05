const footerParallax = () => {
    const footer = document.querySelector('.footer');
    const footerContent = document.querySelector('.footer-content');
    const footerOffsetTop = document.querySelector('.main-dummy-block').offsetTop;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    const windowHeight = window.innerHeight;
    let lastKnownScrollPosition = 0;
    let ticking = false;

    lastKnownScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (ticking || window.innerWidth < 768) return;

    window.requestAnimationFrame(() => {
        toggleFooter(lastKnownScrollPosition);
        ticking = false;
    });

    ticking = true;

// Track footer position and change it's styles
    const toggleFooter = scrollPos => {
        const pageYOffsetBottom = scrollPos + windowHeight;
        const currDiff = pageYOffsetBottom - footerOffsetTop - heroHeight;
        const currOpacity = currDiff * 0.0025;
        const currTranslate = 55 - currDiff / 9;

        if (currDiff > 0 && currTranslate >= 0) {
            footerContent.style.opacity = `${currOpacity}`;
            footerContent.style.transform = `translateY(${currTranslate}%)`;
        }
    };
};

document.addEventListener(
    "DOMContentLoaded",
    window.addEventListener('scroll', footerParallax, {capture: false, passive: true})
);

// function detectIE() {
//     var browser = window.navigator.userAgent;
//
//     var msie = browser.indexOf('MSIE ');
//     if (msie > 0) {
//         console.log('IE 10');
//     }
//
//     var trident = browser.indexOf('Trident/');
//     if (trident > 0) {
//         console.log('IE 11');
//     }
//
//     var edge = browser.indexOf('Edge/');
//     if (edge > 0) {
//         console.log('EDGE');
//     }
//
//     // other browser
//     return false;
// }
