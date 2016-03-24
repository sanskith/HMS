function ChartCtrl($scope, $http, $localStorage, $location, User,$scope, $timeout,checkCreds, deleteCreds, getToken) {

	if (!checkCreds()) {
		$location.path("/home");
	}
	
	$scope.logout = function() {
		deleteCreds();
		console.log("from lougout" + $localStorage.loggedInUser);
		$location.path("/home");
	};
	$scope.loggedInUser = $localStorage.loggedInUser;
	
	$scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
	  $scope.series = ['profit/Loss'];
	  $scope.data = [
	    [65, 59, 80, 81, 56, 55, -40]
	  ];
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };

	/*  // Simulate async data update
	  $timeout(function () {
	    $scope.data = [
	      [28, 48, 40, 19, 86, 27, 90],
	      [65, 59, 80, 81, 56, 55, 40]
	    ];
	  }, 3000);*/

	$scope.users = function() {
		$location.path("/users");
	};

	$scope.medicines = function() {
		$location.path("/inventory");
	};

	$scope.bills = function() {
		$location.path("/bills");
	};
}