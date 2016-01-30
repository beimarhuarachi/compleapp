angular
	.module('complejo.visitante')
	.config(ConfiguracionRutasVisitante);

ConfiguracionRutasVisitante.$inject = ['$stateProvider'];

function ConfiguracionRutasVisitante ($stateProvider) {
	$stateProvider
		/**
		 * Estado Principal para los visitantes de la aplicacion
		 */
		.state('app.visitante', {
			abstract : true,
			templateUrl : 'app/visitante/visitante.layout.html'
		})
		.state('app.visitante.inicio',{
			url : '/inicio',
			templateUrl : 'app/visitante/inicio/inicio.view.html',
			controller : 'InicioController',
			controllerAs : 'vm'
		})
		.state('app.visitante.iniciosesion', {
			url : '/iniciarsesion',
			templateUrl : 'app/visitante/login/login.html',
			controller : 'LoginController'
		})
		.state('app.visitante.busqueda', {
			url : '/buscarCancha',
			templateUrl : 'app/visitante/busqueda/busqueda.view.html',
			controller : 'BusquedaController',
			controllerAs : 'vm'
		});
}