<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BusquedaModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}	

	public function obtenerResultados($textobusqueda, $tipobusqueda) {
		$POR_COMPLEJO = 'complejo';
		$POR_DISCIPLINA = 'disciplina';

		switch ($tipobusqueda) {
			case $POR_COMPLEJO :
				return $this->buscarPorComplejo($textobusqueda);
				break;
			case $POR_DISCIPLINA :
				return $this->buscarPorDisciplina($textobusqueda);
				break;
			default:
				return null;
				break;
		}		
	}

	public function buscarPorComplejo($textobusqueda) {
		$consulta = $this->db->select("IdComplejo as id, Direccion as direccion, Telefono as telefono
			, Ciudad as ciudad, ComoLlegar as comollegar, FotoPortada as foto, NombreComplejo as nombre")
							 ->from("complejo")
							 ->like("NombreComplejo", $textobusqueda)
							 ->get();

		return $consulta->result_array();
	}

	public function buscarPorDisciplina($textobusqueda) {
		$consulta = $this->db->select("com.IdComplejo as id, com.Direccion as direccion, com.Telefono as telefono
			, com.Ciudad as ciudad, com.ComoLlegar as comollegar, com.FotoPortada as foto, com.NombreComplejo as nombre")
							 ->from("complejo as com")
							 ->join("campo as c", "c.IdComplejo = com.IdComplejo")
							 ->join("disciplina as d", "c.IdDisciplina = d.IdDisciplina")
							 ->like("d.NombreDisciplina", $textobusqueda)
							 ->get();

		return $consulta->result_array();
	}

}

/* End of file BusquedaModel.php */
/* Location: ./application/models/BusquedaModel.php */