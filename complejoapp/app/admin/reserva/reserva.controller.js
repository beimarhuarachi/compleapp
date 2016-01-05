angular
	.module('complejo.admin')
	.controller('ReservaController', ReservaController);

ReservaController.$inject = ['$scope', '$log', 'reservaService', 'complejoService', 
							 '$state', 'autorizacionService', 'clienteService', '$filter', 'Notification'];

function ReservaController($scope, $log, reservaService, complejoService, $state, 
							autorizacionService, clienteService, $filter, Notification) {
	$log.debug('ReservaController : inicializado');
	$scope.datospagina = $state.current.data;

	//Datos que necesita la directiva del calendario
	$scope.complejo = {};
	$scope.listo = false;
	
	$scope.$on('clickCelda', function(event, data) {
		//$log.debug(data);

		$scope.horaFin = $filter('horaFilter')(data.fechasValidas[0]);
		$scope.horasValidas = data.fechasValidas;
		$scope.campo = data.campo;
		$scope.inicio = $filter('horaFilter')(data.inicio);
		
		$scope.fecha = moment(data.inicio).format("dddd, DD MMM");
		
		$scope.fechaReserva = data.inicio;

		$scope.listo = !$scope.listo;
		$scope.$apply();
	});

	$scope.$on('clickReserva', function(event, data) {
		$log.debug(data);
	});

	$scope.cancelar = cancelar;
	$scope.reservar = reservar;

	complejoService.query({id : autorizacionService.getIdUsuario()}, function(res) {
		//$log.debug(res.response);
		$scope.nombre = res.response.nombre;
		$scope.complejo = res.response;
		$scope.listo = true;
	}).$promise.then(function(res) {
		//$log.debug(res);
		return clienteService.get(function(res) {
			//$log.debug(res.response);
			$scope.clientes = res.response;
		}).$promise;
	}, function(error) {
		$log.debug(error);
	}).then(function(res) {
		//$log.debug(res);
	}, function(error) {
		$log.debug(error);
	});

	function cancelar() {
		$scope.listo = !$scope.listo;
	}

	function reservar(campo, clienteSeleccionado, horaFin) {
		if(!clienteSeleccionado) {
			return;
		}
		var precio = calcularPrecio($scope.inicio, horaFin, $scope.campo.precio);
		var textoFecha = moment($scope.fechaReserva).format('YYYY-MM-DD'); 
		var reserva = {
			fecha : moment().format('YYYY-MM-DD'),
			idcampo : $scope.campo.idcampo,
			idcliente : clienteSeleccionado.IdCliente,
			inicio : textoFecha + " " + $scope.inicio,
			fin : textoFecha + " " + horaFin,
			confirmado : 1,
			precio : precio,
			idtiporeserva : 1
		}

		reservaService.save({id: reserva.idcampo},{reserva : reserva}, function(res) {
			$log.debug(res.response);
			Notification.success({title: "Registro de Reserva", message : "Se ha registrado la Reserva Correctamente"});
			$scope.listo = !$scope.listo;
		}, function(error) {
			$log.error(error);
			Notification.error({title: "Registro de Reserva", message : "Ha ocurrido un error en el proceso"});
		});

	}

	function calcularPrecio(inicio, fin, precioHora) {
		var precioTotal = 0;
		inicio = "2016-02-02 " + inicio;
		fin = "2016-02-02 " + fin;

		while(moment(inicio).isBefore(fin)) {
			inicio = moment(inicio).add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
			precioTotal = precioTotal + parseInt(precioHora);
		}

		return precioTotal;
	}
}