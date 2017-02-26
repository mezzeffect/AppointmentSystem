using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AppointmentSystem.Common;

namespace AppointmentSystem.Dto
{
    /// <summary>
    /// The database object for the glossaries database 
    /// </summary>
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public string PatientFirstName { get; set; }
        public string PatientLastName { get; set; }
        public Gender  Gender { get; set; }

        public DateTime DateTime { get; set; }

        public bool IsCompleted { get; set; }

        public int UserId { get; set; }

        public int CreatedByUserId { get; set; }
        public string DoctorsComment { get; set; }


    }
}
