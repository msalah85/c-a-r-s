using IraqCars.Business.Business;
using System;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using Aliraqusedcars;
using Settings;

public partial class admin_admin_2015_america_car_notes : Page
{
    void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (SessionManager.Current.ID.Equals("19"))
                Response.RedirectPermanent("carnotesen.aspx");
        }
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetNotes(string actionName, string id)
    {
        // create filter parameters
        string[,] _params = { { "CarID", id }, { "ToUserID", SessionManager.Current.ID } };

        // get all of data.
        var _ds = new Select().SelectLists(actionName, _params);

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetNoteNotifications()
    {
        // create filter parameters
        string[,] _params = { { "ToUserID", SessionManager.Current.ID } };

        // get all of data.
        var _ds = new Select().SelectLists("CarNotes_Notifications", _params);

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetNotificationsNotes()
    {
        // create filter parameters
        string[,] _params = { { "ToUserID", SessionManager.Current.ID } };

        // get all of data.
        var _ds = new Select().SelectLists("CarNotes_NotificationsList", _params);

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object ReplyNote(string carId, string toID, string note, string file, bool isSelf = false)
    {
        // should login first
        if (SessionManager.Current.ID.Equals("0"))
        {
            return null;
        }

        string isReaded = "0";

        // send note to the same sender user.
        if (isSelf)
        {
            toID = "1"; // uae group
            isReaded = "1";
        }


        string[] names = { "CarID", "UserID", "ToGroupID", "Notes", "FileUrl", "Read" },
                 values = { carId, SessionManager.Current.ID, toID, note, file, isReaded };


        var saved = new Select().SelectLists("CarNotes_Save", names, values);
        return LZStringUpdated.compressToUTF16(saved.GetXml());
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object CloseNote(string carid)
    {
        string[] names = { "CarID" }, values = { carid };
        var saved = new Save().SaveRow("CarNotes_CloseAll", names, values);

        return saved.Rows;
    }
}