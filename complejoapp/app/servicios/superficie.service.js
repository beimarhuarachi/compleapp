angular
	.module('complejo.servicios')
	.factory('superficieService', superficieService);


superficieService.$inject = ['$resource', 'REST_API'];

function superficieService($resource, REST_API) {

	var servicio = $resource(REST_API + 'superficies', {}, {
		query : {
			method : 'GET',
			skipAuthorization : true
		}
	});

	return servicio;
	
}