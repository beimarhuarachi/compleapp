<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservaModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}
	


	public function obtenerReservasCampo($idcampo, $inicio, $fin) {
		$consulta = $this->db->select("r.IdReserva as id, r.IdCampo as idcampo, r.Inicio as inicio
									 , r.Fin as fin, t.NombreTipo as nombretipo")
							 ->from("reserva as r")
							 ->join("tiporeserva as t", "r.IdTipoReserva = t.IdTipo")
							 ->where("IdCampo", $idcampo)
							 ->where("Inicio >=", $inicio)
							 ->where("Inicio <=", $fin)
							 ->get();

		return $consulta->result_array();
	}
}

/* End of file reservaModel.php */
/* Location: ./application/models/reservaModel.php */