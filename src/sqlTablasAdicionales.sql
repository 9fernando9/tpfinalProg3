-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2025 a las 13:07:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbsalones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `encuesta_id` int(11) NOT NULL,
  `reserva_id` int(11) NOT NULL,
  `puntuacion` int(1) NOT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` varchar(500) DEFAULT NULL,
  `fecha_encuesta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`encuesta_id`, `reserva_id`, `puntuacion`, `comentario`, `fecha_encuesta`) VALUES
(2, 1, 5, 'Excelente atención y decoración!', '2025-11-06 17:57:36'),
(3, 8, 5, 'buen lugar', '2025-11-07 20:58:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas_comentarios`
--

CREATE TABLE `reservas_comentarios` (
  `comentario_id` int(11) NOT NULL,
  `reserva_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `comentario` varchar(500) NOT NULL,
  `fecha_comentario` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reservas_comentarios`
--

INSERT INTO `reservas_comentarios` (`comentario_id`, `reserva_id`, `usuario_id`, `comentario`, `fecha_comentario`) VALUES
(1, 1, 4, 'Pago 50% de la reserva', '2025-11-06 18:38:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`encuesta_id`),
  ADD KEY `encuestas_fk1` (`reserva_id`);

--
-- Indices de la tabla `reservas_comentarios`
--
ALTER TABLE `reservas_comentarios`
  ADD PRIMARY KEY (`comentario_id`),
  ADD KEY `fk_reserva_comentario` (`reserva_id`),
  ADD KEY `fk_usuario_comentario` (`usuario_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `encuesta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reservas_comentarios`
--
ALTER TABLE `reservas_comentarios`
  MODIFY `comentario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `encuestas`
--
ALTER TABLE `encuestas`
  ADD CONSTRAINT `encuestas_fk1` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`reserva_id`);

--
-- Filtros para la tabla `reservas_comentarios`
--
ALTER TABLE `reservas_comentarios`
  ADD CONSTRAINT `fk_reserva_comentario` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`reserva_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_usuario_comentario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
