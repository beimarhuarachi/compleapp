<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";
require APPPATH . '/libraries/Uploader.php';

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

	public function getCampo_get($idcomplejo, $idcampo) {
		$campo = $this->campoModel->retornarCampoPorId($idcampo);

		if(is_null($idcampo)) {
			$this->response(array("response" => "La peticion tiene errores"), 400);
		}

		if($campo === false) {
			$this->response(array("response" => "No se encontro ese campo deportivo"), 404);
		}

		$this->response(array("response" => $campo), 200);
	}

	public function guardar_post($idcomplejo) {

		$usuario = Verificador::verificacionCompleta($this);
		

		$nombre = $this->post('nombre');
		$precio = $this->post('precio');
		$disciplina = $this->post('disciplina');
		$superficie = $this->post('superficie');
		$imagen = $this->post('imagen');
		$idhorario = $this->post('idhorario');


		$nombrearchivo = Uploader::subirArchivo($nombre, $this);

		$campoId = $this->campoModel->guardarCampoDeComplejo($usuario->idusuario, $idcomplejo, $nombre, 
					$precio, $nombrearchivo, $disciplina, $superficie, $idhorario);

		$usuario->iat = time();
		$usuario->exp = time() + 300;
		
		$jwt = JWT::encode($usuario, "complejodeportivo", 'HS256');

		if(is_null($campoId)) {
			$this->response(array("response" => "No se pudo crear"), 404);			
		} else {
			$this->response(array("response" => $campoId, "token"=> $jwt), 201);
		}

	}

	public function actualizarCampo_post($idcomplejo, $idcampo) {
		$usuario = Verificador::verificacionCompleta($this);

		$nombre = $this->post('nombre');
		$precio = $this->post('precio');
		$disciplina = $this->post('disciplina');
		$superficie = $this->post('superficie');
		$imagen = $this->post('imagen');
		$idhorario = $this->post('idhorario');
		
		$nombrearchivo = Uploader::subirArchivo($nombre, $this);

		$actualizado = $this->campoModel->actualizarCampo($idcampo, $nombre, $precio, $disciplina, 
			$nombrearchivo,$superficie, $idhorario);

		if(is_null($actualizado)) {
			$this->response(array('response' => 'No se actualizo ningun dato'), 412);
		}

		$this->response(array("response" => $idcampo), 200);
	}

}

/* End of file campoService.php */
/* Location: ./application/controllers/campoService.php */