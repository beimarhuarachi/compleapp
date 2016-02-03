angular
	.module('complejo.servicios')
	.factory('complejoService', complejoService);

complejoService.$inject = ['$resource', 'REST_API'];

function complejoService($resource, REST_API) {
	var nombreServicio = 'complejos';

	var servicio = $resource(REST_API + nombreServicio + '/:id', {id : '@_id'}, {
		query : {
			method : 'GET',
			skipAuthorization : true,
			params : {id : '@_id'}
		},
		save : {
			method : 'POST',
			//skipAuthorization :true,
			transformRequest: angular.identity,
			//El content type lo seteamos porque por defecto envia datos json
			//(con undefined podemos enviar en formato de FormData)
			headers: { 'Content-Type': undefined }
		}
	}); 

	return servicio;
}	