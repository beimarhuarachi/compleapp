angular
	.module('complejo.common')
	.directive('cdSubirArchivo', cdSubirArchivo);

cdSubirArchivo.$inject = ['$log'];

function  cdSubirArchivo($log) {
	var directiva = {
		replace : true,
		templateUrl : 'common/subir-archivo/subir-archivo.directive.html',
		link : link
	}

	return directiva;

	function link(scope, element, attrs) {
		$log.debug("Directiva subir archivo : creado");

		$('#subir-archivo').on('change', function(event) {
			var ctx = document.getElementById('imagen').getContext('2d');
			var campoarchivo = $('#subir-archivo');
			//var contexto = $('#imagen').getContext('2d');
			var img = new Image;
			img.src = URL.createObjectURL(campoarchivo[0].files[0]);

			scope.campo.imagen = campoarchivo[0].files[0];


			img.onload = function() {
					//ctx.drawImage(img, 20,20);
				ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
			}
		});
	}
}