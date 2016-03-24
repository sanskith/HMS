function BillInventoryCntrl($scope, $http, $localStorage, $location, Bill, checkCreds, deleteCreds, getToken,Flash,
		DTOptionsBuilder, DTColumnDefBuilder) {

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers');

	$scope.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5).notSortable() ];

	$scope.logout = function() {
		deleteCreds();
		console.log("from lougout" + $localStorage.loggedInUser);
		$location.path("/home");
	};

	$scope.refresh = function() {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		$scope.bills = Bill.query();
	};

	$scope.currDate = new Date();

	$scope.modifyBill = function(index) {
		$localStorage.$default({
			'bill' : $scope.bills[index]
		});
		$location.path("/updateBill");
	};

	$scope.removeBill = function(index) {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		Bill.remove({
			billId : $scope.bills[index].id
		}, function(data) {
			$scope.bills.splice(index, 1);
			$scope.successMessages = [ 'Bill deleted successfully' ];
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

	$scope.newBill = function() {
		$location.path("/newBill");
	};

	$scope.medicine = function() {
		$location.path("/inventory");
	};
	
	$scope.users = function() {
		$location.path("/users");
	};

	// Call the refresh() function, to populate the list of members
	$scope.refresh();

	// Set the default orderBy to the name property
	$scope.orderBy = 'phone';

}

function AddBillCtrl($scope, $http, $localStorage, $location, Bill, Medicine, $timeout,  checkCreds, deleteCreds, getToken, Flash) {

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.currDate = new Date();

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
		if ($scope.billForm) {
			$scope.billForm.$setPristine();
		}
		// Clear input fields. If $scope.newMember was set to an empty object
		// {},
		// then invalid form values would not be reset.
		// By specifying all properties, input fields with invalid values are
		// also reset.
		$scope.bill = {
			customerName : "",
			phone : "",
			total : 0,
			billMedicines : [],
		};

		// clear messages
		$scope.clearMessages();
	};
	$scope.isPrint = true;
	$scope.saveBill = function(printSectionId) {
	
		$scope.bill.users = $localStorage.loggedInUser;
		
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		
		Bill.save($scope.bill, function(data) {
			
			$scope.bill.id = data.id;
			$scope.isPrint = false;
			// mark success on the registration form
			$scope.successMessages = [ 'Bill added successfully' ];
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

	$scope.update = function() {
		$scope.bill.users = $localStorage.loggedInUser;
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		Bill.update($scope.bill, function(data) {
			$scope.reset();
			// mark success on the registration form
			$scope.successMessages = [ 'Bill updated successfully' ];
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

	$scope.backToBillInventory = function() {
		$location.path("/bills");
	};
	
	function _buildbillMedicine(medicine, purchasedUnits) {
        return {
            bill: $scope.bill,
            medicine:medicine,
            units:purchasedUnits
        };
    }
	$scope.totalUnits = 0;
	var purchasedUnits = 0;

	$scope.addMedicine = function() {
		
		if($scope.medicine2Add.units){
			$scope.billForm.units.$setValidity("validUnits",$scope.medicine2Add.units<=$scope.totalUnits);
			if($scope.medicine2Add.units>$scope.totalUnits){
				return;
			}
		}
		
		//place validation here
		purchasedUnits = $scope.medicine2Add.units;
		$scope.medicine2Add.units = $scope.totalUnits - $scope.medicine2Add.units;
		$scope.bill.billMedicines.push(angular.copy(_buildbillMedicine($scope.medicine2Add,purchasedUnits)));
		$scope.bill.total = $scope.bill.total +(purchasedUnits * $scope.medicine2Add.price);
		console.log($scope.bill.total);
		$scope.medicine2Add = {
			name : "",
			company : "",
			units : ""
		};

	}
	$scope.modifyMedicine = function(index) {
		$scope.medicine2Add = $scope.bill.billMedicines[index];
		$scope.bill.total = $scope.bill.total -($scope.medicine2Add.units * $scope.medicine2Add.medicine.price);
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();		
		Medicine.get({
			medicineId : $scope.medicine2Add.medicine.id
		}, function(data) {

			$scope.medicine2Add = data;
			$scope.totalUnits = $scope.medicine2Add.units;
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
		$scope.bill.billMedicines.splice(index, 1);

	}
	$scope.removeMedicine = function(index) {
		$scope.medicine2Add = $scope.bill.billMedicines[index];
		$scope.bill.total = $scope.bill.total - ($scope.medicine2Add.units * $scope.medicine2Add.medicine.price);
		$scope.bill.billMedicines.splice(index, 1);
	}

	$scope.medicines = Medicine.query();
	$scope.data = "";

	$scope.onItemSelected = function() {
		$scope.medicine2Add = $scope.data;
		$scope.totalUnits = $scope.medicine2Add.units;
		$scope.data = "";
	}

	$scope.reset();
	$scope.isUpdate = false;

	$scope.print = function() {
		var innerContents = document.getElementById('printSectionId').innerHTML;
		var popupWinindow = window
				.open(
						'',
						'_blank',
						'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
		popupWinindow.document.open();
		popupWinindow.document
				.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">'
						+ innerContents + '</html>');
		popupWinindow.document.close();
		$scope.reset();
	};
}

function UpdateBillCtrl($scope, $http, $localStorage, $location, Bill, Medicine,  checkCreds, deleteCreds, getToken, Flash) {

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.currDate = new Date();

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
		if ($scope.billForm) {
			$scope.billForm.$setPristine();
		}
		// Clear input fields. If $scope.newMember was set to an empty object
		// {},
		// then invalid form values would not be reset.
		// By specifying all properties, input fields with invalid values are
		// also reset.
		$scope.bill = $localStorage.bill;

		// clear messages
		$scope.clearMessages();
	};

	$scope.updateBill = function() {
		$scope.bill.users = $localStorage.loggedInUser;
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		Bill.update($scope.bill, function(data) {
			// mark success on the registration form
			$scope.successMessages = [ 'Bill updated successfully' ];
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

	$scope.backToBillInventory = function() {
		$location.path("/bills");
	};
	
	function _buildbillMedicine(medicine, purchasedUnits) {
        return {
            bill: $scope.bill,
            medicine:medicine,
            units:purchasedUnits
        };
    }

	$scope.totalUnits = 0;
	var purchasedUnits = 0;

	$scope.addMedicine = function() {
		
		if($scope.medicine2Add.units){
			$scope.billForm.units.$setValidity("validUnits",$scope.medicine2Add.units<=$scope.totalUnits);
			if($scope.medicine2Add.units>$scope.totalUnits){
				return;
			}
		}
		purchasedUnits = $scope.medicine2Add.units;
		$scope.medicine2Add.units = $scope.totalUnits - $scope.medicine2Add.units;
		$scope.bill.billMedicines.push(angular.copy(_buildbillMedicine($scope.medicine2Add,purchasedUnits)));
		$scope.bill.total = $scope.bill.total +(purchasedUnits * $scope.medicine2Add.price);
		$scope.medicine2Add = {
			name : "",
			company : "",
			units : ""
		};

	}
	
	$scope.modifyMedicine = function(index) {
		$scope.medicine2Add = $scope.bill.billMedicines[index];
		$scope.bill.total = $scope.bill.total -($scope.medicine2Add.units * $scope.medicine2Add.medicine.price);
		$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
		Medicine.get({
			medicineId : $scope.medicine2Add.medicine.id
		}, function(data) {

			$scope.medicine2Add = data;
			$scope.totalUnits = $scope.medicine2Add.units;

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.successMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
		
		$scope.bill.billMedicines.splice(index, 1);

	}

	$scope.removeMedicine = function(index) {
		$scope.medicine2Add = $scope.bill.billMedicines[index];
		$scope.bill.total = $scope.bill.total -($scope.medicine2Add.units * $scope.medicine2Add.medicine.price);
		$scope.bill.billMedicines.splice(index, 1);
	}

	$scope.medicines = Medicine.query();
	$scope.data = "";

	$scope.onItemSelected = function() {
		$scope.medicine2Add = $scope.data;
		$scope.totalUnits = $scope.medicine2Add.units;
		$scope.data = "";
	}

	$scope.reset();
	$scope.isUpdate = true;

	$scope.print = function() {
		var innerContents = document.getElementById('printSectionId').innerHTML;
		var popupWinindow = window
				.open(
						'',
						'_blank',
						'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
		popupWinindow.document.open();
		popupWinindow.document
				.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">'
						+ innerContents + '</html>');
		popupWinindow.document.close();
	};

	delete $localStorage.bill;
}