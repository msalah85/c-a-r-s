using System;
using System.Web;
using System.Web.UI.WebControls;
using Aliraqcars.Domain.Business;
using System.Web.Services;
using System.Web.Script.Services;
using IraqCars.Business.Business;
using Aliraqusedcars;

public partial class ETA_UsersView : FactshMasterPage
{
    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!this.IsPostBack)
        {
            FillUsersList();

            // Show alert if data saved
            if (Request.QueryString["action"] != null)
            {
                divError.CssClass = "alert alert-block alert-success"; divError.Visible = true;
                lblError.Text = Resources.AdminResources_ar.SuccessSave;
            }
            // AssignControlsForLevel
            //AssignControlsForLevel(SessionManager.Current.LevelID);
        }

        GridViewUtility.SetHeaderFooter(gvUsers);
    }
    protected void gvUsers_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gvUsers.PageIndex = e.NewPageIndex;
        FillUsersList();
    }
    protected void gvUsers_RowCommand(object sender, GridViewCommandEventArgs e)
    {
        if (e.CommandName == "Delete")
        {
            // Get id to delete.
            int _ID = Convert.ToInt32(e.CommandArgument);
            DeleteOne(_ID);
        }
    }

    protected void gvUsers_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        FillUsersList();
    }
    protected void btnSearch_Click(object sender, EventArgs e)
    {
        FillUsersList();
    }

    #endregion

    #region "Private Methods"

    private void FillUsersList()
    {
        gvUsers.DataSource = new UsersManager().GetUsers("");
        gvUsers.DataBind();
    }

    private void DeleteOne(int _ID)
    {
        // Execute delete func.
        int count = new UsersManager().DeleteUser(_ID);

        if (count > 0)
        {
            lblError.Text = Resources.AdminResources_ar.SuccessDelete; divError.CssClass = "alert alert-block alert-success"; divError.Visible = true;
            FillUsersList();
            Page_Load(this.Page, new EventArgs());
        }
        else if (count == 0)
        { lblError.Text = Resources.AdminResources_ar.ErrorHasChilds; divError.CssClass = "alert alert-block alert-warning"; divError.Visible = true; }
        else
        { lblError.Text = Resources.AdminResources_ar.ErrorDelete; divError.CssClass = "alert alert-block alert-danger"; divError.Visible = true; }
    }

    private void AssignControlsForLevel(int userLevel)
    {
        btnAddNew.Visible = (userLevel == 1);
    }


    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetData()//string id)
    {
        HttpContext Context = HttpContext.Current;
        var id = Context.Request["id"];

        // create filter paramters
        string[,] _params = { { "Id", id } };

        // get all of data.
        var _ds = new Select().SelectLists("Menus_SelectList", _params);
        return _ds.GetXml();
    }

    #endregion
}