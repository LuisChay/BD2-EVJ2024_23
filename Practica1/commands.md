
Comandos para generar backups y restaurarlos.

Full Backup

mysqldump -u root -p12345678 practica1bd2 > C:\sqlbackup\full_backup_dia1_1.sql

Incremental Backup

mysqldump -u root -p12345678 practica1bd2 paciente > C:\sqlbackup\paciente_backup_dia1.sql


Restaurar
Comando: 

mysql -u root -p12345678 practica1bd2 > C:\sqlbackup\full_backup_dia1_1.sql



Actividad 2

Full BCKP
mysqldump -u root -p12345678 practica1bd2 > C:\sqlbackup\full_backup_dia1_2.sql

INC
mysqldump -u root -p12345678 practica1bd2 habitacion > C:\sqlbackup\habitacion_backup_dia1.sql



Actividad 3

Full BCKP
mysqldump -u root -p12345678 practica1bd2 > C:\sqlbackup\full_backup_dia1_3.sql

INC
mysqldump -u root -p12345678 practica1bd2 log_habitacion > C:\sqlbackup\log_habitacion_backup_dia1.sql



Actividad 4

Full BCKP
mysqldump -u root -p12345678 practica1bd2 > C:\sqlbackup\full_backup_dia2_4.sql

INC
mysqldump -u root -p12345678 practica1bd2 log_actividad > C:\sqlbackup\log_actividad1_backup_dia2.sql


Actividad 5

Full BCKP
mysqldump -u root -p12345678 practica1bd2 > C:\sqlbackup\full_backup_dia2_5.sql

INC
mysqldump -u root -p12345678 practica1bd2 log_actividad > C:\sqlbackup\log_actividad2_backup_dia2.sql




______________________________________________________________________________________________________



Creacion backup completo

measure-Command { Get-Content .\full_backup_dia1_1.sql | mysql -u root -p12345678 practica1bd2 }

measure-command {cmd /c 'mysql -u root -p12345678 practica1bd2 < full_backup_dia1_1.sql}


Restaurar:

Full Backups

measure-command { Get-Content -Path "full_backup_dia1_1.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}

measure-command { Get-Content -Path "full_backup_dia1_2.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}

measure-command { Get-Content -Path "full_backup_dia1_3.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}

measure-command { Get-Content -Path "full_backup_dia2_4.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}


measure-command { Get-Content -Path "full_backup_dia2_5.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}



Backups incrementales


measure-command { Get-Content -Path "paciente_backup_dia1.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}

measure-command { Get-Content -Path "habitacion_backup_dia1.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}


measure-command { Get-Content -Path "log_habitacion_backup_dia1.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}


measure-command { Get-Content -Path "log_actividad1_backup_dia2.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}

measure-command { Get-Content -Path "log_actividad2_backup_dia2.sql" | cmd /c "mysql -u root -p12345678 practica1bd2"}