<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

class DisciplinaController extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('disciplinaModel');
	}

	public function index_get() {
		$disciplinas = $this->disciplinaModel->obtenerDisciplinas();

		if(is_null($disciplinas)) {
			$this->response(array("response"=>"no existen disciplinas"), 404);
		}

		$this->response(array("response"=>$disciplinas), 200);
	}

}

/* End of file disciplinaController.php */
/* Location: ./application/controllers/disciplinaController.php */