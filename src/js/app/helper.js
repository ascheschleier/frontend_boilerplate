define(['jquery'], function ($) {

    var helper = {

        init: function () {

        },

        scrollTo: function (_target, _speed) {
            var offset, speed;
            if (!_target) {
                offset = 0;
            } else {
                offset = $(_target).offset().top;
            }
            if (!_speed) {
                speed = 750;
            } else {
                speed = _speed;
            }
            var page = $("html, body");

            page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
                page.stop();
            });

            page.animate({scrollTop: offset}, speed, function () {
                page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
            });
        },

        onAnimationComplete: function ($element, callback) {
            var transitionEvent = helper.whichTransitionEvent();

            if (transitionEvent) { //we have the CSS transition feature
                $element.one(transitionEvent, function (e) {
                    // this is your completion event!
                    //console.log("transition complete");
                    if (callback && typeof callback == 'function') {
                        //console.log("executing callback function ");
                        callback();
                    }
                    ;
                });
            } else { //fallback for non CSS transition browsers
                console.log("no way to tell if transition ended, sending callback in 700ms");
                if (callback && typeof callback == 'function') {
                    window.setTimeout(function () {
                        console.log("executing callback function ");
                        callback();
                    }, 700);
                }
                ;
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
        },

        whichTransitionEvent: function () {
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }

    };


    return helper;
});
