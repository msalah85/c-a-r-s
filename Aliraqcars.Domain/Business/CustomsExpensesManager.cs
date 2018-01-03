using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class CustomsExpensesManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public List<CustomsExpenses_SelectListResult> GetCustomsExpenses()
        {
            return ctxWrite.CustomsExpenses_SelectList().ToList();
        }
        
        public IExpenseProperties GetExpenseProperties()
        {
            var result = ctxWrite.CustomsExpenses_SelectProperties();

            IExpenseProperties items = new IExpenseProperties();
            items.DistinationsNames = result.GetResult<IDistinationsNames>().ToList();
            items.ExpenseTypesNames = result.GetResult<IExpenseTypesNames>().ToList();

            return items;
        }

        #endregion

        #region "Write Methods"

        public bool SaveItem(CustomsExpense item)
        {
            try
            {
                ctxWrite.CustomsExpenses_Save(item.CustomsExpenseID, item.CustomsCompanyID, item.ExpenseTypeID, item.ExpensesCharge);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.CustomsExpenses_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}