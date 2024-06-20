CREATE DATABASE BD2_PRY1
GO
USE BD2_PRY1
CREATE SCHEMA [proyecto1]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[Course](
	[CodCourse] [int] NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[CreditsRequired] [int] NOT NULL,
 CONSTRAINT [PK_Course] PRIMARY KEY CLUSTERED 
(
	[CodCourse] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [proyecto1].[CourseAssignment]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[CourseAssignment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[StudentId] [uniqueidentifier] NOT NULL,
	[CourseCodCourse] [int] NOT NULL,
 CONSTRAINT [PK_CourseAssignment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[CourseTutor]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[CourseTutor](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TutorId] [uniqueidentifier] NOT NULL,
	[CourseCodCourse] [int] NOT NULL,
 CONSTRAINT [PK_CourseTutor] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[HistoryLog]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[HistoryLog](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_HistoryLog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[Notification]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[Notification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Message] [nvarchar](max) NOT NULL,
	[Date] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Notification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[ProfileStudent]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[ProfileStudent](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Credits] [int] NOT NULL,
 CONSTRAINT [PK_ProfileStudent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[Roles]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[Roles](
	[Id] [uniqueidentifier] NOT NULL,
	[RoleName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[TFA]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[TFA](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[Status] [bit] NOT NULL,
	[LastUpdate] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_TFA] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[TutorProfile]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[TutorProfile](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[TutorCode] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_TutorProfile] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[UsuarioRole]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[UsuarioRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[IsLatestVersion] [bit] NOT NULL,
 CONSTRAINT [PK_UsuarioRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [proyecto1].[Usuarios]    Script Date: 21/02/2022 19:33:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [proyecto1].[Usuarios](
	[Id] [uniqueidentifier] NOT NULL,
	[Firstname] [nvarchar](max) NOT NULL,
	[Lastname] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[DateOfBirth] [datetime2](7) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[LastChanges] [datetime2](7) NOT NULL,
	[EmailConfirmed] [bit] NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [proyecto1].[Course] ([CodCourse], [Name], [CreditsRequired]) VALUES (283, N'Análisis y Diseño de Sistemas 1', 30)
INSERT [proyecto1].[Course] ([CodCourse], [Name], [CreditsRequired]) VALUES (772, N'Estructura de Datos', 15)
INSERT [proyecto1].[Course] ([CodCourse], [Name], [CreditsRequired]) VALUES (775, N'Sistemas de Bases de Datos 2', 25)
INSERT [proyecto1].[Course] ([CodCourse], [Name], [CreditsRequired]) VALUES (964, N'Organización Computacional', 10)
INSERT [proyecto1].[Course] ([CodCourse], [Name], [CreditsRequired]) VALUES (970, N'Redes de Computadoras 1', 20)
GO
INSERT [proyecto1].[Roles] ([Id], [RoleName]) VALUES (N'2cf8e1cf-3cd6-44f3-8f86-1386b7c17657', N'Tutor')
INSERT [proyecto1].[Roles] ([Id], [RoleName]) VALUES (N'f4e6d8fb-df45-4c91-9794-38e043fd5acd', N'Student')
GO
/****** Object:  Index [IX_CourseAssignment_CourseCodCourse]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_CourseAssignment_CourseCodCourse] ON [proyecto1].[CourseAssignment]
(
	[CourseCodCourse] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_CourseAssignment_StudentId]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_CourseAssignment_StudentId] ON [proyecto1].[CourseAssignment]
(
	[StudentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_CourseTutor_CourseCodCourse]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_CourseTutor_CourseCodCourse] ON [proyecto1].[CourseTutor]
(
	[CourseCodCourse] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_CourseTutor_TutorId]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_CourseTutor_TutorId] ON [proyecto1].[CourseTutor]
(
	[TutorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Notification_UserId]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_Notification_UserId] ON [proyecto1].[Notification]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_ProfileStudent_UserId]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_ProfileStudent_UserId] ON [proyecto1].[ProfileStudent]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_TFA_UserId]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_TFA_UserId] ON [proyecto1].[TFA]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_TutorProfile_UserId]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_TutorProfile_UserId] ON [proyecto1].[TutorProfile]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_UsuarioRole_RoleId]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_UsuarioRole_RoleId] ON [proyecto1].[UsuarioRole]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_UsuarioRole_UserId]    Script Date: 21/02/2022 19:33:14 ******/
CREATE NONCLUSTERED INDEX [IX_UsuarioRole_UserId] ON [proyecto1].[UsuarioRole]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [proyecto1].[CourseAssignment]  WITH CHECK ADD  CONSTRAINT [FK_CourseAssignment_Course_CourseCodCourse] FOREIGN KEY([CourseCodCourse])
REFERENCES [proyecto1].[Course] ([CodCourse])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[CourseAssignment] CHECK CONSTRAINT [FK_CourseAssignment_Course_CourseCodCourse]
GO
ALTER TABLE [proyecto1].[CourseAssignment]  WITH CHECK ADD  CONSTRAINT [FK_CourseAssignment_Usuarios_StudentId] FOREIGN KEY([StudentId])
REFERENCES [proyecto1].[Usuarios] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[CourseAssignment] CHECK CONSTRAINT [FK_CourseAssignment_Usuarios_StudentId]
GO
ALTER TABLE [proyecto1].[CourseTutor]  WITH CHECK ADD  CONSTRAINT [FK_CourseTutor_Course_CourseCodCourse] FOREIGN KEY([CourseCodCourse])
REFERENCES [proyecto1].[Course] ([CodCourse])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[CourseTutor] CHECK CONSTRAINT [FK_CourseTutor_Course_CourseCodCourse]
GO
ALTER TABLE [proyecto1].[CourseTutor]  WITH CHECK ADD  CONSTRAINT [FK_CourseTutor_Usuarios_TutorId] FOREIGN KEY([TutorId])
REFERENCES [proyecto1].[Usuarios] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[CourseTutor] CHECK CONSTRAINT [FK_CourseTutor_Usuarios_TutorId]
GO
ALTER TABLE [proyecto1].[Notification]  WITH CHECK ADD  CONSTRAINT [FK_Notification_Usuarios_UserId] FOREIGN KEY([UserId])
REFERENCES [proyecto1].[Usuarios] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[Notification] CHECK CONSTRAINT [FK_Notification_Usuarios_UserId]
GO
ALTER TABLE [proyecto1].[ProfileStudent]  WITH CHECK ADD  CONSTRAINT [FK_ProfileStudent_Usuarios_UserId] FOREIGN KEY([UserId])
REFERENCES [proyecto1].[Usuarios] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[ProfileStudent] CHECK CONSTRAINT [FK_ProfileStudent_Usuarios_UserId]
GO
ALTER TABLE [proyecto1].[TFA]  WITH CHECK ADD  CONSTRAINT [FK_TFA_Usuarios_UserId] FOREIGN KEY([UserId])
REFERENCES [proyecto1].[Usuarios] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[TFA] CHECK CONSTRAINT [FK_TFA_Usuarios_UserId]
GO
ALTER TABLE [proyecto1].[TutorProfile]  WITH CHECK ADD  CONSTRAINT [FK_TutorProfile_Usuarios_UserId] FOREIGN KEY([UserId])
REFERENCES [proyecto1].[Usuarios] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[TutorProfile] CHECK CONSTRAINT [FK_TutorProfile_Usuarios_UserId]
GO
ALTER TABLE [proyecto1].[UsuarioRole]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioRole_Roles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [proyecto1].[Roles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[UsuarioRole] CHECK CONSTRAINT [FK_UsuarioRole_Roles_RoleId]
GO
ALTER TABLE [proyecto1].[UsuarioRole]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioRole_Usuarios_UserId] FOREIGN KEY([UserId])
REFERENCES [proyecto1].[Usuarios] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [proyecto1].[UsuarioRole] CHECK CONSTRAINT [FK_UsuarioRole_Usuarios_UserId]
GO
USE [master]
GO
ALTER DATABASE [BD2_PRY1] SET  READ_WRITE 
GO
