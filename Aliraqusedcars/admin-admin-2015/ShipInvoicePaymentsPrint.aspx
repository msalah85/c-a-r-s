<%@ Page Title="حوالة فواتير الشحن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="ShipInvoicePaymentsPrint.aspx.cs" Inherits="ShipInvoicePaymentsPrint"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .table thead th, .col-bg {
            background-color: #f1eee9 !important;
        }

        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                font-size: 14px;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="ShipInvoicePayments.aspx">عرض حوالات الشحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active title">طباعة حوالة الشحن</li>
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
                        <h2 class="grey lighter pull-left position-relative title">حوالة فواتير الشحن
                        </h2>
                        <div class="widget-toolbar no-border invoice-info">
                            <span class="invoice-info-label">رقم الحوالة:</span>
                            <label id="ShipInvoicePaymentsIDH"></label>
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
                                        <table class="table table-striped table-bordered">
                                            <colgroup class="col-bg" />
                                            <colgroup />
                                            <colgroup class="col-bg" />
                                            <colgroup />
                                            <tbody>
                                                <tr>
                                                    <td width="15%"># الحوالة
                                                    </td>
                                                    <td colspan="3">
                                                        <label id="ShipInvoicePaymentsID"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>تاريخ الصرف
                                                    </td>
                                                    <td>
                                                        <label id="PaymentsDates"></label>
                                                    </td>
                                                    <td width="15%">أجور التحويل <sub class="orange">درهم</sub>
                                                    </td>
                                                    <td>
                                                        <label class="orange bolder money" id="Convertamount">0</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>مكتب الصرافة
                                                    </td>
                                                    <td>
                                                        <a href="#" id="ExchangeCompanyNameAr" data-type="select" data-type="text" data-id="ShipInvoicePaymentsID" data-pk="0" data-table="ShipInvoicePayments" data-name="ExchangeCompanyID" data-title="ادخل مكتب الصرافة" class="editable editable-click"></a>
                                                    </td>
                                                    <td>اجمالى الحوالة <sub class="orange">$</sub>
                                                    </td>
                                                    <td>
                                                        <label class="red bolder money" id="orange">0</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>رقم الحوالة
                                                    </td>
                                                    <td>
                                                        <a href="#" id="DeskInvoice" data-type="text" data-type="text" data-id="ShipInvoicePaymentsID" data-pk="0" data-table="ShipInvoicePayments" data-name="DeskInvoice" data-title="ادخل رقم الحوالة" class="editable editable-no editable-click"></a>
                                                    </td>
                                                    <td>عمولة القيمة المضافة <sub class="orange">درهم</sub>
                                                    </td>
                                                    <td>
                                                        <label class="orange bolder money" id="VAT">0</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>الشاحن
                                                    </td>
                                                    <td>
                                                        <label id="ShipMainCompanyNameAr"></label>
                                                    </td>
                                                    <td>اجمالى الحوالة <sub class="orange">بالدرهم</sub></td>
                                                    <td>
                                                        <label class="orange bolder money" id="AmountDhs">0</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>سبب الخصم
                                                    </td>
                                                    <td>
                                                        <label id="DiscountReason"></label>
                                                    </td>
                                                    <td>مبلغ الخصم
                                                    </td>
                                                    <td>
                                                        <label id="Discount" class="money"></label>
                                                    </td>
                                                </tr>
                                                <tr class="review hidden">
                                                    <td>رقم سند الصرف
                                                    </td>
                                                    <td colspan="3">
                                                        <a id="CheckNo"></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>ملاحظات
                                                    </td>
                                                    <td>
                                                        <label id="Notes"></label>
                                                    </td>
                                                    <td>المبلغ الصافى <sub class="orange">$</sub>
                                                    </td>
                                                    <td>
                                                        <label id="NetAmount" class="money"></label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="space-10"></div>
                                <table id="listItems" class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>م</th>
                                            <th width="130"># الحاوية
                                            </th>
                                            <th>رقم الفاتورة
                                            </th>
                                            <th>مبلغ الفاتورة
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/updatePayInvNo.min.js?v=1.1"></script>
    <script src="/Scripts/mark/jquery.mark.min.js"></script>
    <script src="/Scripts/Templates/ShipInvoicePaymentsPrint.min.js?v=1.9"></script>
</asp:Content>
