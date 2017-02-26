using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces.Data;

namespace AppointmentSystem.Data
{
    public class AppointmentSystemDataContext:DbContext, IAppointmentSystemDataContext
    {
        public AppointmentSystemDataContext():base("AppointmentSystemDBConnection")
        {
            
        }
        public IDbSet<Appointment> Appointments { get; set; }
        public IDbSet<User> Users { get; set; }

        public new IDbSet<TEntity> Set<TEntity>() where TEntity : class
        {
            return base.Set<TEntity>();
        }

        public void SetModified(object entity)
        {
            Entry(entity).State = EntityState.Modified;
        }
    }
}
