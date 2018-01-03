<%@ Page Title="عرض حوالات فواتير الشراء" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="PayInvoicePaymentsPrint.aspx.cs" Inherits="PayInvoicePaymentsPrint"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/updatePayInvNo.min.js?v=1.1"></script>
    <script src="/Scripts/Templates/PayInvoicePaymentsPrint.min.js?v=3.0"></script>
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
        .table thead th, .col-bg {
            background-color: #f1eee9;
        }
        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
            }
            .table thead th, .col-bg {
                background-color: #f1eee9 !important;
            }
            .row-fluid .span6 {
                width: 48%;
                display: inline-block;
                float: right;
                margin-right: 2%;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-plus"></i><a href="PayInvoicePaymentDetails.aspx">حوالة جديدة</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="PayInvoicePayments.aspx">عرض حوالات الشراء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="payinvoicepaymentspendingprint.aspx">البيرات قيد الدفع</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="PayInvoicePayments.aspx?pend=1">الحوالات قيد الدفع</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active title">طباعة حوالة الشراء</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="space-6">
            </div>
            <div class="message"></div>
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="widget-box transparent invoice-box">
                    <div class="widget-header widget-header-large">
                        <h2 class="grey lighter pull-left position-relative title">حوالة فواتير شراء
                        </h2>
                        <div class="widget-toolbar no-border invoice-info">
                            <span class="invoice-info-label">كود الحوالة:</span>
                            <strong id="PayInvoicePaymentsIDH"></strong>
                            <br />
                            <span class="invoice-info-label">التاريخ:</span> <span class="blue">
                                <%= DateTime.UtcNow.ToShortDateString() %></span>
                        </div>
                        <div class="widget-toolbar hidden-480">
                            <a class="printme hidden-print" href="javascript:void(0);"><i class="icon-print bigger-150"></i>
                            </a>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main padding-24">
                            <div class="row-fluid">
                                <div id="masterForm">
                                    <div class="row-fluid">
                                        <div class="span6">
                                            <table class="table table-striped table-bordered">
                                                <col class="col-bg" />
                                                <tbody>
                                                    <tr>
                                                        <td>مكتب الصرافة
                                                        </td>
                                                        <td>
                                                            <a href="#" id="ExchangeCompanyNameAr" data-type="select" data-type="text" data-id="PayInvoicePaymentsID" data-pk="0" data-table="PayInvoicePayments" data-name="ExchangeCompanyID" data-title="ادخل مكتب الصرافة" class="editable editable-click"></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>رقم الحوالة
                                                        </td>
                                                        <td>
                                                            <a href="#" id="DeskInvoice" data-type="text" data-type="text" data-id="PayInvoicePaymentsID" data-pk="0" data-table="PayInvoicePayments" data-name="DeskInvoice" data-title="ادخل رقم الحوالة" class="editable editable-no editable-click"></a>
                                                        </td>
                                                    </tr>
                                                    <tr class="">
                                                        <td>تاريخ الحوالة
                                                        </td>
                                                        <td>
                                                            <label id="PaymentsDates"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>إسم المزاد
                                                        </td>
                                                        <td>
                                                            <label id="AuctionNameAr"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="30%">رقم الباير
                                                        </td>
                                                        <td>
                                                            <span id="BuyerName"></span>
                                                        </td>
                                                    </tr>
                                                    <tr class="hidden new">
                                                        <td>رقم سند الصرف
                                                        </td>
                                                        <td>
                                                            <a id="CheckNo"></a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>ملاحظات
                                                        </td>
                                                        <td>
                                                            <label id="Notes"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="span6">
                                            <table class="table table-striped table-bordered">
                                                <col class="col-bg" />
                                                <tr class="hidden new">
                                                    <td width="30%">رسوم باير سنوى <sub class="green">$</sub>
                                                    </td>
                                                    <td>
                                                        <label id="BuyerAnnualFee"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>إجمالى الفاتورة <sub class="green">$</sub>
                                                    </td>
                                                    <td>
                                                        <label class="green money" id="TotalAmount"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>مبلغ الخصم <sub class="red">$</sub>
                                                    </td>
                                                    <td>
                                                        <label class="money red" id="DiscountAmount"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>الصافي <sub class="orange">$</sub>
                                                    </td>
                                                    <td>
                                                        <label class="net-amount orange money"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>سبب الخصم
                                                    </td>
                                                    <td>
                                                        <label id="DiscountNotes"></label>
                                                    </td>
                                                </tr>
                                                <tr class="hidden new">
                                                    <td>أجور التحويل <sub class="green">درهم</sub>
                                                    </td>
                                                    <td>
                                                        <label id="Convertamount"></label>
                                                    </td>
                                                </tr>
                                                <tr class="hidden new">
                                                    <td>إجمالى الفاتورة <sub class="green">درهم</sub>
                                                    </td>
                                                    <td>
                                                        <label class="green money" id="AmountDhs"></label>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <h4 class="lighter green">الفواتير</h4>
                                <table id="listItems" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th># السيارة</th>
                                            <th>نوع السيارة</th>
                                            <th>اللوت
                                            </th>
                                            <th>العميل</th>
                                            <th>مبلغ الفاتورة
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="4"><span class="pull-left">اجمالى الفواتير</span></th>
                                            <th class="col-bg carsTotal"></th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div class="space"></div>
                                <h4 class="lighter red">الغرامات</h4>
                                <table id="listItems2" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>السيارة
                                            </th>
                                            <th>اللوت - العميل
                                            </th>
                                            <th>غرامة أرضيات
                                            </th>
                                            <th>غرامة تأخير الدفع
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="2"></th>
                                            <th class="col-bg storTotal"></th>
                                            <th class="col-bg lateTotal"></th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>PayInvoicePaymentsPrint.Init();</script>
</asp:Content>
