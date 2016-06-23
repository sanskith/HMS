function transactionCntrl($scope, $http, $localStorage, $location, User,
		$scope, Transactions, $timeout, /* checkCreds, getToken, */deleteCreds) {

	if ( /* !checkCreds() */$localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}

	
	$scope.getData = function() {
		
		Transactions.save($scope.date, function(data) {

			$scope.amountOfTheDay = data.amountOfTheDay;
			$scope.amountOfTheMonth = data.amountOfTheMonth;

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {

			} else {
				$scope.errorMessages = [ 'Unknown  server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {
					class : 'custom-class',
					id : 'custom-id'
				}, true);
			}
		});
	};
	
	$scope.today = function() {
		$scope.date = new Date();
		$scope.getData();
	};
	$scope.today();

	$scope.dateOptions = {
		maxDate : new Date(),
		minDate : new Date(1900, 1, 1),
		startingDay : 1
	};
	$scope.popup1 = {
		opened : false
	};
	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};
	$scope.users = function() {
		$location.path("/users");
	};

	$scope.medicines = function() {
		$location.path("/inventory");
	};

	$scope.bills = function() {
		$location.path("/bills");
	};

	$scope.chart = function() {
		$location.path("/transactions");
	};

	$scope.logout = function() {
		deleteCreds();
		console.log("from lougout" + $localStorage.loggedInUser);
		$location.path("/home");
	};
	$scope.loggedInUser = $localStorage.loggedInUser;

	

}