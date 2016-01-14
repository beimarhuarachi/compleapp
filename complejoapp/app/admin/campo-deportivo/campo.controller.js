angular
	.module('complejo.admin')
	.controller('CampoController', CampoController);

CampoController.$inject = ['$log', 'campoService', '$scope', '$state'];

function CampoController($log, campoService, $scope, $state) {
	var vm = this;

	vm.datospagina = $state.current.data;

	vm.campos = [];

	

	campoService.get({com : $scope.complejo.idcomplejo}, function(res) {
		vm.campos = res.response;
		//$log.debug(vm.campos);
	});	
}