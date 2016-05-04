angular
	.module('complejo.admin')
	.controller('ReservaEspecialController', ReservaEspecialController);

ReservaEspecialController.$inject = ['$log', '$state', '$scope', 'reservaEspecialService', '$filter', 'Notification'];

function ReservaEspecialController($log, $state, $scope, reservaEspecialService, $filter, Notification) {
	$log.debug('ReservaEspecialController : inicializado');
	var vm = this;

	/**
	 * Campos de VM
	 */
	vm.reservaEspecial = {};
	vm.reservaPeriodica = false;
	vm.veces = 1;
	vm.tipos = ['Diario', 'Semanal'];
	vm.tipoperiodico = vm.tipos[0];
	
	/**
	 * Datos para la directiva calendario
	 */
	vm.complejo = $scope.complejo;
	vm.listo = true;

	/**
	 * Datos para la directiva de cabecera
	 */
	vm.datospagina = $state.current.data;

	/**
	 * Funciones de VM
	 */
	vm.ocultarCalendario = ocultarCalendario;
	vm.registrarReservaEspecial = registrarReservaEspecial;
	vm.cancelar = cancelar;
	vm.cambioEstado = function() {
		vm.tipoperiodico = vm.tipos[0];
		vm.veces = 1;
	}

	/**
	 * Eventos de la directiva calendario
	 */
	$scope.$on('clickCelda', onclickCelda);
	$scope.$on('clickReserva', onclickReserva);

	/**
	 * Funcion para registrar reserva especial
	 */
	function registrarReservaEspecial(reservaEspecial) {
		//$log.debug(reservaEspecial);
		var texto = moment(reservaEspecial.inicio).format('YYYY-MM-DD');
		reservaEspecial.fin = moment(texto + " " + reservaEspecial.fin).format('YYYY-MM-DD HH:mm:ss');
		reservaEspecial.periodico = vm.tipoperiodico;
		reservaEspecial.veces = vm.veces;

		if(!moment(reservaEspecial.fin).isValid()) {
			console.log("La fecha fin no es valida");
			return;
		}

		reservaEspecialService.save({id: 12}, {reserva : reservaEspecial}).$promise
			.then(function(res) {
				Notification.success({title: "Reserva Admnistrativa", message : "Se ha registrado la Reserva Correctamente"});
				vm.cancelar();
				$log.debug(res.response);
			}, function(error) {
				$log.debug(error);
				Notification.error({title: "Reserva Admnistrativa", message : error.data.response});
			});
	}

	function cancelar() {
		vm.reservaPeriodica = false;
		vm.tipoperiodico = vm.tipos[0];
		vm.veces = 1;

		vm.listo = !vm.listo;
	}

	/**
	 * Evento que se dispara al seleccionar una celda del calendario
	 * data contiene el inicio, fin, campo y un array de fechaValidas de finalizacion de la Reserva
	 */
	function onclickCelda(event, data) {
		//$log.debug(data);
		vm.ocultarCalendario();
		vm.data = data;
		vm.inicio = $filter('horaFilter')(data.inicio);
		vm.fecha = moment(data.inicio).format("dddd, DD MMM");

		vm.reservaEspecial = {
			fecha : moment().format('YYYY-MM-DD'),
			idcampo : data.campo.idcampo,
			inicio : data.inicio,
			fin: data.fin,
			reservaespecial : 1,
			confirmado : 1,
			precio : 0, 
			idtiporeserva : 2,
			periodico : vm.tipoperiodico,
			veces : vm.veces
		}
	}

	/**
	 * Oculta el calendario y muestra el formulario
	 */
	function ocultarCalendario() {
		vm.listo = !vm.listo;
		$scope.$apply();
	}

	/**
	 * Evento que se dispara al seleccionar una reserva del calendario
	 * data contiene el campo y la reserva seleccionada
	 */
	function onclickReserva(event, data) {
		$log.debug(data);
		
	}
}