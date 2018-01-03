using System;
using System.Web.Services;
using Aliraqusedcars;
using System.Web.Script.Services;
using IraqCars.Business.Business;

public partial class client_dashboard : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // hide/show select account 
        btnSelectAccount.Visible = (!SessionManager.Current.MasterAccountID.Equals("0"));
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object Dash()
    {
        string[,] _params = { { "ID", SessionManager.Current.ID } };
        var _ds = new Select().SelectLists("Client_Dashboard", _params); // get all of data.

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }
}