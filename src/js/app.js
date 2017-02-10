require.config({
    paths: {
        jquery: 'vendors/jquery/dist/jquery',
        //modernizr: 'vendors/modernizr/bin/modernizr',
        tweenmax:  'vendors/gsap/src/uncompressed/TweenMax',
        tweenlite:  'vendors/gsap/src/uncompressed/TweenLite',
        timelinelite:  'vendors/gsap/src/uncompressed/TimelineLite',
        timelinemax:  'vendors/gsap/src/uncompressed/TimelineMax',
    },
    config: {

    },
    shim: {
        jquery: {
            exports: '$'
        },
        tweenmax: {
            exports: 'TweenMax'
        },
        tweenlite: {
            exports: 'TweenLite'
        },
        timelinelite: {
            exports: 'TimelineLite'
        },
        timelinemax: {
            exports: 'TimelineMax'
        }
    }
});

require(["app/main"], function(App){
    App.init();
});

