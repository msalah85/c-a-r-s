using Aliraqcars.Domain.Business;
using System;
using Aliraqusedcars;

public partial class SearchSales : FactshMasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            var key = Request.QueryString["key"];
            var keyID = Request.QueryString["kid"] ?? "SaleInvoiceID";

            if (!string.IsNullOrEmpty(key))
                ShowPageContent(key, keyID);
        }
    }

    private void ShowPageContent(string searchKey, string searchID)
    {
        // create filter paramters
        string filterStr = string.Format("AND ({1} = '{0}')", searchKey, searchID);

        gvItems.DataSource = new CarsSaleInvoiceManager().GetCarSaleInvoice(filterStr);
        gvItems.DataBind();

        GridViewUtility.SetHeaderFooter(gvItems);
    }
}