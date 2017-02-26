using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Moq;
using NUnit.Framework;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces;
using AppointmentSystem.Interfaces.Business;
using AppointmentSystem.Interfaces.Data;
using AppointmentSystem.Interfaces.Repository;

namespace AppointmentSystem.Business.Tests
{
    [TestFixture]
    public class AppointmentBusinessManagerTests
    {
        private Mock<IEntityRepository<Appointment>> _mockAppointmentRepository;
        private Mock<IEntityRepository<User>> _mockUserRepository;

        private IBusinessManager<Appointment> GetGlossaryBussinessManager()
        {
            _mockAppointmentRepository = new Mock<IEntityRepository<Appointment>>();
            return new AppointmentServiceManager(_mockAppointmentRepository.Object, _mockUserRepository.Object);
        }

        [Test]
        public void GlossaryBusinessManagerFindShouldCallRepoCallById()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();

            //act
            manager.Find(0);

            //assert
            _mockAppointmentRepository.Verify(g=>g.GetById(It.IsAny<int>()),Times.Once());
        }

        [Test]
        public void GlossaryBusinessManagerFindShouldCallRepoCallByIdWithCorrectId()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            int? id = 0;
            _mockAppointmentRepository.Setup(g => g.GetById(It.IsAny<int>())).Callback((int? i)=>
                                                                                        {
                                                                                            id = i;
                                                                                        });
            //act
            manager.Find(12);

            //assert
            Assert.AreEqual(12,id);
        }

        [Test]
        public void GlossaryBusinessManagerFindShouldReturnNullIfGetByIdThrowsException()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            int? id = 0;
            _mockAppointmentRepository.Setup(g => g.GetById(It.IsAny<int>())).Throws(new Exception());
            //act
            var result = manager.Find(12);

            //assert
            Assert.Null(result);
        }

        [Test]
        public void GlossaryBusinessManagerAddShouldReturnTrueIfNothingIsWrong()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            //act
            var result = manager.Add(new Appointment());

            //assert
            Assert.AreEqual(true,result);
        }

        [Test]
        public void GlossaryBusinessManagerAddShouldCallRepoAddIfNothingIsWrong()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            //act
            var result = manager.Add(new Appointment());

            //assert
            _mockAppointmentRepository.Verify(m=>m.Add(It.IsAny<Appointment>()),Times.Once());
        }

        [Test]
        public void GlossaryBusinessManagerAddShouldCallRepoSubmitChanges()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            //act
            var result = manager.Add(new Appointment());

            //assert
            _mockAppointmentRepository.Verify(m => m.SubmitChanges(), Times.Once());
        }

        [Test]
        public void GlossaryBusinessManagerAddShouldReturnFalseIfAddThowsException()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            _mockAppointmentRepository.Setup(m => m.Add(It.IsAny<Appointment>())).Throws(new Exception());
            
            //act
            var result = manager.Add(new Appointment());

            //assert
            Assert.False(result);
            
        }

        [Test]
        public void GlossaryBusinessManagerAddShouldReturnFalseIfSubmitChangesThrowsException()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            _mockAppointmentRepository.Setup(m => m.SubmitChanges()).Throws(new Exception());

            //act
            var result = manager.Add(new Appointment());

            //assert
            Assert.False(result);

        }

        [Test]
        public void GlossaryBusinessManagerAllShouldCallRepoAll()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();

            //act
            var result = manager.All();

            //assert
            _mockAppointmentRepository.Verify(g=>g.All(),Times.Once());
        }

        [Test]
        public void GlossaryBusinessManagerAllShouldReturnNullIfExceptionIsThrown()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            _mockAppointmentRepository.Setup(g => g.All()).Throws(new Exception());
            
            //act
            var result = manager.All();

            //assert
            Assert.Null(result);
        }

        [Test]
        public void GlossaryBusinessManagerRemoveShouldCallRepDelete()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();

            //act
            var result = manager.Remove(It.IsAny<Appointment>());

            //assert
            _mockAppointmentRepository.Verify(g=>g.Delete(It.IsAny<Appointment>()),Times.Once());
        }

        [Test]
        public void GlossaryBusinessManagerRemoveShouldCallRepSubmitChanges()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();

            //act
            var result = manager.Remove(It.IsAny<Appointment>());

            //assert
            _mockAppointmentRepository.Verify(g => g.SubmitChanges(),Times.Once());
        }

        [Test]
        public void GlossaryBusinessManagerRemoveShouldReturnFalseIfExceptionIsThrown()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            _mockAppointmentRepository.Setup(g => g.Delete(It.IsAny<Appointment>())).Throws(new Exception());
            //act
            var result = manager.Remove(It.IsAny<Appointment>());

            //assert
            Assert.False(result);
        }

        [Test]
        public void GlossaryBusinessManagerRemoveShouldReturnTrueIfSuccessfull()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            //act
            var result = manager.Remove(It.IsAny<Appointment>());

            //assert
            Assert.True(result);
        }

        [Test]
        public void GlossaryBusinessManagerUpdateShouldCallRepUpdate()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();

            //act
            var result = manager.Update(It.IsAny<Appointment>());

            //assert
            _mockAppointmentRepository.Verify(g => g.Update(It.IsAny<Appointment>()), Times.Once());
        }

        [Test]
        public void GlossaryBusinessManagerUpdateShouldCallRepSubmitChanges()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();

            //act
            var result = manager.Update(It.IsAny<Appointment>());

            //assert
            _mockAppointmentRepository.Verify(g => g.SubmitChanges(), Times.Once());
        }

        [Test]
        public void GlossaryBusinessManagerUpdateShouldReturnFalseIfExceptionIsThrown()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            _mockAppointmentRepository.Setup(g => g.Update(It.IsAny<Appointment>())).Throws(new Exception());
            //act
            var result = manager.Update(It.IsAny<Appointment>());

            //assert
            Assert.False(result);
        }

        [Test]
        public void GlossaryBusinessManagerUpdateShouldReturnTrueIfSuccessfull()
        {
            //arrange
            var manager = GetGlossaryBussinessManager();
            
            //act
            var result = manager.Update(It.IsAny<Appointment>());

            //assert
            Assert.True(result);
        }


    }
}
