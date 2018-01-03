using System;
using System.Data;
using System.Web.Script.Services;
using System.Web.Services;
using System.Xml;
using Aliraqusedcars;

public partial class admin_admin_2015_PartsAdd : FactshMasterPage
{
    [WebMethod]
    [ScriptMethod(UseHttpGet = false)]
    public static object SaveDataMasterDetails(string[] masterValues, string[] detailsValues)
    {
        string[] Parm_names = { "ID", "ClientID", "InvoiceNo", "AddDate", "Notes", "TotalAmount", "Discount", "NetAmount" },
         fieldsDetails = { "ID", "InvoiceID", "PartName", "Quantity", "Price", "SubTotal" };

        XmlDocument xmldoc = new XmlDocument();
        XmlElement doc = xmldoc.CreateElement("doc");
        xmldoc.AppendChild(doc);
        XmlElement xmlelement = xmldoc.CreateElement("Master");
        doc.AppendChild(xmlelement);
        for (int i = 0; i < masterValues.Length; i++)
        {
            xmlelement.SetAttribute(Parm_names[i], masterValues[i]);
        }

        xmlelement.SetAttribute("UserID", SessionManager.Current.ID);
        xmlelement.SetAttribute("IP", SessionManager.Current.IP);

        for (int i = 0; i < detailsValues.Length; i++)
        {
            var xmlelementDetails = xmldoc.CreateElement("Details");
            doc.AppendChild(xmlelementDetails);
            xmlelementDetails.SetAttribute(Parm_names[0], masterValues[0]);
            for (int j = 0; j < fieldsDetails.Length; j++)
            {
                string[] dataes = detailsValues[i].Split('~');
                xmlelementDetails.SetAttribute(fieldsDetails[j], dataes[j]);
            }

        }
        object data = new { };
        var command = DataAccess.CreateCommand();
        try
        {
            command.CommandText = "PartsInvoices_Save";
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