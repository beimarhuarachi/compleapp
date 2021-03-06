<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FacturaModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function crearFactura($idcliente, $fecha) {
		$datos = array(
				"Fecha" => $fecha,
				"IdCliente" => $idcliente
			);

		$this->db->insert("factura", $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;
	}

	public function obtenerCliente($idfactura) {
		$consulta = $this->db->select("*")
							 ->from("factura as f")
							 ->join("cliente as c", "f.IdCliente = c.IdCliente")
							 ->where("NumeroFactura", $idfactura)
							 ->get();

		if($consulta->num_rows() === 1) {
			return $consulta->row();	
		} 

		return NULL;
	}

	public function obtenerReservas($idfactura) {
		$consulta = $this->db->select("*")
							 ->from("factura as f")
							 ->join("reserva as r", "r.IdFactura = f.NumeroFactura")
							 ->join("campo as c", "c.IdCampoDeportivo = r.IdCampo")
							 ->where("NumeroFactura", $idfactura)
							 ->get();

		if($consulta->num_rows() >= 1) {
			return $consulta->result_array();	
		} 

		return NULL;
	}

	/**
	 * hay un bicho
	 */
	public function confirmarFactura($idfactura, $fecha) {
		$consulta = $this->db->set('fecha', $fecha)
							 ->where('NumeroFactura', $idfactura)
							 ->update('factura');

		if($this->db->affected_rows() >= 0) {
			return TRUE;
		}

		return NULL;
	}
}

/* End of file facturaModel.php */
/* Location: ./application/models/facturaModel.php */