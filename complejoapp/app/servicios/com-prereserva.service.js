angular
	.module('complejo.servicios')
	.factory('comPrereservaService', comPrereservaService);

comPrereservaService.$inject = ['$resource', 'REST_API'];

function comPrereservaService($resource, REST_API) {
	var nombreservicio = "complejos/:id/prereservas";

	var servicio = $resource(REST_API + nombreservicio, {id : "@_id"}, {
		update : {
			method : 'PUT',
			skipAuthorization : false,
			params : {id : '@_id'}
		}
	});

	return servicio;
}