angular
	.module('complejo.admin')
	.controller('PrereservaAdminController', PrereservaAdminController);

PrereservaAdminController.$inject = ['$log', '$state', '$scope', 'prereservas'];

function PrereservaAdminController($log, $state, $scope, prereservas) {
	var vm = this;

	vm.datospagina = $state.current.data;

	vm.prereserva = null;

	vm.prereservas = prereservas;

	vm.reset = reset;

	vm.submit = submit;

	function reset() {
		$log.debug("fdsa");
	}

	function submit(prereserva) {
		$log.debug(prereserva);
	}

}