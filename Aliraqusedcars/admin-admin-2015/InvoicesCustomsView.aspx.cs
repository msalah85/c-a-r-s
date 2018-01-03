using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using IraqCars.Business.DataUtility;
using IraqCars.Business.Business;
using Aliraqusedcars;

public partial class InvoicesCustomsView : FactshMasterPage
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

        var customCoFilter = String.IsNullOrEmpty(Context.Request["Shipper"]) ? null : Context.Request["Shipper"];
        var paid = String.IsNullOrEmpty(Context.Request["Paid"]) ? null : Context.Request["Paid"];
        var container = String.IsNullOrEmpty(Context.Request["Container"]) ? null : Context.Request["Container"];
        string fromDate = null, toDate = null;
        fromDate = string.IsNullOrEmpty(Context.Request["From"]) ? null : Context.Request["From"];
        toDate = string.IsNullOrEmpty(Context.Request["To"]) ? null : Context.Request["To"];

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, 
                                {"DisplayLength", param.iDisplayLength.ToString()},
                                {"SortColumn", sortColumnIndex.ToString()}, 
                                {"SortDirection", sortDirection},
                                {"From", fromDate}, {"To", toDate},
                                {"CustomCo", customCoFilter}, {"Paid", paid}, {"ContainerNo", container}};

        // get all of data.
        var _ds = new Select().SelectLists("InvoicesCustoms_List", _params);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToJson(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows,
            TotalSum = _ds.Tables[1].Rows[0][1],
            TotalSumDhs = _ds.Tables[1].Rows[0][2]
        };

        return data;
    }
}