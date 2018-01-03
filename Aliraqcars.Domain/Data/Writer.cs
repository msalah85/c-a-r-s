using System.Data.Linq.Mapping;
using System.Data.Linq;
using System.Reflection;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Data
{
    public partial class WriterDataContext
    {
        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.CarSaleInvoices_SelectCarToSale")]
        [ResultType(typeof(CarSaleInvoices_SelectCarToSaleResult))] // car details.
        [ResultType(typeof(ExpensesOnCarReportPrint_FillReportResult))] // car costs.
        public IMultipleResults CarSaleInvoices_SelectCarToSaleAndCosts([global::System.Data.Linq.Mapping.ParameterAttribute(Name = "CarID", DbType = "BigInt")] System.Nullable<long> carID)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), carID);
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.CarsData_SelectDetails")]
        [ResultType(typeof(CarsData_SelectDetailsResult))] // list of auctions.
        [ResultType(typeof(ExpensesOnCarReportPrint_FillReportResult))] // list of auctions.
        [ResultType(typeof(ICanceledInvoices))] // list of canceled Invoices.
        public IMultipleResults CarsData_SelectDetailsAndCosts([global::System.Data.Linq.Mapping.ParameterAttribute(Name = "CarID", DbType = "BigInt")] System.Nullable<long> carID, string LotNo, int Any)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), carID, LotNo, Any);
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.Buyers_SelectAuctionsClients")]
        [ResultType(typeof(Auctions_SelectNamesResult))] // list of auctions.
        [ResultType(typeof(Clients_SelectNamesResult))] // List of clients.
        [ResultType(typeof(AuctionsTypes_SelectNamesResult))] // List of auction types.
        public IMultipleResults Buyers_SelectAuctionsClientsList()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.Expenses_SelectProperties")]
        [ResultType(typeof(IDistinationsNames))] // list of Destinations names.
        [ResultType(typeof(IShippingCompaniesNames))] // List of ShippingCompanies names.
        [ResultType(typeof(IExpenseTypesNames))] // List of ExpenseTypes names.
        [ResultType(typeof(INavigationCoNames))] // List of Navigation Co. names.
        [ResultType(typeof(CustomsCompany))] // List of Customs Co. names.
        public IMultipleResults Expenses_SelectProperties(int type)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), type);
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.TowingExpenses_SelectProperties")]
        [ResultType(typeof(IRegionsNames))] // list of Regions names.
        [ResultType(typeof(IShippingCompaniesNames))] // List of ShippingCompanies names.
        [ResultType(typeof(IServiceTypesNames))] // List of ServiceTypes names.
        public IMultipleResults TowingExpenses_SelectProperties()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.CarsData_SelectProperties")]
        [ResultType(typeof(IPayTypes))]
        [ResultType(typeof(IShippingCompanies))]
        [ResultType(typeof(IAuctions))]
        [ResultType(typeof(IRegions))]
        [ResultType(typeof(IBuyers))]
        [ResultType(typeof(ICarWorkingStatus))]
        [ResultType(typeof(ICarsMaker))]
        [ResultType(typeof(ICarsModel))]
        [ResultType(typeof(IColors))]
        [ResultType(typeof(IDistinations))]
        [ResultType(typeof(ITransmissions))]
        [ResultType(typeof(Clients_SelectNamesResult))]
        public IMultipleResults CarsData_SelectProperties()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.ShippInvoices_SelectProperties")]
        [ResultType(typeof(IShippingCompanies))]
        [ResultType(typeof(IDistinations))]
        [ResultType(typeof(INavigationCoNames))] // navigation companies
        public IMultipleResults ShippInvoices_SelectProperties()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.CarSale_SelectProperties")]
        [ResultType(typeof(IClients))]
        [ResultType(typeof(IDistinations))]
        [ResultType(typeof(IChassisNo))]
        [ResultType(typeof(ILotNo))]
        public IMultipleResults CarSaleInvoices_SelectProperties()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.ShipperExpenses_SelectByShipperDistin")]
        [ResultType(typeof(ShipperExpenses_SelectByShipperDistinResult))]
        [ResultType(typeof(IChassisNo))]
        [ResultType(typeof(int?))]
        public IMultipleResults ShipperExpenses_SelectByShipperDistinationID(int shipperID, int distinationID)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), shipperID, distinationID);
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.TowingExpenses_SelectByRegionID")]
        [ResultType(typeof(IShippingCompaniesNames))]
        public ISingleResult<IShippingCompaniesNames> TowingExpenses_SelectByRegionID(int regionID, int distinationID)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), regionID, distinationID);
            return ((ISingleResult<IShippingCompaniesNames>)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.TowingExpenses_SelectByDistinationID")]
        [ResultType(typeof(IShippingCompaniesNames))]
        public ISingleResult<IShippingCompaniesNames> TowingExpenses_SelectByDistinationID(string DistinationID)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), DistinationID);
            return ((ISingleResult<IShippingCompaniesNames>)(result.ReturnValue));
        }

        // Cars list
        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.CarsData_SelectCarsList")]
        [ResultType(typeof(CarsData_SelectCarsListResult))]
        [ResultType(typeof(int))]
        public IMultipleResults CarsData_SelectCustomCarsList(int displayStart, int displayLength, string searchParam, bool sold, string sortColumn, string sortDirection)
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), displayStart, displayLength, searchParam, sold, sortColumn, sortDirection);
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.ClientBuyers_SelectProperties")]
        [ResultType(typeof(IClients))]
        [ResultType(typeof(IBuyers))]
        public IMultipleResults ClientBuyers_SelectProperties()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.CustomsExpenses_SelectProperties")]
        [ResultType(typeof(IDistinationsNames))] // list of Distinations names.
        [ResultType(typeof(IExpenseTypesNames))] // List of ExpenseTypes names.
        public IMultipleResults CustomsExpenses_SelectProperties()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return ((IMultipleResults)(result.ReturnValue));
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.CustomsInvoices_Properties")]
        [ResultType(typeof(CustomsInvoices_PropertiesResult))] // list of custom comps.
        [ResultType(typeof(IContainerNo))] // List of new containers.
        public IMultipleResults GetCustomsInvoices_Properties()
        {
            IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
            return ((IMultipleResults)(result.ReturnValue));
        }
    }
}