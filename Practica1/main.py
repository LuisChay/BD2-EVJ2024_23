import csv
import mysql.connector

# Configuración de la conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="usuario",
    password="contraseña",
    database="nombre_de_la_base_de_datos"
)

# Crear un cursor
cursor = db.cursor()

# Leer el archivo CSV
with open('datos_pacientes.csv', 'r') as file:
    csvreader = csv.reader(file)
    next(csvreader)  # Saltar la primera fila (encabezados)

    # Dividir la carga de datos en lotes
    batch_size = 1000
    batch = []

    for row in csvreader:
        id_paciente, edad_paciente, genero = row
        batch.append(int(id_paciente), (int(edad_paciente), genero))

        if len(batch) == batch_size:
            # Insertar los datos en lotes
            insert_query = "INSERT INTO pacientes (id_paciente, edad_paciente, genero) VALUES (%s, %s, %s)"
            cursor.executemany(insert_query, batch)
            db.commit()
            batch = []

    # Insertar el último lote de datos
    if batch:
        insert_query = "INSERT INTO pacientes (edad_paciente, genero) VALUES (%s, %s)"
        cursor.executemany(insert_query, batch)
        db.commit()

# Cerrar el cursor y la conexión
cursor.close()
db.close()