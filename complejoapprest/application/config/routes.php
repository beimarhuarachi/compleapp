<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


/**el archivo de idiomas de rest server no olvidar y el archivo rest.php en config(sin esto causa problemas)
 * Rutas para el proyecto NO OLVIDAR CONFIGURAR EL ARCHIVO HTACCESS, BASE DE DATOS Y RUTAS, AUTOLOAD PARA BD
 */
//Primer parametro => es la url
//Segundo parametro => es el tipo de peticion(el verbo)
//Le decimos que cuando la url sea books y el verbo get => nos redireccione 
//a books/index(donde books es controlador y index un metodo)
//$route['books']['get'] = "books/index";
 

/**
 * rutas para login
 */
$route['login']['get'] = "loginController/index";

$route['login']['post'] = "loginController/login";


/**
 * rutas para el servicio de disciplinas
 */
$route['disciplinas']['get'] = 'disciplinaController/index';

/*
 * rutas para el servicio de superficies
 */
$route['superficies']['get'] = 'superficieController/index';

/**
 * rutas para el servicio de complejos
 */

$route['complejos']['get'] = 'complejoService/index';
$route['complejos/(:num)']['get'] = 'complejoService/retornarComplejo/$1';
$route['complejos']['post'] = 'complejoService/registrar';

/**
 * rutas para el servicio de campos=> para un complejo
 */
$route['complejos/(:num)/campos']['get'] = 'campoService/index/$1';

$route['complejos/(:num)/campos/(:num)']['get'] = 'campoService/getCampo/$1/$2';

$route['complejos/(:num)/campos/(:num)']['post'] = 'campoService/actualizarCampo/$1/$2';

$route['complejos/(:num)/campos']['post'] = 'campoService/guardar/$1';

/**
 * rutas para el servicio de clientes => para un complejo, para clientes de manera publica
 */
$route['clientes']['get'] = 'clienteService/index';
$route['clientes']['post'] = 'clienteService/guardar';

$route['clientes/(:num)/complejos']['get'] = 'clienteService/obtenerComplejos/$1';

/**
 * rutas para el servicio de reservas
 * recibe dos parametro mas aparte de num, uno es inicio y el otro fin
 */
$route['campos/(:num)/reservas']['get'] = 'reservaService/index/$1';
$route['campos/(:num)/reservas']['post'] = 'reservaService/guardar/$1';

/**
 * rutas para el servico de reservas especiales
 */
$route['campos/(:num)/reservasEspeciales']['post'] = 'reservaEspecialService/guardar/$1';

/**
 * rutas para el servicio de facturas
 */
$route['facturas/(:num)/clientes']['get'] = 'facturaService/getClientes/$1';
$route['facturas/(:num)/reservas']['get'] = 'facturaService/getReservas/$1';

/**
 * rutas para usuario, y funciones, num es el id del usario
 */
$route['usuarios/(:num)/funciones']['get'] = 'usuarioService/getFunciones/$1';

/**
 * rutas para las prereservas
 */
$route['prereservas']['post'] = 'prereservaService/guardar';
$route['prereservas']['get'] = 'prereservaService/getNumero';

/**
 * rutas para servicio de prereservas de un complejo
 * num es el id del usuario
 */
$route['complejos/(:num)/prereservas']['get'] = 'complejoService/obtenerPrereservas/$1';
//num el id del complejo
$route['complejos/(:num)/prereservas']['put'] = 'complejoService/confirmarPrereserva/$1';

$route['complejos']['get'] = 'complejoService/obtenerComplejoDeportivo';


/**
 * rutas para los horarios
 */
$route['horarios']['get'] = 'horariosService/obtener';

/**
 * rutas para los reportes
 * Solo contiene metodos GET, pero requieren permisos
 */
$route['reportes/(:num)']['get'] = 'reportesService/camposPopulares/$1';

$route['reportes/ganancias/(:num)']['get'] = 'reportesService/ganancias/$1';

$route['reportes/reporteDiario']['get'] = 'reportesService/reporteDiario';

$route['complejos/(:num)/gestiones']['get'] = 'reportesService/gestiones/$1';

/**
 * rutas para el servicio de busquedas
 */
$route['busqueda']['get'] = 'busquedaService/realizarBusqueda';





