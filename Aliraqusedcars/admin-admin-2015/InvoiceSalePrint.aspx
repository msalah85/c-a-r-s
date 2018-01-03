<%@ Page Title="طباعة فاتورة البيع" Language="C#" MasterPageFile="master2.master" AutoEventWireup="true" CodeFile="InvoiceSalePrint.aspx.cs" Inherits="admin_admin_2015_InvoiceSalePrint2" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="//fonts.googleapis.com/earlyaccess/droidarabickufi.css" rel="stylesheet" />
    <link href="/App_Themes/iraq/allcss.min.css?v=1.1" id="appStyles" rel="stylesheet" />
    <link href="/App_Themes/iraq/sale-invoice.min.css?v=1.2" rel="stylesheet" />
    <script src="/App_Themes/iraq/js/app.min.js?v=1.1"></script>
    <!--[if lt IE 9]>
        <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="container">
        <div class="row-fluid">
            <a href="Home.aspx" title="الرئيسية للأدمن">
                <img alt="" class="img-print" src="/Content/images/print/print-header.png" /></a>
        </div>
        <div class="wrap-pad">
            <div class="row-fluid">
                <div class="span12">
                    <div class="row">
                        <div class="span6">
                            <h2 style="margin: 46px 87px 0 0; color: #21536e">فاتورة بيع سيارة</h2>
                            <h3 style="margin: 0 84px 0 0" id="divCanceled" class="red" runat="server"></h3>
                        </div>
                        <div class="span6 well">
                            <table class="invoice-head" width="100%">
                                <tbody>
                                    <tr>
                                        <td width="15%"><strong>#الفاتورة:</strong></td>
                                        <td><span id="divInvoiceNo" runat="server"></span>
                                            <a class="printme hidden-print pull-left" href="javascript:void(0);"><i class="icon-print bigger-150"></i></a></td>
                                    </tr>
                                    <tr>
                                        <td><strong>التــــاريـــــــخ:</strong></td>
                                        <td id="toDay" runat="server"></td>
                                    </tr>
                                    <tr>
                                        <td><strong>العمــيــــــــل:</strong></td>
                                        <td>
                                            <a href="ClientCars.aspx?id=" id="clientAccount" runat="server"></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="space-6"></div>
                    <div class="row-fluid">
                        <div class="span6 well invoice-body">
                            <table class="table car-info">
                                <colgroup class="col-bg"></colgroup>
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
                                        <td>طريقة البيع</td>
                                        <td><span runat="server" id="divSaleTypeName"></span></td>
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
                    <div class="row-fluid">
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
                    <div class="row-fluid">
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
                                <tfoot>
                                    <tr>
                                        <th class="carTotal"></th>
                                        <th>إجمالى سعر السيارة</th>
                                    </tr>
                                </tfoot>
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
                                <tfoot>
                                    <tr>
                                        <th class="carTotal"></th>
                                        <th>إجمالى سعر السيارة</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <style>
                            table.more {
                                border: 1px solid #dce0a4;
                            }
                            .table thead:first-child tr th:first-child {
                                border-right-color: #dce0a4;
                            }
                        </style>
                        <!-- car discounts -->
                    </div>
                    <img alt="Aliraq Cars" class="print-footer" src="/Content/images/print/print-footer.png" />
                </div>
                <!--save client signature-->
                <button type="submit" id="SaveSignature" class="btn btn-info hidden hidden-print pull-left" title="حفـــظ">حفظ توقيع العميل</button>
            </div>
        </div>
    </div>
    <script src="signature/js/jquery.signature.min.js?v=1.1"></script>
    <script src="signature/js/canvg.min.js?v=1.1"></script>
    <script src="/Scripts/App/carsaleInvoicesManager.min.js?v=1.2"></script>
    <asp:literal id="Label1" runat="server" />
    <div class="stickyFooter hidden-print">
        <form name="searchCarNo" method="get" action="SearchCars.aspx" accept-charset="UTF-8" class="form-inline">
            <input type="hidden" name="kid" value="CarID" />
            <input required class="form-control" placeholder="بحث برقم السيارة" type="text" name="key" size="15" autocomplete="off" />
            <input class="btn btn-inverse btn-mini" type="submit" value="بحث السيارات" />
        </form>
    </div>
</asp:Content>