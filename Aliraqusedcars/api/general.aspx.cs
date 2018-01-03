using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Xml;
using System.Collections;
using IraqCars.Business.DataUtility;
using IraqCars.Business.Business;
using Aliraqusedcars;

public partial class API_general : Page
{
    /// <summary>
    /// load data in datatable.net       
    /// 
    /// </summary>       
    /// <returns> object of list data and records count </returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadData()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          
        var command = DataAccess.CreateCommand();
        command.CommandText = Context.Request["funName"];

        // search paramters
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        try
        {
            command.Connection.Open();
            command.Parameters.AddWithValue("@DisplayStart", param.iDisplayStart);
            command.Parameters.AddWithValue("@DisplayLength", param.iDisplayLength);
            command.Parameters.AddWithValue("@SearchParam", param.sSearch);
            command.Parameters.AddWithValue("@SortColumn", sortColumnIndex);
            command.Parameters.AddWithValue("@SortDirection", sortDirection);
            var adp = new SqlDataAdapter(command);
            var ds = new DataSet();
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
            //throw ex;
            object data = new { Message = "خطأ: " + ex.Message };
            return data;
        }
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetData(string actionName, string value)
    {
        var command = DataAccess.CreateCommand();

        try
        {
            command.CommandText = actionName;
            command.Parameters.AddWithValue("@pkId", value);
            command.Connection.Open();
            var adp = new SqlDataAdapter(command);
            var ds = new DataSet();
            adp.Fill(ds);

            var rows = DataUtilities.ConvertDSToList(ds);

            //  return rows.ToList();
            var serializer = new JavaScriptSerializer();
            return serializer.Serialize(rows);
        }
        catch (Exception ex)
        {
            //throw ex;
            return ex.Message;
        }
        finally
        {
            command.Connection.Close();
        }
    }

    /// <summary>
    /// Save data
    /// </summary>
    ///  <param name="values"></param>
    /// <param name="actionName"></param>
    /// <param name="Parm_names"></param>
    /// <returns> object of list data and records count </returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object saveDefaultData(string[] values, string actionName, string[] Parm_names)
    {
        var saved = new Save().SaveRow(actionName, Parm_names, values);
        object data = new { };

        if (saved.ReturnedID != -1)
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
            data = new { ID = 0, status = false, Message = Resources.Resource_ar.ErrorSave };
        }
        return data;
    }

    /// <summary>
    /// save data
    /// </summary>
    ///  <param name="values"></param>
    /// <param name="actionName"></param>
    /// <param name="Parm_names"></param>
    /// <param name="flage"></param>
    /// <returns> object of list data and records count </returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveData(string[] values, string actionName, string[] Parm_names, string flage)
    {
        //string output = "";
        object data = new { };
        var command = DataAccess.CreateCommand();

        try
        {
            command.CommandText = actionName;
            for (int i = 0; i < values.Length; i++)
            {
                if (values[i] == "")
                {
                    command.Parameters.AddWithValue("@" + Parm_names[i], DBNull.Value);
                }
                else
                {
                    command.Parameters.AddWithValue("@" + Parm_names[i], values[i]);
                }
            }

            if (flage.Equals("1"))
            {
                command.Parameters.AddWithValue("@UserId", SessionManager.Current.ID);
                command.Parameters.AddWithValue("@IP", SessionManager.Current.IP);
            }

            var outMsg = new SqlParameter("@outputMessage", SqlDbType.NVarChar);
            outMsg.Size = 100;
            outMsg.Direction = ParameterDirection.Output;

            var returnParameter = command.Parameters.Add("RetVal", SqlDbType.Int);
            returnParameter.Direction = ParameterDirection.ReturnValue;


            command.Parameters.Add(outMsg);

            int result = -1;
            string outputMSG = "";


            command.Connection.Open();
            result = command.ExecuteNonQuery();
            outputMSG = command.Parameters["@outputMessage"].Value.ToString();

            if (result != -1)
            {
                data = new
                {
                    ID = returnParameter.Value,
                    Status = true,
                    message = outputMSG,
                    serializdata = 0
                };
            }
            else
            {
                SqlDataAdapter adp = new SqlDataAdapter(command);
                DataSet ds = new DataSet();
                adp.Fill(ds);
                var rows = new List<Dictionary<string, object>>();
                Dictionary<string, object> row;
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
                data = new { ID = returnParameter.Value, status = false, message = outputMSG, serializdata = serializedResult };
            }
        }
        catch (Exception ex)
        {
            data = new { ID = 0, status = false, message = ex.Message, serializdata = 0 };
        }
        finally
        {
            command.Connection.Close();
        }

        return data;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object load_goalble_list(string funName)
    {
        var rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        try
        {
            var command = DataAccess.CreateCommand();
            command.CommandText = funName;
            command.Connection.Open();
            var adp = new SqlDataAdapter(command);
            var ds = new DataSet();
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
            return serializer.Serialize(rows);

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object Delete_Data(string[] Ids, string ActionName, string[] Parm_name)
    {
        var saved = new Save().SaveRow(ActionName, Parm_name, Ids);
        object data = new { };

        if (saved.Rows > 0)
        {
            data = new
            {
                Status = true,
                message = "تم حذف البيان بنجاح."
            };

            string _cacheName = ActionName.Remove(ActionName.IndexOf('_'));
            HttpContext.Current.Cache.Remove(_cacheName);
        }
        else
        {
            data = new { status = false, message = "لقد حدث خطأ أثناء عملية الحذف" };
        }

        return data;
    }

    [WebMethod]
    public static string LoadUserControl(string filename)
    {
        using (var page = new Page())
        {
            using (var writer = new StringWriter())
            {
                try
                {
                    HttpContext.Current.Server.Execute(filename, writer);
                }
                catch
                {
                    return writer.ToString();
                }
                return writer.ToString();
            }
        }
    }

    /// <summary>
    /// get page properties at load
    /// bind with propcedure name
    /// 
    /// </summary>
    /// <param name="funName"></param>
    /// <returns>DataSet with multiple table</returns>
    [WebMethod]
    public static string[] load_goalble_list_array(string funName)
    {
        string row = "";
        string[] resultes;
        try
        {
            var ds = new Select().SelectLists(funName);

            resultes = new string[ds.Tables.Count];
            for (int i = 0; i < ds.Tables.Count; i++)
            {
                DataTable dt = ds.Tables[i];

                for (int j = 0; j < dt.Rows.Count; j++)
                {
                    row += dt.Rows[j][0] + ":";
                    row += dt.Rows[j][1].ToString();
                    row += ",";

                }
                if (row.Contains(","))
                {
                    row = row.Remove(row.LastIndexOf(','));
                }
                resultes[i] = row;
                row = "";
            }
        }
        catch
        {
            resultes = new string[1];
            resultes[0] = "";
        }

        return resultes;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveDataMasterDetails(string[] values, string actionName, string[] Parm_names, string[] fieldsDetails, string[] valuesDetails, string flage)
    {
        var xmldoc = new XmlDocument();
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

        object data = new { };
        var command = DataAccess.CreateCommand();

        try
        {
            command.CommandText = actionName;
            command.Parameters.AddWithValue("@doc", xmldoc.OuterXml);
            var returnParameter = command.Parameters.Add("RetVal", SqlDbType.Int);
            returnParameter.Direction = ParameterDirection.ReturnValue;

            int result = -1;
            command.Connection.Open();
            result = command.ExecuteNonQuery();
            if (result != -1)
            {
                data = new
                {
                    ID = returnParameter.Value,
                    Status = true,
                    message = "تم حفظ البيانات بنجاح."
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

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object load_goalble_list_Searchfiled(string funName, string searchstr, string fieldid, string fieldname)
    {

        var rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        try
        {
            var command = DataAccess.CreateCommand();
            command.CommandText = "Filllist_data_search";
            command.Parameters.AddWithValue("@SearchParam", searchstr);
            command.Parameters.AddWithValue("@id", fieldid);
            command.Parameters.AddWithValue("@name", fieldname);
            command.Parameters.AddWithValue("@tablename", funName);
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
            //  return rows;

        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static DataTable buffertdt = new DataTable();
    static string idLoad = "";

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadData_Id()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          
        var command = DataAccess.CreateCommand();
        string[] paramtersValues = Context.Request["funName"].Split(',');
        command.CommandText = paramtersValues[0];
        var idValue = paramtersValues[1];
        if (idLoad != "")
        {
            idValue = idLoad;
        }
        var rows = new List<Dictionary<string, object>>();
        try
        {
            command.Connection.Open();
            command.Parameters.AddWithValue("@DisplayStart", param.iDisplayStart);
            command.Parameters.AddWithValue("@DisplayLength", param.iDisplayLength);
            command.Parameters.AddWithValue("@SearchParam", param.sSearch);
            command.Parameters.AddWithValue("@SortColumn", sortColumnIndex);
            command.Parameters.AddWithValue("@SortDirection", sortDirection);
            command.Parameters.AddWithValue("@Id", idValue);
            SqlDataAdapter adp = new SqlDataAdapter(command);
            DataSet ds = new DataSet();
            adp.Fill(ds);
            command.Connection.Close();
            Dictionary<string, object> row;
            DataTable dt;
            if (buffertdt.Rows.Count <= 0)
            {
                dt = ds.Tables[0];
                buffertdt = dt;
            }
            else { dt = buffertdt; }
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
            var data = new
            {
                sEcho = param.sEcho,
                iTotalRecords = 0,
                iTotalDisplayRecords = 0,
                aaData = rows.ToList(),
                message = ex.Message,
                Status = false
            };
            return data;
        }
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetDataBasedOn(string[] values, string actionName, string[] Parm_names)
    {
        object data = new { };
        var rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        try
        {
            var command = DataAccess.CreateCommand();
            command.CommandText = actionName;
            for (int i = 0; i < values.Length; i++)
            {
                if (values[i] == "")
                {
                    command.Parameters.AddWithValue("@" + Parm_names[i], DBNull.Value);

                }
                else
                {
                    command.Parameters.AddWithValue("@" + Parm_names[i], values[i]);
                }
            }
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
    public static object GetConvetAmount(string value)
    {
        object data = new { };
        var rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        try
        {
            var command = DataAccess.CreateCommandText();
            command.CommandText = "select top 1 Convertamount from SystemSettings";

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

    [WebMethod] // car images
    public static ArrayList ShowCarImages(string id)
    {
        var context = HttpContext.Current;
        var dir = new DirectoryInfo(context.Server.MapPath(string.Format("~/public/cars/{0}/", id)));
        var imgs = new ArrayList();

        if (dir.Exists)
        {
            var files = dir.GetFiles();
            for (int i = 0; i < files.Count(); i++)
            {
                imgs.Add(files[i].Name);
            }
        }
        return imgs;
    }

    [WebMethod] // delete car image
    public static string DeleteImage(string id, string p, string main)
    {
        var context = HttpContext.Current;
        string path = context.Server.MapPath(string.Format("~/Public/cars/{0}/", id)),
            f = path + p,
            fThumb = string.Format("{0}_thumb\\{1}", path, p);

        try
        {
            // Get the attributes of the file

            if (File.Exists(f))
            {
                // Delete the file
                File.Delete(f);
            }

            ////////////////////Thumb///////////////
            // Get the attributes of the file
            if (File.Exists(fThumb))
            {
                // Delete the file
                File.Delete(fThumb);
            }
        }
        catch { } //0

        // delete from db
        string[] names = { "Id", "FileName" }, values = { id, p };
        var deleted = new Save().SaveRow("Images_Delete", names, values);

        if (deleted.Rows > 0)
            return "1";
        else
            return "0";
    }

    [WebMethod] // main car image
    public static string SetMainImage(string id, string p)
    {
        var saved = new Aliraqcars.Domain.Business.CarsManager().ResetMainImage(id, p);
        if (saved)
            return "1";
        else
            return "0";
    }

    [WebMethod] // delete all images
    public static string DeleteCarImage(string id)
    {
        var context = HttpContext.Current;
        string path = context.Server.MapPath(string.Format("~/Public/cars/{0}/", id));

        if (Directory.Exists(path))
        {
            // Delete all files and sub-folders?
            var subfolders = Directory.GetDirectories(path);
            try
            {
                foreach (var s in subfolders)
                {
                    if (Directory.Exists(s))
                        Directory.Delete(s, true);
                }

                // Get all files of the folder
                var files = Directory.GetFiles(path);
                foreach (var f in files)
                {
                    if (File.Exists(f))
                    {
                        // Delete the file
                        File.Delete(f);
                    }
                }
            }
            catch { }
        }

        // delete all pictures from db
        string[] names = { "Id", "FileName" }, values = { id, "" };
        var deleted = new Save().SaveRow("Images_Delete", names, values);

        if (deleted.Rows > 0)
            return "1";

        return "0";
    }

    [WebMethod] // delete all images
    public static string UpdateImagesIndexes(string[] values)
    {
        // create xml file
        XmlDocument xmldoc = new XmlDocument();
        XmlElement doc = xmldoc.CreateElement("doc");
        xmldoc.AppendChild(doc);
        // populate data to xml
        for (int i = 0; i < values.Length; i++)
        {
            var arr = values[i].Split(','); // row items
            XmlElement xmlelement = xmldoc.CreateElement("Pictures");
            xmlelement.SetAttribute("CarID", arr[0]);
            xmlelement.SetAttribute("ID", arr[1]);
            xmlelement.SetAttribute("Index", arr[2]);
            doc.AppendChild(xmlelement);
        }
        // prepare to save
        string[] names = { "doc" }, xml = { xmldoc.OuterXml };
        var saved = new Save().SaveRow("Images_UpdateIndexes", names, xml);

        // return save result.
        return string.Format("{0}", saved.Rows);
    }

    [WebMethod] // car images
    public static string UpdateCarImages(string id)
    {
        var context = HttpContext.Current;
        var dir = new DirectoryInfo(context.Server.MapPath(string.Format("~/public/cars/{0}/", id)));
        //var imgs = new ArrayList();

        // xml document that will has all picture to save to DB.
        XmlDocument xmldoc = new XmlDocument();
        XmlElement doc = xmldoc.CreateElement("doc");
        xmldoc.AppendChild(doc);

        if (dir.Exists)
        {
            var files = dir.GetFiles();
            for (int i = 0; i < files.Count(); i++)
            {
                XmlElement xmlelement = xmldoc.CreateElement("Pictures");
                xmlelement.SetAttribute("CarID", id);
                xmlelement.SetAttribute("FileName", files[i].Name);
                xmlelement.SetAttribute("Index", string.Format("{0}", i + 1));
                doc.AppendChild(xmlelement);
            }
        }

        string[] names = { "doc" }, values = { xmldoc.OuterXml };
        var saved = new Save().SaveRow("Images_Save", names, values);

        return string.Format("{0}", saved.ReturnedID);
    }
}