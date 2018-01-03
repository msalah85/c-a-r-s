using System;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using IraqCars.Business.Business;
using Aliraqusedcars;

public partial class BankBalancesView : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        // search paramters
        string fromDate = null, toDate = null;
        fromDate = string.IsNullOrEmpty(Context.Request["From"]) ? null : Context.Request["From"];
        toDate = string.IsNullOrEmpty(Context.Request["To"]) ? null : Context.Request["To"];

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, 
                                {"DisplayLength", param.iDisplayLength.ToString()},
                                {"From", fromDate}, {"To", toDate}};

        var _ds = new Select().SelectLists("BankBalances_SelectList", _params); // get all of data.

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }
}