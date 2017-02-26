using AppointmentSystem.Dto;

namespace AppointmentSystem.Interfaces.Business
{
    public interface IUserServiceManager : IBusinessManager<User>
    {
        User Authenticate(string userName, string password);
        User GetUserByUsername(string userName);
    }
}