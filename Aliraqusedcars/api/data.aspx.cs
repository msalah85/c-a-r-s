//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================

using System;
using System.Linq;
using System.Web;
using System.Web.Services;
using IraqCars.Business.Business;
using System.Web.Script.Services;
using IraqCars.Business.DataUtility;
using System.IO;
using System.Collections;
using NumberToWord;
using System.Net;
using Aliraqusedcars;

public partial class api_data : System.Web.UI.Page
{
    #region "Get General Data"

    [WebMethod]
    public static string GetPagedList(string pageIndex, string pageSize, string actionName) // create filter parameters
    {
        string[,] _params = { { "PageIndex", pageIndex }, { "PageSize", pageSize } }; // create filter parameters

        var _ds = new Select().SelectPagedLists(actionName, _params); // get all of data.
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadDataTables()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          

        // create filter parameters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch}, {"SortColumn", sortColumnIndex.ToString()}, {"SortDirection", sortDirection}};

        // get all of data.
        var _ds = new Select().SelectLists(Context.Request["funName"], _params);

        // enhance data to be list.
        var rows = DataUtilities.ConvertDTToList(_ds.Tables[0]);

        var data = new
        {
            param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows.ToList()
        };

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadDataTablesXML()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;

        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"] ?? "desc"; // asc or desc

        // grid static parameters
        string[] names = { "DisplayStart", "DisplayLength", "SortColumn", "SortDirection", "SearchParam" },
                 values = { param.iDisplayStart.ToString(), param.iDisplayLength.ToString(), sortColumnIndex.ToString(), sortDirection, param.sSearch },

        // get dynamic more parameters from user
        addtionNames = string.IsNullOrEmpty(Context.Request["names"]) ? new string[0] : Context.Request["names"].Split('~'),
        addtionValues = string.IsNullOrEmpty(Context.Request["values"]) ? new string[0] : Context.Request["values"].Split('~'),

        // merge all parameters (union)
        namesAll = names.Concat(addtionNames).ToArray(),
        valuesAll = values.Concat(addtionValues).ToArray();

        // get all of data.
        var _ds = new Select().SelectLists(Context.Request["funName"], namesAll, valuesAll);

        // return data as xml        
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetData(string actionName, string value)
    {
        string[,] _params = { { "Id", value } }; // create filter parameters

        var _ds = new Select().SelectLists(actionName, _params); // get all of data.        
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetDataDirect(string actionName)
    {
        var _ds = new Select().SelectLists(actionName); // get all of data.
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetDataList(string actionName, string[] names, string[] values)
    {
        var _ds = new Select().SelectLists(actionName, names, values); // get all of data.        
        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object saveData(string actionName, string[] names, string[] values)
    {
        var saved = new Save().SaveRow(actionName, names, values); // start save data.
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
            data = new { ID = 0, status = false, message = Resources.Resource_ar.ErrorSave };
        }

        return data;
    }


    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object saveDataByUser(string actionName, string[] names, string[] values, bool setUserIP = false) //, string ipPrefix = "")
    {
        // add new two fields UserID & IP with their values.
        if (setUserIP)
        {
            names = (names ?? Enumerable.Empty<string>()).Concat(new[] { "UserID", "IP" }).ToArray();
            values = (values ?? Enumerable.Empty<string>()).Concat(new[] { SessionManager.Current.ID, SessionManager.Current.IP }).ToArray();
        }

        // start save data.
        var saved = new Save().SaveRow(actionName, names, values);
        object data = new { };

        if (saved.Rows>0)
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
            data = new { ID = 0, status = false, message = Resources.Resource_ar.ErrorSave };
        }

        return saved;
    }

    #endregion

    #region "Profile"

    [WebMethod]
    public static object GetProfile()
    {
        string[,] _params = { { "ClientID", SessionManager.Current.ID } }; // create filter parameters
        var _ds = new Select().SelectLists("Clients_SelectRow", _params); // get all of data.        
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }

    #endregion

    #region "Clients Login"

    [WebMethod(EnableSession = true)]
    public static object login(string text1, string text2)
    {
        // create filter parameters
        string[,] _params = { { "Username", text1 }, { "Password", text2 } };
        var _ds = new Select().SelectLists("Clients_Login", _params); // get all of data.
        var dt = _ds.Tables[0];

        object result = new { Status = false, Name = "", Childs = 0 };
        if (dt.Rows.Count > 0)
        {
            var _user = new LoginModel
            {
                ID = string.Format("{0}", dt.Rows[0][0]),
                Name = string.Format("{0}", dt.Rows[0][1]),
                PermID = "4", // client level
                MasterAccountID = "0"
            };

            int _childsCount = string.IsNullOrEmpty(string.Format("{0}", dt.Rows[0][2])) ? 0 : Convert.ToInt32(dt.Rows[0][2]);
            if (_childsCount > 0) // set master Id
            {
                _user.MasterAccountID = _user.ID;
            }

            IdentityHelper.SignIn(_user);

            result = new
            {
                Status = true,
                Name = _user.Name,
                Childs = _childsCount
            };
        }

        return result;
    }

    [WebMethod(EnableSession = true)]
    public static object checklogin()
    {
        return new { Name = SessionManager.Current.PermID.Equals("4") ? SessionManager.Current.Name : "" };
    }

    [WebMethod]
    public static object forgetpassword(string email)
    {
        string[,] _params = { { "Email", email } };
        var _ds = new Select().SelectLists("Clients_Password", _params); // get all of data.
        var dt = _ds.Tables[0];
        var result = new { Status = false };

        if (dt.Rows.Count > 0)
        {
            string name = string.Format("{0}", dt.Rows[0][0]),
                   pass = string.Format("{0}", dt.Rows[0][1]),
                   full = string.Format("{0}", dt.Rows[0][2]);

            // recover pass
            var mail = new SendEmail();
            var _body = new api_data().CreateEmailStr(name, pass, full);
            var checkSent = mail.SendAnEmail("Iraqusedcar@gmail.com", email, Resources.Resource_ar.PasswordForget, _body);

            result = new
            {
                Status = checkSent,
            };
        }

        return result;
    }

    public string CreateEmailStr(string Name, string pass, string full)
    {
        string strBody = new SendEmail().ReadTemplate(Server.MapPath("~/Templates/password.html"));
        strBody = strBody.Replace("@@Username@@", Name);
        strBody = strBody.Replace("@@Password@@", pass);
        strBody = strBody.Replace("@@Full@@", full);

        return strBody;
    }

    [WebMethod]
    public static object SendFriend(string[] values)
    {
        string name = string.Format("{0}", values[0]),
               email = string.Format("{0}", values[1]),
               comment = string.Format("{0}", values[2]),
               id = string.Format("{0}", values[3]),
               img = string.Format("{0}", values[4]),
               car = string.Format("{0}", values[5]);

        // recover pass
        var mail = new SendEmail();
        var _body = new api_data().CreateEmailFriend(name, id, car, img, comment);
        var checkSent = mail.SendAnEmail("Iraqusedcar@gmail.com", email, Resources.Resource_ar.FriendMail, _body);

        var result = new
        {
            Status = checkSent,
        };
        return result;
    }

    private string CreateEmailFriend(string name, string id, string car, string img, string comment)
    {
        string strBody = new SendEmail().ReadTemplate(Server.MapPath("~/Templates/sendcar.html"));
        strBody = strBody.Replace("@@Name@@", name);
        strBody = strBody.Replace("@@ID@@", id);
        strBody = strBody.Replace("@@Car@@", car.Replace(" ", "-"));
        strBody = strBody.Replace("@@IMG@@", img);
        strBody = strBody.Replace("@@Comment@@", comment);

        return strBody;
    }

    #endregion

    #region "Home Methods"

    [WebMethod]
    public static string GetHomeList(string pageIndex, string maker, string type)
    {
        // create filter parameters
        string actionName = "SiteGetHomeCars";
        string[,] _params = { { "PageIndex", pageIndex }, { "Maker", maker }, { "PageSize", "6" }, { "Type", type } };

        // get all of data.
        var _ds = new Select().SelectPagedList(actionName, _params);
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }

    #endregion

    #region "Payments"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadPayments()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;

        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          

        // create filter parameters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()},
                                {"DisplayLength", param.iDisplayLength.ToString()},
                                {"SortColumn", sortColumnIndex.ToString()},
                                {"SortDirection", sortDirection},
                                {"ClientID", SessionManager.Current.ID}};

        // get all of data.
        var _ds = new Select().SelectLists("ClientsPayments_SelectList", _params);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows.ToList()
        };

        return data;
    }

    [WebMethod] // datatables cars control
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadCars()
    {
        var param = new jQueryDataTableParamModel();
        var Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];
        var finished = Context.Request["finish"] ?? "0";

        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? null : Context.Request["sSearch"];

        // create filter parameters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()},
                             {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch}, {"SortColumn", sortColumnIndex.ToString()},
                             {"SortDirection", sortDirection}, {"ClientID", SessionManager.Current.ID},
                             {"IsDone", finished}};

        // get all of data.
        var _ds = new Select().SelectLists("ClientCars_SelectList", _params);
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }

    [WebMethod] // datatables cars control
    [ScriptMethod(UseHttpGet = true)]
    public static object ClientCars4Sale()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];

        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];

        // create filter parameters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()},
                             {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch}, {"SortColumn", sortColumnIndex.ToString()},
                             {"SortDirection", sortDirection}, {"ClientID", SessionManager.Current.ID}};

        // get all of data.
        var _ds = new Select().SelectLists("ClientCars_SelectList4Sale", _params);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(_ds.Tables[0]);

        var data = new
        {
            param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows.ToList()
        };

        return data;
    }

    #endregion

    #region "Car Images"
    [WebMethod] // car images
    public static ArrayList ShowCarImages(string id)
    {
        var context = HttpContext.Current;
        var dir = new DirectoryInfo(context.Server.MapPath(string.Format("~/public/cars/{0}/", id)));
        var imgs = new ArrayList();

        if (dir.Exists)
        {
            var files = dir.GetFiles();
            for (int i = 0; i < files.Length; i++)
            {
                imgs.Add(files[i].Name);
            }
        }
        return imgs;
    }

    #endregion

    #region "Search Cars"
    [WebMethod]
    public static string GetCarsList(string[] param, string[] values)
    {
        // get all of data.
        var _ds = new Select().SelectPagedList("SiteSearchCars", param, values);
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }

    #endregion

    #region "Decrypt pass"

    [WebMethod]
    public static string decryptPassword(string value)
    {
        return EncryptDecryptString.Decrypt(value, "Taj$$Key");
    }

    #endregion

    #region "In-line edit"

    [WebMethod]
    public static String InlineEdit(string name, string value, string pk, string table, string id)
    {
        // enhance value
        value = value.Replace("'", " ");
        var isNumeric = !string.IsNullOrEmpty(value) && value.Replace(".", "").All(Char.IsDigit);
        if (!isNumeric)
        {
            value = string.Format("N'{0}'", value);
        }

        // generate update sql string
        string sqlStr = string.Format("Update {0} SET {1}={2} WHERE {3}={4}", table, name, value, id, pk);
        var d = new Save().RunSQLString(sqlStr);

        //access params here
        return "تم الحفظ بنجاح.";
    }

    #endregion

    #region "Change money number to Ar words"

    [WebMethod]
    public static string Money2Arabic(decimal amount, int dollarDirham)
    {

        var dollarType = dollarDirham == 1 ? new CurrencyInfo(CurrencyInfo.Currencies.Dollar) : new CurrencyInfo(CurrencyInfo.Currencies.UAE);

        var toWord = new ToWord(amount, dollarType);
        return toWord.ConvertToArabic();
    }

    #endregion

    #region "instance search select2"

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object getSelect2(string fnName, string pageNum, string pageSize, string searchTerm, string names, string values)
    {
        // grid static parameters
        string[] defaultNames = { "pageNum", "pageSize", "key" },
                 defaultValues = { pageNum, pageSize, searchTerm },


        // get dynamic more parameters from user
        addtionNames = string.IsNullOrEmpty(names) ? new string[0] : names.Split('~'),
        addtionValues = string.IsNullOrEmpty(values) ? new string[0] : values.Split('~'),


        // merge all parameters (union)
        namesAll = defaultNames.Concat(addtionNames).ToArray(),
        valuesAll = defaultValues.Concat(addtionValues).ToArray();


        var _ds = new Select().SelectLists(fnName, namesAll, valuesAll);
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }


    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object getWebPage(string url)
    {
        string htmlPage = "";

        #region "read web page"
        ServicePointManager.Expect100Continue = true;
        ServicePointManager.DefaultConnectionLimit = 9999;
        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12 | SecurityProtocolType.Ssl3;
        using (var client = new WebClient())
        {
            using (Stream data = client.OpenRead(url))
            {
                using (var reader = new StreamReader(data))
                {
                    htmlPage = reader.ReadToEnd();
                }
            }
        }
        return LZStringUpdated.compressToUTF16(htmlPage);

        #endregion
    }
    #endregion

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static string ClientDT()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;

        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"] ?? "desc"; // asc or desc

        // grid static parameters
        string[] names = { "DisplayStart", "DisplayLength", "SortColumn", "SortDirection", "SearchParam", "ClientID" },
                 values = { param.iDisplayStart.ToString(), param.iDisplayLength.ToString(), sortColumnIndex.ToString(),
                            sortDirection, param.sSearch, SessionManager.Current.ID },

        // get dynamic more parameters from user
        addtionNames = string.IsNullOrEmpty(Context.Request["names"]) ? new string[0] : Context.Request["names"].Split('~'),
        addtionValues = string.IsNullOrEmpty(Context.Request["values"]) ? new string[0] : Context.Request["values"].Split('~'),

        // merge all parameters (union)
        namesAll = names.Concat(addtionNames).ToArray(),
        valuesAll = values.Concat(addtionValues).ToArray();

        // get all of data.
        var _ds = new Select().SelectLists(Context.Request["funName"], namesAll, valuesAll);

        // return data as xml        
        string compressedXML = TrimmerUtil.RemoveSpaces(_ds.GetXml());
        return LZStringUpdated.compressToUTF16(compressedXML);
    }
}