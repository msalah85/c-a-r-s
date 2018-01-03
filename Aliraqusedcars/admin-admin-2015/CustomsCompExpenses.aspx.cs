using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Caching;
using System.Web.Services;
using System.Web.Script.Services;
using Minutesuae.AlIraq;
using Aliraqusedcars;

public partial class CustomsCompExpenses : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetCustomsExpenses()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<CustomsExpenses_SelectListResult> categoryList = new List<CustomsExpenses_SelectListResult>();
        IEnumerable<CustomsExpenses_SelectListResult> filtereCustomsExpenses;
        if (HttpContext.Current.Cache["CustomsExpenses"] == null)
        {

            categoryList = new CustomsExpensesManager().GetCustomsExpenses();
            HttpContext.Current.Cache.Insert("CustomsExpenses", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));
        }
        else
        {
            categoryList = HttpContext.Current.Cache["CustomsExpenses"] as List<CustomsExpenses_SelectListResult>;
        }

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereCustomsExpenses = categoryList.Where(c => c.CustomsCompanyNameAr.ToLower().Contains(param.sSearch.ToLower()) ||
                c.ExpenseTypeNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereCustomsExpenses = categoryList;
        }

        // handle asc and desc operation
        Func<CustomsExpenses_SelectListResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.ExpenseTypeNameAr :
                               sortColumnIndex == 2 ? c.CustomsCompanyNameAr.ToString() : "");

        if (sortDirection == "asc")
            filtereCustomsExpenses = filtereCustomsExpenses.OrderBy(orderingFunction);
        else
            filtereCustomsExpenses = filtereCustomsExpenses.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereCustomsExpenses.Skip(param.iDisplayStart).Take(param.iDisplayLength);

        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereCustomsExpenses.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveCustomsExpense(CustomsExpense scParam)
    {
        object data = new { };

        CustomsExpense item = new CustomsExpense();
        item.CustomsExpenseID = scParam.CustomsExpenseID;
        item.CustomsCompanyID = scParam.CustomsCompanyID;
        item.ExpenseTypeID = scParam.ExpenseTypeID;
        item.ExpensesCharge = scParam.ExpensesCharge;

        bool status = new CustomsExpensesManager().SaveItem(item);
        if ((item.ExpenseTypeID > 0 && item.CustomsCompanyID > 0) || status)
        {
            HttpContext.Current.Cache.Remove("CustomsExpenses");
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
    public static List<CustomsCompanies_SelectByDistinationResult> GetCustomsCo(int mainId)
    {
        var result = new CustomsCompaniesManager().GetCustomsCompByDistination(mainId);
        return result;
    }

    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            FillLists.FillExpensesList(ExpenseTypeID, DistinationID);
        }
    }

    #endregion
}