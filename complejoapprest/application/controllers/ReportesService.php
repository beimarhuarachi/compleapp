<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/Verificador.php";

class ReportesService extends REST_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('reportesModel');
	}

	public function camposPopulares_get($idcomplejo) {
		$usuario = Verificador::verificacionCompleta($this);

		// $gestion = 2016;
		$gestion = $this->get('gestion');

		$reporteCampos = $this->reportesModel->camposPopulares($idcomplejo, $gestion);

		$this->response(array("response"=>$reporteCampos), 200);
	}

	public function gestiones_get($idcomplejo) {
		$usuario = Verificador::verificacionCompleta($this);

		$gestionesObjects = $this->reportesModel->obtenerGestiones($idcomplejo);

		$gestiones = array();
		foreach ($gestionesObjects as $gestion) {
			array_push($gestiones, $gestion['gestion']);
		}

		$this->response(array("response"=>$gestiones), 200);
	}

	public function ganancias_get($idcomplejo) {
		$usuario = Verificador::verificacionCompleta($this);

 		$gestion = $this->get('gestion');

 		$ganancias = $this->reportesModel->ganancias($idcomplejo, $gestion);

		$this->response(array("response"=>$ganancias), 200);
	}

}

/* End of file reportesService.php */
/* Location: ./application/controllers/reportesService.php */