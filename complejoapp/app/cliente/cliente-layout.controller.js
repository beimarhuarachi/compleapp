angular
	.module('complejo.cliente')
	.controller('ClienteLayoutController',  ClienteLayoutController);

ClienteLayoutController.$inject = ['funciones', 'autorizacionService', '$log', ];

function ClienteLayoutController(funciones, autorizacionService, $log) {
	var vm = this;

	vm.funciones = funciones;

	vm.usuario = autorizacionService.getUsuarioActual();
}