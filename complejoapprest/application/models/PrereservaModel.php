<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PrereservaModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function registrarPrereserva($prereserva, $idfactura) {
		$datos = array(
				"FechaRegistro" => $prereserva['fecha'],
				"IdCampo" => $prereserva['idcampo'],
				//"IdCliente" => $reserva['idcliente'],
				"Inicio" => $prereserva['inicio'],
				"Fin" => $prereserva['fin'],
				"IdFactura" => $idfactura,
				"Confirmado" => $prereserva['confirmado'],
				"PrecioReserva" => $prereserva['precio'],
				"IdTipoReserva" => $prereserva['idtiporeserva'] ,
				"ExpiracionPre" => $prereserva['expiracion']
			);

		$this->db->insert("reserva", $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;		
	}

	public function tienePrereservas($idcliente) {
		$consulta = $this->db->select("*")
							 ->from("cliente as c")
							 ->join("factura as f", "f.IdCliente = c.IdCliente")
							 ->join("reserva as r", "r.IdFactura = f.NumeroFactura")
							 ->where("c.IdCliente", $idcliente)
							 ->where("r.Confirmado", 0)
							 ->get();

		if($consulta->num_rows() >= 1) {
			return TRUE;
		}

		return FALSE;
	}

}

/* End of file prereservaModel.php */
/* Location: ./application/models/prereservaModel.php */