using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class ServiceTypesManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public ServiceTypes_SelectRowResult GetServiceType(int Id)
        {
            return ctxWrite.ServiceTypes_SelectRow(Id).FirstOrDefault();
        }

        public List<ServiceTypes_SelectRowResult> GetServiceTypes(string param)
        {
            string sqlstr = string.Format(@"SELECT * FROM [ServiceTypes] WHERE 1=1 {0} ORDER BY ServiceTypeID DESC", param);
            return ctxWrite.ExecuteQuery<ServiceTypes_SelectRowResult>(sqlstr).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveServiceType(ServiceType item)
        {
            try
            {
                ctxWrite.ServiceTypes_InsertUpdate(item.ServiceTypeID, item.ServiceTypeNameEn, item.ServiceTypeNameAr, item.CurrencyUsed);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.ServiceTypes_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion

    }
}
