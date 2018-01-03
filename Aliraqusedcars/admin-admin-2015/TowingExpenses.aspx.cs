using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Minutesuae.SystemUtilities;
using System.Collections;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Caching;
using System.Web.Services;
using System.Web.Script.Services;
using Minutesuae.AlIraq;

public partial class TowingExpenses : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveTowingExpense(TowingExpense scParam)
    {
        object data = new { };

        TowingExpense item = new TowingExpense();
        item.TowingExpenseID = scParam.TowingExpenseID;
        item.RegionID = scParam.RegionID;
        item.ServiceTypeID = scParam.ServiceTypeID;
        item.ShipCompanyID = scParam.ShipCompanyID;
        item.ExpensesCharge = scParam.ExpensesCharge;

        bool status = new TowingExpensesManager().SaveItem(item);
        if ((item.ServiceTypeID > 0 && item.ShipCompanyID > 0) || status)
        {
            //HttpContext.Current.Cache.Remove("TowingExpenses");
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
            DropDownList temp = new DropDownList();
            FillLists.FillTowingPropertiesList(ShipCompanyID, temp, RegionID);
        }
    }
    #endregion

}