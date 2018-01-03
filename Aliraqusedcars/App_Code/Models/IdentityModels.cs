using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Web;
using System;
using System.Security.Claims;
using System.Collections.Generic;
using System.ComponentModel;

namespace Aliraqusedcars
{
    public static class IdentityHelper
    {
        public static void SignIn(LoginModel user, bool isPersistent = true)
        {
            IAuthenticationManager authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            authenticationManager.SignOut(DefaultAuthenticationTypes.ExternalCookie);

            var claims = new List<Claim> {
                new Claim(CustomClaimTypes.Name, user.Name, ClaimValueTypes.String),
                new Claim(CustomClaimTypes.ID, user.ID, ClaimValueTypes.String),
                new Claim(CustomClaimTypes.PermID, user.PermID, ClaimValueTypes.String),
                new Claim(CustomClaimTypes.MasterAccountID, user.MasterAccountID, ClaimValueTypes.String)
            };

            var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
            authenticationManager.SignIn(new AuthenticationProperties() { IsPersistent = isPersistent }, identity);
        }

        // get claim by id
        public static IEnumerable<object> GetValues<T>(IEnumerable<T> items, string propertyName)
        {
            Type type = typeof(T);
            var prop = type.GetProperty(propertyName);
            foreach (var item in items)
                yield return prop.GetValue(item, null);
        }

        public static void SignOut()
        {
            var ctx = HttpContext.Current.Request.GetOwinContext();
            var authenticationManager = ctx.Authentication;
            authenticationManager.SignOut();
        }

        private static bool IsLocalUrl(string url)
        {
            return !string.IsNullOrEmpty(url) && ((url[0] == '/' && (url.Length == 1 || (url[1] != '/' && url[1] != '\\'))) || (url.Length > 1 && url[0] == '~' && url[1] == '/'));
        }
        public static void RedirectToReturnUrl(string returnUrl, HttpResponse response)
        {
            if (!String.IsNullOrEmpty(returnUrl) && IsLocalUrl(returnUrl))
            {
                response.Redirect(returnUrl);
            }
            else
            {
                response.Redirect("~/");
            }
        }
    }

    public static class CustomClaimTypes
    {
        public const string ID = "ID";
        public const string Name = "Name";
        public const string PermID = "PermID";
        public const string IP = "IP";
        public const string MasterAccountID = "MasterAccountID";
    }

    public class LoginModel
    {
        [DefaultValue("0")]
        public string ID { get; set; }
        [DefaultValue("")]
        public string Name { get; set; }
        [DefaultValue("0")]
        public string PermID { get; set; }
        [DefaultValue("")]
        public string IP { get; set; }
        [DefaultValue("0")]
        public string MasterAccountID { get; set; }
    }
}