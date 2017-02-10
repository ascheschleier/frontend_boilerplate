
$(function(){
    resize.init();
    scroll.init();
    helper.checkVisibility();
});

var helper = {

    init: function(){

    },

    scrollTo: function(_target, _speed){
        var offset, speed;
        if(!_target){
            offset = 0;
        } else {
            offset = $(_target).offset().top;
        }
        if(!_speed){
            speed = 750;
        } else {
            speed = _speed;
        }
        var page = $("html, body");

        page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            page.stop();
        });

        page.animate({ scrollTop: offset }, speed , function(){
            page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        });
    },

    onAnimationComplete: function($element, callback){
        var transitionEvent = helper.whichTransitionEvent();

        if(transitionEvent){ //we have the CSS transition feature
            $element.one(transitionEvent, function(e){
                // this is your completion event!
                //console.log("transition complete");
                if(callback && typeof callback == 'function'){
                    //console.log("executing callback function ");
                    callback();
                };
            });
        } else { //fallback for non CSS transition browsers
            console.log("no way to tell if transition ended, sending callback in 700ms");
            if(callback && typeof callback == 'function'){
                window.setTimeout(function(){
                    console.log("executing callback function ");
                    callback();
                },700);
            };
        }

    },
    whichTransitionEvent: function(){
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    },
    checkVisibility : function(){
        var docViewTop = $(window).scrollTop(),
            windowHeight = $(window).height(),
            thresholdTop = -40,
            thresholdBottom = -60;

        $('.js-scrollAnimation').each(function(i, element){
            var $element = $(element),
                elementHeight = $element.height(),
                elementClientRect = $element[0].getBoundingClientRect(),
                elementTop = elementClientRect.top + window.pageYOffset + elementClientRect.height/2;

            if(docViewTop < elementTop+(elementHeight/3)+thresholdTop && elementTop+(elementHeight/3)+thresholdBottom < docViewTop+windowHeight){
                // visible
                if(!$element.hasClass('is-visible')){
                    $element.addClass('is-visible');
                }
            }
        });
        $('.js-load-hires').each(function(i, element){
            var $element = $(element),
                elementHeight = $element.height(),
                elementClientRect = $element[0].getBoundingClientRect(),
                elementTop = elementClientRect.top + window.pageYOffset + elementClientRect.height/2;

            if(docViewTop < elementTop+(elementHeight/3)+thresholdTop && elementTop+(elementHeight/3)+thresholdBottom < docViewTop+windowHeight){
                // visible
                if(!$element.hasClass('is-loaded')){
                    var hiSrc  = $element.attr('src');
                    console.log(hiSrc);
                    hiSrc = hiSrc.slice(0, -8);
                    $element.attr({
                        'src' : hiSrc+".jpg"
                    });
                    $element.addClass('is-loaded');
                }
            }
        });
    }

};

var breakpoint = {
    refreshValue: function(){
        this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
    }
};

var resize = {
    init: function(){
        var resizeTimeout;
        breakpoint.refreshValue();
        $(window).resize(function(){
            if(resizeTimeout) {
                //clear timeout
                clearTimeout(resizeTimeout);
                resizeTimeout = null;
            }
            resizeTimeout = setTimeout(function(){
                var $body = $('body');
                /* Set data-width attribute with $window.width */
                $body.data('width', $(window).width());

                breakpoint.refreshValue();

            }, 10); //Zeitliche Toleranz des resize
        });
    }
};

var scroll = {
    init: function(){
        var scrollTimeout;
        $(window).on('scroll' , function(){
            if(scrollTimeout) {
                //clear timeout
                clearTimeout(scrollTimeout);
                scrollTimeout = null;
            }
            scrollTimeout = setTimeout(function(){
                helper.checkVisibility();
            }, 10); //Zeitliche Toleranz des scroll
        });
    }
};


/*** todo: preload images then change src, use this: **/

var preloadPictures = function(pictureUrls, callback) {
    var i,
        j,
        loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () {
                if (++loaded == pictureUrls.length && callback) {
                    callback();
                }
            };

            // Use the following callback methods to debug
            // in case of an unexpected behavior.
            img.onerror = function () {};
            img.onabort = function () {};

            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};

preloadPictures(['http://foo/picture.bar', 'http://foo/picture.bar', 'http://foo/picture.bar', 'http://foo/picture.bar'], function(){
    console.log('a');
});

preloadPictures(['http://foo/picture.bar', 'http://foo/picture.bar', 'http://foo/picture.bar', 'http://foo/picture.bar'], function(){
    console.log('b');
});