using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Concrete
{
    public class IExpenseProperties
    {
        public List<IDistinationsNames> DistinationsNames { get; set; }
        public List<IShippingCompaniesNames> ShippingCompaniesNames { get; set; }
        public List<IExpenseTypesNames> ExpenseTypesNames { get; set; }
        public List<INavigationCoNames> NavigationCoNames { get; set; }
        public List<CustomsCompany> CustomsCoNames { get; set; }
    }

    public class ITowingExpenseProperties
    {
        public List<IRegionsNames> RegionsNames { get; set; }
        public List<IShippingCompaniesNames> ShippingCompaniesNames { get; set; }
        public List<IServiceTypesNames> ServiceTypesNames { get; set; }
    }




    ///////////////////////////////////////////////////////////////////////////////////////////

    public class IRegionsNames
    {
        public int RegionID { get; set; }
        public string RegionAr { get; set; }
    }

    public class IDistinationsNames
    {
        public int DistinationID { get; set; }
        public string DistinationNameAr { get; set; }
    }

    public class IShippingCompaniesNames
    {
        public int ShipCompanyID { get; set; }
        public string ShipCompanyNameAr { get; set; }
    }

    public class IExpenseTypesNames
    {
        public int ExpenseTypeID { get; set; }
        public string ExpenseTypeNameAr { get; set; }
    }

    public class IServiceTypesNames
    {
        public int ServiceTypeID { get; set; }
        public string ServiceTypeNameAr { get; set; }
    }

    public class INavigationCoNames
    {
        public int NavigationCoID { get; set; }
        public string NavigationCoName { get; set; }
    }
}
