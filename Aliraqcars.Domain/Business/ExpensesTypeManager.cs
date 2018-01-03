using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using System.Collections;

namespace Aliraqcars.Domain.Business
{
    public class ExpensesTypeManager
    {

        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        ReaderDataContext ctxRead = new ReaderDataContext();

        #endregion

        #region "Read Methods"

        public IList GetExpensesTypeNames()
        {
            return ctxWrite.expenses_types.ToList();
        }

        public sp_expenses_type_SelectRowResult GetExpensesTypeDetails(int _Id)
        {
            return ctxRead.sp_expenses_type_SelectRow(_Id).FirstOrDefault();
        }

        public IList<sp_expenses_type_SelectRowResult> GetExpensesType(string param)
        {
            string sqlstr = @"SELECT  * FROM [expenses_type] WHERE 1 = 1 " + param;
            return ctxRead.ExecuteQuery<sp_expenses_type_SelectRowResult>(sqlstr).ToList();
        }


        #endregion

        #region "Write Methods"

        public bool SaveExpensesType(expenses_type item)
        {
            try
            {
                ctxWrite.sp_expenses_type_Update(item.id, item.expenses_type1, item.delete_result);              
                return true;
            }
            catch { return false; }
        }

        public int DeleteExpensesType(int Id)
        {
            try
            {
                return (int)ctxWrite.sp_expenses_type_DeleteRow(Id).FirstOrDefault().ChldsRows;
            }
            catch { return -1; }
        }

        #endregion

    }
}
