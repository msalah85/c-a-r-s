using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class ClientBuyersManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public ClientBuyers_SelectRowResult GetClientBuyer(int clientId, int buyerId)
        {
            return ctxWrite.ClientBuyers_SelectRow(clientId, buyerId).FirstOrDefault();
        }

        public List<ClientBuyers_SelectListResult> GetClientBuyers(int clientId)
        {
            return ctxWrite.ClientBuyers_SelectList(clientId).ToList();
        }

        public IClientBuyerProperties GetClientBuyerProperties()
        {
            var result = ctxWrite.ClientBuyers_SelectProperties();

            IClientBuyerProperties item = new IClientBuyerProperties();
            if (result != null)
            {
                item.Clients = result.GetResult<IClients>().ToList();
                item.Buyers = result.GetResult<IBuyers>().ToList();
            }

            return item;
        }


        #endregion

        #region "Write Methods"

        public bool SaveItem(ClientBuyer item)
        {
            try
            {
                ctxWrite.ClientBuyers_Save(item.ClientBuyerID, item.Active);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id, int buyerId)
        {
            try
            {
                return (int)ctxWrite.ClientBuyers_DeleteRow(Id, buyerId);
            }
            catch { return -1; }
        }

        #endregion
    }
}