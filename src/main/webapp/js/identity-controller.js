function IdentityCtrl($scope, $http, Login, $location, $localStorage, /* setCreds, */
Flash,/* getToken, */deleteCreds) {

	deleteCreds();

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.reset = function() {
		if ($scope.loginForm) {
			$scope.loginForm.$setPristine();
		}
		$scope.identity = {
			username : "",
			password : ""
		};
		$scope.clearMessages();
	};

	$scope.signUp = function() {
		$location.path("/signUp");
	};

	$scope.forgotPassword = function() {
		$location.path("/forgotPassword");
	};

	$scope.login = function() {

		$scope.clearMessages();
		/*
		 * setCreds($scope.identity.username, $scope.identity.password);
		 * $http.defaults.headers.common['Authorization'] = 'Basic ' +
		 * getToken(); deleteCreds();
		 */
		Login.save(
						$scope.identity,
						function(data) {

							if (data === undefined || data === "") {
								$location.path("/home");
							}

							$localStorage.$default({
								'loggedInUser' : data
							});
							/* setCreds(data.username, data.password); */
							$location.path("/inventory");

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)
									|| (result.status == 403)) {
								$scope.errors = result.data;
								$scope.errorMessages = [ 'Invalid Username or password, please try again' ];
								Flash.create('danger', $scope.errorMessages, 0,
										{
											class : 'custom-class',
											id : 'custom-id'
										}, true);
							} else {
								$scope.errorMessages = [ 'Invalid Username or password, please try again' ];
								Flash.create('danger', $scope.errorMessages, 0,
										{
											class : 'custom-class',
											id : 'custom-id'
										}, true);
							}
						});
	};
	$scope.reset();
}

function SignUpCtrl($scope, $http, $localStorage, $location, User, Flash) {

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
		
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions1);
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions2);
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions3);
		
		/*
		 * $http.defaults.headers.common['Authorization'] = 'Basic ' +
		 * getToken();
		 */
		console.log($scope.user);
		User
				.save(
						$scope.user,
						function(data) {
							// mark success on the registration form
							$scope.successMessages = [ 'User added successfully, Please contact Admin for application access' ];
							Flash.create('success', $scope.successMessages, 0,
									{
										class : 'custom-class',
										id : 'custom-id'
									}, true);

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)) {
								$scope.errors = result.data;
								$scope.errorMessages = [ result.data.name ];
							} else {
								$scope.errorMessages = [ 'Unknown  server error' ];
								Flash.create('danger', $scope.errorMessages, 0,
										{
											class : 'custom-class',
											id : 'custom-id'
										}, true);
							}
						});
	};

	$scope.back = function() {
		$location.path("/home");
	};

	$scope.reset();
}

function passwordCntrl($scope, $http, $localStorage, $location, User, Flash, Login) {

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
				username : "",
				secuirtyQuestions :[],
				
			};
		$scope.questions();
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
		
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions1);
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions2);
		$scope.user.secuirtyQuestions.push($scope.secuirtyQuestions3);

		/*
		 * $http.defaults.headers.common['Authorization'] = 'Basic ' +
		 * getToken();
		 */
		Login.update(
						$scope.user,
						function(data) {
							$localStorage.$default({
								'user' : data
							});
							$location.path("/reset");

						},
						function(result) {
							if ((result.status == 409)
									|| (result.status == 400)
									|| (result.status == 403)) {
								$scope.errors = result.data;
								$scope.errorMessages = [ 'Invalid Username or password, please try again' ];
								Flash.create('danger', $scope.errorMessages, 0,
										{
											class : 'custom-class',
											id : 'custom-id'
										}, true);
							} else {
								$scope.errorMessages = [ 'Invalid Username or password, please try again' ];
								Flash.create('danger', $scope.errorMessages, 0,
										{
											class : 'custom-class',
											id : 'custom-id'
										}, true);
							}
						});
	};

	$scope.questions();
	$scope.reset();

	$scope.back = function() {
		$location.path("/home");
	};
}

function resetPasswordCntrl ($scope, $http, $localStorage, $location, User, /*
																		 * checkCreds,
																		 * getToken,*/deleteCreds, Flash) {
	if ( /*!checkCreds()*/ $localStorage.user === undefined
			|| $localStorage.user === "") {
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
	
	$scope.back = function() {
		$location.path("/home");
	};
	
	delete $localStorage.user;


}