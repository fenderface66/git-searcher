;(function() {

  angular
    .module('git-searcher')
    .factory('getDataFromAPI', getDataFromAPI);

  getDataFromAPI.$inject = ['$http', 'LocalStorage'];


  ////////////


  function getDataFromAPI($http, LocalStorage) {

    return {
      loadData: loadData
    };

  }


})();
