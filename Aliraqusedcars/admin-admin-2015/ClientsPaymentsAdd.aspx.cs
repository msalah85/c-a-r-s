using System;
using Minutesuae.SystemUtilities;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class ClientsPaymentsAdd : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static bool updatedate(string value)
    {
        bool good = false;
        SqlCommand command = DataAccess.CreateCommandText();
        try
        {
            command.CommandText = "ClientsPayments_Delete";
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add(new SqlParameter("@ClientPaymentsID", value));

            command.Connection.Open();
            int i = command.ExecuteNonQuery();
            good = true;
        } // catch { }
        finally
        {
            command.Connection.Close();
        }

        return good;
    }

    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static bool SelectSetting(string value)
    {
        bool good = false;

        SqlCommand command = DataAccess.CreateCommandText();
        try
        {
            string _pass = EncryptDecryptString.Encrypt(value, "Taj$$Key");
            command.CommandText = string.Format("select TOP 1 Password from SystemSettings where Password='{0}'", _pass);
            command.Connection.Open();
            var dt = new DataTable();
            SqlDataAdapter adp = new SqlDataAdapter(command);
            adp.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                if (dt.Rows[0][0] != DBNull.Value)
                {
                    good = true;
                }
            }
        } //catch { }
        finally { command.Connection.Close(); }

        return good;
    }
}