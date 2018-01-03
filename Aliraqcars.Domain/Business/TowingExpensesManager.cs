using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class TowingExpensesManager
    {

        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public TowingExpenses_SelectRowResult GetTowingExpenses(int Id)
        {
            return ctxWrite.TowingExpenses_SelectRow(Id).FirstOrDefault();
        }

        //public List<TowingExpenses_SelectListResult> GetTowingExpenses()
        //{
        //    return ctxWrite.TowingExpenses_SelectList().ToList();
        //}
        
        public ITowingExpenseProperties GetExpenseProperties()
        {
            var result = ctxWrite.TowingExpenses_SelectProperties();

            ITowingExpenseProperties items = new ITowingExpenseProperties();
            items.RegionsNames = result.GetResult<IRegionsNames>().ToList();
            items.ShippingCompaniesNames = result.GetResult<IShippingCompaniesNames>().ToList();
            items.ServiceTypesNames = result.GetResult<IServiceTypesNames>().ToList();

            return items;
        }

        #endregion

        #region "Write Methods"

        public bool SaveItem(TowingExpense item)
        {
            try
            {
                ctxWrite.TowingExpenses_InsertUpdate(item.TowingExpenseID, item.ShipCompanyID, item.RegionID, item.ServiceTypeID, item.ExpensesCharge);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.TowingExpenses_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion

    }
}