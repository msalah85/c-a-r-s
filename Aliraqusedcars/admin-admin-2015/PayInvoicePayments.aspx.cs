using System;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using IraqCars.Business.Business;
using Aliraqusedcars;

public partial class PayInvoicePayments : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetPayInvoicePayments()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        //param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        string sortDirection = Context.Request["sSortDir_0"],// asc or desc 
            ExchangeCompanyID = String.IsNullOrEmpty(Context.Request["ExchangeCompanyID"]) ? null : Context.Request["ExchangeCompanyID"],
            buyer = String.IsNullOrEmpty(Context.Request["buyer"]) ? null : Context.Request["buyer"],
            from = String.IsNullOrEmpty(Context.Request["from"]) ? null : Context.Request["from"],
            to = String.IsNullOrEmpty(Context.Request["to"]) ? null : Context.Request["to"],
            pending = String.IsNullOrEmpty(Context.Request["Pend"]) ? "0" : Context.Request["Pend"];

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SortColumn", sortColumnIndex.ToString()}, {"SortDirection", sortDirection}, // {"SearchParam", param.sSearch}, 
                             {"ExchangeCompanyID", ExchangeCompanyID},{"From", from},{"To", to},{"Buyer", buyer},{"Pend", pending}};

        // get all of data.
        var _ds = new Select().SelectLists("PayInvoicePayments_SelectList", _params);
        
        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static bool updatedate(string value)
    {
        string sql = string.Format("UPDATE PayInvoicePayments set IsDeleted=1 where PayInvoicePaymentsID={0}", value);
        var saved = new Save().RunSQLString(sql);
        return true;
    }
}