using System.Collections.Generic;
using System.Linq;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces.Data;
using AppointmentSystem.Interfaces.Repository;

namespace AppointmentSystem.Repository
{
    public class UserRepository : IEntityRepository<User>
    {
        #region P R I V A T E

        private readonly IAppointmentSystemDataContext _appointmentSystemData;

        #endregion

        #region I  E N T I T Y  R E P O S I T O R Y
        public UserRepository(IAppointmentSystemDataContext appointmentSystemDataContext)
        {
            _appointmentSystemData = appointmentSystemDataContext;
        }
        public User GetById(int? id)
        {
            return _appointmentSystemData.Users.Find(id);
        }

        public void Add(User entity)
        {
            _appointmentSystemData.Users.Add(entity);
        }

        public void Delete(User entity)
        {
            _appointmentSystemData.Users.Remove(entity);
        }

        public void Update(User entity)
        {
            _appointmentSystemData.SetModified(entity);
        }

        public List<User> All()
        {
            return _appointmentSystemData.Users.ToList();
        }

        public void SubmitChanges()
        {
            _appointmentSystemData.SaveChanges();
        }
        #endregion
    }
}