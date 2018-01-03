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

public partial class MinutesuaeCommissions : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveCommission(CarSaleCommission scParam)
    {
        object data = new { };

        CarSaleCommission item = new CarSaleCommission();
        item.CommissionID = scParam.CommissionID;
        item.DistinationID = scParam.DistinationID;
        item.CommissionCash = scParam.CommissionCash;
        item.CommissionCredit = scParam.CommissionCredit;

        bool status = new CarSaleCommissionsManager().SaveItem(item);
        if ((item.DistinationID > 0) || status)
        {
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
            FillLists.FillExpensesList(DistinationID);
        }
    }

    #endregion

}