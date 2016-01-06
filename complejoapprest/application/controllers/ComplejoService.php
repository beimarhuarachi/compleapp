<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

class ComplejoService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('complejoModel');
	}

	public function index_get() {
		$this->response(array("response"=> "complejos varios"), 200);
	}

	//id del usuario
	public function retornarComplejo_get($id) {
		if(is_null($id)) {
			$this->response(array("response"=>"La peticion tiene errores"), 400);
		}

		$complejo = $this->complejoModel->obtenerComplejoPublico($id);

		if($complejo == false) {
			$this->response(array("response"=>"El complejo no existe"), 404);
		}
		
		$this->response(array("response"=>$complejo), 200);
	}

}

/* End of file complejoService.php */
/* Location: ./application/controllers/complejoService.php */