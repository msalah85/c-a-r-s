<%@ Page Title="طباعة فاتورة عمولة البيرات الخاصة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="AuctionCommissionPrint.aspx.cs" Inherits="AuctionCommissionPrint" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
        .widget-box.transparent > .widget-header-large {
            min-height: 50px;
            padding-bottom: 0;
        }
        .table th, .col-bg {
            background-color: #f1eee9 !important;
        }
        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
            }.editable{display:none}
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><a href="AuctionCommissionAdd.aspx">اضافة حوالة بيرات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="AuctionCommissionview.aspx">عرض حوالات البيرات الخاصة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طبــاعة فاتورة عمولة البيرات الخاصة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="widget-box transparent invoice-box">
                    <div class="widget-header widget-header-large">
                        <h3 class="grey lighter pull-left position-relative">فاتورة عمولة البيرات الخاصة
                        </h3>
                        <div class="widget-toolbar no-border invoice-info">
                            <span class="invoice-info-label">رقم الفاتورة:</span> <span class="red"
                                id="divInvoiceNo"></span>
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
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="row-fluid">
                                            <table class="table table-bordered">
                                                <col class="col-bg" />
                                                <tr>
                                                    <td>تصنيف المزاد</td>
                                                    <td id="auctionType"></td>
                                                </tr>
                                                <tr>
                                                    <td width="30%">مكتب الصرافة</td>
                                                    <td id="exchangeCo"></td>
                                                </tr>
                                                <tr>
                                                    <td>رقم سند الصرف</td>
                                                    <td id="checkNo"></td>
                                                </tr>
                                                <tr>
                                                    <td>تاريخ الشراء من</td>
                                                    <td><span id="DateFrom"></span></td>
                                                </tr>
                                                <tr>
                                                    <td>تاريخ الشراء إلى</td>
                                                    <td><span id="DateTo"></span></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="row-fluid">
                                            <table class="table table-bordered">
                                                <col class="col-bg" />
                                                <tr>
                                                    <td width="30%">رقم الحوالة</td>
                                                    <td>
                                                        <a href="#" id="DeskInvoice" data-type="text" data-type="text" data-id="AuctionCommID" data-pk="0" data-table="AuctionCommissions" data-name="DeskInvoice" data-title="ادخل رقم الحوالة" class="editable editable-click"></a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="30%">مبلغ الحوالة $</td>
                                                    <td id="amount"></td>
                                                </tr>
                                                <tr>
                                                    <td>مبلغ الحوالة <sub>درهم</sub></td>
                                                    <td id="amountDhs"></td>
                                                </tr>
                                                <tr>
                                                    <td>ملاحظات</td>
                                                    <td id="notes"></td>
                                                </tr>
                                                <tr>
                                                    <td>المبلغ الاضافي</td>
                                                    <td><span id="ExtraAmount">0</span> $&nbsp;&nbsp;<span id="ExtraNote"></span> </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="space">
                                </div>
                                <div class="row-fluid">
                                    <table class="table table-striped table-bordered" id="itemsList">
                                        <thead>
                                            <tr>
                                                <th title="مسلسل">م</th>
                                                <th>السيارة
                                                </th>
                                                <th>رقم اللوت
                                                </th>
                                                <th>الشاصي
                                                </th>
                                                <th>الباير
                                                </th>
                                                <th>المدينة
                                                </th>
                                                <th>العمولة
                                                </th>
                                                <th>الاضافي
                                                </th>
                                                <th>الاجمالى
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="hr hr8 hr-double hr-dotted">
                                </div>
                                <div class="row-fluid">
                                    <div class="span4 pull-right">
                                        <h4 class="pull-right">إجمالى الحوالة : <span class="red" id="AuctionCommTotal"></span><sub>$</sub>
                                        </h4>
                                    </div>
                                    <div class="span9 pull-left">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/AuctionCommissionPrint.min.js?v=1.2"></script>
</asp:Content>
