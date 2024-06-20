-- NOS CAMBIAMOS A LA BASE DE DATOS
USE BD2_PRY1;

-- LISTAMOS TODAS LAS TABLAS
SELECT * FROM SYS.tables;

-- VER EL CONTENIDO DE UNA TABLA
SELECT * FROM proyecto1.Course c ;
SELECT * FROM proyecto1.CourseAssignment ca ;
SELECT * FROM proyecto1.CourseTutor ct ;
SELECT * FROM proyecto1.HistoryLog hl ;
SELECT * FROM proyecto1.Notification n ;
SELECT * FROM proyecto1.ProfileStudent ps ;
SELECT * FROM proyecto1.Roles r ;
SELECT * FROM proyecto1.TFA t ;
SELECT * FROM proyecto1.TutorProfile tp ;
SELECT * FROM proyecto1.UsuarioRole ur ;
SELECT * FROM proyecto1.Usuarios u ;


-- FUNCION NUMERO F1
CREATE FUNCTION proyecto1.F1(@codCourse INT)
RETURNS TABLE
AS 
RETURN(
	SELECT u.Id, u.Firstname, u.Lastname, u.Email
	FROM proyecto1.CourseAssignment ca
	INNER JOIN proyecto1.Usuarios u ON ca.StudentId = u.Id
	WHERE ca.CourseCodCourse = @codCourse
);

SELECT * FROM proyecto1.F1(283);


-- FUNCION NUMERO F2
CREATE FUNCTION proyecto1.F2(@TutorId uniqueidentifier)
RETURNS TABLE
AS
RETURN(
	SELECT c.CodCourse, c.Name, c.CreditsRequired
	FROM proyecto1.CourseTutor ct
	JOIN proyecto1.Course c ON ct.CourseCodCourse = c.CodCourse
	WHERE ct.TutorId = @TutorId
);

-- DROP FUNCTION [proyecto1].[F2];
SELECT * FROM proyecto1.F2('B5EBA034-8F44-47F9-8A9A-82B501C375EA');


-- FUNCION NUMERO F3
CREATE FUNCTION proyecto1.F3(@UsuarioId uniqueidentifier)
RETURNS TABLE
AS 
RETURN(
	SELECT n.Id, n.UserId, n.Message, n.Date
	FROM proyecto1.Notification n
	WHERE n.userId = @UsuarioId
);

SELECT * FROM proyecto1.F3('B5EBA034-8F44-47F9-8A9A-82B501C375EA');


-- FUNCION NUMERO F4
CREATE OR REPLACE FUNCTION proyecto1.F4()
RETURNS TABLE
AS
RETURN
(
    SELECT *
    FROM proyecto1.HistoryLog
);

SELECT * FROM proyecto1.F4();


-- FUNCION NUMERO F5
CREATE FUNCTION proyecto1.F5 (@Id uniqueidentifier)
RETURNS TABLE
AS
RETURN (
    SELECT
        u.Firstname,
        u.Lastname,
        u.Email,
        u.DateOfBirth,
        ps.Credits,
        r.RoleName
    FROM
        Usuarios u
        INNER JOIN ProfileStudent ps ON u.Id = ps.UserId
        INNER JOIN UsuarioRole ur ON u.Id = ur.UserId
        INNER JOIN Roles r ON ur.RoleId = r.Id
    WHERE
        u.Id = @Id
);

SELECT * FROM proyecto1.F5('00000000-0000-0000-0000-000000000045');


