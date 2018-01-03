
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mail;


namespace Aliraqusedcars
{
    /// <summary>
    /// Summary description for Send Email class
    /// </summary>
    public class SendEmail
    {

        #region "Private Declaration"

        const string SERVER = "relay-hosting.secureserver.net", from = "iraqusedcar@gmail.com", bcc = "eng.msalah.abdullah@gmail.com";
        MailMessage oMail = new MailMessage();

        #endregion

        #region EmailService
        // new needds to test
        public async Task SendMyEmail(string toEmailAddress, string emailSubject, string emailMessage)
        {
            var message = new System.Net.Mail.MailMessage();
            message.To.Add(toEmailAddress);

            message.Subject = emailSubject;
            message.Body = emailMessage;
            message.BodyEncoding = Encoding.UTF8;

            using (var smtpClient = new System.Net.Mail.SmtpClient())
            {
                await smtpClient.SendMailAsync(message);
            }
        }
        #endregion

        #region "Public Methods"

        public bool SendAnEmail(string MsgTo, string Subj, string Body)
        {
            bool IsSend = false;
            try
            {
                oMail.From = from;
                oMail.To = MsgTo;
                oMail.Bcc = bcc;
                oMail.Subject = Subj;
                oMail.BodyFormat = MailFormat.Html;// enumeration
                oMail.Priority = MailPriority.Normal;// enumeration
                oMail.Body = Body;
                SmtpMail.SmtpServer = SERVER;
                SmtpMail.Send(oMail);
                IsSend = true;
                oMail = null;// free up resources
            }
            catch
            {
                IsSend = false;
            }
            return IsSend;
        }

        public bool SendAnEmailAttch(string MsgTo, string Subj, string Body, string FileMsg)
        {
            bool IsSend = false;
            try
            {
                oMail.From = from;
                oMail.To = MsgTo;
                oMail.Bcc = bcc;
                oMail.Subject = Subj;
                oMail.BodyFormat = MailFormat.Html;// enumeration
                oMail.Priority = MailPriority.Normal;// enumeration
                oMail.Body = Body;
                SmtpMail.SmtpServer = SERVER;
                if (FileMsg.Length > 1)
                {
                    oMail.Attachments.Add(new MailAttachment(FileMsg));
                    //AttachFiles(FileMsg);
                }
                SmtpMail.Send(oMail);
                oMail = null;// free up resources
                IsSend = true;
            }
            catch
            {
                IsSend = false;
            }
            return IsSend;
        }

        public bool SendAnEmail(string _from, string MsgTo, string Subj, string Body)
        {
            bool IsSend = false;
            try
            {
                oMail.From = _from;
                oMail.To = MsgTo;
                oMail.Bcc = bcc;
                oMail.Subject = Subj;
                oMail.BodyFormat = MailFormat.Html;// enumeration
                oMail.Priority = MailPriority.Normal;// enumeration
                oMail.Body = Body;
                SmtpMail.SmtpServer = SERVER;
                SmtpMail.Send(oMail);
                IsSend = true;
                oMail = null;// free up resources
            }
            catch
            {
                IsSend = false;

            }
            return IsSend;
        }

        public string ReadTemplate(string strTemplatePath)
        {
            if (string.IsNullOrEmpty(strTemplatePath))
                return "";

            using (var reader = new StreamReader(strTemplatePath, Encoding.Unicode))
            {
                return reader.ReadToEnd();
            }
        }
        #endregion

        #region "Private Methods"

        // Attache file
        private void AttachFiles(HttpPostedFile fileMsg)
        {
            if (fileMsg != null && fileMsg.ContentLength > 0)
            {
                //string fileName = Path.GetFileName(fileMsg.FileName);
                string filepath = HttpContext.Current.Server.MapPath(fileMsg.InputStream.ToString());
                var attachment = new MailAttachment(filepath); //fileMsg.InputStream, fileName);
                oMail.Attachments.Add(attachment);
            }
        }

        #endregion
    }
}