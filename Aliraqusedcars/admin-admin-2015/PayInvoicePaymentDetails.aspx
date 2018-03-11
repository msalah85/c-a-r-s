<%@ Page Title="شركة العراق - حوالة فواتير الشراء" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="PayInvoicePaymentDetails.aspx.cs" Inherits="PayInvoicePaymentDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/select2/select2.min.css?v=1.4" rel="stylesheet" />
    <script src="/Scripts/select2/select2.min.js?v=1.4"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="PayInvoicePayments.aspx">عرض حوالات الشراء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active title">إعداد حوالة فواتير الشراء</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1 class="title">إعداد حوالة فواتير الشراء</h1>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="mesg"></div>
            </div>
            <div class="form-horizontal">
                <form id="aspnetForm">
                    <div class="span6">
                        <input type="hidden" value="0" class="hasfunction noreset" id="PayInvoicePaymentsID" />
                        <div class="control-group">
                            <label class="control-label" for="PaymentsDates">تاريخ الحوالة<span class="red">*</span></label>
                            <div class="controls">
                                <input type="text" dir="ltr" class="date-picker current-date required vaild" required name="PaymentsDates"
                                    data-date-format="dd/mm/yyyy" id="PaymentsDates" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="AuctionID">إسم المزاد<span class="red">*</span></label>
                            <div class="controls">
                                <select class="chzn-select chosen-rtl required showvalue" required data-placeholder="اختــر إسم المزاد" id="AuctionID">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="BuyerID">رقم الباير<span class="red">*</span></label>
                            <div class="controls">
                                <select class="chzn-select chosen-rtl required showvalue" required data-placeholder="اختــر رقم الباير" id="BuyerID" name="BuyerID">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Rate">قيمة التحويل/Rate</label>
                            <div class="controls">
                                <select class="form-control noreset" id="Rate" name="Rate">
                                    <option value="3.6740">3.674</option>
                                    <option value="3.6735">3.6735</option>
                                    <option value="3.6670">3.667</option>
                                    <option value="3.6750">3.675</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="VAT">ضريبة القيمة المضافة/الباير <sub>درهم</sub></label>
                            <div class="controls">
                                <select class="form-control noreset" id="VAT" name="VAT">
                                    <option value="0">0</option>
                                    <option value="2.5000">2.5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="BuyerAnnualFee" data-rel="tooltip" title="رسوم تجديد باير سنوي">رسوم تجديد باير <sub class="text-warning">$</sub></label>
                            <div class="controls">
                                <input type="text" class="money required" required id="BuyerAnnualFee" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="TotalAmount">إجمالى الحوالة <sub class="text-warning">$</sub></label>
                            <div class="controls">
                                <input type="text" class="money" id="TotalAmount" readonly value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Convertamount">مصاريف حوالة <sub class="text-warning">درهم</sub></label>
                            <div class="controls">
                                <input type="text" id="Convertamount" value="0" class="required money" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="AmountDhs">إجمالى الحوالة <sub class="text-warning">درهم</sub></label>
                            <div class="controls">
                                <input type="text" class="money" id="AmountDhs" readonly value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Notes"><span>ملاحظات</span></label>
                            <div class="controls">
                                <textarea cols="4" rows="3" id="Notes"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6 widget-container-span">
                <div class="widget-box">
                    <div class="widget-header header-color-green">
                        <h4 class="lighter"><i class="icon-list"></i>فواتير الشراء بالحوالة</h4>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main padding-6 no-padding-left no-padding-right">
                            <div id="detailsForm" class="form-horizontal">
                                <fieldset id="detailsFormdsfs">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="LotNo"><span>رقم اللوت</span></label>
                                            <div class="controls">
                                                <input id="LotNo" name="LotNo" class="form-control select2" data-fn-name="Buyer_CarsNotPaid" data-srch-names="BuyerID" type="text" />
                                                <input type="hidden" id="ChassisNo" />
                                            </div>
                                        </div>
                                        <div class="control-group">
                                            <label class="control-label" for="CarID">رقم السيارة</label>
                                            <div class="controls">
                                                <input type="text" id="CarID" readonly />
                                            </div>
                                        </div>
                                        <div class="control-group">
                                            <label class="control-label" for="PayPrice">مبلغ الفاتورة</label>
                                            <div class="controls">
                                                <input type="text" id="PayPrice" class="money" style="width: 100px;" readonly />
                                                <button class="btn btn-success" id="Savetemp" style="padding: 0 10px; border: 0;">+ أضف السيارة</button>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <table id="listItems" class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>رقم اللوت
                                        </th>
                                        <th class="hidden-480 hidden-tablet">الشاصي
                                        </th>
                                        <th class="hidden-480 hidden-tablet">رقم السيارة
                                        </th>
                                        <th>مبلغ الفاتورة
                                        </th>
                                        <th width="50px">خيارات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td class="hidden-480 hidden-tablet"></td>
                                        <td class="hidden-480 hidden-tablet"></td>
                                        <td><strong class="invoicesFooter green" data-rel="tooltip" title="إجمالى الفواتير">0</strong> $</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="span6 widget-container-span">
                <div class="widget-box">
                    <div class="widget-header header-color-pink">
                        <h4 class="lighter"><i class="icon-pencil"></i>أضف الغرامات للحوالة</h4>
                        <div class="widget-toolbar">
                            <a href="#" data-action="collapse">
                                <i class="icon-chevron-up"></i>
                            </a>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main padding-6 no-padding-left no-padding-right">
                            <div id="detailsForm2" class="form-horizontal">
                                <fieldset id="detailsFormdsfs2">
                                    <div class="span12">
                                        <div class="control-group">
                                            <label class="control-label" for="LotNo"><span>رقم اللوت</span></label>
                                            <div class="controls">
                                                <div class="span12">
                                                    <input id="LotNo" name="LotNo" class="form-control select2" data-fn-name="Buyer_CarsNotPaid4Fines" data-srch-names="BuyerID" type="text" />
                                                    <input type="hidden" id="CarID" value="0" />
                                                    <input type="hidden" id="ChassisNo" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="control-group">
                                            <label class="control-label" for="Storge"><span>غرامات أرضيات</span></label>
                                            <div class="controls">
                                                <div class="span12">
                                                    <label>
                                                        <input type="text" class="required money" id="Storge" value="0" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="control-group">
                                            <label class="control-label" for="LatPayment"><span>غرامات تأخير الدفع</span></label>
                                            <div class="controls">
                                                <div class="span12">
                                                    <div>
                                                        <label style="display: inline">
                                                            <input class="ace ace-switch ace-switch-6 notsave notneed" type="checkbox" />
                                                            <span class="lbl"></span>
                                                        </label>
                                                        <label style="display: inline">
                                                            <input type="text" id="LatPayment" class="money" style="width: 30px;" readonly="readonly" value="0" />
                                                            <button class="btn btn-danger" id="Savetemp2" style="padding: 0 10px; border: 0;">+ أضف غرامه</button>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <table id="listItems2" class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>رقم اللوت
                                        </th>
                                        <th>رقم السيارة</th>
                                        <th>الشاصي
                                        </th>
                                        <th>غرامات أرضيات
                                        </th>
                                        <th>غرامات تأخير الدفع
                                        </th>
                                        <th width="50px">خيارات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><strong class="storageFooter red" data-rel="tooltip" title="إجمالى غرامات الأرضيات">0</strong> $</td>
                                        <td><strong class="latFooter red" data-rel="tooltip" title="إجمالى غرامات تأخير الدفع">0</strong> $</td>
                                        <td><strong class="subFinesFooter orange" data-rel="tooltip" title="إجمالى الغرامات">0</strong> $</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fulid">
            <span class="hr hr4 hr-double hr-dotted" style="margin-bottom: 1px"></span>
            <table class="table table-striped table-bordered tbl-footer">
                <tbody>
                    <tr>
                        <td><span class="pull-left">إجمالى الحوالة <sub class="text-warning">$</sub></span></td>
                        <td width="30%"><strong id="lblInvoiceTotal" class="blue">0</strong>&nbsp;$</td>
                    </tr>
                </tbody>
            </table>
            <small id="divSpinner" class="pull-left"></small>
            <button type="submit" id="SaveAll" class="btn btn-app btn-info pull-left" title="حفـــظ"><i class="icon icon-save bigger-200"></i>حفظ الحوالة</button>
        </div>
    </div>
    <script src="/Scripts/select2/select2-optinal.min.js?v=1.1"></script>
    <script src="/Scripts/Templates/PayInvoicePaymentDetails.js?v=3.0"></script>
    <style>
        .widget-body .table thead:first-child tr {
            background: #F5F5F5;
            vertical-align: middle;
        }

        .widget-main.padding-6 {
            padding: 12px 0 0;
        }

        #page-content .page-header:first-child {
            margin: 0;
        }

        #listItems tfoot tr {
            background-color: rgba(130, 175, 111, 0.19);
        }

        #listItems2 tfoot tr {
            background-color: rgba(206, 111, 158, 0.19);
        }

        .tbl-footer {
            background-color: aliceblue;
        }

        .select2-container {
            width: 220px;
        }
    </style>
</asp:Content>
