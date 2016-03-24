function UsersCtrl($scope, $http, $localStorage, $location, User,checkCreds, deleteCreds, getToken,Flash,
		DTOptionsBuilder, DTColumnDefBuilder) {

	if (!checkCreds()) {
		$location.path("/home");
	}
	
	$scope.loggedInUser = $localStorage.loggedInUser;

	$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers');

	$scope.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3).notSortable() ];

	$scope.logout = function() {
		deleteCreds();
		console.log("from lougout" + $localStorage.loggedInUser);
		$location.path("/home");
	};

	$scope.medicines = function() {
		$location.path("/inventory");
	};
	
	$scope.bills = function(){
		$location.path("/bills");
	};
	
	$scope.addUser = function(){
		$location.path("/newUser");
	};
	
	$scope.chart = function(){
		$location.path("/chart");
	};
	
	$scope.refresh = function() {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		$scope.users = User.query();
	};


	$scope.modifyUser = function(index) {

		$localStorage.$default({
			'user' : $scope.users[index]
		});
		$location.path("/updateUser");
	};

	
	$scope.removeMedicine = function(index) {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		User.remove({
			userId : $scope.users[index].id
		}, function(data) {
			$scope.users.splice(index, 1);
			$scope.successMessages = [ 'User deleted successfully' ];
			Flash.create('success', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
	};
	
	// Call the refresh() function, to populate the list of members
	$scope.refresh();

	// Set the default orderBy to the name property
	$scope.orderBy = 'name';

}
function AddUserCtrl($scope, $http, $localStorage, $location, User, checkCreds, deleteCreds, getToken, Flash) {
	
	if (!checkCreds()) {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;
	
	$scope.logout = function() {
		deleteCreds();
		console.log("from lougout" + $localStorage.loggedInUser);
		$location.path("/home");
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	// Define a reset function, that clears the prototype newMember object, and
	// consequently, the form
	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.usrForm) {
			$scope.usrForm.$setPristine();
		}
		// Clear input fields. If $scope.newMember was set to an empty object
		// {},
		// then invalid form values would not be reset.
		// By specifying all properties, input fields with invalid values are
		// also reset.
		$scope.user = {
			name : "",
			username : "",
			password : "",
			email : "",
			phone : ""
		};

		// clear messages
		$scope.clearMessages();
	};

	$scope.add = function() {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		User.save($scope.user, function(data) {
			$scope.reset();
			// mark success on the registration form
			$scope.successMessages = [ 'User added successfully' ];
			Flash.create('success', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
				$scope.errorMessages = [result.data.name];
			} else {
				$scope.errorMessages = [ 'Unknown  server error' ];
				Flash.create('danger', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
	};
	
	$scope.users = function(){
		$location.path("/users");
	};

	$scope.reset();
	$scope.isUpdate = false;
}
function UpdateUserCtrl($scope, $http, $localStorage, $location, User, checkCreds, deleteCreds, getToken, Flash) {
	
	if (!checkCreds()) {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.user = $localStorage.user;
	$scope.isUpdate = true;
	

	$scope.logout = function() {
		deleteCreds();
		console.log("from lougout" + $localStorage.loggedInUser);
		$location.path("/home");
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	// Define a reset function, that clears the prototype newMember object, and
	// consequently, the form
	$scope.reset = function() {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		User.get({
			userId : $scope.user.id
		}, function(data) {

			$scope.user = data;

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
		$scope.clearMessages();
	};

	$scope.update = function() {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		User.update($scope.user, function(data) {
			// mark success on the registration form
			$scope.successMessages = [ 'User updated successfully' ];
			Flash.create('success', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown  server error' ];
				Flash.create('danger', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
	};

	$scope.users = function(){
		$location.path("/users");
	};
	
	delete $localStorage.user;

}