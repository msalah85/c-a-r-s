using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.Caching;
using Aliraqusedcars;

public partial class MinutesuaeCustomsTypes : FactshMasterPage
{
    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetExpenseTypes()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<ExpenseTypes_SelectRowResult> categoryList = new List<ExpenseTypes_SelectRowResult>();
        IEnumerable<ExpenseTypes_SelectRowResult> filtereExpenseTypes;
        if (HttpContext.Current.Cache["CustomsTypes"] == null)
        {
            categoryList = new ExpenseTypesManager().GetExpenseTypes(" AND GroupName = 'customs' ");
            HttpContext.Current.Cache.Insert("CustomsTypes", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));
        }
        else
        {
            categoryList = HttpContext.Current.Cache["CustomsTypes"] as List<ExpenseTypes_SelectRowResult>;
        }

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereExpenseTypes = categoryList.Where(c => c.ExpenseTypeNameEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.ExpenseTypeNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereExpenseTypes = categoryList;
        }

        // handle asc and desc operation
        Func<ExpenseTypes_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.ExpenseTypeNameEn :
                               sortColumnIndex == 2 ? c.ExpenseTypeNameAr.ToString() : "");

        if (sortDirection == "asc")
            filtereExpenseTypes = filtereExpenseTypes.OrderBy(orderingFunction);
        else
            filtereExpenseTypes = filtereExpenseTypes.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereExpenseTypes.Select(c => new
        {
            ExpenseTypeID = c.ExpenseTypeID,
            ExpenseTypeNameEn = c.ExpenseTypeNameEn,
            ExpenseTypeNameAr = c.ExpenseTypeNameAr
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereExpenseTypes.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveExpenseType(ExpenseType scParam)
    {
        object data = new { };

        ExpenseType item = new ExpenseType();
        item.ExpenseTypeID = scParam.ExpenseTypeID;
        item.ExpenseTypeNameEn = scParam.ExpenseTypeNameEn;
        item.ExpenseTypeNameAr = scParam.ExpenseTypeNameAr;
        item.GroupName = "customs";

        bool status = new ExpenseTypesManager().SaveExpenseType(item);
        if ((item.ExpenseTypeNameEn != null && item.ExpenseTypeNameAr != null) || status)
        {
            HttpContext.Current.Cache.Remove("CustomsTypes");
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

    #endregion
}