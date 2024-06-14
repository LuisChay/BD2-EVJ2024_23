 -- DROP DATABASE practica1bd2;

-- CREACION DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS practica1bd2;

-- NOS COLOCAMOS EN LA BASE DE DATOS
USE practica1bd2;

-- CREACION DE LAS TABLAS
-- TABLA DEL LOG DE ACTIVIDADES

-- DROP table LOG_ACTIVIDAD;


-- TABLA DE PACIENTES
CREATE TABLE IF NOT EXISTS PACIENTE (
    id_paciente INT PRIMARY KEY,
    edad_paciente INT,
    genero VARCHAR(20)
);


-- TABLA DE HABITACIONES
CREATE TABLE IF NOT EXISTS HABITACION (
    id_habitacion INT PRIMARY KEY,
    habitacion VARCHAR(50)
);


CREATE TABLE IF NOT EXISTS LOG_ACTIVIDAD (
    id_log_actividad INT PRIMARY KEY auto_increment,
    timestampx VARCHAR(100),
    actividad VARCHAR(500),
    id_paciente INT,
    id_habitacion INT,
    FOREIGN KEY (id_paciente) REFERENCES PACIENTE(id_paciente),
    FOREIGN KEY (id_habitacion) REFERENCES HABITACION(id_habitacion)
);


-- TABLA DE LOG DE HABITACIONES
CREATE TABLE IF NOT EXISTS LOG_HABITACION (
    id_log_habitacion INT PRIMARY KEY AUTO_INCREMENT,
    timestampx VARCHAR(100),
    statusx VARCHAR(45),
    id_habitacion INT,
    FOREIGN KEY (id_habitacion) REFERENCES HABITACION(id_habitacion)
);



-- 1 Datos de pacientes
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\CSV\\pacientes.csv'
INTO TABLE PACIENTE
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_paciente, edad_paciente, genero);


-- 2 datos de habitaciones
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\CSV\\Habitaciones.csv'
INTO TABLE habitacion
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_habitacion, habitacion);




-- datos de habitaciones
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\CSV\\LogHabitacion.csv'
INTO TABLE log_habitacion
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id_habitacion,timestampx,statusx);

    
-- datos de habitaciones
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\CSV\\LogActividades1.csv'
INTO TABLE log_actividad
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(timestampx,actividad,id_habitacion,id_paciente);

-- datos de actividades 2
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\CSV\\LogActividades2.csv'
INTO TABLE log_actividad
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(timestampx,actividad,id_habitacion,id_paciente);

SELECT * FROM PACIENTE;
SELECT * FROM habitacion;
SELECT * FROM log_habitacion;
SELECT * FROM log_actividad;

SHOW VARIABLES LIKE 'secure_file_priv';

-- Quitar verificacion de llaves foraneas para hacer truncate 
SET FOREIGN_KEY_CHECKS = 0;


SELECT COUNT(*) FROM paciente;
SELECT COUNT(*) FROM habitacion;
SELECT COUNT(*) FROM log_habitacion;
SELECT COUNT(*) FROM log_actividad;


-- Borrar DATOS
TRUNCATE TABLE log_actividad;
TRUNCATE TABLE log_habitacion;
TRUNCATE TABLE habitacion;
TRUNCATE TABLE paciente;


TRUNCATE TABLE LOG_ACTIVIDAD;
TRUNCATE TABLE LOG_HABITACION;	
TRUNCATE TABLE PACIENTE;
TRUNCATE TABLE HABITACION;



 