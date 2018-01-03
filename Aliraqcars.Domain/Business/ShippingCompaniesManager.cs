using System;
using System.Collections.Generic;
using System.Linq;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class ShippingCompaniesManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public ShippingCompanies_SelectRowResult GetShippingCompany(int Id)
        {
            return ctxWrite.ShippingCompanies_SelectRow(Id).FirstOrDefault();
        }

        public List<ShippingCompanies_SelectListResult> GetShippingCompanies()
        {
            return ctxWrite.ShippingCompanies_SelectList().ToList();
        }

        public List<IShippingCompaniesNames> GetShippingCompByRegionId(int regionID, int distId)
        {
            return ctxWrite.TowingExpenses_SelectByRegionID(regionID, distId).ToList();
        }
        
        public List<IShippingCompaniesNames> GetShippingCompByDistinationId(string distinationID)
        {
            return ctxWrite.TowingExpenses_SelectByDistinationID(distinationID).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveItem(ShippingCompany item)
        {
            try
            {
                ctxWrite.ShippingCompanies_InsertUpdate(item.ShipCompanyID, item.ShipMainCompanyID, item.ShipCompanyNameEn, item.ShipCompanyNameAr, item.ShipCompanyEmail,
                    item.ShipCompanyPhone, item.ShipCompanyAddress, item.Active, item.OpeningBalance);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.ShippingCompanies_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}