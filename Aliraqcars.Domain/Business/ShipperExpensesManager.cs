using System;
using System.Collections.Generic;
using System.Linq;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class ShipperExpensesManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public ShipperExpenses_SelectRowResult GetShipperExpense(int Id)
        {
            return ctxWrite.ShipperExpenses_SelectRow(Id).FirstOrDefault();
        }

        //public List<ShipperExpenses_SelectListResult> GetShipperExpenses()
        //{
        //    return ctxWrite.ShipperExpenses_SelectList().ToList();
        //}

        public IExpensesByShipperDistininations GetShipperExpenses(int distinationId, int shipperId)
        {
            var result = ctxWrite.ShipperExpenses_SelectByShipperDistinationID(shipperId, distinationId);

            var items = new IExpensesByShipperDistininations();
            if (result != null)
            {
                items.Expenses = result.GetResult<ShipperExpenses_SelectByShipperDistinResult>().ToList();
                items.CarChassis = result.GetResult<IChassisNo>().ToList();
                items.TowingCost = result.GetResult<int?>().FirstOrDefault();
            }
            return items;
        }

        public IExpenseProperties GetExpenseProperties(int shippingCustomID)
        {
            var result = ctxWrite.Expenses_SelectProperties(shippingCustomID);

            IExpenseProperties items = new IExpenseProperties();
            items.DistinationsNames = result.GetResult<IDistinationsNames>().ToList();
            items.ShippingCompaniesNames = result.GetResult<IShippingCompaniesNames>().ToList();
            items.ExpenseTypesNames = result.GetResult<IExpenseTypesNames>().ToList();
            items.NavigationCoNames = result.GetResult<INavigationCoNames>().ToList();
            items.CustomsCoNames = result.GetResult<CustomsCompany>().ToList();

            return items;
        }

        #endregion

        #region "Write Methods"

        public bool SaveItem(ShipperExpense item)
        {
            try
            {
                ctxWrite.ShipperExpenses_InsertUpdate(item.ShipperExpenseID, item.ShowTypeID, item.ShipCompanyID, item.ExpenseTypeID, item.ServiceTypeID,
                    item.DistinationID, item.ExpensesCharge, item.ExpenseCalcType, item.NavigationCoID, item.ContainerSize, item.CarsNo, item.CustomsCompanyID);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.ShipperExpenses_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}