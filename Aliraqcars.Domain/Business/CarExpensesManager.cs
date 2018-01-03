using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class CarExpesesManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public CarExpeses_SelectRowResult GetCarExpense(int Id)
        {
            return ctxWrite.CarExpeses_SelectRow(Id).FirstOrDefault();
        }

        public List<CarExpeses_SelectRowResult> GetCarExpeses(string param)
        {
            string sql = string.Format(@"SELECT CarExpeses.ExpenseID, CarExpeses.car_case, CarExpeses.ExpenseCost, CarExpeses.ExpenseDetails, CarExpeses.ExpenseDate, CarExpeses.IsDeleted, 
                                        CarExpeses.ExpenseTypeID, ExpenseTypes.ExpenseTypeNameAr FROM CarExpeses INNER JOIN ExpenseTypes ON CarExpeses.ExpenseTypeID = ExpenseTypes.ExpenseTypeID
	                                    WHERE IsDeleted=0 {0}", param);
            return ctxWrite.ExecuteQuery<CarExpeses_SelectRowResult>(sql).ToList();
        }

        #endregion

        #region "Write Methods"

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.CarExpeses_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}