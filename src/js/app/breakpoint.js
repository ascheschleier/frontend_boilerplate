define(['jquery' ], function($ ){
    return {
        value : function() {
            return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
        }
    };
});