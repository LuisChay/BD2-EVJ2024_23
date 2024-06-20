---- Course ----
---- Insert ----
CREATE TRIGGER trg_course_history
ON proyecto1.Course
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into Course: CodCourse=', i.CodCourse, ', Name=', i.Name, ', CreditsRequired=', i.CreditsRequired)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_course_history_update
ON proyecto1.Course
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on Course: CodCourse=', i.CodCourse, ', Name=', i.Name, ', CreditsRequired=', i.CreditsRequired)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_course_history_delete
ON proyecto1.Course
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from Course: CodCourse=', d.CodCourse, ', Name=', d.Name, ', CreditsRequired=', d.CreditsRequired)
    FROM deleted d;
END;
---- Course Assignment ----
---- Insert ----
CREATE TRIGGER trg_course_assignment_insert
ON proyecto1.CourseAssignment
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into CourseAssignment: Id=', i.Id, ', StudentId=', i.StudentId, ', CourseCodCourse=', i.CourseCodCourse)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_course_assignment_update
ON proyecto1.CourseAssignment
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on CourseAssignment: Id=', i.Id, ', StudentId=', i.StudentId, ', CourseCodCourse=', i.CourseCodCourse)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_course_assignment_delete
ON proyecto1.CourseAssignment
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from CourseAssignment: Id=', d.Id, ', StudentId=', d.StudentId, ', CourseCodCourse=', d.CourseCodCourse)
    FROM deleted d;
END;
---- Course Tutor ----
---- Insert ----
CREATE TRIGGER trg_course_tutor_insert
ON proyecto1.CourseTutor
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into CourseTutor: Id=', i.Id, ', TutorId=', i.TutorId, ', CourseCodCourse=', i.CourseCodCourse)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_course_tutor_update
ON proyecto1.CourseTutor
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on CourseTutor: Id=', i.Id, ', TutorId=', i.TutorId, ', CourseCodCourse=', i.CourseCodCourse)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_course_tutor_delete
ON proyecto1.CourseTutor
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from CourseTutor: Id=', d.Id, ', TutorId=', d.TutorId, ', CourseCodCourse=', d.CourseCodCourse)
    FROM deleted d;
END;
---- Notification ----
---- Insert ----
CREATE TRIGGER trg_notification_insert
ON proyecto1.Notification
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into Notification: Id=', i.Id, ', UserId=', i.UserId, ', Message=', i.Message, ', Date=', i.Date)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_notification_update
ON proyecto1.Notification
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on Notification: Id=', i.Id, ', UserId=', i.UserId, ', Message=', i.Message, ', Date=', i.Date)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_notification_delete
ON proyecto1.Notification
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from Notification: Id=', d.Id, ', UserId=', d.UserId, ', Message=', d.Message, ', Date=', d.Date)
    FROM deleted d;
END;
GO
---- Profile Student ----
---- Insert ----
CREATE TRIGGER trg_profile_student_insert
ON proyecto1.ProfileStudent
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into ProfileStudent: Id=', i.Id, ', UserId=', i.UserId, ', Credits=', i.Credits)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_profile_student_update
ON proyecto1.ProfileStudent
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on ProfileStudent: Id=', i.Id, ', UserId=', i.UserId, ', Credits=', i.Credits)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_profile_student_delete
ON proyecto1.ProfileStudent
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from ProfileStudent: Id=', d.Id, ', UserId=', d.UserId, ', Credits=', d.Credits)
    FROM deleted d;
END;
---- Roles ----
---- Insert ----
CREATE TRIGGER trg_roles_insert
ON proyecto1.Roles
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into Roles: Id=', i.Id, ', RoleName=', i.RoleName)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_roles_update
ON proyecto1.Roles
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on Roles: Id=', i.Id, ', RoleName=', i.RoleName)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_roles_delete
ON proyecto1.Roles
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from Roles: Id=', d.Id, ', RoleName=', d.RoleName)
    FROM deleted d;
END;
---- TFA ----
---- Insert ----
CREATE TRIGGER trg_tfa_insert
ON proyecto1.TFA
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into TFA: Id=', i.Id, ', UserId=', i.UserId, ', Status=', i.Status, ', LastUpdate=', i.LastUpdate)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_tfa_update
ON proyecto1.TFA
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on TFA: Id=', i.Id, ', UserId=', i.UserId, ', Status=', i.Status, ', LastUpdate=', i.LastUpdate)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_tfa_delete
ON proyecto1.TFA
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from TFA: Id=', d.Id, ', UserId=', d.UserId, ', Status=', d.Status, ', LastUpdate=', d.LastUpdate)
    FROM deleted d;
END;
---- Tutor Profile ----
---- Insert ----
CREATE TRIGGER trg_tutorprofile_insert
ON proyecto1.TutorProfile
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into TutorProfile: Id=', i.Id, ', UserId=', i.UserId, ', TutorCode=', i.TutorCode)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_tutorprofile_update
ON proyecto1.TutorProfile
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on TutorProfile: Id=', i.Id, ', UserId=', i.UserId, ', TutorCode=', i.TutorCode)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_tutorprofile_delete
ON proyecto1.TutorProfile
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from TutorProfile: Id=', d.Id, ', UserId=', d.UserId, ', TutorCode=', d.TutorCode)
    FROM deleted d;
END;
---- Usuario Role ----
---- Insert ----
CREATE TRIGGER trg_usuariorole_insert
ON proyecto1.UsuarioRole
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into UsuarioRole: Id=', i.Id, ', RoleId=', i.RoleId, ', UserId=', i.UserId, ', IsLatestVersion=', i.IsLatestVersion)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_usuariorole_update
ON proyecto1.UsuarioRole
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on UsuarioRole: Id=', i.Id, ', RoleId=', i.RoleId, ', UserId=', i.UserId, ', IsLatestVersion=', i.IsLatestVersion)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_usuariorole_delete
ON proyecto1.UsuarioRole
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from UsuarioRole: Id=', d.Id, ', RoleId=', d.RoleId, ', UserId=', d.UserId, ', IsLatestVersion=', d.IsLatestVersion)
    FROM deleted d;
END;
---- Usuarios ----
---- Insert ----
CREATE TRIGGER trg_usuarios_insert
ON proyecto1.Usuarios
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('INSERT into Usuarios: Id=', i.Id, ', Firstname=', i.Firstname, ', Lastname=', i.Lastname, ', Email=', i.Email, ', DateOfBirth=', i.DateOfBirth, ', Password=', i.Password, ', LastChanges=', i.LastChanges, ', EmailConfirmed=', i.EmailConfirmed)
    FROM inserted i;
END;
---- Update ----
CREATE TRIGGER trg_usuarios_update
ON proyecto1.Usuarios
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('UPDATE on Usuarios: Id=', i.Id, ', Firstname=', i.Firstname, ', Lastname=', i.Lastname, ', Email=', i.Email, ', DateOfBirth=', i.DateOfBirth, ', Password=', i.Password, ', LastChanges=', i.LastChanges, ', EmailConfirmed=', i.EmailConfirmed)
    FROM inserted i;
END;
---- Delete ----
CREATE TRIGGER trg_usuarios_delete
ON proyecto1.Usuarios
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO proyecto1.HistoryLog (Date, Description)
    SELECT GETDATE(), CONCAT('DELETE from Usuarios: Id=', d.Id, ', Firstname=', d.Firstname, ', Lastname=', d.Lastname, ', Email=', d.Email, ', DateOfBirth=', d.DateOfBirth, ', Password=', d.Password, ', LastChanges=', d.LastChanges, ', EmailConfirmed=', d.EmailConfirmed)
    FROM deleted d;
END;