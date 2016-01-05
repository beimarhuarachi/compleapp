angular
	.module('complejo.admin')
	.controller('ReservaController', ReservaController);

ReservaController.$inject = ['$scope', '$log', 'reservaService', 'complejoService', 
							 '$state', 'autorizacionService', 'clienteService', '$filter'];

function ReservaController($scope, $log, reservaService, complejoService, $state, 
							autorizacionService, clienteService, $filter) {
	$log.debug('ReservaController : inicializado');
	$scope.datospagina = $state.current.data;

	//Datos que necesita la directiva del calendario
	$scope.complejo = {};
	$scope.listo = false;
	
	$scope.$on('clickCelda', function(event, data) {
		$log.debug(data);
		$scope.horaFin = $filter('horaFilter')(data.fechasValidas[0]);
		$scope.horasValidas = data.fechasValidas;
		$scope.campo = data.campo;
		$scope.inicio = $filter('horaFilter')(data.inicio);
		
		$scope.fecha = moment(data.inicio).format("dddd, DD MMM");
		
		$scope.listo = !$scope.listo;
		$scope.$apply();
	});

	$scope.$on('clickReserva', function(event, data) {
		$log.debug(data);
	});

	$scope.clienteSeleccionado = undefined;
	$scope.clientes = [{nombre: "Alejandra", apellido : "Hua"},{nombre: "Beimar", apellido : "Huarachi"},
	{nombre: "Enrique", apellido : "antezana"}];

	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		$scope.nombre = res.response.nombre;
		$scope.complejo = res.response;
		$scope.listo = true;
	}).$promise.then(function(res) {
		//$log.debug(res);
		return clienteService.get(function(res) {
			$log.debug(res.response);
			$scope.clientes = res.response;
		}).$promise;
	}, function(error) {
		$log.debug(error);
	}).then(function(res) {
		//$log.debug(res);
	}, function(error) {
		$log.debug(error);
	});
}