using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Caching;
using System.Web.Services;
using System.Web.Script.Services;
using Aliraqusedcars;

public partial class AuctionsTypes : FactshMasterPage
{
    #region "Page Methods"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetAuctionsType()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<AuctionsTypes_SelectRowResult> categoryList = new List<AuctionsTypes_SelectRowResult>();
        IEnumerable<AuctionsTypes_SelectRowResult> filtereAuctions;
        if (HttpContext.Current.Cache["AuctionsType"] == null)
        {
            categoryList = new AuctionTypeManager().GetAuctionTypes("");
            HttpContext.Current.Cache.Insert("AuctionsType", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));
        }
        else
        {
            categoryList = HttpContext.Current.Cache["AuctionsType"] as List<AuctionsTypes_SelectRowResult>;
        }

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereAuctions = categoryList.Where(c => c.AuctionTypeName.ToLower().Contains(param.sSearch.ToLower()) ||
                c.AuctionCharge.ToString().ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereAuctions = categoryList;
        }

        // handle asc and desc operation
        Func<AuctionsTypes_SelectRowResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.AuctionTypeName :
                               sortColumnIndex == 2 ? c.AuctionCharge.ToString() : "");

        if (sortDirection == "asc")
            filtereAuctions = filtereAuctions.OrderBy(orderingFunction);
        else
            filtereAuctions = filtereAuctions.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereAuctions.Select(c => new
        {
            AuctionTypeID = c.AuctionTypeID,
            AuctionTypeName = c.AuctionTypeName,
            AuctionCharge = c.AuctionCharge
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
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
    public static object SaveAuctionType(AuctionsType scParam)
    {
        object data = new { };

        AuctionsType item = new AuctionsType();
        item.AuctionTypeID = scParam.AuctionTypeID;
        item.AuctionTypeName = scParam.AuctionTypeName;
        item.AuctionCharge = scParam.AuctionCharge;
        item.Active = true;

        bool status = new AuctionTypeManager().SaveAuctionType(item);
        if ((item.AuctionTypeID > 0 && item.AuctionTypeName != null) || status)
        {
            HttpContext.Current.Cache.Remove("AuctionsType");
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