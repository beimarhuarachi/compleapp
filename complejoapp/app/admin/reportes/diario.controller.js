(function() {
	'use strict';

	angular
		.module('complejo.admin')
		.controller('DiarioController', DiarioController);

	DiarioController.$inject = ['$log', '$scope', '$http', 'REST_API'];

	function DiarioController($log, $scope, $http, REST_API) {
		var vm = this;

		vm.complejo = $scope.$parent.complejo;

		vm.mostrarDiario = false;

		vm.abrirReporte = abrirReporte;

		vm.reporte = [];

		vm.imprimir = imprimir;
		vm.abrir = abrir;
		vm.descargar = descargar;

		vm.docDefinition = null;

		function imprimir() {
			pdfMake.createPdf(vm.docDefinition).print();
		}

		function abrir() {
			pdfMake.createPdf(vm.docDefinition).open();
		}

		function descargar() {
			pdfMake.createPdf(vm.docDefinition).download('reporteDiario' + vm.fecha);
		}

		function abrirReporte() {
			obtenerReporte();
		}

		function convertirFecha(fecha) {
			var texto = "";
			var fecha = moment(fecha);
			texto = texto + fecha.format("DD") + "   de    ";
			texto = texto + fecha.format("MMMM") + "     de       ";
			texto = texto + fecha.format("YYYY");

			return texto; 
		}

		function generarDocumento(complejo, reporte) {
			return {
				content : [
					{
						text : 'Reporte Diario de Ingresos por Reservas',
						style : 'titulo'
					},
					{
						text : complejo.nombre,
						style : 'titulo'
					},
					{
						alignment : 'center',
						text : complejo.direccion, 
					},
					{
						alignment : 'center',
						text : 'Telefono : ' + complejo.telefono,
					},
					{
						text : [
							{text : 'Fecha de Reporte :  \t\t\t\t', bold : true},
							convertirFecha(moment().format('YYYY-MM-DD')),
						],
						margin : [ 0, 20, 0, 0 ]
					},
					{
						text : [
							{text : 'Administrador :  \t\t\t\t', bold : true},
							complejo.nombreadmin  + " " + complejo.apellidos,
						],
						margin : [ 0, 5, 0, 0 ]
					},
					{
						text : [
							{text : 'C.I. :  \t\t\t\t', bold : true},
							complejo.numeroci,
						],
						margin : [ 0, 5, 0, 0 ]
					},
					{
						text : [
							{text : 'Total Ingresos :  \t\t', bold : true},
							'' + vm.totalingreso,
						],
						margin : [ 0, 5, 0, 0 ]
					},
					{
						text : [
							{text : 'Total Ingresos(Literal) :  \t\t', bold : true},
							'' + NumeroALetras(vm.totalingreso),
						],
						margin : [ 0, 5, 0, 0 ]
					},
					{
						text : 'Detalle',
						bold: true,
						alignment : 'center',
						margin : [ 0, 5, 0, 0 ]
					},
					{
						table: {
							headerRows: 1,
							widths: [ '*', 'auto', 100, '*' ],

							body: obtenerCuerpoTabla()
						},
						margin : [ 0, 5, 0, 0 ]
					},
					{
						text : 'Firma Administrador', bold: true,
						margin : [ 320, 35, 0, 0 ]
						
					}
					
				],

				styles : {
					titulo : {
						fontSize : 22,
						alignment : 'center',
						bold : true
					},
					tituloRecibo : {
						fontSize : 18,
						alignment : 'center',
						bold : true
					}
				}
			}
		}

		function obtenerCuerpoTabla() {
			var cuerpoTabla = [];

			var cabecera = [ {text : 'Campo Deportivo', bold : true}, {text : 'Cliente', bold : true}, 
						{text : 'C.I.', bold : true}, {text : 'Precio Recibo', bold : true}];

			var pie = [ {text : 'Precio Total', bold : true}, "", "", {text : "" + vm.totalingreso, bold : true}];

			cuerpoTabla.push(cabecera);

			_.each(vm.reporte, function(value, key, list) {
				var fila = [value.nombrecampo, value.nombres + " "+ value.apellidos, value.numeroci, value.totalprecio];
				cuerpoTabla.push(fila);
			});

			cuerpoTabla.push(pie);

			return cuerpoTabla;
		}

		function obtenerReporte() {
			var fechaactual = moment().format('YYYY-MM-DD');
			vm.fecha = moment().format('DD-MM-YYYY');

			$http.get(REST_API + 'reportes/reporteDiario', {params:{"idcomplejo": vm.complejo.idcomplejo, 
				"fechaactual": fechaactual}})
				.success(function(data) {
					//$log.debug(data.response);
					vm.reporte = data.response;

					if(vm.reporte.length > 0) {
						vm.totalingreso = calcularPrecioTotal(vm.reporte);
						vm.mostrarDiario = !vm.mostrarDiario;
						vm.docDefinition =  generarDocumento(vm.complejo, vm.reporte);
					}
				});
		}

		function calcularPrecioTotal(reporte) {
			var precioTotal = 0;
			_.each(reporte, function(value, key, list) {
				precioTotal = precioTotal + parseInt(value.totalprecio);
			});

			return precioTotal;
		}
	}
})();