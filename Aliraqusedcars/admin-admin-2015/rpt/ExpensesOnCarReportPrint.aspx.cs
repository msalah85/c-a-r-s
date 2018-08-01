using System;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using IraqCars.Business.Business;
using Aliraqusedcars;

public partial class ExpensesOnCarReport_Print : FactshMasterPage
{
    #region "Event Handler"
    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
    public static object LoadData()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;

        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        string buyerFilter = string.IsNullOrEmpty(Context.Request["buyer"]) ? null : Context.Request["buyer"];
        string client = string.IsNullOrEmpty(Context.Request["Client"]) ? null : Context.Request["Client"];
        string chassisFilter = string.IsNullOrEmpty(Context.Request["chassis"]) ? null : Context.Request["chassis"];
        string auction = string.IsNullOrEmpty(Context.Request["auction"]) ? null : Context.Request["auction"];
        string DistinationID = string.IsNullOrEmpty(Context.Request["DistinationID"]) ? null : Context.Request["DistinationID"];
        string fromDate = string.IsNullOrEmpty(Context.Request["from"]) ? null : Context.Request["from"],
               toDate = string.IsNullOrEmpty(Context.Request["to"]) ? null : Context.Request["to"];

        // create filter parameters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()},
                             {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SortColumn", sortColumnIndex.ToString()},
                             {"SortDirection", sortDirection},
                             {"From", fromDate}, {"To", toDate},
                             {"AuctionID", auction}, {"BuyerID", buyerFilter},
                             {"ChassisNo", chassisFilter}, {"Client", client},
                             {"DistinationID", DistinationID}};

        // get all of data.
        var _ds = new Select().SelectLists("ExpensesOnCarReportPrint_FillReport", _params);
        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }
    #endregion
}