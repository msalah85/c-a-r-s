
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace Aliraqusedcars
{
    /// <summary>
    /// Summary description for DataAccess
    /// </summary>
    public static class DataAccess
    {
        public static SqlCommand CreateCommand()
        {
            string connnectionString = ConfigurationManager.ConnectionStrings["Aliraqcars.Domain.Properties.Settings.AliraqCarsConnectionString"].ConnectionString;
            SqlConnection connection = new SqlConnection(connnectionString);

            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            return command;
        }

        public static SqlCommand CreateCommandText()
        {
            string connnectionString = ConfigurationManager.ConnectionStrings["Aliraqcars.Domain.Properties.Settings.AliraqCarsConnectionString"].ConnectionString;
            SqlConnection connection = new SqlConnection(connnectionString);

            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.Text;
            return command;
        }
    }
}