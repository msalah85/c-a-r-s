using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI.WebControls;
using Aliraqusedcars;

public partial class WebsiteCarsView : FactshMasterPage
{
    #region "Event Handler"
    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
    public static object LoadData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          
        var command = DataAccess.CreateCommand();

        command.CommandText = "WebsiteCars_SelectList";
        var chassisFilter = Context.Request["chassis"];
        string fromDate = null, toDate = null;
        fromDate = string.IsNullOrEmpty(Context.Request["From"]) ? null : Context.Request["From"];
        toDate = string.IsNullOrEmpty(Context.Request["To"]) ? null : Context.Request["To"];
        
        try
        {
            command.Connection.Open();
            command.Parameters.AddWithValue("@DisplayStart", param.iDisplayStart);
            command.Parameters.AddWithValue("@DisplayLength", param.iDisplayLength);
            command.Parameters.AddWithValue("@SortColumn", sortColumnIndex);
            command.Parameters.AddWithValue("@SortDirection", sortDirection);

            command.Parameters.AddWithValue("@From", fromDate);
            command.Parameters.AddWithValue("@To", toDate);
            command.Parameters.AddWithValue("@Chassis", chassisFilter);

            var adp = new SqlDataAdapter(command);
            DataSet ds = new DataSet();
            adp.Fill(ds);
            command.Connection.Close();

            var rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            var dt = ds.Tables[0];
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
            var data = new { Message = "خطأ: " + ex.Message };
            return data;
        }
    }
    #endregion
}