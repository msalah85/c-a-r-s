
using System;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class admin_admin_2015_CarSearchResult : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
    public static object GetCarsData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        string sortDirection = Context.Request["sSortDir_0"], // asc or desc

        // custome search
        sKey = Context.Request["searchKey"] ?? null,
        sType = Context.Request["searchType"] ?? null;

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, 
                             {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SortColumn", sortColumnIndex.ToString()},  
                             {"SortDirection", sortDirection},
                             {"SearchType", sType}, {"SearchKey", sKey}};

        // get all of data from db.
        var _ds = new Select().SelectLists("CarsData_SearchCarsList", _params);

        // get result of (DataTable) as json.
        var rows = DataUtilities.ConvertDTToJson(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows
        };

        return data;
    }
}