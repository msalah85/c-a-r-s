using System;
using System.Web;
using System.Data.SqlClient;
using Aliraqcars.Domain.Business;
using Aliraqcars.Domain.Data;
using System.Web.Services;
using System.Web.Script.Services;
using Minutesuae.SystemUtilities;
using System.Xml;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class Clients : FactshMasterPage
{
    #region "Page Methods"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 50 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc
        
        var finished = Context.Request["type"];
        var client = Context.Request["client"] ?? null;
        var ClientChar = Context.Request["client_char"] ?? null;

        // filter by client select on page top search box.
        if (string.IsNullOrEmpty(param.sSearch) && !string.IsNullOrEmpty(client))
        {
            param.sSearch = client; finished = "2";
        }

        // filter by client first character on page top search bar.
        if (string.IsNullOrEmpty(param.sSearch) && !string.IsNullOrEmpty(ClientChar))
        {
            param.sSearch = ClientChar; finished = "2";
        }

        // create filter parameters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch}, {"SortColumn", sortColumnIndex.ToString()}, {"SortDirection", sortDirection}, {"Finished", finished}};

        // get all of data.
        var _ds = new Select().SelectLists("Clients_SelectList", _params);

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveClient(Client scParam, string masterId)
    {
        object data = new { };

        Client item = new Client() { ClientID = scParam.ClientID, full_name = scParam.full_name, phone = scParam.phone, phone2 = scParam.phone2, user_name = scParam.user_name, user_password = scParam.user_password, countryCode = scParam.countryCode, countryCode2 = scParam.countryCode2, user_type = scParam.user_type, send_sms = scParam.send_sms, active = true, send_email = true, date_entered = DateTime.UtcNow, Notes = scParam.Notes };

        int? masterID = string.IsNullOrEmpty(masterId) ? null : (Int32?)Convert.ToInt32(masterId);

        int savedID = new ClientsManager().SaveItem(item, masterID);

        if ((item.full_name != null && item.user_name != null) || savedID > 0)
        {
            data = new
            {
                Status = true,
                Id = savedID,
                Message = Resources.AdminResources_ar.SuccessSave
            };
        }
        else
            data = new { Status = false, Message = Resources.AdminResources_ar.ErrorSave, Id = 0 };


        return data;
    }


    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static string GetUsername()
    {
        return string.Format("{0}_{1}", RandomValues.RandomString(6, false), RandomValues.RandomNumber(111, 9999));
    }


    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveDataMasterDetails(string[] valuesDetails)
    {
        XmlDocument xmldoc = new XmlDocument();
        XmlElement doc = xmldoc.CreateElement("doc");

        for (int i = 0; i < valuesDetails.Length; i++)
        {
            xmldoc.AppendChild(doc);
            string[] fieldsDetails = { "ClientID", "DistinationID", "CommissionCash", "CommissionCredit", "ExtraCash", "ExtraCredit", "AddCarCosts", "CommTypeID" };
            XmlElement xmlelementDetails = xmldoc.CreateElement("Details");
            doc.AppendChild(xmlelementDetails);

            for (int j = 0; j < fieldsDetails.Length; j++)
            {
                string[] dataes = valuesDetails[i].Split(',');
                xmlelementDetails.SetAttribute(fieldsDetails[j], (dataes[j] == "undefined" ? null : dataes[j]));
            }
        }
        object data = new { };
        SqlCommand command = DataAccess.CreateCommand();

        try
        {
            command.CommandText = "ClientCommissons_Save";
            command.Parameters.AddWithValue("@doc", xmldoc.OuterXml);

            int result = -1;
            command.Connection.Open();
            if (valuesDetails.Length > 0)
                result = command.ExecuteNonQuery();
            if (result != -1)
            {
                data = new
                {
                    Status = true,
                    Message = "تم حفظ البيانات بنجاح."
                };
            }
        }
        catch (Exception ex)
        {
            data = new { status = false, Message = ex.Message };
        }
        finally
        {
            command.Connection.Close();
        }
        return data;
    }

    #endregion

    #region "search client"

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object searchGetClients(string searchTerm, string pageSize, string pageNum)
    {
        string[,] _params = { { "pageSize", pageSize }, { "key", searchTerm }, { "pageNum", pageNum } };

        var _ds = new Select().SelectLists("Clients_SelectNames3", _params);

        var rows = DataUtilities.ConvertDTToJson(_ds.Tables[0]);

        var data = new
        {
            Total = _ds.Tables[1].Rows[0][0],
            Results = rows
        };

        return data;
    }

    #endregion

    #region "search client cars"

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object searchClientCars(string searchTerm, string pageSize, string pageNum, string clientId)
    {
        string[,] _params = { { "pageSize", pageSize }, { "key", searchTerm }, { "pageNum", pageNum }, { "ClientID", clientId } };

        var _ds = new Select().SelectLists("ClientCars_GetBySearch", _params);

        var rows = DataUtilities.ConvertDTToJson(_ds.Tables[0]);

        var data = new
        {
            Total = _ds.Tables[1].Rows[0][0],
            Results = rows
        };

        return data;
    }

    #endregion
}