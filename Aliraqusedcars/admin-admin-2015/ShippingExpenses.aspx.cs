using System;
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
using Aliraqusedcars;

public partial class ShipperExpenses : FactshMasterPage
{
    #region Services

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetShippExpenses()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch}, {"SortColumn", sortColumnIndex.ToString()}, {"SortDirection", sortDirection}};

        // get all of data.
        var _ds = new Select().SelectLists("ShipperExpenses_SelectList", _params);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows.ToList()
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveShippExpense(ShipperExpense scParam)
    {
        object data = new { };

        if (scParam.ExpenseTypeID == 1 || scParam.DistinationID == null)
            scParam.DistinationID = 0;

        bool status = new ShipperExpensesManager().SaveItem(scParam);

        if (scParam.ExpenseTypeID > 0 && scParam.ShipCompanyID > 0 && status)
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
            DropDownList customs = new DropDownList();
            FillLists.FillExpensesList(ShipCompanyID, ExpenseTypeID, DistinationID, NavigationCo, customs, 1); // shipping types
        }
    }
    #endregion
}