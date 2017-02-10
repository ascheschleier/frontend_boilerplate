define(['jquery' ], function($){

    var resize = {
        registerFuntion: function(_function , timeout){
            var resizeTimeout;
            $(window).resize(function(){
                if(resizeTimeout) {
                    //clear timeout
                    clearTimeout(resizeTimeout);
                    resizeTimeout = null;
                }
                resizeTimeout = setTimeout(function(){
                    _function();
                }, timeout); //Zeitliche Toleranz des resize
            });
        }
    };

    return resize;
});

