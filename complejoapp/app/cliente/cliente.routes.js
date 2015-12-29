angular
	.module('complejo.cliente')
	.config(ConfiguracionRutasCliente);


ConfiguracionRutasCliente.$inject = ['$stateProvider'];

function ConfiguracionRutasCliente($stateProvider) {
	$stateProvider
		/**
		 * Estado Principal para el Cliente
		 */
		.state('app.cliente', {
			abstract : true,
			url : '/cliente',
			template : '<ui-view/>'
		})
		/**
		 * Pagina de inicio de cliente
		 */
		.state('app.cliente.inicio', {
			url : '/inicio',
			template : 'Esta es la pagina de inicio de Cliente'
		}) 
}