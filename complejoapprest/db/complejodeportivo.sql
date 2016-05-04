/*
Navicat MySQL Data Transfer

Source Server         : beimar
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : complejodeportivo

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2016-05-04 11:03:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `campo`
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of campo
-- ----------------------------
INSERT INTO `campo` VALUES ('1', '1', 'CanchaFutbol1', '200', 'uploads/imagen001.jpg', '1', '3', '4');
INSERT INTO `campo` VALUES ('4', '1', 'CanchaBacket', '80', 'uploads/imagen001.jpg', '5', '2', '3');
INSERT INTO `campo` VALUES ('29', '4', 'CanchaFrontron1', '70', 'uploads/imagen001.jpg', '6', '1', '1');
INSERT INTO `campo` VALUES ('30', '1', 'CanchaTenis', '90', 'uploads/CanchaTenis.jpg', '7', '1', '7');
INSERT INTO `campo` VALUES ('31', '1', 'CampoNuevo', '100', 'uploads/CampoNuevo.jpg', '5', '3', '6');
INSERT INTO `campo` VALUES ('32', '1', 'das', '45', 'uploads/imagen001.jpg', '6', '2', '4');

-- ----------------------------
-- Table structure for `cliente`
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

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
INSERT INTO `cliente` VALUES ('9', '1', '32', 'Alberto', 'Juarez Perez', '7894556', '4561237');

-- ----------------------------
-- Table structure for `complejo`
-- ----------------------------
DROP TABLE IF EXISTS `complejo`;
CREATE TABLE `complejo` (
  `Longitud` double DEFAULT NULL,
  `Latitud` double DEFAULT NULL,
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
  `Pais` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdComplejo`),
  UNIQUE KEY `IdUsuario_FKComplejo` (`IdUsuario`) USING BTREE,
  CONSTRAINT `IdUsuario_FKComplejo` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of complejo
-- ----------------------------
INSERT INTO `complejo` VALUES ('-66.14277005195618', '-17.394278821541874', '1', '1', 'Av Pdte Manuel Isidoro Belzu entre Sucre y Guillermo Urquidi', '4567891', 'Beimar Eninfo', 'Huarachi Mamani', '8674461', 'Cochabamba', 'Tomar la linea Linea 03 o la linea J', 'uploads/complejoportada.jpg', 'Complejo San Simon', 'Bolivia');
INSERT INTO `complejo` VALUES ('-68.12462210655212', '-16.497529785498504', '4', '2', 'Avenida Saavedra esquina casimiro corrales', '4562134', 'Jorge', 'Huarachi Mamani', '46578125', 'Departamento Autónomo de La Paz', 'Linea 01', 'uploads/complejoportada.jpg', 'Complejo Unideportivo Chaski', 'Bolivia');
INSERT INTO `complejo` VALUES ('-66.13065719604492', '-17.40830462902467', '21', '28', 'CIRCUITO BOLIVIA', '4561321', 'nombres', 'apellidos', '4567890', 'Cochabamba', 'LLEGAR A PIE', 'uploads/imagen001.jpg', 'Club Aurora', 'Bolivia');
INSERT INTO `complejo` VALUES ('-63.180248737335205', '-17.77132869123981', '22', '29', 'Av Cristóbal De Mendoza entre Av Beni y Cristo Redentor', '3523245', 'Geman', 'Torrico Vega', '4657891', 'Santa Cruz', 'Llegar temprano por el micro \"C\"', 'uploads/imagen001.jpg', 'Academia Tauichi', 'Bolivia');
INSERT INTO `complejo` VALUES ('0', '0', '23', '30', 'calle orinoca', '4561317', 'ultimos', 'ultimos', '456789', null, 'fadfdadfs', 'uploads/imagen001.jpg', 'ultimo', null);
INSERT INTO `complejo` VALUES ('-66.14816665649414', '-17.378029137233764', '24', '31', 'Av. Circuito bolivia', '4444578', 'Eduardo', 'Campero', '111111', null, 'se debe tomar el micro B', 'uploads/Complejo_Willsterman.jpg', 'Complejo Willsterman', null);

-- ----------------------------
-- Table structure for `disciplina`
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
-- Table structure for `factura`
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
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of factura
-- ----------------------------
INSERT INTO `factura` VALUES ('30', '2016-01-12', null, '2');
INSERT INTO `factura` VALUES ('31', '2016-01-12', null, '2');
INSERT INTO `factura` VALUES ('32', '2016-01-15', null, '2');
INSERT INTO `factura` VALUES ('33', '2016-01-12', null, '6');
INSERT INTO `factura` VALUES ('34', '2016-01-12', null, '6');
INSERT INTO `factura` VALUES ('35', '2016-01-12', null, '3');
INSERT INTO `factura` VALUES ('36', '2016-01-12', null, '3');
INSERT INTO `factura` VALUES ('37', '2016-01-12', null, '5');
INSERT INTO `factura` VALUES ('38', '2016-01-12', null, '5');
INSERT INTO `factura` VALUES ('39', '2016-01-14', null, '5');
INSERT INTO `factura` VALUES ('40', '2016-01-14', null, '6');
INSERT INTO `factura` VALUES ('41', '2016-01-20', null, '6');
INSERT INTO `factura` VALUES ('42', '2016-01-20', null, '7');
INSERT INTO `factura` VALUES ('43', '2016-01-20', null, '2');
INSERT INTO `factura` VALUES ('44', '2016-01-20', null, '3');
INSERT INTO `factura` VALUES ('45', '2016-01-20', null, '6');
INSERT INTO `factura` VALUES ('46', '2016-01-20', null, '4');
INSERT INTO `factura` VALUES ('47', '2016-01-24', null, '4');
INSERT INTO `factura` VALUES ('48', '2016-01-24', null, '8');
INSERT INTO `factura` VALUES ('49', '2016-01-26', null, '2');
INSERT INTO `factura` VALUES ('50', '2016-01-26', null, '5');
INSERT INTO `factura` VALUES ('51', '2016-01-26', null, '7');
INSERT INTO `factura` VALUES ('52', '2016-01-26', null, '3');
INSERT INTO `factura` VALUES ('53', '2016-01-26', null, '7');
INSERT INTO `factura` VALUES ('54', '2016-01-26', null, '2');
INSERT INTO `factura` VALUES ('55', '2016-01-26', null, '1');
INSERT INTO `factura` VALUES ('56', '2016-01-29', null, '2');
INSERT INTO `factura` VALUES ('57', '2016-01-29', null, '1');
INSERT INTO `factura` VALUES ('58', '2016-01-29', null, '1');
INSERT INTO `factura` VALUES ('59', '2016-01-30', null, '1');
INSERT INTO `factura` VALUES ('60', '2016-01-30', null, '2');
INSERT INTO `factura` VALUES ('61', '2016-01-31', null, '2');
INSERT INTO `factura` VALUES ('62', '2016-01-31', null, '6');
INSERT INTO `factura` VALUES ('63', '2016-01-31', null, '4');
INSERT INTO `factura` VALUES ('64', '2016-01-31', null, '4');
INSERT INTO `factura` VALUES ('65', '2016-01-31', null, '6');
INSERT INTO `factura` VALUES ('66', '2016-01-31', null, '5');
INSERT INTO `factura` VALUES ('67', '2016-01-31', null, '1');
INSERT INTO `factura` VALUES ('68', '2016-01-31', null, '8');
INSERT INTO `factura` VALUES ('69', '2016-01-31', null, '3');
INSERT INTO `factura` VALUES ('70', '2016-01-31', null, '7');
INSERT INTO `factura` VALUES ('71', '2016-01-31', null, '6');
INSERT INTO `factura` VALUES ('72', '2016-01-31', null, '6');
INSERT INTO `factura` VALUES ('73', '2016-01-31', null, '6');
INSERT INTO `factura` VALUES ('74', '2016-02-01', null, '2');
INSERT INTO `factura` VALUES ('75', '2016-02-03', null, '4');
INSERT INTO `factura` VALUES ('76', '2016-02-19', null, '2');
INSERT INTO `factura` VALUES ('77', '2016-02-24', null, '4');
INSERT INTO `factura` VALUES ('78', '2016-02-25', null, '6');
INSERT INTO `factura` VALUES ('79', '2016-02-25', null, '7');
INSERT INTO `factura` VALUES ('80', '2016-02-25', null, '5');
INSERT INTO `factura` VALUES ('81', '2016-03-07', null, '5');
INSERT INTO `factura` VALUES ('82', '2016-03-26', null, '2');
INSERT INTO `factura` VALUES ('83', '2016-03-26', null, '1');
INSERT INTO `factura` VALUES ('84', '2016-03-26', null, '3');
INSERT INTO `factura` VALUES ('85', '2016-03-26', null, '4');
INSERT INTO `factura` VALUES ('86', '2016-03-26', null, '5');
INSERT INTO `factura` VALUES ('87', '2016-03-26', null, '2');
INSERT INTO `factura` VALUES ('88', '2016-03-27', null, '9');
INSERT INTO `factura` VALUES ('89', '2016-03-27', null, '5');
INSERT INTO `factura` VALUES ('90', '2016-03-27', null, '8');
INSERT INTO `factura` VALUES ('91', '2016-05-04', null, '4');

-- ----------------------------
-- Table structure for `funcion`
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of funcion
-- ----------------------------
INSERT INTO `funcion` VALUES ('1', 'Inicio', 'app.admin.inicio', '1', 'fa fa-fw fa-dashboard');
INSERT INTO `funcion` VALUES ('2', 'Registrar Campo', 'app.admin.registrar-campo', '1', 'fa fa-fw fa-edit');
INSERT INTO `funcion` VALUES ('3', 'Realizar Reserva', 'app.admin.reserva', '1', 'fa fa-fw fa-table');
INSERT INTO `funcion` VALUES ('4', 'Registrar Cliente', 'app.admin.registrar-cliente', '1', 'fa fa-fw fa-users');
INSERT INTO `funcion` VALUES ('5', 'Reserva Administrativa', 'app.admin.reserva-especial', '1', 'fa fa-fw fa-tablet');
INSERT INTO `funcion` VALUES ('6', 'Reportes', 'app.admin.reportes', '1', 'fa fa-fw fa-bar-chart-o');
INSERT INTO `funcion` VALUES ('7', 'Realizar Prereserva', 'app.cliente.prereserva', '2', 'fa fa-fw fa-table');
INSERT INTO `funcion` VALUES ('8', 'Confirmar Prereserva', 'app.admin.prereserva', '1', 'fa fa-fw fa-check');
INSERT INTO `funcion` VALUES ('9', 'Canchas', 'app.admin.campos', '1', 'fa fa-fw fa-soccer-ball-o');

-- ----------------------------
-- Table structure for `horario`
-- ----------------------------
DROP TABLE IF EXISTS `horario`;
CREATE TABLE `horario` (
  `IdHorario` int(11) NOT NULL AUTO_INCREMENT,
  `HoraInicio` time NOT NULL,
  `HoraFin` time NOT NULL,
  PRIMARY KEY (`IdHorario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of horario
-- ----------------------------
INSERT INTO `horario` VALUES ('1', '08:00:00', '21:00:00');
INSERT INTO `horario` VALUES ('2', '06:00:00', '18:00:00');
INSERT INTO `horario` VALUES ('3', '08:00:00', '12:00:00');
INSERT INTO `horario` VALUES ('4', '08:00:00', '22:00:00');
INSERT INTO `horario` VALUES ('6', '13:00:00', '18:00:00');
INSERT INTO `horario` VALUES ('7', '08:00:00', '20:00:00');
INSERT INTO `horario` VALUES ('8', '07:00:00', '18:00:00');

-- ----------------------------
-- Table structure for `reserva`
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
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of reserva
-- ----------------------------
INSERT INTO `reserva` VALUES ('142', '2016-01-12', '1', '2016-01-14 09:00:00', '2016-01-14 11:00:00', '30', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('143', '2016-01-12', '1', '2016-01-16 10:00:00', '2016-01-16 11:00:00', '31', '0', '1', '2016-01-13 10:44:14', '100', '4');
INSERT INTO `reserva` VALUES ('144', '2016-01-12', '1', '2016-01-17 12:00:00', '2016-01-17 14:00:00', '32', '0', '1', '2016-01-13 17:52:12', '200', '4');
INSERT INTO `reserva` VALUES ('145', '2016-01-12', '1', '2016-01-14 13:00:00', '2016-01-14 14:00:00', '33', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('147', '2016-01-12', '1', '2016-01-14 15:00:00', '2016-01-14 16:00:00', '35', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('149', '2016-01-12', '1', '2016-01-15 16:00:00', '2016-01-15 17:00:00', '37', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('151', '2016-01-14', '4', '2016-01-17 15:00:00', '2016-01-17 17:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('152', '2016-01-14', '4', '2016-01-17 10:00:00', '2016-01-17 12:00:00', '39', '0', '1', null, '160', '1');
INSERT INTO `reserva` VALUES ('153', '2016-01-14', '30', '2016-01-17 10:00:00', '2016-01-17 13:00:00', '40', '0', '1', null, '270', '1');
INSERT INTO `reserva` VALUES ('154', '2016-01-20', '1', '2016-01-21 09:00:00', '2016-01-21 10:00:00', '41', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('155', '2016-01-20', '1', '2016-01-22 09:00:00', '2016-01-22 10:00:00', '41', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('156', '2016-01-20', '1', '2016-01-22 11:00:00', '2016-01-22 13:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('157', '2016-01-20', '1', '2016-01-24 09:00:00', '2016-01-24 11:00:00', '42', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('158', '2016-01-20', '1', '2016-01-23 08:00:00', '2016-01-23 09:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('159', '2016-01-20', '1', '2016-01-23 10:00:00', '2016-01-23 12:00:00', '43', '0', '1', '2016-01-21 14:08:58', '200', '4');
INSERT INTO `reserva` VALUES ('160', '2016-01-20', '1', '2016-01-24 14:00:00', '2016-01-24 16:00:00', '44', '0', '1', '2016-01-21 14:11:06', '200', '4');
INSERT INTO `reserva` VALUES ('161', '2016-01-20', '1', '2016-01-23 13:00:00', '2016-01-23 14:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('162', '2016-01-20', '1', '2016-01-23 18:00:00', '2016-01-23 19:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('163', '2016-01-20', '1', '2016-01-24 18:00:00', '2016-01-24 19:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('164', '2016-01-20', '1', '2016-01-22 16:00:00', '2016-01-22 17:00:00', '45', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('165', '2016-01-20', '1', '2016-01-23 16:00:00', '2016-01-23 17:00:00', '45', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('166', '2016-01-20', '1', '2016-01-24 16:00:00', '2016-01-24 17:00:00', '45', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('167', '2016-01-20', '1', '2016-01-22 19:00:00', '2016-01-22 20:00:00', '46', '0', '1', null, '100', '1');
INSERT INTO `reserva` VALUES ('168', '2016-01-24', '1', '2016-02-05 09:00:00', '2016-02-05 10:00:00', '47', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('169', '2016-01-24', '1', '2016-01-24 21:00:00', '2016-01-24 22:00:00', '48', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('170', '2016-01-26', '1', '2016-01-27 09:00:00', '2016-01-27 10:00:00', '49', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('171', '2016-01-26', '1', '2016-03-04 10:00:00', '2016-03-04 12:00:00', '50', '0', '1', null, '400', '1');
INSERT INTO `reserva` VALUES ('172', '2016-01-26', '1', '2016-03-05 10:00:00', '2016-03-05 12:00:00', '50', '0', '1', null, '400', '1');
INSERT INTO `reserva` VALUES ('173', '2016-01-26', '1', '2016-03-06 10:00:00', '2016-03-06 12:00:00', '50', '0', '1', null, '400', '1');
INSERT INTO `reserva` VALUES ('174', '2016-01-26', '1', '2016-04-13 09:00:00', '2016-04-13 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('175', '2016-01-26', '1', '2016-04-20 09:00:00', '2016-04-20 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('176', '2016-01-26', '1', '2016-04-27 09:00:00', '2016-04-27 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('177', '2016-01-26', '1', '2016-05-04 09:00:00', '2016-05-04 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('178', '2016-01-26', '1', '2016-05-11 09:00:00', '2016-05-11 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('179', '2016-01-26', '1', '2016-05-18 09:00:00', '2016-05-18 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('180', '2016-01-26', '1', '2016-05-25 09:00:00', '2016-05-25 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('181', '2016-01-26', '1', '2016-06-01 09:00:00', '2016-06-01 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('182', '2016-01-26', '1', '2016-06-08 09:00:00', '2016-06-08 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('183', '2016-01-26', '1', '2016-06-15 09:00:00', '2016-06-15 10:00:00', '51', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('184', '2016-01-26', '1', '2016-06-29 10:00:00', '2016-06-29 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('185', '2016-01-26', '1', '2016-07-06 10:00:00', '2016-07-06 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('186', '2016-01-26', '1', '2016-07-13 10:00:00', '2016-07-13 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('187', '2016-01-26', '1', '2016-07-20 10:00:00', '2016-07-20 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('188', '2016-01-26', '1', '2016-07-27 10:00:00', '2016-07-27 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('189', '2016-01-26', '1', '2016-08-03 10:00:00', '2016-08-03 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('190', '2016-01-26', '1', '2016-08-10 10:00:00', '2016-08-10 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('191', '2016-01-26', '1', '2016-08-17 10:00:00', '2016-08-17 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('192', '2016-01-26', '1', '2016-08-24 10:00:00', '2016-08-24 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('193', '2016-01-26', '1', '2016-08-31 10:00:00', '2016-08-31 11:00:00', '52', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('194', '2016-01-26', '1', '2016-01-30 10:00:00', '2016-01-30 11:00:00', '53', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('195', '2016-01-26', '1', '2016-01-31 10:00:00', '2016-01-31 11:00:00', '53', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('196', '2016-01-26', '1', '2016-02-01 10:00:00', '2016-02-01 11:00:00', '53', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('198', '2016-01-26', '1', '2016-01-31 13:00:00', '2016-01-31 14:00:00', '55', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('199', '2016-01-29', '1', '2016-01-30 16:00:00', '2016-01-30 17:00:00', '56', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('200', '2016-01-29', '1', '2016-01-30 12:00:00', '2016-01-30 13:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('201', '2016-01-29', '1', '2016-01-31 08:00:00', '2016-01-31 09:00:00', '57', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('202', '2016-01-29', '1', '2016-01-31 18:00:00', '2016-01-31 19:00:00', '58', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('203', '2016-01-29', '1', '2016-01-31 15:00:00', '2016-01-31 16:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('204', '2016-01-29', '1', '2016-01-29 08:00:00', '2016-01-29 11:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('205', '2016-01-30', '1', '2016-02-03 12:00:00', '2016-02-03 13:00:00', '59', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('206', '2016-01-30', '1', '2016-02-04 12:00:00', '2016-02-04 13:00:00', '59', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('207', '2016-01-30', '1', '2016-02-05 12:00:00', '2016-02-05 13:00:00', '59', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('208', '2016-01-30', '1', '2016-02-06 12:00:00', '2016-02-06 13:00:00', '59', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('209', '2016-01-30', '1', '2016-02-07 12:00:00', '2016-02-07 13:00:00', '59', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('210', '2016-01-30', '1', '2016-02-08 12:00:00', '2016-02-08 13:00:00', '59', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('211', '2016-01-30', '1', '2016-02-04 15:00:00', '2016-02-04 17:00:00', '60', '0', '1', '2016-01-31 18:43:38', '400', '4');
INSERT INTO `reserva` VALUES ('212', '2016-01-31', '1', '2016-01-31 16:00:00', '2016-01-31 17:00:00', '61', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('213', '2016-01-31', '1', '2016-01-31 17:00:00', '2016-01-31 18:00:00', '62', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('214', '2016-01-31', '4', '2016-01-31 15:00:00', '2016-01-31 18:00:00', '63', '0', '1', null, '240', '1');
INSERT INTO `reserva` VALUES ('215', '2016-01-31', '30', '2016-01-31 17:00:00', '2016-01-31 19:00:00', '64', '0', '1', null, '180', '1');
INSERT INTO `reserva` VALUES ('216', '2016-01-31', '30', '2016-02-01 17:00:00', '2016-02-01 19:00:00', '64', '0', '1', null, '180', '1');
INSERT INTO `reserva` VALUES ('217', '2016-01-31', '30', '2016-01-31 19:00:00', '2016-01-31 20:00:00', '65', '0', '1', null, '90', '1');
INSERT INTO `reserva` VALUES ('218', '2016-01-31', '1', '2016-01-31 19:00:00', '2016-01-31 20:00:00', '66', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('219', '2016-01-31', '1', '2016-01-31 20:00:00', '2016-01-31 21:00:00', '67', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('220', '2016-01-31', '1', '2016-01-31 21:00:00', '2016-01-31 22:00:00', '68', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('221', '2016-01-31', '4', '2016-01-31 18:00:00', '2016-01-31 19:00:00', '69', '0', '1', null, '80', '1');
INSERT INTO `reserva` VALUES ('222', '2016-01-31', '4', '2016-01-31 19:00:00', '2016-01-31 20:00:00', '70', '0', '1', null, '80', '1');
INSERT INTO `reserva` VALUES ('223', '2016-01-31', '4', '2016-01-31 20:00:00', '2016-01-31 21:00:00', '71', '0', '1', null, '80', '1');
INSERT INTO `reserva` VALUES ('224', '2016-01-31', '30', '2016-01-31 16:00:00', '2016-01-31 17:00:00', '72', '0', '1', null, '90', '1');
INSERT INTO `reserva` VALUES ('225', '2016-01-31', '30', '2016-01-31 15:00:00', '2016-01-31 16:00:00', '73', '0', '1', null, '90', '1');
INSERT INTO `reserva` VALUES ('226', '2016-02-01', '1', '2016-02-03 10:00:00', '2016-02-03 11:00:00', '74', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('227', '2016-02-03', '1', '2016-02-06 15:00:00', '2016-02-06 16:00:00', '75', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('228', '2016-02-19', '1', '2016-02-20 10:00:00', '2016-02-20 11:00:00', '76', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('229', '2016-02-19', '1', '2016-02-21 10:00:00', '2016-02-21 11:00:00', '76', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('230', '2016-02-19', '1', '2016-02-20 12:00:00', '2016-02-20 22:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('231', '2016-02-24', '1', '2016-02-28 10:00:00', '2016-02-28 11:00:00', '77', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('232', '2016-02-25', '1', '2016-02-27 13:00:00', '2016-02-27 14:00:00', '78', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('233', '2016-02-25', '1', '2016-02-28 13:00:00', '2016-02-28 14:00:00', '79', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('234', '2016-02-25', '1', '2016-02-29 13:00:00', '2016-02-29 14:00:00', '79', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('235', '2016-02-25', '1', '2016-03-01 13:00:00', '2016-03-01 14:00:00', '79', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('236', '2016-02-25', '1', '2016-02-27 15:00:00', '2016-02-27 17:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('237', '2016-02-25', '1', '2016-02-28 15:00:00', '2016-02-28 17:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('238', '2016-02-25', '1', '2016-02-28 18:00:00', '2016-02-28 19:00:00', '80', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('239', '2016-03-07', '1', '2016-03-12 11:00:00', '2016-03-12 12:00:00', '81', '0', '1', null, '200', '1');
INSERT INTO `reserva` VALUES ('240', '2016-03-26', '1', '2016-03-29 10:00:00', '2016-03-29 12:00:00', '82', '0', '1', '2016-03-27 10:58:07', '400', '4');
INSERT INTO `reserva` VALUES ('241', '2016-03-26', '1', '2016-03-29 13:00:00', '2016-03-29 14:00:00', '83', '0', '0', '2016-03-27 10:58:44', '200', '4');
INSERT INTO `reserva` VALUES ('242', '2016-03-26', '4', '2016-03-28 09:00:00', '2016-03-28 10:00:00', '84', '0', '1', null, '80', '1');
INSERT INTO `reserva` VALUES ('243', '2016-03-26', '4', '2016-03-30 08:00:00', '2016-03-30 10:00:00', '85', '0', '1', null, '160', '1');
INSERT INTO `reserva` VALUES ('244', '2016-03-26', '4', '2016-04-01 09:00:00', '2016-04-01 10:00:00', '86', '0', '1', null, '80', '1');
INSERT INTO `reserva` VALUES ('245', '2016-03-26', '4', '2016-03-29 10:00:00', '2016-03-29 11:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('246', '2016-03-26', '4', '2016-03-31 09:00:00', '2016-03-31 10:00:00', null, '1', '1', null, '0', '2');
INSERT INTO `reserva` VALUES ('247', '2016-03-26', '4', '2016-04-02 08:00:00', '2016-04-02 10:00:00', '87', '0', '0', '2016-03-27 23:21:08', '160', '4');
INSERT INTO `reserva` VALUES ('248', '2016-03-27', '4', '2016-04-03 10:00:00', '2016-04-03 11:00:00', '88', '0', '1', null, '80', '1');
INSERT INTO `reserva` VALUES ('249', '2016-03-27', '4', '2016-04-03 09:00:00', '2016-04-03 10:00:00', '89', '0', '1', null, '80', '1');
INSERT INTO `reserva` VALUES ('250', '2016-03-27', '31', '2016-04-02 15:00:00', '2016-04-02 18:00:00', '90', '0', '1', null, '300', '1');
INSERT INTO `reserva` VALUES ('251', '2016-05-04', '4', '2016-05-06 09:00:00', '2016-05-06 10:00:00', '91', '0', '1', null, '80', '1');
INSERT INTO `reserva` VALUES ('252', '2016-05-04', '4', '2016-05-07 09:00:00', '2016-05-07 10:00:00', null, '1', '1', null, '0', '2');

-- ----------------------------
-- Table structure for `rol`
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
-- Table structure for `servicio`
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
-- Table structure for `servicio_complejo`
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
-- Table structure for `superficie`
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
-- Table structure for `tiporeserva`
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
INSERT INTO `tiporeserva` VALUES ('2', 'Administrativa');
INSERT INTO `tiporeserva` VALUES ('3', 'Evento');
INSERT INTO `tiporeserva` VALUES ('4', 'Prereserva');

-- ----------------------------
-- Table structure for `usuario`
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

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
INSERT INTO `usuario` VALUES ('28', 'aurora@gmail.com', '4567890', '1', 'aurora@gmail.com');
INSERT INTO `usuario` VALUES ('29', 'academia@gmail.com', '4657891', '1', 'academia@gmail.com');
INSERT INTO `usuario` VALUES ('30', 'ultimos@ultimo', '456789', '1', 'ultimos@ultimo');
INSERT INTO `usuario` VALUES ('31', 'willsterman@gmail.com', '111111', '1', 'willsterman@gmail.com');
INSERT INTO `usuario` VALUES ('32', 'alberto@gmail.com', '7894556', '2', 'alberto@gmail.com');
