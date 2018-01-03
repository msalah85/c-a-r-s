<%@ Page Title="طباعة ايداع العميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="ClientsPaymentsPrint.aspx.cs" Inherits="ClientsPaymentsPrint"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/ClientsPaymentsPrint.min.js?v=1.2"></script>
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .cel-bg {
            background-color: #f1eee9 !important;
        }

        .widget-box.transparent > .widget-header-large {
            margin-bottom: 0;
            padding-bottom: 0;
        }

        .invoice-info {
            line-height: 49px !important;
        }

        span {
            display: inline-block;
        }


        .print-footer {
            display: none;
        }

        @media print {
            body {
                color: #000 !important;
            }

            .widget-box.transparent > .widget-header-large {
                margin-bottom: 0;
                padding-bottom: 0;
            }

            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
            }

                .table td span {
                    font-size: 12px;
                }

            .print-footer {
                bottom: 5px;
                right: 0;
                position: fixed;
                display: block;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a class="clientPayments" href="ClientsPaymentsView.aspx">عرض الحوالات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طباعة حوالة العميل</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="space-6"></div>
        <div class="row-fluid">
            <!-- select new receipt-->
            <div class="span10 offset1 alert alert-info hidden-print">
                <div class="form-horizontal">
                    <div class="control-group">
                        <label class="control-label" for="RecieptID"><span>سند قبض آخر</span><span class="red">*</span></label>
                        <div class="controls">
                            <div class="span12">
                                <select class="chzn-select chosen-rtl" data-placeholder="اختــر سند القبض" id="RecieptID" name="RecieptID">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--end selection form-->
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="widget-box transparent invoice-box">
                    <div class="widget-header widget-header-large">
                        <h2 class="grey lighter position-relative">إيــداع عمـــيل
                        </h2>
                        <div class="widget-toolbar no-border invoice-info">
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
                                            <tbody>
                                                <tr>
                                                    <th class="cel-bg" width="25%">رقم السند
                                                    </th>
                                                    <th>
                                                        <span class="bolder" id="ReceiptID"></span>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">العميل
                                                    </td>
                                                    <td><a data-toggle="tooltip" title="حساب العميل" class="clientAccount" href="ClientsPaymentsPrint.aspx#">
                                                        <span id="full_name"></span>
                                                    </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">تاريخ الحوالة
                                                    </td>
                                                    <td>
                                                        <span id="PaymentsDates" dir="ltr"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">طريقة الدفع
                                                    </td>
                                                    <td>
                                                        <span id="ExchangeCompanyNameAr"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg divCheckNo">رقم الإيصال
                                                    </td>
                                                    <td>
                                                        <span id="CheckNo"></span>
                                                    </td>
                                                </tr>
                                                <tr class="showHide hidden">
                                                    <td class="cel-bg">البنك
                                                    </td>
                                                    <td>
                                                        <span id="BankName"></span>
                                                    </td>
                                                </tr>
                                                <tr class="showHide hidden">
                                                    <td class="cel-bg">رقم الشيك
                                                    </td>
                                                    <td>
                                                        <span id="BankCheckNo"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">المبلغ$
                                                    </td>
                                                    <td>
                                                        <span class="green" id="Amount"></span>
                                                        $
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">المبلغ <sub>درهم</sub>
                                                    </td>
                                                    <td>
                                                        <span class="orange" id="AmountDhs"></span>
                                                        <sub>درهم</sub>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">المسلم
                                                    </td>
                                                    <td>
                                                        <span id="ReciverName"></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">البيان
                                                    </td>
                                                    <td>
                                                        <span id="Details"></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="row-fluid">
                                            <div class="span1"></div>
                                            <div class="span11">
                                                <h3 id="divCanceled" class="red"></h3>
                                                <p class="bolder red" id="DeleteReason"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img alt="center" class="print-footer" src="/Content/images/print/print-footer.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <link href="/App_Themes/iraq/bill-print.min.css" rel="stylesheet" />
            </div>
        </div>
    </div>
    <script>ClientsPaymentsPrint.Init();</script>
</asp:Content>