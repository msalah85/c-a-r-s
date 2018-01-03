using System;
using System.Web.Services;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using Minutesuae.SystemUtilities;
using Minutesuae.AlIraq;
using System.Web.UI;
using Aliraqusedcars;

public partial class IraqInvoiceSale_AddNew : Page
{
    #region "Event Handler"
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // Fill page drop lists.
            FillLists.FillCarsSaleProperties(ddlClient, ddlDistination);

            //try
            //{
            if (Page.RouteData.Values["Id"] != null) // edit invoice
            {
                hfId.Value = Page.RouteData.Values["Id"].ToString();
                long Id = Convert.ToInt64(hfId.Value);
                ShowInvoiceDetails(Id);
            }
            else if (Request.QueryString["id"] != null) // new invoice 
            {
                hfCarID.Value = Request.QueryString["id"];
                int Id = Convert.ToInt32(hfCarID.Value);
                ShowSaleDetails(Id);
            }
            //} catch { }
        }
    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        if (txtSalePrice.Text != "" && txtTrxDate.Text != "")
        {
            SaveCarSale();
        }
        else
        {
            lblError.Text = Resources.AdminResources_ar.DataRequired;
            divError.CssClass = "alert alert-block";
        }
    }
    #endregion

    #region "Page Methods"

    private void ShowInvoiceDetails(long Id)
    {
        var result = new CarsSaleInvoiceManager().GetCarSaleInvoiceToEdit(Id);

        if (result != null)
        {
            txtTrxDate.Text = result.InvoiceDate.ToShortDateString();
            txtArriveDate.Text = result.ArrivalDate.Value.ToShortDateString();
            txtNotes.Text = result.Notes;
            //txtSalePrice.Text = result.SalePrice.ToString();
        }
    }

    private void ShowSaleDetails(long _Id)
    {
        var data = new CarsSaleInvoiceManager().GetCarToSale(_Id);

        if (data != null && data.Car != null)
        {
            var result = data.Car;
            PayTypeID.Value = string.Format("{0}", result.PayInvTypeID);
            lblCarColor.Text = string.Format("{0}", result.ColorNameAr);
            lblContainerNo.Text = string.Format("{0}", result.ContainerNo);
            ddlChassisNo.Text = result.ChassisNo;
            ddlLotNo.Text = result.LotNo;
            ddlDistination.SelectedValue = string.Format("{0}", result.DistinationID);
            ddlClient.SelectedValue = string.Format("{0}", result.ToSaleClientID); // default client to sale.
            lblPayPrice.Text = string.Format("{0:0}", result.PayPrice);
            txtArriveDate.Text = string.Format("{0:dd/MM/yyyy}", result.ArrivalDate);
            lblCarModel.Text = string.Format("{0} , {1} , {2}", result.MakerNameEn, result.TypeNameEn, result.Year);
            hfRegionJoCoast.Value = string.Format("{0}", result.RegionCommissionJor);
            ddlCarSize.SelectedValue = string.Format("{0}", result.CarSizeID);
            RegionEn.InnerText = result.RegionEn;
            Shipper.InnerText = result.ShipCompanyNameEn;
            ShippingCalcIDID.Value = string.Format("{0}", result.ShippingCalcID);

            if (result.SaleTypeID != null && (int)result.SaleTypeID > 0)
            {
                ddlSaleTypes.SelectedValue = string.Format("{0}", result.SaleTypeID);
                lblDemandAmount.Text = string.Format("{0}", result.SalePriceDemand == true ? "و مطلوب كامل المبلغ" : "");
            }
            else
            {
                lblError.Text = "برجاء تحديد طريقة البيع (نقداً -أو- آجل) من بيانات السيارة فى فاتورة الشراء.";
                divError.CssClass = "alert alert-block";
                //btnSave.CssClass = "btn btn-success btn-small btnSaveClient aspNetDisabled hidden";
            }

            if (result.ShippingCalcID == 1)
            { ShippingCalcID.Text = "كاملة"; }
            else { ShippingCalcID.Text = "سكراب"; }

            if (result.PayTypeID == 2) // نوع الشراء خاص
            {
                ddlSaleTypes.Items[1].Enabled = false; // طريقة البيع نقداً اجبارى 
                ddlSaleTypes.SelectedIndex = 0;
                lblPayType.InnerHtml = "بواســطه العميل";
            }
            else
            { lblPayType.InnerHtml = "شركة العراق"; }


            // get total default car costs
            // if not relist
            if (data.Costs != null && result.PayTypeID != 3)
            {
                hfCarDefaultCosts.Value = string.Format("{0:0}", data.Costs.TotalOnCar);
            }
        }
        else
        {
            lblError.Text = Resources.AdminResources_ar.DataNotFound;
            divError.Visible = true;
        }
    }

    private void SaveCarSale()
    {
        CarSaleInvoice _car = new CarSaleInvoice()
        {
            IsDeleted = false,
            Notes = txtNotes.Text,
            CarID = Convert.ToInt64(hfCarID.Value),
            InvoiceDate = (DateTime)DateConversion.FormalDate(txtTrxDate.Text),
            ClientID = Convert.ToInt32(ddlClient.SelectedValue),
            SaleTypeID = Convert.ToInt32(ddlSaleTypes.SelectedValue),
            UserID = Convert.ToInt32(SessionManager.Current.ID),

            // for all clients
            SalePrice = Convert.ToDecimal(txtSalePrice.Text) /* Sale editable price.*/,
            CarFinalPrice = Convert.ToDecimal(lblFullPrice.Text) /* Full calc price.*/,
            PayPrice = Convert.ToDecimal(lblPayPrice.Text),

            // for permanent client only
            CarSizeCost = Convert.ToDecimal(lblCarSizePrice.Text) /* Cost of size       */,
            ExtraCost = Convert.ToDecimal(lblCarPrice.Value) /* cost per 5000 over 10000 of payPrice.*/,
            PayCalcTypeCost = Convert.ToDecimal(lblPayTypePrice.Value) /* Commission.*/,

            IP = SessionManager.Current.IP,
            SaleInvoiceID = hfId.Value != String.Empty ? Convert.ToInt32(hfId.Value) : 0
        };

        if (!txtArriveDate.Text.Trim().Equals(""))
            _car.ArrivalDate = DateConversion.FormalDate(txtArriveDate.Text);

        if (ddlDistination.SelectedIndex > 0)
            _car.DistinationID = Convert.ToInt32(ddlDistination.SelectedValue);
        byte payTypeId = 0;
        if (!ddlSaleTypes.Items[1].Enabled)
            payTypeId = 2; // طريقة البيع خاص

        // start save data.
        var result = new CarsSaleInvoiceManager().SaveItem(_car, payTypeId);
        if (result > 0) { Response.Redirect("InvoiceSalePrint.aspx?id=" + result); }
        else
        {
            lblError.Text = Resources.AdminResources_ar.ErrorSave;
            divError.CssClass = "alert alert-block";
        }
    }

    [WebMethod]
    public static object SaveInv(string[] parm)
    {
        CarSaleInvoice _car = new CarSaleInvoice()
        {
            IsDeleted = false,
            CarID = Convert.ToInt64(parm[1]),
            SaleTypeID = Convert.ToInt32(parm[2]),
            InvoiceDate = (DateTime)DateConversion.FormalDate(parm[3]),
            ClientID = Convert.ToInt32(parm[4]),

            // for all clients
            SalePrice = Convert.ToDecimal(parm[6]), // Sale editable price.
            PayPrice = Convert.ToDecimal(parm[7]),
            CarFinalPrice = Convert.ToDecimal(parm[8]), // Full calc price.
            Notes = parm[10],

            IP = SessionManager.Current.IP,
            UserID = Convert.ToInt32(SessionManager.Current.ID),
            SaleInvoiceID = parm[0] != String.Empty ? Convert.ToInt32(parm[0]) : 0
        };

        if (!parm[5].Trim().Equals(""))
            _car.DistinationID = Convert.ToInt32(parm[5]);

        if (!parm[9].Trim().Equals(""))
            _car.ArrivalDate = DateConversion.FormalDate(parm[9]);


        if (parm[11] == "1") // user_type ===> permanent
        {
            // for permanent client only
            _car.CarSizeCost = Convert.ToDecimal(parm[12]); // Cost of size       */,
            _car.ExtraCost = Convert.ToDecimal(parm[13]); // cost per 5000 over 10000 of payPrice.*/,
            _car.PayCalcTypeCost = Convert.ToDecimal(parm[14]); // Commission.*/,
        }

        byte payTypeId = 1; // 'طريقة البيع ==> العراق
        if (parm[15] == "2")
            payTypeId = 2; // طريقة البيع خاص

        // Car discount
        if (!string.IsNullOrEmpty(parm[16]) && parm[16].IsNumeric())
        {
            _car.CarDiscount = Convert.ToDecimal(parm[16]);
        }

        // car manual extra value
        if (!string.IsNullOrEmpty(parm[17]) && parm[17].IsNumeric())
        {
            _car.CarMoreCost = Convert.ToDecimal(parm[17]);
        }

        // start save data.
        object data;
        if (_car.SalePrice > 0)
        {
            var result = new CarsSaleInvoiceManager().SaveItem(_car, payTypeId);

            if (result > 0)
            {
                data = new { Status = true, ID = result, Message = Resources.AdminResources_ar.SuccessSave };
            }
            else
            {
                data = new { Status = false, ID = 0, Message = Resources.AdminResources_ar.ErrorSave };
            }
        }
        else
        {
            data = new { Status = false, Message = "يرجي ادخال سعر البيع للسيارةأولاً." };
        }
        return data;
    }
    #endregion
}