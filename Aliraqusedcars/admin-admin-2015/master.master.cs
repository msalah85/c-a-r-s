using Aliraqusedcars;
using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;

public partial class Admin_Iraq_Admin : MasterPage
{
    #region "Master Handler"

    void CheckUserLogin()
    {
        int permissionID = Convert.ToInt16(SessionManager.Current.PermID);
        // 1 => Firas, 2 => Emp. without delete perm., 3=> Gulfauto, 4 => Client not here.
        bool isEmployee = permissionID > 0 && permissionID < 4;


        if (!SessionManager.Current.ID.Equals("0") && isEmployee)
        {
            // set user permissions
            var newUserPerm = new HtmlGenericControl("level");
            newUserPerm.Attributes.Add("content", SessionManager.Current.ID.Equals("7") ? "7" : SessionManager.Current.PermID);
            Page.Header.Controls.Add(newUserPerm);

            // show user name
            this.lblAdminName.Text = SessionManager.Current.Name;
            linkEditMe.HRef = string.Format(ResolveUrl("UsersAddEdit.aspx?userId={0}"), SessionManager.Current.ID);

            // hide all menus for america members
            // gulf auto members
            if (permissionID == 3)
            {
                // top notifications
                // hide right menu
                // prevent edit
                noti1.Visible = noti2.Visible = this.sidebar.Visible = this.linkEditMe.Visible = false;

                // hide home notifications window
                var sb = new System.Text.StringBuilder();
                sb.Append("<script language='javascript'>americaDeptView();</script>");
                Page.ClientScript.RegisterStartupScript(this.GetType(), "Script", sb.ToString(), false);
            }
        }
        else
        {
            string url = ResolveClientUrl("default.aspx");
            Server.Transfer(url, false);
        }
    }

    protected object LoadPageStateFromPersistenceMedium()
    {
        return null;
    }
    protected void SavePageStateToPersistenceMedium(object state)
    { }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            CheckUserLogin();
        }
    }
    #endregion
}