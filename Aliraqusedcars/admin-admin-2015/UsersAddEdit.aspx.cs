using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using Minutesuae.SystemUtilities;
using System.Text;
using Minutesuae.AlIraq;

public partial class Iraq_UsersAddEdit : Page
{
    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            FillLists.GetJos(JobID); // jobs

            if (Request.QueryString["userId"] != null)
            {
                UserID.Value = string.IsNullOrEmpty(Request.QueryString["userId"]) ? "0" : Request.QueryString["userId"];
                int Id = Convert.ToInt32(UserID.Value);
                ShowUserInformation(Id);
            }
        }
    }
    #endregion

    #region "Save Methods"

    private void ShowUserInformation(int Id)
    {
        var result = new UsersManager().GetUsers(Id);

        if (result != null)
        {
            Email.Text = result.Email;
            UserFullName.Text = result.UserFullName;
            Phone.Text = result.Phone;
            Mobile.Text = result.Mobile;
            Nationality.Text = result.Nationality;
            Username.Text = result.Username;
            EmpID.Text = result.EmpID;
            JobID.SelectedValue = string.Format("{0}", result.JobID);
            JoinDate.Text = string.Format("{0:dd/MM/yyyy}", result.JoinDate);
            IsActive.Checked = (bool)result.IsActive;
            Password.Text = EncryptDecryptString.Decrypt(result.Password, "Taj$$Key");

            if (!string.IsNullOrEmpty(result.Sig))
            {
                sig.InnerHtml = result.Sig;
                clear.Visible = SaveSignature.Visible = false;
            }
        }
    }

    protected void DisableControls(Control parent, bool State)
    {
        foreach (Control c in parent.Controls)
        {
            if (c is DropDownList)
                ((DropDownList)(c)).Enabled = State;
            else if (c is TextBox)
                ((TextBox)(c)).Enabled = State;

            DisableControls(c, State);
        }
    }
    #endregion
}