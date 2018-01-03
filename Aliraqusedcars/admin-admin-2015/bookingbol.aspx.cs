using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using System;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class admin_admin_2015_bookingbol : FactshMasterPage
{

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        var ids = Context.Request["id"];

        // create filter paramters
        string[,] _params = {{"id", ids}};

        // get all of data.
        var _ds = new Select().SelectLists("Booking_SelectCars", _params);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows.ToList()
        };

        return data;
    }
}