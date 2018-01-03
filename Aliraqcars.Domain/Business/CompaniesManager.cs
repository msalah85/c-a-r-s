using System;
using System.Linq;
using System.Text;
using System.Collections;
using Aliraqcars.Domain.Data;
using System.Collections.Generic;

namespace Aliraqcars.Domain.Business
{
    public class CompaniesManager
    {

        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        ReaderDataContext ctxRead = new ReaderDataContext();

        #endregion

        #region "Read Methods"

        public IList<sp_companies_SelectNamesResult> GetCompaniesNames()
        {
            return ctxRead.sp_companies_SelectNames(0).ToList();
        }

        public sp_companies_SelectRowResult GetCompanyDetails(int _Id)
        {
            return ctxRead.sp_companies_SelectRow(_Id).FirstOrDefault();
        }

        public IList<sp_companies_SelectRowResult> GetCompanies(string param)
        {
            string sqlstr = @"SELECT * FROM [Companies] WHERE delete_result LIKE 'no%' " + param;
            return ctxRead.ExecuteQuery<sp_companies_SelectRowResult>(sqlstr).ToList();
        }


        #endregion

        #region "Write Methods"

        public bool SaveCompany(company item)
        {
            try
            {
                ctxWrite.sp_companies_Update(item.id, item.name, item.country, item.city, item.address,
                    item.phone, item.fax, item.mobile, item.email, item.active);
                return true;
            }
            catch { return false; }
        }

        public bool DeleteCompany(int Id)
        {
            try
            {
                ctxWrite.sp_companies_DeleteRow(Id);
                return true;
            }
            catch { return false; }
        }

        #endregion

    }
}
