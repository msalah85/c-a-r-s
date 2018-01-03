using IraqCars.Business.Business;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class admin_admin_2015_ClientPaymentsReview : System.Web.UI.Page
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object saveData(string actionName, string[] names, string[] values)
    {
        values[7] = SessionManager.Current.IP;
        values[8] = SessionManager.Current.ID;

        // start save data.
        var saved = new Save().SaveRow(actionName, names, values);
        object data = new { };

        if (saved.Rows > 0)
        {
            data = new
            {
                ID = saved.ReturnedID,
                Status = true,
                message = Resources.Resource_ar.SuccessSave
            };
        }
        else
        {
            data = new { ID = 0, Status = false, message = Resources.Resource_ar.ErrorSave };
        }

        return data;
    }
}