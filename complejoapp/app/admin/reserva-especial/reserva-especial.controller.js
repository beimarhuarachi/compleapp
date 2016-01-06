angular
	.module('complejo.admin')
	.controller('ReservaEspecialController', ReservaEspecialController);

ReservaEspecialController.$inject = ['$log', '$state', '$scope'];

function ReservaEspecialController($log, $state, $scope) {
	$log.debug('ReservaEspecialController : inicializado');
	var vm = this;

	vm.complejo = $scope.complejo;
	vm.datospagina = $state.current.data;
}