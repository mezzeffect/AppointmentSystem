using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using AppointmentSystem.Business;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces.Business;
using Microsoft.AspNet.Identity;

namespace AppointmentSystem.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private readonly IUserServiceManager _userServiceManager;
        public UserController(IUserServiceManager userServiceManager)
        {
            _userServiceManager = userServiceManager;
        }
        // GET api/<controller>
        [Route("")]
        public GetUserResponse Get()
        {
            return new GetUserResponse()
            {
                IsSuccessful = true,
                CurrentUser = _userServiceManager.GetUserByUsername(User.Identity.Name)
            };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            
        }
    }
}