using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Concrete
{
    public class ICarToSale
    {
        public CarSaleInvoices_SelectCarToSaleResult Car { get; set; }
        public ExpensesOnCarReportPrint_FillReportResult Costs { get; set; }
    }
}
