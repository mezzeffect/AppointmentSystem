using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using AppointmentSystem.Common;

namespace AppointmentSystem.API.Models
{
    public class AppointmentModel
    {
        public int AppointmentId { get; set; }
        [Required]
        [StringLength(64, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 1)]
        [Display(Name = "First Name")]
        public string PatientFirstName { get; set; }
        [Required]
        [StringLength(64, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 1)]
        [Display(Name = "First Name")]
        public string PatientLastName { get; set; }
        [Required]
        public Gender Gender { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [StringLength(64, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 1)]
        public string DoctorsComment { get; set; }
        public bool IsAppointmentCompleted { get; set; }
        public int UserId { get; set; }
    }
}