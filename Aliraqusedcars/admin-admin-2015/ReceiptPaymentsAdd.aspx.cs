using System;
using System.Data.SqlClient;
using System.Data;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using Aliraqusedcars;

public partial class ReceiptPaymentsAdd : System.Web.UI.Page
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"];// asc or desc

        // get dynamic more paramters from user
        var addtionalParamtersNam = Context.Request["names"].Split('~') ?? null;
        var addtionalParamtersVal = Context.Request["values"].Split('~') ?? null;

        // prepare all paramters in two arrays
        string[] prmNme = new string[5 + (addtionalParamtersNam != null ? addtionalParamtersNam.Length : 0)];
        string[] prmVal = new string[5 + (addtionalParamtersNam != null ? addtionalParamtersNam.Length : 0)];

        // set default paramters value
        prmNme[0] = "DisplayStart"; prmNme[1] = "DisplayLength"; prmNme[2] = "SortColumn"; prmNme[3] = "SearchParam"; prmNme[4] = "SortDirection";
        prmVal[0] = param.iDisplayStart.ToString(); prmVal[1] = param.iDisplayLength.ToString(); prmVal[2] = sortColumnIndex.ToString(); prmVal[3] = param.sSearch; prmVal[4] = sortDirection;


        // add more dynamic paratmers and its value to my arrays
        for (int i = 0; i < addtionalParamtersNam.Length; i++)
        {
            int position = 5 + i;
            prmNme[position] = addtionalParamtersNam[i];
            prmVal[position] = string.IsNullOrEmpty(addtionalParamtersVal[i]) ? addtionalParamtersVal[i] : DBNull.Value.ToString();
        }

        // get all of data.
        var _ds = new Select().SelectLists(Context.Request["funName"], prmNme, prmVal);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToJson(_ds.Tables[0]);

        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows
        };

        return data;
    }


    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static bool HideMe(string value)
    {
        bool good = false;
        SqlCommand command = DataAccess.CreateCommandText();
        try
        {
            command.CommandText = "ReceiptVouchers_Delete";
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Add(new SqlParameter("@ReceiptID", value));

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
}