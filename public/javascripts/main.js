'use strict';

window.onload = (function(window, document) {
    var PAGE_AMOUNT = 10,
        page = 0,
        loadButton;

    var feed = new Instafeed({
        get: 'user',
        userId: '34917079',
        clientId: '594501d871ac420aac1521d65f64b9dd',
        resolution: 'standard_resolution',
        template: '<a class="feed-element" href="{{link}}"><img src="{{image}}" /></a>',
        filter: function(image) {
            return image.tags.indexOf('procreateapp') >= 0;
        },
        after: function() {
            if ( this.hasNext() ) {
            	this.next()
            }
        },
    });

    function init() {

        loadButton = document.querySelector('#load-more');
        feed.run();
        getPages();
        addListeners();

    }

    function getPages() {

        while (page <= PAGE_AMOUNT) {
            console.log('recursion');
            feed.next();
            page++
        }

    }

    function addListeners() {
        // bind the load more button
        loadButton.addEventListener('click', function() {
            feed.next();
            console.log('next')
        });
    }

    return {
        init: init()
    }

})(window, window.document)