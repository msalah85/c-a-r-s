using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.Caching;
using Aliraqusedcars;

public partial class ExchangeCompanies : FactshMasterPage
{
    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetExchangeCompanies()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<ExchangeCompanies_SelectRowResult> categoryList = new List<ExchangeCompanies_SelectRowResult>();
        IEnumerable<ExchangeCompanies_SelectRowResult> filtereExchangeCompanies;
        categoryList = new ExchangeCompaniesManager().GetExchangeCompanies("");
        HttpContext.Current.Cache.Insert("ExchangeCompanies", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereExchangeCompanies = categoryList.Where(c => c.ExchangeCompanyNameEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.ExchangeCompanyNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereExchangeCompanies = categoryList;
        }

        // handle asc and desc operation
        Func<ExchangeCompanies_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.ExchangeCompanyNameEn :
                               sortColumnIndex == 2 ? c.ExchangeCompanyNameAr.ToString() : "");

        if (sortDirection == "asc")
            filtereExchangeCompanies = filtereExchangeCompanies.OrderBy(orderingFunction);
        else
            filtereExchangeCompanies = filtereExchangeCompanies.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereExchangeCompanies.Select(c => new
        {
            ExchangeCompanyID = c.ExchangeCompanyID,
            ExchangeCompanyNameEn = c.ExchangeCompanyNameEn,
            ExchangeCompanyNameAr = c.ExchangeCompanyNameAr,
            Rate = c.Rate
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereExchangeCompanies.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveExchangeCompany(ExchangeCompany scParam)
    {
        object data = new { };

        ExchangeCompany item = new ExchangeCompany();
        item.ExchangeCompanyID = scParam.ExchangeCompanyID;
        item.ExchangeCompanyNameEn = scParam.ExchangeCompanyNameEn;
        item.ExchangeCompanyNameAr = scParam.ExchangeCompanyNameAr;
        item.Rate = scParam.Rate;

        bool status = new ExchangeCompaniesManager().SaveExchangeCompany(item);
        if ((item.ExchangeCompanyNameEn != null && item.ExchangeCompanyNameAr != null) || status)
        {
            //HttpContext.Current.Cache.Remove("ExchangeCompanies");
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