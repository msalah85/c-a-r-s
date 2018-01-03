// Developer: M. Salah
// Last update: 18-10-2016

using Aliraqcars.Domain.Business;
using System;
using Facebook;
using TweetSharp;
using System.Web.UI;
using System.Security;
using InstaSharp;
using InstaSharp.Models;
using System.Configuration;

public partial class share_car2 : Page
{
    #region Facebook

    #region "Public Variables"

    // facebook page`s app info
    readonly string app_id = "1006139766099265", // page_id = "277926952269690"
                    app_secret = "f99471faa1ce39052235749504bb744b",
                    scope = "manage_pages,publish_pages";

    #endregion

    void PostToFanPage()
    {
        #region "Post to Fan Page"
        try
        {
            // get test accessToken from: https://developers.facebook.com/tools/explorer/
            string page_access_token = ConfigurationManager.AppSettings["fbAccessToken"]; // QueryUserAccessToken(userCodeFromUrl);
            var client = new FacebookClient(page_access_token);
            
            /// media
            //dynamic result2 = fb.Batch(
            //        new FacebookBatchParameter(HttpMethod.Post, "/me/photos", new Dictionary<string, object> { { "message", "picture 1 msg" }, { "pic1", new FacebookMediaObject { ContentType = "image/jpeg", FileName = "Tulips.jpg" }.SetValue(File.ReadAllBytes(@"C:\Users\Public\Pictures\Sample Pictures\Tulips.jpg")) } }),
            //        new FacebookBatchParameter(HttpMethod.Post, "/me/photos", new Dictionary<string, object> { { "message", "picture 2 msg" }, { "pic2", new FacebookMediaObject { ContentType = "image/jpeg", FileName = "Penguins.jpg" }.SetValue(File.ReadAllBytes(@"C:\Users\Public\Pictures\Sample Pictures\Penguins.jpg")) } }));
            // media
            //var mediaObject = new FacebookMediaObject
            //{
            //    FileName = System.IO.Path.GetFileName(filePath),
            //    ContentType = "image/jpeg"
            //};
            //mediaObject.SetValue(System.IO.File.ReadAllBytes(filePath));

            client.Post("/aliraqusedcars/feed", new
            {
                link = this.link.Text,
                picture = this.picture.Text,
                name = this.name.Text,           // Article title
                caption = this.caption.Text,     //Caption for the link
                message = this.message.Text,     // Post details
                description = this.message.Text,
                type = "photo"
            });


            showResultMsg("تم نشر بيانات السيارة فى صفحة الشركة بالفيس بوك.", 1);
            //startAutoShare.Visible = false;
        }
        catch (FacebookOAuthException ex)
        {
            showResultMsg("خطأ: " + ex.Message, 2);
        }
        catch (FacebookApiException ex)
        {
            showResultMsg("خطأ: " + ex.Message, 2);
        }
        #endregion
    }

    #endregion

    #region Twitter
    void TweetPost()
    {
        try
        {
            // twitter options
            string App_ConsumerKey = "2YAJa38FdK8Rr9IQQO9HTSURB", App_ConsumerSecret = "KsFxwgVKPz2fcVGG9GqP7Uc8H4UP01txQoqDhG6IVrlHFaPxCN",
                accessToken = "3625117704-WhjSMI6BKywqTGLv8U34HW2qcEetHqQcspglcxT", tokenSecret = "wNcZjPnkMcBC6xxpRbHtwL0drNW7BxEGldu5jirmzlMH5";

            var twitterApp = new TwitterService(App_ConsumerKey, App_ConsumerSecret);
            twitterApp.AuthenticateWith(accessToken, tokenSecret);
            string msg = string.Format("{0}\r\n{1}", message.Text, link.Text);

            var twitterStatus = twitterApp.SendTweet(new SendTweetOptions { Status = msg });
            var responseText = twitterApp.Response.Response;


            showResultMsg("تم نشر بيانات السيارة فى صفحة الشركة بتويتر.", 1);
        }
        catch { showResultMsg("حدث خطأ أثناء نشر بيانات السيارة فى صفحة الشركة بتويتر.", 2); }
    }
    #endregion

    #region Instagram
    void PostInstagram()
    {
        var uploader = new InstagramUploader("aliraqusedcars", ConvertToSecureString("Firas!1972"));
        uploader.InvalidLoginEvent += InvalidLoginEvent;
        uploader.ErrorEvent += ErrorEvent;
        uploader.OnCompleteEvent += OnCompleteEvent;

        try
        {
            string postImgaePath = Server.MapPath(picture.Text.Replace("https://www.iraqusedcars.ae", ""));
            string postTitle = message.Text + "\r\n" + link.Text;

            uploader.UploadImage(postImgaePath, postTitle);
        }
        catch (Exception ex)
        {
            showResultMsg("خطأ: " + ex.Message, 2);
        }
    }

    // Instagram utilities
    public static SecureString ConvertToSecureString(string strPassword)
    {
        var secureStr = new SecureString();
        if (strPassword.Length > 0)
        {
            foreach (var c in strPassword.ToCharArray()) secureStr.AppendChar(c);
        }
        return secureStr;
    }

    private void OnCompleteEvent(object sender, EventArgs e)
    {
        showResultMsg("تم نشر السيارة على صفحة انستجرام بنجاح.", 1);
        foreach (var image in ((UploadResponse)e).Images)
        {
            showResultMsg("Url: " + image.Url, 1);
            //showResultMsg("Width: " + image.Width, 1);
            //showResultMsg("Height: " + image.Height, 1);
        }
    }

    private void ErrorEvent(object sender, EventArgs e)
    {
        showResultMsg("خطأ:  " + ((ErrorResponse)e).Message, 2);
    }

    private void InvalidLoginEvent(object sender, EventArgs e)
    {
        showResultMsg("Error while logging  " + ((ErrorResponse)e).Message, 2);
    }
    #endregion

    #region "Events Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // get car info
            if (!string.IsNullOrEmpty(Request.QueryString["carid"]))
            {
                var cId = Convert.ToInt64(Request.QueryString["carid"]);
                ShowSaleDetails(cId);
            }
            else
            {
                Response.RedirectPermanent("/");
            }

        }
    }


    protected void startAutoShare_Click(object sender, EventArgs e)
    {
        // share fb
        PostToFanPage();
    }

    protected void btnShareTwitter_Click(object sender, EventArgs e)
    {
        // share twitter
        TweetPost();
    }

    protected void btnShareToInstagram_Click(object sender, EventArgs e)
    {
        // share instagram
        PostInstagram();
    }
    #endregion

    #region "Properties"

    void showResultMsg(string msg, int typeID)
    {
        string msgHtml = string.Format("<div class='alert alert-" + (typeID > 1 ? "danger" : "success") + "'>{0}.</div>", msg);
        Response.Write(msgHtml);
        //btnShareToInstagram.Visible = false;
    }


    #endregion

    #region "Car Details"
    // get car details from my db.
    private void ShowSaleDetails(long _Id)
    {
        var data = new CarsManager().GetCarDetailsReport(_Id, "", 0);

        if (data != null)
        {
            var result = data.Car;
            string cName = string.Format("{0} - {1}  {2}", result.MakerNameAr, result.TypeNameAr, result.Year);
            name.Text = cName;
            caption.Text = "نشر من موقع شركة العراق";
            link.Text = string.Format("https://www.iraqusedcars.ae/car/{0}-{1}-{2}-{3}", result.CarID, result.MakerNameAr, result.TypeNameAr, result.Year);
            message.Text = string.Format("رقم السيارة: {0} \nالموديل: {1} - {2} - {3} \nالحالة: {4} {5}\nالسعر: {6:0,0} $", result.CarID, result.MakerNameAr, result.TypeNameAr, result.Year, result.WorkingStatusName, result.AccidentType, result.WesitePrice);
            if (!string.IsNullOrEmpty(result.MainPicture))
                imgMain.ImageUrl = picture.Text = string.Format("https://www.iraqusedcars.ae/public/cars/{0}/{1}", result.CarID, result.MainPicture);
            else
                imgMain.ImageUrl = picture.Text = string.Format("https://www.iraqusedcars.ae/public/cars/{0}", "noimage.gif");
        }
    }
    #endregion
}
