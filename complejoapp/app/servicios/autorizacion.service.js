angular
	.module('complejo.servicios')
	.factory('autorizacionService' ,autorizacionService);

autorizacionService.$inject = ['jwtHelper', 'store', '$http', '$q', 'REST_API'];

function autorizacionService(jwtHelper, store, $http, $q, REST_API) {

	servicio = {
		getUsuarioActual : getUsuarioActual,
		login : login,
		logout : logout,
		esAdmin : esAdmin,
		esCliente : esCliente,
		tieneSesion : tieneSesion,
		getToken : getToken,
		registrarSesion :  registrarSesion
	};

	return servicio;

	function getUsuarioActual() {
		var usuarioActual;
		var token = store.get('token');
		if(token) {
			usuarioActual = {};
			var decodificado = jwtHelper.decodeToken(token);
			usuarioActual.nombreusuario = decodificado.nombreusuario;
			usuarioActual.correo = decodificado.correo;
			usuarioActual.rol = decodificado.rol;
			return usuarioActual;
		}

		return null;
	}

	function login(user) {
		//hacer peticion del token
		var defered = $q.defer();

		$http({
			method : 'POST',
			skipAuthorization : true,
			url:  REST_API + 'login',
            data: "nombreusuario=" + user.nombreusuario + "&contrasena=" + user.contrasena,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}

		}).then(function(data) {
			defered.resolve(data);
		}, function  (error) {
			defered.reject(error);
		});

		return defered.promise;
	}

	function registrarSesion(token) {
		var decodificado;
		if(token) {
			decodificado  = jwtHelper.decodeToken(token);

			store.set('token', token);
		}

		return decodificado.rol;
	}

	function logout() {
		//set null al usuario, borrar el token
		store.remove('token');
	}
	//eliminar este metodo
	function getToken() {
		//para ver si se elimina
	}

	function tieneSesion() {
		//no token pasado y existe el token y usuario
		//TODO verificar si el token ha expirado
		var token = store.get('token');

		return token ? true : false;
	}

	function esAdmin() {
		//verificar si es administrador el usuario
		var token = store.get('token');
		if(!token) {
			return false;
		}
		var usuario = jwtHelper.decodeToken(token);

		return usuario.rol == "Administrador" ? true : false;
	}

	function esCliente() {
		//verificar si en cliente el administrador
		var token = store.get('token');
		if(!token) {
			return false;
		}
		var usuario = jwtHelper.decodeToken(token);

		return usuario.rol == "Cliente" ? true : false;
	}
}