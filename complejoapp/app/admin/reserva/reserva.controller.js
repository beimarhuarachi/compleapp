angular
	.module('complejo.admin')
	.controller('ReservaController', ReservaController);

ReservaController.$inject = ['$scope', '$log', 'reservaService', 'complejoService', 
							 '$state', 'autorizacionService'];

function ReservaController($scope, $log, reservaService, complejoService, $state, autorizacionService) {
	$log.debug('ReservaController : inicializado');

	$scope.reservas = [];
	$scope.mostrar = false;

	$scope.datospagina = $state.current.data;

	//peticion del nombre del complejo, mediante id del usuario
	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		$scope.nombre = res.response.nombre;
	});

	var inicio = moment().startOf("isoweek").format('YYYY-MM-DD HH:mm:ss');
	var fin = moment().endOf("isoweek").format('YYYY-MM-DD HH:mm:ss');

	reservaService.get({id : 1, inicio: inicio, fin: fin} ,function(res) {
		$log.debug(res.response);
		for (var i = 0; i < res.response.length; i++) {
			var evento = {
					id : res.response[i].id,
					title : res.response[i].nombretipo,
					start : res.response[i].inicio,
					end : res.response[i].fin,
					backgroundColor: '#12CA6B',
					textColor : '#FFF'
			}

			$scope.reservas.push(evento);
		}; 

		$scope.mostrar = !$scope.mostrar;
	});
}