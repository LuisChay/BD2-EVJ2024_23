ALTER PROCEDURE [proyecto1].[PR1]
    @Firstname NVARCHAR(MAX),
    @Lastname NVARCHAR(MAX),
    @Email NVARCHAR(MAX),
    @DateOfBirth DATETIME2,
    @Password NVARCHAR(MAX),
    @Credits INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar que ninguno de los parámetros sea nulo
        IF @Firstname IS NULL OR @Lastname IS NULL OR @Email IS NULL OR @DateOfBirth IS NULL OR @Password IS NULL
        BEGIN
            RAISERROR('Ninguno de los parámetros puede ser NULL.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Verificar si el email ya está en uso
        IF EXISTS (SELECT 1 FROM [proyecto1].[Usuarios] WHERE Email = @Email)
        BEGIN
            THROW 50000, 'El email ya está asociado con otra cuenta.', 1;
        END

        DECLARE @UserId UNIQUEIDENTIFIER = NEWID();
        DECLARE @RoleId UNIQUEIDENTIFIER;
        DECLARE @TFAStatus BIT = 0; -- Valor predeterminado para TFAStatus

        -- Insertar el nuevo usuario
        INSERT INTO [proyecto1].[Usuarios] (Id, Firstname, Lastname, Email, DateOfBirth, Password, LastChanges, EmailConfirmed)
        VALUES (@UserId, @Firstname, @Lastname, @Email, @DateOfBirth, @Password, GETDATE(), 0);

        -- Insertar el perfil de estudiante
        INSERT INTO [proyecto1].[ProfileStudent] (UserId, Credits)
        VALUES (@UserId, @Credits);

        -- Obtener el ID del rol de 'Student'
        SELECT @RoleId = Id FROM [proyecto1].[Roles] WHERE RoleName = 'Student';

        -- Asignar el rol de estudiante al usuario
        INSERT INTO [proyecto1].[UsuarioRole] (RoleId, UserId, IsLatestVersion)
        VALUES (@RoleId, @UserId, 1);

        -- Insertar el estado de TFA
        INSERT INTO [proyecto1].[TFA] (UserId, Status, LastUpdate)
        VALUES (@UserId, @TFAStatus, GETDATE());

        -- Insertar la notificación
        INSERT INTO [proyecto1].[Notification] (UserId, Message, Date)
        VALUES (@UserId, 'Usuario registrado en el sistema.', GETDATE());

        COMMIT TRANSACTION;

        PRINT 'Transacción exitosa';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Manejo de errores
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

        PRINT 'Transacción fallida';
    END CATCH
END;
GO




ALTER PROCEDURE [proyecto1].[PR2]
    @Email NVARCHAR(255),
    @CodCourse INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @UserId UNIQUEIDENTIFIER;

        -- Verificar que el correo est� registrado y obtener el UserId
        SELECT @UserId = [Id]
        FROM [proyecto1].[Usuarios]
        WHERE [Email] = @Email;

        IF @UserId IS NULL
        BEGIN
            RAISERROR('El correo no est� registrado.', 16, 1);
            RETURN;
        END

        -- Verificar que el usuario tenga una cuenta activa
        IF NOT EXISTS (
            SELECT 1 
            FROM [proyecto1].[Usuarios] 
            WHERE [Id] = @UserId AND [EmailConfirmed] = 1
        )
        BEGIN
            RAISERROR('El usuario no tiene una cuenta activa.', 16, 1);
            RETURN;
        END

        -- Verificar que el usuario tenga el rol de estudiante
        IF NOT EXISTS (
            SELECT 1 
            FROM [proyecto1].[UsuarioRole] 
            WHERE [UserId] = @UserId AND [RoleId] = 'f4e6d8fb-df45-4c91-9794-38e043fd5acd'
        )
        BEGIN
            RAISERROR('El usuario no tiene el rol de estudiante.', 16, 1);
            RETURN;
        END

        -- Agregar el rol de tutor al usuario
        IF NOT EXISTS (
            SELECT 1 
            FROM [proyecto1].[UsuarioRole] 
            WHERE [UserId] = @UserId AND [RoleId] = '2cf8e1cf-3cd6-44f3-8f86-1386b7c17657'
        )
        BEGIN
            INSERT INTO [proyecto1].[UsuarioRole] ([RoleId], [UserId], [IsLatestVersion])
            VALUES ('2cf8e1cf-3cd6-44f3-8f86-1386b7c17657', @UserId, 1);
        END

        -- Crear perfil de tutor
        IF NOT EXISTS (
            SELECT 1 
            FROM [proyecto1].[TutorProfile] 
            WHERE [UserId] = @UserId
        )
        BEGIN
            INSERT INTO [proyecto1].[TutorProfile] ([UserId], [TutorCode])
            VALUES (@UserId, NEWID());
        END

        -- Asignar curso al tutor
        INSERT INTO [proyecto1].[CourseTutor] ([TutorId], [CourseCodCourse])
        VALUES (@UserId, @CodCourse);

        -- Enviar notificaci�n
        DECLARE @Message NVARCHAR(MAX) = 'Has sido promovido al rol de tutor y asignado al curso con c�digo ' + CAST(@CodCourse AS NVARCHAR) + '.';
        INSERT INTO [proyecto1].[Notification] ([UserId], [Message], [Date])
        VALUES (@UserId, @Message, GETDATE());

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Raise an error with the details of the exception
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO


ALTER PROCEDURE [proyecto1].[PR3]
    @Email NVARCHAR(255),
    @CodCourse INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @UserId UNIQUEIDENTIFIER;
        DECLARE @CourseCreditsRequired INT;
        DECLARE @UserCredits INT;

        -- Verificar que el correo est� registrado y obtener el UserId
        SELECT @UserId = [Id]
        FROM [proyecto1].[Usuarios]
        WHERE [Email] = @Email;

        IF @UserId IS NULL
        BEGIN
            RAISERROR('El correo no est� registrado.', 16, 1);
            RETURN;
        END

        -- Verificar que el usuario tenga una cuenta activa
        IF NOT EXISTS (
            SELECT 1 
            FROM [proyecto1].[Usuarios] 
            WHERE [Id] = @UserId AND [EmailConfirmed] = 1
        )
        BEGIN
            RAISERROR('El usuario no tiene una cuenta activa.', 16, 1);
            RETURN;
        END

        -- Obtener los cr�ditos necesarios para el curso
        SELECT @CourseCreditsRequired = [CreditsRequired]
        FROM [proyecto1].[Course]
        WHERE [CodCourse] = @CodCourse;

        -- Verificar que el curso existe
        IF @CourseCreditsRequired IS NULL
        BEGIN
            RAISERROR('El curso no existe.', 16, 1);
            RETURN;
        END

        -- Obtener los cr�ditos actuales del usuario
        SELECT @UserCredits = [Credits]
        FROM [proyecto1].[ProfileStudent]
        WHERE [UserId] = @UserId;

        -- Verificar que el usuario cumple con los cr�ditos necesarios
        IF @UserCredits < @CourseCreditsRequired
        BEGIN
            RAISERROR('El usuario no cumple con los cr�ditos necesarios para este curso.', 16, 1);
            RETURN;
        END

        -- Asignar el curso al usuario
        INSERT INTO [proyecto1].[CourseAssignment] ([StudentId], [CourseCodCourse])
        VALUES (@UserId, @CodCourse);

        -- Notificar al estudiante
        DECLARE @StudentMessage NVARCHAR(MAX) = 'Has sido asignado al curso con c�digo ' + CAST(@CodCourse AS NVARCHAR) + '.';
        INSERT INTO [proyecto1].[Notification] ([UserId], [Message], [Date])
        VALUES (@UserId, @StudentMessage, GETDATE());

        -- Obtener el tutor asignado al curso
        DECLARE @TutorId UNIQUEIDENTIFIER;
        SELECT @TutorId = [TutorId]
        FROM [proyecto1].[CourseTutor]
        WHERE [CourseCodCourse] = @CodCourse;

        -- Verificar que el curso tiene un tutor asignado
        IF @TutorId IS NULL
        BEGIN
            RAISERROR('El curso no tiene un tutor asignado.', 16, 1);
            RETURN;
        END

        -- Notificar al tutor
        DECLARE @TutorMessage NVARCHAR(MAX) = 'El estudiante con correo ' + @Email + ' ha sido asignado a tu curso con c�digo ' + CAST(@CodCourse AS NVARCHAR) + '.';
        INSERT INTO [proyecto1].[Notification] ([UserId], [Message], [Date])
        VALUES (@TutorId, @TutorMessage, GETDATE());

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Raise an error with the details of the exception
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO



ALTER PROCEDURE [proyecto1].[PR4]
    @RoleName NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar que el rol sea "Student" o "Tutor"
        IF @RoleName NOT IN ('Student', 'Tutor')
        BEGIN
            RAISERROR('El rol debe ser "Student" o "Tutor".', 16, 1);
            RETURN;
        END

        -- Verificar que el rol no exista previamente
        IF EXISTS (SELECT 1 FROM [proyecto1].[Roles] WHERE [RoleName] = @RoleName)
        BEGIN
            RAISERROR('El rol ya existe.', 16, 1);
            RETURN;
        END

        -- Crear el nuevo rol
        INSERT INTO [proyecto1].[Roles] ([Id], [RoleName])
        VALUES (NEWID(), @RoleName);

        PRINT 'El rol ha sido creado exitosamente.';

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Raise an error with the details of the exception
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO



ALTER PROCEDURE [proyecto1].[PR5]
    @Name NVARCHAR(MAX),
    @CreditsRequired INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Verificar que los cr�ditos requeridos sean mayores que cero
        IF @CreditsRequired <= 0
        BEGIN
            RAISERROR('Los cr�ditos requeridos deben ser mayores que cero.', 16, 1);
            RETURN;
        END

        -- Insertar el nuevo curso en la tabla Course
        INSERT INTO [proyecto1].[Course] ([Name], [CreditsRequired])
        VALUES (@Name, @CreditsRequired);

        PRINT 'El curso se ha creado exitosamente.';

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Raise an error with the details of the exception
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO


ALTER PROCEDURE [proyecto1].[PR6]
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Validar que en la tabla Usuarios solamente se ingresen letras en FirstName y LastName
        UPDATE [proyecto1].[Usuarios]
        SET [FirstName] = CASE WHEN [FirstName] NOT LIKE '%[^a-zA-Z]%' THEN [FirstName] ELSE NULL END,
            [LastName] = CASE WHEN [LastName] NOT LIKE '%[^a-zA-Z]%' THEN [LastName] ELSE NULL END
        WHERE [FirstName] IS NOT NULL OR [LastName] IS NOT NULL;

        -- Validar que en la tabla Course solamente se ingresen letras en Name y n�meros en CreditsRequired
        UPDATE [proyecto1].[Course]
        SET [Name] = CASE WHEN [Name] NOT LIKE '%[^a-zA-Z]%' THEN [Name] ELSE NULL END,
            [CreditsRequired] = CASE WHEN ISNUMERIC([CreditsRequired]) = 1 THEN [CreditsRequired] ELSE NULL END
        WHERE [Name] IS NOT NULL OR [CreditsRequired] IS NOT NULL;

        -- Mostrar mensaje de �xito
        PRINT 'Actualizaci�n de restricciones completada.';

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        -- Raise an error with the details of the exception
        DECLARE @ErrorMessage NVARCHAR(4000), @ErrorSeverity INT, @ErrorState INT;
        SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = ERROR_STATE();
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END
GO
