(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.controller('RegistroController', RegistroController);

	RegistroController.$inject = ['$log', '$scope'];

	function RegistroController($log, $scope) {
		var vm = this;

		$scope.campo = {};

		vm.complejo = {};

		vm.submit = submit;

		vm.complejo.latitud = null;

		vm.complejo.longitud = null;

		function submit(complejo) {
			$log.debug(complejo);
			$log.debug(campo.imagen);
		}
	}
})();