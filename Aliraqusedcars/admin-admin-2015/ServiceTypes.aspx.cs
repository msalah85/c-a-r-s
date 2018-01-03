using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Caching;
using Aliraqusedcars;

public partial class ETA_ServiceTypes : FactshMasterPage
{
    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetServiceTypes()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<ServiceTypes_SelectRowResult> categoryList = new List<ServiceTypes_SelectRowResult>();
        IEnumerable<ServiceTypes_SelectRowResult> filtereServiceTypes;
        if (HttpContext.Current.Cache["ServiceTypes"] == null)
        {
            categoryList = new ServiceTypesManager().GetServiceTypes("");
            HttpContext.Current.Cache.Insert("ServiceTypes", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));
        }
        else
        {
            categoryList = HttpContext.Current.Cache["ServiceTypes"] as List<ServiceTypes_SelectRowResult>;
        }

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereServiceTypes = categoryList.Where(c => c.ServiceTypeNameEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.ServiceTypeNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereServiceTypes = categoryList;
        }

        // handle asc and desc operation
        Func<ServiceTypes_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.ServiceTypeNameEn :
                               sortColumnIndex == 2 ? c.ServiceTypeNameAr.ToString() : "");

        if (sortDirection == "asc")
            filtereServiceTypes = filtereServiceTypes.OrderBy(orderingFunction);
        else
            filtereServiceTypes = filtereServiceTypes.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereServiceTypes.Select(c => new
        {
            ServiceTypeID = c.ServiceTypeID,
            ServiceTypeNameEn = c.ServiceTypeNameEn,
            ServiceTypeNameAr = c.ServiceTypeNameAr
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereServiceTypes.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveServiceType(ServiceType scParam)
    {
        object data = new { };

        ServiceType item = new ServiceType();
        item.ServiceTypeID = scParam.ServiceTypeID;
        item.ServiceTypeNameEn = scParam.ServiceTypeNameEn;
        item.ServiceTypeNameAr = scParam.ServiceTypeNameAr;

        bool status = new ServiceTypesManager().SaveServiceType(item);
        if ((item.ServiceTypeNameEn != null && item.ServiceTypeNameAr != null) || status)
        {
            HttpContext.Current.Cache.Remove("ServiceTypes");
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