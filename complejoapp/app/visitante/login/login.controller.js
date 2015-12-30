angular
	.module('complejo.visitante')
	.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$log', '$state'];

function LoginController($scope, $log, $state) {
	$log.info("Hola este es el controlador de login");

	$scope.user = {};

	$scope.submitLogin = function(user) {
		//$log.debug(user);
		$state.go('app.admin.inicio');
	}
}