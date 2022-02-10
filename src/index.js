// JS Goes here - ES6 supported

import "./css/main.css";

// Say hello
console.log("🦊 Hello! Edit me in src/index.js");

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(() => {



    videoStuff();
    smoothScroll();
    accordion();
    hamburger()


    if (window.location.hash) {
        if ($(window.location.hash).length) {
            var offset = $('nav').height() * -1
            // smooth scroll to the anchor id
            $('html, body').animate({
                scrollTop: ($(window.location.hash).offset().top + offset) + 'px'
            }, 0, 'swing');
        }
    }

    $('.navLink').click(() => {
        $('#navBurger').removeClass('is-active')
    })
})

$(window).resize(() => {

    videoStuff()

})

$(window).scroll(() => {
    videoStuff()

    if ($('#logoBanner').length) {
        $('#logoBanner').css("opacity", ($('#logoBanner').offset().top - $(window).scrollTop() / 1.5) / $('#logoBanner').offset().top)
    }


    if ($('#video-background').length) {
        let windowHeight = $(window).height();
        let windowTop = $(window).scrollTop();
        let result = 1 - (windowTop / windowHeight)
        $('#video-background').css("opacity", (result * 1.3))
    }

    if ($('#mobileJumbo').length) {
        let windowHeight = $('#mobileJumbo').height();
        let windowTop = $(window).scrollTop();
        let result = 1 - (windowTop / windowHeight)
        $('#mobileJumbo').css("opacity", (result))
    }

    $('.bg-parallax').each(function (index) {
        let thisTop = $(this).offset().top;
        let windowHeight = $(window).height();
        let windowTop = $(window).scrollTop();
        let thisHeight = $(this).height();

        let thisBottom = thisTop + thisHeight;
        let screenBottom = windowTop + windowHeight;
        let bottomGap = screenBottom - thisBottom;
        let result = 1 - (bottomGap / windowHeight)

        $(this).css("opacity", result)

    })


})


function videoStuff() {
    if ($(document).width() > 1024) {
        $('nav').css("background-color", 'rgba(15,15,15,' + $(window).scrollTop() / 100 / 1.3 + ')');
        $('#navFix').height(0)

    } else {
        $('nav').css("background-color", 'rgba(15,15,15,1)')
        $('#navFix').height($('#navWrap').height() + 17)
    }


}

function smoothScroll() {
    console.log('printing smooth scroll');
    console.log('printing smooth scroll');
    console.log('printing smooth scroll');
    console.log('printing smooth scroll');

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen

                    let targetTop = target.offset().top;
                    let scrollTop = $(window).scrollTop();

                    let x = Math.abs(((targetTop - scrollTop) / 1.8));

                    // console.log('offset # '+x)
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - $('#navWrap').height()

                    }, x, function () {
                        // Callback after animation
                        var $target = $(target);
                        // $target.focus();
                        // $target.blur();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '0'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                            $target.blur(); // Set focus again
                            //recall to offset fixed nav
                            $('html, body').animate({
                                scrollTop: target.offset().top - $('#navWrap').height()
                            }, 0, function () { });
                        };
                    });
                }
            }
        });
}

function accordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}

function hamburger() {
    $('#navBurger').click(function () {
        $(this).toggleClass('is-active')
        $('#sideNav').slideToggle(500);
    })

    $('.navLink').click(function () {
        $(this).removeClass('is-active')
        $('#sideNav').slideUp(500);
    })


}