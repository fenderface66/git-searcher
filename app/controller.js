;
(function() {

    angular
        .module('git-searcher')
        .controller('MainController', MainController);

    MainController.$inject = ['LocalStorage', 'gitData', '$scope', '$location', '$window'];


    function MainController(LocalStorage, gitData, $scope, $location, $window) {
        var self = this;
        ////////////  function definitions
        var request = {
            q: "bootstrap"
        }
        $scope.disableFilter = '';
        $scope.items = [];
        $scope.loadingBay = [];
        $scope.tags = []; 
        $scope.post = $location.hash();
			
        gitData.query('GET', 'search/repositories', request, {})
            .then(function(obj) {
                $scope.obj = obj.data;
                console.log($scope.obj);
                angular.forEach($scope.obj.items, function(value, key) {

                    if (key < 5 && $scope.items.push(value)) {
											console.log(value);
											this.push(value);
											
										}

                    
                }, $scope.loadingBay);

            })
        $scope.filtered = false;
        $scope.loadMore = function loadMore(all) {
            var counter = 0;
            if (all === true && $scope.filtered === false || all !== true) {
                angular.forEach($scope.loadingBay, function(value, key) {
                    counter++;
                    if (all !== true && $scope.filtered === false) {
                        if (key === $scope.items.length && counter < 2) {
                            this.push(value);
                            $scope.$apply();
                        } else {
                            counter = 0;
                        }
                    } else if (all === true) {
                        console.log('hello');
                        if (key === $scope.items.length + 1) {
                            this.push(value);
                            $scope.filtered = true;
                        }
                    }


                }, $scope.items);
            }
        }
    }
})();
