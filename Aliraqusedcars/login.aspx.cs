using System;
using System.Web.UI;
using Aliraqusedcars;
using IraqCars.Business.Business;
using System.Web.Security;

public partial class login : Page
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
        string[,] _params = { { "Username", _userName }, { "Password", _pass } };
        var _ds = new Select().SelectLists("Clients_Login", _params); // get all of data.
        var dt = _ds.Tables[0];

        if (dt.Rows.Count > 0)
        {
            var _user = new LoginModel
            {
                ID = string.Format("{0}", dt.Rows[0][0]),
                Name = string.Format("{0}", dt.Rows[0][1]),
                PermID = "4", // client level
                MasterAccountID = "0"
            };

            int _childsCount = string.IsNullOrEmpty(string.Format("{0}", dt.Rows[0][2])) ? 0 : Convert.ToInt32(dt.Rows[0][2]);
            if (_childsCount > 0) // set master Id
            {
                _user.MasterAccountID = _user.ID;
            }

            IdentityHelper.SignIn(_user);
            if (_user.MasterAccountID == _user.ID)
                IdentityHelper.RedirectToReturnUrl("/client/accounts", Response);
            else
                IdentityHelper.RedirectToReturnUrl("/client/dashboard", Response);
        }
        else
        {
            lblError.Text = Resources.AdminResources_ar.ErrorLogin;
            lblWarning.Attributes.Add("class", "alert alert-warning");
        }
    }
    #endregion
}