
using System.Collections;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace IraqSMS
{
    public static class SMSManager
    {
        #region sync code
        //// Send SMS message throgh Mobishaster API.
        //public static string SMSSend(string mobileNo, string message)
        //{
        //    mobileNo = InhanceMobileNo(mobileNo);
        //    string baseurl = string.Format("http://mshastra.com/sendurlcomma.aspx?user=20078016&pwd=2pnpr4&senderid=ALIRAQCARS&mobileno={0}&msgtext={1}&priority=High&CountryCode=ALL", mobileNo, message), sentMessage = "";
        //    using (WebClient client = new WebClient())
        //    {
        //        using (Stream data = client.OpenRead(baseurl))
        //        {
        //            using (StreamReader reader = new StreamReader(data))
        //            {
        //                sentMessage = reader.ReadToEnd();
        //                reader.Close();
        //            }
        //            data.Close();
        //        }
        //    }
        //    return sentMessage;
        //}
        #endregion

        public static async Task<string> SMSSend(string mobileNo, string message)
        {
            mobileNo = InhanceMobileNo(mobileNo);

            #region "sending api"

            /*Profileid = You will get a unique profile id once your account is logged in. It will be a 8 character numeric id (200XXXXX).
             password = Password will be the part of credentials provided to you. You can change them innumerable times
             ABC = This will be the approved Sender ID from the operator. User can have 
             multiple approved Sender IDs & can use any of them. In case, the sender ID 
             doesn’t match with the approved ones, SMS will go from the default ID
             mobileno = The UAE mobile no. to which user wants to send SMS. They can be 
             in any format (+9715XX, 9715XX, 05XX, 5XX). Only numbers are allowed. 
             System will automatically reject less than 9 digit & nos. not starting with 5.
             Hello = The SMS content. 160 English characters counted as 1 SMS. 70
             Unicode characters counted as 1 SMS. If SMS length is more than 1 SMS 
             than the SMS counts are in multiple of 153 in case of English & 63 in case of Unicode.             
             user=20078016&pwd=2pnpr4
             */


            string baseurl = string.Format("http://mshastra.com/sendurlcomma.aspx?user=20078016&pwd=2pnpr4&senderid=ALIRAQCARS&mobileno={0}&msgtext={1}&priority=High&CountryCode=ALL", mobileNo, message),
                sentMessage = "";

            #endregion

            using (WebClient client = new WebClient())
            {
                using (Stream data = client.OpenRead(baseurl))
                {
                    using (StreamReader reader = new StreamReader(data))
                    {
                        sentMessage = await reader.ReadToEndAsync();
                        reader.Close();
                    }
                    data.Close();
                }
            }
            return sentMessage;
        }

        // remove every starting 00 in (00971xxxxxx) would be (971xxxxxx).
        static string InhanceMobileNo(string no)
        {
            var nombs = no.Split(',');
            var list = new ArrayList();

            foreach (string n in nombs)
            {
                if (n.StartsWith("00"))
                    list.Add(n.Substring(2));
            }

            return string.Join(",", list.ToArray());
        }
    }
}