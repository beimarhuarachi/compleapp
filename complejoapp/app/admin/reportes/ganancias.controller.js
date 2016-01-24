(function() {
	'use strict';

	angular
		.module('complejo.admin')
		.controller('GananciasController', GananciasController);

	GananciasController.$inject = ['$log', '$scope', '$timeout', 'REST_API', '$http', '$filter'];

	function GananciasController($log, $scope, $timeout, REST_API, $http, $filter) {
		var vm = this;
		vm.gestion = null;

		vm.gestiones = [];

		vm.listo = false;

		vm.reporteBase = [
							    { mes: 1, generado:  0, numeroreservas : 0},
							    { mes: 2, generado: 0 , numeroreservas: 0},
							    { mes: 3, generado: 0 , numeroreservas: 0},
							    { mes: 4, generado: 0 , numeroreservas: 0},
							    { mes: 5, generado: 0 , numeroreservas: 0},
							    { mes: 6, generado: 0 , numeroreservas: 0},
							    { mes: 7, generado:  0 , numeroreservas: 0},
							    { mes: 8, generado: 0 , numeroreservas: 0},
							    { mes: 9, generado: 0 , numeroreservas: 0},
							    { mes: 10,generado: 0 , numeroreservas: 0},
							    { mes: 11, generado: 0 , numeroreservas: 0},
							    { mes: 12, generado:  0 , numeroreservas: 0}
							];

		vm.reporteGanancia = [];

		vm.datosGrafico = [];

		vm.cambiarGestion = cambiarGestion;

		/**
		 * watchers
		 */
		$scope.$watch(function () {
	        return $scope.$parent.vm.gestiones;
	    },function(value){
	   		vm.gestiones = value;

	   		if(vm.gestiones.length > 0) {
	   			vm.gestion = vm.gestiones[0];
		   		obtenerGanancias($scope.$parent.complejo.idcomplejo, vm.gestiones[0]);
	   		}

	         //console.log(vm.gestiones)
	    });

	    function obtenerGanancias(idcomplejo, gestion) {
	        $http.get(REST_API + 'reportes/ganancias/' + idcomplejo, {params : {
	        	gestion : gestion
	        }}).then(function(response) {
	       		vm.reporteGanancia = response.data.response;     
	            convertirAReporte(response.data.response);
	            //$log.debug(response.data.response);
	        });
	    }

	    function convertirAReporte(reporte) {
    		var clon = _.map(vm.reporteBase, _.clone);	

	    	_.each(reporte, function(value, key, list) {
	    		clon[value.mes - 1].generado = value.generado;
	    	});

	    	_.each(clon, function(value, key, list) {
	    		value.mes = $filter('textoMes')(value.mes);
	    		//console.log(value);
	    	});
	    	vm.datosGrafico = clon;
	    	vm.listo = !vm.listo;
	    }

	    function cambiarGestion(gestion) {
	    	console.log(vm.reporteBase);
	    	vm.reporteGanancia = vm.reporteBase;
	        vm.datosGrafico = vm.reporteBase;

	        vm.listo = !vm.listo;

	        obtenerGanancias($scope.complejo.idcomplejo, gestion);
	    }
	}

})();