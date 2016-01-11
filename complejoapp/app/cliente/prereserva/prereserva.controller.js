angular
	.module('complejo.cliente')
	.controller('PrereservaController', PrereservaController);

PrereservaController.$inject = ['$state', '$scope', 'complejos', '$log', '$filter', 'Notification'];

function PrereservaController($state, $scope, complejos, $log, $filter, Notification) {
	var vm = this;

	vm.datospagina = $state.current.data;
	vm.titulo = $scope.$parent.vm.usuario.nombreusuario;

	/*
	 * complejos del cliente
	 */
	vm.complejos = complejos;

	/**
	 * complejo seleccionado
	 */
	vm.complejoSeleccionado = null;

	/**
	 * Verificar si esta seleccionado algun complejo
	 */
	vm.estaSeleccionado = false;

	/**
	 * Prereserva 
	 */
	vm.prereserva = {};
	
	/**
	 * Funcion para seleccionar un complejo
	 */
	vm.seleccionarComplejo = seleccionarComplejo;
	vm.reset = reset;
	vm.prereservar = prereservar;

	/**
	 * Si la celda se selecciono
	 */
	vm.celdaSeleccionada = false;

	/**
	 * mostrarCalendario
	 */
	vm.mostrarCalendario = false;

	/**
	 * campo seleccionado
	 */
	vm.data = null;

	/**
	 * Eventos de la directiva Calendario
	 */
	$scope.$on('clickCelda', function(event, data) {
		//$log.debug(data);

		vm.data = data;

		vm.inicio = $filter('horaFilter')(data.inicio);
		vm.fecha = moment(data.inicio).format("dddd, DD MMM");

		vm.prereserva = {
			fecha : moment().format('YYYY-MM-DD'),
			idcampo : data.campo.idcampo,
			inicio : data.inicio,
			fin: data.fin,
			reservaespecial : 0,
			confirmado : 0,
			precio : 0, 
			idtiporeserva : 4
		}
		$log.debug(vm.prereserva);
		vm.celdaSeleccionada = !vm.celdaSeleccionada;
		vm.mostrarCalendario = !vm.mostrarCalendario;
		$scope.$apply();
	});

	$scope.$on('clickReserva', function(event, data) {
		$log.debug(data);
	});

	function seleccionarComplejo(complejo) {
		//$log.debug(complejo);
		vm.complejoSeleccionado = complejo;

		vm.estaSeleccionado = !vm.estaSeleccionado;
		vm.mostrarCalendario = !vm.mostrarCalendario;
	}

	function prereservar(prereserva) {
		
		var texto = moment(prereserva.inicio).format('YYYY-MM-DD');
		prereserva.fin = moment(texto + " " + prereserva.fin).format('YYYY-MM-DD HH:mm:ss');
		if(!moment(prereserva.fin).isValid()) {
			console.log("La fecha fin no es valida");
			return;
		}

		

		$log.debug(prereserva);
	}

	function reset() {
		vm.estaSeleccionado = false;
		vm.mostrarCalendario = false;
		vm.celdaSeleccionada = false;	
	}
}