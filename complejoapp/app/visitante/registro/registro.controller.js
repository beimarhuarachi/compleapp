(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.controller('RegistroController', RegistroController);

	RegistroController.$inject = ['$log', '$scope'];

	function RegistroController($log, $scope) {
		var vm = this;
	}
})();