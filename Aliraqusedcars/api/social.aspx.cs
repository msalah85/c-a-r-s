//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================

using System.Web.Services;
using System.Web.Script.Services;
using Aliraqusedcars;

public partial class api_social : System.Web.UI.Page
{
    #region "Get General Data"

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static string postToAll(string url, string image, string title, string message)
    {
        var result = SocialAutoPosting.PostingToAll(url, image, title, title, message, message);

        return result;
    }

    #endregion
}