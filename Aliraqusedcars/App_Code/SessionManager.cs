using System.Web;
using System.Collections.Generic;
using System.Security.Claims;
using System.Linq;

namespace Aliraqusedcars
{
    public class SessionManager
    {
        SessionManager()
        {
            MasterAccountID = PermID = ID = "0";
            IP = HttpContext.Current.Request.UserHostAddress;
        }

        public static SessionManager Current
        {
            get
            {
                var session = new SessionManager();
                var context = HttpContext.Current;

                if (context != null)
                {
                    var ctx = context.Request.GetOwinContext();
                    var _user = ctx.Authentication.User;
                    IEnumerable<Claim> claims = _user.Claims;

                    if (claims != null)
                    {
                        session.ID = claims.FirstOrDefault(x => x.Type == CustomClaimTypes.ID) != null ? claims.FirstOrDefault(x => x.Type == CustomClaimTypes.ID).Value : "0";
                        session.Name = claims.FirstOrDefault(x => x.Type == CustomClaimTypes.Name) != null ? claims.FirstOrDefault(x => x.Type == CustomClaimTypes.Name).Value : "";
                        session.PermID = claims.FirstOrDefault(x => x.Type == CustomClaimTypes.PermID) != null ? claims.FirstOrDefault(x => x.Type == CustomClaimTypes.PermID).Value : "0";
                        session.MasterAccountID = claims.FirstOrDefault(x => x.Type == CustomClaimTypes.MasterAccountID) != null ? claims.FirstOrDefault(x => x.Type == CustomClaimTypes.MasterAccountID).Value : "0";
                    }
                }

                return session;
            }
        }

        public string ID { get; set; }
        public string Name { get; set; }
        public string PermID { get; set; }
        public string IP { get; set; }
        public string MasterAccountID { get; set; }
    }
}