using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using AppointmentSystem.Dto;

namespace AppointmentSystem.Repository.Tests.Helper
{
    public class FakeAppointmentSet :FakeDbSet<Appointment>
    {
        public override Appointment Find(params object[] keyValues)
        {
            return this.SingleOrDefault(g => g.AppointmentId == (int) keyValues.Single());
        }
        
    }
}
