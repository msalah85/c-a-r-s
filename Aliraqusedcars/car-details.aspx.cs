using System;
using Aliraqusedcars;
using System.Data;
using System.Text;
using System.Web.UI.WebControls;
using Minutesuae.SystemUtilities;
using IraqCars.Business.Business;
using System.Web.UI;

public partial class car_details : Page
{
    static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

    DataSet GetData(string actionName, string value)
    {
        // create filter parameters
        string _clientID = string.IsNullOrEmpty(SessionManager.Current.ID) || SessionManager.Current.ID == "0" ? null : SessionManager.Current.ID;
        string[,] _params = { { "Id", value }, { "ClientID", _clientID } };

        // get all of data.
        try
        {
            var _ds = new Select().SelectLists(actionName, _params);
            return _ds;
        }
        catch (Exception ex)
        {
            log.Error("CarDetails error", ex);
            return null;
        }
    }

    DateTime parseDate(object dateString)
    {
        string _dateString = string.Format("{0}", dateString);

        if (!string.IsNullOrEmpty(_dateString))
        {
            DateTime dt = DateTime.ParseExact(_dateString, "dd/MM/yyyy", null);
            return dt;
        }
        else
        {
            return DateTime.Now.AddDays(2);
        }
    }

    void BingCarDetails()
    {
        string _carId = string.Format("{0}", Page.RouteData.Values["car"]);

        if (_carId.IndexOf('-') > -1)
            _carId = _carId.Substring(0, _carId.IndexOf('-'));

        _carId = MinutesuaeConcrete.ExtractNumbers(_carId);

        // get all data from db.
        var dsAll = GetData("CarsData_SelectOne", _carId);

        if (dsAll != null && dsAll.Tables[0].Rows.Count > 0)
        {
            var dtCar = dsAll.Tables[0];

            _id.InnerHtml = string.Format("{0}", dtCar.Rows[0]["CarID"]);
            model.InnerHtml = string.Format("{0}", dtCar.Rows[0]["TypeNameEn"]);
            mker.InnerHtml = string.Format("{0}", dtCar.Rows[0]["MakerNameEn"]);
            year.InnerHtml = string.Format("{0}", dtCar.Rows[0]["Year"]);
            color.InnerHtml = string.Format("{0}", dtCar.Rows[0]["ColorNameAr"]);
            lotno.InnerHtml = string.Format("{0}", dtCar.Rows[0]["LotNo"]);
            chassisno.InnerHtml = string.Format("{0}", dtCar.Rows[0]["ChassisNo"]);
            status.InnerHtml = string.Format("{0}", dtCar.Rows[0]["WorkingStatusName"]);
            transmi.InnerHtml = string.Format("{0}", dtCar.Rows[0]["TransmissionNameEn"]);
            arrive.InnerHtml = dtCar.Rows[0]["Arrived"].Equals("True") ? // || parseDate(dtCar.Rows[0]["ArrivalDate"]).Subtract(DateTime.Now).TotalDays <= 0
                "واصـــله" : string.Format("قيد الشحن {0} {1}", dtCar.Rows[0]["ArrivalDate"],
                (dtCar.Rows[0]["ShipCompanyNameEn"] != null && !string.IsNullOrEmpty(Convert.ToString(dtCar.Rows[0]["ShipCompanyNameEn"])) ? dtCar.Rows[0]["ShipCompanyNameEn"].ToString().Split('-')[1] : ""));

            orangePrice.InnerHtml = price.InnerHtml = string.Format("{0:0,0} $", dtCar.Rows[0]["WesitePrice"]);
            notes.InnerHtml = string.Format("{0}", dtCar.Rows[0]["Notes"]);

            // client`s car
            if (dtCar.Rows[0]["OwnerID"].ToString().Equals("2"))
            {
                divExtraInfo.Text = string.Format(@"<li class='list-group-item'><span class='inf'><i class='fa fa-info-circle text-danger'></i></span><b class='text-danger'>سيارة عميل لدي شركة</b></li>
<li class='list-group-item'><span class='inf text-danger'>للإتصال</span> <b class='text-danger'>{0}</b></li>", dtCar.Rows[0]["phone"]);
            }

            pageTitle.InnerHtml = string.Format("{0} - {1} - {2}", dtCar.Rows[0]["MakerNameEn"], dtCar.Rows[0]["TypeNameEn"], dtCar.Rows[0]["Year"]);

            // 4 seo
            Page.Title += pageTitle.InnerText;
            Page.MetaDescription += pageTitle.InnerText;
            Page.MetaKeywords += "," + pageTitle.InnerText.Replace(" ", ",");

            StringBuilder shareTags = new StringBuilder(),
                          twitImgs = new StringBuilder();
            var masterSocial = this.Master.FindControl("socialShare") as Literal;

            shareTags.Append(string.Format(@"<meta property='og:type' content='website' />
                                            <meta property='og:title' content='{0}' />
                                            <meta property='og:description' content='{0}' />
                                            <meta property='og:url' content='{1}' />
                                            <meta property='og:site_name' content='IRAQUSEDCARS.AE' />
                                            <meta http-equiv='imagetoolbar' content='false' />
                                            <meta name='twitter:site' content='@aliraqusedcars' />
                                            <meta name='twitter:creator' content='@aliraqusedcars' />
                                            <meta name='twitter:url' content='{1}' />
                                            <meta name='twitter:title' content='{0}' />
                                            <meta name='twitter:description' content='{0}' />",
                                            Resources.Resource_ar.IraqComp + " " + pageTitle.InnerText,
                                            Request.Url.AbsoluteUri));

            // bind car images
            var dtImages = dsAll.Tables[1];
            for (int i = 0; i < dtImages.Rows.Count; i++)
            {
                string imgDomain = "https://www.iraqusedcars.ae"; // Config.CDN

                string path = string.Format("{0}/public/cars/{1}/{2}", imgDomain, _carId, dtImages.Rows[i]["URL"]),
                       pathThumb = string.Format("{0}/public/cars/{1}/_thumb/{2}", imgDomain, _carId, dtImages.Rows[i]["URL"]);

                // facebook images
                var fbImgTag = string.Format("<meta property='og:image' content='{0}' />", path);
                shareTags.Append(fbImgTag);

                // twitter images
                //twitImgs.Append(path + ",");

                divCarImages.InnerHtml += @"<div data-p='144.50' style='display: none;'><img alt=" + pageTitle.InnerText + " data-rel='prettyPhoto[gallery]' data-u='image' src='" + path + "' /><img data-u='thumb' src='" + pathThumb + "' /></div>";
            }
            masterSocial.Text = shareTags.ToString();

            // bind next , prev buttons
            var dtNextPrev = dsAll.Tables[2];
            string prevID = string.Format("{0}", dtNextPrev.Rows[0]["PrevID"]),
                nextID = string.Format("{0}", dtNextPrev.Rows[0]["NextID"]);

            if (!string.IsNullOrEmpty(nextID))
            {
                nextCar.HRef = string.Format("/car/{0}-details", nextID);
                nextCar.Attributes["class"] = nextCar.Attributes["class"].Replace("hidden", "").Trim();
            }
            if (!string.IsNullOrEmpty(prevID))
            {
                prevCar.HRef = string.Format("/car/{0}-details", prevID);
                prevCar.Attributes["class"] = prevCar.Attributes["class"].Replace("hidden", "").Trim();
            }

            // comments
            var url = string.Format(@"https://www.iraqusedcars.ae/car/{0}-{1}-{2}-{3}", _id.InnerText, dtCar.Rows[0]["MakerNameEn"], dtCar.Rows[0]["TypeNameEn"], dtCar.Rows[0]["Year"]);
            divCarComments.Attributes.Add("data-href", url);
        }
        else
        {
            // show not exist message.
            myMessage.InnerHtml = Resources.Resource_ar.CarDetailsNotFound; myMessage.Visible = true;
            myMessage.Attributes.Add("class", "myMessage alert alert-danger");
        }
    }

    void Page_Load(object s, EventArgs e)
    {
        if (!IsPostBack)
        {
            BingCarDetails(); // get all car details
        }
    }
}