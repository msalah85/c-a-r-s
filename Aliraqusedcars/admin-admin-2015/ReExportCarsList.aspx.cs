using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using System;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class admin_admin_2015_ReExportCarsList : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
    public static object LoadData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          

        string fromDate = null, toDate = null,id=null;
        fromDate = string.IsNullOrEmpty(Context.Request["From"]) ? null : Context.Request["From"];
        toDate = string.IsNullOrEmpty(Context.Request["To"]) ? null : Context.Request["To"];
        id = string.IsNullOrEmpty(Context.Request["id"]) ? null : Context.Request["id"];

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, 
                             {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SortColumn", sortColumnIndex.ToString()}, 
                             {"SortDirection", sortDirection},
                             {"From", fromDate}, {"To", toDate}, {"ExportID", id}};

        // get all of data.
        var _ds = new Select().SelectLists("ReExportCars_SelectList", _params);

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