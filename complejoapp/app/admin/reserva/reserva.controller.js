angular
	.module('complejo.admin')
	.controller('ReservaController', ReservaController);

ReservaController.$inject = ['$scope', '$log', 'reservaService', 'complejoService', 
							 '$state', 'autorizacionService', 'campoService'];

function ReservaController($scope, $log, reservaService, complejoService, $state, autorizacionService, campoService) {
	$log.debug('ReservaController : inicializado');

	$scope.campoSeleccionado = {};
	$scope.reservas = [];
	$scope.campos = [];
	$scope.mostrar = false;
	$scope.datospagina = $state.current.data;

	$scope.actualizarReservas = actualizarReservas;

	$scope.complejo = {};

	$scope.$on('semanaAnterior', function(event, data) {
		$log.debug(data);
	});

	$scope.$on('semanaActual', function(event, data) {
		$log.debug(data);
	});

	$scope.$on('semanaSiguiente', function(event, data) {
		$log.debug(data);
	});
	
	//peticion del nombre del complejo, mediante id del usuario
	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		$scope.nombre = res.response.nombre;
		$scope.complejo = res.response;
	}).$promise.then(function(res) {
		//$log.debug(res);
		return campoService.get({com : $scope.complejo.idcomplejo}, function(res) {
			$scope.campos = res.response;
		}).$promise;
	}, function(error) {
		$log.debug(error);
	}).then(function(res) {
		//$log.debug(res);
	}, function(error) {
		$log.debug(error);
	});

	

	function actualizarReservas (campo) {
		//$log.debug(campo);
		$scope.mostrar = false;

		$scope.campoSeleccionado = campo;
		var inicio = moment().startOf("isoweek").format('YYYY-MM-DD HH:mm:ss');
		var fin = moment().endOf("isoweek").format('YYYY-MM-DD HH:mm:ss');

		reservaService.get({id : campo.idcampo, inicio: inicio, fin: fin} ,function(res) {
			//$log.debug(res.response);
			$scope.reservas = [];
			for (var i = 0; i < res.response.length; i++) {
				var evento = {
						id : res.response[i].id,
						title : res.response[i].nombretipo,
						start : res.response[i].inicio,
						end : res.response[i].fin,
						backgroundColor: '#34B5A7',
						textColor : '#FFF'
				}

				$scope.reservas.push(evento);
			}; 

			$scope.mostrar = !$scope.mostrar;
		});
	}
}