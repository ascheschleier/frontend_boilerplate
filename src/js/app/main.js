define(['jquery'], function ($) {
    var App = {};

    App.init = function () {

        $(function () {

            require(['app/sameHeight'], function (sameHeight) {
                sameHeight.init();
            });

            require(['app/nav'], function (nav) {
                nav.init();
            });

            require(['app/animation'], function (animation) {
                animation.init();
            });
        });

    };

    return App;
});