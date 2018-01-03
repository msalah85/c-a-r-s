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

public partial class ETA_CarsMakers : FactshMasterPage
{
    #region "Page Methods"
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
            HttpContext.Current.Cache.Remove("Makers");
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetMakers()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<CarsMaker_SelectRowResult> categoryList = new List<CarsMaker_SelectRowResult>();
        IEnumerable<CarsMaker_SelectRowResult> filtereMakers;
        if (HttpContext.Current.Cache["Makers"] == null)
        {
            categoryList = new MakersManager().GetCarMakers("");
            HttpContext.Current.Cache.Insert("Makers", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));
        }
        else
        {
            categoryList = HttpContext.Current.Cache["Makers"] as List<CarsMaker_SelectRowResult>;
        }

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereMakers = categoryList.Where(c => c.MakerNameEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.MakerNameAr.ToLower().Contains(param.sSearch.ToLower()) ||
                c.MakerID.ToString().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereMakers = categoryList;
        }

        // handle asc and desc operation
        Func<CarsMaker_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.MakerNameEn :
                               sortColumnIndex == 2 ? c.MakerNameAr : c.MakerID.ToString());

        if (sortDirection == "asc")
            filtereMakers = filtereMakers.OrderBy(orderingFunction);
        else
            filtereMakers = filtereMakers.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereMakers.Select(c => new
        {
            MakerID = c.MakerID,
            MakerNameEn = c.MakerNameEn,
            MakerNameAr = c.MakerNameAr
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereMakers.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveMaker(CarsMaker scParam)
    {
        object data = new { };

        CarsMaker item = new CarsMaker();
        item.MakerID = scParam.MakerID;
        item.MakerNameEn = scParam.MakerNameEn;
        item.MakerNameAr = scParam.MakerNameAr;
        item.Priority = 0;
        item.Active = true;

        bool status = new MakersManager().SaveCarMaker(item);
        if ((item.MakerID > 0 && item.MakerNameEn != null) || status)
        {
            HttpContext.Current.Cache.Remove("Makers");
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