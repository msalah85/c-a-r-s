using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Business
{
    public class ExpenseTypesManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public ExpenseTypes_SelectRowResult GetExpenseType(int Id)
        {
            return ctxWrite.ExpenseTypes_SelectRow(Id).FirstOrDefault();
        }

        public List<ExpenseTypes_SelectRowResult> GetExpenseTypes(string param)
        {
            string sqlstr = string.Format(@"SELECT * FROM [ExpenseTypes] WHERE 1=1 {0} ORDER BY ExpenseTypeID DESC", param);
            return ctxWrite.ExecuteQuery<ExpenseTypes_SelectRowResult>(sqlstr).ToList();
        }

        #endregion

        #region "Write Methods"

        public bool SaveExpenseType(ExpenseType item)
        {
            try
            {
                ctxWrite.ExpenseTypes_InsertUpdate(item.ExpenseTypeID, item.ExpenseTypeNameEn, item.ExpenseTypeNameAr,
                    item.CurrencyUsed, item.GroupName);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.ExpenseTypes_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion

    }
}
