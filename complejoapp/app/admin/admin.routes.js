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
						$state.go('app.visitante.inicio');
					});

					return defered.promise;
				}],
				funciones : ['usuarioFuncionService', '$q', '$log','autorizacionService', '$state',
				function(usuarioFuncionService, $q, $log, autorizacionService) {
					var defered = $q.defer();
					usuarioFuncionService.get({id : autorizacionService.getIdUsuario()}, function(res) {
						$log.debug('UI-router: Resolve ->admin(funciones) : exito');
						defered.resolve(res.response);
					}, function(error) {
						$log.debug('UI-router: Resolve ->admin(funciones) :Error');
						defered.reject(error);
						$state.go('app.visitante.inicio');
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
			templateUrl : 'app/admin/inicio/admin-inicio.view.html',
			data : {
				nombrepagina : 'Inicio',
				icono : 'fa fa-dashboard'
			},
			controller : 'InicioController',
			controllerAs : 'vm'
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
		/*
		 * Estado para impresion de facturas
		 */
		.state('app.admin.impresion-factura', {
			url : '/imprimirRecibo/:id',
			templateUrl : 'app/admin/impresion-factura/impresion-factura.view.html',
			controller : 'ImpresionFacturaController',
			controllerAs : 'vm',
			data : {
				nombrepagina : 'Imprimir Recibo',
				icono : 'fa fa-fw fa-print'
			},
			resolve : {
				cliente : ['$stateParams', '$q', 'facturaClienteService', '$state', 
				function($stateParams, $q, facturaClienteService, $state) {
					
					var idfactura = $stateParams.id;

					var defered = $q.defer();

					facturaClienteService.get({id : idfactura}, function(res) {
						//console.log(res.response);
						defered.resolve(res.response);
					}, function(error) {
						defered.reject(error);
						$state.go('app.admin.inicio');
					});

					return defered.promise;

				}],
				reservas : ['$stateParams', '$q', 'facturaReservaService', '$state', 
				function($stateParams, $q, facturaReservaService, $state) {
					
					var idfactura = $stateParams.id;

					var defered = $q.defer();

					facturaReservaService.get({id : idfactura}, function(res) {
						//console.log(res.response);
						defered.resolve(res.response);
					}, function(error) {
						defered.reject(error);
						$state.go('app.admin.inicio');
					});

					return defered.promise;
				}]
			}
		})
		/**
		 * estado para confirmar prereservas
		 */
		.state('app.admin.prereserva', {
			url: '/prereserva',
			templateUrl : 'app/admin/confirmar-prereserva/prereserva.view.html', 
			controller : 'PrereservaAdminController',
			controllerAs : 'vm',
			data : {
				nombrepagina : 'Confirmar Prereserva',
				icono : 'fa fa-fw fa-check'
			},
			resolve : {
				prereservas : ['$stateParams', '$q', 'comPrereservaService','autorizacionService' ,'$state', 
					function($stateParams, $q, comPrereservaService,autorizacionService ,$state) {
						var defered = $q.defer();
						$idcomplejo = 

						comPrereservaService.get({id : autorizacionService.getIdUsuario(), fechaactual : moment().format("YYYY-MM-DD HH:mm:ss")}, function(res) {
							//console.log(res.response);
							defered.resolve(res.response);
						}, function(error) {
							defered.reject(error);
							$state.go('app.admin.inicio');
						});

						return defered.promise;
					}]

			}
		})
}