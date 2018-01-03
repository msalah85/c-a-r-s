
using System.Collections.Generic;
using System.Linq;
using Aliraqcars.Domain.Data;
using Aliraqcars.Domain.Concrete;

namespace Aliraqcars.Domain.Business
{
    public class CarsDataManager
    {
        #region "Public Declaration"
        WriterDataContext ctxWrite = new WriterDataContext();

        #endregion

        #region "Read Methods"

        public CarsData_SelectRowResult GetCarsData(long Id)
        {
            return ctxWrite.CarsData_SelectRow(Id).FirstOrDefault();
        }

        public List<CarsData_SelectRowResult> GetCarsData(string param)
        {
            string sql = string.Format(@"SELECT View_CarsList.*,View_SaleInvoices.full_name FROM View_CarsList LEFT OUTER JOIN View_SaleInvoices ON View_CarsList.CarID = View_SaleInvoices.CarID Where 1=1 {0} ORDER BY CarID DESC", param);
            return ctxWrite.ExecuteQuery<CarsData_SelectRowResult>(sql).ToList();
        }

        public CarsCustomList GetCarsData(int startIndex, int count, string searchParam, bool _sold, string sortField, string sortDirection)
        {
            var result = ctxWrite.CarsData_SelectCustomCarsList(startIndex, count, searchParam, _sold, sortField, sortDirection);

            CarsCustomList items = new CarsCustomList();
            if (result != null)
            {
                items.CarsList = result.GetResult<CarsData_SelectCarsListResult>().ToList();
                items.Count = (int)result.GetResult<int>().FirstOrDefault();
            }

            return items;
        }

        public ICarsDataProperties GetCarsProperties()
        {
            var result = ctxWrite.CarsData_SelectProperties();

            ICarsDataProperties item = new ICarsDataProperties();
            if (result != null)
            {
                item.PayTypes = result.GetResult<IPayTypes>().ToList();
                item.ShippingCompanies = result.GetResult<IShippingCompanies>().ToList();
                item.Auctions = result.GetResult<IAuctions>().ToList();
                item.Regions = result.GetResult<IRegions>().ToList();
                item.Buyers = result.GetResult<IBuyers>().ToList();
                item.CarWorkingStatus = result.GetResult<ICarWorkingStatus>().ToList();
                item.CarsMaker = result.GetResult<ICarsMaker>().ToList();
                item.CarsModel = result.GetResult<ICarsModel>().ToList();
                item.Colors = result.GetResult<IColors>().ToList();
                item.Distinations = result.GetResult<IDistinations>().ToList();
                item.Transmissions = result.GetResult<ITransmissions>().ToList();
                item.Clients = result.GetResult<Clients_SelectNamesResult>().ToList();
            }

            return item;
        }

        public CarsData_SelectFullCutTypeResult GetCarType(long carID)
        {
            return ctxWrite.CarsData_SelectFullCutType(carID).FirstOrDefault();
        }

        public CarData_SelectMainPictureResult GetCarMainPicture(long carID)
        {
            return ctxWrite.CarData_SelectMainPicture(carID).FirstOrDefault();
        }

        #endregion

        #region "Write Methods"

        public long SaveItem(CarsData item)
        {
            try
            {
                return ctxWrite.CarsData_InsertUpdate(item.CarID, item.ChassisNo, item.InvoiceDate, item.LotNo, item.PayTypeID,
                    item.PayPrice, item.ShipperID, item.RegionID, item.BuyerID, item.ModelID, item.WorkingStatusID, item.ColorID, item.Year,
                    item.Notes, item.IP, item.IsDeleted, item.view_home, item.view_offer, item.view_website, item.Arrived, item.DistinationID,
                    item.TransmissionID, item.OwnerID, item.WesitePrice, item.Visitors, item.ShippingCalcID, item.PayInvTypeID, item.UserID,
                    item.AccidentStatusID, item.AuctionID, item.SaleTypeID, item.ToSaleClientID, item.WithoutShipping, item.IsGulfOldCars, item.SalePriceDemand);
            }
            catch { return 0; }
        }

        public int DeleteItem(int Id)
        {
            try
            {
                return ctxWrite.CarsData_DeleteRow(Id);
            }
            catch { return -1; }
        }

        #endregion
    }
}