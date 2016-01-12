angular
	.module('complejo.cliente')
	.controller('PrereservaController', PrereservaController);

PrereservaController.$inject = ['$state', '$scope', 'complejos', '$log', 
								'$filter', 'Notification', 'prereservaService'];

function PrereservaController($state, $scope, complejos, $log, $filter, Notification, prereservaService) {
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
		//$log.debug(vm.prereserva);
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

		var fechaControl = moment().add(2, 'days');
		//controlar que la fecha sea 48 horas antes
		if(moment(prereserva.inicio).isBefore(fechaControl)) {
			$log.debug('la fecha es antes, no puedes');
			Notification.success({title: "Registro de PreReserva", message : "Una prereserva debe realizarse 48 horas antes"});

			return;
		}

		vm.prereserva.precio = calcularPrecio(vm.prereserva.inicio, vm.prereserva.fin, vm.data.campo.precio);

		vm.prereserva.expiracion = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');

		prereservaService.save({prereserva : vm.prereserva}).$promise
			.then(function(res) {
				//$log.debug(res.response);
				Notification.success({title: "Registro de PreReserva", message : "Se ha registrado la Prereserva Correctamente"});
				reset();
			}, function(error) {
				//$log.debug(error.data.response);
				Notification.error({title: "Registro de PreReserva", message : error.data.response});
			});
	}

	function reset() {
		vm.estaSeleccionado = false;
		vm.mostrarCalendario = false;
		vm.celdaSeleccionada = false;	
	}

	function calcularPrecio(inicio, fin, precioHora) {
		var precioTotal = 0;
		// inicio = "2016-02-02 " + inicio;
		// fin = "2016-02-02 " + fin;

		while(moment(inicio).isBefore(fin)) {
			inicio = moment(inicio).add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
			precioTotal = precioTotal + parseInt(precioHora);
		}

		return precioTotal;
	}
}