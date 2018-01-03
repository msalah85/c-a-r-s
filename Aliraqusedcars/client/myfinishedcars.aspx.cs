using Aliraqusedcars;
using System.Web.Services;
using IraqCars.Business.Business;

public partial class myfinishedcars : FactshMasterPage
{
    #region "approve canceled invoices by the client"

    [WebMethod]
    public static object GetDataDirect()
    {
        string actionName = "CarSaleInvoices_CancelNonApprovedList";
        string[] names = { "ID" },
            values = { SessionManager.Current.ID };

        var _ds = new Select().SelectLists(actionName, names, values);
        return _ds.GetXml();
    }

    [WebMethod]
    public static object saveClientApprove(string ids)
    {
        string actionName = "CarSaleInvoices_CancelClientApprove";
        string[] names = { "ip", "IDS" },
            values = { SessionManager.Current.IP, ids };
        
        var _saved = new Save().SaveRow(actionName, names, values);
        
        return _saved.Rows;
    }

    #endregion
}