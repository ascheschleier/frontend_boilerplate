define(['jquery', 'app/resize' ,'app/breakpoint' ], function($, resize , breakpoint){

    var debug = function(_log){
        //console.log(_log);
    };
    var sameHeight = {

        init: function(){
            sameHeight.getElements();
            resize.registerFuntion(sameHeight.getElements, 200);
        },

        getElements: function () {
            if(breakpoint.value() != 'mobile'){
                $('*[data-sameheight="group"]').each(function(){
                    var maxHeight = 0;
                    var $this = $(this);

                    var $items = $this.find('*[data-sameheight="item"]');
                    $items.attr({ 'style' : ''});
                    debug("-sameheight--");
                    debug($this);
                    debug("has the items:");
                    debug($items);
                    debug("---");
                    $items.each(function(){
                        var height = $(this).outerHeight();
                        debug($(this));
                        debug(height);
                        if(height > maxHeight){
                            maxHeight = height;

                        }
                    });
                    sameHeight.setHeight($items, maxHeight);
                });
            } else {
                var maxHeight = 0;
                $('*[data-sameheight="group"]').each(function(){
                    var $this = $(this);

                    var $items = $this.find('*[data-sameheight="item"]');
                    $items.attr({ 'style' : ''});
                });
            }
        },

        setHeight: function ($elements , height) {
            $elements.each(function(){
                $(this).css({
                    'height' : height
                })
            })
        }
    };

    return sameHeight;
});

