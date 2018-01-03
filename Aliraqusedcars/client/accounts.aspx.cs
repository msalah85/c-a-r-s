using IraqCars.Business.Business;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class client_accounts : System.Web.UI.Page
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object Childs()
    {
        string[,] _params = { { "ID", SessionManager.Current.MasterAccountID } };
        var _ds = new Select().SelectLists("ClientsMasterChilds_List", _params); // get all of data.

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

    [WebMethod]
    public static object Open(string id, string name, string masterId)
    {
        var _user = new LoginModel
        {
            ID = id,
            Name = name,
            PermID = "4", // client level
            MasterAccountID = masterId
        };

        IdentityHelper.SignIn(_user);
        return true;
    }
}