using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class CustomsCompaniesManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        #endregion

        #region "Read Methods"

        public CustomsCompanies_SelectRowResult GetCustomsCompany(int Id)
        {
            return ctxWrite.CustomsCompanies_SelectRow(Id).FirstOrDefault();
        }

        public List<CustomsCompanies_SelectListResult> GetCustomsCompanies()
        {
            return ctxWrite.CustomsCompanies_SelectList().ToList();
        }

        public List<CustomsCompanies_SelectByDistinationResult> GetCustomsCompByDistination(int distId)
        {
            return ctxWrite.CustomsCompanies_SelectByDistination(distId).ToList();
        }

        //public List<ICustomsCompaniesNames> GetShippingCompByRegionId(int regionID, int distId)
        //{
        //    return ctxWrite.TowingExpenses_SelectByRegionID(regionID, distId).ToList();
        //}
        //public List<ICustomsCompaniesNames> GetShippingCompByDistinationId(string distinationID)
        //{
        //    return ctxWrite.TowingExpenses_SelectByDistinationID(distinationID).ToList();
        //}

        #endregion

        #region "Write Methods"

        public bool SaveItem(CustomsCompany item)
        {
            try
            {
                ctxWrite.CustomsCompanies_Save(item.CustomsCompanyID, item.DistinationID, item.CustomsCompanyNameEn, item.CustomsCompanyNameAr, item.Active, item.OpeningBalance);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.CustomsCompanies_DeleteRow(Id);
            }
            catch { throw; }
        }

        #endregion
    }
}