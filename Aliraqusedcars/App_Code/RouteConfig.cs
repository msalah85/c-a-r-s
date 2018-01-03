//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================

using System.Web.Routing;
using Settings;
using Microsoft.AspNet.FriendlyUrls;

namespace Aliraqusedcars
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.Ignore("{resource}.axd/{*pathInfo}");
            //routes.RouteExistingFiles = false;
            routes.Ignore("{*allcss}", new { allaspx = @".*\.css(/.*)?" });
            routes.Ignore("{*alljs}", new { allaspx = @".*\.js(/.*)?" });
            routes.Ignore("{*alljpg}", new { allaspx = @".*\.jpg(/.*)?" });
            routes.Ignore("{*favicon}", new { favicon = "(.*/)?favicon.ico(/.*)?" });
            ////////////////////////////////////////////////////////////////////////////

            var settings = new FriendlyUrlSettings();
            settings.AutoRedirectMode = RedirectMode.Off;
            routes.EnableFriendlyUrls(settings);
            string adminUrl = Config.AdminUrl;

            #region "Admin Routing"
            routes.MapPageRoute("admin-edit", adminUrl + "/admin-{empId}/{Name}.aspx", string.Format("~/{0}/AdminEdit.aspx", adminUrl));
            routes.MapPageRoute("clients-edit", adminUrl + "/user/{userId}/{Name}.aspx", string.Format("~/{0}/UsersAddEdit.aspx", adminUrl));
            routes.MapPageRoute("outsides-edit", adminUrl + "/pay/{Id}/{Name}.aspx", string.Format("~/{0}/InvoicePayAdd.aspx", adminUrl));
            routes.MapPageRoute("SaleInvoices-edit", adminUrl + "/sale/{Id}/{Name}.aspx", string.Format("~/{0}/InvoiceSaleAdd.aspx", adminUrl));
            routes.MapPageRoute("cars-sold", adminUrl + "/sold/{Id}/{Name}", string.Format("~/{0}/CarsView.aspx", adminUrl));
            routes.MapPageRoute("cars-NotSold", adminUrl + "/available/{Id}/{Name}", string.Format("~/{0}/CarsView.aspx", adminUrl));
            #endregion

            #region "Site Routes"
            routes.MapPageRoute("articles", "page/{page}", "~/page-details.aspx");
            routes.MapPageRoute("car", "car/{car}", "~/car-details.aspx");
            routes.MapPageRoute("contactus", "contacts/تواصل-معنا", "~/contact-us.aspx");
            #endregion
        }
    }
}