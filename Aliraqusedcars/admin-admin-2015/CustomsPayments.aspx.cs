using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Minutesuae.SystemUtilities;
using System.Collections;
using System.Data.SqlClient;
using System.Web.Script.Services;
using System.Web.Services;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class CustomsPayments : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetCustomspaymentsmaster()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc  

        var CustomsCompanyID = String.IsNullOrEmpty(Context.Request["CustomsCompanyID"]) ? "" : Context.Request["CustomsCompanyID"];
        var _type = String.IsNullOrEmpty(Context.Request["Type"]) ? "0" : Context.Request["Type"];

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()},
                                {"DisplayLength", param.iDisplayLength.ToString()},
                                {"SearchParam", param.sSearch},
                                {"SortColumn", sortColumnIndex.ToString()},
                                {"SortDirection", sortDirection},
                                {"CustomsCompanyID", CustomsCompanyID},
                                {"Type", _type}};

        // get all of data.
        var _ds = new Select().SelectLists("Customspaymentsmaster_SelectList", _params);

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

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static bool updatedate(string value)
    {
        bool deleted = false;
        SqlCommand command = DataAccess.CreateCommandText();
        try
        {
            command.CommandText = string.Format("DELETE CustomspaymentsDetails Where PaymentsId={0}; DELETE Customspaymentsmaster where PaymentsId={0}", value);
            command.Connection.Open();
            int i = command.ExecuteNonQuery();
            deleted = true;
        }
        catch { }
        finally { command.Connection.Close(); }

        return deleted;
    }
}