using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using AppointmentSystem.Dto;

namespace AppointmentSystem.Interfaces.Data
{
    public interface IAppointmentSystemDataContext
    {
        IDbSet<Appointment> Appointments { get; set; }
        IDbSet<User> Users { get; set; }
        IDbSet<TEntity> Set<TEntity>() where TEntity : class;
        
        /// <summary>
        /// set the current entity state to modified
        /// </summary>
        /// <param name="entity">entity database object</param>
        void SetModified(object entity);
        int SaveChanges();
    }
}
