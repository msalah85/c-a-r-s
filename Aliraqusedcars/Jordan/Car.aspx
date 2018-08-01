<%@ Page Title="" Language="C#" MasterPageFile="~/Jordan/Site.master" AutoEventWireup="true" CodeFile="Car.aspx.cs" Inherits="Jordan_Car" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBanner" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="container-padding" id="page-contents">
        <div class="sub-menu">
            <ol class="breadcrumb">
                <li><a href="Home">الرئيسية</a></li>
                <li><a href="Cars">السيارات</a></li>
                <li><a href="Clients">العملاء</a></li>
                <li><a href="Containers">الحاويات</a></li>
            </ol>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h1 class="page-header">تفاصيل السيارة <strong id="divModel" class="orange" runat="server"></strong></h1>
            </div>
            <div class="col-sm-12">
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="row">
                            <img id="divMainPic" runat="server" alt="car" style="max-height: 119px!important" src="/public/cars/noimage.gif" />
                            <div class="bill-left-info pull-left">
                                <p><span class="invoice-info-label bolder">رقم السيارة:<span dir="ltr" class="required bolder" id="divCarID" runat="server" clientidmode="Static"></span></span></p>
                                <input type="hidden" id="CarID" />
                                <p><span class="invoice-info-label">تاريخ الإضافة:</span> <span class="blue" id="divAddDate" runat="server"></span></p>
                            </div>
                        </div>
                        <div class="row">
                            <div id="masterForm">
                                <div class="row">
                                    <div class="col-md-6">
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <td class="cel-bg" width="33%">مكان السيارة
                                                    </td>
                                                    <td>
                                                        <span id="divLocation" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">اسم المزاد
                                                    </td>
                                                    <td>
                                                        <span id="divAuctionName" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg"><span runat="server" id="divBuyerTitle">الباير</span>
                                                    </td>
                                                    <td>
                                                        <span id="divBuyerName" runat="server"></span>&nbsp;&nbsp;<span id="divPuyClientName" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">اللون
                                                    </td>
                                                    <td>
                                                        <span id="divColor" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">الجير
                                                    </td>
                                                    <td>
                                                        <span id="DivGear" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">حالة السيارة
                                                    </td>
                                                    <td>
                                                        <span id="divStatus" runat="server"></span>
                                                        <span id="ShippingCalcName" runat="server" class="pull-left" title="طريقة الحساب"></span>
                                                        <span class="pull-left">سيارة:&nbsp;</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">رقم اللوت
                                                    </td>
                                                    <td>
                                                        <span id="divLotNo" class="red" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">رقم الشاسية
                                                    </td>
                                                    <td>
                                                        <span id="divChassis" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">تاريخ الشراء
                                                    </td>
                                                    <td>
                                                        <span id="divInvoiceDate" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">تاريخ البيع
                                                    </td>
                                                    <td>
                                                        <span id="divSaleDate" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">تاريخ الوصول
                                                    </td>
                                                    <td>
                                                        <span id="divArriveDate" class="green" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg"><span id="divDistinTitle" runat="server">جهة الوصول</span>
                                                    </td>
                                                    <td>
                                                        <span id="divDistination" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">مالك السيارة
                                                    </td>
                                                    <td>
                                                        <span id="divPayTypeName" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">تسليم ورق السيارة للعميل
                                                    </td>
                                                    <td>
                                                        <span id="divReceiveWithPaper" runat="server"></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-6">
                                        <table class="table table-bordered tab-striped">
                                            <tbody>
                                                <tr>
                                                    <td class="cel-bg">حالة بيع السيارة
                                                    </td>
                                                    <td>
                                                        <span id="divSold" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">طريقة البيع
                                                    </td>
                                                    <td>
                                                        <span id="divSaleType" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">العرض بالموقع
                                                    </td>
                                                    <td>
                                                        <span id="divViewWebsite" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">وصول السيارة
                                                    </td>
                                                    <td>
                                                        <span id="divArrived" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg" width="33%"><span id="divPayPriceTitle" runat="server">سعر الشراء</span></td>
                                                    <td>
                                                        <span id="divPayPrice" class="orange" runat="server">0</span>&nbsp;$
                                                                <span title="رقم حوالة الدفع للسيارة" data-toggle="tooltip" id="divPayInvoicePaymentsID" runat="server" class="pull-left"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">سعر البيع
                                                    </td>
                                                    <td>
                                                        <span id="divSalePrice" class="green" runat="server">0</span>&nbsp;$
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">السعر بالموقع
                                                    </td>
                                                    <td>
                                                        <span id="divWebsitePrice" runat="server">0</span>&nbsp;$
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">العميل
                                                    </td>
                                                    <td>
                                                        <span id="divSoldClientName" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">المدينة
                                                    </td>
                                                    <td>
                                                        <span id="divRegionEn" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">الشاحن
                                                    </td>
                                                    <td>
                                                        <span class="purple" id="divShipCompanyName" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">رقم الحاوية
                                                    </td>
                                                    <td>
                                                        <span class="pink2" id="divContainerNo" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">رقم الحجز للحاوية BOL
                                                    </td>
                                                    <td>
                                                        <span id="divBol" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">Title أمريكا
                                                    </td>
                                                    <td>
                                                        <span id="divCarTitle" runat="server"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">ملاحظات
                                                    </td>
                                                    <td>
                                                        <span id="divNotes" runat="server"></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="divCarCosts" runat="server" visible="false">
                            <h3>تكاليف السيارة</h3>
                            <table class="table table-bordered" width="100%">
                                <thead>
                                    <tr class="cel-bg">
                                        <th colspan="2">تكاليف الشراء</th>
                                        <th>Towing</th>
                                        <th>شحن/تحميل</th>
                                        <th id="divPartitioning2" runat="server" title="مصروفات تقطيع">تقطيع</th>
                                        <th id="divTransportation2" runat="server" title="مصروفات نقل للسيارات السكراب">نقل</th>
                                        <th title="مصروفات شحن أخري">م.شحن أخري</th>
                                        <th id="divExchangeFeeOnCar" runat="server" title="مصاريف حوالة">م. حوالة</th>
                                        <th id="divCustomExpenses2" runat="server">تخليص</th>
                                        <th id="divCustomOnCar2" runat="server">جمارك</th>
                                        <th>خصم</th>
                                        <th id="divShippExpensesCost2" runat="server" title="مصروف شحن إمارات">مصروف شحن</th>
                                        <th id="divShopExpensesCost2" runat="server" title="مصروف ورشة إمارات">مصروف ورشة</th>
                                        <th>عمولة باير</th>
                                        <th>الاجمالى</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td title="سعر الشراء">
                                            <asp:Label ID="PayPayments" runat="server" Text="0"></asp:Label></td>
                                        <td title="الغرامات">
                                            <asp:Label ID="BuyPaymentFees" runat="server" Text="0"></asp:Label></td>
                                        <td>
                                            <asp:Label ID="Towing" runat="server" Text="0"></asp:Label></td>
                                        <td>
                                            <asp:Label ID="ShipPriceLoading" runat="server" Text="0"></asp:Label></td>
                                        <td id="divPartitioning" runat="server">
                                            <!--Scrap only-->
                                            <asp:Label ID="Partitioning" runat="server" Text="0"></asp:Label></td>
                                        <td id="divTransportation" runat="server">
                                            <!--Scrap only-->
                                            <asp:Label ID="Transportation" runat="server" Text="0"></asp:Label></td>
                                        <td>
                                            <asp:Label ID="Extra" runat="server" Text="0"></asp:Label></td>
                                        <td>
                                            <asp:Label ID="ExchangeFeeOnCar" runat="server" Text="0"></asp:Label></td>

                                        <td id="divCustomExpenses" runat="server">
                                            <asp:Label ID="CustomExpenses" runat="server" Text="0"></asp:Label></td>
                                        <td id="divCustomOnCar" runat="server">
                                            <asp:Label ID="CustomOnCar" runat="server" Text="240"></asp:Label></td>
                                        <td>
                                            <asp:Label ID="CarDiscount" runat="server" Text="0"></asp:Label></td>
                                        <td id="divShippExpensesCost" runat="server">
                                            <!--uae only-->
                                            <asp:Label ID="ShippExpensesCost" runat="server" Text="0"></asp:Label></td>
                                        <td id="divShopExpensesCost" runat="server">
                                            <!--uae only-->
                                            <asp:Label ID="ShopExpensesCost" runat="server" Text="0"></asp:Label></td>
                                        <td>
                                            <asp:Label ID="AuctionCommCost" runat="server" Text="0"></asp:Label></td>
                                        <td>
                                            <asp:Label ID="TotalCosts" runat="server" Text="0"></asp:Label>
                                            $</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="page-break" runat="server" id="imagesBlock">
                                <h3>صور السيارة</h3>
                                <ul class="ace-thumbnails clearfix" id="divIMagesList" runat="server" clientidmode="Static"></ul>
                                <a href="javascript:void(0);" target="_blank" class="btn btn-primary btn-block" id="downloadAllPictures">تحميل صور السيارة</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentScripts" runat="Server">
    <script src="/Scripts/App/car-details.min.js?v=1.4"></script>
</asp:Content>

