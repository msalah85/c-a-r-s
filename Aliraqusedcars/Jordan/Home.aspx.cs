using Aliraqusedcars;
using System;
using System.Web.UI;

public partial class Jordan_Home : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        lblName.Text = SessionManager.Current.Name;
    }

    //[WebMethod]
    //[ScriptMethod(UseHttpGet = true)]
    //public static object Dash()
    //{
    //    string[,] _params = {  };
    //    var _ds = new Select().SelectLists("Jordan_Dashboard", _params); // get all of data.

    //    return LZStringUpdated.compressToUTF16(_ds.GetXml());
    //}
}