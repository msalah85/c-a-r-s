using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Services;
using System.Web.Caching;
using Aliraqusedcars;

public partial class ETA_Auctions : FactshMasterPage
{
    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetAuctions()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<Auctions_SelectListResult> categoryList = new List<Auctions_SelectListResult>();
        IEnumerable<Auctions_SelectListResult> filtereAuctions;
        if (HttpContext.Current.Cache["Auctions"] == null)
        {
            categoryList = new AuctionsManager().GetAuctions();
            HttpContext.Current.Cache.Insert("Auctions", categoryList, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(10));
        }
        else
        {
            categoryList = HttpContext.Current.Cache["Auctions"] as List<Auctions_SelectListResult>;
        }

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereAuctions = categoryList.Where(c => c.AuctionName.ToLower().Contains(param.sSearch.ToLower()) ||
                c.AuctionNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereAuctions = categoryList;
        }

        // handle asc and desc operation
        Func<Auctions_SelectListResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.AuctionName :
                               sortColumnIndex == 2 ? c.AuctionNameAr.ToString() : "");

        if (sortDirection == "asc")
            filtereAuctions = filtereAuctions.OrderBy(orderingFunction);
        else
            filtereAuctions = filtereAuctions.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereAuctions.Select(c => new
        {
            AuctionID = c.AuctionID,
            AuctionName = c.AuctionName,
            AuctionNameAr = c.AuctionNameAr
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
    public static object SaveAuction(Auction scParam)
    {
        object data = new { };

        Auction item = new Auction();
        item.AuctionID = scParam.AuctionID;
        //item.AuctionTypeID = scParam.AuctionTypeID;
        item.AuctionName = scParam.AuctionName;
        item.AuctionNameAr = scParam.AuctionNameAr;

        bool status = new AuctionsManager().SaveAuction(item);
        if ((item.AuctionTypeID > 0 && item.AuctionName != null) || status)
        {
            HttpContext.Current.Cache.Remove("Auctions");
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
    
    /// <summary>
    /// Action that updates data
    /// </summary>
    /// <param name="id">Id of the record</param>
    /// <param name="value">Value that shoudl be set</param>
    /// <param name="rowId">Id of the row</param>
    /// <param name="columnPosition">Position of the column(hidden columns are not counted)</param>
    /// <param name="columnId">Position of the column(hidden columns are counted)</param>
    /// <param name="columnName">Name of the column</param>
    /// <returns>value if update suceed - any other value will be considered as an error message on the client-side</returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static string UpdateData()
    {
        HttpContext Context = HttpContext.Current;
        int id = String.IsNullOrEmpty(Context.Request["id"]) ? 0 : Convert.ToInt32(Context.Request["id"]);
        string value = String.IsNullOrEmpty(Context.Request["value"]) ? "" : Context.Request["value"];
        int? rowId = String.IsNullOrEmpty(Context.Request["rowId"]) ? null : (int?)Convert.ToInt32(Context.Request["rowId"]);
        int? columnPosition = String.IsNullOrEmpty(Context.Request["columnPosition"]) ? null : (int?)Convert.ToInt32(Context.Request["columnPosition"]);
        int? columnId = String.IsNullOrEmpty(Context.Request["columnId"]) ? null : (int?)Convert.ToInt32(Context.Request["columnId"]);
        string columnName = String.IsNullOrEmpty(Context.Request["columnName"]) ? "" : Context.Request["columnName"];

        ////

        var auction = new AuctionsManager().GetAuctions();

        if (columnPosition == 0 && auction.Any(c => c.AuctionName.ToLower().Equals(value.ToLower())))
            return "Auction with a name '" + value + "' already exists.";
        var company = auction.FirstOrDefault(c => c.AuctionID == id);
        if (company == null)
        {
            return "Auction with an id = " + id + " does not exists.";
        }

        switch (columnPosition)
        {
            case 1:
                company.AuctionName = value;
                break;
            case 2:
                company.AuctionNameAr = value;
                break;
            default:
                break;
        }
        return value;
    }


    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            FillDropList();
        }
    }

    private void FillDropList()
    {
        //FillLists.FillAuctionsTypes(ddlAuctionType);
    }

    #endregion
}