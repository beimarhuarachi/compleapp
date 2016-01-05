angular
	.module('complejo.admin')
	.controller('RegistroClienteController', RegistroClienteController);

RegistroClienteController.$inject = ['$state', 'autorizacionService', 'complejoService', '$log'];

function RegistroClienteController($state, autorizacionService, complejoService, $log) {
	var vm = this;

	/**
	 * Nuevo Cliente
	 * @type {Object}
	 */	
	vm.cliente = {};

	vm.datospagina = $state.current.data;

	vm.submit = submit;

	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		vm.complejo = res.response;
	}, function(error) {
		$log.error("RegistroCampoController : complejo service error");
	});

	/**
	 * Funcion que envia la peticion para registro
	 * @param  {Object} cliente nuevvo cliente
	 * @return {void}         No retorna nada
	 */
	function submit(cliente) {
		$log.debug(cliente);
	}
}
