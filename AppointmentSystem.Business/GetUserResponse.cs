using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentSystem.Dto;

namespace AppointmentSystem.Business
{
    public class GetUserResponse:BaseResponse
    {
        public User CurrentUser { get; set; }
    }
}
