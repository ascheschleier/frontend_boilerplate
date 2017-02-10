define(['jquery'], function ($) {
    var App = {};

    App.init = function () {

        $(function () {

            require(['app/sameHeight'], function (sameHeight) {
                sameHeight.init();
            });

        });

    };

    return App;
});