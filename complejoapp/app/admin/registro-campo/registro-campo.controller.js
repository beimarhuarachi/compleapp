angular
	.module('complejo.admin')
	.controller('RegistroCampoController', RegistroCampoController);

RegistroCampoController.$inject = ['$scope', '$log', '$state', 'autorizacionService', 'complejoService'];

function RegistroCampoController($scope, $log, $state, autorizacionService, complejoService) {
	$log.info("RegistroCampoController : inicio de controlador");
	
	$scope.datospagina = $state.current.data;


	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		$scope.complejo = res.response;
	}, function(error) {
		$log.error("RegistroCampoController : complejo service error");
	});
}