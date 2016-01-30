(function() {
	'use strict';

	angular
		.module('complejo.visitante')
		.controller('ComplejoController', ComplejoController);

	ComplejoController.$inject = ['$log', '$scope', 'complejo', 'campoService'];

	function ComplejoController($log, $scope, complejo, campoService) {
		var vm = this;
		vm.complejo = complejo;

		vm.campos = [];

		vm.listo = false;

		vm.disponibilidad = disponibilidad;

		function disponibilidad() {
			// $log.debug(vm.complejo);
			vm.listo = !vm.listo;
		}

		campoService.get({com : complejo.idcomplejo}, function(res) {
			vm.campos = res.response;
			//$log.debug(vm.campos);
		});	

		$log.debug(complejo);
	}
})();