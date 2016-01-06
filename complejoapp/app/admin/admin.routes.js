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
			controller : 'AdminLayoutController',
			resolve : {
				complejo : ['$log', 'complejoService', 'autorizacionService', '$state','$q' ,
				function($log, complejoService, autorizacionService, $state, $q) {
					var defered = $q.defer();
					complejoService.query({id : autorizacionService.getIdUsuario()}).$promise.then(function(res) {
						$log.debug('UI-router: Resolve ->admin : exito');
						defered.resolve(res.response);
					}, function(error) {
						$log.debug('UI-router: Resolve ->admin :Error');
						defered.reject(error);
						$state.go('app.admin.inicio');
					});

					return defered.promise;
				}]
			}
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
		/**
		 * Estado para registro de clientes
		 */
		.state('app.admin.registrar-cliente', {
			url : '/registrarCliente',
			templateUrl : 'app/admin/registro-cliente/registro-cliente.view.html',
			controller : 'RegistroClienteController',
			controllerAs : 'vm',
			data : {
				nombrepagina : 'Registro Clientes',
				icono : 'fa fa-fw fa-users'
			}
		})
		/**
		 * Estado para reservas especiales
		 */
		.state('app.admin.reserva-especial', {
			url :'/reservaEspecial',
			templateUrl : 'app/admin/reserva-especial/reserva-especial.view.html',
			controller : 'ReservaEspecialController',
			controllerAs : 'vm',
			data : {
				nombrepagina : 'Reserva Especial',
				icono : 'fa fa-fw fa-tablet'
			}
		})
}