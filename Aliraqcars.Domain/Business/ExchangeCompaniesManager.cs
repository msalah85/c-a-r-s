using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class ExchangeCompaniesManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public ExchangeCompanies_SelectRowResult GetExchangeCompany(int Id)
        {
            return ctxWrite.ExchangeCompanies_SelectRow(Id).FirstOrDefault();
        }

        public List<ExchangeCompanies_SelectRowResult> GetExchangeCompanies(string param)
        {
            string sqlstr = @"SELECT * FROM [ExchangeCompanies] WHERE 1=1 " + param;
            return ctxWrite.ExecuteQuery<ExchangeCompanies_SelectRowResult>(sqlstr).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveExchangeCompany(ExchangeCompany item)
        {
            try
            {
                ctxWrite.ExchangeCompanies_InsertUpdate(item.ExchangeCompanyID, item.ExchangeCompanyNameEn, item.ExchangeCompanyNameAr, item.Rate);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.ExchangeCompanies_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion

    }
}
