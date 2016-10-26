;
(function() {


    'use strict';

    angular
        .module('git-searcher')
        .factory('gitData', [
            '$http', '$q', 'CONSTANTS', gitData
        ]);
    // Query making service
    function gitData($http, $q, CONSTANTS, $scope, $filter) {

        //Add method to service
        var service = {
            query: query
        };

        return service;

        //////////////// definition

        //Query method
        function query(method, url, params, data) {
            var deferred = $q.defer();

            $http({
                method: method,
                url: CONSTANTS.API_URL + url,
                params: params,
                data: data
            }).then(function(data) {

                if (!data.config) {
                    console.log('Server error occured.');
                }
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }


})();
