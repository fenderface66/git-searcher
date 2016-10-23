;
(function() {


    'use strict';
    angular.module('git-searcher')
        .directive('scroll', scroll);


    function scroll($window) {
        // Definition of directive
        return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                var body = document.body,
                    html = document.documentElement;
                var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                var windowBottom = windowHeight + window.pageYOffset;
                    windowBottom = Math.ceil(windowBottom);
                if (windowBottom >= (docHeight - 30)) {
                    scope.loadMore();

                }
            });
        };
    }

})();
