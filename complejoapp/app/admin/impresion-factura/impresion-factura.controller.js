angular
	.module('complejo.admin')
	.controller('ImpresionFacturaController', ImpresionFacturaController);

ImpresionFacturaController.$inject = ['$scope', '$state', 'cliente', 'reservas', '$log'];

function ImpresionFacturaController($scope, $state, cliente, reservas, $log) {
	var vm = this;

	/**
	 * Campo de VM
	 * @type {[type]}
	 */
	vm.datospagina = $state.current.data;

	vm.cliente = cliente;

	vm.reservas = reservas;

	vm.docDefinition = {};

	vm.precioTotal = calcularPrecioTotal();

	vm.textoFecha = convertirFecha();


	vm.cuerpoTabla = obtenerCuerpoTabla();

	/**
	 * Funciones de VM
	 */
	vm.imprimir = imprimir;
	vm.abrir = abrir;
	vm.descargar = descargar;

	vm.docDefinition = {
		content : [
			{
				alignment: 'justify',
				columns: [
					{
						width : '70%',
						text : $scope.complejo.nombre,
						style : 'titulo'
					},
					{
						width : '30%',
						text : 'Recibo',
						style : 'tituloRecibo',
						alignment : 'left'
					}
				]
			},
			{
				alignment : 'center',
				columns : [
					{text : $scope.complejo.direccion, width : '70%'},
					{text : "N  "+ vecesCeros() + vm.cliente.NumeroFactura, width : '30%', alignment : 'left'}		
				]
			},
			{
				alignment : 'center',
				columns : [
					{text : 'Telefono : ' + $scope.complejo.telefono, width : '70%'}
				]
			},
			{
				alignment : 'left',
				columns : [
					{
						text : [
							{text : 'Recibi de \t\t:    \t\t \t\t', bold : true	},
							vm.cliente.Nombres + "  " + vm.cliente.Apellidos
						],
						width : '65%',
						margin : [ 30, 15, 0, 0 ]
					},
					{
						text : [
							{text : 'C.I.  \t\t :     \t\t\t\t', bold : true},
							vm.cliente.NumeroCI
						],
						width : '65%',
						margin : [ 30, 15, 0, 0 ]
					}
				]
			},
			{
				text : [
					{text : 'La Suma   de \t\t :    \t\t \t\t', bold : true},
					NumeroALetras(vm.precioTotal)	
				],
				margin : [ 30, 5, 0, 0 ]
			},
			{
				text : [
					{text : 'Por Concepto de \t\t :  \t\t\t\t', bold : true},
					'Reserva Campo Deportivo    : ',
					{text : vm.reservas[0].NombreCampo, bold : true},
				],
				margin : [ 30, 5, 0, 0 ]
			},
			{
				table: {
					headerRows: 1,
					widths: [ '*', 'auto', 100, '*' ],

					body: vm.cuerpoTabla
				},
				margin : [30,10,30,10]
			},
			{
				text : [
					{text : $scope.complejo.ciudad + ' \t\t:    \t\t\t\t ', bold : true},
					"" + vm.textoFecha	
				],
				margin : [ 30, 5, 0, 0 ],
				alignment : 'center'
			},
			{
				text : 'Firma Cajero', bold: true,
				margin : [ 350, 22, 0, 0 ]
				
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

	function imprimir() {
		pdfMake.createPdf(vm.docDefinition).print();
	}

	function abrir() {
		pdfMake.createPdf(vm.docDefinition).open();
	}

	function descargar() {
		pdfMake.createPdf(vm.docDefinition).download('beimarpdf.pdf');
	}

	function calcularPrecioTotal() {
		var precioTotal = 0;

		_.each(vm.reservas, function(reserva, key, list) {	
			precioTotal = precioTotal + parseInt(reserva.PrecioReserva);	
		});

		return precioTotal;
	}

	function convertirFecha() {
		var texto = "";
		var fecha = moment(vm.cliente.Fecha);
		texto = texto + fecha.format("DD") + "   de    ";
		texto = texto + fecha.format("MMMM") + "     de       ";
		texto = texto + fecha.format("YYYY");

		return texto; 
	}

	function obtenerCuerpoTabla() {
		var cuerpoTabla = [];

		cabecera = [ {text : 'Fecha', bold : true}, {text : 'Hora Inicio', bold : true}, 
					{text : 'Hora Fin', bold : true}, {text : 'Precio', bold : true}];

		pie = [ {text : 'Precio Total', bold : true}, "", "", {text : "" + vm.precioTotal, bold : true}];

		cuerpoTabla.push(cabecera);

		_.each(vm.reservas, function(value, key, list) {
			var inicio = moment(value.Inicio);
			var fin = moment(value.Fin);

			var fila = [inicio.format("DD/MM/YYYY"), inicio.format("HH:mm:ss"), fin.format("HH:mm:ss"), value.PrecioReserva];
			cuerpoTabla.push(fila);
		});

		cuerpoTabla.push(pie);

		return cuerpoTabla;
	}

	function numeroDigitos(numero) {
	  return Math.max(Math.floor(Math.log10(Math.abs(numero))), 0) + 1;
	}

	function vecesCeros(numero) {
		var ceros = "";
		var digitos = numeroDigitos(vm.cliente.NumeroFactura);
		var total = 8;
		var dif = total - digitos;
		for(var i=0;i<dif;i++) {
			ceros = ceros + "0";
		}
		return ceros;
	}
}