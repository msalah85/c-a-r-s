<%@ Page Title="شركة العراق - حوالة فاتورة الشحن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ShipInvoicePaymentsDetails.aspx.cs" Inherits="ShipInvoicePaymentsDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .sub-form {
            background-color: aliceblue;
        }

        .reload {
            padding-top: 4px;
        }

        .sub-form td.edit {
            padding: 2px;
        }

        .sub-form td input, .sub-form td textarea {
            margin-bottom: 0;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesShippView.aspx">عرض فواتير الشحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ShipInvoicePayments.aspx">عرض حوالات الشحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">إعداد حوالة فاتورة الشحن</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إعداد حوالة فاتورة الشحن</h1>
        </div>
        <div class="row-fluid">
            <form id="aspnetForm">
                <div class="form-horizontal">
                    <div id="masterForm">
                        <div class="span6">
                            <input type="hidden" id="ShipInvoicePaymentsID" value="0" />
                            <div class="control-group">
                                <label class="control-label" for="PaymentsDates">تاريخ الحوالة</label>
                                <div class="controls">
                                    <input type="text" dir="ltr" class="date-picker required vaild current-date" name="PaymentsDates"
                                        data-date-format="dd/mm/yyyy" id="PaymentsDates" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" id="Label1" for="CustomsCompanyID">الشاحن</label>
                                <div class="controls">
                                    <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر الشاحن" id="ShipCompanyID" name="ShipCompanyID">
                                        <option></option>
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
                                <label class="control-label" for="Convertamount">مصاريف حوالة <sub class="text-warning">$</sub></label>
                                <div class="controls">
                                    <input type="text" id="Convertamount" value="0" class="required" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Amount">إجمالى الحوالة <sub class="text-warning">$</sub></label>
                                <div class="controls">
                                    <input type="text" id="Amount" value="0" class="no-border required" readonly />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" id="Label2" for="Notes">ملاحظات</label>
                                <div class="controls">
                                    <textarea rows="3" cols="4" id="Notes"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid sub-form">
            <div class="table-header">
                فواتير الشحن بالحوالة
                <a href="javascript:window.location.reload();" class="pull-left btn btn-small reload" data-rel="tooltip" title="إعادة تعيين BOL"><i class="icon-undo bigger-150"></i></a>
            </div>
            <div id="detailsForm" class="form-horizontal">
                <form id="detailsFormdsfs">
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="ContainerNo">رقم الحاوية</label>
                            <div class="controls">
                                <select class="chzn-select chosen-rtl required" data-placeholder="اختــر رقم الحاوية" id="ContainerNo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Bol">Bol</label>
                            <div class="controls">
                                <input type="text" dir="ltr" class="required" id="Bol" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="ShippPrice">مبلغ الفاتورة</label>
                            <div class="controls">
                                <input type="text" dir="ltr" class="required" id="ShippPrice" readonly />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"></label>
                            <div class="controls">
                                <button class="btn btn-success" style="border: 0; padding: 0 10px;" aria-hidden="true" id="Savetemp">
                                    + اضف الحاوية</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row-fluid">
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>رقم الحاوية
                        </th>
                        <th>Bol
                        </th>
                        <th>مبلغ الفاتورة $
                        </th>
                        <th width="60px">حذف
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <table class="table table-bordered">
                <tbody>
                    <tr class="sub-form">
                        <td>العدد:
                            <span class="invoicesCount"></span>
                            <strong class="pull-left">إجمالى فواتير الشحن <sub class="text-warning">$</sub></strong></td>
                        <td width="30%"><span id="lblInvoiceTotal">0</span></td>
                    </tr>
                    <tr class="sub-form">
                        <td>
                            <label for="Discount" class="pull-left purple">مبلغ الخصم <sub>$</sub></label></td>
                        <td class="edit">
                            <input name="Discount" id="Discount" required="" class="input-block-level form-control bolder money" type="number" value="0" />
                        </td>
                    </tr>
                    <tr class="sub-form">
                        <td>
                            <label for="DiscountReason" class="pull-left blue">سبب الخصم</label></td>
                        <td class="edit">
                            <textarea cols="3" rows="3" name="DiscountReason" id="DiscountReason" required="" class="input-block-level form-control money"></textarea>
                        </td>
                    </tr>
                    <tr class="sub-form">
                        <td><strong class="pull-left green">الصافي: <sub>$</sub></strong></td>
                        <td><span id="lblNetAmount">0</span></td>
                    </tr>
                </tbody>
            </table>
            <span class="hr hr8 hr-double hr-dotted"></span>
            <div class="row">
                <button type="submit" id="SaveAll" class="btn btn-success pull-left" title="حفـــظ"><i class="icon icon-save"></i>حفظ حوالة فاتورة الشحن</button>
            </div>
        </div>
    </div>
    <script src="/Scripts/Templates/ShipInvoicePaymentsDetails.min.js?V=2.5"></script>
    <script>ShipInvoicePaymentsDetails.Init();</script>
</asp:Content>