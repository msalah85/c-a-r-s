using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.Services;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using Minutesuae.AlIraq;
using Aliraqcars.Domain.Concrete;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using System.Data;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class ShippingInvoiceAddEdit : FactshMasterPage
{
    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // Fill page drop lists.
            FillLists.FillShipProperties(ddlDistination, NavigationCoID, ddlShipper);
        }
    }

    #endregion

    #region "WebMethods"

    void ResetInvoiceChilds()
    {   // reset child grid
        new Select().SelectLists("ShippInvoicesDetails_Reset");
    }

    private void ShowInvoiceDetails(string id)
    {
        string[,] prm = { { "ShippInvoiceID", id } };
        var ds = new Select().SelectLists("ShippInvoices_SelectRow", prm);
        if (ds != null && ds.Tables[0] != null) // bind controls with data.
            BindData(ds.Tables[0]);
    }

    private void BindData(DataTable dt)
    {
        if (dt.Rows.Count > 0)
        {
            //txtTrxDate.Text = string.Format("{0:dd/MM/yyyy}", dt.Rows[0]["InvoiceDate"]);
            //ddlDistination.SelectedValue = string.Format("{0}", dt.Rows[0]["DistinationID"]);
            ddlShipper.SelectedValue = string.Format("{0}", dt.Rows[0]["ShipperID"]);
            txtArriveDate.Text = string.Format("{0:dd/MM/yyyy}", dt.Rows[0]["ArrivalDate"]);
            txtBillNo.Text = string.Format("{0}", dt.Rows[0]["InvoiceNo"]);
            txtBillDate.Text = string.Format("{0:dd/MM/yyyy}", dt.Rows[0]["InvoiceDate"]);
            txtContainerNo.Text = string.Format("{0}", dt.Rows[0]["ContainerNo"]);
            ddlContainerSize.SelectedValue = string.Format("{0}", dt.Rows[0]["ContainerSize"]);
            CarsNo.Text = string.Format("{0}", dt.Rows[0]["CarsNo"]);
            txtBol.Text = string.Format("{0}", dt.Rows[0]["Bol"]);
            txtLoadingCost.Text = string.Format("{0:0.00}", dt.Rows[0]["LoadingPrice"]);
            txtShippPrice.Text = string.Format("{0:0.00}", dt.Rows[0]["ShippPrice"]);
            lblInvoiceTotal.InnerText = string.Format("{0:0.00}", dt.Rows[0]["TotalAmount"]);
            NavigationCoID.SelectedValue = string.Format("{0}", dt.Rows[0]["NavigationCoID"]);

            var jsStr = string.Format("var _loadingVal={0}; var _shippingVal={1}", txtLoadingCost.Text, txtShippPrice.Text);
            ScriptManager.RegisterStartupScript(this, typeof(Page), "UpdateMsg", jsStr, true);
        }
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveInvoice(ShippInvoice scParam)
    {
        object data = new { };
        int AddedID = new ShippInvoiceManager().SaveItem(scParam);

        if (AddedID > 0)
        {
            data = new
            {
                Status = true,
                message = Resources.AdminResources_ar.SuccessSave,
                ID = AddedID
            };
        }
        else
            data = new { Status = false, Message = Resources.AdminResources_ar.ErrorSave, ID = 0 };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetShippInvoicesDetails()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        var _id = Context.Request["id"];
        var bol = Context.Request["bol"];
        var container = Context.Request["container"];

        string[,] parm = { { "ID", _id } };
        var ds = new Select().SelectLists("ShippInvoicesDetails_SelectItems", parm);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(ds.Tables[0]);

        // Our last 
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = ds.Tables[0].Rows.Count,
            iTotalDisplayRecords = ds.Tables[0].Rows.Count,
            aaData = rows
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveShippCar(ShippInvoicesDetail scParam)
    {
        object data = new { };

        var item = new ShippInvoicesDetail() { Partitioning = scParam.Partitioning, BillDetailsID = scParam.BillDetailsID, CarID = scParam.CarID, Extra = scParam.Extra, Towing = scParam.Towing, ShippInvoiceID = scParam.ShippInvoiceID, IsDeleted = false, Transportation = scParam.Transportation, Notes = scParam.Notes };

        bool status = new ShippInvoiceManager().SaveDetailsItem(item);
        if ((item.CarID > 0 && item.Towing != null) && status)
        {
            //HttpContext.Current.Cache.Remove("ShippInvoicesDetails");
            data = new
            {
                Status = true,
                message = Resources.AdminResources_ar.SuccessSave
            };
        }
        else
            data = new { Status = false, Message = Resources.AdminResources_ar.ErrorSave };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object DeleteShippCar(ShippInvoicesDetail scParam)
    {
        object data = new { };

        int status = new ShippInvoiceManager().DeleteItem(scParam.BillDetailsID);

        if (status > 0)
        {
            HttpContext.Current.Cache.Remove("ShippInvoicesDetails");

            data = new
            {
                Status = true,
                message = Resources.AdminResources_ar.SuccessDelete
            };
        }
        else
            data = new { Status = false, Message = Resources.AdminResources_ar.ErrorDelete };

        return data;
    }

    [WebMethod]
    public static List<IShippingCompaniesNames> GetShippingCo(int mainId)
    {
        var result = new ShippingCompaniesManager().GetShippingCompByDistinationId(mainId.ToString());
        return result;
    }

    [WebMethod]
    public static string GetShipperExpenses(int shipperID, int distinationID)
    {
        var result = new ShipperExpensesManager().GetShipperExpenses(distinationID, shipperID);
        //return result.Expenses;
        var serializer = new JavaScriptSerializer();
        string jsonString = serializer.Serialize(new { Expenses = result.Expenses, CarChassis = result.CarChassis, TowingCost = result.TowingCost });
        return jsonString;
    }

    [WebMethod]
    public static object GetCarShippingCalcType(long carID)
    {
        var result = new CarsDataManager().GetCarType(carID);
        object obj = new
        {
            ShippingCalcID = result.ShippingCalcID ?? 0,
            ExpensesCharge = result.ExpensesCharge
        };

        return obj;
    }

    #endregion
}