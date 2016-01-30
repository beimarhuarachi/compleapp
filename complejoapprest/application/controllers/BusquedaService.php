<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class BusquedaService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('busquedaModel');
	}

	public function realizarBusqueda_get() {
		$tipo = $this->get('tipobusqueda');
		$textobusqueda = $this->get('textobusqueda');

		$complejos = $this->busquedaModel->obtenerResultados($textobusqueda, $tipo);

		if($complejos === NULL) {
			$this->response(array("response"=>"Hay un error en la consulta"), 412);
		}

		$this->response(array("response"=>$complejos), 200);
	}
}

/* End of file BusquedaService.php */
/* Location: ./application/controllers/BusquedaService.php */