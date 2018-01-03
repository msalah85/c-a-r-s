using Aliraqcars.Domain.Business;
using System;
using System.IO;
using System.Linq;
using System.Web.UI;

public partial class admin_admin_2015_InvoiceSalePrint2 : Page
{
    #region "Event Handler"
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Request.QueryString["id"] != null) // new invoice 
            {
                int Id = Convert.ToInt32(Request.QueryString["id"]);
                ShowSaleDetails(Id);
            }
        }
    }
    #endregion

    #region "Page Methods"
    private void ShowSaleDetails(long _Id)
    {
        var result = new CarsSaleInvoiceManager().GetCarSaleInvoiceToPrint(_Id);
        if (result != null)
        {
            toDay.InnerHtml = string.Format("{0:dd/MM/yyyy}", result.InvoiceDate);
            clientAccount.HRef += string.Format("{0}&selcarid={1}", result.ClientID, result.CarID);
            clientAccount.InnerHtml = result.full_name;
            CarID.InnerHtml = string.Format("<a title='تفاصيل السيارة' href='CarDetailsPrint.aspx?id={0}'>{0}</a>", result.CarID);
            divColor.InnerHtml = result.ColorNameEn;
            divChassis.InnerHtml = result.ChassisNo;
            divLotNo.InnerHtml = result.LotNo;
            divNotes.InnerHtml = result.Notes;
            //divPhone.InnerHtml = result.phone;
            DivGear.InnerHtml = result.TransmissionNameEn;
            divYear.InnerHtml = string.Format("{0}", result.Year);
            divPrice.InnerHtml = string.Format("{0:0,0.00}", result.PayPrice);
            divInvoiceNo.InnerHtml = string.Format("{0}", result.SaleInvoiceID);
            divSaleTypeName.InnerHtml = string.Format("{0}", result.SaleTypeName);
            divArriveDate.InnerHtml = string.Format("{0:dd/MM/yyyy}", result.ArrivalDate);
            divModel.InnerHtml = string.Format("{0} - {1}", result.MakerNameEn, result.TypeNameEn);
            if (result.WorkingStatusName.Equals("حــادث"))
                divStatus.InnerHtml = string.Format("{0} <span class='pull-left'>نوع الحادث: {1}</span>", result.WorkingStatusName, result.AccidentType);
            else
                divStatus.InnerHtml = string.Format("{0}", result.WorkingStatusName);

            if (result.IsDeleted)
            {
                divCanceled.InnerText = "فــاتورة بــــيع ملــغاه";
                divCanceled.InnerHtml += "<p>" + result.DeleteReason + "</p>";
            }


            // view client signature
            if (!string.IsNullOrEmpty(result.ClientSignature))
            {
                string _sig = string.Format(@"{0}", result.ClientSignature.Replace("\n", @" ").Replace(Environment.NewLine, @" "));
                Label1.Text = "<script type='text/javascript'>renderSVG('" + _sig + "', 665, 188);</script>";
            }


            // Car photo
            string path = string.Format("/public/cars/{0}/", result.CarID);
            imagesThumb.InnerHtml = string.Format(@"<img class='thumb' alt='صورة السيارة' src='{0}{1}' />", path, result.MainPicture);

            //ShowCarImages(result.CarID.ToString());
        }
    }
    
    protected void ShowCarImages(string id)
    {
        string path = string.Format("/public/cars/{0}/_thumb/", id);
        var dir = new DirectoryInfo(Server.MapPath("~" + path));

        if (dir.Exists)
        {
            var files = dir.GetFiles();
            for (int i = 0; i < files.Count(); i++)
            {
                if (i > 3)
                    break;

                string nme = files[i].Name;
                imagesThumb.InnerHtml += string.Format(@"<li><img class='thumb' alt='صورة السيارة' src='{0}{1}' /></li>", path, nme);
            }
        }
    }
    #endregion
}