using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;
using System.Text;
using Moq;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces.Data;

namespace AppointmentSystem.Repository.Tests.Helper
{
    public class FakeAppointmentSystemDataContext:IAppointmentSystemDataContext
    {
        public IDbSet<Appointment> Appointments { get; set; }
        public IDbSet<User> Users { get; set; }
        public bool Saved { get; private set; }
        public bool Updated { get; private set; }
        public IDbSet<T> Set<T>() where T : class
        {
            foreach (PropertyInfo property in typeof (FakeAppointmentSystemDataContext).GetProperties())
            {
                if (property.PropertyType == typeof (IDbSet<T>))
                    return property.GetValue(this, null) as IDbSet<T>;
            }
            throw new Exception("Type collection not found");
        }
        public void SaveChanges()
        {
            Saved = true;
        }
        public FakeAppointmentSystemDataContext()
        {
            // Set up your collections
            Appointments = new FakeAppointmentSet()
                             {
                                 new Appointment() {AppointmentId = 1,PatientFirstName = "Brent"},
                                 new Appointment() {AppointmentId = 2,PatientFirstName = "Darth"},
                                 new Appointment() {AppointmentId = 3,PatientFirstName = "Follower"},
                                 new Appointment() {AppointmentId = 3,PatientFirstName = "Maker"},
                                 new Appointment() {AppointmentId = 3,PatientFirstName = "Green"},
                                 new Appointment() {AppointmentId = 3,PatientFirstName = "Red"},
                                 new Appointment() {AppointmentId = 3,PatientFirstName = "Yellow"},
                                 new Appointment() {AppointmentId = 3,PatientFirstName = "Fast"},
                                 new Appointment() {AppointmentId = 3,PatientFirstName = "Zoo"},
                                 new Appointment() {AppointmentId = 3,PatientFirstName = "Adam"}
                             };
        }

        int IAppointmentSystemDataContext.SaveChanges()
        {
            Saved = true;
            return 1;
        }

        public void SetModified(object entity)
        {
            throw new NotImplementedException("Not To be tested here");
        }
    }
}
