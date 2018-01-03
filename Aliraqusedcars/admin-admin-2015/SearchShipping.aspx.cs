using Aliraqcars.Domain.Business;
using System;
using Aliraqusedcars;

public partial class SearchShipping : FactshMasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            var key = Request.QueryString["key"];
            var keyID = Request.QueryString["kid"] ?? "ShippInvoiceID";

            if (!string.IsNullOrEmpty(key))
                ShowPageContent(key, keyID);
        }
    }

    private void ShowPageContent(string searchKey, string searchID)
    {
        // create filter paramters
        string filterStr = string.Format("AND InvoiceNo <> '' AND InvoiceDate IS NOT NULL AND ({1} LIKE '%{0}%')", searchKey, searchID);

        gvItems.DataSource = new ShippInvoiceManager().GetShippInvoice(filterStr);
        gvItems.DataBind();

        GridViewUtility.SetHeaderFooter(gvItems);
    }
}