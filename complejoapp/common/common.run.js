angular
	.module('complejo.common')
	.run(InicializarModulo);

InicializarModulo.$inject = ['calendarioService'];

function InicializarModulo(calendarioService) {
	calendarioService.inicializarMoment();
}