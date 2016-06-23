function ChartCtrl($scope, $http, $localStorage, $location, User, $scope,
		$timeout, /*checkCreds,  getToken,*/ deleteCreds) {

	if ( /*!checkCreds()*/ $localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}
	
	var startDate = new Date(2012, 02, 1);
	$scope.selectedOption = {label:"Please Select", value:{}};

	generateOptions = function() {
		$scope.options = [	$scope.selectedOption];
		var startYear = startDate.getFullYear();
		var endYear;
		var years = Math.ceil(calculateYears(startDate));
		startYear = startYear+years;
		for (var i = years; i > 0; i--) {
			endYear = startYear - 1;
			var option = {
				label : startYear + '-' + endYear,
				value : {
					sDate : new Date(startYear, 03, 01),
					eDate : new Date(endYear, 02, 31)
				}
			};
			$scope.options.push(option);
			startYear--;
		}
	}

	function calculateYears(startDate) {
		var milSecPerDay = 1000 * 60 * 60 * 24;
		var numberOfDays = (((new Date()).getTime() - startDate.getTime()) / milSecPerDay);
		var numberOfYears = numberOfDays / 365;
		console.log("numberOfYears:" + numberOfYears);
		console.log("today:" + (new Date()).getTime());
		console.log("startDay:" + startDate.getTime());
		return numberOfYears;
	}

	$scope.logout = function() {
		deleteCreds();
		console.log("from lougout" + $localStorage.loggedInUser);
		$location.path("/home");
	};
	$scope.loggedInUser = $localStorage.loggedInUser;

	$scope.chart = function() {
		console.log(typeof $scope.selectedOption.value.sDate);
		console.log($scope.selectedOption);

		var startYear = $scope.selectedOption.value.sDate.getFullYear()
				.toString().substr(2, 2);
		var endYear = $scope.selectedOption.value.eDate.getFullYear()
				.toString().substr(2, 2);

		$scope.labels = [ "Apr '" + startYear, "May '" + startYear,
				"Jun '" + startYear, "Jul '" + startYear, "Aug '" + startYear,
				"Sep '" + startYear, "Oct '" + startYear, "Nov '" + startYear,
				"Dec '" + startYear, "Jan '" + endYear, "Feb '" + endYear,
				"Mar '" + endYear ];

		$scope.series = [ 'profit/Loss' ];

		$scope.data = [ [ 65, 59, 80, 81, 56, 55, -40 ] ];
		$scope.onClick = function(points, evt) {
			console.log(points, evt);
		};

	}

	/*
	 * // Simulate async data update $timeout(function () { $scope.data = [ [28,
	 * 48, 40, 19, 86, 27, 90], [65, 59, 80, 81, 56, 55, 40] ]; }, 3000);
	 */

	$scope.users = function() {
		$location.path("/users");
	};

	$scope.medicines = function() {
		$location.path("/inventory");
	};

	$scope.bills = function() {
		$location.path("/bills");
	};
	
	$scope.transactions = function(){
		$location.path("/transactions");
	};
	generateOptions();
}