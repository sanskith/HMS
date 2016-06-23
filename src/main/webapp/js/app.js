// Define any routes for the app
// Note that this app is a single page app, and each partial is routed to using the URL fragment. For example, to select the 'home' route, the URL is http://localhost:8080/jboss-as-kitchensink-angularjs/#/home
var nhms = angular
		.module(
				'nhms',
				[ 'ngRoute', 'loginService', 'ngStorage', 'medicineService', 'transactionsService',
						'datatables', 'billService', 'userService',/*'billMedicineService'*/,
						'autofocus', /*'setCredService', 'checkCredService',*/
						'deleteCredService'/*, 'getTokenService'*/, 'ceilFilters',
						'wordsFilters', 'flash', 'ngAnimate','chart.js','ui.bootstrap'])
		.config(
				[
						'$httpProvider',
						'$routeProvider',
						'$locationProvider',
						'$localStorageProvider',
						'ChartJsProvider',
						function($httpProvider, $routeProvider,
								$locationProvider, $localStorageProvider,ChartJsProvider) {
							/*
							 * Use a HTTP interceptor to add a nonce to every
							 * request to prevent MSIE from caching responses.
							 */
						/*	$httpProvider.interceptors
									.push('ajaxNonceInterceptor');*/
							
							 // Configure all charts
						    ChartJsProvider.setOptions({
						      colours: ['#46BFBD'],
						      responsive: false
						    });
						    // Configure all line charts
						    ChartJsProvider.setOptions('Line', {
						      datasetFill: false
						    });

							$routeProvider.
							when('/home', {
								templateUrl : 'partials/home.html',
								controller : IdentityCtrl
							}).when('/inventory', {
								templateUrl : 'partials/medicine-list.html',
								controller : InventoryCtrl
							}).when('/addMedicine', {
								templateUrl : 'partials/add-medicine.html',
								controller : AddMediceCtrl
							}).when('/updateMedicine', {
								templateUrl : 'partials/update-medicine.html',
								controller : UpdateCtrl
							}).when('/bills', {
								templateUrl : 'partials/bill-list.html',
								controller : BillInventoryCntrl
							}).when('/newBill', {
								templateUrl : 'partials/add-bill.html',
								controller : AddBillCtrl
							}).when('/updateBill', {
								templateUrl : 'partials/update-bill.html',
								controller : UpdateBillCtrl
							}).when('/users', {
								templateUrl : 'partials/user-list.html',
								controller : UsersCtrl
							}).when('/newUser', {
								templateUrl : 'partials/add-user.html',
								controller : AddUserCtrl
							}).when('/updateUser', {
								templateUrl : 'partials/update-user.html',
								controller : UpdateUserCtrl
							}).when('/chart', {
								templateUrl : 'partials/chart.html',
								controller : ChartCtrl
							}).when('/signUp', {
								templateUrl : 'partials/sign-up.html',
								controller : SignUpCtrl
							}).when('/forgotPassword', {
								templateUrl : 'partials/forgot-password.html',
								controller : passwordCntrl
							}).when('/reset', {
								templateUrl : 'partials/reset-password.html',
								controller : resetPasswordCntrl
							}).when('/transactions', {
								templateUrl : 'partials/transactions.html',
								controller : transactionCntrl
							}).otherwise({
								redirectTo : '/home'
							});
						} ]);
		/*.factory(
				'ajaxNonceInterceptor',
				function() {
					// This interceptor is equivalent to the behavior induced by
					// $.ajaxSetup({cache:false});

					var param_start = /\?/;

					return {

						request : function(config) {
							if (config.method == 'GET') {
								// Add a query parameter named '_' to the URL,
								// with a value equal to the current timestamp
								config.url += (param_start.test(config.url) ? "&"
										: "?")
										+ '_=' + new Date().getTime();
							}
							return config;
						}
					}
				});*/

nhms.directive('typeahead', function($timeout) {
	return {
		restrict : 'AEC',
		scope : {
			items : '=',
			prompt : '@',
			title : '@',
			subtitle : '@',
			model : '=',
			onSelect : '&'
		},
		link : function(scope, elem, attrs) {
			scope.handleSelection = function(selectedItem) {
				scope.model = selectedItem;
				scope.current = 0;
				scope.selected = true;
				$timeout(function() {
					scope.onSelect();
				}, 200);
			};
			scope.current = 0;
			scope.selected = true;
			scope.isCurrent = function(index) {
				return scope.current == index;
			};
			scope.setCurrent = function(index) {
				scope.current = index;
			};
		},
		templateUrl : 'partials/templateurl.html'
	}
});

nhms.directive('pwCheck', [ function() {
	return {
		require : 'ngModel',
		link : function(scope, elem, attrs, ctrl) {
			var firstPassword = '#' + attrs.pwCheck;
			elem.add(firstPassword).on(
					'keyup',
					function() {
						scope.$apply(function() {
							// console.info(elem.val() ===
							// $(firstPassword).val());
							ctrl.$setValidity('pwmatch', elem.val() === $(
									firstPassword).val());
						});
					});
		}
	}
} ]);

nhms.directive('ngReallyClick', [ function() {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			element.bind('click', function() {
				var message = attrs.ngReallyMessage;
				if (message && confirm(message)) {
					scope.$apply(attrs.ngReallyClick);
				}
			});
		}
	}
} ]);

angular.module('ceilFilters', []).filter('ceil', function() {
	return function(input) {
		return Math.ceil(input);
	};
});

angular.module('wordsFilters', []).filter('words', function() {
	function isInteger(x) {
		return x % 1 === 0;
	}

	return function(value) {
		if (value && isInteger(value))
			return toWords(value);

		return value;
	};

});

var th = [ '', 'Thousand', 'Million', 'Billion', 'Trillion' ];
var dg = [ 'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
		'Eight', 'Nine' ];
var tn = [ 'Ten', 'Eleven', 'Telve', 'Thirteen', 'Fourteen', 'Fifteen',
		'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen' ];
var tw = [ 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty',
		'Ninety' ];

function toWords(s) {
	s = Math.ceil(s);
	s = s.toString();
	s = s.replace(/[\, ]/g, '');
	if (s != parseFloat(s))
		return 'not a number';
	var x = s.indexOf('.');
	if (x == -1)
		x = s.length;
	if (x > 15)
		return 'too big';
	var n = s.split('');
	var str = '';
	var sk = 0;
	for (var i = 0; i < x; i++) {
		if ((x - i) % 3 == 2) {
			if (n[i] == '1') {
				str += tn[Number(n[i + 1])] + ' ';
				i++;
				sk = 1;
			} else if (n[i] != 0) {
				str += tw[n[i] - 2] + ' ';
				sk = 1;
			}
		} else if (n[i] != 0) {
			str += dg[n[i]] + ' ';
			if ((x - i) % 3 == 0){
				if(n[1] == 0 && n[2] == 0)
				str += 'Hundred';
				else
					str += 'Hundred and ';
			}
				
			sk = 1;
		}

		if ((x - i) % 3 == 1) {
			if (sk)
				str += th[(x - i - 1) / 3] + ' ';
			sk = 0;
		}
	}
	if (x != s.length) {
		var y = s.length;
		str += 'point ';
		for (var i = x + 1; i < y; i++)
			str += dg[n[i]] + ' ';
	}
	return str.replace(/\s+/g, ' ');
}

window.toWords = toWords;
