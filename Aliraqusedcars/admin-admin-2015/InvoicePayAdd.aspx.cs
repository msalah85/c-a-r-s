using System;
using System.Collections.Generic;
using System.Web.Services;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using Minutesuae.AlIraq;
using Aliraqcars.Domain.Concrete;
using Aliraqusedcars;

public partial class TransactionAddEdit : FactshMasterPage
{
    #region "Event Handler"
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // Fill page drop lists.
            FillLists.FillCarsProperties(ddlDocTypes, ddlCarStatus, ddlMaker, ddlColor, ddlModel, ddlRegion, ddlSupplier, ddlYear, ddlDistination, ddlTransmission, AccidentStatusID, ToSaleClientID);

            if (Page.RouteData.Values["Id"] != null)
            {
                hfId.Value = string.Format("{0}", Page.RouteData.Values["Id"]);
                var Id = Convert.ToInt64(hfId.Value);
                ShowPayDetails(Id);
            }
        }
    }
    protected void ddlRegion_OnSelectedIndexChanged(object sender, EventArgs e)
    {
        if (ddlRegion.SelectedIndex > 0 && ddlDistination.SelectedIndex > 0)
        {
            int region_Id = Convert.ToInt32(ddlRegion.SelectedValue),
                dist_Id = Convert.ToInt32(ddlDistination.SelectedValue);

            FillLists.FillShippingCoByRegion(ddlShipper, region_Id, dist_Id);
        }
        else
            ddlShipper.Items.Clear();
    }
    #endregion

    #region "Page Methods"
    public string buyerSelectID = "0";
    void ShowPayDetails(long _Id)
    {
        var result = new CarsDataManager().GetCarsData(_Id);

        if (result != null)
        {
            addPayPrice.Visible = true;
            ddlInvoiceType.SelectedValue = string.Format("{0}", result.PayInvTypeID);
            txtChassisNo.Text = result.ChassisNo;
            txtLotNo.Text = result.LotNo;
            txtNotes.Text = result.Notes;
            txtPayPrice.Text = string.Format("{0:00.00}", result.PayPrice);
            txtTrxDate.Text = string.Format("{0:dd/MM/yyyy}", result.InvoiceDate);
            txtTrxDate.CssClass = "required date-picker span6";
            ddlSupplier.SelectedValue = string.Format("{0}", result.AuctionID);
            //ddlBuyer.SelectedValue 
            if (result.ClientBuyerID != null)
                buyerSelectID = string.Format("{0}|{1} - {2}", result.ClientBuyerID, result.BuyerName, result.full_name);
            ddlCarStatus.SelectedValue = string.Format("{0}", result.WorkingStatusID);
            ddlModel.SelectedValue = string.Format("{0}", result.ModelID);
            ddlColor.SelectedValue = string.Format("{0}", result.ColorID);
            ddlDocTypes.SelectedValue = string.Format("{0}", result.PayTypeID);
            ddlModel.SelectedValue = string.Format("{0}", result.ModelID);
            ddlMaker.SelectedValue = string.Format("{0}", result.MakerID);
            ddlYear.SelectedValue = string.Format("{0}", result.Year);
            ddlDistination.SelectedValue = string.Format("{0}", result.DistinationID);
            ddlOwnerID.SelectedValue = string.Format("{0}", result.OwnerID);
            ddlTransmission.SelectedValue = string.Format("{0}", result.TransmissionID);
            txtWebsitePrice.Text = string.Format("{0:00.00}", result.WesitePrice);
            rblHowToCalcShipping.SelectedValue = string.Format("{0}", result.ShippingCalcID);
            SaleTypeID.SelectedValue = string.Format("{0}", result.SaleTypeID);
            //view_arrive.SelectedValue = string.Format("{0}", result.Arrived);
            view_offer.SelectedValue = string.Format("{0}", result.view_offer);
            view_website.SelectedValue = string.Format("{0}", result.view_website);
            WithoutShipping.Checked = (result.WithoutShipping != null ? (bool)result.WithoutShipping : false);
            IsGulfOldCars.Checked = (result.IsGulfOldCars != null ? (bool)result.IsGulfOldCars : false);
            SalePriceDemand.Checked = (result.SalePriceDemand != null ? (bool)result.SalePriceDemand : false);
            ddlRegion.SelectedValue = string.Format("{0}", result.RegionID);
            ddlRegion_OnSelectedIndexChanged(ddlRegion, new EventArgs());
            ToSaleClientID.SelectedValue = string.Format("{0}", result.ToSaleClientID);
            if (ddlShipper.Items.Count > 0)
                ddlShipper.SelectedValue = string.Format("{0}", result.ShipperID);

            // enable controls
            bool isCarPaid = (result.PayInvoicePaymentsID != null // paid by IRAQ
                || (result.Sold == true && result.PayTypeID == 2)); // Paid by client and Sold

            if (isCarPaid)// true = disable theses controls.
            {
                txtPayPrice.Enabled = ddlSupplier.Enabled = ddlBuyer.Enabled = txtChassisNo.Enabled = false;
                IsGulfOldCars.Attributes.Add("disabled", "disabled");
            }

            bool isCarShippingPaid = (result.IsShippingCarPaid != null); // true = disable theses controls.
            if (isCarShippingPaid)
                ddlRegion.Enabled = ddlDistination.Enabled = ddlShipper.Enabled = false;

            if (result.WorkingStatusID == 3)
            {
                divAccidentStatusID.Attributes.Add("class", "control-group");
                if (!string.IsNullOrEmpty(result.AccidentStatusID))
                {
                    if (result.AccidentStatusID.Contains(","))
                    {
                        var lt = result.AccidentStatusID.Split(',');
                        foreach (string item in lt)
                        {
                            AccidentStatusID.Items.FindByValue(item).Selected = true;
                        }
                    }
                    else
                    {
                        AccidentStatusID.Items.FindByValue(result.AccidentStatusID).Selected = true;
                    }
                }
            }

            // disable editing client
            ToSaleClientID.Enabled = !((bool)result.Sold);


            // prevent editing shipper, destination, without shipping, buy type, region.
            if (!string.IsNullOrEmpty(result.ShippInvoiceNo))
            {
                WithoutShipping.Attributes.Add("disabled", "disabled");
                rblHowToCalcShipping.Enabled = ddlRegion.Enabled = ddlDistination.Enabled = ddlShipper.Enabled = ddlInvoiceType.Enabled = false;
            }
        }
    }

    #endregion

    #region "Web Services"
    [WebMethod]
    public static List<Buyers_SelectName2Result> GetBuyersByAuction(int auction)
    {
        return new BuyersManager().GetBuyersNames2(auction);
    }

    [WebMethod]
    public static List<IShippingCompaniesNames> GetShippers(int region, int dist)
    {
        return new ShippingCompaniesManager().GetShippingCompByRegionId(region, dist);
    }

    [WebMethod]
    public static List<CarsModel_SelectRowResult> GetModels(string modelId)
    {
        return new ModelsManager().GetCarModels(" AND MakerID = " + modelId);
    }

    [WebMethod]
    public static object SaveInvoice(CarsData _car)
    {
        _car.IP = SessionManager.Current.IP;
        _car.UserID = Convert.ToInt32(SessionManager.Current.ID);

        var result = new CarsDataManager().SaveItem(_car);


        if (result > 0)
            return new { Status = true, ID = result, Message = Resources.AdminResources_ar.SuccessSave };

        if (result < 0)
            return new { Status = false, ID = -1, Message = Resources.AdminResources_ar.CarExistBefore };

        return new { Status = false, ID = 0, Message = Resources.AdminResources_ar.ErrorSave };
    }
    #endregion
}