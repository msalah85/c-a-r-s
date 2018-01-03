using System;
using System.Linq;
using Aliraqcars.Domain.Business;
using Minutesuae.SystemUtilities;
using Aliraqusedcars;
using System.Web.Security;
using System.Web.UI;
using Settings;

public partial class admin_eta_Default : Page
{
    #region "Event Handler"
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            FormsAuthentication.SignOut();
            IdentityHelper.SignOut();
        }
    }

    protected void bntLogin_Click(object sender, EventArgs e)
    {
        if (txtUsername.Text.Trim() != String.Empty && txtPassword.Text.Trim() != String.Empty)
        {
            string _pass = EncryptDecryptString.Encrypt(txtPassword.Text.Trim(), "Taj$$Key");
            LoginUSers(txtUsername.Text, _pass);
        }
        else
        {
            lblError.Text = Resources.AdminResources_ar.DataRequired;
        }
    }

    #endregion

    #region "Private Methods"

    void LoginUSers(string _userName, string _pass)
    {
        // Get user info. by username and password.
        var user = new UsersManager().UserLogin(_userName, _pass);

        if (user != null)
        {
            var _user = new LoginModel
            {
                ID = string.Format("{0}", user.UserID),
                Name = user.UserFullName,
                PermID = string.Format("{0}", (user.PermID ?? 0)),
                MasterAccountID = "0"
            };

            // save this data in cookie.
            IdentityHelper.SignIn(_user);

            // Redirect to the last opened page in the system.
            string adminUrl = string.Format("/{0}/", Config.AdminUrl);
            IdentityHelper.RedirectToReturnUrl(adminUrl + "home.aspx", Response);
        }
        else
        { lblError.Text = Resources.AdminResources_ar.ErrorLogin; }
    }
    #endregion
}