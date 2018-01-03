using Aliraqcars.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Aliraqcars.Domain.Concrete
{
    public class ICarDetails
    {
        public CarsData_SelectDetailsResult Car { get; set; }
        public ExpensesOnCarReportPrint_FillReportResult Costs { get; set; }
        public List<ICanceledInvoices> CanceledInvoices { get; set; }
    }

    public class ICanceledInvoices
    {
        public long SaleInvoiceID { get; set; }
        public string DeleteReason { get; set; }
        public bool? DelClientApprove { get; set; }
    }
}
