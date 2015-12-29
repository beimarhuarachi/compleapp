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
			template : '<ui-view/>'
		})
		.state('app.visitante.inicio',{
			url : '/inicio',
			template : 'Esta es la pagina de inicio'
		})
}