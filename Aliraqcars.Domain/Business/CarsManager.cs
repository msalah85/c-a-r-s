using System;
using System.Collections.Generic;
using System.Linq;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class CarsManager
    {
        #region "Private Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public ICarDetails GetCarDetailsReport(long _Id, string Lot, int any)
        {
            var data = ctxWrite.CarsData_SelectDetailsAndCosts(_Id, Lot, any);

            var item = new ICarDetails();
            item.Car = data.GetResult<CarsData_SelectDetailsResult>().FirstOrDefault();
            item.Costs = data.GetResult<ExpensesOnCarReportPrint_FillReportResult>().FirstOrDefault();
            item.CanceledInvoices = data.GetResult<ICanceledInvoices>().ToList();

            return item;
        }

        public Cars_GetCarChassisNoResult GetCarChassisNo(string chassisNo)
        {
            return ctxWrite.Cars_GetCarChassisNo(chassisNo).FirstOrDefault();
        }
        #endregion

        #region "Write Methods"

        public bool ResetMainImage(string carID, string picName)
        {
            try
            {
                ctxWrite.ImagesResetMainImage(carID, picName);
                return true;
            }
            catch { return false; }
        }

        #endregion

    }
}