function BillInventoryCntrl($scope, $http, $localStorage, $location, Bill, /*checkCreds, getToken,*/ deleteCreds,Flash,
		DTOptionsBuilder, DTColumnDefBuilder) {
	
	if ( /*!checkCreds()*/ $localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType(
			'full_numbers').withOption('aaSorting', [[0, 'desc']]);;

	$scope.dtColumnDefs = [ DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5).notSortable() ];

	$scope.logout = function() {
		deleteCreds();
		$location.path("/home");
	};
	
	$scope.clearMessages = function() {
		$scope.successMessages = '';
		$scope.errorMessages = '';
		$scope.errors = {};
	};

	$scope.refresh = function() {
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		$scope.bills = Bill.query();
		$scope.clearMessages();
	};

	$scope.currDate = new Date();

	$scope.modifyBill = function(bill) {
		$localStorage.$default({
			'bill' : bill
		});
		$location.path("/updateBill");
	};

	$scope.removeBill = function(bill) {
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		var index = $scope.bills.indexOf(bill);
		Bill.remove({
			billId : index
		}, function(data) {
			$scope.bills.splice(index, 1);
			$scope.successMessages = [ 'Bill deleted successfully' ];
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
	//$scope.orderBy = 'id';

}

function AddBillCtrl($scope, $http, $localStorage, $location, Bill, Medicine, $timeout,  /*checkCreds,  getToken,*/deleteCreds, Flash) {
	
	if ( /*!checkCreds()*/ $localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.currDate = new Date();

	$scope.logout = function() {
		deleteCreds();
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
		
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		
		console.log($scope.bill);
		
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
				Flash.create('danger', $scope.errorMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
	};

	$scope.update = function() {
		$scope.bill.users = $localStorage.loggedInUser;
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
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
				Flash.create('danger', $scope.errorMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
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
	
	function roundToTwo(num) {
		return +(Math.round(num + "e+2") + "e-2");
	}

	$scope.addMedicine = function() {
		
		//validation for available Units
		if($scope.medicine2Add.totalTablets){
			$scope.billForm.units.$setValidity("validUnits",$scope.medicine2Add.totalTablets<=$scope.totalUnits);
			if($scope.medicine2Add.totalTablets>$scope.totalUnits){
				return;
			}
		}
		
		
		purchasedUnits = $scope.medicine2Add.totalTablets;
		$scope.medicine2Add.totalTablets = $scope.totalUnits - $scope.medicine2Add.totalTablets;
		$scope.bill.billMedicines.push(angular.copy(_buildbillMedicine($scope.medicine2Add,purchasedUnits)));
		$scope.bill.total = roundToTwo($scope.bill.total +(purchasedUnits * $scope.medicine2Add.tabletPrice));
		console.log($scope.bill.total);
		$scope.medicine2Add = {
			name : "",
			company : "",
			totalTablets : ""
		};

	}
	
	$scope.modifyMedicine = function(index) {
		$scope.medicine2Add = $scope.bill.billMedicines[index];
		$scope.bill.total = roundToTwo($scope.bill.total -($scope.medicine2Add.units * $scope.medicine2Add.medicine.tabletPrice));
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();	*/	
		Medicine.get({
			medicineId : $scope.medicine2Add.medicine.id
		}, function(data) {

			$scope.medicine2Add = data;
			$scope.totalUnits = $scope.medicine2Add.totalTablets;
			
		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
		$scope.bill.billMedicines.splice(index, 1);

	}
	$scope.removeMedicine = function(index) {
		$scope.medicine2Add = $scope.bill.billMedicines[index];
		$scope.bill.total = roundToTwo($scope.bill.total - ($scope.medicine2Add.units * $scope.medicine2Add.medicine.tabletPrice));
		$scope.bill.billMedicines.splice(index, 1);
	}

	$scope.medicines = Medicine.query();
	$scope.data = "";

	$scope.onItemSelected = function() {
		$scope.medicine2Add = $scope.data;
		$scope.totalUnits = $scope.medicine2Add.totalTablets;
		$scope.data = "";
	}

	$scope.reset();

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

function UpdateBillCtrl($scope, $http, $localStorage, $location, Bill, Medicine, /* checkCreds, getToken,*/deleteCreds, Flash) {
	
	if ( /*!checkCreds()*/ $localStorage.loggedInUser === undefined
			|| $localStorage.loggedInUser === "") {
		$location.path("/home");
	}

	$scope.loggedInUser = $localStorage.loggedInUser;
	$scope.currDate = new Date();

	$scope.logout = function() {
		deleteCreds();
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
	/*	$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		Bill.update($scope.bill, function(data) {
			// mark success on the registration form
			$scope.successMessages = [ 'Bill updated successfully' ];
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
	
	function roundToTwo(num) {
		return +(Math.round(num + "e+2") + "e-2");
	}

	$scope.addMedicine = function() {
		
		if($scope.medicine2Add.totalTablets){
			$scope.billForm.units.$setValidity("validUnits",$scope.medicine2Add.totalTablets<=$scope.totalUnits);
			if($scope.medicine2Add.totalTablets>$scope.totalUnits){
				return;
			}
		}
		
		purchasedUnits = $scope.medicine2Add.totalTablets;
		$scope.medicine2Add.totalTablets = $scope.totalUnits - $scope.medicine2Add.totalTablets;
		$scope.bill.billMedicines.push(angular.copy(_buildbillMedicine($scope.medicine2Add,purchasedUnits)));
		$scope.bill.total = roundToTwo($scope.bill.total +(purchasedUnits * $scope.medicine2Add.tabletPrice));
		console.log($scope.bill.total);
		$scope.medicine2Add = {
			name : "",
			company : "",
			totalTablets : ""
		};
		
	}
	
	$scope.modifyMedicine = function(index) {
		$scope.medicine2Add = $scope.bill.billMedicines[index];
		$scope.bill.total = roundToTwo($scope.bill.total -($scope.medicine2Add.units * $scope.medicine2Add.medicine.tabletPrice));
		
		/*$http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();*/
		Medicine.get({
			medicineId : $scope.medicine2Add.medicine.id
		}, function(data) {

			$scope.medicine2Add = data;
			$scope.totalUnits = $scope.medicine2Add.totalTablets;

		}, function(result) {
			if ((result.status == 409) || (result.status == 400)) {
				$scope.errors = result.data;
			} else {
				$scope.errorMessages = [ 'Unknown server error' ];
				Flash.create('danger', $scope.errorMessages, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		});
		
		$scope.bill.billMedicines.splice(index, 1);

	}

	$scope.removeMedicine = function(index) {
		
		$scope.medicine2Add = $scope.bill.billMedicines[index];
		$scope.bill.total = roundToTwo($scope.bill.total - ($scope.medicine2Add.units * $scope.medicine2Add.medicine.tabletPrice));
		$scope.bill.billMedicines.splice(index, 1);
	}

	$scope.medicines = Medicine.query();
	$scope.data = "";

	$scope.onItemSelected = function() {
		$scope.medicine2Add = $scope.data;
		$scope.totalUnits = $scope.medicine2Add.totalTablets;
		$scope.data = "";
	}

	$scope.reset();

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