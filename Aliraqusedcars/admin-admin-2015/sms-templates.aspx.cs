
using System;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections.Generic;
using IraqCars.Business.Business;
using System.Threading.Tasks;
using IraqSMS;


public partial class admin_admin_2015_sms_templates : FactshMasterPage
{
    [WebMethod]
    public static object SendSMS(string phones, string message)
    {
        Task<string> task = SMSManager.SMSSend(phones, message);

        return task;
    }

    [WebMethod]
    public static object BulkSMS(string[] messages)
    {
        // collect all sending reports    
        List<string> isSent = new List<string>();


        // loop all messages
        for (int i = 0; i < messages.Length; i++)
        {
            // split mobile and message
            string[] msg = messages[i].Split('|');

            // start sending the message to one or more mobile number
            //                                      phone  message
            Task<string> sent = SMSManager.SMSSend(msg[0], msg[1]);

            // register sending report for every sms.
            isSent.Add(sent.Result + "|" + msg[2]);
        }

        // return all reports
        return isSent;
    }
}