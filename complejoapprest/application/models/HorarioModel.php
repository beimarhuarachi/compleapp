<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class HorarioModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function obtenerHorarios() {
		$consulta = $this->db->select('IdHorario as idhorario, HoraInicio as inicio, HoraFin as fin')
							 ->from('horario')
							 ->get();

		return $consulta->result_array();
	}

}

/* End of file HorarioModel */
/* Location: ./application/models/HorarioModel */