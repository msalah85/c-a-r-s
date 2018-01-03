using System;
using System.Web;
using System.Linq;
using Minutesuae.SystemUtilities;
using System.Web.UI.WebControls;
using System.Collections.Generic;
using Aliraqcars.Domain.Business;

namespace Minutesuae.AlIraq
{
    /// <summary>
    /// Summary description for Class1
    /// </summary>
    static public class FillLists
    {
        const int startYear = 1980;

        static public void FillAuctionsTypes(DropDownList list)
        {
            list.Items.Clear();

            list.DataSource = new AuctionTypeManager().GetAuctionTypesNames();
            list.DataValueField = "AuctionTypeID";
            list.DataTextField = "AuctionTypeName";
            list.DataBind();

            list.Items.Insert(0, "");
        }

        public static void FillAuctionsBuyers(DropDownList ddlAuctions, DropDownList ddlClients, DropDownList ddlAuctionType)
        {
            var result = new BuyersManager().BuyerAssest();

            ddlAuctions.DataSource = result.Auctions;
            ddlAuctions.DataValueField = "AuctionID";
            ddlAuctions.DataTextField = "AuctionName";
            ddlAuctions.DataBind();
            ddlAuctions.Items.Insert(0, "");

            ddlAuctionType.DataSource = result.AuctionTypes;
            ddlAuctionType.DataValueField = "AuctionTypeID";
            ddlAuctionType.DataTextField = "AuctionTypeName";
            ddlAuctionType.DataBind();
            ddlAuctionType.Items.Insert(0, "");

            ddlClients.DataSource = result.Clients;
            ddlClients.DataValueField = "ClientID";
            ddlClients.DataTextField = "full_name";
            ddlClients.DataBind();
            ddlClients.Items.Insert(0, "");
        }

        public static void FillMakers(DropDownList ddlMakers)
        {
            var result = new MakersManager().GetMakers();

            ddlMakers.DataSource = result;
            ddlMakers.DataValueField = "MakerID";
            ddlMakers.DataTextField = "MakerNameEn";
            ddlMakers.DataBind();
            ddlMakers.Items.Insert(0, "");
        }

        public static void FillMainCompanies(DropDownList ShipMainCompanyID)
        {
            var result = new ShippingMainCompaniesManager().GetShippingMainCompanies("");

            ShipMainCompanyID.DataSource = result;
            ShipMainCompanyID.DataValueField = "ShipMainCompanyID";
            ShipMainCompanyID.DataTextField = "ShipMainCompanyNameAr";
            ShipMainCompanyID.DataBind();
            ShipMainCompanyID.Items.Insert(0, "");
        }

        public static void FillExpensesList(DropDownList ShipCompanyIDList, DropDownList ExpenseTypeIDList, DropDownList DistinationIDList, DropDownList NavigationCoList, DropDownList CustomsCo, int shippCustom)
        {
            var result = new ShipperExpensesManager().GetExpenseProperties(shippCustom);

            if (result != null)
            {
                ShipCompanyIDList.DataSource = result.ShippingCompaniesNames;
                ShipCompanyIDList.DataValueField = "ShipCompanyID";
                ShipCompanyIDList.DataTextField = "ShipCompanyNameAr";
                ShipCompanyIDList.DataBind();
                ShipCompanyIDList.Items.Insert(0, new ListItem("اختر الشاحن", ""));

                ExpenseTypeIDList.DataSource = result.ExpenseTypesNames;
                ExpenseTypeIDList.DataValueField = "ExpenseTypeID";
                ExpenseTypeIDList.DataTextField = "ExpenseTypeNameAr";
                ExpenseTypeIDList.DataBind();
                ExpenseTypeIDList.Items.Insert(0, new ListItem("نوع المصروف", ""));

                DistinationIDList.DataSource = result.DistinationsNames;
                DistinationIDList.DataValueField = "DistinationID";
                DistinationIDList.DataTextField = "DistinationNameAr";
                DistinationIDList.DataBind();
                DistinationIDList.Items.Insert(0, new ListItem("جهة الوصول", ""));

                NavigationCoList.DataSource = result.NavigationCoNames;
                NavigationCoList.DataValueField = "NavigationCoID";
                NavigationCoList.DataTextField = "NavigationCoName";
                NavigationCoList.DataBind();
                NavigationCoList.Items.Insert(0, new ListItem("شركة الملاحة", ""));

                CustomsCo.DataSource = result.CustomsCoNames;
                CustomsCo.DataValueField = "CustomsCompanyID";
                CustomsCo.DataTextField = "CustomsCompanyNameAr";
                CustomsCo.DataBind();
                CustomsCo.Items.Insert(0, new ListItem("شركة التخليص", ""));
            }
        }

        public static void FillTowingPropertiesList(DropDownList ShipCompanyIDList, DropDownList ServiceTypeIDList, DropDownList RegionIDList)
        {
            var result = new TowingExpensesManager().GetExpenseProperties();

            if (result != null)
            {
                ShipCompanyIDList.DataSource = result.ShippingCompaniesNames;
                ShipCompanyIDList.DataValueField = "ShipCompanyID";
                ShipCompanyIDList.DataTextField = "ShipCompanyNameAr";
                ShipCompanyIDList.DataBind();
                ShipCompanyIDList.Items.Insert(0, "");

                ServiceTypeIDList.DataSource = result.ServiceTypesNames;
                ServiceTypeIDList.DataValueField = "ServiceTypeID";
                ServiceTypeIDList.DataTextField = "ServiceTypeNameAr";
                ServiceTypeIDList.DataBind();
                ServiceTypeIDList.Items.Insert(0, "");

                RegionIDList.DataSource = result.RegionsNames;
                RegionIDList.DataValueField = "RegionID";
                RegionIDList.DataTextField = "RegionAr";
                RegionIDList.DataBind();
                RegionIDList.Items.Insert(0, "");
            }
        }

        public static void FillCarsProperties(DropDownList ddlDocTypes, DropDownList ddlCarStatus, DropDownList ddlCarType, DropDownList ddlColor, DropDownList ddlModel, DropDownList ddlRegion,
            DropDownList ddlSupplier, DropDownList ddlYear, DropDownList ddlDistination, DropDownList ddlTransmision, ListBox AccidentStatusID, DropDownList clients)
        {
            var result = new CarsDataManager().GetCarsProperties();

            if (result != null)
            {
                //ListItem first = new ListItem("اختر", "");

                AccidentStatusID.DataSource = result.CarWorkingStatus.Where(a => a.ParentID != null).OrderBy(a => a.WorkingStatusID);
                AccidentStatusID.DataTextField = "WorkingStatusName";
                AccidentStatusID.DataValueField = "WorkingStatusID";
                AccidentStatusID.DataBind();
                //AccidentStatusID.Items.Insert(0, "");

                ddlCarStatus.DataSource = result.CarWorkingStatus.Where(a => a.ParentID == null);
                ddlCarStatus.DataTextField = "WorkingStatusName";
                ddlCarStatus.DataValueField = "WorkingStatusID";
                ddlCarStatus.DataBind();
                ddlCarStatus.Items.Insert(0, "");

                ddlCarType.DataSource = result.CarsMaker;
                ddlCarType.DataTextField = "MakerNameEn";
                ddlCarType.DataValueField = "MakerID";
                ddlCarType.DataBind();
                ddlCarType.Items.Insert(0, "");

                ddlColor.DataSource = result.Colors;
                ddlColor.DataTextField = "ColorNameEn";
                ddlColor.DataValueField = "ColorID";
                ddlColor.DataBind();
                ddlColor.Items.Insert(0, "");

                ddlDocTypes.DataSource = result.PayTypes;
                ddlDocTypes.DataTextField = "PayTypeName";
                ddlDocTypes.DataValueField = "PayTypeID";
                ddlDocTypes.DataBind();
                //ddlDocTypes.Items.Insert(0, "");

                ddlRegion.DataSource = result.Regions;
                ddlRegion.DataTextField = "RegionEn";
                ddlRegion.DataValueField = "RegionID";
                ddlRegion.DataBind();
                ddlRegion.Items.Insert(0, "");

                //ddlShipper.DataSource = result.ShippingCompanies;
                //ddlShipper.DataTextField = "ShipCompanyNameEn";
                //ddlShipper.DataValueField = "ShipCompanyID";
                //ddlShipper.DataBind();
                //ddlShipper.Items.Insert(0, "");

                ddlSupplier.DataSource = result.Auctions;
                ddlSupplier.DataTextField = "AuctionName";
                ddlSupplier.DataValueField = "AuctionID";
                ddlSupplier.DataBind();
                ddlSupplier.Items.Insert(0, "");

                ddlModel.DataSource = result.CarsModel;
                ddlModel.DataTextField = "TypeNameEn";
                ddlModel.DataValueField = "ModelID";
                ddlModel.DataBind();
                ddlModel.Items.Insert(0, "");

                ddlDistination.DataSource = result.Distinations;
                ddlDistination.DataTextField = "DistinationNameEn";
                ddlDistination.DataValueField = "DistinationID";
                ddlDistination.DataBind();
                ddlDistination.Items.Insert(0, "");

                ddlTransmision.DataSource = result.Transmissions;
                ddlTransmision.DataTextField = "TransmissionNameEn";
                ddlTransmision.DataValueField = "TransmissionID";
                ddlTransmision.DataBind();
                ddlTransmision.Items.Insert(0, "");

                clients.DataSource = result.Clients;
                clients.DataTextField = "full_name";
                clients.DataValueField = "ClientID";
                clients.DataBind();
                clients.Items.Insert(0, "");


                int _count = DateTime.UtcNow.Year + 2 - startYear;
                var yearsList = Enumerable.Range(startYear, _count).ToList();
                ddlYear.DataSource = yearsList.OrderByDescending(a => a);
                ddlYear.DataBind();
                ddlYear.Items.Insert(0, "");
            }
        }

        public static void FillShipProperties(DropDownList ddlDistination, DropDownList NavigationCoIDList, DropDownList ShippingCompanies)
        {
            var result = new ShippInvoiceManager().GetShippInvoicesProperties();

            if (result != null)
            {
                ListItem first = new ListItem("اختر", "");

                ShippingCompanies.DataSource = result.ShippingCompanies;
                ShippingCompanies.DataTextField = "ShipCompanyNameEn";
                ShippingCompanies.DataValueField = "ShipCompanyID";
                ShippingCompanies.DataBind();
                ShippingCompanies.Items.Insert(0, first);

                ddlDistination.DataSource = result.Distinations;
                ddlDistination.DataTextField = "DistinationNameEn";
                ddlDistination.DataValueField = "DistinationID";
                ddlDistination.DataBind();
                ddlDistination.Items.Insert(0, first);

                NavigationCoIDList.DataSource = result.NavigationCoNames;
                NavigationCoIDList.DataTextField = "NavigationCoName";
                NavigationCoIDList.DataValueField = "NavigationCoID";
                NavigationCoIDList.DataBind();
                NavigationCoIDList.Items.Insert(0, first);
            }
        }

        public static void FillMarkers(DropDownList ddlmaker_id, DropDownList ddlYear)
        {
            var result = new MakersManager().GetMakers();
            if (result != null)
            {
                ddlmaker_id.DataSource = result;
                ddlmaker_id.DataTextField = "MakerNameEn";
                ddlmaker_id.DataValueField = "MakerID";
                ddlmaker_id.DataBind();
                ddlmaker_id.Items.Insert(0, "-----اختر-----");
            }

            // Fill year
            int _count = DateTime.UtcNow.Year + 2 - startYear;
            var yearsList = Enumerable.Range(startYear, _count).ToList();

            ddlYear.DataSource = yearsList;
            ddlYear.DataBind();
            ddlYear.Items.Insert(0, "-----اختر-----");

        }

        public static void FillModelsList(DropDownList ddlType_id, int p)
        {
            var result = new ModelsManager().GetCarModels(" AND CarsModel.MakerID = " + p);
            if (result != null)
            {
                ddlType_id.DataSource = result;
                ddlType_id.DataTextField = "TypeNameEn";
                ddlType_id.DataValueField = "ModelID";
                ddlType_id.DataBind();
                ddlType_id.Items.Insert(0, "");
            }
        }

        public static void FillShippingCoByRegion(DropDownList ShipCompanyIDList, int regionId, int distId)
        {
            ShipCompanyIDList.Items.Clear();

            var result = new ShippingCompaniesManager().GetShippingCompByRegionId(regionId, distId);

            ShipCompanyIDList.DataSource = result;
            ShipCompanyIDList.DataValueField = "ShipCompanyID";
            ShipCompanyIDList.DataTextField = "ShipCompanyNameAr";
            ShipCompanyIDList.DataBind();
            ShipCompanyIDList.Items.Insert(0, "");

        }

        public static void fillShippingCoByDistination(DropDownList ShipCompanyIDList, string distinationId)
        {
            ShipCompanyIDList.Items.Clear();

            var result = new ShippingCompaniesManager().GetShippingCompByDistinationId(distinationId);

            ShipCompanyIDList.DataSource = result;
            ShipCompanyIDList.DataValueField = "ShipCompanyID";
            ShipCompanyIDList.DataTextField = "ShipCompanyNameAr";
            ShipCompanyIDList.DataBind();
            ShipCompanyIDList.Items.Insert(0, "");

        }

        public static void FillCarsSaleProperties(DropDownList ddlClient, DropDownList ddlDistination)
        {
            var result = new CarsSaleInvoiceManager().GetCarsSaleProperties();

            if (result != null)
            {
                ddlClient.DataSource = result.Clients;
                ddlClient.DataValueField = "ClientID";
                ddlClient.DataTextField = "full_name";
                ddlClient.DataBind();
                ddlClient.Items.Insert(0, "");

                ddlDistination.DataSource = result.Distinations;
                ddlDistination.DataValueField = "DistinationID";
                ddlDistination.DataTextField = "DistinationNameEn";
                ddlDistination.DataBind();
                ddlDistination.Items.Insert(0, "");
            }
        }

        public static void fillClientBuyersProperties(DropDownList ddlBuyerID, DropDownList ddlClientID)
        {
            var result = new ClientBuyersManager().GetClientBuyerProperties();

            if (result != null)
            {
                ddlClientID.DataSource = result.Clients;
                ddlClientID.DataValueField = "ClientID";
                ddlClientID.DataTextField = "full_name";
                ddlClientID.DataBind();
                ddlClientID.Items.Insert(0, "");

                ddlBuyerID.DataSource = result.Buyers;
                ddlBuyerID.DataValueField = "BuyerID";
                ddlBuyerID.DataTextField = "BuyerName";
                ddlBuyerID.DataBind();
                ddlBuyerID.Items.Insert(0, "");
            }
        }

        public static void FillExpensesList(DropDownList DistinationIDList)
        {
            var result = new ShipperExpensesManager().GetExpenseProperties(1);

            if (result != null)
            {
                DistinationIDList.DataSource = result.DistinationsNames;
                DistinationIDList.DataValueField = "DistinationID";
                DistinationIDList.DataTextField = "DistinationNameAr";
                DistinationIDList.DataBind();
                DistinationIDList.Items.Insert(0, "");
            }
        }

        public static void FillExpensesList(DropDownList ExpenseTypeIDList, DropDownList DistinationIDList)
        {
            var result = new CustomsExpensesManager().GetExpenseProperties();

            if (result != null)
            {
                ExpenseTypeIDList.DataSource = result.ExpenseTypesNames;
                ExpenseTypeIDList.DataValueField = "ExpenseTypeID";
                ExpenseTypeIDList.DataTextField = "ExpenseTypeNameAr";
                ExpenseTypeIDList.DataBind();
                ExpenseTypeIDList.Items.Insert(0, "");

                DistinationIDList.DataSource = result.DistinationsNames;
                DistinationIDList.DataValueField = "DistinationID";
                DistinationIDList.DataTextField = "DistinationNameAr";
                DistinationIDList.DataBind();
                DistinationIDList.Items.Insert(0, "");
            }
        }

        public static void FillCustomsInvoiceProperties(DropDownList ddlCustomsCo, DropDownList ddlContainer)
        {
            var result = new CustomsInvoicesManager().GetCustomsInvoiceProperties();

            if (result != null)
            {
                ddlCustomsCo.DataSource = result.CustomCompanies;
                ddlCustomsCo.DataValueField = "CustomsCompanyID";
                ddlCustomsCo.DataTextField = "CustomsCompanyNameAr";
                ddlCustomsCo.DataBind();
                ddlCustomsCo.Items.Insert(0, "");

            }
        }

        public static void GetJos(DropDownList JobJD)
        {
            var result = new UsersManager().GetJobs();

            if (result != null)
            {
                JobJD.DataSource = result;
                JobJD.DataValueField = "JobID";
                JobJD.DataTextField = "JobName";
                JobJD.DataBind();
                JobJD.Items.Insert(0, "");
            }
        }
    }
}