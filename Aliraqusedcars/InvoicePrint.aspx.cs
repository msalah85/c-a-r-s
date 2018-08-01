using Aliraqcars.Domain.Business;
using System;
using Aliraqusedcars;

public partial class InvoicePrint : System.Web.UI.Page
{
    #region "Event Handler"
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Request.QueryString["id"] != null) // new invoice 
            {
                try
                {
                    int Id = Convert.ToInt32(Request.QueryString["id"]);
                    ShowSaleDetails(Id);
                }
                catch { }
            }
        }
    }
    #endregion

    #region "Page Methods"
    private void ShowSaleDetails(long _Id)
    {
        var result = new CarsSaleInvoiceManager().GetCarSaleInvoiceToPrint(_Id);
        // for client or jordan permission
        if (result != null && (result.ClientID == Convert.ToInt32(SessionManager.Current.ID) || SessionManager.Current.PermID.Equals("5")))
        {
            divVatRegistrationNumber.InnerText = result.VatRegisterNo;
            VAT.InnerText = string.Format("{0:0,0}", result.VAT ?? 0);
            toDay.InnerHtml = string.Format("{0:dd/MM/yyyy}", result.InvoiceDate);
            CarID.InnerHtml = string.Format("<a>{0}</a>", result.CarID.ToString());
            divColor.InnerHtml = result.ColorNameEn;
            divChassis.InnerHtml = result.ChassisNo;
            divLotNo.InnerHtml = result.LotNo;
            clientAccount.InnerHtml = result.full_name;
            divNotes.InnerHtml = result.Notes;
            DivGear.InnerHtml = result.TransmissionNameEn;
            divYear.InnerHtml = string.Format("{0}", result.Year);
            divPrice.InnerHtml = string.Format("{0:0,0.00}", result.PayPrice);
            divInvoiceNo.InnerHtml = string.Format("{0}", result.SaleInvoiceID);
            divArriveDate.InnerHtml = string.Format("{0:dd/MM/yyyy}", result.ArrivalDate);
            divModel.InnerHtml = string.Format("{0} - {1}", result.MakerNameEn, result.TypeNameEn);
            if (result.WorkingStatusName.Equals("حــادث"))
                divStatus.InnerHtml = string.Format("{0} <span class='pull-left'>نوع الحادث: {1}</span>", result.WorkingStatusName, result.AccidentType);
            else
                divStatus.InnerHtml = string.Format("{0}", result.WorkingStatusName);

            if (result.IsDeleted)
                divCanceled.InnerText = "فــاتورة بــــيع ملــغاه";

            // view client signature
            if (!string.IsNullOrEmpty(result.ClientSignature))
            {
                string _sig = string.Format(@"{0}", result.ClientSignature.Replace("\n", @" ").Replace(System.Environment.NewLine, @" "));
                Label1.Text = "<script type='text/javascript'>renderSVG('" + _sig + "', 665, 188);</script>";
            }

            // Car photo
            string path = string.Format("/public/cars/{0}/", result.CarID);
            imagesThumb.InnerHtml = string.Format(@"<img class='thumb' alt='صورة السيارة' src='{0}{1}' />", path, result.MainPicture);
        }
    }

    #endregion
}