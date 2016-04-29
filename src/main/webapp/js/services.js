// Define the REST resource service, allowing us to interact with it as a high level service

/*angular.module('setCredService', [ 'ngCookies' ]).factory('setCreds',
		function($cookies) {
			return function(un, pw) {
				var token = un.concat(":", pw);
				$cookies.Creds = token;
				$cookies.Username = un;
			};
		});

angular.module('checkCredService', [ 'ngCookies' ]).factory('checkCreds',
		function($cookies) {
			return function() {
				var returnVal = false;
				var Creds = $cookies.Creds;
				if (Creds !== undefined && Creds !== "") {
					returnVal = true;
				}
				return returnVal;
			};
		});*/

angular.module('deleteCredService', [/* 'ngCookies',*/ 'ngStorage' ]).factory(
		'deleteCreds', function( $localStorage) {
			return function() {
			/*	$cookies.Creds = "";
				$cookies.Username = "";*/
				delete $localStorage.loggedInUser;
				delete $localStorage.medicine;
				delete $localStorage.bill;
				delete $localStorage.user;
			};
		});

/*angular.module('getTokenService', [ 'ngCookies' ]).factory('getToken',
		function($cookies) {
			return function() {
				var returnVal = "";
				var Creds = $cookies.Creds;
				if (Creds !== undefined && Creds !== "") {
					returnVal = btoa(Creds);
				}
				return returnVal;
			};
		});*/

angular.module('loginService', [ 'ngResource' ]).factory('Login',
		function($resource) {
			return $resource('rest/authenticate/:userId',null, {

				'get' : {
					method : 'GET'
				},
				'save' : {
					method : 'POST'
				},
				'query' : {
					method : 'GET',
					isArray : true
				},
				'remove' : {
					method : 'DELETE'
				},
				'delete' : {
					method : 'DELETE'
				},
				'update' : {
					method : 'PUT'
				}
			});
		});

angular.module('medicineService', [ 'ngResource' ]).factory('Medicine',
		function($resource) {
			return $resource('rest/medicines/:medicineId', null, {

				'get' : {
					method : 'GET'
				},
				'save' : {
					method : 'POST'
				},
				'query' : {
					method : 'GET',
					isArray : true
				},
				'remove' : {
					method : 'DELETE'
				},
				'delete' : {
					method : 'DELETE'
				},
				'update' : {
					method : 'PUT'
				}
			});
		});

angular.module('billService', [ 'ngResource' ]).factory('Bill',
		function($resource) {
			return $resource('rest/bills/:billId', null, {

				'get' : {
					method : 'GET'
				},
				'save' : {
					method : 'POST'
				},
				'query' : {
					method : 'GET',
					isArray : true
				},
				'remove' : {
					method : 'DELETE'
				},
				'delete' : {
					method : 'DELETE'
				},
				'update' : {
					method : 'PUT'
				}
			});
		});

angular.module('billMedicineService', [ 'ngResource' ]).factory('BillMedicine',
		function($resource) {
			return $resource('rest/bills/billMedicine/:billId', null, {

				'get' : {
					method : 'GET',
					isArray : true
				},
				'save' : {
					method : 'POST'
				},
				'query' : {
					method : 'GET',
					isArray : true
				},
				'remove' : {
					method : 'DELETE'
				},
				'delete' : {
					method : 'DELETE'
				},
				'update' : {
					method : 'PUT'
				}
			});
		});

angular.module('userService', [ 'ngResource' ]).factory('User',
		function($resource) {
			return $resource('rest/users/:userId', null, {

				'get' : {
					method : 'GET'
				},
				'save' : {
					method : 'POST'
				},
				'query' : {
					method : 'GET',
					isArray : true
				},
				'remove' : {
					method : 'DELETE'
				},
				'delete' : {
					method : 'DELETE'
				},
				'update' : {
					method : 'PUT'
				}
			});
		});
