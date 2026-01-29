DROP DATABASE IF EXISTS calquedar;
CREATE DATABASE calquedar CHARSET utf8mb4 COLLATE utf8mb4_bin;
USE calquedar;

CREATE TABLE USUARIO (
    username VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(75) NOT NULL,
    contrasenya VARCHAR(100) NOT NULL
);

CREATE TABLE GRUPO (
	id CHAR(6) PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL
);

CREATE TABLE MIEMBROS_GRUPO (
	usuario VARCHAR(36),
	grupo CHAR(6),
	administrador VARCHAR(36),
	PRIMARY KEY (usuario, grupo),
	FOREIGN KEY (usuario) REFERENCES USUARIO (username),
	FOREIGN KEY (grupo) REFERENCES GRUPO(id),
	FOREIGN KEY (administrador) REFERENCES USUARIO (username)
	ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE AMISTAD (
	id int AUTO_INCREMENT PRIMARY KEY,
	amigo1 VARCHAR(36) NOT NULL,
	amigo2 VARCHAR(36) NOT NULL,
	FOREIGN KEY (amigo1) REFERENCES USUARIO(username),
	FOREIGN KEY (amigo2) REFERENCES USUARIO(username)
);


CREATE TABLE EVENTO_PERSONAL (
	id int AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(100) DEFAULT 'titulo',
	visibilidad ENUM('publico', 'privado', 'secreto'),
	etiqueta ENUM('viaje', 'dia libre', 'cita', 'plan grupo', 'misc', 'médico', 'selfcare'),
	fecha DATETIME,
	descripcion MEDIUMTEXT,
	creador VARCHAR(36) NOT NULL,
	FOREIGN KEY (creador) REFERENCES USUARIO(username)
);

CREATE TABLE EVENTO_GRUPAL (
	id int AUTO_INCREMENT PRIMARY KEY,
	planFinal TEXT,
	fecha DATE NOT NULL,
	grupo CHAR(6) NOT NULL,
	FOREIGN KEY (grupo) REFERENCES GRUPO(id)
);

CREATE TABLE PARTICIPANTES_EVENTO (
	evento int,
	usuario VARCHAR(36),
	sugerencia TEXT,
	FOREIGN KEY (evento) REFERENCES EVENTO_GRUPAL(id),
	FOREIGN KEY (usuario) REFERENCES USUARIO(username),
	PRIMARY KEY (evento, usuario)
);