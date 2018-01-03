<%@ Page Title="تسجيل موفوعات للعميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="ClientsPaymentsAdd.aspx.cs" Inherits="ClientsPaymentsAdd"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .cel-bg {background-color: #f1eee9 !important;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a class="paymentsList" href="ClientsPaymentsView.aspx">الحــوالات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">مدوفوعات العـملاء</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>اضافة إيداع عميل <a class="orange clientName"></a></h1>
        </div>
        <div class="space-10"></div>
        <div class="row-fluid">
            <form id="aspnetForm" autocomplete="off">
                <div class="form-horizontal">
                    <div class="span12">
                        <div class="control-group">
                            <label class="control-label" for="RecieptID"><span>رقم سند القبض</span><span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <select class="chzn-select chosen-rtl" data-placeholder="اختــر سند القبض" id="RecieptID" name="RecieptID">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="space-24"></div>
                    </div>
                    <div class="span6">
                        <fieldset id="masterForm" data-operation="save" autocomplete="off" class="hidden">
                            <table class="table table-striped table-bordered">
                                <col class="cel-bg" />
                                <col class="cel-bg" />
                                <tbody>
                                    <tr>
                                        <th width="20%">رقم السند
                                        </th>
                                        <th>
                                            <span class="bolder" id="ReceiptID"></span>
                                        </th>
                                    </tr>
                                    <tr class="divfull_name hidden">
                                        <td>العميل
                                        </td>
                                        <td>
                                            <span class="hidden" id="ClientID"></span>
                                            <span id="full_name"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>التاريخ
                                        </td>
                                        <td>
                                            <span id="AddDate"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>طريقة الدفع
                                        </td>
                                        <td>
                                            <span id="PayTypeID" class="hidden"></span>
                                            <span id="PaymentTypeName"></span>
                                        </td>
                                    </tr>
                                    <tr class="exchangeCo hidden">
                                        <td>شركة الصرافة
                                        </td>
                                        <td>
                                            <span class="hidden" id="ExchangeCompanyID"></span>
                                            <span id="ExchangeCompanyNameAr"></span>
                                        </td>
                                    </tr>
                                    <tr class="exchangeCo hidden">
                                        <td id="divLabelCheckNo">رقم الايصال
                                        </td>
                                        <td>
                                            <span id="CheckNo"></span>
                                        </td>
                                    </tr>
                                    <tr class="bankName hidden">
                                        <td>البنك
                                        </td>
                                        <td>
                                            <span class="hidden" id="BankID"></span>
                                            <span id="BankName"></span>
                                        </td>
                                    </tr>
                                    <tr class="bankCheck hidden">
                                        <td id="divLabelBankCheckNo">رقم الشيك
                                        </td>
                                        <td>
                                            <span id="BankCheckNo"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>المبلغ$
                                        </td>
                                        <td>
                                            <span class="green" id="Amount"></span>
                                            <sub class="green">$</sub>&nbsp;&nbsp;&nbsp;<span class="green" id="AmountArabic"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>المبلغ <sub>درهم</sub>
                                        </td>
                                        <td>
                                            <span class="orange" id="AmountDhs"></span>
                                            <sub class="orange">درهم</sub>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>استلمنا من
                                        </td>
                                        <td>
                                            <span id="FromName"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>البيان
                                        </td>
                                        <td>
                                            <span id="Notes"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="control-group">
                                <label class="control-label" for="passwordNo"><span>الرقم السرى </span><span class="red">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <label>
                                            <input type="password" class="required notneed" required id="passwordNo" name="Pass" value="" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" id="SaveAll" class="btn btn-success" data-last="Finish"><i class="icon-save"></i>اعتمد المبلغ فى رصيد العميل</button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script src="/Scripts/app/ReceiptVoucherReview.min.js?v=4.0"></script>
</asp:Content>
