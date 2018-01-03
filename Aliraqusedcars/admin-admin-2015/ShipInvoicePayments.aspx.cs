using System;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Services;
using System.Web.Services;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class ShipInvoicePayments : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object GetShipInvoicePayments()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart = String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        var ShipCompanyID = String.IsNullOrEmpty(Context.Request["ShipCompanyID"]) ? "" : Context.Request["ShipCompanyID"];
        var _type = String.IsNullOrEmpty(Context.Request["Type"]) ? "0" : Context.Request["Type"];        
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc

        SqlCommand command = DataAccess.CreateCommand();
        command.CommandText = "ShipInvoicePayments_SelectList";

        try
        {
            command.Connection.Open();
            command.Parameters.AddWithValue("@DisplayStart", param.iDisplayStart);
            command.Parameters.AddWithValue("@DisplayLength", param.iDisplayLength);
            command.Parameters.AddWithValue("@SearchParam", param.sSearch);
            command.Parameters.AddWithValue("@SortColumn", sortColumnIndex);
            command.Parameters.AddWithValue("@SortDirection", sortDirection);
            command.Parameters.AddWithValue("@ShipCompanyID", ShipCompanyID);
            command.Parameters.AddWithValue("@Type", _type);

            SqlDataAdapter adp = new SqlDataAdapter(command);
            DataSet ds = new DataSet();
            adp.Fill(ds);

            var rows = DataUtilities.ConvertDTToList(ds.Tables[0]);

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

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static bool updatedate(string value)
    {
        SqlCommand command = DataAccess.CreateCommandText();
        try
        {
            command.CommandText = "DELETE ShipInvoicePaymentsDetails WHERE ShipInvoicePaymentsID=" + value + "; DELETE FROM ShipInvoicePayments WHERE ShipInvoicePaymentsID=" + value;
            command.Connection.Open();
            int i = command.ExecuteNonQuery();
            return true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally { command.Connection.Close(); }
    }
}