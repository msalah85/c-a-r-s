using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using System.Web.Services;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using Minutesuae.AlIraq;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using System.Data.SqlClient;
using System.Data;
using Aliraqusedcars;

public partial class InvoiceCustomsAddEdit : FactshMasterPage
{
    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // Fill page drop lists.
            FillLists.FillCustomsInvoiceProperties(CustomsCompanyID, ContainerNo);
        }
    }
    #endregion

    #region "WebMethods"
    ///////////////////Save Customs Invoices///////////////////////////

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveInvoice(CustomsInvoice scParam)
    {
        object data = new { };
        var status = new CustomsInvoicesManager().SaveItem(scParam);

        if (status > 0)
        {
            data = new
            {
                Status = true,
                ID = status,
                Message = Resources.AdminResources_ar.SuccessSave
            };
        }
        else
            data = new { Status = false, ID = 0, Message = Resources.AdminResources_ar.ErrorSave };


        return data;
    }

    //////////End saving Customs Invoices/////////
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetShippInvoicesDetails()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;

        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var containerN = Context.Request["containerNo"] ?? "";
        var customVal = Context.Request["customVal"] ?? "0";
        var command = DataAccess.CreateCommand();
        command.CommandText = "CustomsInvoices_GetCarsWithCustoms";

        object data = new { };

        try
        {
            command.Connection.Open();
            command.Parameters.AddWithValue("@pkId", containerN);
            command.Parameters.AddWithValue("@CustomVal", customVal);
            SqlDataAdapter adp = new SqlDataAdapter(command);
            DataSet ds = new DataSet();
            adp.Fill(ds);

            var rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            DataTable dt = ds.Tables[0];
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            data = new
            {
                sEcho = param.sEcho,
                iTotalRecords = ds.Tables[1].Rows[0][0],
                iTotalDisplayRecords = ds.Tables[1].Rows[0][0],
                aaData = rows.ToList()
            };

        }
        catch //(Exception ex)
        {
            //throw ex;
        }
        finally { command.Connection.Close(); }

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveCustomExpens(CustomsInvoicesDetail scParam)
    {
        object data = new { };

        CustomsInvoicesDetail item = new CustomsInvoicesDetail();
        item.CustomsDetailsID = scParam.CustomsDetailsID;
        item.CustomsExpenseValue = scParam.CustomsExpenseValue;
        item.CustomsInvoiceID = scParam.CustomsInvoiceID;
        item.ExpenseTypeID = scParam.ExpenseTypeID;
        item.IsDeleted = false;
        item.CarsNo = scParam.CarsNo;
        item.TotalExpensesValue = scParam.TotalExpensesValue;

        bool status = new CustomsInvoicesManager().SaveDetailsItem(item);
        if ((item.ExpenseTypeID > 0 && item.CustomsExpenseValue > -1) || status)
        {
            HttpContext.Current.Cache.Remove("CustomsInvoicesDetails");
            data = new
            {
                Status = true,
                Message = Resources.AdminResources_ar.SuccessSave
            };
        }
        else
            data = new { Status = false, Message = Resources.AdminResources_ar.ErrorSave };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetCustomsExpensesDetails()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc
        //var containnerNo = String.IsNullOrEmpty(Context.Request["containerNo"]) ? "" : string.Format(" AND ContainerNo='{0}' ", Context.Request["containerNo"]);


        List<CustomsInvoicesDetails_SelectRowResult> categoryList = new List<CustomsInvoicesDetails_SelectRowResult>();
        IEnumerable<CustomsInvoicesDetails_SelectRowResult> filtereAuctions;

        categoryList = new CustomsInvoicesManager().GetCustomsInvoicesDetails(" AND IsDeleted=0 AND CustomsInvoiceID IS NULL ");

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereAuctions = categoryList.Where(c => c.ExpenseTypeNameAr.ToString().ToLower().Contains(param.sSearch.ToLower()) ||
                c.CustomsExpenseValue.ToString().ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereAuctions = categoryList;
        }

        // handle asc and desc operation
        Func<CustomsInvoicesDetails_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.ExpenseTypeNameAr :
                               sortColumnIndex == 2 ? c.CustomsExpenseValue.ToString() : "");

        if (sortDirection == "asc")
            filtereAuctions = filtereAuctions.OrderBy(orderingFunction);
        else
            filtereAuctions = filtereAuctions.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereAuctions.Select(c => new
        {
            ExpenseTypeNameAr = c.ExpenseTypeNameAr,
            CustomsExpenseValue = c.CustomsExpenseValue,
            ExpenseTypeID = c.ExpenseTypeID,
            CustomsDetailsID = c.CustomsDetailsID,
            CarsNo = c.CarsNo,
            TotalExpensesValue = c.TotalExpensesValue
        });

        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereAuctions.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object DeleteCustomsExpense(CustomsInvoicesDetail scParam)
    {
        object data = new { };
        int status = new CustomsInvoicesManager().DeleteDetailsItem(scParam.CustomsDetailsID);

        if (status > 0)
        {
            HttpContext.Current.Cache.Remove("CustomsInvoicesDetails");
            data = new
            {
                Status = true,
                Message = Resources.AdminResources_ar.SuccessDelete
            };
        }
        else
            data = new { Status = false, Message = Resources.AdminResources_ar.ErrorDelete };

        return data;
    }

    [WebMethod]
    public static string GetCustomCompExpenses(string container)
    {
        var result = new CustomsInvoicesManager().GetCustomsExpenseTypesForComp(container);

        //return result.Expenses;
        var serializer = new JavaScriptSerializer();
        string jsonString = serializer.Serialize(new { ExpenseTypes = result });

        return jsonString;
    }

    #endregion
}