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

		vm.complejos = [];

		vm.onchange = onchange;

		vm.buscar = buscar;

		function onchange() {
			$log.debug(vm.busqueda);		
		}

		function buscar(textobusqueda) {
			//$log.debug(textobusqueda+ vm.busqueda);
			busquedaService.buscar(textobusqueda, vm.busqueda)
				.then(function(res) {
					//$log.debug(res.response);
					var complejos = intercalar(res.response);
					vm.complejos = complejos;
				})
				.catch(function(error) {
					$log.debug(error.data.response);
				});
		}

		function intercalar(complejos) {
			var invertido = false;

			for (var i=0;i < complejos.length;i++) {
				if(invertido !== false) {
					complejos[i].invertido = true; 
					invertido = false;
				} else {
					invertido = true;
					
				}
			}

			return complejos;
		}
	}
})();