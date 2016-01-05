angular
	.module('complejo.common')
	.filter('horaFilter', horaFilter);

function horaFilter() {
	return function(text) {
		if(text) {
			return moment(text).format('HH:mm:ss');
		}
	}
}