using System;
using System.Collections.Generic;
using System.Linq;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces.Business;
using AppointmentSystem.Interfaces.Repository;

namespace AppointmentSystem.Business
{
    public class UserServiceManager : IUserServiceManager
    {
        #region P R I V A T E

        private readonly IEntityRepository<User> _userRepository;

        #endregion

        #region C O N S T R U C T O R S

        public UserServiceManager(IEntityRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        #endregion

        #region I  A P P O I N T M E N T  B U S I N E S S  M A N A G E R  M E M B E R S

        public User Find(int id)
        {
            try
            {
                return _userRepository.GetById(id);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool Add(User entity)
        {
            try
            {
                _userRepository.Add(entity);
                _userRepository.SubmitChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<User> All()
        {
            try
            {
                return _userRepository.All();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool Remove(User entity)
        {
            try
            {
                _userRepository.Delete(entity);
                _userRepository.SubmitChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Update(User entity)
        {
            try
            {
                _userRepository.Update(entity);
                _userRepository.SubmitChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }



        #endregion

        #region I U S E R  S E R V I C E  M E M B E R S
        public User Authenticate(string userName, string password)
        {
            return _userRepository.All().FirstOrDefault(u=>u.UserName == userName && u.Password == password);
        }

        public User GetUserByUsername(string userName)
        {
            return _userRepository.All().FirstOrDefault(u => u.UserName == userName);
        }

        #endregion

    }
}