using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Aliraqcars.Domain.Data;

namespace Aliraqcars.Domain.Concrete
{
    public class CarsCustomList
    {
        public List<CarsData_SelectCarsListResult> CarsList { get; set; }
        public int Count { get; set; }
    }


    public class ICarsDataProperties
    {
        public List<IPayTypes> PayTypes { get; set; }
        public List<IShippingCompanies> ShippingCompanies { get; set; }
        public List<IAuctions> Auctions { get; set; }
        public List<IRegions> Regions { get; set; }
        public List<IBuyers> Buyers { get; set; }
        public List<ICarWorkingStatus> CarWorkingStatus { get; set; }
        public List<ICarsMaker> CarsMaker { get; set; }
        public List<ICarsModel> CarsModel { get; set; }
        public List<IColors> Colors { get; set; }
        public List<IDistinations> Distinations { get; set; }
        public List<ITransmissions> Transmissions { get; set; }
        public List<Clients_SelectNamesResult> Clients { get; set; }
    }

    public class IPayTypes
    {
        public int PayTypeID { get; set; }
        public string PayTypeName { get; set; }
    }

    public class IShippingCompanies
    {
        public int ShipCompanyID { get; set; }
        public string ShipCompanyNameEn { get; set; }
    }
    
    public class IAuctions
    {
        public int AuctionID { get; set; }
        public string AuctionName { get; set; }
    }

    public class IRegions
    {
        public int RegionID { get; set; }
        public string RegionEn { get; set; }
    }

    public class IBuyers
    {
        public int BuyerID { get; set; }
        public string BuyerName { get; set; }
    }

    public class ICarWorkingStatus
    {
        public int WorkingStatusID { get; set; }
        public string WorkingStatusName { get; set; }
        public int? ParentID { get; set; }
    }

    public class ICarsMaker
    {
        public int MakerID { get; set; }
        public string MakerNameEn { get; set; }
    }

    public class ICarsModel
    {
        public int ModelID { get; set; }
        public string TypeNameEn { get; set; }
    }

    public class IColors
    {
        public int ColorID { get; set; }
        public string ColorNameEn { get; set; }
    }

    public class ITransmissions
    {
        public int TransmissionID { get; set; }
        public string TransmissionNameEn { get; set; }
    }
}
