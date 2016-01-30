<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class BusquedaService extends REST_Controller {

	public function __construct() {
		parent::__construct();
	}

	public function realizarBusqueda_get() {
		$tipo = $this->get('tipobusqueda');
		$textobusqueda = $this->get('textobusqueda');

		$this->response(array("response"=>'=='.$tipo.'=='.$textobusqueda), 200);
	}
}

/* End of file BusquedaService.php */
/* Location: ./application/controllers/BusquedaService.php */