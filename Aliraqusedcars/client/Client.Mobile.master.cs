using System;
using Aliraqusedcars;

public partial class client_Client_Mobile : System.Web.UI.MasterPage
{
    protected object LoadPageStateFromPersistenceMedium()
    {
        return null;
    }
    protected void SavePageStateToPersistenceMedium(object state)
    { }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!SessionManager.Current.PermID.Equals("4") || SessionManager.Current.ID.Equals("0"))
            Response.Redirect("/login");
    }
}