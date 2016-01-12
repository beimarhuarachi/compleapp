/*
Navicat MySQL Data Transfer

Source Server         : beimar
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : complejodeportivo

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2016-01-12 11:00:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for campo
-- ----------------------------
DROP TABLE IF EXISTS `campo`;
CREATE TABLE `campo` (
  `IdCampoDeportivo` int(11) NOT NULL AUTO_INCREMENT,
  `IdComplejo` int(11) NOT NULL,
  `NombreCampo` varchar(255) DEFAULT NULL,
  `PrecioPorHora` int(11) NOT NULL,
  `RutaFotoCampo` varchar(255) DEFAULT NULL,
  `IdDisciplina` int(11) NOT NULL,
  `IdSuperficie` int(11) NOT NULL,
  `IdHorario` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdCampoDeportivo`),
  KEY `IdComplejo_FKCampo` (`IdComplejo`),
  KEY `IdSuperficie_FKCampo` (`IdSuperficie`),
  KEY `IdDisciplina_FKCampo` (`IdDisciplina`),
  KEY `IdHorario_FkCampo` (`IdHorario`),
  CONSTRAINT `IdComplejo_FKCampo` FOREIGN KEY (`IdComplejo`) REFERENCES `complejo` (`IdComplejo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `IdDisciplina_FKCampo` FOREIGN KEY (`IdDisciplina`) REFERENCES `disciplina` (`IdDisciplina`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `IdHorario_FkCampo` FOREIGN KEY (`IdHorario`) REFERENCES `horario` (`IdHorario`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `IdSuperficie_FKCampo` FOREIGN KEY (`IdSuperficie`) REFERENCES `superficie` (`IdSuperficie`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of campo
-- ----------------------------
INSERT INTO `campo` VALUES ('1', '1', 'CanchaFutbol1', '100', 'uploads/imagen001.jpg', '1', '3', '4');
INSERT INTO `campo` VALUES ('4', '1', 'CanchaBacket', '80', 'uploads/imagen001.jpg', '5', '2', '1');
INSERT INTO `campo` VALUES ('29', '4', 'CanchaFrontron1', '70', 'uploads/imagen001.jpg', '6', '1', '1');

-- ----------------------------
-- Table structure for cliente
-- ----------------------------
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `IdCliente` int(11) NOT NULL AUTO_INCREMENT,
  `IdComplejo` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `Nombres` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `NumeroCI` int(11) NOT NULL,
  `Telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdCliente`),
  UNIQUE KEY `IdUsuario_FK` (`IdUsuario`) USING BTREE,
  KEY `IdComplejo` (`IdComplejo`),
  CONSTRAINT `IdUsuario_FK` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`IdComplejo`) REFERENCES `complejo` (`IdComplejo`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cliente
-- ----------------------------
INSERT INTO `cliente` VALUES ('1', '1', '3', 'Ely', 'Mamani Quispe', '444444', '4567891');
INSERT INTO `cliente` VALUES ('2', '1', '4', 'Alvaro Tomas', 'Torrez Garcia', '4567812', '4567891');
INSERT INTO `cliente` VALUES ('3', '1', '5', 'Maria', 'Lopez', '7894561', '4567891');
INSERT INTO `cliente` VALUES ('4', '1', '6', 'Ricardo Arturo', 'Sanchez Nogales', '4512789', '4567984');
INSERT INTO `cliente` VALUES ('5', '1', '7', 'Samuel', 'Nina Valda', '7845613', '4567981');
INSERT INTO `cliente` VALUES ('6', '4', '8', 'Eliana', 'Mamani Ortiz', '789455', '4561237');
INSERT INTO `cliente` VALUES ('7', '4', '9', 'Herminia', 'Zapata', '444447', '4567891');
INSERT INTO `cliente` VALUES ('8', '1', '10', 'Beimar Huarachi', 'mamani', '456789', '4567891');

-- ----------------------------
-- Table structure for complejo
-- ----------------------------
DROP TABLE IF EXISTS `complejo`;
CREATE TABLE `complejo` (
  `IdComplejo` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`IdComplejo`),
  UNIQUE KEY `IdUsuario_FKComplejo` (`IdUsuario`) USING BTREE,
  CONSTRAINT `IdUsuario_FKComplejo` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of complejo
-- ----------------------------
INSERT INTO `complejo` VALUES ('1', '1', 'Calle Quebracho #34 - Zona alto Cbba. ', '4567891', 'Beimar', 'Huarachi Mamani', '8674461', 'Cochabamba', 'Tomar la linea Linea 03 o la linea J', 'uploads/complejoportada.jpg', 'Complejo San Simon');
INSERT INTO `complejo` VALUES ('4', '2', 'Avenida Oquendo', '4562134', 'Jorge', 'Huarachi Mamani', '46578125', 'La Paz', 'Linea 01', 'uploads/complejoportada.jpg', 'Complejo Unideportivo Chaski');

-- ----------------------------
-- Table structure for disciplina
-- ----------------------------
DROP TABLE IF EXISTS `disciplina`;
CREATE TABLE `disciplina` (
  `IdDisciplina` int(11) NOT NULL AUTO_INCREMENT,
  `NombreDisciplina` varchar(255) NOT NULL,
  `PrecioMinimo` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdDisciplina`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of disciplina
-- ----------------------------
INSERT INTO `disciplina` VALUES ('1', 'Futbol', '20');
INSERT INTO `disciplina` VALUES ('2', 'Futbol 8', '20');
INSERT INTO `disciplina` VALUES ('3', 'Futsal', '10');
INSERT INTO `disciplina` VALUES ('4', 'Hockey', '50');
INSERT INTO `disciplina` VALUES ('5', 'Bascket', '30');
INSERT INTO `disciplina` VALUES ('6', 'Fronton', '20');
INSERT INTO `disciplina` VALUES ('7', 'Tenis', '50');
INSERT INTO `disciplina` VALUES ('8', 'Voleibol', '30');
INSERT INTO `disciplina` VALUES ('9', 'Esgrima', '50');
INSERT INTO `disciplina` VALUES ('10', 'Karate', '30');

-- ----------------------------
-- Table structure for factura
-- ----------------------------
DROP TABLE IF EXISTS `factura`;
CREATE TABLE `factura` (
  `NumeroFactura` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha` date NOT NULL,
  `Serie` varchar(255) DEFAULT NULL,
  `IdCliente` int(11) NOT NULL,
  PRIMARY KEY (`NumeroFactura`),
  KEY `IdCliente` (`IdCliente`),
  CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `cliente` (`IdCliente`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of factura
-- ----------------------------
INSERT INTO `factura` VALUES ('30', '2016-01-12', null, '2');
INSERT INTO `factura` VALUES ('31', '2016-01-12', null, '2');

-- ----------------------------
-- Table structure for funcion
-- ----------------------------
DROP TABLE IF EXISTS `funcion`;
CREATE TABLE `funcion` (
  `IdFuncion` int(11) NOT NULL AUTO_INCREMENT,
  `NombreFuncion` varchar(100) NOT NULL,
  `EstadoUrl` varchar(100) NOT NULL,
  `IdRol` int(11) DEFAULT NULL,
  `Icono` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IdFuncion`),
  KEY `IdRol_FK_Funcion` (`IdRol`),
  CONSTRAINT `IdRol_FK_Funcion` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of funcion
-- ----------------------------
INSERT INTO `funcion` VALUES ('1', 'Inicio', 'app.admin.inicio', '1', 'fa fa-fw fa-dashboard');
INSERT INTO `funcion` VALUES ('2', 'Registrar Campo', 'app.admin.registrar-campo', '1', 'fa fa-fw fa-edit');
INSERT INTO `funcion` VALUES ('3', 'Realizar Reserva', 'app.admin.reserva', '1', 'fa fa-fw fa-table');
INSERT INTO `funcion` VALUES ('4', 'Registrar Cliente', 'app.admin.registrar-cliente', '1', 'fa fa-fw fa-users');
INSERT INTO `funcion` VALUES ('5', 'Reserva Especial', 'app.admin.reserva-especial', '1', 'fa fa-fw fa-tablet');
INSERT INTO `funcion` VALUES ('6', 'Reportes', 'app.admin.reportes', '1', 'fa fa-fw fa-bar-chart-o');
INSERT INTO `funcion` VALUES ('7', 'Realizar Prereserva', 'app.cliente.prereserva', '2', 'fa fa-fw fa-table');
INSERT INTO `funcion` VALUES ('8', 'Confirmar Prereserva', 'app.admin.prereserva', '1', 'fa fa-fw fa-check');

-- ----------------------------
-- Table structure for horario
-- ----------------------------
DROP TABLE IF EXISTS `horario`;
CREATE TABLE `horario` (
  `IdHorario` int(11) NOT NULL AUTO_INCREMENT,
  `HoraInicio` time NOT NULL,
  `HoraFin` time NOT NULL,
  PRIMARY KEY (`IdHorario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of horario
-- ----------------------------
INSERT INTO `horario` VALUES ('1', '08:00:00', '21:00:00');
INSERT INTO `horario` VALUES ('2', '06:00:00', '18:00:00');
INSERT INTO `horario` VALUES ('4', '08:00:00', '22:00:00');
INSERT INTO `horario` VALUES ('6', '13:00:00', '18:00:00');
INSERT INTO `horario` VALUES ('7', '08:00:00', '20:00:00');

-- ----------------------------
-- Table structure for reserva
-- ----------------------------
DROP TABLE IF EXISTS `reserva`;
CREATE TABLE `reserva` (
  `IdReserva` int(11) NOT NULL AUTO_INCREMENT,
  `FechaRegistro` date NOT NULL,
  `IdCampo` int(11) NOT NULL,
  `Inicio` datetime NOT NULL,
  `Fin` datetime NOT NULL,
  `IdFactura` int(11) DEFAULT NULL,
  `ReservaEspecial` tinyint(4) NOT NULL,
  `Confirmado` tinyint(4) NOT NULL,
  `ExpiracionPre` datetime DEFAULT NULL,
  `PrecioReserva` int(11) NOT NULL,
  `IdTipoReserva` int(11) NOT NULL,
  PRIMARY KEY (`IdReserva`),
  KEY `IdCampo_FK_Reserva` (`IdCampo`),
  KEY `IdTipoReserva_FKReserva` (`IdTipoReserva`),
  KEY `IdFactura` (`IdFactura`),
  CONSTRAINT `IdCampo_FK_Reserva` FOREIGN KEY (`IdCampo`) REFERENCES `campo` (`IdCampoDeportivo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `IdTipoReserva_FKReserva` FOREIGN KEY (`IdTipoReserva`) REFERENCES `tiporeserva` (`IdTipo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`IdFactura`) REFERENCES `factura` (`NumeroFactura`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of reserva
-- ----------------------------
INSERT INTO `reserva` VALUES ('142', '2016-01-12', '1', '2016-01-14 09:00:00', '2016-01-14 11:00:00', '30', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('143', '2016-01-12', '1', '2016-01-16 10:00:00', '2016-01-16 11:00:00', '31', '0', '1', '2016-01-13 10:44:14', '100', '4');

-- ----------------------------
-- Table structure for rol
-- ----------------------------
DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `IdRol` int(11) NOT NULL AUTO_INCREMENT,
  `NombreRol` varchar(100) NOT NULL,
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of rol
-- ----------------------------
INSERT INTO `rol` VALUES ('1', 'Administrador');
INSERT INTO `rol` VALUES ('2', 'Cliente');
INSERT INTO `rol` VALUES ('3', 'SuperAdmin');

-- ----------------------------
-- Table structure for servicio
-- ----------------------------
DROP TABLE IF EXISTS `servicio`;
CREATE TABLE `servicio` (
  `IdServicio` int(11) NOT NULL AUTO_INCREMENT,
  `NombreServicio` varchar(255) NOT NULL,
  PRIMARY KEY (`IdServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of servicio
-- ----------------------------
INSERT INTO `servicio` VALUES ('1', 'Parrilla');
INSERT INTO `servicio` VALUES ('2', 'Vestuarios');
INSERT INTO `servicio` VALUES ('3', 'WIFI');
INSERT INTO `servicio` VALUES ('4', 'Asistencia Medica');
INSERT INTO `servicio` VALUES ('5', 'Snack');

-- ----------------------------
-- Table structure for servicio_complejo
-- ----------------------------
DROP TABLE IF EXISTS `servicio_complejo`;
CREATE TABLE `servicio_complejo` (
  `IdComplejo` int(11) NOT NULL,
  `IdServicio` int(11) NOT NULL,
  PRIMARY KEY (`IdComplejo`,`IdServicio`),
  KEY `IdServicio_FKServico` (`IdServicio`),
  CONSTRAINT `IdComplejo_FKServicio` FOREIGN KEY (`IdComplejo`) REFERENCES `complejo` (`IdComplejo`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `IdServicio_FKServico` FOREIGN KEY (`IdServicio`) REFERENCES `servicio` (`IdServicio`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of servicio_complejo
-- ----------------------------

-- ----------------------------
-- Table structure for superficie
-- ----------------------------
DROP TABLE IF EXISTS `superficie`;
CREATE TABLE `superficie` (
  `IdSuperficie` int(11) NOT NULL AUTO_INCREMENT,
  `NombreSuperficie` varchar(255) NOT NULL,
  PRIMARY KEY (`IdSuperficie`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of superficie
-- ----------------------------
INSERT INTO `superficie` VALUES ('1', 'Pavimento');
INSERT INTO `superficie` VALUES ('2', 'Madera');
INSERT INTO `superficie` VALUES ('3', 'Cesped');
INSERT INTO `superficie` VALUES ('4', 'Agua');
INSERT INTO `superficie` VALUES ('5', 'Hielo');
INSERT INTO `superficie` VALUES ('6', 'Colchoneta');
INSERT INTO `superficie` VALUES ('7', 'Arena');

-- ----------------------------
-- Table structure for tiporeserva
-- ----------------------------
DROP TABLE IF EXISTS `tiporeserva`;
CREATE TABLE `tiporeserva` (
  `IdTipo` int(11) NOT NULL AUTO_INCREMENT,
  `NombreTipo` varchar(255) NOT NULL,
  PRIMARY KEY (`IdTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tiporeserva
-- ----------------------------
INSERT INTO `tiporeserva` VALUES ('1', 'Normal');
INSERT INTO `tiporeserva` VALUES ('2', 'Especial');
INSERT INTO `tiporeserva` VALUES ('3', 'Evento');
INSERT INTO `tiporeserva` VALUES ('4', 'Prereserva');

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Correo` varchar(100) NOT NULL,
  `Contrasena` varchar(100) NOT NULL,
  `IdRol` int(11) NOT NULL,
  `NombreUsuario` varchar(100) NOT NULL,
  PRIMARY KEY (`IdUsuario`),
  KEY `IdRol_FK_Usuario` (`IdRol`),
  CONSTRAINT `IdRol_FK_Usuario` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of usuario
-- ----------------------------
INSERT INTO `usuario` VALUES ('1', 'beimar020@gmail.com', 'beimarhuarachi', '1', 'beimarhuarachi');
INSERT INTO `usuario` VALUES ('2', 'jorge@gmail.com', 'jorgehuarachi', '1', 'jorgehuarachi');
INSERT INTO `usuario` VALUES ('3', 'ely@hotmail.com', 'elymamani', '2', 'elymamani');
INSERT INTO `usuario` VALUES ('4', 'alvaro@gmail.com', 'alvaro', '2', 'alvaro');
INSERT INTO `usuario` VALUES ('5', 'maria@gmail.com', '7894561', '2', 'maria@gmail.com');
INSERT INTO `usuario` VALUES ('6', 'ricardo@hotmail.com', '4512789', '2', 'ricardo@hotmail.com');
INSERT INTO `usuario` VALUES ('7', 'samuel@hotmail.com', '7845613', '2', 'samuel@hotmail.com');
INSERT INTO `usuario` VALUES ('8', 'be@jfdks', '789455', '2', 'be@jfdks');
INSERT INTO `usuario` VALUES ('9', 'herminica@gmail.com', '444447', '2', 'herminica@gmail.com');
INSERT INTO `usuario` VALUES ('10', 'beim@fjskld.com', '456789', '2', 'beim@fjskld.com');
