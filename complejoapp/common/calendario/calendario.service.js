angular
	.module('complejo.common')
	.service('calendarioService', calendarioService)

calendarioService.$inject = [];

function calendarioService() {
	this.inicializarMoment = inicializarMoment;

	function inicializarMoment () {
		moment.locale('es', {
		    months : [
		        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
		        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
		    ],
		    monthsShort : [
		        "Ene", "Feb", "Mar", "Abr", "May", "Jun",
		        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
		    ],
		    weekdays : [
		        "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
		    ],
		    weekdaysShort : [
		    	"Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"
		    ],
		    weekdaysMin : [
		    	"Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"
		    ]
		});
	}
}