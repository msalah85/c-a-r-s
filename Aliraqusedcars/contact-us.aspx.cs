
using Aliraqusedcars;
using System.Web.Services;

public partial class contact_us : FactshMasterPage
{
    [WebMethod]
    public static object SendMessage(string fname, string email, string phone, string comments)
    {
        var mail = new SendEmail();
        var _body = new contact_us().CreateEmailStr(fname, email, phone, comments);
        var checkSent = mail.SendAnEmail(email, "iraqusedcar@gmail.com", Resources.Resource_ar.FeedbackHeader, _body); //mail.SendNow(email, "Iraqusedcar@gmail.com", Resources.Resource_ar.FeedbackHeader, _body);

        object obj = new { };

        if (checkSent)
        {
            obj = new
            {
                status = true,
                message = Resources.Resource_ar.EmailSent
            };
        }
        else
        {
            obj = new
            {
                status = false,
                message = Resources.Resource_ar.EmailSendingError
            };
        }

        return obj;
    }

    public string CreateEmailStr(string Name, string Email, string phone, string Message)
    {
        string strBody = new SendEmail().ReadTemplate(Server.MapPath("~/Templates/contact.html"));
        strBody = strBody.Replace("@@Name@@", Name);
        strBody = strBody.Replace("@@Email@@", Email);
        strBody = strBody.Replace("@@Phone@@", phone);
        strBody = strBody.Replace("@@Message@@", Message);

        return strBody;
    }
}