using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class ClientsManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public Clients_SelectRowResult GetClient(int Id)
        {
            return ctxWrite.Clients_SelectRow(Id).FirstOrDefault();
        }

        public List<Client> GetClients(string param)
        {
            string sql = string.Format(@"SELECT * FROM Clients Where 1=1 {0} ORDER BY ClientId DESC", param);
            return ctxWrite.ExecuteQuery<Client>(sql).ToList();
        }

        #endregion

        #region "Write Methods"

        public int SaveItem(Client item, int? masterID)
        {
            try
            {
                var id = ctxWrite.Clients_InsertUpdate(item.ClientID, item.user_name, item.user_password,
                    item.full_name, item.email, item.country, item.phone, item.phone2, item.send_sms, item.active, item.send_email,
                    item.delete_result, item.countryCode, item.countryCode2, item.user_type, item.Notes, masterID);
                return id;
            }
            catch { return -1; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.Clients_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}