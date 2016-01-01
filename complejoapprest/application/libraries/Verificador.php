<?php
require APPPATH . "/libraries/JWT.php";

class Verificador {

	public static function tieneAutorizacion() {
		$headers = apache_request_headers();

		if(!isset($headers["Authorization"]) || empty($headers["Authorization"])) {
			return false;
		}

		return true;
	}

	public static function getUsuario() {
		$headers = apache_request_headers();

		$token = explode(" ", $headers["Authorization"]);

		$usuario = JWT::decode(trim($token[1],'"'), "complejodeportivo", 'HS256');	
		
		return $usuario;	
	}

	public static function verificacionCompleta($controller) {
		if(!self::tieneAutorizacion()) {
			$controller->response(array("response"=> "No tiene autorizacion"), 401);
		}

		$usuario = self::getUsuario();
		$controller->load->model('loginModel');
		if(!$controller->loginModel->verificarUsuario($usuario->idusuario, $usuario->correo)) {
			$controller->response(array("response"=> "No tiene autorizacion"), 401);
		}

		return $usuario;
	}


}