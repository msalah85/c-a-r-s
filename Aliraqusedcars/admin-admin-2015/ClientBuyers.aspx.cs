using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Services;
using System.Web.Script.Services;
using Minutesuae.AlIraq;
using Aliraqusedcars;

public partial class ClientBuyers : FactshMasterPage
{
    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            FillDropList();
        }
    }

    #endregion

    #region "Page Methods"

    private void FillDropList()
    {
        FillLists.fillClientBuyersProperties(ddlBuyerID, ddlClientID);

        if (Request.QueryString["client"] != null)
            ddlClientID.SelectedValue = Request.QueryString["client"];
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetBuyers()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc
        var clientID = String.IsNullOrEmpty(Context.Request["clientID"]) ? 0 : Convert.ToInt32(Context.Request["clientID"]);

        List<ClientBuyers_SelectListResult> categoryList = new List<ClientBuyers_SelectListResult>();
        IEnumerable<ClientBuyers_SelectListResult> filtereBuyers;

        categoryList = new ClientBuyersManager().GetClientBuyers(clientID);

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereBuyers = categoryList.Where(c => c.BuyerName.ToLower().Contains(param.sSearch.ToLower()) ||
                c.AuctionName.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereBuyers = categoryList;
        }

        // handle asc and desc operation
        Func<ClientBuyers_SelectListResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.BuyerName :
                               sortColumnIndex == 2 ? c.AuctionName.ToString() : "");

        if (sortDirection == "asc")
            filtereBuyers = filtereBuyers.OrderBy(orderingFunction);
        else
            filtereBuyers = filtereBuyers.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereBuyers.Select(c => new
        {
            ClientBuyerID = c.ClientBuyerID,
            BuyerID = c.BuyerID,
            Active = c.Active,
            ClientID = c.ClientID,
            BuyerName = c.BuyerName,
            AuctionName = c.AuctionName,
            full_name = c.full_name,
            EndDate = string.Format("{0: MM/d/yyyy}", c.EndDate),
            StartDate = string.Format("{0: MM/d/yyyy}", c.StartDate)
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereBuyers.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveClientBuyer(ClientBuyer scParam)
    {
        object data = new { };

        ClientBuyer item = new ClientBuyer();
        item.ClientBuyerID = scParam.ClientBuyerID;
        item.Active = scParam.Active;
        item.EndDate = scParam.EndDate;

        bool status = new ClientBuyersManager().SaveItem(item);
        if ((item.ClientID > 0 && item.BuyerID > 0) || status)
        {
            //HttpContext.Current.Cache.Remove("ClientBuyers");
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