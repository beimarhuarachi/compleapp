<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReportesModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function ganancias($idcomplejo, $gestion) {
		$consulta = $this->db->select("EXTRACT(MONTH FROM r.Inicio) as mes, SUM(r.PrecioReserva) as generado, 
			COUNT(r.IdReserva) as numeroreservas")
							 ->from("reserva as r")
							 ->join("campo as c", "c.IdCampoDeportivo = r.IdCampo")
							 ->join("complejo as com", "com.IdComplejo = c.IdComplejo")
							 ->where("c.IdComplejo", $idcomplejo)
							 ->where("r.Confirmado", 1)
							 ->where("r.ReservaEspecial", 0)
							 ->where("EXTRACT(YEAR FROM r.Inicio) =", $gestion)
							 ->group_by("EXTRACT(MONTH FROM r.Inicio)")
							 ->order_by("mes")
							 ->get();


		return $consulta->result_array();
	}

	public function camposPopulares($idcomplejo, $gestion) {
		$consulta = $this->db->select("COUNT(c.IdCampoDeportivo) as numeroreservas,
			SUM(PrecioReserva) as totalgenerado, c.NombreCampo as nombrecampo")
							 ->from("reserva as r")
							 ->join("campo as c", "c.IdCampoDeportivo = r.IdCampo")
							 ->where("c.IdComplejo", $idcomplejo)
							 ->where("r.Confirmado", 1)
							 ->where("r.ReservaEspecial", 0)
							 ->where("EXTRACT(YEAR FROM r.Inicio) =", $gestion)
							 ->group_by("c.IdCampoDeportivo")
							 ->get();


		return $consulta->result_array();
	}

	public function obtenerGestiones($idcomplejo) { 
		$consulta = $this->db->select("EXTRACT(YEAR FROM r.Inicio) as gestion")
							 ->from("reserva as r")
							 ->join("campo as c", "c.IdCampoDeportivo = r.IdCampo")
							 ->where("c.IdComplejo", $idcomplejo)
							 ->where("r.Confirmado", 1)
							 ->where("r.ReservaEspecial", 0)
							 ->group_by("EXTRACT(YEAR FROM r.Inicio)")
							 ->order_by("EXTRACT(YEAR FROM r.Inicio)", "DESC")
							 ->get();


		return $consulta->result_array();
	}

}

/* End of file reportesModel.php */
/* Location: ./application/models/reportesModel.php */