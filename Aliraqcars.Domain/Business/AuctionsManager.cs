using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class AuctionsManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public Auctions_SelectRowResult GetAuction(int Id)
        {
            return ctxWrite.Auctions_SelectRow(Id).FirstOrDefault();
        }

        public List<Auctions_SelectListResult> GetAuctions()
        {
            return ctxWrite.Auctions_SelectList().ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveAuction(Auction item)
        {
            try
            {
                ctxWrite.Auctions_InsertUpdate(item.AuctionID, item.AuctionName, item.AuctionNameAr, item.AuctionEmail,
                    item.AuctionPhone, item.TypeOfAuction, item.Active);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.Auctions_Delete(Id);
            }
            catch { return -1; }
        }


        #endregion
    }
}
