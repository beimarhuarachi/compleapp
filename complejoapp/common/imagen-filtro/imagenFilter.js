angular
	.module('complejo.common')
	.filter('imagenFilter', imagenFilter);

imagenFilter.$inject = ['REST_API'];

function imagenFilter(REST_API) {
	return function(text) {
		if(text) {
			return REST_API + "" + text;
		}
	}
}