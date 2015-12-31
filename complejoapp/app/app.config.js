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
	 * Interceptor para enviar el token en cada peticion, pero no enviara el token cuando 
	 * se realize peticiones de plantillas
	 */
	jwtInterceptorProvider.tokenGetter = ['config', function(config) {
    	// saltar la autorizacion si la url de la peticion termina con .html
    	if (config.url.substr(config.url.length - 5) == '.html') {
    		return null;
    	}

    	return localStorage.getItem('token');
	}];

	$httpProvider.interceptors.push('jwtInterceptor');

}