angular
	.module('complejo.admin')
	.controller('ReportesController', ReportesController);

ReportesController.$inject = ['$log', '$state', 'reportesService', '$scope', '$http', 'REST_API'];

function ReportesController($log, $state, reportesService, $scope, $http, REST_API) {
	var vm = this;

	vm.datospagina = $state.current.data;
    vm.reportes = [];

    vm.data = [];

    vm.gestion = null;

    vm.gestiones = [2015, 2016, 2017];
   
    vm.listo = false;

    vm.cambiarGestion = cambiarGestion;

    // reportesService.getCamposPopulares({id : $scope.complejo.idcomplejo}, function(res) {
    //    //$log.debug(res.response); 
    //    vm.reportes = res.response;

    //    convertirAReporte(res.response);

    //    vm.listo = !vm.listo;
    // });

    obtenerGestiones();

    function obtenerReporte(idcomplejo, gestion) {
       reportesService.getCamposPopulares({id : idcomplejo, gestion : gestion}, function(res) {
           //$log.debug(res.response); 
           vm.reportes = res.response;

           convertirAReporte(res.response);

           vm.listo = !vm.listo;
        });
    }

    function obtenerGestiones() {
        $http.get(REST_API + 'complejos/'+ $scope.complejo.idcomplejo +'/gestiones').then(function(response) {
            vm.gestiones = response.data.response;
            if(vm.gestiones.length > 0) {
                vm.gestion = vm.gestiones[0];
                obtenerReporte($scope.complejo.idcomplejo, vm.gestion);
            }
            
            $log.debug(vm.gestiones);
        });
    }

    function cambiarGestion(gestion) {
        $log.debug(gestion);
        vm.reportes = [];
        vm.data = [];

        vm.listo = !vm.listo;
        obtenerReporte($scope.complejo.idcomplejo, gestion);
    }

    function convertirAReporte(reporte) {
        _.each(reporte, function(value, key, list) {
            vm.data.push({label : value.nombrecampo, value : value.numeroreservas});
        });
    }
    //@TODO Asociar colores a cada campo(Tarea)
    //vm.colors = ["#31C0BE","#c7254e","#98a0d3"];
}