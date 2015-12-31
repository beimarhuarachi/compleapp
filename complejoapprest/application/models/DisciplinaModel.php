<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DisciplinaModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function obtenerDisciplinas() {
		$consulta = $this->db->select("IdDisciplina as id,NombreDisciplina as nombre")
		->from("disciplina")->get();

		if($consulta->num_rows() >= 1) {
			return $consulta->result_array();
		}

		return NULL;
	}

}

/* End of file disciplinaModel.php */
/* Location: ./application/models/disciplinaModel.php */