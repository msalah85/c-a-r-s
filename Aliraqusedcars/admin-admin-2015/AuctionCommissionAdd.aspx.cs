using System;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using IraqCars.Business.Business;
using IraqCars.Business.DataUtility;
using System.Xml;
using Aliraqusedcars;

public partial class AuctionCommissionPayment : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
    public static object LoadData()
    {
        var param = new jQueryDataTableParamModel();
        HttpContext Context = HttpContext.Current;

        param.sEcho = String.IsNullOrEmpty(Context.Request["sEcho"]) ? 0 : Convert.ToInt32(Context.Request["sEcho"]);
        var auctionTypeID = String.IsNullOrEmpty(Context.Request["AuctionTypeID"]) ? "0" : Context.Request["AuctionTypeID"];
        string pID = String.IsNullOrEmpty(Context.Request["PID"]) ? null : Context.Request["PID"],
               fromDate = string.IsNullOrEmpty(Context.Request["From"]) ? null : Context.Request["From"],
               toDate = string.IsNullOrEmpty(Context.Request["To"]) ? null : Context.Request["To"];


        // create filter paramters
        string[,] _params = { { "AuctionTypeID", auctionTypeID }, { "From", fromDate }, { "To", toDate }, { "ID", pID } };


        // get all of data.
        var _ds = new Select().SelectLists("AuctionCommissions_SelectCars", _params);


        // inhance data to be list.
        var rows = DataUtilities.ConvertDTToList(_ds.Tables[0]);


        return new
        {
            sEcho = param.sEcho,
            iTotalRecords = _ds.Tables[1].Rows[0][0],
            iTotalDisplayRecords = _ds.Tables[1].Rows[0][0],
            aaData = rows.ToList()
        };
    }
    
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveDataMasterDetails(string[] masterValues, string[] detailsValues)
    {
        string[] Parm_names = { "AuctionCommID", "AuctionTypeID", "ExchangeCompanyID", "InvoiceDate", "CommAmount", "ConvertAmount", "CommAmountDhs", "Notes", "DateFrom", "DateTo", "ExtraAmount", "CommissionExtraNoteID" }, fieldsDetails = { "AuctionCommDetailsID", "AuctionCommID", "CarID", "BuyerFee", "AuctionCommCost", "ACDetailsTotal" };

        var xmldoc = new XmlDocument();
        XmlElement doc = xmldoc.CreateElement("doc");
        xmldoc.AppendChild(doc);
        XmlElement xmlelement = xmldoc.CreateElement("Master");

        doc.AppendChild(xmlelement);
        for (int i = 0; i < masterValues.Length; i++)
        {
            xmlelement.SetAttribute(Parm_names[i], masterValues[i]);
        }

        xmlelement.SetAttribute("UserId", SessionManager.Current.ID);
        xmlelement.SetAttribute("IP", SessionManager.Current.IP);

        for (int i = 0; i < detailsValues.Length; i++)
        {
            var xmlelementDetails = xmldoc.CreateElement("Details");
            doc.AppendChild(xmlelementDetails);
            xmlelementDetails.SetAttribute(Parm_names[0], masterValues[0]);
            for (int j = 0; j < fieldsDetails.Length; j++)
            {
                string[] dataes = detailsValues[i].Split(',');
                xmlelementDetails.SetAttribute(fieldsDetails[j], dataes[j]);
            }

        }
        object data = new { };
        var command = DataAccess.CreateCommand();
        try
        {
            command.CommandText = "AuctionCommissions_Save";
            command.Parameters.AddWithValue("@doc", xmldoc.OuterXml);
            var returnParameter = command.Parameters.Add("RetVal", SqlDbType.Int);
            returnParameter.Direction = ParameterDirection.ReturnValue;

            int result = -1;
            command.Connection.Open();
            result = command.ExecuteNonQuery();

            if (result != -1)
            {
                data = new
                {
                    ID = returnParameter.Value,
                    Status = true,
                    message = "تم حفظ البيانات بنجاح."
                };
            }
        }
        catch (Exception ex)
        {
            data = new { status = false, message = ex.Message };
        }
        finally { command.Connection.Close(); }
        return data;
    }
}