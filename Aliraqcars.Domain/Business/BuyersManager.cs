using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class BuyersManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public Buyers_SelectRowResult GetBuyer(int Id)
        {
            return ctxWrite.Buyers_SelectRow(Id).FirstOrDefault();
        }

        public List<Buyers_SelectNameResult> GetBuyersNames(int AuctionId)
        {
            return ctxWrite.Buyers_SelectName(AuctionId).ToList();
        }

        public List<Buyers_SelectName2Result> GetBuyersNames2(int AuctionId)
        {
            return ctxWrite.Buyers_SelectName2(AuctionId).ToList();
        }

        public List<Buyers_SelectListResult> GetBuyers(string param)
        {
            return ctxWrite.Buyers_SelectList().ToList();
        }

        public IBuyerAssest BuyerAssest()
        {
            var result = ctxWrite.Buyers_SelectAuctionsClientsList();

            IBuyerAssest items = new IBuyerAssest();
            items.Auctions = result.GetResult<Auctions_SelectNamesResult>().ToList();
            items.Clients = result.GetResult<Clients_SelectNamesResult>().ToList();
            items.AuctionTypes = result.GetResult<AuctionsTypes_SelectNamesResult>().ToList();

            return items;
        }

        #endregion

        #region "Write Methods"

        public bool SaveItem(Buyers_SelectRowResult item)
        {
            try
            {
                ctxWrite.Buyers_InsertUpdate(item.BuyerID, item.AuctionTypeID, item.AuctionID, item.ClientID, item.BuyerName, item.BuyeNo,
                    item.BuyerDesc, item.Active, item.BuyerCredit, item.BuyerDebit, item.BuyerFee, item.Username, item.Password, item.Puse);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.Buyers_Delete(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}