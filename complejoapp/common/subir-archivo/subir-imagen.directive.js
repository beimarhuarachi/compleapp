(function() {
	'use strict';

	angular
		.module('complejo.common')
		.directive('cdSubirImagen', cdSubirImagen);

	cdSubirImagen.$inject = ['$log'];

	function cdSubirImagen($log) {
		var directiva = {
			replace : true,
			scope : {
				titulo : '@',
				imagen : '='
			},
			template : '<div><h4>{{titulo}}</h4><span class="btn btn-success btn-file">Buscar Archivo <input id="subir-archivo" type="file"></span>	<canvas id="imagen" style="border : 1px solid #5cb85c; display : block; width : 100%;">no soporta canvas</canvas> </div>',
			link : link
		}

		return directiva;

		function link(scope, element, attrs) {
			$log.debug("Directiva subir imagen : creado");

			$('#subir-archivo').on('change', function(event) {
				var ctx = document.getElementById('imagen').getContext('2d');
				var campoarchivo = $('#subir-archivo');
				//var contexto = $('#imagen').getContext('2d');
				var img = new Image;
				img.src = URL.createObjectURL(campoarchivo[0].files[0]);

				scope.imagen = campoarchivo[0].files[0];


				img.onload = function() {
						//ctx.drawImage(img, 20,20);
					ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
				}
			});
		}
	}
})();