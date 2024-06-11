DROP DATABASE practica1bd2;

-- CREACION DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS practica1bd2;

-- NOS COLOCAMOS EN LA BASE DE DATOS
USE practica1bd2;

-- CREACION DE LAS TABLAS
-- TABLA DEL LOG DE ACTIVIDADES
CREATE TABLE IF NOT EXISTS LOG_ACTIVIDAD (
    id_log_actividad INT PRIMARY KEY,
    timestampx VARCHAR(100),
    actividad VARCHAR(500),
    id_paciente INT,
    id_habitacion INT,
    FOREIGN KEY (id_paciente) REFERENCES PACIENTE(id_paciente),
    FOREIGN KEY (id_habitacion) REFERENCES HABITACION(id_habitacion)
);

-- TABLA DE HABITACIONES
CREATE TABLE IF NOT EXISTS HABITACION (
    id_habitacion INT PRIMARY KEY,
    habitacion VARCHAR(50)
);

-- TABLA DE PACIENTES
CREATE TABLE IF NOT EXISTS PACIENTE (
    id_paciente INT PRIMARY KEY,
    edad_paciente INT,
    genero VARCHAR(20)
);

-- TABLA DE LOG DE HABITACIONES
CREATE TABLE IF NOT EXISTS LOG_HABITACION (
    id_log_habitacion INT PRIMARY KEY,
    timestampx VARCHAR(100),
    statusx VARCHAR(45),
    id_habitacion INT,
    FOREIGN KEY (id_habitacion) REFERENCES HABITACION(id_habitacion)
);


LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\CSV\\pacientes.csv'
INTO TABLE PACIENTE
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_paciente, edad_paciente, genero);

SELECT * FROM PACIENTE;

SHOW VARIABLES LIKE 'secure_file_priv';

SELECT COUNT(*) FROM paciente; 