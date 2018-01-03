using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Concrete
{
    public class IShippInvoiceProperties
    {
        public List<IShippingCompanies> ShippingCompanies { get; set; }
        public List<IChassisNo> ChassisNo { get; set; }
        public List<IDistinations> Distinations { get; set; }
        public List<INavigationCoNames> NavigationCoNames { get; set; }
    }
    public class IChassisNo
    {
        public long CarID { get; set; }
        public string ChassisNo { get; set; }
    }
    public class IDistinations
    {
        public int DistinationID { get; set; }
        public string DistinationNameEn { get; set; }
    }

    public class IExpensesByShipperDistininations
    {
        public List<ShipperExpenses_SelectByShipperDistinResult> Expenses { get; set; }
        public List<IChassisNo> CarChassis { get; set; }
        public int? TowingCost { get; set; }
    }
}