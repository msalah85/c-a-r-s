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

public partial class ETA_Regions : FactshMasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            HttpContext.Current.Cache.Remove("Regions");
    }

    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetRegions()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<Regions_SelectRowResult> categoryList = new List<Regions_SelectRowResult>();
        IEnumerable<Regions_SelectRowResult> filtereRegions;
        if (HttpContext.Current.Cache["Regions"] == null)
        {
            categoryList = new RegionsManager().GetRegions("");
            HttpContext.Current.Cache.Insert("Regions", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));
        }
        else
        {
            categoryList = HttpContext.Current.Cache["Regions"] as List<Regions_SelectRowResult>;
        }

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereRegions = categoryList.Where(c => c.RegionEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.RegionAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereRegions = categoryList;
        }

        // handle asc and desc operation
        Func<Regions_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.RegionEn :
                               sortColumnIndex == 2 ? c.RegionAr.ToString() : "");

        if (sortDirection == "asc")
            filtereRegions = filtereRegions.OrderBy(orderingFunction);
        else
            filtereRegions = filtereRegions.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereRegions.Select(c => new
        {
            RegionID = c.RegionID,
            RegionEn = c.RegionEn,
            RegionAr = c.RegionAr,
            RegionCommissionJor = c.RegionCommissionJor
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereRegions.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveRegion(Region scParam)
    {
        object data = new { };

        Region item = new Region();
        item.RegionID = scParam.RegionID;
        item.RegionEn = scParam.RegionEn;
        item.RegionAr = scParam.RegionAr;
        item.RegionCommissionJor = scParam.RegionCommissionJor;

        bool status = new RegionsManager().SaveRegion(item);
        if ((item.RegionEn != null && item.RegionAr != null) || status)
        {
            HttpContext.Current.Cache.Remove("Regions");
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