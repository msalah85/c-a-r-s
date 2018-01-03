using System;
using System.Linq;
using System.Web;
using Aliraqusedcars;
using System.Web.Services;
using System.Web.Script.Services;
using IraqCars.Business.DataUtility;
using IraqCars.Business.Business;

public partial class InvoicesShippRatesView : FactshMasterPage
{
    #region "Event Handler"
    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
    public static object LoadData()
    {

        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        //param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          

        // search paramters
        var shipperFilter = String.IsNullOrEmpty(Context.Request["Shipper"]) ? null : Context.Request["Shipper"];
        var Distination = String.IsNullOrEmpty(Context.Request["Distination"]) ? null : Context.Request["Distination"];
        string fromDate = null, toDate = null;
        fromDate = string.IsNullOrEmpty(Context.Request["From"]) ? null : Context.Request["From"];
        toDate = string.IsNullOrEmpty(Context.Request["To"]) ? null : Context.Request["To"];


        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, 
                                {"DisplayLength", param.iDisplayLength.ToString()},
                                //{"SearchParam", param.sSearch}, 
                                {"SortColumn", sortColumnIndex.ToString()}, 
                                {"SortDirection", sortDirection}, 
                                {"From", fromDate}, 
                                {"To", toDate}, 
                                {"Shipper", shipperFilter}, 
                                {"Distination", Distination}};

        // get all of data.
        var _ds = new Select().SelectLists("ShippInvoices_RatesList", _params);

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

    #endregion
}