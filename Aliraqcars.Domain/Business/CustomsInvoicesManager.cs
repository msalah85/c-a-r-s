using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class CustomsInvoicesManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();
        #endregion

        #region "Read Methods"

        public List<CustomsInvoices_SelectRowResult> GetCustomsInvoices(string param)
        {
            string sql = string.Format(@"SELECT * FROM View_CustomsInvoices Where 0=0 {0} ORDER BY CustomsInvoiceID DESC", param);
            return ctxWrite.ExecuteQuery<CustomsInvoices_SelectRowResult>(sql).ToList();
        }

        public List<CustomsInvoicesDetails_SelectRowResult> GetCustomsInvoicesDetails(string param)
        {
            string sql = string.Format(@"SELECT * FROM View_CustomsInvoiceDetails Where 0=0 {0} ORDER BY CustomsDetailsID DESC", param);
            return ctxWrite.ExecuteQuery<CustomsInvoicesDetails_SelectRowResult>(sql).ToList();
        }

        public CustomsInvoices_SelectRowResult GetCustomsInvoice(int Id)
        {
            return ctxWrite.CustomsInvoices_SelectRow(Id).FirstOrDefault();
        }

        public ICustomInvoices GetCustomsInvoiceProperties()
        {
            var data = ctxWrite.GetCustomsInvoices_Properties();
            var result = new ICustomInvoices();

            if (data != null)
            {
                result.CustomCompanies = data.GetResult<CustomsInvoices_PropertiesResult>().ToList();
                result.Containers = data.GetResult<IContainerNo>().ToList();
            }

            return result;
        }

        public List<CustomsInvoicesDetails_PropertiesResult> GetCustomsExpenseTypesForComp(string containerN)
        {
            return ctxWrite.CustomsInvoicesDetails_Properties(containerN).ToList();
        }

        //public List<CustomsInvoices_SelectRowResult> GetCustomsInvoice(string param)
        //{
        //    string sql = string.Format(@"SELECT * FROM View_CustomsInvoices Where IsDeleted=0 {0} ORDER BY CustomsInvoiceID DESC", param);
        //    return ctxWrite.ExecuteQuery<CustomsInvoices_SelectRowResult>(sql).ToList();
        //}

        //public ICustomsInvoiceProperties GetCustomsInvoicesProperties()
        //{
        //    var result = ctxWrite.CustomsInvoices_SelectProperties();

        //    ICustomsInvoiceProperties items = new ICustomsInvoiceProperties();
        //    items.CustomsingCompanies = result.GetResult<ICustomsingCompanies>().ToList();
        //    items.ChassisNo = result.GetResult<IChassisNo>().ToList();
        //    items.Distinations = result.GetResult<IDistinations>().ToList();

        //    return items;
        //}

        #endregion

        #region "Write Methods"

        public int SaveItem(CustomsInvoice item)
        {
            try
            {
                return ctxWrite.CustomsInvoices_Save(item.CustomsInvoiceID, item.InvoiceDate, item.CustomsCompanyID, item.CustomsPrice, item.InvoiceNo, item.ContainerNo, item.Notes, item.IsDeleted, item.TotalCustoms, item.TotalExpenses, item.TotalAmount);
            }
            catch { return -1; }
        }

        public bool SaveDetailsItem(CustomsInvoicesDetail item)
        {
            try
            {
                ctxWrite.CustomsInvoicesDetails_Save(item.CustomsDetailsID, item.CustomsInvoiceID, item.ExpenseTypeID, item.CustomsExpenseValue, item.IsDeleted, item.CarsNo, item.TotalExpensesValue);
                return true;
            }
            catch { return false; }
        }

        public int DeleteItem(long Id)
        {
            try
            {
                return (int)ctxWrite.CustomsInvoices_DeleteRow(Id);
            }
            catch { return -1; }
        }

        public int DeleteDetailsItem(long Id)
        {
            try
            {
                return (int)ctxWrite.CustomsInvoicesDetails_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}