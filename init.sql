CREATE TABLE LOG_ACTIVIDAD (
    id_log_actividad INT PRIMARY KEY,
    timestampx VARCHAR(100),
    actividad VARCHAR(500),
    id_paciente INT,
    habitacion INT,
    FOREIGN KEY (id_paciente) REFERENCES PACIENTE(id_paciente),
    FOREIGN KEY (habitacion) REFERENCES HABITACION(id_habitacion)
);

CREATE TABLE HABITACION (
    id_habitacion INT PRIMARY KEY,
    habitacion VARCHAR(50),
);

CREATE TABLE PACIENTE (
    id_paciente INT PRIMARY KEY,
    edad_paciente INT,
    genero VARCHAR(20)
);

CREATE TABLE LOG_HABITACION (
    timestampx VARCHAR(100),
    statusx VARCHAR(45),
    id_habitacion INT,
    FOREIGN KEY (id_habitacion) REFERENCES HABITACION(id_habitacion)
);