angular
	.module('complejo.servicios')
	.factory('facturaReservaService' , facturaReservaService);

facturaReservaService.$inject = ['$resource', 'REST_API'];

function facturaReservaService($resource, REST_API) {
	var nombreservicio = 'facturas/:id/reservas';

	var servicio = $resource(REST_API + nombreservicio, {id : "@_id"}, {

	});

	return servicio;
}