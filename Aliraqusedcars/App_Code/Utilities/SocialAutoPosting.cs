using Facebook;
using Hangfire;
using InstaSharp;
using System;
using System.Configuration;
using System.Security;
using System.Threading.Tasks;
using System.Web.Hosting;
using TweetSharp;

namespace Aliraqusedcars
{
    /// <summary>
    /// Summary description for SocialAutoPosting
    /// </summary>
    public static class SocialAutoPosting
    {
        public static string PostingToAll(string link, string picture, string postTitle, string postCaption, string postMsg, string postDescription)
        {
            // Fire-and-forget jobs are executed only once and almost immediately after creation.
            // facebook page
            var facebookJobId = Task.Run(() => PostToFB(link, picture, postTitle, postCaption, postMsg, postDescription));

           //Delayed jobs are executed only once too, but not immediately, after a certain time interval.
           // twitter page
           var twitterJobId = Task.Run(() => PostToTwitter(postMsg, link));
            
            //Continuations are executed when its parent job has been finished.
            // instagram page
            var instagramJobId = Task.Run(() => PostToInstagram(postMsg, link, picture));

            return string.Format("{0},{1},{2}", facebookJobId.Id, twitterJobId.Id, instagramJobId.Id);
        }

        #region "Instagram"
        public static void PostToInstagram(string Message, string Link, string PhotoUrl)
        {
            var uploader = new InstagramUploader("aliraqusedcars", ConvertToSecureString("Fira#97210"));
            uploader.InvalidLoginEvent += InvalidLoginEvent;
            uploader.ErrorEvent += ErrorEvent;
            uploader.OnCompleteEvent += OnCompleteEvent;

            try
            {
                // System.Web.HttpContext.Current.Server.MapPath
                // System.AppDomain.CurrentDomain.BaseDirectory
                string postImgaePath = HostingEnvironment.MapPath(PhotoUrl.Replace("https://www.iraqusedcars.ae", ""));
                string postTitle = Message + "\r\n" + Link;

                uploader.UploadImage(postImgaePath, postTitle);
            }
            catch (Exception ex)
            {
                //error to log file
            }
        }

        // Instagram utilities
        private static SecureString ConvertToSecureString(string strPassword)
        {
            var secureStr = new SecureString();
            if (strPassword.Length > 0)
            {
                foreach (var c in strPassword.ToCharArray()) secureStr.AppendChar(c);
            }
            return secureStr;
        }

        private static void OnCompleteEvent(object sender, EventArgs e)
        {
            // success
        }

        private static void ErrorEvent(object sender, EventArgs e)
        {
            // error to log file
        }

        private static void InvalidLoginEvent(object sender, EventArgs e)
        {
            // error to log file
        }
        #endregion

        #region Twitter
        public static void PostToTwitter(string Message, string Link)
        {
            try
            {
                // twitter options
                string App_ConsumerKey = "2YAJa38FdK8Rr9IQQO9HTSURB", App_ConsumerSecret = "KsFxwgVKPz2fcVGG9GqP7Uc8H4UP01txQoqDhG6IVrlHFaPxCN",
                    accessToken = "3625117704-WhjSMI6BKywqTGLv8U34HW2qcEetHqQcspglcxT", tokenSecret = "wNcZjPnkMcBC6xxpRbHtwL0drNW7BxEGldu5jirmzlMH5";


                var twitterApp = new TwitterService(App_ConsumerKey, App_ConsumerSecret);
                twitterApp.AuthenticateWith(accessToken, tokenSecret);
                string msg = string.Format("{0}\r\n{1}", Message, Link);

                // https://twitter.com/iraqusedcars
                // https://twitter.com/aliraqusedcars
                var twitterStatus = twitterApp.SendTweet(new SendTweetOptions { Status = msg });
                var responseText = twitterApp.Response.Response;

                // success
            }
            catch
            {
                // error to log file.
            }
        }
        #endregion

        #region "Facebook"
        public static void PostToFB(string link, string picture, string postTitle, string postCaption, string postMsg, string postDescription)
        {
            #region "Post to Fan Page"
            try
            {
                // // long live page token from: https://developers.facebook.com/tools/explorer/
                string page_access_token = ConfigurationManager.AppSettings["fbAccessToken"];
                var client = new FacebookClient(page_access_token);

                client.Post("/aliraqusedcars/feed", new
                {
                    link = link,
                    picture = picture,
                    name = postTitle,      // Article title
                    caption = postCaption, //Caption for the link
                    message = postMsg,     // Post details
                    description = postDescription,
                    type = "photo"
                });


                // success message
            }
            catch (FacebookOAuthException ex)
            {
                // ex1 call log file
            }
            catch (FacebookApiException ex)
            {
                //ex2 call log file
            }

            #endregion
        }

        #endregion
    }
}