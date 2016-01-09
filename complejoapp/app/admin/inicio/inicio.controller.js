angular
	.module('complejo.admin')
	.controller('InicioController', InicioController);

InicioController.$inject = ['$scope'];

function InicioController($scope) {
	var vm = this;

	vm.complejo = $scope.complejo;

	vm.docDefinition = {
		pageMargins: [ 40, 60, 40, 60 ],
		background: 'simple text',
		header: 'simple text',

	  footer: {
	    columns: [
	      'Left part',
	      { text: 'Right part', alignment: 'right' }
	    ]
	  },
		content: [
		    'Bulleted list example:',
		    {
		      // to treat a paragraph as a bulleted list, set an array of items under the ul key
		      ul: [
		        'Item 1',
		        'Item 2',
		        'Item 3',
		        { text: 'Item 4', bold: true },
		      ]
		    },

		    'Numbered list example:',
		    {
		      // for numbered lists set the ol key
		      ol: [
		        'Item 1',
		        'Item 2',
		        'Item 3'
		      ]
		    }
		  ]
	}

	/**
	 * Funciones de VM
	 */
	vm.imprimir = imprimir;
	vm.abrir = abrir;
	vm.descargar = descargar;


	function imprimir() {
		pdfMake.createPdf(vm.docDefinition).print();
	}

	function abrir() {
		pdfMake.createPdf(vm.docDefinition).open();
	}

	function descargar() {
		pdfMake.createPdf(vm.docDefinition).download('beimarpdf.pdf');
	}
}