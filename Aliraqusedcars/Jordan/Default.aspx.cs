using Aliraqcars.Domain.Business;
using Aliraqusedcars;
using IraqCars.Business.DataUtility;
using System;
using System.Web.Security;
using System.Web.UI;

public partial class Jordan_Default : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // logout
            FormsAuthentication.SignOut();
            IdentityHelper.SignOut();

            username.Focus();
        }
    }

    protected void Login_Click(object sender, EventArgs e)
    {
        if (Page.IsValid)
        {
            lblWarning.Attributes.Add("class", ""); // reset error

            if (username.Text.Trim() != String.Empty && password.Text.Trim() != String.Empty)
            {
                LoginUSers(username.Text, password.Text);
            }
            else
            {
                lblError.Text = Resources.AdminResources_ar.DataRequired;
                lblWarning.Attributes.Add("class", "alert alert-warning");
            }
        }
    }

    #region "Private Methods"
    void LoginUSers(string _userName, string _pass)
    {
        _pass = EncryptDecryptString.Encrypt(_pass, "Taj$$Key");

        string[,] _params = { { "Username", _userName }, { "Password", _pass } };
        var user = new UsersManager().UserLogin(_userName, _pass);

        if (user != null)
        {
            var _user = new LoginModel
            {
                ID = string.Format("{0}", user.UserID),
                Name = string.Format("{0}", user.UserFullName),
                PermID = string.Format("{0}", user.PermID), // jordan users permission         
                MasterAccountID = "",
            };

            IdentityHelper.SignIn(_user);
            IdentityHelper.RedirectToReturnUrl("/jordan/home", Response);
        }
        else
        {
            lblError.Text = Resources.AdminResources_ar.ErrorLogin;
            lblWarning.Attributes.Add("class", "alert alert-warning");
        }
    }
    #endregion
}