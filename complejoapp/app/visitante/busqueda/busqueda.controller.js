(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.controller('BusquedaController', BusquedaController);

	BusquedaController.$inject = ['$log', '$scope'];

	function BusquedaController($log, $scope) {
		var vm = this;

		vm.busqueda = 'complejo';

		vm.onchange = onchange;

		function onchange() {
			$log.debug(vm.busqueda);		
		}
	}
})();