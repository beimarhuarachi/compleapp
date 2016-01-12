angular
	.module('complejo.admin')
	.controller('NotificacionesController', NotificacionesController);

NotificacionesController.$inject = ['$log', '$scope', 'comPrereservaService', 'prereservaService', '$interval'];

function NotificacionesController($log, $scope, comPrereservaService, prereservaService, $interval) {
	var vm = this;

	/**
	 * Las prereservas que seran renderizadas
	 * @type {Array}
	 */
	vm.prereservas = null;

	/**
	 * Cuenta cuantas prereservas existen
	 * @type {Number}
	 */
	vm.contadorPrereservas = 0;

	/**
	 * Periodo de intervalo para actualizacion de notificaciones
	 */
	vm.tiempoIntervalo = 3000;

	/**
	 * Funcion asincrona para enviar peticion de actualizacion
	 */
	$interval(actualizarNotificaciones, vm.tiempoIntervalo);


	vm.obtenerNotificaciones = obtenerNotificaciones;

	/*
	 * Una vez inicializado el controlador, obtiene todas las prereservas
	 */
	vm.obtenerNotificaciones();


	/**
	 *  Obtener las prereservas activas
	 */
	function obtenerNotificaciones() {
		comPrereservaService.get({id : $scope.usuario.idusuario, 
								  fechaactual : moment().format("YYYY-MM-DD HH:mm:ss")}).$promise
			.then(function(res) {
				vm.prereservas = res.response;
				vm.contadorPrereservas = res.response.length;
				//$log.debug(res.response);
			}, function(error) {
				$log.debug(error.data.response);
			});	
	}

	/**
	 * Actualizar notificaciones
	 */
	function actualizarNotificaciones() {
		prereservaService.get({idcomplejo : $scope.complejo.idcomplejo, 
							   fechaactual : moment().format("YYYY-MM-DD HH:mm:ss") }
			, function(res) {
				//$log.debug(res.response);
				var numeronuevo = res.response;

				if(numeronuevo != vm.contadorPrereservas) {
					vm.contadorPrereservas = numeronuevo;
					vm.obtenerNotificaciones();
				}
			});
		
	}
	
}