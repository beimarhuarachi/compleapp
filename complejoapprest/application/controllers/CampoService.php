<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";

class CampoService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('campoModel');
	}


	public function index_get($id) {

		if(is_null($id)) {
			$this->response(array("response" => "La peticion tiene errores"), 400);
		}

		$campos = $this->campoModel->retornarCamposPorIdComplejo($id);

		if($campos === false) {
			$this->response(array("response" => "No se encuentran campos"), 404);
		}

		$this->response(array("response"=>$campos), 200);
	}

	public function guardar_post($idcomplejo) {

		$usuario = Verificador::verificacionCompleta($this);
		

		$nombre = $this->post('nombre');
		$precio = $this->post('precio');
		$disciplina = $this->post('disciplina');
		$superficie = $this->post('superficie');
		$imagen = $this->post('imagen');


		$config['upload_path']          = './uploads/';
		$config['allowed_types']        = 'gif|jpg|png|pdf';
		$config['max_size']             = 2048;
		$config['max_width']            = 1024;
		$config['max_height']           = 768;
		$config['file_name']           = $nombre;

		$this->load->library('upload', $config);
		$nombrearchivo = "uploads/imagen001.jpg";

		if ( !$this->upload->do_upload('imagen')) {
			$error = array('error' => $this->upload->display_errors());
		} else {
			$datos = $this->upload->data();
			$nombrearchivo = "uploads/".$datos['file_name'];
		}

		$campoId = $this->campoModel->guardarCampoDeComplejo($usuario->idusuario, $idcomplejo, $nombre, $precio, $nombrearchivo, $disciplina, $superficie);

		$usuario->iat = time();
		$usuario->exp = time() + 300;
		
		$jwt = JWT::encode($usuario, "complejodeportivo", 'HS256');

		if(is_null($campoId)) {
			$this->response(array("response" => "No se pudo crear"), 404);			
		} else {
			$this->response(array("response" => $usuario, "token"=> $jwt), 200);
		}

	}


}

/* End of file campoService.php */
/* Location: ./application/controllers/campoService.php */