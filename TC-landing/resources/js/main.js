//* INIT GLOBALS *//
// disable animations on resize
var resizeTimer;
window.onresize = function(e) {
    var body = document.getElementsByTagName("BODY")[0];
    body.classList.add("resize-on");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        body.classList.remove("resize-on");
    }, 250);
};

// keypress enter buttons
(function( a, $ ){
    if( a.length ){
        for (var i = 0; i < a.length; i++) {
            var btn = a[i];
            btn.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    $(this).click();
                }
            });
        }
    };
})( document.querySelectorAll('[tabindex="0"]'));

// if element is visible
function isScrolledIntoView(el, distance) {
    var rect = el.getBoundingClientRect(),
        elemTop = rect.top - distance,
        elemBottom = rect.bottom,
        isVisible = elemTop < window.innerHeight;
    return isVisible;
}

// DOCUMENT READY //
$(document).ready(function() {
    
    // function lazyload images
    function load_imgs(object){
        for (var i = 0; i < object.length; i++) {
            var element = object[i],
                image = element.dataset.lazyimg,
                visibility = element.offsetWidth > 0 || element.offsetHeight > 0;
            if (isScrolledIntoView(element, 300) && visibility){
                if(element.tagName == 'IMG'){
                    element.setAttribute('src', image);
                }else{
                    element.setAttribute('style', 'background-image:url("' + image + '");');
                }
            }
        }
    }
    (function( a, $ ){
        if( a.length ){
            var object = $(a);
            load_imgs(object);
        };
    })( document.querySelectorAll('[data-lazyimg]'), jQuery );
    // function lazyload images onscroll
    window.addEventListener('scroll', function() {
        (function( a, $ ){
            if( a.length ){
                var object = $(a);
                load_imgs(object);
            };
        })( document.querySelectorAll('[data-lazyimg]'), jQuery );
    });
    // function lazyload images onresize
    window.addEventListener('resize', function() {
        (function( a, $ ){
            if( a.length ){
                var object = $(a);
                load_imgs(object);
            };
        })( document.querySelectorAll('[data-lazyimg]'), jQuery );
    });
    
    // function narrow menu
    (function( o, a, $ ){
        if( o ){
            function check_narrow(){
                var space = 1,
                    window_position = document.documentElement.scrollTop || document.body.scrollTop;
                if(window.innerWidth >= 1024){
                    if(window_position >= space){
                        o.classList.add('nav--narrow');
                    }else{
                        o.classList.remove('nav--narrow');
                    }
                }
            };
            
            check_narrow();
            //scroll event
            window.addEventListener('scroll', function() {
                check_narrow();
            });
        }
    })( document.querySelector('.nav'), jQuery );
    
    // function modular scroll events
    (function( a, $ ){
        if( a.length ){
            for (var i = 0; i < a.length; i++) {
                var parent = a[i];
                parent.addEventListener("click",function(){
                    var current_element = this,
                        point = current_element.dataset.scroll_to,
                        spacer = current_element.dataset.scroll_spacer;
                    $('html, body').animate({
                        scrollTop: $(point).offset().top - spacer
                    }, 1000);
                });
            }
            
        };
    })( document.querySelectorAll('.js-scrollto'), jQuery);
    
    // tolls hovers //
    (function( o, $ ){
        if( o ){
            
            $('.tools__element').hover(function(){
                var element = $(this),
                placeholder = element.attr('data-placeholder'),
                media = $('.tools__media__img');
                
                $('.tools__element').removeClass('active');
                element.addClass('active');
                media.css('background-image', "url('" + placeholder + "')");
            })
            
        }
    })( document.querySelector('.tools'), jQuery);
    
    // toggle menu //
    (function( o, $ ){
        if( o ){
            var menu = $('.nav__links');
            $('.js-menu').click(function(){
                if(!menu.hasClass('open')){
                    menu.addClass('open');
                    $('body').addClass('noscroll');
                }else{
                    menu.removeClass('open');
                    $('body').removeClass('noscroll');
                }
            });
            window.addEventListener('resize', function() {
                if(menu.hasClass('open') && window.innerWidth >= 1024){
                    menu.removeClass('open');
                    $('body').removeClass('noscroll');
                }
            });
            
        }
    })( document.querySelector('.nav'), jQuery);
    
});

$(window).load(function() {

    // calc top-module height //
    (function( o, $ ){
        if( o ){
            function calc_viewer_height(){
                if(window.innerWidth < 768){
                    var window_height = window.innerHeight;
                    var size = window_height;
                    $('.viewer').css('height', size + 'px');
                }
            }
            calc_viewer_height();
            $(window).resize(function(){
                if(window.innerWidth > 768){
                    var attr = $('.viewer').attr('style');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        $('.viewer').attr('style', '');
                    }
                }
            });
        }
    })( document.querySelector('.viewer'), jQuery);

});