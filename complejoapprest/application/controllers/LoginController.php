<?php
//para usar carbon necesita esto
use Carbon\Carbon;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";
require APPPATH . "/libraries/JWT.php";
require APPPATH . "/libraries/Carbon.php";

class LoginController extends REST_Controller {

	/**
	 * Clave de la aplicacion
	 * @var [string]
	 */
	private $clave;

	/**
	 * Tiempo otorgado para la duracion de la sesion
	 * @var [int]
	 */
	private $tiempoDuracion;

	public function __construct() {
		parent::__construct();
		$this->clave = "complejodeportivo";
		$this->tiempoDuracion = 300;

		$this->load->library("encrypt");
		$this->load->model("loginModel");
	}

	/**
	 * Funcion que verifica si existe el usuario, si existe retorna el token
	 * @return [json] [retorna la respuesta, sea satisfactoria o mala]
	 */
	public function login_post() {
		$nombreusuario = $this->post("nombreusuario");
		$contrasena = $this->post("contrasena");

		if(is_null($nombreusuario) && is_null($contrasena)) {
			$this->response(array("error"=>"Existe un error en la peticion"), 400);
		}

		$usuario = $this->loginModel->esUsuario($nombreusuario, $contrasena);

		if($usuario === false) {
			$this->response(array("error"=>"Ese usuario no existe"), 404);
		}

		$usuario->iat = time();
		$usuario->exp = time() + $this->tiempoDuracion;
		
		$jwt = JWT::encode($usuario, $this->clave, 'HS256');

		$this->response(array("token"=>$jwt), 200);
	}

	public function index_get() {

		$password = "huarachi";
		$llave = "beimar";



		//Para hacer control de password encriptado
		$encriptado = sha1($password);

		echo $encriptado;
	}

	public function muestra() {
		//$decoded =  JWT::decode($jwt, $this->clave, 'HS256');

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

		//Es para obtener los datos de cualquier peticion(EL CLIENTE TIENE QUE ENVIAR LOS DATOS EN FORMATO JSON)
		//SI NOS ENVIA EN FORMATO DE FORMULARIO EL ACCESO SERIA DIRECTO
		//$entityBody = file_get_contents('php://input');	
		//$objeto = json_decode($entityBody);
	}

}

/* End of file loginController.php */
/* Location: ./application/controllers/loginController.php */