<%@ Page Title="شركة العراق - طباعة ملف الرواتب الشهري" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="salaryprint.aspx.cs" Inherits="salaryprint"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
   <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
        table thead th,td.cell-bg {background-color:#f1eee9!important}
        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
            }
            table thead th,td.cell-bg {background-color:#f1eee9!important}
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="hr/salaries.aspx">عرض الرواتب</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طباعة ملف الرواتب الشهري</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid print-invoice">
            <div class="row-fluid">
                <div class="span10 offset1">
                    <div class="widget-box transparent invoice-box">
                        <div class="widget-header widget-header-large">
                            <h3 class="position-relative">
                                تقرير الرواتب لشهر: <span id="Month"></span>&nbsp;-&nbsp;<span id="Year"></span>
                            </h3>
                            <div class="widget-toolbar no-border invoice-info">
                                <span class="invoice-info-label">الكود:</span> <span class="red" id="divNo"></span>
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
                                <div class="row-fluid">
                                    <table id="listItems" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="20%">الموظف
                                                </th>
                                                <th>راتب أساسى
                                                </th>
                                                <th>زيادة راتب
                                                </th>
                                                <th>بدل سكن
                                                </th>
                                                <th>بدل سفر
                                                </th>
                                                <th>إكراميات
                                                </th>
                                                <th>زيادة أخري
                                                </th>
                                                <th>إجمالى
                                                </th>
                                                <th>الخصم</th>
                                                <th>سداد سلفة</th>
                                                <th>صافى الراتب</th>
                                                <th>التوقيع</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="7"><span class="pull-left">الإجمالى قبل الخصم</span></td>
                                                <td class="cell-bg"><span id="totalSum"></span></td>
                                                <td colspan="2"><span class="pull-left">صافى الرواتب</span></td>
                                                <td class="cell-bg"><span id="TotalAmount"></span></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colspan="10"><span class="pull-left">عمولة شركة الصرافة</span></td>
                                                <td class="cell-bg"><span id="Commission"></span></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colspan="10"><span class="bolder pull-left">الإجمالى</span></td>
                                                <td class="cell-bg"><span class="bolder" id="NetAmount"></span></td>
                                                <td><sub>درهم</sub></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row-fluid">
                            <div class="span6 well invoice-thank alert">
                                <strong class="text-warning">المحاسب/</strong>
                            </div>
                            <div class="span6 well invoice-thank alert">
                                <strong>المدير/</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/hr/salary-print.min.js?v=1.6"></script>
    <style type="text/css" media="print">
        @media print{
            .row-fluid .well.span6 {
                width: 47%;float: right;
                margin-right: 10px;display:inline-block;
            }
        }
        @page {
            @bottom-center {
                content: counter(page) " / " counter(pages);
            }
        }
    </style>
</asp:Content>
