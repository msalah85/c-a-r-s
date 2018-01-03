using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class ShippingMainCompaniesManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public ShippingMainCompanies_SelectRowResult GetShippingMainCompany(int Id)
        {
            return ctxWrite.ShippingMainCompanies_SelectRow(Id).FirstOrDefault();
        }

        public List<ShippingMainCompanies_SelectRowResult> GetShippingMainCompanies(string param)
        {
            string sqlstr = string.Format(@"SELECT * FROM [ShippingMainCompanies] WHERE 1=1 {0} ORDER BY ShipMainCompanyID DESC", param);
            return ctxWrite.ExecuteQuery<ShippingMainCompanies_SelectRowResult>(sqlstr).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveShippingMainCompany(ShippingMainCompany item)
        {
            try
            {
                ctxWrite.ShippingMainCompanies_InsertUpdate(item.ShipMainCompanyID, item.ShipMainCompanyNameEn, item.ShipMainCompanyNameAr, item.Active);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.ShippingMainCompanies_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion

    }
}
