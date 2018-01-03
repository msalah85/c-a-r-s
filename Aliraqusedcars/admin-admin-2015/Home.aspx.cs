using IraqCars.Business.Business;
using System;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using Aliraqusedcars;

public partial class Admin_Iraq_home : Page
{
    void Page_Init(object sender, EventArgs e)
    {
        // gulf auto permission
        if (SessionManager.Current.PermID.Equals("3"))
        {
            divNormalContents.InnerHtml = "<center><a href='america/carnotesen.aspx' class='btn btn-app btn-primary no-radius'><i class='ace-icon icon-pencil bigger-230'></i> Notes </a></center>";
            statistics.Visible = false;
        }
    }


    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetData(string value)
    {
        // create filter paramters
        string[,] _params = { { "URL", value }, { "UserID", SessionManager.Current.ID } };

        // get all of data.
        var _ds = new Select().SelectLists("MasterAdmin", _params);
        return _ds.GetXml();
    }
}