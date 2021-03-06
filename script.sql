USE [AppointmentSystemDB]
GO
/****** Object:  Table [dbo].[Appointments]    Script Date: 2/12/2017 4:57:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointments](
	[AppointmentId] [int] IDENTITY(1,1) NOT NULL,
	[PatientFirstName] [nvarchar](max) NULL,
	[PatientLastName] [nvarchar](max) NULL,
	[Gender] [int] NOT NULL,
	[DateTime] [datetime] NOT NULL,
	[IsCompleted] [bit] NOT NULL,
	[UserId] [int] NOT NULL,
	[CreatedByUserId] [int] NOT NULL,
	[DoctorsComment] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.Appointments] PRIMARY KEY CLUSTERED 
(
	[AppointmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/12/2017 4:57:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[Role] [int] NOT NULL,
	[LastLoginDateTime] [datetime] NOT NULL,
 CONSTRAINT [PK_dbo.Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Appointments] ON 

INSERT [dbo].[Appointments] ([AppointmentId], [PatientFirstName], [PatientLastName], [Gender], [DateTime], [IsCompleted], [UserId], [CreatedByUserId], [DoctorsComment]) VALUES (1, N'pl1hhhhhh', N'pl1hhhhhh', 1, CAST(N'2017-02-11T00:00:00.000' AS DateTime), 1, 1, 3, N'well done')
INSERT [dbo].[Appointments] ([AppointmentId], [PatientFirstName], [PatientLastName], [Gender], [DateTime], [IsCompleted], [UserId], [CreatedByUserId], [DoctorsComment]) VALUES (2, N'p2', N'pl2', 0, CAST(N'2017-02-11T00:00:00.000' AS DateTime), 0, 1, 3, NULL)
INSERT [dbo].[Appointments] ([AppointmentId], [PatientFirstName], [PatientLastName], [Gender], [DateTime], [IsCompleted], [UserId], [CreatedByUserId], [DoctorsComment]) VALUES (3, N'p3', N'pl3', 0, CAST(N'2017-02-11T00:00:00.000' AS DateTime), 0, 4, 3, NULL)
INSERT [dbo].[Appointments] ([AppointmentId], [PatientFirstName], [PatientLastName], [Gender], [DateTime], [IsCompleted], [UserId], [CreatedByUserId], [DoctorsComment]) VALUES (4, N'p4', N'pl4', 1, CAST(N'2017-02-11T00:00:00.000' AS DateTime), 0, 4, 3, NULL)
INSERT [dbo].[Appointments] ([AppointmentId], [PatientFirstName], [PatientLastName], [Gender], [DateTime], [IsCompleted], [UserId], [CreatedByUserId], [DoctorsComment]) VALUES (6, N'pl1222222333', N'pl1222222333', 0, CAST(N'2017-02-11T00:00:00.000' AS DateTime), 0, 1, 0, NULL)
INSERT [dbo].[Appointments] ([AppointmentId], [PatientFirstName], [PatientLastName], [Gender], [DateTime], [IsCompleted], [UserId], [CreatedByUserId], [DoctorsComment]) VALUES (7, N'pl1zzrrr', N'pl1zzrrr', 0, CAST(N'2017-02-11T00:00:00.000' AS DateTime), 0, 1, 0, NULL)
SET IDENTITY_INSERT [dbo].[Appointments] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserId], [UserName], [Password], [Role], [LastLoginDateTime]) VALUES (1, N'doc1', N'pass', 0, CAST(N'2017-02-12T00:00:00.000' AS DateTime))
INSERT [dbo].[Users] ([UserId], [UserName], [Password], [Role], [LastLoginDateTime]) VALUES (3, N'Nur1', N'pass', 1, CAST(N'2017-02-12T00:00:00.000' AS DateTime))
INSERT [dbo].[Users] ([UserId], [UserName], [Password], [Role], [LastLoginDateTime]) VALUES (4, N'doc2', N'pass', 0, CAST(N'2017-02-12T00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Users] OFF
