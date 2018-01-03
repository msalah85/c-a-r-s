using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Configuration;
using Minutesuae.SystemUtilities;
using Minutesuae.AlIraq;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;

public partial class CarsWaitedshipReportPrint : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object GetData(string ShipCompanyID)
    {
        if (string.IsNullOrEmpty(ShipCompanyID)) { ShipCompanyID = "0"; } // default value
        
        string[,] pram = { { "ShipCompanyID", ShipCompanyID } };
        var ds = new Select().SelectLists("CarsWaitedshipReport_FillReport", pram);

        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(ds.Tables[0]);

        //  return rows.ToList();
        var serializer = new JavaScriptSerializer();
        var serializedResult = serializer.Serialize(rows);
        string[] FormulaValues = new string[3];

        FormulaValues[0] = ShipCompanyID;
        object data = new { FormulaValues = FormulaValues, serializdata = serializedResult };
        return data;
    }
}