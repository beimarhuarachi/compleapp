angular
	.module('complejo.admin')
	.controller('RegistroClienteController', RegistroClienteController);

RegistroClienteController.$inject = ['$state', 'autorizacionService', 'complejoService', 
									'$log', 'clienteService', 'Notification', '$scope'];

function RegistroClienteController($state, autorizacionService, complejoService, 
								$log, clienteService, Notification, $scope) {
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
		cliente.idcomplejo = vm.complejo.idcomplejo;

		//$log.debug(cliente);

		clienteService.save({}, {cliente: cliente})
			.$promise
			.then(function(res) {
				//$log.debug(res.response);
				vm.cliente = {};
				$scope.clienteform.$setPristine();

				Notification.success({title: "Registro de Cliente", message : "Se ha registrado el al cliente Correctamente"});
			}, function(res) {
				$log.debug(res);
				Notification.error({title: "Error : Registro de Cliente", message : res.data.response});
			});
	}
}
