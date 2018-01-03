using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.Xml;
using Aliraqusedcars;

public partial class PayInvoicePaymentDetails : FactshMasterPage
{
    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetCustomspaymentsmaster()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);

        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        SqlCommand command = DataAccess.CreateCommand();
        command.CommandText = "Customspaymentsmaster_SelectList";
        try
        {
            command.Connection.Open();
            command.Parameters.AddWithValue("@DisplayStart", param.iDisplayStart);
            command.Parameters.AddWithValue("@DisplayLength", param.iDisplayLength);
            command.Parameters.AddWithValue("@SearchParam", param.sSearch);
            command.Parameters.AddWithValue("@SortColumn", sortColumnIndex);
            command.Parameters.AddWithValue("@SortDirection", sortDirection);
            SqlDataAdapter adp = new SqlDataAdapter(command);
            DataSet ds = new DataSet();
            adp.Fill(ds);
            command.Connection.Close();
            var rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            DataTable dt = ds.Tables[0];
            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            var data = new
            {
                sEcho = param.sEcho,
                iTotalRecords = ds.Tables[1].Rows[0][0],
                iTotalDisplayRecords = ds.Tables[1].Rows[0][0],
                aaData = rows.ToList()
            };

            return data;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    /// <summary>
    /// Action that updates data
    /// </summary>
    /// <param name="id">Id of the record</param>
    /// <param name="value">Value that shoudl be set</param>
    /// <param name="rowId">Id of the row</param>
    /// <param name="columnPosition">Position of the column(hidden columns are not counted)</param>
    /// <param name="columnId">Position of the column(hidden columns are counted)</param>
    /// <param name="columnName">Name of the column</param>
    /// <returns>value if update suceed - any other value will be considered as an error message on the client-side</returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetCaresDate(string value)
    {
        object data = new { };
        var rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        try
        {
            SqlCommand command = DataAccess.CreateCommandText();
            command.CommandText = string.Format("select ChassisNo,CarID, PayPrice from CarsData where LotNo='{0}'", value);
            command.Connection.Open();
            SqlDataAdapter adp = new SqlDataAdapter(command);
            DataSet ds = new DataSet();
            adp.Fill(ds);
            command.Connection.Close();

            for (int i = 0; i < ds.Tables.Count; i++)
            {
                DataTable dt = ds.Tables[i];
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    rows.Add(row);
                }
            }

            //  return rows.ToList();
            var serializer = new JavaScriptSerializer();
            var serializedResult = serializer.Serialize(rows);
            return serializedResult;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveDataMasterDetails(string[] values, string actionName, string[] Parm_names, string[] fieldsDetails, string[] valuesDetails, string[] fieldsDetails2, string[] valuesDetails2, string flage)
    {
        XmlDocument xmldoc = new XmlDocument();
        XmlElement doc = xmldoc.CreateElement("doc");
        xmldoc.AppendChild(doc);
        XmlElement xmlelement = xmldoc.CreateElement("Master");
        doc.AppendChild(xmlelement);

        for (int i = 0; i < values.Length; i++)
        {
            xmlelement.SetAttribute(Parm_names[i], values[i]);
        }
        if (flage == "1")
        {
            xmlelement.SetAttribute("UserId", SessionManager.Current.ID);
            xmlelement.SetAttribute("IP", SessionManager.Current.IP);
        }

        for (int i = 0; i < valuesDetails.Length; i++)
        {
            XmlElement xmlelementDetails = xmldoc.CreateElement("Details");
            doc.AppendChild(xmlelementDetails);
            xmlelementDetails.SetAttribute(Parm_names[0], values[0]);


            if (valuesDetails[0].Contains("لاتوجــد بيانات متاحة"))
            {
                for (int j = 0; j < fieldsDetails.Length; j++)
                {
                    xmlelementDetails.SetAttribute(fieldsDetails[j], "");
                }
            }
            else
            {
                for (int j = 0; j < fieldsDetails.Length; j++)
                {
                    string[] dataes = valuesDetails[i].Split(',');
                    xmlelementDetails.SetAttribute(fieldsDetails[j], dataes[j]);
                }
            }

        }
        for (int i = 0; i < valuesDetails2.Length; i++)
        {
            XmlElement xmlelementDetails = xmldoc.CreateElement("Details2");
            doc.AppendChild(xmlelementDetails);
            xmlelementDetails.SetAttribute(Parm_names[0], values[0]);
            if (valuesDetails2[0].Contains("لاتوجــد بيانات متاحة"))
            {
                for (int j = 0; j < fieldsDetails2.Length; j++)
                {
                    xmlelementDetails.SetAttribute(fieldsDetails2[j], "");
                }
            }
            else
            {
                for (int j = 0; j < fieldsDetails2.Length; j++)
                {
                    string[] dataes = valuesDetails2[i].Split(',');
                    xmlelementDetails.SetAttribute(fieldsDetails2[j], dataes[j]);
                }
            }
        }
        object data = new { };
        SqlCommand command = DataAccess.CreateCommand();
        try
        {
            command.CommandText = actionName;
            command.Parameters.AddWithValue("@doc", xmldoc.OuterXml);
            var returnParameter = command.Parameters.Add("RetVal", SqlDbType.Int);
            returnParameter.Direction = ParameterDirection.ReturnValue;

            int result = -1;
            command.Connection.Open();
            result = command.ExecuteNonQuery();

            if (result > -1)
            {
                data = new
                {
                    ID = returnParameter.Value,
                    Status = true,
                    message = "تم حفظ البيانات بنجاح."
                };
            }
            else
            {
                data = new
                {
                    ID = -1,
                    Status = true,
                    message = "لم يتم حفظ البيانات. برجاء الاتصال بالادارة."
                };
            }
        }
        catch (Exception ex)
        {
            data = new { ID = 0, status = false, message = ex.Message };
        }
        finally
        {
            command.Connection.Close();
        }
        return data;
    }
    #endregion
}