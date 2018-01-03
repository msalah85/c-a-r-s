using Aliraqusedcars;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

public partial class admin_admin_2015_america_car_notes2 : FactshMasterPage
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
        string sortDirection = Context.Request["sSortDir_0"],// asc or desc          
        chassisFilter = Context.Request["chassis"], shipper = Context.Request["shipper"],
        lateDays = String.IsNullOrEmpty(Context.Request["lateDays"]) ? null : Context.Request["lateDays"],
        lateTitle = String.IsNullOrEmpty(Context.Request["title"]) ? null : Context.Request["title"];

        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()}, {"DisplayLength", param.iDisplayLength.ToString()}, 
                             {"SortColumn", sortColumnIndex.ToString()},  {"SortDirection", sortDirection},                            
                             {"Shipper", shipper}, {"Chassis", chassisFilter}, {"LateDays",lateDays}, {"LateTitle",lateTitle}};

        // get all of data.
        var _ds = new Select().SelectLists("CarsData_Search4Notes", _params);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToJson(_ds.Tables[0]);

        var data = new
        {
            param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows
        };

        return data;
    }

    // Save car notes
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object saveNote(string[] names, string[] values)
    {
        values[2] = SessionManager.Current.ID;
        var saved = new Save().SaveRow("CarsData_SaveNotes", names, values);
        object data = new { };


        if (saved.Rows > 0)
        {
            data = new
            {
                Status = true,
                message = Resources.Resource_ar.SuccessSave
            };
        }
        else
        {
            data = new { status = false, message = Resources.Resource_ar.ErrorSave };
        }

        return data;
    }
}