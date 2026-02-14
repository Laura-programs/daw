-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-02-2026 a las 14:03:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `calquedar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amistad`
--

CREATE TABLE `amistad` (
  `amigo1` varchar(36) NOT NULL,
  `amigo2` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `amistad`
--

INSERT INTO `amistad` (`amigo1`, `amigo2`) VALUES
('tokoyamik', 'laura_mora');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento_grupal`
--

CREATE TABLE `evento_grupal` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `planFinal` text DEFAULT NULL,
  `fecha` date NOT NULL,
  `grupo` char(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento_personal`
--

CREATE TABLE `evento_personal` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT 'titulo',
  `visibilidad` enum('publico','privado') DEFAULT NULL,
  `etiqueta` enum('viaje','dia-libre','cita','plan-grupo','misc','medico','selfcare') DEFAULT NULL,
  `fechaInicio` datetime DEFAULT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `descripcion` mediumtext DEFAULT NULL,
  `creador` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `evento_personal`
--

INSERT INTO `evento_personal` (`id`, `titulo`, `visibilidad`, `etiqueta`, `fechaInicio`, `fechaFin`, `descripcion`, `creador`) VALUES
(1, 'Cervezas', 'publico', 'plan-grupo', '2026-02-20 18:30:00', NULL, 'Cervezas con Abi para celebrar el fin de exámenes', 'laura_mora'),
(2, 'Exámenes', 'publico', 'misc', '2026-02-16 16:30:00', '2026-02-20 18:30:00', 'Todos los exámenes :(', 'laura_mora'),
(4, 'Aniversario', 'publico', 'cita', '2026-02-15 11:00:00', NULL, 'Ir a ver museos con Laura', 'tokoyamik');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `id` char(6) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `miembros_grupo`
--

CREATE TABLE `miembros_grupo` (
  `usuario` varchar(36) NOT NULL,
  `grupo` char(6) NOT NULL,
  `administrador` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participantes_evento`
--

CREATE TABLE `participantes_evento` (
  `evento` int(11) NOT NULL,
  `usuario` varchar(36) NOT NULL,
  `sugerencia` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `username` varchar(36) NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `contrasenya` varchar(100) NOT NULL,
  `administrador` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`username`, `nombre`, `contrasenya`, `administrador`) VALUES
('laura_mora', 'Laura', 'Test!123', 0),
('tokoyamik', 'Toko', 'Test!123', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amistad`
--
ALTER TABLE `amistad`
  ADD PRIMARY KEY (`amigo1`,`amigo2`),
  ADD KEY `amigo2` (`amigo2`);

--
-- Indices de la tabla `evento_grupal`
--
ALTER TABLE `evento_grupal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grupo` (`grupo`);

--
-- Indices de la tabla `evento_personal`
--
ALTER TABLE `evento_personal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creador` (`creador`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `miembros_grupo`
--
ALTER TABLE `miembros_grupo`
  ADD PRIMARY KEY (`usuario`,`grupo`),
  ADD KEY `grupo` (`grupo`);

--
-- Indices de la tabla `participantes_evento`
--
ALTER TABLE `participantes_evento`
  ADD PRIMARY KEY (`evento`,`usuario`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evento_grupal`
--
ALTER TABLE `evento_grupal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evento_personal`
--
ALTER TABLE `evento_personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `amistad`
--
ALTER TABLE `amistad`
  ADD CONSTRAINT `amistad_ibfk_1` FOREIGN KEY (`amigo1`) REFERENCES `usuario` (`username`),
  ADD CONSTRAINT `amistad_ibfk_2` FOREIGN KEY (`amigo2`) REFERENCES `usuario` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evento_grupal`
--
ALTER TABLE `evento_grupal`
  ADD CONSTRAINT `evento_grupal_ibfk_1` FOREIGN KEY (`grupo`) REFERENCES `grupo` (`id`);

--
-- Filtros para la tabla `evento_personal`
--
ALTER TABLE `evento_personal`
  ADD CONSTRAINT `evento_personal_ibfk_1` FOREIGN KEY (`creador`) REFERENCES `usuario` (`username`);

--
-- Filtros para la tabla `miembros_grupo`
--
ALTER TABLE `miembros_grupo`
  ADD CONSTRAINT `miembros_grupo_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`username`),
  ADD CONSTRAINT `miembros_grupo_ibfk_2` FOREIGN KEY (`grupo`) REFERENCES `grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `participantes_evento`
--
ALTER TABLE `participantes_evento`
  ADD CONSTRAINT `participantes_evento_ibfk_1` FOREIGN KEY (`evento`) REFERENCES `evento_grupal` (`id`),
  ADD CONSTRAINT `participantes_evento_ibfk_2` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
