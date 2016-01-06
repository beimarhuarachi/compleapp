angular
	.module('complejo.admin')
	.controller('ReservaEspecialController', ReservaEspecialController);

ReservaEspecialController.$inject = ['$log', '$state', '$scope', 'reservaEspecialService'];

function ReservaEspecialController($log, $state, $scope, reservaEspecialService) {
	$log.debug('ReservaEspecialController : inicializado');
	var vm = this;

	/**
	 * Campo de VM
	 */
	vm.reservaEspecial = {};
	
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

	/**
	 * Eventos de la directiva calendario
	 */
	$scope.$on('clickCelda', onclickCelda);
	$scope.$on('clickReserva', onclickReserva);

	/**
	 * Funcion para registrar reserva especial
	 */
	function registrarReservaEspecial(reservaEspecial) {
		reservaEspecialService.save({id: 12}, {reserva : "fdshakfkdjs"}).$promise
			.then(function(res) {
				$log.debug("ReservaEspecialController : enviado peticion registro reserva especial");
				$log.debug(res.response);
			}, function(error) {
				$log.debug(error);
			});
	}

	/**
	 * Evento que se dispara al seleccionar una celda del calendario
	 * data contiene el inicio, fin, campo y un array de fechaValidas de finalizacion de la Reserva
	 */
	function onclickCelda(event, data) {
		//$log.debug(data);
		vm.ocultarCalendario();
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