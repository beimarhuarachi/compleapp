angular
	.module('complejo')
	.config(ConfiguracionRutas);

ConfiguracionRutas.$inject = ['$stateProvider','$urlRouterProvider', 'jwtInterceptorProvider', '$httpProvider'];

function ConfiguracionRutas($stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {
	//Esta causando error con el evento onStateChangeStart()
	//$urlRouterProvider.otherwise('/inicio');
	//==solucion===
	$urlRouterProvider.otherwise(function($injector, $location){
      	var $state = $injector.get("$state");
      	$state.go('app.visitante.inicio');
  	});

	$stateProvider
		/**
		 * Estado principal de la aplicacion
		 */
		.state('app', {
			abstract : true,
			template : '<ui-view/>'
		})

	/**
	 * Interceptor para enviar el token en cada peticion, para el control de acceso
	 */
	jwtInterceptorProvider.tokenGetter = function() {
		return localStorage.getItem('token');
	}

	$httpProvider.interceptors.push('jwtInterceptor');

}