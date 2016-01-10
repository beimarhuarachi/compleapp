<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";

class UsuarioService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model("usuarioModel");
	}

	public function getFunciones_get($idusuario) {
		$usuario = Verificador::verificacionCompleta($this);

		$funciones = $this->usuarioModel->retornarFunciones($idusuario);


		$this->response(array("response"=>$funciones), 200);
	}
}

/* End of file usuarioService.php */
/* Location: ./application/controllers/usuarioService.php */