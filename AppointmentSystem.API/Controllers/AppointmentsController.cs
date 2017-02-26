using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using AppointmentSystem.API.Models;
using AppointmentSystem.Business;
using AppointmentSystem.Dto;

namespace AppointmentSystem.API.Controllers
{
    [RoutePrefix("api/appointments")]
    public class AppointmentsController : ApiController
    {
        private IAppointmentServiceManager _appointmentServiceManager;
        public AppointmentsController(IAppointmentServiceManager appointmentServiceManager)
        {
            _appointmentServiceManager = appointmentServiceManager;
        }
        [Authorize(Roles = "Doctor, Nurse")]
        [Route("")]
        // GET api/<controller>
        public GetAppointmentsResponce Get()
        {
            var responce = _appointmentServiceManager.GetCurrentUserAppointments(User.Identity.Name);
            return responce;
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [Authorize(Roles = "Doctor, Nurse")]
        [Route("")]
        public GetAppointmentsResponce Post([FromBody]AppointmentModel model)
        {
            if (ModelState.IsValid)
            {
                var result =  _appointmentServiceManager.SaveAppointmentByUserName(User.Identity.Name, new Appointment
                {
                    //Todo:Should use automapper
                    AppointmentId = model.AppointmentId,
                    IsCompleted = model.IsAppointmentCompleted,
                    DoctorsComment = model.DoctorsComment,
                    DateTime = model.DateTime,
                    PatientLastName = model.PatientLastName,
                    PatientFirstName = model.PatientLastName,
                    Gender = model.Gender,
                    UserId = model.UserId
                });
                if (result.IsSuccessful)
                {
                    return _appointmentServiceManager.GetCurrentUserAppointments(User.Identity.Name);
                }
                return new GetAppointmentsResponce() { IsSuccessful = false, ErrorMessage = result.ErrorMessage };
            }
            else
            {
               var modelErrors =  ModelState.Values.SelectMany(v => v.Errors);
                var errors = string.Empty;
                foreach (var modelError in modelErrors)
                {
                    errors += modelError.ErrorMessage + "\n";
                }
                return new GetAppointmentsResponce() {IsSuccessful = false,ErrorMessage = errors };
            }
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        [Authorize(Roles = "Doctor, Nurse")]
        [Route("")]
        // DELETE api/<controller>/5
        public GetAppointmentsResponce Delete(int id)
        {
            var response = _appointmentServiceManager.DeleteByUserName(id, User.Identity.Name);
            if (response.IsSuccessful)
            {
                return _appointmentServiceManager.GetCurrentUserAppointments(User.Identity.Name);
            }
            return new GetAppointmentsResponce() {IsSuccessful = false,ErrorMessage = response.ErrorMessage};
        }
    }
}