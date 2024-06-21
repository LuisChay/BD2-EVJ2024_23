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

        -- Check if the email is already used
        IF EXISTS (SELECT 1 FROM [proyecto1].[Usuarios] WHERE Email = @Email)
        BEGIN
            THROW 50000, 'El email ya está asociado con otra cuenta.', 1;
        END

        DECLARE @UserId UNIQUEIDENTIFIER = NEWID();
        DECLARE @RoleId UNIQUEIDENTIFIER;
        DECLARE @TFAStatus BIT = 0; -- Valor predeterminado para TFAStatus

        -- Insert the new user
        INSERT INTO [proyecto1].[Usuarios] (Id, Firstname, Lastname, Email, DateOfBirth, Password, LastChanges, EmailConfirmed)
        VALUES (@UserId, @Firstname, @Lastname, @Email, @DateOfBirth, @Password, GETDATE(), 0);

        -- Insert the student profile
        INSERT INTO [proyecto1].[ProfileStudent] (UserId, Credits)
        VALUES (@UserId, @Credits);

        -- Get the role ID for 'Student'
        SELECT @RoleId = Id FROM [proyecto1].[Roles] WHERE RoleName = 'Student';

        -- Assign the student role to the user
        INSERT INTO [proyecto1].[UsuarioRole] (RoleId, UserId, IsLatestVersion)
        VALUES (@RoleId, @UserId, 1);

        -- Insert the TFA status
        INSERT INTO [proyecto1].[TFA] (UserId, Status, LastUpdate)
        VALUES (@UserId, @TFAStatus, GETDATE());

        -- Insert the notification
        INSERT INTO [proyecto1].[Notification] (UserId, Message, Date)
        VALUES (@UserId, 'Usuario registrado en el sistema.', GETDATE());

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



