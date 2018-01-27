<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InvoicePrint.aspx.cs" Inherits="InvoicePrint" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>طباعة فاتورة البيع</title>
    <script>window.print();</script>
    <link href="//fonts.googleapis.com/earlyaccess/droidarabickufi.css" rel="stylesheet" />
    <link href="/App_Themes/iraq/allcss.min.css" id="appStyles" rel="stylesheet" />
    <script src="/Scripts/jquery-1.10.2.min.js"></script>
    <script src="/Scripts/jquery-ui.js"></script>
    <script src="/Scripts/jquery.ui.touch-punch.min.js"></script>
    <script src="Scripts/jquery-ui.1.10.3.min.js"></script>
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
    <!--[if lt IE 9]>
        <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
</head>
<body>
    <div class="container">
        <div class="row-fluid">
            <div class="span10 offset1">
                <a href="/" title="الرئيسية">
                    <img alt="" class="img-print" src="/Content/images/print/print-header.png" /></a>
                <div class="row">
                    <div class="span6">
                        <h2 class="text-center" style="color: #21536e">فـاتــــورة ضـريــــبية</h2>
                        <p class="text-center">رقم التسجيل الضريبي: <span runat="server" id="divVatRegistrationNumber"></span></p>
                        <h3 style="margin: 0 84px 0 0" id="divCanceled" class="red" runat="server"></h3>
                    </div>
                    <div class="span6 well">
                        <table class="invoice-head" width="100%">
                            <tbody>
                                <tr>
                                    <td width="20%"><strong># الفـــاتـــــورة:</strong></td>
                                    <td id="divInvoiceNo" runat="server"></td>
                                </tr>
                                <tr>
                                    <td><strong>تاريخ الفاتورة:</strong></td>
                                    <td id="toDay" runat="server"></td>
                                </tr>
                                <tr>
                                    <td><strong>العمــــــــــــــــــــيل:</strong></td>
                                    <td>
                                        <span id="clientAccount" runat="server"></span>
                                        <a class="printme hidden-print pull-left" href="javascript:void(0);"><i class="icon-print bigger-150"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="space-6"></div>
                <div class="row">
                    <div class="span6 well invoice-body">
                        <table class="table car-info">
                            <tbody>
                                <tr>
                                    <td width="39%">نوع السيارة</td>
                                    <td><span runat="server" id="divModel"></span></td>
                                </tr>
                                <tr>
                                    <td>سنة الصنع</td>
                                    <td><span runat="server" id="divYear"></span></td>
                                </tr>
                                <tr>
                                    <td>رقم السيارة</td>
                                    <td><span runat="server" id="CarID"></span></td>
                                </tr>
                                <tr>
                                    <td>رقم اللوت</td>
                                    <td><span runat="server" id="divLotNo"></span></td>
                                </tr>
                                <tr>
                                    <td>رقم الشاسية</td>
                                    <td><span runat="server" id="divChassis"></span></td>
                                </tr>
                                <tr>
                                    <td>حالة السيارة</td>
                                    <td><span runat="server" id="divStatus"></span></td>
                                </tr>
                                <tr>
                                    <td>اللون</td>
                                    <td><span runat="server" id="divColor"></span></td>
                                </tr>
                                <tr>
                                    <td>الجير</td>
                                    <td><span runat="server" id="DivGear"></span></td>
                                </tr>
                                <tr>
                                    <td>تاريخ الوصول</td>
                                    <td><span runat="server" id="divArriveDate"></span></td>
                                </tr>
                                <tr>
                                    <td>ملاحظات</td>
                                    <td><span runat="server" id="divNotes"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="span6 well invoice-body no-border">
                        <div class="row-fluid" runat="server" id="imagesThumb">
                            <ul class="ace-thumbnails">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="span6">
                        <div class="row-fluid">
                            <!--price box-->
                            <div class="span12 well invoice-thank alert">
                                <strong class="text-warning">سعر البيع:</strong>
                                <span id="divPrice" runat="server"></span>$
                            </div>
                        </div>
                    </div>
                    <div class="span6 well invoice-thank alert">
                        <strong>توقيع العميل/</strong>
                        <div class="widget-box" id="client-signature" title="توقيع العميل">
                            <div id="sig" title="توقيع العميل"></div>
                        </div>
                        <div class="delete-wpr hidden">
                            <div class="btn-group hidden-print">
                                <a id="clear" class="btn btn-warning btn-small" href="javascript:;">إعادة التوقيع</a>
                            </div>
                        </div>
                        <!--end signature board-->
                    </div>
                </div>
                <div class="row">
                    <!-- extra on car -->
                    <div class="span6 extra-div hidden">
                        <h4 class="red">الزيادات على السيارة</h4>
                        <table class="table car-info more extra-list">
                            <thead>
                                <tr>
                                    <th width="17%">المبلغ <sub>$</sub></th>
                                    <th>السبب</th>
                                </tr>
                            </thead>
                            <colgroup class="col-bg"></colgroup>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <!-- car discounts -->
                    <div class="span6 disc-div hidden">
                        <h4 class="green">الخصومات على السيارة</h4>
                        <table class="table car-info more disc-list">
                            <thead>
                                <tr>
                                    <th width="17%">المبلغ <sub>$</sub></th>
                                    <th>السبب</th>
                                </tr>
                            </thead>
                            <colgroup class="col-bg"></colgroup>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div class="span6 car-summary">
                        <h4 class="green">صافي الفاتورة</h4>
                        <table class="table car-info more">
                            <colgroup class="col-bg"></colgroup>
                            <tbody>
                                <tr class="alert alert-danger">
                                    <td width="40%" class="bolder">ضريبة VAT 5% <sub>$</sub></td>
                                    <td><span class="vat" runat="server" id="VAT">0</span></td>
                                </tr>
                                <tr class="bolder alert alert-success">
                                    <td>المبلغ المستحق <sub>$</sub></td>
                                    <td class="carTotal">0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--print footer-->
                <img alt="" class="print-footer" src="/Content/images/print/print-footer.png" />
                <!--end printed footer-->
            </div>
            <!--save client signature-->
            <button type="submit" id="SaveSignature" class="btn btn-info hidden hidden-print pull-left" title="حفـــظ">حفظ توقيع العميل</button>
        </div>
    </div>
    <link href="/App_Themes/iraq/sale-invoice.min.css?v=1.3" rel="stylesheet" />
    <script src="/admin-admin-2015/signature/js/jquery.signature.min.js"></script>
    <script src="/admin-admin-2015/signature/js/canvg.min.js"></script>
    <script src="/Scripts/client/InvoicePrint.js"></script>
    <script src="Scripts/lz-string/lz-string.min.js"></script>
    <script src="Scripts/jquery.xml2json.min.js"></script>
    <script src="Scripts/numeral.min.js"></script>
    <script src="Scripts/App/DataService.min.js"></script>
    <script src="Scripts/App/Common.min.js"></script>
    <script src="/Scripts/App/carsaleInvoicesManager.js?v=1.4"></script>
    <asp:Literal ID="Label1" runat="server" />
</body>
</html>
