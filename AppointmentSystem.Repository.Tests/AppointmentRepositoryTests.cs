using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Moq;
using NUnit.Framework;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces.Data;
using AppointmentSystem.Interfaces.Repository;
using AppointmentSystem.Repository.Tests.Helper;

namespace AppointmentSystem.Repository.Tests
{
    [TestFixture]
    public class AppointmentRepositoryTests
    {
        private Mock<IAppointmentSystemDataContext> _mockAppointmentDataContext;

        private IEntityRepository<Appointment> GetMockDbContextRepository()
        {
            _mockAppointmentDataContext = new Mock<IAppointmentSystemDataContext>();
            return new AppointmentRepository(_mockAppointmentDataContext.Object);
        }

        private IEntityRepository<Appointment> GetFakeDbContextRepository()
        {
            return new AppointmentRepository(new FakeAppointmentSystemDataContext());
        }

        [Test]
        public void AppointmentRepositoryAddShouldReturnAGlossary()
        {
            //arrange 
            var repo = GetFakeDbContextRepository();
            var glossary = new Appointment();

            //act
            repo.Add(glossary);
            var result = repo.GetById(glossary.AppointmentId);

            //assert
            Assert.NotNull(result);
        }

        [Test]
        public void AppointmentRepositoryAllShouldReturnListOrderedByTermAlphabitically()
        {
            //arrange 
            var repo = GetFakeDbContextRepository();

            //act
            var result = repo.All();

            //assert
            Assert.True(result.Last().PatientFirstName == "Zoo");
        }

        [Test]
        public void AppointmentRepositoryAddShouldAddTheCorrectGlossary()
        {
            //arrange 
            var repo = GetFakeDbContextRepository();
            var glossary = new Appointment();

            //act
            repo.Add(glossary);
            var result = repo.GetById(glossary.AppointmentId);

            //assert
            Assert.AreEqual(result, glossary);
        }

        [Test]
        public void AppointmentRepositoryGetByIdShouldReturnGlossary()
        {
            //arrange 
            var repo = GetFakeDbContextRepository();

            //act
            var result = repo.GetById(1);

            //assert
            Assert.NotNull(result);
        }

        [Test]
        public void AppointmentRepositoryGetByIdShouldReturnTheCorrectGlossary()
        {
            //arrange 
            var repo = GetFakeDbContextRepository();            

            //act
            var result = repo.GetById(1);

            //assert
            Assert.NotNull(result);
            Assert.AreEqual("Brent",result.PatientFirstName);
        }

        [Test]
        public void AppointmentRepositoryDeleteShouldWorkCorrectly()
        {
            //arrange 
            var repo = GetFakeDbContextRepository();

            //act
            var result = repo.GetById(1);
            repo.Delete(result);
            result = repo.GetById(1);
            
            //assert
            Assert.Null(result);
        }

        [Test]
        public void AppointmentRepositoryUpdateShouldCallEntry()
        {
            //arrange 
            var repo = GetMockDbContextRepository();

            //act
            repo.Update(It.IsAny<Appointment>());

            //assert
            _mockAppointmentDataContext.Verify(g=>g.SetModified(It.IsAny<object>()),Times.Once());
        }

        [Test]
        public void AppointmentRepositoryUpdateShouldEntryWithTheCorrectEntity()
        {
            //arrange 
            var repo = GetMockDbContextRepository();
            var glossary = new Appointment {PatientFirstName = "rath", PatientLastName = "The anger of rage"};
            var result = new Appointment();
            _mockAppointmentDataContext.Setup(g => g.SetModified(It.IsAny<object>())).Callback((object o) =>
            {
                result =
                    o as Appointment;
            });
            //act
            repo.Update(glossary);

            //assert
            Assert.AreEqual(glossary, result);
        }

        [Test]
        public void AppointmentRepositorySubmitChangesShouldCallContextSave()
        {
            //arrange 
            var repo = GetMockDbContextRepository();
            
            //act
            repo.SubmitChanges();

            //assert
            _mockAppointmentDataContext.Verify(c=>c.SaveChanges(),Times.Once());
        }
    }
}
