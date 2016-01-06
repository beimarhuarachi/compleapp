angular
	.module('complejo.admin')
	.controller('AdminLayoutController', AdminLayoutController);

AdminLayoutController.$inject = ['$scope', '$log', 'autorizacionService', '$state', 'complejoService', 'complejo'];

function AdminLayoutController($scope, $log, autorizacionService, $state, complejoService, complejo) {
	$log.debug("AdminLayoutController : inicializado");
	
	$scope.usuario = autorizacionService.getUsuarioActual();

	$scope.complejo = complejo;

	$scope.cerrarSesion = cerrarSesion;

	function cerrarSesion() {
		autorizacionService.logout();
		$log.debug('AdminLayoutController : logout user');
		$state.go('app.visitante.inicio');
	}
}