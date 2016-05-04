(function() {
	'use strict';

	angular
		.module('complejo.cliente')
		.controller('InicioControllerCliente', InicioControllerCliente);

	InicioControllerCliente.$inject = ['$log', '$scope', 'complejos', '$state'];

	function InicioControllerCliente($log, $scope, complejos, $state) {
		var vm = this;

		vm.datospagina = $state.current.data;
		
		vm.complejos = complejos;
	}

})();