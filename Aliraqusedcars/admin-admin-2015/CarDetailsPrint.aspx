<%@ Page Title="تفاصيل السيارة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="CarDetailsPrint.aspx.cs" Inherits="CarDetailsPrintt" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/App_Themes/iraq/cars-details.min.css?v=1.0" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesPayView.aspx">السيارات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طباعة تفاصيل السيارة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="space-6">
            </div>
            <div class="row-fluid">
                <div class="span10 offset1">
                    <div class="widget-box transparent invoice-box">
                        <div class="widget-header widget-header-large">
                            <h3 class="grey lighter pull-left position-relative">
                                <img id="divMainPic" runat="server" alt="car" style="max-height: 119px!important" src="/public/cars/noimage.gif" />
                            </h3>
                            <h2 class="car-model" id="divModel" runat="server"></h2>
                            <div class="widget-toolbar no-border invoice-info">
                                <span class="invoice-info-label bolder">رقم السيارة:</span>
                                <span dir="ltr" class="required bolder" id="divCarID" runat="server" clientidmode="Static"></span>
                                <input type="hidden" id="CarID" />
                                <br />
                                <span class="invoice-info-label">تاريخ الإضافة:</span> <span class="blue" id="divAddDate" runat="server"></span>
                            </div>
                            <div class="widget-toolbar hidden-480">
                                <a class="printme hidden-print" data-rel="tooltip" title="طباعة الفاتورة" href="javascript:void(0);"><i class="icon-print bigger-150"></i>
                                </a>
                            </div>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main padding-24">
                                <div class="row-fluid">
                                    <div id="masterForm">
                                        <div class="row-fluid">
                                            <table class="table table-striped tbl-actions hidden-print" border="0">
                                                <tbody>
                                                    <tr>
                                                        <th><a visible="false" id="lnkPrev" runat="server" class="btn btn-info btn-small hidden-print" data-rel="tooltip" title="السيارة السابقه"><i class="icon-arrow-right"></i></a></th>
                                                        <th class="text-center">
                                                            <a id="lnkEdit" runat="server" clientidmode="Static" href="#" data-rel="tooltip" class="btn btn-info btn-small hidden-print" title="تعديل بيانات السيارة"><i class="icon-edit"></i>تعديل</a>
                                                            <a id="lnkPicture" href="#" data-rel="tooltip" class="btn btn-purple btn-small hidden-print" title="اضافة صور السيارة"><i class="icon-picture"></i>الصور</a>
                                                            <a id="lnkCarNotes" href="javascript:void(0)" data-rel="tooltip" class="btn btn-inverse btn-small hidden-print" title="التعليقات على السيارة"><i class="icon-list-ul"></i>التعليقات</a>
                                                            <a id="lnkShopExpenses" href="#" data-rel="tooltip" class="btn btn-yellow btn-small hidden-print" title="مصروف ورشة"><i class="icon-money"></i>مصروف ورشة</a>
                                                            <a id="lnkShippExpenses" href="#" data-rel="tooltip" class="btn btn-yellow btn-small hidden-print" title="مصروف شحن"><i class="icon-money"></i>مصروف شحن</a>
                                                            <a target="_blank" href="/share-car.aspx?carid=" id="ShareCar" class="btn btn-primary btn-small ShareCar" data-rel="tooltip" title="مشاركة الفيسبوك - تويتر - انستجرام"><i class="icon-facebook"></i>فيسبوك</a></th>
                                                        <th><a visible="false" id="lnkNext" runat="server" class="btn btn-info btn-small hidden-print pull-left" data-rel="tooltip" title="السيارة التالية"><i class="icon-arrow-left"></i></a></th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="row-fluid">
                                            <div class="span6">
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
                                            <div class="span6">
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
                                                                <span title="تفاصيل حوالة الدفع للسيارة" data-toggle="tooltip" id="divPayInvoicePaymentsID" runat="server" class="pull-left"></span>
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
                                        <div class="row-fluid" id="divCarCosts" runat="server" visible="false">
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
                                        <div class="hr hr-dotted">
                                        </div>
                                        <div class="row-fluid page-break">
                                            <h3>صور السيارة</h3>
                                            <ul class="ace-thumbnails clearfix" id="divIMagesList" runat="server" clientidmode="Static"></ul>
                                        </div>
                                        <div class="hidden-print">
                                            <a target="_blank" class="btn btn-block" id="downloadAllPictures">تحميل صور السيارة</a>
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12 well">
                                            <p class="text-center">Website: <a href="http://iraqusedcars.ae">www.iraqusedcars.ae</a> - Email: <a href="mailto:iraqusedcar@gmail.com">iraqusedcar@gmail.com</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="commentsModal" class="modal container hide fade" tabindex="-1" data-focus-on="input:first" aria-labelledby="myModalLabel" style="right: 35%;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="myModalLabel">
                        <i class="icon-edit"></i>
                    </h3>
                </div>
                <div class="modal-body" style="overflow-y: scroll;">
                    <div id="car-comments-div"></div>
                </div>
                <div class="modal-footer">
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إنهاء</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/jquery.colorbox-min.min.js?v=2"></script>
    <script src="/Scripts/Templates/CarShippExpensesPrint.min.js?v=1.0"></script>
    <script src="/Scripts/App/car-details.min.js?v=1.4"></script>
</asp:Content>
