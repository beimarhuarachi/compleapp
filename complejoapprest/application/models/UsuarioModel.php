<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class UsuarioModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function existeUsuario($usuario) {
		$correo = $usuario['email'];

		$consulta = $this->db->select("*")
							 ->from("usuario")
							 ->where("Correo", $correo)
							 ->get();

		if($consulta->num_rows() >= 1) {
			return TRUE;
		}

		return FALSE;
	}	

	public function crearUsuario($usuario, $idrol) {
		$datos = array(
				"Correo" => $usuario['email'],
				"Contrasena" => $usuario['ci'],
				"IdRol" => $idrol,
				"NombreUsuario" => $usuario['email']
			);

		$this->db->insert("usuario", $datos);

		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}

		return NULL;

	}
		
	public function retornarFunciones($idusuario) {
		$consulta = $this->db->select("f.NombreFuncion as nombre, f.Icono as icono, f.EstadoUrl as estado")
							 ->from("usuario as u")
							 ->join("rol as r", "r.IdRol = u.IdRol")
							 ->join("funcion as f", "f.IdRol = r.IdRol")
							 ->where("u.IdUsuario", $idusuario)
							 ->order_by("f.IdFuncion", "ASC")
							 ->get();

		return $consulta->result_array();

	}	

}

/* End of file usuarioModel.php */
/* Location: ./application/models/usuarioModel.php */