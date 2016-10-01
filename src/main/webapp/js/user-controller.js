function UsersCtrl($scope, $http, $localStorage, $location, User,/*checkCreds, getToken,*/deleteCreds,Flash,
		DTOptionsBuilder, DTColumnDefBuilder) {

	if ( /*!checkCreds()*/  $localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
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
	
	$scope.transactions = function(){
		$location.path("/transactions");
	};
	
	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
		$scope.clearMessages();
	};
	
	$scope.refresh = function() {
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		$scope.users = User.query();
	};


	$scope.modifyUser = function(user) {
		$localStorage.$default({
			'user' : user
		});
		$location.path("/updateUser");
	};

	
	$scope.removeMedicine = function(user) {
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		var index = $scope.users.indexOf(user);
		User.remove({
			userId : index
		}, function(data) {
			$scope.users.splice(index, 1);
			$scope.successMessages = [ 'User deleted successfully' ];
			Flash.create('success', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
	};
	
	// Call the refresh() function, to populate the list of members
	$scope.refresh();

	// Set the default orderBy to the name property
	$scope.orderBy = 'name';

}
function AddUserCtrl($scope, $http, $localStorage, $location, User, /*checkCreds, getToken,*/deleteCreds, Flash) {
	
	if ( /*!checkCreds()*/ $localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;
	
	$scope.logout = function() {
		deleteCreds();
		$location.path("/home");
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.usrForm) {
			$scope.usrForm.$setPristine();
		}
		$scope.user = {
				name : "",
				username : "",
				password : "",
				email : "",
				phone : "",
				secuirtyQuestions :[],
				
			};
		$scope.questions();
		
		// clear messages
		$scope.clearMessages();
	};

	$scope.questions = function() {
		$scope.options = []
		$scope.options.push({
			label : "Please select",
			value : ""
		});
		$scope.options.push({
			label : "What is your favorite sports?",
			value : ""
		});
		$scope.options.push({
			label : "What is your school name?",
			value : ""
		});
		$scope.options.push({
			label : "What is your mother name?",
			value : ""
		});
		$scope.options.push({
			label : "What is your favorite color?",
			value : ""
		});
		$scope.options.push({
			label : "In which city you born?",
			value : ""
		});
		
		$scope.secuirtyQuestions1 = {
				question:$scope.options[0].label,
				answer:""
		}
		
		$scope.secuirtyQuestions2 = {
				question:$scope.options[0].label,
				answer:""
		}
		
		$scope.secuirtyQuestions3 = {
				question:$scope.options[0].label,
				answer:""
		}
	}
	$scope.add = function() {
		$scope.user.secuirtyQuestions=[];
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions1);
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions2);
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions3);
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
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
				Flash.create('danger', $scope.errorMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
	};
	
	$scope.users = function(){
		$location.path("/users");
	};

	$scope.reset();
	$scope.isUpdate = false;
}
function UpdateUserCtrl($scope, $http, $localStorage, $location, User, /*checkCreds,  getToken,*/deleteCreds, Flash) {
	
	if ( /*!checkCreds()*/ $localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}
	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.user = $localStorage.user;
	$scope.isUpdate = true;
	
	console.log($scope.user);
	

	$scope.logout = function() {
		deleteCreds();
		$location.path("/home");
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};
	
	$scope.questions = function() {
		$scope.options = []
		$scope.options.push({
			label : "Please select",
			value : ""
		});
		$scope.options.push({
			label : "What is your favorite sports?",
			value : ""
		});
		$scope.options.push({
			label : "What is your school name?",
			value : ""
		});
		$scope.options.push({
			label : "What is your mother name?",
			value : ""
		});
		$scope.options.push({
			label : "What is your favorite color?",
			value : ""
		});
		$scope.options.push({
			label : "In which city you born?",
			value : ""
		});
		
		$scope.secuirtyQuestions1 = {
				question:$scope.user.secuirtyQuestions[0].question,
				answer:$scope.user.secuirtyQuestions[0].answer
		}
		
		$scope.secuirtyQuestions2 = {
				question:$scope.user.secuirtyQuestions[1].question,
				answer:$scope.user.secuirtyQuestions[1].answer
		}
		
		$scope.secuirtyQuestions3 = {
				question:$scope.user.secuirtyQuestions[2].question,
				answer:$scope.user.secuirtyQuestions[2].answer
		}
	}
	$scope.questions();

	// Define a reset function, that clears the prototype newMember object, and
	// consequently, the form
	$scope.reset = function() {
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		User.get({
			userId : $scope.user.id
		}, function(data) {

			$scope.user = data;

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
		$scope.clearMessages();
	};

	$scope.update = function() {
		$scope.user.secuirtyQuestions=[];
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions1);
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions2);
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions3);
		
	/*	$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		User.update($scope.user, function(data) {
			// mark success on the registration form
			$scope.successMessages = [ 'User updated successfully' ];
			Flash.create('success', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown  server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
	};

	$scope.users = function(){
		$location.path("/users");
	};
	
	$scope.clearMessages();
	
	delete $localStorage.user;

}