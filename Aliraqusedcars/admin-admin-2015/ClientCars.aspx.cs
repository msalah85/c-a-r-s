using System;
using System.Web;
using System.Web.Services;
using IraqCars.Business.Business;
using System.Web.Script.Services;
using Aliraqusedcars;

public partial class ClientCars : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadData()
    {
        var param = new jQueryDataTableParamModel();
        var Context = HttpContext.Current;

        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? null : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 50 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        string sortDirection = Context.Request["sSortDir_0"], // asc or desc 
               clientId = string.Format("{0}", Context.Request["client"]), isDone = string.Format("{0}", Context.Request["done"] ?? "0"),
               SelectCarID = String.IsNullOrEmpty(Context.Request["selectedCarId"]) ? null : Context.Request["selectedCarId"];

        // create filter parameters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch}, {"SortColumn", sortColumnIndex.ToString()}, {"SortDirection", sortDirection},
                             {"ClientID", clientId},{"IsDone", isDone},{"SelectedCarID", SelectCarID}};

        // get all of data.
        var _ds = new Select().SelectLists("ClientCars_SelectList", _params);
        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object Cancel(string value, string reason)
    {
        string[] names = { "SaleInvoiceID", "DeleteReason", "UserID", "IP" },
            values = { value, reason, SessionManager.Current.ID, SessionManager.Current.IP };

        var saved = new Save().SaveRow("CarSaleInvoices_Delete", names, values);
        object data = new { };

        if (saved.Rows > 0)
        {
            data = new
            {
                ID = saved.ReturnedID,
                Status = true,
                Message = Resources.Resource_ar.SuccessDelete
            };
        }
        else
        {
            data = new { ID = 0, status = false, Message = Resources.Resource_ar.ErrorDelete };
        }

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object CancelInstallment(string[] values)
    {
        values[4] = SessionManager.Current.ID; // user id.
        string[] names = { "CarID", "ClientID", "InstallmentTypeID", "Reason", "UserID" };
        var saved = new Save().SaveRow("ClientInstallments_Delete", names, values);

        object data = new { };
        if (saved.Rows > 0)
        {
            data = new
            {
                ID = saved.ReturnedID,
                Status = true,
                Message = Resources.Resource_ar.SuccessDelete + " وإلغاء السداد."
            };
        }
        else
        {
            data = new { ID = 0, status = false, Message = Resources.Resource_ar.ErrorDelete };
        }

        return data;
    }

    /// <summary>
    /// save data
    /// </summary>
    ///  <param name="values"></param>
    /// <returns> object of list data and records count </returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object Save(string[] values)
    {
        string actionName = "ClientInstallments_Save";
        string[] names = { "InstallmentID", "ClientID", "CarID", "Amount", "InstallmentTypeID", "PaidOut" };

        var saved = new Save().SaveRow(actionName, names, values);

        object data = new { };
        if (saved.ReturnedID != -1)
        {
            data = new
            {
                Status = true,
                Message = "تمت عملية الحفظ بنجاح."
            };
        }
        else
        {
            data = new { Status = false, Message = "لقد حدث خطأ أثناء عملية الأضافة." };
        }

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SavePaper(string[] values)
    {
        string actionName = "CarsData_SetReceivePaper";
        string[] names = { "CarID", "ReceiveWithPaper" };

        var saved = new Save().SaveRow(actionName, names, values);
        return new
        {
            Status = (saved.ReturnedID > 0),
            Message = saved.ReturnedID > 0 ? "تم تسليم ورق السيارة بنجاح." : "لقد حدث خطأ أثناء تنفيذ الإجراء."
        };
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveDiscount(string[] values)
    {
        string actionName = "CarsData_SetCarDiscount";
        string[] names = { "CarID", "DiscountVal" };

        var saved = new Save().SaveRow(actionName, names, values);
        if (saved.ReturnedID != -1)
        {
            return new
            {
                Status = true,
                Message = "تم حفظ الخصم على السيارة بنجاح."
            };
        }
        else
        {
            return new { Status = false, Message = "لقد حدث خطأ أثناء تنفيذ الإجراء." };
        }
    }
}