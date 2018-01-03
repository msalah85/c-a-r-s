using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;

public partial class UX_CarsViewList : FactshMasterPage
{
    #region "Methods"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
    public static object GetCarsData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        //param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          
        var isScrap = Context.Request["type"] ?? "0";
        // custome search
        var sKey = Context.Request["searchKey"] ?? null;
        var sType = Context.Request["searchType"] ?? null;

        if (!string.IsNullOrEmpty(sType))
            param.sSearch = sKey;


        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, 
                             {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SortColumn", sortColumnIndex.ToString()}, 
                             {"SearchParam", param.sSearch}, 
                             {"SortDirection", sortDirection}, {"IsScrap", isScrap},
                             {"SearchType", sType}};

        // get all of data.
        var _ds = new Select().SelectLists("CarsData_SelectCarsList", _params);

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




    /*[WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetCarsData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;

        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc
        //string sortField = GetSortingField(sortColumnIndex); // sort column name.
        bool sold = Context.Request.Url.AbsoluteUri.ToLower().Contains("sold") ? true : false; // sold cars.

        // feach data from db.
        var result = new CarsDataManager().GetCarsData(param.iDisplayStart, param.iDisplayLength, param.sSearch, sold, sortColumnIndex.ToString(), sortDirection);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = result.Count,
            iTotalDisplayRecords = result.Count,
            aaData = result.CarsList
        };

        return data;
    }
    */
    #endregion
}