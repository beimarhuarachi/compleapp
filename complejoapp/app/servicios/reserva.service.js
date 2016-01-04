angular
	.module('complejo.servicios')
	.factory('reservaService', reservaService);

reservaService.$inject = ['$resource', 'REST_API'];

function reservaService($resource, REST_API) {
	var nombreservicio = "reservas";

	/**
	 * En la peticion GET recibe el :id y otros dos parametros que son : Fecha Inicio y Fin(inicio, fin)
	 * Esto para capturar solo las reservas de una semana que esten en esos rangos
	 */
	var servicio = $resource(REST_API + "campos/:id/" + nombreservicio, {id : "@_id"}, {

	});

	return servicio;
}