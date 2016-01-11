angular
	.module('complejo.cliente')
	.controller('ClienteLayoutController',  ClienteLayoutController);

ClienteLayoutController.$inject = ['funciones', 'autorizacionService', '$log', '$state', '$scope'];

function ClienteLayoutController(funciones, autorizacionService, $log, $state,$scope) {
	var vm = this;

	vm.funciones = funciones;

	vm.usuario = autorizacionService.getUsuarioActual();

	vm.logout = logout;

	function logout () {
		autorizacionService.logout();
		$log.debug('ClienteLayoutController : logout user');
		$state.go('app.visitante.inicio');
	}
}