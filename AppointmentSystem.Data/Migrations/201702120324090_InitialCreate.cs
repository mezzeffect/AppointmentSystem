namespace AppointmentSystem.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Appointments",
                c => new
                    {
                        AppointmentId = c.Int(nullable: false, identity: true),
                        PatinentFirstName = c.String(),
                        PatientLastName = c.String(),
                        Gender = c.Int(nullable: false),
                        DateTime = c.DateTime(nullable: false),
                        IsCompleted = c.Boolean(nullable: false),
                        UserId = c.Int(nullable: false),
                        CreatedByUserId = c.Int(nullable: false),
                        DoctorsComment = c.String(),
                    })
                .PrimaryKey(t => t.AppointmentId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                        Password = c.String(),
                        Role = c.Int(nullable: false),
                        LastLoginDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
            DropTable("dbo.Appointments");
        }
    }
}
