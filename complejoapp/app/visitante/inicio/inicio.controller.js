(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.controller('InicioController', InicioController);

	InicioController.$inject = ['$log', '$scope', 'complejos'];

	function InicioController($log, $scope, complejos) {
		var vm = this;
		
		vm.complejos = complejos;
	}

})();