using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace Aliraqusedcars
{
    /// <summary>
    /// Summary description for CategoryManager
    /// </summary>
    public class CategoryManager
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }


        public List<CategoryManager> GetAllCategories()
        {
            var command = DataAccess.CreateCommand();
            command.CommandText = "Categories_SelectList";

            var list = new List<CategoryManager>();

            try
            {
                command.Connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read() && reader != null)
                {
                    CategoryManager manger = new CategoryManager();
                    manger.CategoryId = Convert.ToInt32(reader["CategoryId"]);
                    manger.Name = reader["Name"].ToString();
                    manger.Description = reader["Description"].ToString();
                    manger.Status = Convert.ToBoolean(reader["Status"]);
                    list.Add(manger);
                }
                command.Connection.Close();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list;
        }
        public bool SaveCategory(CategoryManager cateParam)
        {
            SqlCommand command = DataAccess.CreateCommand();
            command.CommandText = "Categories_Save";

            SqlParameter param = command.CreateParameter();
            param.ParameterName = "@CategoryId";
            param.DbType = DbType.Int32;
            param.Value = cateParam.CategoryId;
            command.Parameters.Add(param);

            param = command.CreateParameter();
            param.ParameterName = "@Name";
            param.DbType = DbType.String;
            param.Value = cateParam.Name;
            command.Parameters.Add(param);

            param = command.CreateParameter();
            param.ParameterName = "@Description";
            param.DbType = DbType.String;
            param.Value = cateParam.Description;
            command.Parameters.Add(param);

            param = command.CreateParameter();
            param.ParameterName = "@Status";
            param.DbType = DbType.Boolean;
            param.Value = cateParam.Status;
            command.Parameters.Add(param);

            int result = -1;
            try
            {
                command.Connection.Open();
                result = command.ExecuteNonQuery();

            }
            catch (Exception ex)
            {
                throw ex;                
            }
            finally
            {
                command.Connection.Close();
            }


            return (result != -1);
        }
    }
}