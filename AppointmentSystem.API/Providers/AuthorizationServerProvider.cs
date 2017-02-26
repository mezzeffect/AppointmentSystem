using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using AppointmentSystem.Business;
using AppointmentSystem.Interfaces.Business;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin.Security.OAuth;

namespace AppointmentSystem.API
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        private readonly IUserServiceManager _userServiceManager;
        public AuthorizationServerProvider()
        {
            _userServiceManager = AppAutoFac.Resolve<IUserServiceManager>();
        }
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");

            if (allowedOrigin == null) allowedOrigin = "*";

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            
            try
            {
                //retrieve your user from database. ex:
                var user =  _userServiceManager.Authenticate(context.UserName, context.Password);

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
                //identity.AddClaim(new Claim(ClaimTypes.Email, user.Email));

                //roles example
                var rolesTechnicalNamesUser = new List<string>() { user.Role.ToString() };

                //if (user.Roles != null)
                //{
                //    rolesTechnicalNamesUser = user.Roles.Select(x => x.TechnicalName).ToList();

                //    foreach (var role in user.Roles)
                //        identity.AddClaim(new Claim(ClaimTypes.Role, role.TechnicalName));
                //}
                identity.AddClaim(new Claim(ClaimTypes.Role, user.Role.ToString()));

                var principal = new GenericPrincipal(identity, rolesTechnicalNamesUser.ToArray());

                Thread.CurrentPrincipal = principal;

                context.Validated(identity);
            }
            catch (Exception ex)
            {
                context.SetError("invalid_grant", "Please enter correct credentials");
            }
        }
    }
}