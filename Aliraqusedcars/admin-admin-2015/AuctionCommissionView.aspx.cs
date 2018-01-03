using IraqCars.Business.Business;
using System;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class AuctionCommissionView : FactshMasterPage
{
    #region "Event Handler"
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
        
        // search paramters
        var auction = Context.Request["auction"];
        string fromDate = null, toDate = null;
        fromDate = string.IsNullOrEmpty(Context.Request["From"]) ? null : Context.Request["From"];
        toDate = string.IsNullOrEmpty(Context.Request["To"]) ? null : Context.Request["To"];


        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SortColumn", sortColumnIndex.ToString()}, {"SortDirection", sortDirection},
                             {"Auction",auction},{"From",fromDate},{"To",toDate}};

        // get all of data.
        var _ds = new Select().SelectLists("AuctionCommissions_SelectList", _params);

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }
    #endregion
}