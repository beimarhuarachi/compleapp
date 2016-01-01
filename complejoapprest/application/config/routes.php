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

/**
 * rutas para el servicio de campos=> para un complejo
 */
$route['complejos/(:num)/campos']['get'] = 'campoService/index/$1';
$route['complejos/(:num)/campos']['post'] = 'campoService/guardar/$1';