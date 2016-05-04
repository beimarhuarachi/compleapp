-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2016 a las 16:33:19
-- Versión del servidor: 5.6.26
-- Versión de PHP: 5.5.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `complejodeportivo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campo`
--

CREATE TABLE IF NOT EXISTS `campo` (
  `IdCampoDeportivo` int(11) NOT NULL,
  `IdComplejo` int(11) NOT NULL,
  `NombreCampo` varchar(255) DEFAULT NULL,
  `PrecioPorHora` int(11) NOT NULL,
  `RutaFotoCampo` varchar(255) DEFAULT NULL,
  `IdDisciplina` int(11) NOT NULL,
  `IdSuperficie` int(11) NOT NULL,
  `IdHorario` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `campo`
--

INSERT INTO `campo` (`IdCampoDeportivo`, `IdComplejo`, `NombreCampo`, `PrecioPorHora`, `RutaFotoCampo`, `IdDisciplina`, `IdSuperficie`, `IdHorario`) VALUES
(1, 1, 'CanchaFutbol1', 200, 'uploads/imagen001.jpg', 1, 3, 4),
(4, 1, 'CanchaBacket', 80, 'uploads/imagen001.jpg', 5, 2, 3),
(29, 4, 'CanchaFrontron1', 70, 'uploads/imagen001.jpg', 6, 1, 1),
(30, 1, 'CanchaTenis', 90, 'uploads/CanchaTenis.jpg', 7, 1, 7),
(31, 1, 'CampoNuevo', 100, 'uploads/CampoNuevo.jpg', 5, 3, 6),
(32, 1, 'das', 45, 'uploads/imagen001.jpg', 6, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `IdCliente` int(11) NOT NULL,
  `IdComplejo` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `Nombres` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `NumeroCI` int(11) NOT NULL,
  `Telefono` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`IdCliente`, `IdComplejo`, `IdUsuario`, `Nombres`, `Apellidos`, `NumeroCI`, `Telefono`) VALUES
(1, 1, 3, 'Ely', 'Mamani Quispe', 444444, 4567891),
(2, 1, 4, 'Alvaro Tomas', 'Torrez Garcia', 4567812, 4567891),
(3, 1, 5, 'Maria', 'Lopez', 7894561, 4567891),
(4, 1, 6, 'Ricardo Arturo', 'Sanchez Nogales', 4512789, 4567984),
(5, 1, 7, 'Samuel', 'Nina Valda', 7845613, 4567981),
(6, 4, 8, 'Eliana', 'Mamani Ortiz', 789455, 4561237),
(7, 4, 9, 'Herminia', 'Zapata', 444447, 4567891),
(8, 1, 10, 'Beimar Huarachi', 'mamani', 456789, 4567891),
(9, 1, 32, 'Alberto', 'Juarez Perez', 7894556, 4561237);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `complejo`
--

CREATE TABLE IF NOT EXISTS `complejo` (
  `Longitud` double DEFAULT NULL,
  `Latitud` double DEFAULT NULL,
  `IdComplejo` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Telefono` int(11) DEFAULT NULL,
  `NombreAdministrador` varchar(255) DEFAULT NULL,
  `ApellidosAdministrador` varchar(255) DEFAULT NULL,
  `NumeroCI` int(11) DEFAULT NULL,
  `Ciudad` varchar(255) DEFAULT NULL,
  `ComoLlegar` varchar(255) DEFAULT NULL,
  `FotoPortada` varchar(255) DEFAULT NULL,
  `NombreComplejo` varchar(255) DEFAULT NULL,
  `Pais` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `complejo`
--

INSERT INTO `complejo` (`Longitud`, `Latitud`, `IdComplejo`, `IdUsuario`, `Direccion`, `Telefono`, `NombreAdministrador`, `ApellidosAdministrador`, `NumeroCI`, `Ciudad`, `ComoLlegar`, `FotoPortada`, `NombreComplejo`, `Pais`) VALUES
(-66.14277005195618, -17.394278821541874, 1, 1, 'Av Pdte Manuel Isidoro Belzu entre Sucre y Guillermo Urquidi', 4567891, 'Beimar Eninfo', 'Huarachi Mamani', 8674461, 'Cochabamba', 'Tomar la linea Linea 03 o la linea J', 'uploads/complejoportada.jpg', 'Complejo San Simon', 'Bolivia'),
(-68.12462210655212, -16.497529785498504, 4, 2, 'Avenida Saavedra esquina casimiro corrales', 4562134, 'Jorge', 'Huarachi Mamani', 46578125, 'Departamento Autónomo de La Paz', 'Linea 01', 'uploads/complejoportada.jpg', 'Complejo Unideportivo Chaski', 'Bolivia'),
(-66.13065719604492, -17.40830462902467, 21, 28, 'CIRCUITO BOLIVIA', 4561321, 'nombres', 'apellidos', 4567890, 'Cochabamba', 'LLEGAR A PIE', 'uploads/imagen001.jpg', 'Club Aurora', 'Bolivia'),
(-63.180248737335205, -17.77132869123981, 22, 29, 'Av Cristóbal De Mendoza entre Av Beni y Cristo Redentor', 3523245, 'Geman', 'Torrico Vega', 4657891, 'Santa Cruz', 'Llegar temprano por el micro "C"', 'uploads/imagen001.jpg', 'Academia Tauichi', 'Bolivia'),
(0, 0, 23, 30, 'calle orinoca', 4561317, 'ultimos', 'ultimos', 456789, NULL, 'fadfdadfs', 'uploads/imagen001.jpg', 'ultimo', NULL),
(-66.14816665649414, -17.378029137233764, 24, 31, 'Av. Circuito bolivia', 4444578, 'Eduardo', 'Campero', 111111, NULL, 'se debe tomar el micro B', 'uploads/Complejo_Willsterman.jpg', 'Complejo Willsterman', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disciplina`
--

CREATE TABLE IF NOT EXISTS `disciplina` (
  `IdDisciplina` int(11) NOT NULL,
  `NombreDisciplina` varchar(255) NOT NULL,
  `PrecioMinimo` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `disciplina`
--

INSERT INTO `disciplina` (`IdDisciplina`, `NombreDisciplina`, `PrecioMinimo`) VALUES
(1, 'Futbol', 20),
(2, 'Futbol 8', 20),
(3, 'Futsal', 10),
(4, 'Hockey', 50),
(5, 'Bascket', 30),
(6, 'Fronton', 20),
(7, 'Tenis', 50),
(8, 'Voleibol', 30),
(9, 'Esgrima', 50),
(10, 'Karate', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE IF NOT EXISTS `factura` (
  `NumeroFactura` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Serie` varchar(255) DEFAULT NULL,
  `IdCliente` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`NumeroFactura`, `Fecha`, `Serie`, `IdCliente`) VALUES
(30, '2016-01-12', NULL, 2),
(31, '2016-01-12', NULL, 2),
(32, '2016-01-15', NULL, 2),
(33, '2016-01-12', NULL, 6),
(34, '2016-01-12', NULL, 6),
(35, '2016-01-12', NULL, 3),
(36, '2016-01-12', NULL, 3),
(37, '2016-01-12', NULL, 5),
(38, '2016-01-12', NULL, 5),
(39, '2016-01-14', NULL, 5),
(40, '2016-01-14', NULL, 6),
(41, '2016-01-20', NULL, 6),
(42, '2016-01-20', NULL, 7),
(43, '2016-01-20', NULL, 2),
(44, '2016-01-20', NULL, 3),
(45, '2016-01-20', NULL, 6),
(46, '2016-01-20', NULL, 4),
(47, '2016-01-24', NULL, 4),
(48, '2016-01-24', NULL, 8),
(49, '2016-01-26', NULL, 2),
(50, '2016-01-26', NULL, 5),
(51, '2016-01-26', NULL, 7),
(52, '2016-01-26', NULL, 3),
(53, '2016-01-26', NULL, 7),
(54, '2016-01-26', NULL, 2),
(55, '2016-01-26', NULL, 1),
(56, '2016-01-29', NULL, 2),
(57, '2016-01-29', NULL, 1),
(58, '2016-01-29', NULL, 1),
(59, '2016-01-30', NULL, 1),
(60, '2016-01-30', NULL, 2),
(61, '2016-01-31', NULL, 2),
(62, '2016-01-31', NULL, 6),
(63, '2016-01-31', NULL, 4),
(64, '2016-01-31', NULL, 4),
(65, '2016-01-31', NULL, 6),
(66, '2016-01-31', NULL, 5),
(67, '2016-01-31', NULL, 1),
(68, '2016-01-31', NULL, 8),
(69, '2016-01-31', NULL, 3),
(70, '2016-01-31', NULL, 7),
(71, '2016-01-31', NULL, 6),
(72, '2016-01-31', NULL, 6),
(73, '2016-01-31', NULL, 6),
(74, '2016-02-01', NULL, 2),
(75, '2016-02-03', NULL, 4),
(76, '2016-02-19', NULL, 2),
(77, '2016-02-24', NULL, 4),
(78, '2016-02-25', NULL, 6),
(79, '2016-02-25', NULL, 7),
(80, '2016-02-25', NULL, 5),
(81, '2016-03-07', NULL, 5),
(82, '2016-03-26', NULL, 2),
(83, '2016-03-26', NULL, 1),
(84, '2016-03-26', NULL, 3),
(85, '2016-03-26', NULL, 4),
(86, '2016-03-26', NULL, 5),
(87, '2016-03-26', NULL, 2),
(88, '2016-03-27', NULL, 9),
(89, '2016-03-27', NULL, 5),
(90, '2016-03-27', NULL, 8),
(91, '2016-05-04', NULL, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcion`
--

CREATE TABLE IF NOT EXISTS `funcion` (
  `IdFuncion` int(11) NOT NULL,
  `NombreFuncion` varchar(100) NOT NULL,
  `EstadoUrl` varchar(100) NOT NULL,
  `IdRol` int(11) DEFAULT NULL,
  `Icono` varchar(50) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `funcion`
--

INSERT INTO `funcion` (`IdFuncion`, `NombreFuncion`, `EstadoUrl`, `IdRol`, `Icono`) VALUES
(1, 'Inicio', 'app.admin.inicio', 1, 'fa fa-fw fa-dashboard'),
(2, 'Registrar Campo', 'app.admin.registrar-campo', 1, 'fa fa-fw fa-edit'),
(3, 'Realizar Reserva', 'app.admin.reserva', 1, 'fa fa-fw fa-table'),
(4, 'Registrar Cliente', 'app.admin.registrar-cliente', 1, 'fa fa-fw fa-users'),
(5, 'Reserva Administrativa', 'app.admin.reserva-especial', 1, 'fa fa-fw fa-tablet'),
(6, 'Reportes', 'app.admin.reportes', 1, 'fa fa-fw fa-bar-chart-o'),
(7, 'Realizar Prereserva', 'app.cliente.prereserva', 2, 'fa fa-fw fa-table'),
(8, 'Confirmar Prereserva', 'app.admin.prereserva', 1, 'fa fa-fw fa-check'),
(9, 'Canchas', 'app.admin.campos', 1, 'fa fa-fw fa-soccer-ball-o');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE IF NOT EXISTS `horario` (
  `IdHorario` int(11) NOT NULL,
  `HoraInicio` time NOT NULL,
  `HoraFin` time NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`IdHorario`, `HoraInicio`, `HoraFin`) VALUES
(1, '08:00:00', '21:00:00'),
(2, '06:00:00', '18:00:00'),
(3, '08:00:00', '12:00:00'),
(4, '08:00:00', '22:00:00'),
(6, '13:00:00', '18:00:00'),
(7, '08:00:00', '20:00:00'),
(8, '07:00:00', '18:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE IF NOT EXISTS `reserva` (
  `IdReserva` int(11) NOT NULL,
  `FechaRegistro` date NOT NULL,
  `IdCampo` int(11) NOT NULL,
  `Inicio` datetime NOT NULL,
  `Fin` datetime NOT NULL,
  `IdFactura` int(11) DEFAULT NULL,
  `ReservaEspecial` tinyint(4) NOT NULL,
  `Confirmado` tinyint(4) NOT NULL,
  `ExpiracionPre` datetime DEFAULT NULL,
  `PrecioReserva` int(11) NOT NULL,
  `IdTipoReserva` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`IdReserva`, `FechaRegistro`, `IdCampo`, `Inicio`, `Fin`, `IdFactura`, `ReservaEspecial`, `Confirmado`, `ExpiracionPre`, `PrecioReserva`, `IdTipoReserva`) VALUES
(142, '2016-01-12', 1, '2016-01-14 09:00:00', '2016-01-14 11:00:00', 30, 0, 1, NULL, 200, 1),
(143, '2016-01-12', 1, '2016-01-16 10:00:00', '2016-01-16 11:00:00', 31, 0, 1, '2016-01-13 10:44:14', 100, 4),
(144, '2016-01-12', 1, '2016-01-17 12:00:00', '2016-01-17 14:00:00', 32, 0, 1, '2016-01-13 17:52:12', 200, 4),
(145, '2016-01-12', 1, '2016-01-14 13:00:00', '2016-01-14 14:00:00', 33, 0, 1, NULL, 100, 1),
(147, '2016-01-12', 1, '2016-01-14 15:00:00', '2016-01-14 16:00:00', 35, 0, 1, NULL, 100, 1),
(149, '2016-01-12', 1, '2016-01-15 16:00:00', '2016-01-15 17:00:00', 37, 0, 1, NULL, 100, 1),
(151, '2016-01-14', 4, '2016-01-17 15:00:00', '2016-01-17 17:00:00', NULL, 1, 1, NULL, 0, 2),
(152, '2016-01-14', 4, '2016-01-17 10:00:00', '2016-01-17 12:00:00', 39, 0, 1, NULL, 160, 1),
(153, '2016-01-14', 30, '2016-01-17 10:00:00', '2016-01-17 13:00:00', 40, 0, 1, NULL, 270, 1),
(154, '2016-01-20', 1, '2016-01-21 09:00:00', '2016-01-21 10:00:00', 41, 0, 1, NULL, 100, 1),
(155, '2016-01-20', 1, '2016-01-22 09:00:00', '2016-01-22 10:00:00', 41, 0, 1, NULL, 100, 1),
(156, '2016-01-20', 1, '2016-01-22 11:00:00', '2016-01-22 13:00:00', NULL, 1, 1, NULL, 0, 2),
(157, '2016-01-20', 1, '2016-01-24 09:00:00', '2016-01-24 11:00:00', 42, 0, 1, NULL, 200, 1),
(158, '2016-01-20', 1, '2016-01-23 08:00:00', '2016-01-23 09:00:00', NULL, 1, 1, NULL, 0, 2),
(159, '2016-01-20', 1, '2016-01-23 10:00:00', '2016-01-23 12:00:00', 43, 0, 1, '2016-01-21 14:08:58', 200, 4),
(160, '2016-01-20', 1, '2016-01-24 14:00:00', '2016-01-24 16:00:00', 44, 0, 1, '2016-01-21 14:11:06', 200, 4),
(161, '2016-01-20', 1, '2016-01-23 13:00:00', '2016-01-23 14:00:00', NULL, 1, 1, NULL, 0, 2),
(162, '2016-01-20', 1, '2016-01-23 18:00:00', '2016-01-23 19:00:00', NULL, 1, 1, NULL, 0, 2),
(163, '2016-01-20', 1, '2016-01-24 18:00:00', '2016-01-24 19:00:00', NULL, 1, 1, NULL, 0, 2),
(164, '2016-01-20', 1, '2016-01-22 16:00:00', '2016-01-22 17:00:00', 45, 0, 1, NULL, 100, 1),
(165, '2016-01-20', 1, '2016-01-23 16:00:00', '2016-01-23 17:00:00', 45, 0, 1, NULL, 100, 1),
(166, '2016-01-20', 1, '2016-01-24 16:00:00', '2016-01-24 17:00:00', 45, 0, 1, NULL, 100, 1),
(167, '2016-01-20', 1, '2016-01-22 19:00:00', '2016-01-22 20:00:00', 46, 0, 1, NULL, 100, 1),
(168, '2016-01-24', 1, '2016-02-05 09:00:00', '2016-02-05 10:00:00', 47, 0, 1, NULL, 200, 1),
(169, '2016-01-24', 1, '2016-01-24 21:00:00', '2016-01-24 22:00:00', 48, 0, 1, NULL, 200, 1),
(170, '2016-01-26', 1, '2016-01-27 09:00:00', '2016-01-27 10:00:00', 49, 0, 1, NULL, 200, 1),
(171, '2016-01-26', 1, '2016-03-04 10:00:00', '2016-03-04 12:00:00', 50, 0, 1, NULL, 400, 1),
(172, '2016-01-26', 1, '2016-03-05 10:00:00', '2016-03-05 12:00:00', 50, 0, 1, NULL, 400, 1),
(173, '2016-01-26', 1, '2016-03-06 10:00:00', '2016-03-06 12:00:00', 50, 0, 1, NULL, 400, 1),
(174, '2016-01-26', 1, '2016-04-13 09:00:00', '2016-04-13 10:00:00', 51, 0, 1, NULL, 200, 1),
(175, '2016-01-26', 1, '2016-04-20 09:00:00', '2016-04-20 10:00:00', 51, 0, 1, NULL, 200, 1),
(176, '2016-01-26', 1, '2016-04-27 09:00:00', '2016-04-27 10:00:00', 51, 0, 1, NULL, 200, 1),
(177, '2016-01-26', 1, '2016-05-04 09:00:00', '2016-05-04 10:00:00', 51, 0, 1, NULL, 200, 1),
(178, '2016-01-26', 1, '2016-05-11 09:00:00', '2016-05-11 10:00:00', 51, 0, 1, NULL, 200, 1),
(179, '2016-01-26', 1, '2016-05-18 09:00:00', '2016-05-18 10:00:00', 51, 0, 1, NULL, 200, 1),
(180, '2016-01-26', 1, '2016-05-25 09:00:00', '2016-05-25 10:00:00', 51, 0, 1, NULL, 200, 1),
(181, '2016-01-26', 1, '2016-06-01 09:00:00', '2016-06-01 10:00:00', 51, 0, 1, NULL, 200, 1),
(182, '2016-01-26', 1, '2016-06-08 09:00:00', '2016-06-08 10:00:00', 51, 0, 1, NULL, 200, 1),
(183, '2016-01-26', 1, '2016-06-15 09:00:00', '2016-06-15 10:00:00', 51, 0, 1, NULL, 200, 1),
(184, '2016-01-26', 1, '2016-06-29 10:00:00', '2016-06-29 11:00:00', 52, 0, 1, NULL, 200, 1),
(185, '2016-01-26', 1, '2016-07-06 10:00:00', '2016-07-06 11:00:00', 52, 0, 1, NULL, 200, 1),
(186, '2016-01-26', 1, '2016-07-13 10:00:00', '2016-07-13 11:00:00', 52, 0, 1, NULL, 200, 1),
(187, '2016-01-26', 1, '2016-07-20 10:00:00', '2016-07-20 11:00:00', 52, 0, 1, NULL, 200, 1),
(188, '2016-01-26', 1, '2016-07-27 10:00:00', '2016-07-27 11:00:00', 52, 0, 1, NULL, 200, 1),
(189, '2016-01-26', 1, '2016-08-03 10:00:00', '2016-08-03 11:00:00', 52, 0, 1, NULL, 200, 1),
(190, '2016-01-26', 1, '2016-08-10 10:00:00', '2016-08-10 11:00:00', 52, 0, 1, NULL, 200, 1),
(191, '2016-01-26', 1, '2016-08-17 10:00:00', '2016-08-17 11:00:00', 52, 0, 1, NULL, 200, 1),
(192, '2016-01-26', 1, '2016-08-24 10:00:00', '2016-08-24 11:00:00', 52, 0, 1, NULL, 200, 1),
(193, '2016-01-26', 1, '2016-08-31 10:00:00', '2016-08-31 11:00:00', 52, 0, 1, NULL, 200, 1),
(194, '2016-01-26', 1, '2016-01-30 10:00:00', '2016-01-30 11:00:00', 53, 0, 1, NULL, 200, 1),
(195, '2016-01-26', 1, '2016-01-31 10:00:00', '2016-01-31 11:00:00', 53, 0, 1, NULL, 200, 1),
(196, '2016-01-26', 1, '2016-02-01 10:00:00', '2016-02-01 11:00:00', 53, 0, 1, NULL, 200, 1),
(198, '2016-01-26', 1, '2016-01-31 13:00:00', '2016-01-31 14:00:00', 55, 0, 1, NULL, 200, 1),
(199, '2016-01-29', 1, '2016-01-30 16:00:00', '2016-01-30 17:00:00', 56, 0, 1, NULL, 200, 1),
(200, '2016-01-29', 1, '2016-01-30 12:00:00', '2016-01-30 13:00:00', NULL, 1, 1, NULL, 0, 2),
(201, '2016-01-29', 1, '2016-01-31 08:00:00', '2016-01-31 09:00:00', 57, 0, 1, NULL, 200, 1),
(202, '2016-01-29', 1, '2016-01-31 18:00:00', '2016-01-31 19:00:00', 58, 0, 1, NULL, 200, 1),
(203, '2016-01-29', 1, '2016-01-31 15:00:00', '2016-01-31 16:00:00', NULL, 1, 1, NULL, 0, 2),
(204, '2016-01-29', 1, '2016-01-29 08:00:00', '2016-01-29 11:00:00', NULL, 1, 1, NULL, 0, 2),
(205, '2016-01-30', 1, '2016-02-03 12:00:00', '2016-02-03 13:00:00', 59, 0, 1, NULL, 200, 1),
(206, '2016-01-30', 1, '2016-02-04 12:00:00', '2016-02-04 13:00:00', 59, 0, 1, NULL, 200, 1),
(207, '2016-01-30', 1, '2016-02-05 12:00:00', '2016-02-05 13:00:00', 59, 0, 1, NULL, 200, 1),
(208, '2016-01-30', 1, '2016-02-06 12:00:00', '2016-02-06 13:00:00', 59, 0, 1, NULL, 200, 1),
(209, '2016-01-30', 1, '2016-02-07 12:00:00', '2016-02-07 13:00:00', 59, 0, 1, NULL, 200, 1),
(210, '2016-01-30', 1, '2016-02-08 12:00:00', '2016-02-08 13:00:00', 59, 0, 1, NULL, 200, 1),
(211, '2016-01-30', 1, '2016-02-04 15:00:00', '2016-02-04 17:00:00', 60, 0, 1, '2016-01-31 18:43:38', 400, 4),
(212, '2016-01-31', 1, '2016-01-31 16:00:00', '2016-01-31 17:00:00', 61, 0, 1, NULL, 200, 1),
(213, '2016-01-31', 1, '2016-01-31 17:00:00', '2016-01-31 18:00:00', 62, 0, 1, NULL, 200, 1),
(214, '2016-01-31', 4, '2016-01-31 15:00:00', '2016-01-31 18:00:00', 63, 0, 1, NULL, 240, 1),
(215, '2016-01-31', 30, '2016-01-31 17:00:00', '2016-01-31 19:00:00', 64, 0, 1, NULL, 180, 1),
(216, '2016-01-31', 30, '2016-02-01 17:00:00', '2016-02-01 19:00:00', 64, 0, 1, NULL, 180, 1),
(217, '2016-01-31', 30, '2016-01-31 19:00:00', '2016-01-31 20:00:00', 65, 0, 1, NULL, 90, 1),
(218, '2016-01-31', 1, '2016-01-31 19:00:00', '2016-01-31 20:00:00', 66, 0, 1, NULL, 200, 1),
(219, '2016-01-31', 1, '2016-01-31 20:00:00', '2016-01-31 21:00:00', 67, 0, 1, NULL, 200, 1),
(220, '2016-01-31', 1, '2016-01-31 21:00:00', '2016-01-31 22:00:00', 68, 0, 1, NULL, 200, 1),
(221, '2016-01-31', 4, '2016-01-31 18:00:00', '2016-01-31 19:00:00', 69, 0, 1, NULL, 80, 1),
(222, '2016-01-31', 4, '2016-01-31 19:00:00', '2016-01-31 20:00:00', 70, 0, 1, NULL, 80, 1),
(223, '2016-01-31', 4, '2016-01-31 20:00:00', '2016-01-31 21:00:00', 71, 0, 1, NULL, 80, 1),
(224, '2016-01-31', 30, '2016-01-31 16:00:00', '2016-01-31 17:00:00', 72, 0, 1, NULL, 90, 1),
(225, '2016-01-31', 30, '2016-01-31 15:00:00', '2016-01-31 16:00:00', 73, 0, 1, NULL, 90, 1),
(226, '2016-02-01', 1, '2016-02-03 10:00:00', '2016-02-03 11:00:00', 74, 0, 1, NULL, 200, 1),
(227, '2016-02-03', 1, '2016-02-06 15:00:00', '2016-02-06 16:00:00', 75, 0, 1, NULL, 200, 1),
(228, '2016-02-19', 1, '2016-02-20 10:00:00', '2016-02-20 11:00:00', 76, 0, 1, NULL, 200, 1),
(229, '2016-02-19', 1, '2016-02-21 10:00:00', '2016-02-21 11:00:00', 76, 0, 1, NULL, 200, 1),
(230, '2016-02-19', 1, '2016-02-20 12:00:00', '2016-02-20 22:00:00', NULL, 1, 1, NULL, 0, 2),
(231, '2016-02-24', 1, '2016-02-28 10:00:00', '2016-02-28 11:00:00', 77, 0, 1, NULL, 200, 1),
(232, '2016-02-25', 1, '2016-02-27 13:00:00', '2016-02-27 14:00:00', 78, 0, 1, NULL, 200, 1),
(233, '2016-02-25', 1, '2016-02-28 13:00:00', '2016-02-28 14:00:00', 79, 0, 1, NULL, 200, 1),
(234, '2016-02-25', 1, '2016-02-29 13:00:00', '2016-02-29 14:00:00', 79, 0, 1, NULL, 200, 1),
(235, '2016-02-25', 1, '2016-03-01 13:00:00', '2016-03-01 14:00:00', 79, 0, 1, NULL, 200, 1),
(236, '2016-02-25', 1, '2016-02-27 15:00:00', '2016-02-27 17:00:00', NULL, 1, 1, NULL, 0, 2),
(237, '2016-02-25', 1, '2016-02-28 15:00:00', '2016-02-28 17:00:00', NULL, 1, 1, NULL, 0, 2),
(238, '2016-02-25', 1, '2016-02-28 18:00:00', '2016-02-28 19:00:00', 80, 0, 1, NULL, 200, 1),
(239, '2016-03-07', 1, '2016-03-12 11:00:00', '2016-03-12 12:00:00', 81, 0, 1, NULL, 200, 1),
(240, '2016-03-26', 1, '2016-03-29 10:00:00', '2016-03-29 12:00:00', 82, 0, 1, '2016-03-27 10:58:07', 400, 4),
(241, '2016-03-26', 1, '2016-03-29 13:00:00', '2016-03-29 14:00:00', 83, 0, 0, '2016-03-27 10:58:44', 200, 4),
(242, '2016-03-26', 4, '2016-03-28 09:00:00', '2016-03-28 10:00:00', 84, 0, 1, NULL, 80, 1),
(243, '2016-03-26', 4, '2016-03-30 08:00:00', '2016-03-30 10:00:00', 85, 0, 1, NULL, 160, 1),
(244, '2016-03-26', 4, '2016-04-01 09:00:00', '2016-04-01 10:00:00', 86, 0, 1, NULL, 80, 1),
(245, '2016-03-26', 4, '2016-03-29 10:00:00', '2016-03-29 11:00:00', NULL, 1, 1, NULL, 0, 2),
(246, '2016-03-26', 4, '2016-03-31 09:00:00', '2016-03-31 10:00:00', NULL, 1, 1, NULL, 0, 2),
(247, '2016-03-26', 4, '2016-04-02 08:00:00', '2016-04-02 10:00:00', 87, 0, 0, '2016-03-27 23:21:08', 160, 4),
(248, '2016-03-27', 4, '2016-04-03 10:00:00', '2016-04-03 11:00:00', 88, 0, 1, NULL, 80, 1),
(249, '2016-03-27', 4, '2016-04-03 09:00:00', '2016-04-03 10:00:00', 89, 0, 1, NULL, 80, 1),
(250, '2016-03-27', 31, '2016-04-02 15:00:00', '2016-04-02 18:00:00', 90, 0, 1, NULL, 300, 1),
(251, '2016-05-04', 4, '2016-05-06 09:00:00', '2016-05-06 10:00:00', 91, 0, 1, NULL, 80, 1),
(252, '2016-05-04', 4, '2016-05-07 09:00:00', '2016-05-07 10:00:00', NULL, 1, 1, NULL, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE IF NOT EXISTS `rol` (
  `IdRol` int(11) NOT NULL,
  `NombreRol` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`IdRol`, `NombreRol`) VALUES
(1, 'Administrador'),
(2, 'Cliente'),
(3, 'SuperAdmin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE IF NOT EXISTS `servicio` (
  `IdServicio` int(11) NOT NULL,
  `NombreServicio` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`IdServicio`, `NombreServicio`) VALUES
(1, 'Parrilla'),
(2, 'Vestuarios'),
(3, 'WIFI'),
(4, 'Asistencia Medica'),
(5, 'Snack');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_complejo`
--

CREATE TABLE IF NOT EXISTS `servicio_complejo` (
  `IdComplejo` int(11) NOT NULL,
  `IdServicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `superficie`
--

CREATE TABLE IF NOT EXISTS `superficie` (
  `IdSuperficie` int(11) NOT NULL,
  `NombreSuperficie` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `superficie`
--

INSERT INTO `superficie` (`IdSuperficie`, `NombreSuperficie`) VALUES
(1, 'Pavimento'),
(2, 'Madera'),
(3, 'Cesped'),
(4, 'Agua'),
(5, 'Hielo'),
(6, 'Colchoneta'),
(7, 'Arena');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiporeserva`
--

CREATE TABLE IF NOT EXISTS `tiporeserva` (
  `IdTipo` int(11) NOT NULL,
  `NombreTipo` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tiporeserva`
--

INSERT INTO `tiporeserva` (`IdTipo`, `NombreTipo`) VALUES
(1, 'Normal'),
(2, 'Administrativa'),
(3, 'Evento'),
(4, 'Prereserva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `IdUsuario` int(11) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contrasena` varchar(100) NOT NULL,
  `IdRol` int(11) NOT NULL,
  `NombreUsuario` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `Correo`, `Contrasena`, `IdRol`, `NombreUsuario`) VALUES
(1, 'beimar020@gmail.com', 'beimarhuarachi', 1, 'beimarhuarachi'),
(2, 'jorge@gmail.com', 'jorgehuarachi', 1, 'jorgehuarachi'),
(3, 'ely@hotmail.com', 'elymamani', 2, 'elymamani'),
(4, 'alvaro@gmail.com', 'alvaro', 2, 'alvaro'),
(5, 'maria@gmail.com', '7894561', 2, 'maria@gmail.com'),
(6, 'ricardo@hotmail.com', '4512789', 2, 'ricardo@hotmail.com'),
(7, 'samuel@hotmail.com', '7845613', 2, 'samuel@hotmail.com'),
(8, 'be@jfdks', '789455', 2, 'be@jfdks'),
(9, 'herminica@gmail.com', '444447', 2, 'herminica@gmail.com'),
(10, 'beim@fjskld.com', '456789', 2, 'beim@fjskld.com'),
(28, 'aurora@gmail.com', '4567890', 1, 'aurora@gmail.com'),
(29, 'academia@gmail.com', '4657891', 1, 'academia@gmail.com'),
(30, 'ultimos@ultimo', '456789', 1, 'ultimos@ultimo'),
(31, 'willsterman@gmail.com', '111111', 1, 'willsterman@gmail.com'),
(32, 'alberto@gmail.com', '7894556', 2, 'alberto@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `campo`
--
ALTER TABLE `campo`
  ADD PRIMARY KEY (`IdCampoDeportivo`),
  ADD KEY `IdComplejo_FKCampo` (`IdComplejo`),
  ADD KEY `IdSuperficie_FKCampo` (`IdSuperficie`),
  ADD KEY `IdDisciplina_FKCampo` (`IdDisciplina`),
  ADD KEY `IdHorario_FkCampo` (`IdHorario`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`IdCliente`),
  ADD UNIQUE KEY `IdUsuario_FK` (`IdUsuario`) USING BTREE,
  ADD KEY `IdComplejo` (`IdComplejo`);

--
-- Indices de la tabla `complejo`
--
ALTER TABLE `complejo`
  ADD PRIMARY KEY (`IdComplejo`),
  ADD UNIQUE KEY `IdUsuario_FKComplejo` (`IdUsuario`) USING BTREE;

--
-- Indices de la tabla `disciplina`
--
ALTER TABLE `disciplina`
  ADD PRIMARY KEY (`IdDisciplina`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`NumeroFactura`),
  ADD KEY `IdCliente` (`IdCliente`);

--
-- Indices de la tabla `funcion`
--
ALTER TABLE `funcion`
  ADD PRIMARY KEY (`IdFuncion`),
  ADD KEY `IdRol_FK_Funcion` (`IdRol`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`IdHorario`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`IdReserva`),
  ADD KEY `IdCampo_FK_Reserva` (`IdCampo`),
  ADD KEY `IdTipoReserva_FKReserva` (`IdTipoReserva`),
  ADD KEY `IdFactura` (`IdFactura`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IdRol`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`IdServicio`);

--
-- Indices de la tabla `servicio_complejo`
--
ALTER TABLE `servicio_complejo`
  ADD PRIMARY KEY (`IdComplejo`,`IdServicio`),
  ADD KEY `IdServicio_FKServico` (`IdServicio`);

--
-- Indices de la tabla `superficie`
--
ALTER TABLE `superficie`
  ADD PRIMARY KEY (`IdSuperficie`);

--
-- Indices de la tabla `tiporeserva`
--
ALTER TABLE `tiporeserva`
  ADD PRIMARY KEY (`IdTipo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD KEY `IdRol_FK_Usuario` (`IdRol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `campo`
--
ALTER TABLE `campo`
  MODIFY `IdCampoDeportivo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `IdCliente` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `complejo`
--
ALTER TABLE `complejo`
  MODIFY `IdComplejo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `disciplina`
--
ALTER TABLE `disciplina`
  MODIFY `IdDisciplina` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `NumeroFactura` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=92;
--
-- AUTO_INCREMENT de la tabla `funcion`
--
ALTER TABLE `funcion`
  MODIFY `IdFuncion` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `IdHorario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `IdReserva` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=253;
--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `IdRol` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `IdServicio` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `superficie`
--
ALTER TABLE `superficie`
  MODIFY `IdSuperficie` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `tiporeserva`
--
ALTER TABLE `tiporeserva`
  MODIFY `IdTipo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `campo`
--
ALTER TABLE `campo`
  ADD CONSTRAINT `IdComplejo_FKCampo` FOREIGN KEY (`IdComplejo`) REFERENCES `complejo` (`IdComplejo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `IdDisciplina_FKCampo` FOREIGN KEY (`IdDisciplina`) REFERENCES `disciplina` (`IdDisciplina`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `IdHorario_FkCampo` FOREIGN KEY (`IdHorario`) REFERENCES `horario` (`IdHorario`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `IdSuperficie_FKCampo` FOREIGN KEY (`IdSuperficie`) REFERENCES `superficie` (`IdSuperficie`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `IdUsuario_FK` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`IdComplejo`) REFERENCES `complejo` (`IdComplejo`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `complejo`
--
ALTER TABLE `complejo`
  ADD CONSTRAINT `IdUsuario_FKComplejo` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `cliente` (`IdCliente`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `funcion`
--
ALTER TABLE `funcion`
  ADD CONSTRAINT `IdRol_FK_Funcion` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `IdCampo_FK_Reserva` FOREIGN KEY (`IdCampo`) REFERENCES `campo` (`IdCampoDeportivo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `IdTipoReserva_FKReserva` FOREIGN KEY (`IdTipoReserva`) REFERENCES `tiporeserva` (`IdTipo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`IdFactura`) REFERENCES `factura` (`NumeroFactura`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `servicio_complejo`
--
ALTER TABLE `servicio_complejo`
  ADD CONSTRAINT `IdComplejo_FKServicio` FOREIGN KEY (`IdComplejo`) REFERENCES `complejo` (`IdComplejo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `IdServicio_FKServico` FOREIGN KEY (`IdServicio`) REFERENCES `servicio` (`IdServicio`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `IdRol_FK_Usuario` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
