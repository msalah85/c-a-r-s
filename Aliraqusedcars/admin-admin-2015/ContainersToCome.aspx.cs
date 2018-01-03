using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;

public partial class ContainersToCome : Page
{
    //[WebMethod]
    //[ScriptMethod(UseHttpGet = false)]
    //public static object SaveArrival(string[] values)
    //{
    //    SqlCommand command = DataAccess.CreateCommand();
    //    object data = new { }; int result = -1;

    //    try
    //    {
    //        command.CommandText = "CarsData_SetArrivalCarContainer";
    //        command.Parameters.AddWithValue("@No", values[0]);
    //        command.Parameters.AddWithValue("@Type", values[1]);
    //        command.Parameters.AddWithValue("@Date", values[2]);

    //        command.Connection.Open();
    //        result = command.ExecuteNonQuery();

    //        if (result > -1)
    //        {
    //            data = new
    //            {
    //                Status = true,
    //                message = "تمت عملية الحفظ بنجاح."
    //            };
    //        }
    //        else
    //        {
    //            data = new { Status = false, message = "لقد حدث خطأ أثناء عملية الحفظ." };
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        data = new { Status = false, message = ex.Message };
    //    }
    //    finally
    //    {
    //        command.Connection.Close();
    //    }

    //    return data;
    //}
}