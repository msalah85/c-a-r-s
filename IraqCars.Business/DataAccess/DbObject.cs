using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace IraqCars.Business.DataAccess
{
    /// <summary>
    /// DbObject is the class from which all classes in the Data Services
    /// Tier inherit. The core functionality of establishing a connection
    /// with the database and executing simple stored procedures is also
    /// provided by this base class.
    /// </summary>
    public class DbObject
    {
        readonly SqlConnection Connection;

        /// <summary>
        /// A parameterized constructor, it allows us to take a connection
        /// string as a constructor argument, automatically instantiating
        /// a new connection.
        /// </summary>
        /// <param name="newConnectionString">Connection String to the associated database</param>
        public DbObject(string newConnectionString)
        {
            Connection = GetConnection(newConnectionString);
        }
        public DbObject()
        {
            // initialize default connection string             
            Connection = GetConnection(null);
        }

        public SqlConnection GetConnection(string connString)
        {
            if (string.IsNullOrEmpty(connString))
                connString = ConfigurationManager.ConnectionStrings["Aliraqcars.Domain.Properties.Settings.AliraqCarsConnectionString"].ConnectionString;
            
            return new SqlConnection(connString);
        }
        
        public static SqlCommand Command
        {
            get; set;
        }

        /// <summary>
        /// Private routine allowed only by this base class, it automates the task
        /// of building a SqlCommand object designed to obtain a return value from
        /// the stored procedure.
        /// </summary>
        /// <param name="storedProcName">Name of the stored procedure in the DB, eg. sp_DoTask</param>
        /// <param name="parameters">Array of IDataParameter objects containing parameters to the stored proc</param>
        /// <returns>Newly instantiated SqlCommand instance</returns>
        private SqlCommand BuildIntCommand(string storedProcName, IDataParameter[] parameters)
        {
            Command = BuildQueryCommand(storedProcName, parameters);

            Command.Parameters.Add(new SqlParameter("ReturnValue",
                SqlDbType.Int,
                4, /* Size */
                ParameterDirection.ReturnValue,
                false, /* is nullable */
                0, /* byte precision */
                0, /* byte scale */
                string.Empty,
                DataRowVersion.Default,
                null));

            return Command;
        }

        /// <summary>
        /// Builds a SqlCommand designed to return a SqlDataReader, and not
        /// an actual integer value.
        /// </summary>
        /// <param name="storedProcName">Name of the stored procedure</param>
        /// <param name="parameters">Array of IDataParameter objects</param>
        /// <returns></returns>
        SqlCommand BuildQueryCommand(string storedProcName, IDataParameter[] parameters)
        {
            Command = new SqlCommand(storedProcName, Connection);
            Command.CommandType = CommandType.StoredProcedure;
            foreach (SqlParameter parameter in parameters)
            {
                Command.Parameters.Add(parameter);
            }
            return Command;
        }

        /// <summary>
        /// Runs a stored procedure, can only be called by those classes deriving
        /// from this base. It returns an integer indicating the return value of the
        /// stored procedure, and also returns the value of the RowsAffected aspect
        /// of the stored procedure that is returned by the ExecuteNonQuery method.
        /// </summary>
        /// <param name="storedProcName">Name of the stored procedure</param>
        /// <param name="parameters">Array of IDataParameter objects</param>
        /// <param name="rowsAffected">Number of rows affected by the stored procedure.</param>
        /// <returns>An integer indicating return value of the stored procedure</returns>
        public int RunProcedure(string storedProcName, IDataParameter[] parameters, out int rowsAffected)
        {
            int result;

            Connection.Open();

            Command = BuildIntCommand(storedProcName, parameters);
            rowsAffected = Command.ExecuteNonQuery();
            result = (int)Command.Parameters["ReturnValue"].Value;
            Command.Dispose();
            Connection.Close();
            return result;
        }

        /// <summary>
        /// Runs a stored procedure, can only be called by those classes deriving
        /// from this base. It returns an integer indicating the return value of the
        /// stored procedure, and also returns the value of the RowsAffected aspect
        /// of the stored procedure that is returned by the ExecuteNonQuery method.
        /// </summary>
        /// <param name="storedProcName">Name of the stored procedure</param>
        /// <param name="parameters">Array of IDataParameter objects</param>
        /// <param name="rowsAffected">Number of rows affected by the stored procedure.</param>
        /// <returns>An integer indicating return value of the stored procedure</returns>
        public async Task<SavedRow> RunProcedureAsync(string storedProcName, IDataParameter[] parameters)
        {
            await Connection.OpenAsync().ConfigureAwait(false);
            Command = BuildIntCommand(storedProcName, parameters);

            var rowsAffected = await Command.ExecuteNonQueryAsync().ConfigureAwait(false);
            var returnVal = (int)Command.Parameters["ReturnValue"].Value;

            Connection.Close();
            
            var obj = new SavedRow
            {
                Rows = rowsAffected,
                ReturnedID = returnVal
            };
            
            return obj;
        }

        /// <summary>
        /// Will run a stored procedure, can only be called by those classes deriving
        /// from this base. It returns a SqlDataReader containing the result of the stored
        /// procedure.
        /// </summary>
        /// <param name="storedProcName">Name of the stored procedure</param>
        /// <param name="parameters">Array of parameters to be passed to the procedure</param>
        /// <returns>A newly instantiated SqlDataReader object</returns>
        public async Task<object> RunProcedureAsyn(string storedProcName, IDataParameter[] parameters)
        {
            await Connection.OpenAsync();
            Command = BuildQueryCommand(storedProcName, parameters);
            Command.CommandType = CommandType.StoredProcedure;
            var returnReader = await Command.ExecuteReaderAsync();
            returnReader.Read();
            returnReader.Close();
            Connection.Close();

            return returnReader;
        }

        /// <summary>
        /// Creates a DataSet by running the stored procedure and placing the results
        /// of the query/proc into the given tablename.
        /// </summary>
        /// <param name="storedProcName"></param>
        /// <param name="parameters"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName)
        {
            var dataSet = new DataSet();
            var sqlDA = new SqlDataAdapter();
            sqlDA.SelectCommand = BuildQueryCommand(storedProcName, parameters);
            Connection.Open();
            sqlDA.Fill(dataSet, tableName);
            sqlDA.Dispose();
            Connection.Dispose();
            Connection.Close();

            return dataSet;
        }

        /// <summary>
        /// Creates a DataSet by running the stored procedure and placing the results
        /// of the query/proc into the given tablename.
        /// </summary>
        /// <param name="storedProcName"></param>
        /// <param name="parameters"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public DataSet RunProcedureOutParam(string storedProcName, IDataParameter[] parameters, string tableName)
        {
            var dataSet = new DataSet();
            Connection.Open();
            var sqlDA = new SqlDataAdapter();
            sqlDA.SelectCommand = BuildQueryCommand(storedProcName, parameters);
            sqlDA.Fill(dataSet, tableName);
            Connection.Dispose();
            Connection.Close();

            var dt = new DataTable("PageCount");
            dt.Columns.Add("PageCount");
            dt.Rows.Add();
            dt.Rows[0][0] = parameters.Last().Value; // output parameter
            dataSet.Tables.Add(dt);

            return dataSet;
        }
        /// <summary>
        /// Takes an -existing- dataset and fills the given table name with the results
        /// of the stored procedure.
        /// </summary>
        /// <param name="storedProcName"></param>
        /// <param name="parameters"></param>
        /// <param name="dataSet"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        public void RunProcedure(string storedProcName, IDataParameter[] parameters, DataSet dataSet, string tableName)
        {
            Connection.Open();
            var sqlDA = new SqlDataAdapter();
            sqlDA.SelectCommand = BuildIntCommand(storedProcName, parameters);
            sqlDA.Fill(dataSet, tableName);
            Connection.Dispose();
            Connection.Close();
        }

        /// <summary>
        /// Creates a DataSet by running the query and placing the results
        /// of the query/proc into the given tablename.
        /// </summary>
        /// <param name="Query"></param>        
        /// <param name="tableName"></param>
        /// <returns>DataSet</returns>
        public DataSet RunQuery(string Query, string tableName)
        {
            var dataSet = new DataSet();
            Connection.Open();
            var sqlDA = new SqlDataAdapter();
            var cmd = new SqlCommand(Query, Connection);
            cmd.CommandType = CommandType.Text;
            sqlDA.SelectCommand = cmd;
            sqlDA.Fill(dataSet, tableName);
            Connection.Dispose();
            Connection.Close();

            return dataSet;
        }
    }

    public class SavedRow
    {
        public int? Rows { get; set; }
        public long? ReturnedID { get; set; }
    }
}
