<%@ Page Title="تقرير رأس المال" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/budget-report.min.js?v=2.8"></script>
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
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><a href="ProfitLossReport.aspx">تقرير الأرباح والخسائر</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">تقرير رأس المال</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="span10 offset2 invoice-body" id="masterForm">
            <img alt="" class="img-print" src="/Content/images/print/print-header.png" />
            <div class="space-10"></div>
            <div class="row-fluid padding-right-10">
                <div class="span4">
                </div>
                <div class="span4">
                    <br />
                    <h2 class="down-title">تقرير حساب رأس المال</h2>
                </div>
                <div class="span4 padding-left-20">
                    <ul class="item-list">
                        <li class="item-blue clearfix">التاريخ/ <span class="blue bolder" id="AddDate"></span>
                            <button id="btnSaveBudjet" class="btn btn-primary btn-mini pull-left hidden-print hidden btns" data-rel="tooltip" title="حفظ تقرير رأس المال الحالى وتحديث الأرصده بآخر ترصيد"><i class="icon-save"></i></button>
                            <button id="btnPrintBudjet" onclick="javascript:window.print();" class="btn btn-grey btn-mini pull-left hidden-print hidden btns" data-rel="tooltip" title="طباعه"><i class="icon-print"></i></button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="space-24"></div>
            <div class="row-fluid padding-right-10 contentes">
                <table class="table table-bordered table-striped table-hover" style="width: 98%!important">
                    <col class="cel-bg" />
                    <tr>
                        <td width="25%">رصيد البنك</td>
                        <td><a target="_blank" title="تقرير البنك" href="BankBalancesView.aspx"><span class="bank-balance">0</span></a></td>
                    </tr>
                    <tr>
                        <td title="إجمالى تكاليف سيارات الشركة الغير مباعه (بالامارات - جلف أوتو بأمريكا - الأردن..) + مجموع سعر شراء سيارات العملاء المدفوعه بدون فاتورة بيع">سيارات الشركة <sub>(الغير مباعه)</sub></td>
                        <td><a href="iraq-cars.aspx"><span class="comp-cars-costs">0</span></a></td>
                    </tr>
                    <tr>
                        <td title="المطلوب على العملاء = إجمالى فواتير البيع + الزيادات على السيارات - الخصومات - إجمالى إيداعات العملاء">المطلوب على العملاء</td>
                        <td><a target="_blank" href="clients.aspx#t=2" data-rel="tooltip" title="تفاصيل المطلوب على العملاء"><span class="clients-required">0</span></a></td>
                    </tr>
                    <tr>
                        <td title="إجمالي السلف/القروض الخارجية: مدينون">مدينون (سلف)</td>
                        <td><a target="_blank" href="hr/AdvanceOutsideMemebers.aspx" title="تفاصيل القروض"><span class="AdvOutsideReceivable">0</span></a></td>
                    </tr>
                    <tr>
                        <td title="إجمالي سلف/قروض الموظفين">قروض موظفين</td>
                        <td><a target="_blank" href="hr/empsloans.aspx" title="قروض الموظفين"><span class="AdvUsersReceivable">0</span></a></td>
                    </tr>
                    <tr>
                        <td class="bolder" title="مجموع كلفة سيارات الشركة و المطلوب على العملاء والقروض">الإجمالى</td>
                        <td class="bolder"><span class="total-required">0</span></td>
                    </tr>
                </table>
                <hr style="width: 98%" />
                <table class="table table-bordered table-striped table-hover" style="width: 98%!important">
                    <col class="cel-bg" />
                    <tr>
                        <td width="25%" title="مجموع تكاليف الشحن (تونك + شحن وتحميل + تقطيع + نقل للسكراب) على سيارات العملاء التى لم يتم عمل فاتورة شحن لها و ارقام الحجز وكذا التكاليف الفعلية على فواتير الشحن الغير مدفوعه وقيد الدفع">فواتير الشحن <sub>المطلوبة</sub></td>
                        <td><span class="waiting-shipp">0</span></td>
                    </tr>
                    <tr>
                        <td title="مجموع تكاليف التخليص (مصروفات تخليص والجمارك) على سيارات العملاء التى لم يتم عمل فاتورة تخليص لها وكذا التكاليف الفعلية على فواتير التخليص قيد الدفع">فواتير التخليص <sub>المطلوبة</sub></td>
                        <td><span class="waiting-cust">0</span></td>
                    </tr>
                    <tr>
                        <td title="إجمالي السلف/القروض الخارجية: دائنون">دائنون (سلف)</td>
                        <td><a target="_blank" href="hr/AdvanceOutsideMemebers.aspx" title="تفاصيل القروض"><span class="AdvOutsideCreditor">0</span></a></td>
                    </tr>
                    <tr>
                        <td width="25%" class="bolder" title="مجموع التكاليف على الفواتير التى لم يتم دفعها والقروض">الإجمالى</td>
                        <td class="bolder"><span class="total-waiting-inv">0</span></td>
                    </tr>
                </table>
                <hr style="width: 98%" />
                <table class="table table-bordered tab-striped" style="width: 98%!important">
                    <col class="cel-bg" />
                    <tr>
                        <td width="25%" class="bolder" title="رأس المال + الأرباح = الأصول - الخصوم">صافى الأصول</td>
                        <td class="green bolder"><span class="total-budget">0</span>
                            $</td>
                    </tr>
                </table>
            </div>
            <div class="space-24"></div>
            <img alt="center" class="print-footer" src="/Content/images/print/print-footer.png" /><div class="space-6"></div>
        </div>
    </div>
    <script>BudgetReport.Init();</script>
</asp:Content>
