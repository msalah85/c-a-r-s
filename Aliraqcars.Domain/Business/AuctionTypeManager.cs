using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class AuctionTypeManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        
        #endregion

        #region "Read Methods"

        public List<AuctionsTypes_SelectNamesResult> GetAuctionTypesNames()
        {
            return ctxWrite.AuctionsTypes_SelectNames().ToList();
        }

        public AuctionsTypes_SelectRowResult GetAuctionType(int Id)
        {
            return ctxWrite.AuctionsTypes_SelectRow(Id).FirstOrDefault();
        }

        public List<AuctionsTypes_SelectRowResult> GetAuctionTypes(string param)
        {
            string sqlstr = @"SELECT * FROM [AuctionsTypes] WHERE 1=1 " + param;
            return ctxWrite.ExecuteQuery<AuctionsTypes_SelectRowResult>(sqlstr).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveAuctionType(AuctionsType item)
        {
            try
            {
                ctxWrite.AuctionsTypes_InsertUpdate(item.AuctionTypeID, item.AuctionTypeName, item.AuctionCharge,
                    item.Active);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.AuctionsTypes_Delete(Id);
            }
            catch { return -1; }
        }


        #endregion

    }
}
