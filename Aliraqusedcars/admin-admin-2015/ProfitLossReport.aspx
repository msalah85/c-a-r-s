<%@ Page Title="تقرير الأرباح والخسائر" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/ProfitLoss-report.min.js?v=1.7"></script>
    <style type="text/css">
        .cel-bg {
            background-color: #f1eee9 !important;
        }

        .top-title {
            text-decoration: underline;
        }

        .down-title {
            margin-top: -17px;
        }

        .invoice-body {
            border: 1px solid #DFE1B0;
            position: relative;
        }

        p {
            margin: 0 0 13px;
            border-bottom: 1px dashed #cac5c5;
            width: 98%;
        }

            p .static-content {
                height: 30px;
                background: #fff;
                padding: 0 5px;
            }

        .padding-right-10 {
            padding-right: 10px;
        }

        .padding-left-20 {
            padding-left: 20px;
        }

        .text-space {
            width: 50px;
            display: inline-block;
            height: 10px;
        }

        @media (max-width:797px) {
            .row-fluid .span4 {
                width: 33% !important;
                display: block;
                float: right;
            }
        }

        @media print {
            .img-print {
                display: none;
            }

            .static-content {
                background: #fff !important;
            }

            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
                vertical-align: middle;
                border-top: 1px solid #ddd;
            }

            .pull-left {
                float: left;
            }

            p .static-content {
                height: 40px;
                background: #fff;
                padding: 0 5px;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><a href="BudgetReport.aspx">تقرير رأس المال</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">تقرير الأرباح والخسائر</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="span10 offset2 invoice-body" id="masterForm">
            <img alt="" class="img-print" src="/Content/images/print/print-header.png" />
            <div class="space-10"></div>
            <div class="row-fluid padding-right-10">
                <div class="span3">
                </div>
                <div class="span5">
                    <br />
                    <h2 class="down-title">تقرير حساب الأرباح والخسائر</h2>
                </div>
                <div class="span4 padding-left-20">
                    <ul class="item-list">
                        <li class="item-blue clearfix">التاريخ/ <span class="blue bolder" id="AddDate"></span></li>
                    </ul>
                </div>
            </div>
            <div class="space-24"></div>
            <div class="row-fluid padding-right-10 contentes">
                <table class="table table-bordered table-striped table-hover" style="width: 98%!important">
                    <col class="cel-bg" />
                    <tr>
                        <td width="25%" title="صافى المبيعات = المبيعات + الزيادات - الخصومات">صافي المبيعات</td>
                        <td class="totalSales">0</td>
                    </tr>
                    <tr>
                        <td title="سندات قبض بتصنيف أخري">الإيرادات الأخري</td>
                        <td class="otherVouchers">0</td>
                    </tr>
                    <tr>
                        <td title="إجمالى الإيرادات = المبيعات  - إيرادات أخري">إجمالى الإيرادات</td>
                        <td class="totalIncome bolder">0</td>
                    </tr>
                    <tr>
                        <td title="تكاليف جميع السيارات المباعه">كلفة السيارات <sub>المباعه</sub></td>
                        <td><a href="rpt/ExpensesOnCarReportPrint.aspx" class="totalCarsCosts">0</a></td>
                    </tr>
                    <tr>
                        <td class="bolder" title="الربح = اجمالى المبيعات - التكاليف">إجمالى الربح</td>
                        <td class="bolder totalProfit"></td>
                    </tr>
                </table>
                <hr style="width: 98%" />
                <table class="table table-bordered table-hover" style="width: 98%!important">
                    <col class="cel-bg" />
                    <tr>
                        <td width="25%">المصروفات العمومية والإدارية</td>
                        <td><a title="عرض المصروفات العمومية والإدارية" class="general-exp" href="generaladministrativeexpenses.aspx">0</a></td>
                    </tr>
                </table>
                <hr style="width: 98%" />
                <table class="table table-bordered table-hover" style="width: 98%!important">
                    <col class="cel-bg" />
                    <tr>
                        <td width="25%" class="green bolder" title="صافى الأرباح = الربح - المصروفات العمومية">صافي الأرباح/الخسائر</td>
                        <td class="green bolder netProfit">0</td>
                    </tr>
                </table>
            </div>
            <div class="space-24"></div>
            <img alt="center" class="print-footer" src="/Content/images/print/print-footer.png" /><div class="space-6"></div>
        </div>
    </div>
    <script>ProfitLossReport.Init();</script>
</asp:Content>
