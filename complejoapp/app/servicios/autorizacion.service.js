angular
	.module('complejo.servicios')
	.factory('autorizacionService' ,autorizacionService);

autorizacionService.$inject = ['jwtHelper', 'store', '$http', '$q'];

function autorizacionService(jwtHelper, store, $http, $q) {
	var usuarioActual = null;

	servicio = {
		getUsuarioActual : getUsuarioActual,
		login : login,
		logout : logout,
		esAdmin : esAdmin,
		esCliente : esCliente,
		tieneSesion : tieneSesion,
		getToken : getToken
	};

	return servicio;

	function getUsuarioActual() {
		return usuarioActual;
	}

	function login() {
		//hacer peticion del token
	}

	function logout() {
		//set null al usuario, borrar el token
	}

	function getToken() {
		//retornar le token
	}

	function tieneSesion() {
		//no token pasado y existe el token y usuario
		return true;
	}

	function esAdmin() {
		//verificar si es administrador el usuario
		return true;
	}

	function esCliente() {
		//verificar si en cliente el administrador
		return true;
	}
}