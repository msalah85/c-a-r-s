using System;
using System.Collections.Generic;
using System.Linq;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class ShippInvoiceManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public List<ShippInvoicesDetails_SelectRowResult> GetShippInvoicesDetails(string param)
        {
            string sql = string.Format(@"SELECT * FROM View_InvoicesDetails Where 0=0 {0} ORDER BY BillDetailsID DESC", param);
            return ctxWrite.ExecuteQuery<ShippInvoicesDetails_SelectRowResult>(sql).ToList();
        }
        public ShippInvoices_SelectRowResult GetShippInvoice(int Id)
        {
            return ctxWrite.ShippInvoices_SelectRow(Id).FirstOrDefault();
        }
        public List<ShippInvoices_SelectRowResult> GetShippInvoice(string param)
        {
            string sql = string.Format(@"SELECT * FROM View_ShippInvoices Where IsDeleted=0 {0} ORDER BY ShippInvoiceID DESC", param);
            return ctxWrite.ExecuteQuery<ShippInvoices_SelectRowResult>(sql).ToList();
        }
        public IShippInvoiceProperties GetShippInvoicesProperties()
        {
            var result = ctxWrite.ShippInvoices_SelectProperties();

            IShippInvoiceProperties items = new IShippInvoiceProperties();
            items.ShippingCompanies = result.GetResult<IShippingCompanies>().ToList();
            items.Distinations = result.GetResult<IDistinations>().ToList();
            items.NavigationCoNames = result.GetResult<INavigationCoNames>().ToList();

            return items;
        }

        #endregion

        #region "Write Methods"

        public int SaveItem(ShippInvoice item)
        {
            try
            {
                return ctxWrite.ShippInvoices_InsertUpdate(item.ShippInvoiceID, item.InvoiceDate, item.ShippPrice, item.DistinationID, item.ShipperID,
                    item.ArrivalDate, item.InvoiceNo, item.ContainerNo, item.ContainerSize, item.CarsNo, item.IsDeleted, item.Bol, item.LoadingPrice,
                    item.TotalAmount, item.NavigationCoID, item.Notes, item.TransportationPrice);
            }
            catch { return -1; } // error.
        }

        public bool SaveDetailsItem(ShippInvoicesDetail item)
        {
            try
            {
                ctxWrite.ShippInvoicesDetails_InsertUpdate(item.BillDetailsID, item.CarID, item.ShippInvoiceID, item.Towing, item.SeaTrans, item.Loading, item.Partitioning, item.Extra, item.IsDeleted, item.Notes, item.Transportation);
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        // delete invoice details item
        // delete car from invoice items
        public int DeleteItem(long Id)
        {
            try
            {
                return (int)ctxWrite.ShippInvoicesDetails_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}