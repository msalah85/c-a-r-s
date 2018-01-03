<%@ Page Title="حوالة التخليص الجمركى" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="CustomspaymentsmasterPrint.aspx.cs" Inherits="CustomspaymentsmasterPrint"
    EnableEventValidation="false" EnableTheming="false" ViewStateMode="Disabled" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
        .icon-caret-left {
            margin-left: 5px;
        }
        .table thead th, .col-bg {
            background-color: #f1eee9 !important;
        }
        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
            }
        }
    </style>
    <script src="/Scripts/Templates/CustomspaymentsPrint.min.js?v=1.7"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="CustomsPayments.aspx">عرض حوالات التخليص الجمركى</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طباعة حوالة التخليص الجمركى</li>
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
                            <h2 class="grey lighter pull-left position-relative">حوالة تخليص جمركى
                            </h2>
                            <div class="widget-toolbar no-border invoice-info">
                                <span class="invoice-info-label">رقم الحوالة:</span>
                                <label id="PaymentsIdH"></label>
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
                                        <table width="100%" class="table table-bordered">
                                            <col class="col-bg" />
                                            <tbody>
                                                <tr>
                                                    <td width="25%"><i class="icon-caret-left blue"></i>رقم الحوالة
                                                    </td>
                                                    <td>
                                                        <label id="PaymentsId"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><i class="icon-caret-left blue"></i>تاريخ الصرف
                                                    </td>
                                                    <td>
                                                        <label id="PaymentsDates" class="date-picker"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><i class="icon-caret-left blue"></i>المخلص
                                                    </td>
                                                    <td>
                                                        <label id="CustomsCompanyNameAr"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><i class="icon-caret-left blue"></i>عمولة تحويل <sub>درهم</sub>
                                                    </td>
                                                    <td>
                                                        <label id="Commission">0</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><i class="icon-caret-left blue"></i>إجمالى الفاتورة
                                                        $
                                                    </td>
                                                    <td>
                                                        <label id="TotalAmount"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><i class="icon-caret-left blue"></i>الإجمالى <sub>درهم</sub>
                                                    </td>
                                                    <td>
                                                        <label id="AmountDhs"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><i class="icon-caret-left blue"></i>رقم سند الصرف
                                                    </td>
                                                    <td>
                                                        <label id="CheckNo"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><i class="icon-caret-left blue"></i>ملاحظات
                                                    </td>
                                                    <td>
                                                        <label id="Notes"></label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="space-10"></div>
                                    <table id="listItems" class="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>م</th>
                                                <th>رقم الفاتورة
                                                </th>
                                                <th>رقم الحاوية
                                                </th>
                                                <th>تاريخ الفاتورة
                                                </th>
                                                <th>المبلغ <sub>$</sub>
                                                </th>
                                                <th>المبلغ <sub>درهم</sub>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        CustomspaymentsPrint.Init();
    </script>
</asp:Content>
