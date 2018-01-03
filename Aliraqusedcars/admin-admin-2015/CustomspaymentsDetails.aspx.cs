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
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class CustomsPaymentsDetails : FactshMasterPage
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
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc          

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()},
                             {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch},
                             {"SortColumn", sortColumnIndex.ToString()},
                             {"SortDirection", sortDirection}};

        // get all of data.
        var _ds = new Select().SelectLists("Customspaymentsmaster_SelectList", _params);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows.ToList() //_ds.GetXml() //
        };

        return data;
    }



    /// <summary>
    /// Action that updates data
    /// </summary>
    /// <param name="id">Id of the record</param>
    /// <param name="value">Value that shoudl be set</param>
    /// <param name="rowId">Id of the row</param>
    /// <param name="columnPosition">Position of the column(hidden columns are not counted)</param>
    /// <param name="columnId">Position of the column(hidden columns are counted)</param>
    /// <param name="columnName">Name of the column</param>
    /// <returns>value if update suceed - any other value will be considered as an error message on the client-side</returns>
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetDataContainer(string value)
    {
        object data = new { };
        var rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        var command = DataAccess.CreateCommandText();

        try
        {
            command.CommandText = string.Format("SELECT InvoiceNo as ContainerDate,TotalAmount AS Amount,TotalAmountDhs AS AmountDh from CustomsInvoices where ContainerNo='{0}'", value);
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
            var serializer = new JavaScriptSerializer();
            return serializer.Serialize(rows);
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
    
    #endregion
}