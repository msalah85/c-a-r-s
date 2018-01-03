using Aliraqusedcars;
using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;

public partial class admin_admin_2015_master_Mobile : System.Web.UI.MasterPage
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
