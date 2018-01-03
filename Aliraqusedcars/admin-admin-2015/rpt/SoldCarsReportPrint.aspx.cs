using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class SoldCarsReportPrint : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetData( string ClientID, string fromdate, string todate, string PayFlag)
    {
        object data = new { };
        var rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        try
        {
            SqlCommand command = DataAccess.CreateCommand();
            command.CommandText = "SoldCarsReportPrint_FillReport";
            command.Parameters.AddWithValue("@FromDate", fromdate);
            command.Parameters.AddWithValue("@ToDate", todate);
            command.Parameters.AddWithValue("@ClientID", ClientID);
            command.Parameters.AddWithValue("@PayFlag", PayFlag);
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
            string[] FormulaValues=new string[3];
           
            FormulaValues[0] = ClientID;
            FormulaValues[1] = fromdate;
            FormulaValues[2] = todate;
          

            data = new {  FormulaValues = FormulaValues, serializdata = serializedResult };
            return data;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
   
}