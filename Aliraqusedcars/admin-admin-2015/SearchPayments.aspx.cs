
using System;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class SearchPayments : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetClintsPayments()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;

        string clientIDFilter = String.IsNullOrEmpty(Context.Request["key"]) ? "" : Context.Request["key"],
               fieldID = String.IsNullOrEmpty(Context.Request["kid"]) ? "ReceiptID" : Context.Request["kid"];

        // create filter paramters
        string[,] _params = { { "ClientIDFilter", clientIDFilter }, { "FieldID", fieldID } };


        // get all of data from db.
        var _ds = new Select().SelectLists("ClientsPayments_Search", _params);

        // get result of (DataTable) as json.
        var rows = DataUtilities.ConvertDTToJson(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[0].Rows.Count,
            iTotalDisplayRecords = _ds.Tables[0].Rows.Count,
            aaData = rows
        };

        return data;
    }
}