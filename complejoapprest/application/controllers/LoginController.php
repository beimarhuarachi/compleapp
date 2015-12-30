<?php
//para usar carbon necesita esto
use Carbon\Carbon;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/JWT.php";
require APPPATH . "/libraries/Carbon.php";

class LoginController extends REST_Controller {

	public function __construct() {
		parent::__construct();
	}

	public function index_get() {
		echo "fsda";
	}

	public function muestra() {
		$clave = "beimarhuarachi";
		$user = array(
			'nombre' => 'beimar',
			'apellido' => 'huarachi'
			);

		$jwt = JWT::encode($user, $clave, 'HS256');
		echo $jwt;

		echo "Login";
		$ahora =  Carbon::now('America/La_Paz');
		$otra  = Carbon::now('America/Halifax');
		$hoydia = Carbon::now();


		echo $ahora;
		echo "<br>";
		echo $hoydia;
		echo "<br>";
		echo $otra;
		echo "<br>";
		echo (new Carbon('2015-12-12'));
		$Y2K = Carbon::create(2000, 1, 1, 0, 0, 0);
		echo "<br>";
		echo $Y2K;
		echo "<br>";
		echo Carbon::parse('2015-02-12 12:00:12');
	}

}

/* End of file loginController.php */
/* Location: ./application/controllers/loginController.php */