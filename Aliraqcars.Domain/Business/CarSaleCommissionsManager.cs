using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class CarSaleCommissionsManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        #endregion

        #region "Read Methods"

        public CarSaleCommission_SelectRowResult GetCarSaleCommission(int clientID, int distinationId)
        {
            return ctxWrite.CarSaleCommission_SelectRow(clientID, distinationId).FirstOrDefault();
        }

        //public List<CarSaleCommission_SelectListResult> GetCarSaleCommission()
        //{
        //    return ctxWrite.CarSaleCommission_SelectList().ToList();
        //}

        #endregion

        #region "Write Methods"

        public bool SaveItem(CarSaleCommission item)
        {
            try
            {
                ctxWrite.CarSaleCommission_Save(item.CommissionID, item.DistinationID, item.CommissionCash, item.CommissionCredit);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int commID)
        {
            try
            {
                return (int)ctxWrite.CarSaleCommission_Delete(commID);
            }
            catch { return -1; }
        }

        #endregion
    }
}
