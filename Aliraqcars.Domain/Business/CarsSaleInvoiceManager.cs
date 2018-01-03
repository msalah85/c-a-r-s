using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class CarsSaleInvoiceManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public CarSaleInvoices_SelectToEditResult GetCarSaleInvoiceToEdit(long Id)
        {
            return ctxWrite.CarSaleInvoices_SelectToEdit(Id).FirstOrDefault();
        }

        public ICarToSale GetCarToSale(long Id)
        {
            var item = new ICarToSale();
            var result = ctxWrite.CarSaleInvoices_SelectCarToSaleAndCosts(Id);
            if (result != null)
            {
                item.Car = result.GetResult<CarSaleInvoices_SelectCarToSaleResult>().FirstOrDefault();
                item.Costs = result.GetResult<ExpensesOnCarReportPrint_FillReportResult>().FirstOrDefault();
            }
            return item;
        }

        public CarSaleInvoices_SelectRowResult GetCarSaleInvoice(long Id)
        {
            return ctxWrite.CarSaleInvoices_SelectRow(Id).FirstOrDefault();
        }

        public CarSaleInvoices_PrintAfterSaleResult GetCarSaleInvoiceToPrint(long Id)
        {
            return ctxWrite.CarSaleInvoices_PrintAfterSale(Id).FirstOrDefault();
        }

        public List<CarSaleInvoices_SelectRowResult> GetCarSaleInvoice(string param)
        {
            string sql = string.Format(@"SELECT * FROM View_SaleInvoices Where 1=1 {0} ORDER BY SaleInvoiceID DESC", param);
            return ctxWrite.ExecuteQuery<CarSaleInvoices_SelectRowResult>(sql).ToList();
        }

        public ICarSaleInvoiceProperties GetCarsSaleProperties()
        {
            var result = ctxWrite.CarSaleInvoices_SelectProperties();

            ICarSaleInvoiceProperties item = new ICarSaleInvoiceProperties();
            if (result != null)
            {
                item.Clients = result.GetResult<IClients>().ToList();
                item.Distinations = result.GetResult<IDistinations>().ToList();
                item.ChassisNo = result.GetResult<IChassisNo>().ToList();
                item.LotNo = result.GetResult<ILotNo>().ToList();
            }
            return item;
        }

        #endregion

        #region "Write Methods"

        public int SaveItem(CarSaleInvoice item, byte payTypeID)
        {
            try
            {
                return ctxWrite.CarSaleInvoices_Save(item.SaleInvoiceID, item.InvoiceDate, item.ClientID, item.CarID, item.SaleTypeID,
                    item.DistinationID, item.ArrivalDate, item.PayPrice, item.SalePrice, item.PayCalcTypeCost, item.CarSizeCost,
                    item.ExtraCost, item.CarFinalPrice, item.Notes, item.IP, item.IsDeleted, item.UserID, payTypeID, item.CarDiscount, item.CarMoreCost);
            }
            catch { return 0; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return (int)ctxWrite.CarSaleInvoices_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}