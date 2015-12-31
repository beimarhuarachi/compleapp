<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php"; 

class SuperficieController extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('superficieModel');
	}

	public function index_get() {
		$superficies = $this->superficieModel->obtenerSuperficies();

		if(is_null($superficies)) {
			$this->response(array("response"=>"No se encontraron superficies"), 404);
		}

		$this->response(array("response" => $superficies), 200);
	}

}

/* End of file superficieController.php */
/* Location: ./application/controllers/superficieController.php */