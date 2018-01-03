using System.Web.UI;
using System.Web.Services;
using IraqCars.Business.Business;

public partial class PayInvoicePaymentsPrint : Page
{
    #region "Inline edit"

    [WebMethod]
    public static object savePayNo(string fnName, string no, string date, string pk)
    {
        string[] names = { "ID", "No", "Date" }, values = { pk, no, date };

        // start save data.
        var saved = new Save().SaveRow(fnName, names, values);
        object result = new { };

        if (saved.Rows > 0)
        {
            result = new
            {
                ID = saved.ReturnedID,
                Status = true,
                message = Resources.Resource_ar.SuccessSave
            };
        }
        else
        {
            result = new { ID = 0, status = false, message = Resources.Resource_ar.ErrorSave };
        }

        return result;
    }

    #endregion
}