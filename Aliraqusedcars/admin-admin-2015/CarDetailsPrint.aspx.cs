using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aliraqcars.Domain.Business;
using System.IO;
using System.Collections;
using System.Text;

public partial class CarDetailsPrintt : FactshMasterPage
{
    #region "Event Handler"
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // car parameters carid or lot no.
            string id = string.IsNullOrEmpty(Request.QueryString["id"]) ? "0" : Request.QueryString["id"];
            string lot = string.IsNullOrEmpty(Request.QueryString["lot"]) ? null : Request.QueryString["lot"];
            int soldAny = string.IsNullOrEmpty(Request.QueryString["any"]) ? 0 : Convert.ToInt32(Request.QueryString["any"]);

            // get car details.
            if (id != "0" || lot != null)
            {
                long Id = Convert.ToInt64(id);
                ShowSaleDetails(Id, lot, soldAny);
            }
        }
    }
    #endregion

    #region "Page Methods"
    private void ShowSaleDetails(long _Id, string lotNo, int soldAnyNextPrev)
    {
        var data = new CarsManager().GetCarDetailsReport(_Id, lotNo, soldAnyNextPrev);

        if (data != null && data.Car != null)
        {
            var result = data.Car;
            lnkEdit.Visible = !(result.IsShippingCarPaid > 0) || result.Sold == false || !(result.PayInvoicePaymentsID > 0);

            divLocation.InnerHtml = string.Format("<img src='/App_Themes/iraq/images/{0}.jpg' width='35' />", (bool)result.Arrived ? result.DistinationNameAr : "USA"); // car location
            divViewWebsite.InnerHtml = string.Format("<a href='pay/{1}/InvoicePayAdd.aspx'>{0}</a>", (bool)result.view_website ? "معــروضــة بالمــوقع" : "غيـر معــروضـة", result.CarID); // view website
            divCarID.InnerHtml = string.Format("{0}", result.CarID);
            divColor.InnerHtml = result.ColorNameAr;
            divArrived.InnerHtml = (result.Arrived != null && (bool)result.Arrived) ? "واصله" : "غير واصلة";
            divChassis.InnerHtml = result.ChassisNo;
            divLotNo.InnerHtml = result.LotNo;
            divBuyerName.InnerHtml = result.BuyerName;
            divPuyClientName.InnerHtml = string.Format(@"<a href='ClientCars.aspx?id={1}&selcarid={2}'>{0}</a>", result.full_name, result.PayClientID, result.CarID); // who pay this.
            divAuctionName.InnerHtml = result.AuctionName;
            divNotes.InnerHtml = result.Notes;
            if (result.DistinationNameAr != null)
                divDistination.InnerHtml = string.Format("<img width='25px' src='/App_Themes/iraq/images/{0}.jpg' /> {0}", result.DistinationNameAr);
            divStatus.InnerHtml = string.Format("{0}، {1}", result.WorkingStatusName, result.AccidentType);
            divBol.InnerHtml = string.Format("{0}", result.Bol);
            DivGear.InnerHtml = result.TransmissionNameEn;
            divContainerNo.InnerHtml = string.Format("{0}", result.ContainerNo);
            divPayPrice.InnerHtml = string.Format("{0:0,0.00}", result.PayPrice);
            divPayTypeName.InnerHtml = string.Format("{0}", result.PayTypeName);
            divArriveDate.InnerHtml = string.Format("{0:dd/MM/yyyy}", result.ArrivalDate);
            divSaleDate.InnerHtml = string.Format("{0:dd/MM/yyyy}", result.SaleInvoiceDate);
            divSaleType.InnerHtml = string.Format("{0} {1}", result.SaleTypeName, (bool)result.SalePriceDemand ? " و مطلوب كامل المبلغ." : "");
            divModel.InnerHtml = string.Format("{0} - {1} - {2}", result.MakerNameAr, result.TypeNameAr, result.Year);
            if (!string.IsNullOrEmpty(result.MainPicture)) { divMainPic.Src = string.Format("/public/cars/{0}/_thumb/{1}", result.CarID, result.MainPicture); /*divMainPic.Visible = true;*/ }
            divWebsitePrice.InnerHtml = string.Format("{0:0,0.00}", result.WesitePrice);
            divSalePrice.InnerHtml = string.Format("{0:0,0.00}", result.SalePrice);
            divInvoiceDate.InnerHtml = string.Format("{0:dd/MM/yyyy}", result.InvoiceDate);
            divShipCompanyName.InnerHtml = string.Format("{0}", result.ShipCompanyNameEn);
            divRegionEn.InnerHtml = string.Format("{0}", result.RegionEn);
            divContainerNo.InnerHtml = string.Format("{0}", result.ContainerNo);
            divAddDate.InnerHtml = string.Format("{0:dd/MM/yyyy}", result.AddDate);
            divCarTitle.InnerHtml = result.CarTitleAmrica != null && (bool)result.CarTitleAmrica ? "مستلم Title" : "غير مستلم Title";
            if (result.PayInvTypeID == 1 || result.PayInvTypeID == 3) // سيارات الشركة - Relist
                divSold.InnerHtml = (result.Sold != null && (bool)result.Sold) ? string.Format("<span class='alert alert-danger'><a href='ClientCars.aspx?id={1}&selcarid={3}'>مباعه للسيد/ {0}</a></span> <a target='_blank' href='InvoiceSalePrint.aspx?id={2}' data-rel='tooltip' title='طباعة فاتورة البيع'>#{2}</a>", result.SoldClientName, result.SaleClientID, result.SaleInvoiceID, result.CarID) : string.Format("غير مباعه <a href='InvoiceSaleAdd.aspx?id={0}' class='btn btn-success btn-mini hidden-print'> + إنشاء فاتوة بيع</a>", result.CarID);
            divSoldClientName.InnerHtml = string.Format("{0}", result.SoldClientName);
            if (result.PayInvoicePaymentsID != null)
                divPayInvoicePaymentsID.InnerHtml = string.Format("مسددة: <a title='تفاصيل الحوالة' target='_blank' href='PayInvoicePaymentsPrint.aspx?id={0}'>#{0}</a>", result.PayInvoicePaymentsID);

            if (result.PayInvTypeID == 3)
            {
                divPayPriceTitle.InnerText = "الغرامه";
                divModel.InnerHtml += " - <span class='red'>Relist</span>";
            }

            // deleted 
            if ((bool)result.IsDeleted)
            {
                divModel.InnerHtml += " <span class='red'>ملغاه</span>";
                divNotes.InnerHtml += string.Format("<span class='red'>السيارة ملغاه،</span> <span class='red'>{0}</span>", result.DeleteReason);
            }

            // Paper, VCC, Without paper, not received.
            string carPaper = result.CarPaper != null ? result.CarPaper : "غير مستلم";
            if (result.ReceiveWithPaper != null && (bool)result.ReceiveWithPaper == false) { carPaper = "بدون الورق"; }

            divReceiveWithPaper.InnerHtml = string.Format("{0}", carPaper);


            ShippingCalcName.InnerHtml = result.ShippingCalcName;// طريقة البيع كاملة-تقطيع

            if (result.WithoutShipping == true)
            {
                divDistinTitle.InnerHtml = "بدون شحن";
                divBuyerTitle.InnerHtml = "مالك السيارة";
            }

            if (result.DistinationID == 2) // الاردن عمان بدل جمارك
                divCustomExpenses2.InnerHtml = "تخليص - نقل حرة";

            if (result.NextID != null)
            {
                lnkNext.HRef = string.Format("CarDetailsPrint.aspx?id={0}&any={1}", result.NextID, soldAnyNextPrev);
                lnkNext.Visible = true;
            }
            if (result.PrevID != null)
            {
                lnkPrev.HRef = string.Format("CarDetailsPrint.aspx?id={0}&any={1}", result.NextID, soldAnyNextPrev);
                lnkPrev.Visible = true;
            }

            // images 
            var list = ShowCarImages(result.CarID.ToString());
            for (int i = 0; i < list.Count; i++)
            {
                divIMagesList.InnerHtml += string.Format(@"<li><a target='_blank' data-rel='colorbox' href='/public/cars/{0}/{1}' data-rel='colorbox'><img alt='car' style='width: 245px; height: 245px' src='/public/cars/{0}/_thumb/{1}' /></a>", result.CarID, list[i]);
            }

            // costs
            var costs = data.Costs;
            if (costs != null)
            {
                divCarCosts.Visible = true;
                
                ShipPriceLoading.Text = string.Format("{0:0,0.0}", costs.LoadingShippingCosts);
                Towing.Text = string.Format("{0:0,0.0}", costs.Towing);

                //=========================نقل - تقطيع=> السيارات السكراب فقط
                divPartitioning.Visible = divPartitioning2.Visible = divTransportation.Visible = divTransportation2.Visible = (result.ShippingCalcID == 2); // Scrap
                Partitioning.Text = string.Format("{0:0,0.0}", costs.Partitioning);
                Transportation.Text = string.Format("{0:0,0.0}", costs.Transportation);
                //=========================

                Extra.Text = string.Format("{0:0,0.0}", costs.ShippingExtra);
                PayPayments.Text = string.Format("{0:0,0.0}", costs.PayPrice);
                BuyPaymentFees.Text = string.Format("{0:0,0.0}", costs.PayPayments);

                //=========================جمارك => لجميع السيارات ماعدا الكاملة للعراق
                //=========================جمارك => لجميع السيارات السكراب جولف
                divCustomExpenses.Visible = divCustomExpenses2.Visible = (!(result.ShippingCalcID == 1 && result.DistinationID == 3) || (result.ShippingCalcID == 2 && result.ShipperID == 14)); // hide if Iraq & full car(not scrap)

                divCustomOnCar.Visible = divCustomOnCar2.Visible = (result.ShippingCalcID == 1 && result.DistinationID == 1); // جمارك فقط  على كامله للإمارات

                CustomOnCar.Text = string.Format("{0:0,0.0}", costs.CustomOnCar);
                CustomExpenses.Text = string.Format("{0:0,0.0}", costs.CustomExpensesOnCar);
                //=========================

                //=========================مصروف ورشه - شحن داخل الامارات فقط
                divShippExpensesCost.Visible = divShippExpensesCost2.Visible = divShopExpensesCost.Visible = divShopExpensesCost2.Visible = (result.DistinationID == 1); // UAE
                ShippExpensesCost.Text = string.Format("{0:0,0.0}", costs.ShippExpensesCost);
                ShopExpensesCost.Text = string.Format("{0:0,0.0}", costs.ShopExpensesCost);
                //=========================

                CarDiscount.Text = string.Format("{0:0,0.0}", costs.DiscountAmount);
                //CarExtra.Text = string.Format("{0:0,0.0}", costs.ExtraAmount);
                AuctionCommCost.Text = string.Format("{0:0,0.0}", costs.AuctionCommCost);

                divExchangeFeeOnCar.Visible = (costs.ExchangeFeeOnCar > 0);
                ExchangeFeeOnCar.Text = string.Format("{0:0,0.0}", costs.ExchangeFeeOnCar);

                ///////////////// total costs
                TotalCosts.Text = string.Format("{0:0,0.0}", costs.TotalOnCar);

                // canceled invoices
                if (data.CanceledInvoices != null)
                    ShowCancelledInvoices(data.CanceledInvoices);
            }
        }
    }

    private void ShowCancelledInvoices(List<Aliraqcars.Domain.Concrete.ICanceledInvoices> list)
    {
        StringBuilder htmlInvoices = new StringBuilder("\t");

        foreach (var itm in list)
        {
            string no = string.Format(@"<a class='red' data-rel='tooltip' title='فاتورة بيع ملغاه رقم {0} بسبب: {1} {2}' href='InvoiceSalePrint.aspx?id={0}'>{0}x</a> ", itm.SaleInvoiceID, itm.DeleteReason, (itm.DelClientApprove != null && (bool)itm.DelClientApprove ? "بموافقة العميل" : "قيد موافقة العميل"));
            htmlInvoices.Append(no);
        }

        divNotes.InnerHtml += htmlInvoices.ToString();
    }

    ArrayList ShowCarImages(string id)
    {
        var context = HttpContext.Current;
        string url = string.Format("~/public/cars/{0}/", id);
        var dir = new DirectoryInfo(context.Server.MapPath(url));
        var imgs = new ArrayList();

        if (dir.Exists)
        {
            var files = dir.GetFiles();
            for (int i = 0; i < files.Count(); i++)
            {
                imgs.Add(files[i].Name);
            }
        }
        return imgs;
    }

    #endregion
}