angular
	.module('complejo.admin')
	.controller('NotificacionesController', NotificacionesController);

NotificacionesController.$inject = ['$log', '$scope', 'comPrereservaService'];

function NotificacionesController($log, $scope, comPrereservaService) {
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
				$log.debug(res.response);
			}, function(error) {
				$log.debug(error.data.response);
			});	
	}
}