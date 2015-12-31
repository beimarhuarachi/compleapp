angular
	.module('complejo.common')
	.directive('cdCabeceraPagina', cabeceraPagina);

cabeceraPagina.$inject = [];

function cabeceraPagina () {
	var directiva = {
		templateUrl : 'common/cabecera-pagina/cabecera-pagina.directive.html',
		restrict : 'EA',
		replace : true,
		scope : {
			nombrecomplejo : '@',
			datospagina : '='
		}
	}

	return directiva;
}