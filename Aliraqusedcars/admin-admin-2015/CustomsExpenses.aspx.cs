using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Services;
using System.Web.Script.Services;
using Minutesuae.AlIraq;
using IraqCars.Business.DataUtility;
using IraqCars.Business.Business;
using System.Web.UI.WebControls;
using System.Web.UI;

public partial class CustomsExpenses : Page
{
    #region Services

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveShippExpense(ShipperExpense scParam)
    {

        bool status = new ShipperExpensesManager().SaveItem(scParam);
        object data = new { };


        if (status)
            data = new { Status = true, Message = Resources.AdminResources_ar.SuccessSave };
        else
            data = new { Status = false, Message = Resources.AdminResources_ar.ErrorSave };

        return data;
    }

    #endregion

    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            DropDownList shipper = new DropDownList();
            FillLists.FillExpensesList(shipper, ExpenseTypeID, DistinationID, NavigationCo, CustomsCompanyID, 2); // shipping types
        }

    }

    #endregion
}