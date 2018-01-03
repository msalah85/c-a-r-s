using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using System;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;
using System.Web.UI.WebControls;

public partial class InOutExpenses : FactshMasterPage
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

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, 
                             {"DisplayLength", param.iDisplayLength.ToString()},
                             {"SearchParam", param.sSearch}, 
                             {"SortColumn", sortColumnIndex.ToString()}, 
                             {"SortDirection", sortDirection}};

        // get all of data.
        var _ds = new Select().SelectLists("InOutgoings_SelectList", _params);
        var blns = (_ds != null && _ds.Tables.Count > 2 && _ds.Tables[2].Rows.Count > 0) ? _ds.Tables[2].Rows[0][0] : 0;

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(_ds.Tables[0]);
        
        var data = new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows.ToList(),
            Balance = blns
        };

        return data;
    }
}