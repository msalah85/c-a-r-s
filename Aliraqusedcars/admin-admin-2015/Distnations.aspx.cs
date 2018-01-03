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

public partial class AdminDistinations : FactshMasterPage
{
    #region "Event Handler"
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            HttpContext.Current.Cache.Remove("Distinations");
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetDistinations()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<Distinations_SelectRowResult> categoryList = new List<Distinations_SelectRowResult>();
        IEnumerable<Distinations_SelectRowResult> filtereDistinations;
        if (HttpContext.Current.Cache["Distinations"] == null)
        {
            categoryList = new DistnationsManager().GetDistinations("");
            HttpContext.Current.Cache.Insert("Distinations", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));
        }
        else
        {
            categoryList = HttpContext.Current.Cache["Distinations"] as List<Distinations_SelectRowResult>;
        }

        categoryList = new DistnationsManager().GetDistinations("");
        HttpContext.Current.Cache.Insert("Distinations", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereDistinations = categoryList.Where(c => c.DistinationNameEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.DistinationNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereDistinations = categoryList;
        }

        // handle asc and desc operation
        Func<Distinations_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.DistinationNameEn :
                               sortColumnIndex == 2 ? c.DistinationNameAr : c.DistinationID.ToString());

        if (sortDirection == "asc")
            filtereDistinations = filtereDistinations.OrderBy(orderingFunction);
        else
            filtereDistinations = filtereDistinations.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereDistinations.Select(c => new
        {
            DistinationID = c.DistinationID,
            DistinationNameEn = c.DistinationNameEn,
            DistinationNameAr = c.DistinationNameAr
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereDistinations.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveDistination(Distination scParam)
    {
        object data = new { };

        Distination item = new Distination();
        item.DistinationID = scParam.DistinationID;
        item.DistinationNameEn = scParam.DistinationNameEn;
        item.DistinationNameAr = scParam.DistinationNameAr;

        bool status = new DistnationsManager().SaveDistination(item);
        if ((item.DistinationNameEn != null && item.DistinationNameAr != null) || status)
        {
            HttpContext.Current.Cache.Remove("Distinations");
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