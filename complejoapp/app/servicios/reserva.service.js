angular
	.module('complejo.servicios')
	.factory('reservaService', reservaService);

reservaService.$inject = ['$resource', 'REST_API'];

function reservaService($resource, REST_API) {
	var nombreservicio = "reservas";

	var servicio = $resource(REST_API + "complejos/:id/" + nombreservicio, {id : "@_id"}, {

	});

	return servicio;
}