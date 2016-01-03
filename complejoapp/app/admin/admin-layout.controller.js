angular
	.module('complejo.admin')
	.controller('AdminLayoutController', AdminLayoutController);

AdminLayoutController.$inject = ['$scope', '$log', 'autorizacionService', '$state', 'complejoService'];

function AdminLayoutController($scope, $log, autorizacionService, $state, complejoService) {
	$log.debug("AdminLayoutController : inicializado");
	
	$scope.usuario = autorizacionService.getUsuarioActual();

	$scope.complejo = {};

	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		//$log.debug("Layout comtroller complejo service call : " + res.response.nombre);
		$scope.complejo = res.response;
	});

	$scope.cerrarSesion = cerrarSesion;

	function cerrarSesion() {
		autorizacionService.logout();
		$log.debug('AdminLayoutController : logout user');
		$state.go('app.visitante.inicio');
	}
}