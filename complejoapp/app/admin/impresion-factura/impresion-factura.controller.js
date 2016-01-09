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

	/**
	 * Funciones de VM
	 */
	vm.imprimir = imprimir;
	vm.abrir = abrir;
	vm.descargar = descargar;

	vm.docDefinition = {
		content : [
			"Universidad Mayor de San Simon",
			{text : "Complejo deportivo san simon", fontSize: 25, alignment : 'center'},
			"este eus tfksdjalfsd ",
			{text : "Texto con estilo", style : 'header'},
			{text : "Texto con otro estilo", style : 'otroEstilo'},
			{
				alignment: 'justify',
				columns: [
					{
						text : 'fnsdklajfklasd'
					},
					{
						text : 'jfklsajfklasdjklajfklsajdklfjklasdj'
					}
				]
			}
		],

		styles : {
			header : {
				fontSize : 20,
				alignment : 'center',
				bold : true
			},
			otroEstilo : {
				fontSize : 35,
				italic : true
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
}