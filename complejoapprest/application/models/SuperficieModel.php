<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SuperficieModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function obtenerSuperficies() {
		$consulta = $this->db->select("IdSuperficie as id, NombreSuperficie as nombre")
		->from('superficie')->get();

		if($consulta->num_rows() >= 1) {
			return $consulta->result_array();
		}

		return NULL;
	}

}

/* End of file superficieModel.php */
/* Location: ./application/models/superficieModel.php */