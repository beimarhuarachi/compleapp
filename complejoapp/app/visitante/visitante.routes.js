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
		})
		.state('app.visitante.complejo', {
			url : '/complejo/:id',
			templateUrl : 'app/visitante/complejo/complejo.view.html',
			controller : 'ComplejoController',
			controllerAs : 'vm',
			resolve : {
				complejo : ['$log', '$resource', '$stateParams','$q' , 'REST_API',
				function($log, $resource, $stateParams, $q, REST_API) {
					var idcomplejo = $stateParams.id;
					
					var defered = $q.defer();

					$resource(REST_API + 'complejos').get({id : idcomplejo}).$promise
						.then(function(res) {
							$log.debug('UI-router: Resolve ->visitante : exito');
							defered.resolve(res.response);
						}, function(error) {
							$log.debug('UI-router: Resolve ->visitante :Error');
							console.log(idcomplejo);
							defered.reject(error);
							$state.go('app.visitante.inicio');
						});

					return defered.promise;
				}]
			}
		})
		.state('app.visitante.registro', {
			url : '/registro',
			templateUrl : 'app/visitante/registro/registro.view.html',
			controller : 'RegistroController',
			controllerAs : 'vm'
		});
}