<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "libraries/REST_Controller.php";

class ClienteService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('clienteModel');
	}
	
	public function index_get() {
		$clientes = $this->clienteModel->retornarClientes();

		$this->response(array("response"=>$clientes), 200);
	}

}

/* End of file clienteService.php */
/* Location: ./application/controllers/clienteService.php */