<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginModel extends CI_Model {

	public function __construct() {
		parent::__construct();
	}

	public function esUsuario($nombreusuario, $contrasena) {
		$consulta = $this->db->select('u.IdUsuario as idusuario, u.NombreUsuario as nombreusuario, u.Correo as correo, r.NombreRol as rol')
		->from("usuario as u, rol as r")
		->where("u.IdRol = r.IdRol AND u.NombreUsuario = '".$nombreusuario."' AND u.Contrasena = '". $contrasena."'")
		->get();

		if($consulta->num_rows() === 1) {
			return $consulta->row();
		}

		return false;
	}

	/**
	 * No utilizado
	 */
	public function retornarAdmin($nombreusuario, $contrasena) {
		$consulta = $this->db->select('u.IdUsuario as idusuario, c.IdComplejo as idcomplejo, u.NombreUsuario as usuario,r.NombreRol as rol, c.NombreComplejo as complejo')
		->from("usuario as u, rol as r, complejo as c")
		->where("u.IdRol = r.IdRol AND u.IdUsuario = c.IdUsuario AND u.NombreUsuario = '".$nombreusuario."' AND u.Contrasena = '". $contrasena."'")
		->get();

		if($consulta->num_rows() === 1) {
			return $consulta->row();
		}

		return false;
	}

}

/* End of file loginModel.php */
/* Location: ./application/models/loginModel.php */