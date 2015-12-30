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
			templateUrl : 'app/admin/admin.layout.html'
		})
		/**
		 * Pagina de Inicio del Administrador
		 */
		.state('app.admin.inicio', {
			url : '/inicio',
			template : 'Pagina de inicio de admin'
		})
}