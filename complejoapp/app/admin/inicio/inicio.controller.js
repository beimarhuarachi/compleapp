(function() {
	'use strict';

	angular
		.module('complejo.admin')
		.controller('InicioControllerAdmin', InicioController);

	InicioController.$inject = ['$scope', '$log', '$state'];

	function InicioController($scope, $log, $state) {
		var vm = this;

		vm.complejo = $scope.complejo;

		vm.datospagina = $state.current.data;

		//$log.debug(vm.complejo);
	}
	
})();