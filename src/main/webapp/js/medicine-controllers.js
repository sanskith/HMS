//uncomment if you need security
function InventoryCtrl($scope, $http, $localStorage, $location, Medicine,
		Flash, /*checkCreds, getToken*/ deleteCreds, DTOptionsBuilder,
		DTColumnDefBuilder) {

	if ( /* !checkCreds() */$localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;

	$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withOption('aaSorting', [[0, 'asc']]);

	$scope.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6)];

	$scope.logout = function() {
		deleteCreds();
		$location.path("/home");
	};

	$scope.addMedicine = function() {
		$location.path("/addMedicine");
	};

	$scope.users = function() {
		$location.path("/users");
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};
	
	$scope.refresh = function() {
		/*
		 * $http.defaults.headers.common['Authorization'] = 'Basic ' +
		 * getToken();
		 */
		$scope.medicines = Medicine.query();
		
		$scope.clearMessages();
	};

	$scope.currDate = new Date();

	$scope.comp = function(med) {
		var exp = new Date(med.expDate);
		var curr = new Date();
		if (exp > curr) {
			exp.setDate(exp.getDate() - 90);
			if (exp > curr)
				return "";
			else
				return "label label-warning";
		} else {
			return "label label-danger";
		}
	};

	$scope.count = function(med) {
		if (med.totalTablets > 10)
			return "badge";
		else
			return "label label-danger";
	};

	$scope.modifyMedicine = function(index) {

		$localStorage.$default({
			'medicine' : $scope.medicines[index]
		});
		$location.path("/updateMedicine");
	};

	$scope.removeMedicine = function(index) {

		/*
		 * $http.defaults.headers.common['Authorization'] = 'Basic ' +
		 * getToken();
		 */
		Medicine
				.remove(
						{
							medicineId : $scope.medicines[index].id
						},
						function(data) {
							$scope.medicines.splice(index, 1);
							$scope.successMessages = [ 'Medicine deleted successfully' ];
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
								$scope.errorMessages = [ 'Medicine '
										+ $scope.medicines[index].name
										+ ' is already sold several times, on deleteing this item billing information related to this will be lost' ];
								Flash.create('danger', $scope.errorMessages,
										0, {
											class : 'custom-class',
											id : 'custom-id'
										}, true);
							} else {
								$scope.errorMessages = [ 'Unknown server error' ];
								Flash.create('danger', $scope.errorMessages,
										0, {
											class : 'custom-class',
											id : 'custom-id'
										}, true);
							}
						});
	};

	$scope.bills = function() {
		$location.path("/bills");
	};

	// Call the refresh() function, to populate the list of members
	$scope.refresh();

	// Set the default orderBy to the name property
	$scope.orderBy = 'name';
}

function AddMediceCtrl($scope, $http, $localStorage, $location, Medicine,
		Flash, /*checkCreds,getToken,*/deleteCreds,$timeout) {

	if ( /* !checkCreds() */$localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.updated = false;

	$scope.logout = function() {
		deleteCreds();
		$location.path("/home");
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
		$scope.updated=false;
		
	};

	// Define a reset function, that clears the prototype newMember object, and
	// consequently, the form
	$scope.reset = function() {
		// Sets the form to it's pristine state
		if ($scope.mdnForm) {
			$scope.mdnForm.$setPristine();
		}
		// Clear input fields. If $scope.newMember was set to an empty object
		// {},
		// then invalid form values would not be reset.
		// By specifying all properties, input fields with invalid values are
		// also reset.
		$scope.medicine = {
			name : "",
			company : "",
			mnfDate : "",
			expDate : "",
			price : "",
			totalTablets : ""
		};
		$scope.strip = "";
		

		// clear messages
		$scope.clearMessages();
	};

	$scope.add = function() {
		$scope.medicine.users = $localStorage.loggedInUser;

		/*
		 * $http.defaults.headers.common['Authorization'] = 'Basic ' +
		 * getToken();
		 */

		Medicine.save($scope.medicine, function(data) {
			$scope.reset();
			// mark success on the registration form
			$scope.successMessages = [ 'Medicine added successfully' ];
			Flash.create('success', $scope.successMessages, 0, {
				class : 'custom-class',
				id : 'custom-id'
			}, true);
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
				$scope.errorMessages = [ 'Medicine already exist' ];
				Flash.create('danger', $scope.errorMessages, 0, {
					class : 'custom-class',
					id : 'custom-id'
				}, true);
			} else {
				$scope.errorMessages = [ 'Unknown  server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {
					class : 'custom-class',
					id : 'custom-id'
				}, true);
			}
		});
	};

	$scope.backToInventory = function() {
		$location.path("/inventory");
	};

	$scope.reset();
	$scope.isUpdate = false;

	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};

	$scope.popup1 = {
		opened : false
	};

	$scope.popup2 = {
		opened : false
	};

	function roundToTwo(num) {
		return +(Math.round(num + "e+2") + "e-2");
	}
	 var timer;
	$scope.calcuate = function() {
		$timeout.cancel(timer);
		timer = $timeout(function() {
			$scope.medicine.totalTablets = $scope.strip
					* $scope.medicine.stripTablets;
			$scope.medicine.tabletPrice = roundToTwo($scope.medicine.price
					/ $scope.medicine.stripTablets);
			$scope.updated = true;
		}, 2000);
		timer.then(
		          function() {
		          },
		          function() {
		          }
		       );
	};
	
}

function UpdateCtrl($scope, $http, $localStorage, $location, Medicine,
		/*checkCreds,  getToken,*/deleteCreds, Flash, $timeout) {

	if ( /* !checkCreds() */$localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.medicine = $localStorage.medicine;
	$scope.medicine.mnfDate = new Date($scope.medicine.mnfDate);
	$scope.medicine.expDate = new Date($scope.medicine.expDate);
	$scope.updated = false;
	$scope.type = 'strip';

	$scope.logout = function() {
		deleteCreds();
		$location.path("/home");
	};

	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};	
		$scope.updated=false;
	};

	// Define a reset function, that clears the prototype newMember object, and
	// consequently, the form
	$scope.reset = function() {

		/*
		 * $http.defaults.headers.common['Authorization'] = 'Basic ' +
		 * getToken();
		 */

		Medicine.get({
			medicineId : $scope.medicine.id
		}, function(data) {
			$scope.medicine = data;
			$scope.medicine.mnfDate = new Date($scope.medicine.mnfDate);
			$scope.medicine.expDate = new Date($scope.medicine.expDate);
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {
					class : 'custom-class',
					id : 'custom-id'
				}, true);
			}
		});
		$scope.strip = "";
		$scope.updateMsg = ""
		$scope.clearMessages();
	};

	$scope.update = function() {

		/*
		 * $http.defaults.headers.common['Authorization'] = 'Basic ' +
		 * getToken();
		 */
		console.log('update');
		Medicine.update($scope.medicine, function(data) {
			// mark success on the registration form
			$scope.successMessages = [ 'Medicine updated successfully' ];
			Flash.create('success', $scope.successMessages, 0, {
				class : 'custom-class',
				id : 'custom-id'
			}, true);
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown  server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {
					class : 'custom-class',
					id : 'custom-id'
				}, true);
			}
		});
	};
	
	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};

	$scope.open2 = function() {
		$scope.popup2.opened = true;
	};

	$scope.popup1 = {
		opened : false
	};

	$scope.popup2 = {
		opened : false
	};

	function roundToTwo(num) {
		return +(Math.round(num + "e+2") + "e-2");
	}

	 var timer;
	$scope.calcuate = function() {
		$timeout.cancel(timer);
		timer = $timeout(function() {
			$scope.medicine.totalTablets = $scope.medicine.totalTablets
					+ ($scope.strip * $scope.medicine.stripTablets);
			$scope.medicine.tabletPrice = roundToTwo($scope.medicine.price
					/ $scope.medicine.stripTablets);
			$scope.updated = true;
		}, 2000);
		timer.then(
		          function() {
		          },
		          function() {
		          }
		       );

	};
	
	$scope.addOrRemoveTablets = function(){
		$timeout.cancel(timer);
		timer = $timeout(function() {
			$scope.medicine.totalTablets = $scope.medicine.totalTablets
					+ ($scope.tablet);
			$scope.medicine.tabletPrice = roundToTwo($scope.medicine.price
					/ $scope.medicine.stripTablets);
			$scope.updated = true;
		}, 2000);
		timer.then(
		          function() {
		          },
		          function() {
		          }
		       );
	};
	
	$scope.checkType = function(){
		if($scope.type === 'strip')
			return true;
		else
			return false;
	};

	$scope.backToInventory = function() {
		$location.path("/inventory");
	};

	delete $localStorage.medicine;

}
