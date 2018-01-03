using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class ShippingMainCompanies : FactshMasterPage
{
    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetShippingMainCompanies()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<ShippingMainCompanies_SelectRowResult> categoryList = new List<ShippingMainCompanies_SelectRowResult>();
        IEnumerable<ShippingMainCompanies_SelectRowResult> filtereShippingMainCompanies;
        categoryList = new ShippingMainCompaniesManager().GetShippingMainCompanies("");

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereShippingMainCompanies = categoryList.Where(c => c.ShipMainCompanyNameEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.ShipMainCompanyNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereShippingMainCompanies = categoryList;
        }

        // handle asc and desc operation
        Func<ShippingMainCompanies_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.ShipMainCompanyNameEn :
                               sortColumnIndex == 2 ? c.ShipMainCompanyNameAr.ToString() : "");

        if (sortDirection == "asc")
            filtereShippingMainCompanies = filtereShippingMainCompanies.OrderBy(orderingFunction);
        else
            filtereShippingMainCompanies = filtereShippingMainCompanies.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereShippingMainCompanies.Select(c => new
        {
            ShipMainCompanyID = c.ShipMainCompanyID,
            ShipMainCompanyNameEn = c.ShipMainCompanyNameEn,
            ShipMainCompanyNameAr = c.ShipMainCompanyNameAr
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereShippingMainCompanies.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveShippingMainCompany(ShippingMainCompany scParam)
    {
        object data = new { };

        ShippingMainCompany item = new ShippingMainCompany();
        item.ShipMainCompanyID = scParam.ShipMainCompanyID;
        item.ShipMainCompanyNameEn = scParam.ShipMainCompanyNameEn;
        item.ShipMainCompanyNameAr = scParam.ShipMainCompanyNameAr;

        bool status = new ShippingMainCompaniesManager().SaveShippingMainCompany(item);
        if ((item.ShipMainCompanyNameEn != null && item.ShipMainCompanyNameAr != null) || status)
        {
            //HttpContext.Current.Cache.Remove("ShippingMainCompanies");
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