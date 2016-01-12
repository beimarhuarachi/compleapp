angular
	.module('complejo.admin')
	.controller('AdminLayoutController', AdminLayoutController);

AdminLayoutController.$inject = ['$scope', '$log', 'autorizacionService', 
				'$state', 'complejoService', 'complejo', 'funciones'];

function AdminLayoutController($scope, $log, autorizacionService, $state, 
			complejoService, complejo, funciones) {
	$log.debug("AdminLayoutController : inicializado");
	
	$scope.usuario = autorizacionService.getUsuarioActual();

	$scope.complejo = complejo;

	$scope.cerrarSesion = cerrarSesion;

	$scope.funciones = funciones;

	function cerrarSesion() {
		autorizacionService.logout();
		$log.debug('AdminLayoutController : logout user');
		$state.go('app.visitante.inicio');
	}
}