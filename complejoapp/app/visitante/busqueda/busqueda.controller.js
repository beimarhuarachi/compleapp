(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.controller('BusquedaController', BusquedaController);

	BusquedaController.$inject = ['$log', '$scope', 'busquedaService'];

	function BusquedaController($log, $scope, busquedaService) {
		var vm = this;

		vm.busqueda = 'complejo';

		vm.textobusqueda = null;

		vm.resultados = [];

		vm.onchange = onchange;

		vm.buscar = buscar;

		function onchange() {
			$log.debug(vm.busqueda);		
		}

		function buscar(textobusqueda) {
			//$log.debug(textobusqueda+ vm.busqueda);
			busquedaService.buscar(textobusqueda, vm.busqueda)
				.then(function(res) {
					$log.debug(res.response);
				})
				.catch(function(error) {
					$log.debug(error.data.response);
				});
		}
	}
})();