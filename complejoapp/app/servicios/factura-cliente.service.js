angular
	.module('complejo.servicios')
	.factory('facturaClienteService', facturaClienteService);

facturaClienteService.$inject = ['$resource', 'REST_API'];

function facturaClienteService($resource, REST_API) {
	var nombreservicio = 'facturas/:id/clientes';

	var servicio = $resource(REST_API + nombreservicio, {id: '@_id'}, {

	});

	return servicio;
}