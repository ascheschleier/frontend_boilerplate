define(['jquery', 'tweenmax'], function($, tweenmax){

    var $nav, $navButton, $menuLayer;
    var menuHeight;

    var debug = function(_log){
        console.log(_log);
    };

    var nav = {
        init: function(){
            $nav = $('#nav');
            $navButton = $('.nav-button');
            $menuLayer = $('.nav-layer');
            menuHeight = 0;

            $navButton.on('click', function(){
                if($nav.hasClass('is-open')){
                    nav.closeNav();
                } else {
                    nav.openNav();
                }
            });
        },

        openNav: function(){
            var _height = $menuLayer.find('.nav-first').height();
            //$menuLayer.css({'height' : _height});
            nav.openAnimation();
            $nav.addClass('is-open');
        },

        closeNav: function(){
            //$menuLayer.css({'height' : _height});
            //$menuLayer.attr({ 'style' : ''});
            /*helper.onAnimationComplete($menuLayer, function(){

                console.log("closing");
            });*/
            nav.closeAnimation();
            $nav.removeClass('is-open');
        },

        openAnimation: function(){
            tweenmax.to($menuLayer, 1, {
                //left:"0%",
                opacity: "1",
            } );
        },

        closeAnimation: function(){
            tweenmax.to($menuLayer, 1, {
                //left:"-100%",
                opacity: "1",
                onComplete: function(){

                }
            } );
        }
    };

    return nav;
});
