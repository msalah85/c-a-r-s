<%@ Page Title="العراق - تسجيل فاتورة الشحن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoiceShippingPrint.aspx.cs" Inherits="InvoiceShippingPrint"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
        .table thead:first-child tr:first-child th, .cel-bg {
            background-color: #f1eee9 !important;
        }
        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
            }
            .widget-header, .widget-header-large {
                display: block !important;
                visibility: visible !important;
            }
            .row-fluid .span6 {
                width: 48%;
                display: inline-block;
                float: right;
                margin-right: 2%;
            }
            .table th, .cell-bg {
                background: #EDEDED !important;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesShippView.aspx">فواتير الشحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طبــاعة فاتورة الشحن</li>
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
                            <h3 class="grey lighter position-relative">فاتورة الشحن</h3>
                            <div class="widget-toolbar no-border invoice-info">
                                <span class="invoice-info-label"># الفاتورة:</span> <span class="red bolder" id="divInvoiceNo"></span>
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
                            <div class="widget-main">
                                <div class="row-fluid" id="masterForm">
                                    <div class="span6">
                                        <table class="table-bordered table">
                                            <col class="cel-bg" />
                                            <tr>
                                                <td class="cel-bg">رقم الفاتورة</td>
                                                <td><span style="display: inline;" id="ShippInvoiceNo"></span></td>
                                            </tr>
                                            <tr>
                                                <td width="35%" class="cel-bg">رقم الحاوية</td>
                                                <td><span style="display: inline;" id="ContainerNo"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">اسم الشاحن</td>
                                                <td><span style="display: inline;" id="ShipCompanyNameAr"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">جهة الوصول</td>
                                                <td><span style="display: inline;" id="DistinationNameAr"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">حجم الحاوية</td>
                                                <td><span style="display: inline;" id="ContainerSize"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">ملاحظات/الحاوية</td>
                                                <td><span style="display: inline;" id="ContainersNotes"></span></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="span6">
                                        <table class="table-bordered table">
                                            <col class="cel-bg" />
                                            <tr>
                                                <td width="35%" class="cel-bg">رقم الحجز BOL</td>
                                                <td><span style="display: inline;" id="Bol"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">تاريخ الوصول</td>
                                                <td><span style="display: inline;" id="ArrivalDate"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">شركة الملاحة</td>
                                                <td><span style="display: inline;" id="NavigationCoName"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">رقم الفاتورة</td>
                                                <td><span style="display: inline;" id="InvoiceNo"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">تاريخ الفاتورة</td>
                                                <td><span style="display: inline;" id="InvoiceDate"></span></td>
                                            </tr>
                                            <tr>
                                                <td class="cel-bg">ملاحظات/الفاتورة</td>
                                                <td><span style="display: inline;" id="Notes"></span></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="row-fluid">
                                    <div class="space">
                                    </div>
                                    <div class="row-fluid">
                                        <table id="listItems" class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>نوع السيارة
                                                    </th>
                                                    <th>موديل السيارة
                                                    </th>
                                                    <th>سنة الصنع
                                                    </th>
                                                    <th>Lot</th>
                                                    <th>Towing
                                                    </th>
                                                    <th>الشحن البحرى
                                                    </th>
                                                    <th>التحميل
                                                    </th>
                                                    <th>قيمة التقطيع
                                                    </th>
                                                    <th>قيمة النقل
                                                    </th>
                                                    <th>أخري
                                                    </th>
                                                    <th>إجمالى التكلفة
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="10"><span class="pull-left">إجمالى الفاتورة</span></td>
                                                    <td class="cel-bg"><span class="red" id="divTotalAll"></span><sub>$</sub></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                <div class="space-6">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/Templates/InvoiceShippingPrint.min.js?v=1.7"></script>
</asp:Content>