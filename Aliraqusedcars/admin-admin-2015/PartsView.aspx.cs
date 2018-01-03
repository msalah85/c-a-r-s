
using System;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class admin_admin_2015_PartsView : FactshMasterPage
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
        // search parameters
        string clientId = Context.Request["ClientID"] ?? null,
        paid = Context.Request["paid"] ?? null,
        fromDate = string.IsNullOrEmpty(Context.Request["From"]) ? null : Context.Request["From"],
        toDate = string.IsNullOrEmpty(Context.Request["To"]) ? null : Context.Request["To"];


        // create filter parameters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SortColumn", sortColumnIndex.ToString()}, {"SortDirection", sortDirection},
                             {"ClientID",clientId},{"From",fromDate},{"To",toDate},{"Paid",paid}};

        // get all of data.
        var _ds = new Select().SelectLists("PartsInvoices_SelectList", _params);

        // enhance data to be list.
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


    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveDiscount(string[] values)
    {
        string[] names = { "ID", "ClientID", "Discount" };

        var saved = new Save().SaveRow("PartsInvoices_SetDiscount", names, values);
        // start save data.
        object data = new { };

        if (saved.Rows > 0)
        {
            data = new
            {
                ID = saved.ReturnedID,
                Status = true,
                Message = Resources.Resource_ar.SuccessSave
            };
        }
        else
        {
            data = new { ID = 0, status = false, Message = Resources.Resource_ar.ErrorSave };
        }

        return data;
    }
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SavePayment(string[] values)
    {
        string[] names = { "ID", "Amount" };
        var saved = new Save().SaveRow("PartsInvoiceInstallments_Save", names, values);
        // start save data.
        object data = new { };

        if (saved.Rows > 0)
        {
            data = new
            {
                ID = saved.ReturnedID,
                Status = true,
                Message = Resources.Resource_ar.SuccessSave
            };
        }
        else
        {
            data = new { ID = 0, status = false, Message = Resources.Resource_ar.ErrorSave };
        }

        return data;
    }
}