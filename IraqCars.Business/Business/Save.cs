using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.SqlClient;
using IraqCars.Business.DataUtility;
using IraqCars.Business.DataAccess;

namespace IraqCars.Business.Business
{
    public class Save
    {
        // Insert/Edit using single array.
        public object SaveRow(string procedureName, List<string[]> procedureParamters)
        {
            var parameters = new SqlParameter[procedureParamters.Count];
            // build stored procedure parameters.
            for (int i = 0; i < procedureParamters.Count; i++)
            {
                parameters[i] = new SqlParameter("@" + procedureParamters[i][0], procedureParamters[i][1]);
            }

            // start save to db.
            var Result = new DbObject().RunProcedureAsync(procedureName, parameters);
            return Result.Result;
        }

        // Insert/Edit using 2 arrays.
        //[DataObjectMethod(DataObjectMethodType.Update)]
        public SavedRow SaveRow(string procedureName, string[] paramters, object[] paramtersVal)
        {
            var parameters = new SqlParameter[paramtersVal.Length];

            // build stored procedure parameters.
            for (int i = 0; i < paramtersVal.Length; i++)
            {
                if (string.IsNullOrEmpty(paramtersVal[i].ToString()))
                {
                    parameters[i] = new SqlParameter("@" + paramters[i], DBNull.Value);
                }
                else if (paramters[i].ToLower().Contains("password"))
                {
                    parameters[i] = new SqlParameter("@" + paramters[i], EncryptDecryptString.Encrypt(paramtersVal[i].ToString(), "Taj$$Key"));
                }
                else if (paramtersVal[i].ToString().Length >= 50)
                {
                    parameters[i] = new SqlParameter("@" + paramters[i], System.Data.SqlDbType.NVarChar, paramtersVal[i].ToString().Length * 2);
                    parameters[i].Value = paramtersVal[i];
                }
                else
                {
                    parameters[i] = new SqlParameter("@" + paramters[i], paramtersVal[i]);
                }
            }

            // start save to db.
            var Result = new DbObject().RunProcedureAsync(procedureName, parameters);
            return Result.Result;
        }

        [DataObjectMethod(DataObjectMethodType.Update)]
        public object RunSQLString(string sqlString)
        {
            // run sql string in to db.
            var Result = new DbObject().RunQuery(sqlString, "Table1");
            return Result;
        }
    }
}