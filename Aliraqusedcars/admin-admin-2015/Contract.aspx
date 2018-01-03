<%@ Page Title="تفاصيل العقد للعميل" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="Contract.aspx.cs" Inherits="admin_admin_2015_Contract" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">    
    <link href="/Scripts/select2/select2.min.css?v=1.7" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="clients.aspx">العملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="Active">تفاصيل عقد العميل</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تفاصيل عقد العميل</h1>
        </div>
        <form id="aspnetForm" role="form">
            <div class="form-horizontal" id="masterForm">
                <div class="row-fluid">
                    <div class="span12 widget-container-span">
                        <div class="widget-box">
                            <div class="widget-header">
                                <h5 class="bigger lighter">بيانات العقد الأساسية
                                </h5>
                                <div class="widget-toolbar">
                                    <a href="#" data-action="collapse">
                                        <i class="icon-chevron-up"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="widget-body">
                                <div class="widget-main no-padding">
                                    <table class="table table-bordered">
                                        <colgroup class="cel-bg-sp" width="15%" />
                                        <colgroup width="35%" />
                                        <colgroup class="cel-bg-sp" width="15%" />
                                        <colgroup />
                                        <tr>
                                            <td>العميل</td>
                                            <td>
                                                <input type="hidden" id="ClientCommID" value="0" /><input type="hidden" value="0" id="ClientID" />
                                                <span id="full_name"></span></td>

                                            <td>نوع البيع</td>
                                            <td>
                                                <input type="hidden" value="0" id="CommTypeID" />
                                                <span id="CommTypeName"></span></td>
                                        </tr>
                                        <tr>
                                            <td>جهة الوصول</td>
                                            <td>
                                                <input type="hidden" value="0" id="DistinationID" />
                                                <span id="DistinationNameAr"></span></td>

                                            <td>حالة السيارات</td>
                                            <td>
                                                <input type="hidden" value="0" id="ShippingCalcID" />
                                                <span id="ShippingCalcName"></span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td title="اتفاقية عقد البيع">عقد البيع</td>
                                            <td colspan="3">
                                                <textarea style="width: 99%" class="autosize-transition" id="Notes" cols="5" rows="2"></textarea>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <div class="span12 widget-container-span">
                        <div class="widget-box">
                            <div class="widget-header">
                                <h5 class="bigger lighter">
                                    <i class="icon-table"></i>
                                    المبالغ المالية فى العقد
                                </h5>
                                <div class="widget-toolbar">
                                    <a href="#" data-action="collapse">
                                        <i class="icon-chevron-up"></i>
                                    </a>
                                </div>
                                <div class="widget-toolbar no-border hidden">
                                    <a href="#copyContract" data-toggle="modal" class="btn btn-mini btn-light bigger add-copy">
                                        <i class="icon-copy"></i>
                                        نسخ عقد عميل آخر
                                    </a>
                                </div>
                            </div>
                            <div class="widget-body">
                                <div class="widget-main">
                                    <div class="row-fluid">
                                        <div class="basicContract hidden form-horizontal">
                                            <div class="span6">
                                                <div class="control-group">
                                                    <label class="control-label" for="CommissionCash">عمولة البيع نقداً</label>
                                                    <div class="controls">
                                                        <div class="span12">
                                                            <input type="text" value="0" id="CommissionCash" name="CommissionCash" class="required money" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="control-group">
                                                    <label class="control-label" for="CommissionCredit">عمولة البيع آجل</label>
                                                    <div class="controls">
                                                        <div class="span12">
                                                            <input type="text" value="0" name="CommissionCredit" id="CommissionCredit" class="required money" required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span6">
                                                <div class="control-group">
                                                    <label class="control-label" for="ExtraCash" data-rel="tooltip" title="مبلغ الزيادة عن كل 5000 $ زيادة فوق ثمن السيارة 10000 دولار فى حالة البيع نقداً.">
                                                        الزيادة نقداً
                                                        <i class="icon-info-sign"></i>
                                                    </label>
                                                    <div class="controls">
                                                        <div class="span12">
                                                            <input type="text" value="0" id="ExtraCash" name="ExtraCash" class="required money" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="control-group ExtraCreditToMove">
                                                    <label class="control-label" for="ExtraCredit" data-rel="tooltip" title="مبلغ الزيادة عن كل 5000 $ زيادة فوق ثمن السيارة 10000 دولار فى حالة البيع آجل.">
                                                        الزيادة آجل
                                                        <i class="icon-info-sign"></i>
                                                    </label>
                                                    <div class="controls">
                                                        <div class="span12">
                                                            <input type="text" value="0" id="ExtraCredit" name="ExtraCredit" class="required money" required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="listContract form-horizontal">
                                            <div class="span6">
                                                <div class="control-group">
                                                    <label class="control-label" for="LoadingOFContainer">شحن-تحميل/الحاوية</label>
                                                    <div class="controls">
                                                        <div class="span12">
                                                            <input type="text" value="0" id="LoadingOFContainer" name="LoadingOFContainer" class="required money" required />
                                                            <i class="icon-info-sign" data-rel="tooltip" title="يتم تقسيم المبلغ الموضح بالتساوى على عدد السيارات الموجودة فى بوليصة الشحن BOL."></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="control-group">
                                                    <label class="control-label" for="CustomsContainer">تخليص-جمارك/الحاوية</label>
                                                    <div class="controls">
                                                        <div class="span12">
                                                            <input type="text" value="0" name="CustomsContainer" id="CustomsContainer" class="required money" required />
                                                            <i class="icon-info-sign" data-rel="tooltip" title="يتم تقسيم المبلغ الموضح بالتساوى على عدد السيارات الموجودة فى بوليصة الشحن BOL."></i>
                                                            <input type="hidden" value="0" id="CarsNo" name="CarsNo" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="span6">
                                                <div class="control-group">
                                                    <label class="control-label" for="ExtraCreditList" data-rel="tooltip" title="مبلغ زيادة على القيم بالقائمة فى حالة البيع آجل">زيادة البيع الآجل <i class="icon-info-sign"></i></label>
                                                    <div class="controls">
                                                        <div class="span12">
                                                            <input type="text" value="0" id="ExtraCreditList" name="ExtraCreditList" class="required money" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="movedExtraCredit"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-double hr-8"></div>
            <div class="row-fluid">
                <table id="listItems" class="table table-bordered table-hover listContract">
                    <thead>
                        <tr>
                            <th width="50" class="center">#</th>
                            <th width="20%">المدينة</th>
                            <th>Towing</th>
                            <th>تقطيع <a href="contract.aspx#repeatValueModal" data-rel="tooltip" data-toggle="modal" title="قيمة تقطيع لكل مدينة لها قيمة تونج" class="btn btn-minier btn-info pull-left hidden repeat-plus"><i class="icon-only icon-plus"></i></a></th>
                            <th>شحن-تحميل <a href="contract.aspx#repeatValueModal" data-rel="tooltip" data-toggle="modal" title="قيمة شحن-تحميل لكل مدينة لها قيمة تونج" class="btn btn-minier btn-info pull-left hidden repeat-plus"><i class="icon-only icon-plus"></i></a></th>
                            <th>تخليص-جمارك <a href="contract.aspx#repeatValueModal" data-rel="tooltip" data-toggle="modal" title="قيمة تخليص-جمارك لكل مدينة لها قيمة تونج" class="btn btn-minier btn-info pull-left hidden repeat-plus"><i class="icon-only icon-plus"></i></a></th>
                            <th>أخري <a href="contract.aspx#repeatValueModal" data-rel="tooltip" data-toggle="modal" title="قيمة أخري لكل مدينة لها قيمة تونج أو على جميع المدن بدون تونج" class="btn btn-minier btn-info pull-left hidden repeat-plus"><i class="icon-only icon-plus"></i></a></th>
                            <th>الاجمالى <sub>$</sub></th>
                        </tr>
                    </thead>
                    <tbody class="ui-sortable">
                    </tbody>
                </table>
                <button type="submit" id="DeleteAll" class="btn btn-app btn-danger pull-left hidden" title="إيقاف العقـد"><i class="icon icon-remove"></i>إيقاف العقـد</button>
                <button type="submit" id="SaveAll" class="btn btn-app btn-success pull-left" title="حفظ العقـد"><i class="icon icon-save"></i>حفظ العقـد</button>
            </div>
        </form>
        <!--copy contract-->
        <div id="copyContract" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="copyContractModalLabel"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="copyContractModalLabel"><i class="icon-glyphicon-repeat"></i>
                    نسخ عقد عميل</h3>
            </div>
            <div class="modal-body">
                <form id="copyForm" class="form-horizontal">
                    <div class="control-group">
                        <label class="control-label" for="msg">جهة الوصول:  </label>
                        <div class="controls">
                            <input type="text" id="DistIDCopy" name="DistIDCopy" class="form-control select2" data-fn-name="Distinations_GetNames" data-placeholder="جهة الوصول" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="msg">اختر العميل:  </label>
                        <div class="controls">
                            <select id="ClientIDCopy" name="ClientIDCopy">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-primary" id="btn-getCopy">
                    <i class="icon-copy"></i>
                    ابدأ النـسخ
                </button>
                <button class="btn btn-small pull-left" data-dismiss="modal" aria-hidden="true">
                    إلغاء</button>
            </div>
        </div>
        <!--end modal-->
        <!--repeat amount modal-->
        <div id="repeatValueModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="repeatValueModalLabel"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="repeatValueModalLabel"><i class="icon-refresh"></i>
                    توزيع القيمة على جميع المدن</h3>
            </div>
            <div class="modal-body">
                <form id="repeatForm" class="form-horizontal">
                    <div class="control-group">
                        <label class="control-label" for="Amount">المبلغ:  </label>
                        <div class="controls">
                            <input type="text" id="Amount" value="0" />
                            <input type="hidden" id="repeatIndex" value="0" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"></label>
                        <div class="controls">
                            <label>
                                <input type="checkbox" id="plusAmount" />
                                <span class="lbl">زيادة على القيمة الحالية.</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-primary" id="btn-startRepeat">
                    <i class="icon-refresh"></i>
                    ابدأ التوزيع
                </button>
                <button class="btn btn-small pull-left" data-dismiss="modal" aria-hidden="true">
                    إلغاء</button>
            </div>
        </div>
    </div>
    <script src="/Scripts/app/contractsManager.min.js?v=1.4"></script>
    <style>
        .cel-bg-sp {
            background: #f1eee9;
        }

        .widget-main {
            background-color: rgba(239, 239, 239, 0.61);
        }

        .table input {
            margin-bottom: 0 !important;
        }

            .table input.error {
                border: 1px solid #f09784 !important;
            }

        .table td.edit, .table th.edit {
            padding: 0 !important;
            vertical-align: middle !important;
        }

            .table td.edit input, .table th.edit input {
                border: 0.5px dotted rgba(213, 213, 213, 0.63);
            }

        #listItems.table tbody tr td, #listItems.table tfoot tr th {
            background-color: rgba(239, 239, 239, 0.61);
        }

        .edit strong {
            margin-top: 4px !important;
        }

        .table tr:hover .tools {
            display: inline-block;
            right: -3px;
        }

        .table tr:last-child td {
            border-bottom: 1px double #ACACAC;
        }

        .hide {
            display: none;
        }

        #editModalLabel i {
            margin-left: 5px;
        }

        .add-copy {
            font-size: 11px !important;
        }

        .table-hover tbody tr:hover > td, .table-hover tbody tr:hover > th {
            background-color: #f4fdd5 !important;
        }
    </style>
    <script src="/Scripts/select2/select2.min.js?v=1.7"></script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=2.6"></script>
</asp:Content>
