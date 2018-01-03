using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Services;
using System.Web.Script.Services;
using Minutesuae.AlIraq;
using Aliraqusedcars;

public partial class ShippingCompanies : FactshMasterPage
{

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetShipCompanies()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        var categoryList = new List<ShippingCompanies_SelectListResult>();
        IEnumerable<ShippingCompanies_SelectListResult> filtereShippingCompanies;
        categoryList = new ShippingCompaniesManager().GetShippingCompanies();

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereShippingCompanies = categoryList.Where(c => c.ShipCompanyNameAr.ToLower().Contains(param.sSearch.ToLower()) ||
                c.ShipCompanyNameEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.ShipCompanyID.ToString().Contains(param.sSearch.ToLower()) ||
                c.ShipMainCompanyNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereShippingCompanies = categoryList;
        }

        // handle asc and desc operation
        Func<ShippingCompanies_SelectListResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.ShipCompanyNameEn :
                               sortColumnIndex == 2 ? c.ShipCompanyNameAr : c.ShipCompanyID.ToString());

        if (sortDirection == "asc")
            filtereShippingCompanies = filtereShippingCompanies.OrderBy(orderingFunction);
        else
            filtereShippingCompanies = filtereShippingCompanies.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereShippingCompanies.Select(c => new
        {
            ShipCompanyID = c.ShipCompanyID,
            ShipCompanyNameAr = c.ShipCompanyNameAr,
            ShipCompanyNameEn = c.ShipCompanyNameEn,
            ShipMainCompanyID = c.ShipMainCompanyID,
            ShipMainCompanyNameAr = c.ShipMainCompanyNameAr
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereShippingCompanies.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveShipCompany(ShippingCompany scParam)
    {
        object data = new { };

        ShippingCompany item = new ShippingCompany();
        item.ShipCompanyID = scParam.ShipCompanyID;
        item.ShipCompanyNameAr = scParam.ShipCompanyNameAr;
        item.ShipCompanyNameEn = scParam.ShipCompanyNameEn;
        item.ShipMainCompanyID = scParam.ShipMainCompanyID;
        item.Active = true;

        bool status = new ShippingCompaniesManager().SaveItem(item);
        if ((!item.ShipCompanyNameAr.Trim().Equals("") && !item.ShipCompanyNameEn.Trim().Equals("")) || status)
        {
            //HttpContext.Current.Cache.Remove("ShippingCompanies");
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


    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            FillLists.FillMainCompanies(ShipMainCompanyID);
        }

    }

    #endregion


}