angular
	.module('complejo.admin')
	.controller('AdminLayoutController', AdminLayoutController);

AdminLayoutController.$inject = ['$scope', '$log', 'autorizacionService', '$state', 'complejoService'];

function AdminLayoutController($scope, $log, autorizacionService, $state, complejoService) {
	$log.debug("AdminLayoutController : inicializado");
	
	$scope.usuario = autorizacionService.getUsuarioActual();

	$scope.cerrarSesion = cerrarSesion;

	function cerrarSesion() {
		autorizacionService.logout();
		$log.debug('AdminLayoutController : logout user');
		$state.go('app.visitante.inicio');
	}
}