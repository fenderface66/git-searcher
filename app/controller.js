;
(function() {

	//HOME PAGE CONTROLLER

	angular
		.module('git-searcher')
		.controller('MainController', MainController);

	MainController.$inject = ['LocalStorage', 'gitData', '$scope', '$location', '$window', '$rootScope'];


	function MainController(LocalStorage, gitData, $scope, $location, $window, $rootScope) {

		console.log("Running Home");
		var self = this;

		var request = {
			q: "bootstrap"
		}
		$scope.disableFilter = '';
		$scope.items = [];
		$rootScope.loadingBay = [];
		$rootScope.test = "test";
		$scope.tags = [];
		$scope.post = $location.hash();

		gitData.query('GET', 'search/repositories', request, {})
			.then(function(obj) {
			$scope.obj = obj.data;
			console.log($scope.obj);
			angular.forEach($scope.obj.items, function(value, key) {

				key < 5 && $scope.items.push(value)
				this.push(value);

			}, $rootScope.loadingBay);

		})
		$scope.filtered = false;
		$rootScope.loadMore = function loadMore(all) {
			var counter = 0;
			if (all === true && $scope.filtered === false || all !== true) {
				angular.forEach($rootScope.loadingBay, function(value, key) {
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

		$rootScope.getName = function getName(fullName) {
			console.log("running getName()");
			console.log(fullName);
			$rootScope.fullName = fullName;
		}
	}


	//ISSUES CONTROLLER

	angular
		.module('git-searcher')
		.controller('IssuesController', IssuesController);

	IssuesController.$inject = ['LocalStorage', 'gitData', '$scope', '$location', '$window', '$rootScope'];


	function IssuesController(LocalStorage, gitData, $scope, $location, $window, $rootScope) {
		var self = this;
		console.log($rootScope);
		console.log("Running issues");

		if ($rootScope.fullName === undefined) {
			$location.path("")
			$location.search({});

		}

		$scope.post = $location.hash();

		$scope.filtered = false;

		$scope.getIssues = function getIssues(fullName) {
			console.log(fullName);
			gitData.query('GET', 'search/issues', {
				q: fullName
			}, {})
				.then(function(obj) {
				$scope.issues = obj.data.items;
				console.log($scope.issues);
				$scope.test = "test";

			})
		}

		$scope.getIssues($rootScope.fullName);
	}

	//CHART CONTROLLER

	angular
		.module('git-searcher')
		.controller('ChartsController', ChartsController);

	ChartsController.$inject = ['LocalStorage', 'gitData', '$scope', '$location', '$rootScope'];


	function ChartsController(LocalStorage, gitData, $scope, $location, $rootScope) {

		var self = this;
		if ($rootScope.fullName === undefined) {
			$location.path("/")
			$location.search({});

		}
		$scope.post = $location.hash();
		$scope.data = [];
		$scope.barData = [];
		$scope.pieData = [];
		$scope.horData = [];
		$scope.labels = [];
		angular.forEach($rootScope.loadingBay, function(value, key) {
				
			this.push(value.forks);
			$scope.labels.push(value.full_name);
		}, $scope.data);
		angular.forEach($rootScope.loadingBay, function(value, key) {
				
			this.push(value.open_issues);

		}, $scope.barData);
		
				angular.forEach($rootScope.loadingBay, function(value, key) {
				
			this.push(value.stargazers_count);

		}, $scope.pieData);
		
		angular.forEach($rootScope.loadingBay, function(value, key) {
				
			this.push(value.score);

		}, $scope.horData);


		





	}

})();