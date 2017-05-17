$(function() {

    // Smooth scrolling to anchors
    $('a').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    /**
     * Initialise slideshow
     */

    $('.pgwSlider').pgwSlider({
        displayList: false,
        autoSlide: true,
        touchControls: true,
        displayControls: true,
        intervalDuration: 5000
    });

    /**
     * Toggle Navigation for mobile
     */

    $('#nav-toggle').on('click', function(ev) {
        ev.preventDefault();
        $('.nav-mobile-links').slideToggle();
        return false;
    });

    var timelineBlocks = $('.cd-timeline-block'),
        offset = 0.8;

    //hide timeline blocks which are outside the viewport
    hideBlocks(timelineBlocks, offset);

    //on scolling, show/animate timeline blocks when enter the viewport
    $(window).on('scroll', function() {
        (!window.requestAnimationFrame)
            ? setTimeout(function() { showBlocks(timelineBlocks, offset); }, 100)
            : window.requestAnimationFrame(function() { showBlocks(timelineBlocks, offset); });
    });

    function hideBlocks(blocks, offset) {
        blocks.each(function() {
            ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        });
    }

    function showBlocks(blocks, offset) {
        blocks.each(function() {
            ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        });
    }

});

// https://github.com/Modernizr/Modernizr/issues/572
// Similar to http://jsfiddle.net/FWeinb/etnYC/
Modernizr.addTest('cssvhunit', function() {
    var bool;
    Modernizr.testStyles("#modernizr { height: 50vh; }", function(elem, rule) {   
        var height = parseInt(window.innerHeight/2,10),
            compStyle = parseInt((window.getComputedStyle ?
                      getComputedStyle(elem, null) :
                      elem.currentStyle)["height"],10);

        bool= !!(compStyle == height);
    });
    return bool;
});

$(function() {
    if (!Modernizr.cssvhunit) {
        var windowH = $(window).height();
        $('#fullpage').css({'height':($(window).height())+'px'});
    }
});

