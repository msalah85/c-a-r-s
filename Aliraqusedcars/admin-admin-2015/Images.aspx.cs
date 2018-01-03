using System;
using System.Collections.Generic;
using System.Linq;

public partial class ProjectImages : FactshMasterPage
{
    #region "Event Handler"

    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["id"] != null)
        {
            carId.Value = Request.QueryString["id"];
            //divTitle.InnerHtml += " رقم : " + carId.Value;
            //Page.Title += "للسيارة رقم: " + carId.Value;
            //ShareCar.HRef += carId.Value;
        }
    }
    #endregion
}