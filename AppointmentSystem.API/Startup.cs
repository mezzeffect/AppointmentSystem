using System;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using AppointmentSystem.API.Controllers;
using AppointmentSystem.Business;
using AppointmentSystem.Data;
using AppointmentSystem.Dto;
using AppointmentSystem.Interfaces.Business;
using AppointmentSystem.Interfaces.Data;
using AppointmentSystem.Interfaces.Repository;
using AppointmentSystem.Repository;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;

[assembly: OwinStartup(typeof(AppointmentSystem.API.Startup))]
namespace AppointmentSystem.API
{
    //public class Startup
    //{
    //    public void Configuration(IAppBuilder app)
    //    {
    //        HttpConfiguration config = new HttpConfiguration();
    //        WebApiConfig.Register(config);
    //        app.UseWebApi(config);
    //    }

    //}
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            config.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional });
            //other configurations
            var builder = new ContainerBuilder();
            // Register dependencies, then...
            

            // Register Web API controller in executing assembly.

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<AppointmentsController>();
            builder.RegisterType<UserController>();
            // Register a Data Context.
            builder.RegisterType<AppointmentSystemDataContext>().As<IAppointmentSystemDataContext>();

            //Register Repos
            builder.RegisterType<AppointmentRepository>().As<IEntityRepository<Appointment>>();
            builder.RegisterType<UserRepository>().As<IEntityRepository<User>>();

            //Register Business Services
            builder.RegisterType<UserServiceManager>().As<IUserServiceManager>();
            builder.RegisterType<AppointmentServiceManager>().As<IAppointmentServiceManager>();

            
            var container = AppAutoFac.Container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            // Register the Autofac middleware FIRST. This also adds
            // Autofac-injected middleware registered with the container.
            app.UseAutofacMiddleware(container);
            ConfigureOAuth(app);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseAutofacWebApi(config);
            app.UseWebApi(config);
            //create database if not existing
            Database.SetInitializer(new CreateDatabaseIfNotExists<AppointmentSystemDataContext>());
        }

        public void ConfigureOAuth(IAppBuilder app)
        {
            var oAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/security/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(2),
                Provider = new AuthorizationServerProvider()
            };

            app.UseOAuthAuthorizationServer(oAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}