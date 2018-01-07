﻿using IraqCars.Business.Business;
using System;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using Aliraqusedcars;

public partial class admin_admin_2015_AdvanceOutsideMemebers : FactshMasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    
    [WebMethod]
    [ScriptMethod(UseHttpGet = true)]
    public static object LoadData()
    {
        jQueryDataTableParamModel param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;
        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        param.iDisplayStart += String.IsNullOrEmpty(Context.Request["iDisplayStart"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayStart"]);
        param.iDisplayLength = String.IsNullOrEmpty(Context.Request["iDisplayLength"]) ? 0 : Convert.ToInt32(Context.Request["iDisplayLength"]);
        var sortColumnIndex = Convert.ToInt32(Context.Request["iSortCol_0"]);
        var sortDirection = Context.Request["sSortDir_0"]; // asc or desc  
        

        // search paramters
        param.sSearch = String.IsNullOrEmpty(Context.Request["sSearch"]) ? "" : Context.Request["sSearch"];
        // create filter paramters
        string[,] _params = {{"DisplayStart",param.iDisplayStart.ToString()},
                                {"DisplayLength", param.iDisplayLength.ToString()},
                                {"SearchParam", param.sSearch},
                                {"SortColumn", sortColumnIndex.ToString()},
                                {"SortDirection", sortDirection}};

        // get all of data.
        var _ds = new Select().SelectLists(Context.Request["funName"], _params);

        return LZStringUpdated.compressToUTF16(_ds.GetXml());
    }

}