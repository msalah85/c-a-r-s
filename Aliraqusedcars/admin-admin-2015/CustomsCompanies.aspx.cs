using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using System.Data;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Services;
using System.Web.Script.Services;
using Minutesuae.AlIraq;
using Aliraqusedcars;

public partial class CustomsCompanies : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetCustomsCompanies()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        List<CustomsCompanies_SelectListResult> categoryList = new List<CustomsCompanies_SelectListResult>();
        IEnumerable<CustomsCompanies_SelectListResult> filtereCustomspingCompanies;
        categoryList = new CustomsCompaniesManager().GetCustomsCompanies();

        // check for search param
        if (!String.IsNullOrEmpty(param.sSearch))
        {
            filtereCustomspingCompanies = categoryList.Where(c => c.CustomsCompanyNameAr.ToLower().Contains(param.sSearch.ToLower()) ||
                c.CustomsCompanyNameEn.ToLower().Contains(param.sSearch.ToLower()) ||
                c.CustomsCompanyID.ToString().Contains(param.sSearch.ToLower()) ||
                c.DistinationNameAr.ToLower().Contains(param.sSearch.ToLower()));
        }
        else
        {
            filtereCustomspingCompanies = categoryList;
        }

        // handle asc and desc operation
        Func<CustomsCompanies_SelectListResult, string> orderingFunction = (c => sortColumnIndex == 1 ? c.CustomsCompanyNameEn :
                               sortColumnIndex == 2 ? c.CustomsCompanyNameAr : c.CustomsCompanyID.ToString());

        if (sortDirection == "asc")
            filtereCustomspingCompanies = filtereCustomspingCompanies.OrderBy(orderingFunction);
        else
            filtereCustomspingCompanies = filtereCustomspingCompanies.OrderByDescending(orderingFunction);

        //paginate our result
        var result = filtereCustomspingCompanies.Select(c => new
        {
            CustomsCompanyID = c.CustomsCompanyID,
            CustomsCompanyNameAr = c.CustomsCompanyNameAr,
            CustomsCompanyNameEn = c.CustomsCompanyNameEn,
            DistinationID = c.DistinationID,
            DistinationNameAr = c.DistinationNameAr
        }).Skip(param.iDisplayStart).Take(param.iDisplayLength);
        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = categoryList.Count(),
            iTotalDisplayRecords = filtereCustomspingCompanies.Count(),
            aaData = result
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveCustomsCompany(CustomsCompany scParam)
    {
        object data = new { };

        CustomsCompany item = new CustomsCompany();
        item.CustomsCompanyID = scParam.CustomsCompanyID;
        item.CustomsCompanyNameAr = scParam.CustomsCompanyNameAr;
        item.CustomsCompanyNameEn = scParam.CustomsCompanyNameEn;
        item.DistinationID = scParam.DistinationID;
        item.Active = true;

        bool status = new CustomsCompaniesManager().SaveItem(item);
        if ((!item.CustomsCompanyNameAr.Trim().Equals("") && !item.CustomsCompanyNameEn.Trim().Equals("")) || status)
        {
            //HttpContext.Current.Cache.Remove("CustomspingCompanies");
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
            DropDownList nulList = new DropDownList() { ID = "notNeed" }; // not need only to implement function            
            FillLists.FillShipProperties(DistinationID, nulList, nulList);
        }
    }

    #endregion


}