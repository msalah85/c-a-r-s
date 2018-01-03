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
using Aliraqusedcars;

public partial class ShipInvoicePaymentsDetails : FactshMasterPage
{
    #region "Event Handler"

    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetCustomspaymentsmaster()
    {
        var param = new jQueryDataTableParamModel();
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
            var adp = new SqlDataAdapter(command);
            var ds = new DataSet();

            adp.Fill(ds);


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
        finally
        {
            command.Connection.Close();
        }
    }
    
    /// <summary>
    /// Action that updates data
    /// </summary>
    /// <param name="value">Id of the record</param>
    /// <returns>value if update suceed - any other value will be considered as an error message on the client-side</returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetContainerNosDate(string value)
    {
        object data = new { };
        var rows = new List<Dictionary<string, object>>();
        var serializer = new JavaScriptSerializer();
        var command = DataAccess.CreateCommandText();
        Dictionary<string, object> row;


        try
        {
            command.CommandText = "SELECT Bol, SUM(TotalCost) AS ShippPrice FROM View_InvoicesDetails WHERE IsEdit=1 AND ContainerNo=N'" + value + "' GROUP BY Bol;";

            command.Connection.Open();
            var adp = new SqlDataAdapter(command);
            var ds = new DataSet();

            adp.Fill(ds);

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
            return serializer.Serialize(rows);
        }
        catch (Exception ex)
        {
            return serializer.Serialize(ex.Message);
        }
        finally
        {
            command.Connection.Close();
        }
    }

    #endregion
}