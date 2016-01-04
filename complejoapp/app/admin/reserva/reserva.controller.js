angular
	.module('complejo.admin')
	.controller('ReservaController', ReservaController);

ReservaController.$inject = ['$scope', '$log', 'reservaService', 'complejoService', 
							 '$state', 'autorizacionService', 'campoService'];

function ReservaController($scope, $log, reservaService, complejoService, $state, autorizacionService, campoService) {
	$log.debug('ReservaController : inicializado');

	$scope.datospagina = $state.current.data;

	//Datos que necesita la directiva del calendario
	$scope.complejo = {};
	$scope.listo = false;
	
	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		$scope.nombre = res.response.nombre;
		$scope.complejo = res.response;
		$scope.listo = true;
	}).$promise.then(function(res) {
		//$log.debug(res);
		return campoService.get({com : $scope.complejo.idcomplejo}, function(res) {
			//$scope.campos = res.response;
		}).$promise;
	}, function(error) {
		$log.debug(error);
	}).then(function(res) {
		//$log.debug(res);
	}, function(error) {
		$log.debug(error);
	});
}