angular
	.module('complejo.admin')
	.config(ConfiguracionRutasAdmin);

ConfiguracionRutasAdmin.$inject = ['$stateProvider'];

function ConfiguracionRutasAdmin ($stateProvider) {
	$stateProvider
		/**
		 * Estado Principal para Adminnistrador
		 */
		.state('app.admin', {
			abstract : true,
			url : '/admin',
			//template : '<ui-view/>'
			templateUrl : 'app/admin/admin.layout.html',
			controller : 'AdminLayoutController'
		})
		/**
		 * Pagina de Inicio del Administrador
		 */
		.state('app.admin.inicio', {
			url : '/inicio',
			template : 'Pagina de inicio de admin',
			data : {
				nombrepagina : 'Inicio',
				icono : 'fa fa-dashboard'
			}
		})
		/**
		 * Estado para el registro de una nuevo campo
		 */
		.state('app.admin.registrar-campo', {
			url : '/registrarCampo',
			templateUrl : 'app/admin/registro-campo/registro-campo.view.html',
			controller : 'RegistroCampoController',
			data : {
				nombrepagina : 'Registrar Campo Deportivo',
				icono : 'fa fa-fw fa-edit'
			}
		})
		/**
		 * Estado para reservas
		 */
		.state('app.admin.reserva', {
			url : '/reservar',
			templateUrl : 'app/admin/reserva/reserva.view.html',
			controller : 'ReservaController',
			data : {
				nombrepagina : 'Realizar Reserva',
				icono : 'fa fa-fw fa-table'
			}
		})
}