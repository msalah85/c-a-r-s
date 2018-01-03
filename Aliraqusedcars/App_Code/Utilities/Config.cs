//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================

using System.Configuration;

namespace Settings
{
    public static class Config
    {
        static readonly string user_item = "eng.msalah.abdullah@gmailcom";

        // public
        public static string AdminUrl = "admin-admin-2015",
                    FacePageAppID = ConfigurationManager.AppSettings["FaceAppID"],
                    FacePageAppSecret = ConfigurationManager.AppSettings["FaceAppSecret"],
                    FacePageName = ConfigurationManager.AppSettings["FacePageName"],

                    InstPageAppID = ConfigurationManager.AppSettings["instagram.clientid"],
                    InstAppSecret = ConfigurationManager.AppSettings["instagram.redirecturi"],
                    InstUrl = ConfigurationManager.AppSettings["FacePageName"],
                    CDN = ConfigurationManager.AppSettings["cdn"],

                    // cookie keys
                    encrypptKey = "cok$4Key", _cookName = "iraq_cars",
                    cookieID = "IraqcarID",
                    cookieUsername = "IraqcarName",
                    cookiePerm = "IraqcarPerm",
                    masterAccountID = "IraqcarMaster";
        //_encrypted_ticket = FormsAuthentication.Encrypt(new FormsAuthenticationTicket(1, "AlIraqCars", DateTime.Now, DateTime.Now.AddDays(1), false, user_item));
    }
}