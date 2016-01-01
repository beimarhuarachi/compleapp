angular
	.module('complejo.admin')
	.controller('ReservaController', ReservaController);

ReservaController.$inject = ['$scope', '$log', 'reservaService', 'complejoService', 
							 '$state', 'autorizacionService'];

function ReservaController($scope, $log, reservaService, complejoService, $state, autorizacionService) {
	$log.debug('ReservaController : inicializado');

	//datos para directiva de cabecera
	$scope.nombre = "fdsaf";
	$scope.datospagina = $state.current.data;

	//peticion del nombre del complejo, mediante id del usuario
	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		$scope.nombre = res.response.nombre;
	});
}