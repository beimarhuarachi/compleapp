angular
	.module('complejo.admin')
	.controller('RegistroCampoController', RegistroCampoController);

RegistroCampoController.$inject = ['$scope', '$log', '$state'];

function RegistroCampoController($scope, $log, $state) {
	$log.info("RegistroCampoController : inicio de controlador");
	
	$scope.nombrecomplejo = "San Simon";
	$scope.datospagina = $state.current.data;
}