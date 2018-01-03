<%@ Page Title="تسجيل سند قبض" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="ReceiptVoucherAdd.aspx.cs" Inherits="ReceiptVoucherAdd"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/ReceiptVoucherAdd.min.js?v=2.8"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ReceiptVoucherView.aspx">سندات القبض</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">سند قبض</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1><span>اضافة</span> سند قبض</h1>
        </div>
        <div class="row-fluid">
            <div class="message"></div>
            <form id="aspnetForm" autocomplete="off">
                <div class="form-horizontal">
                    <fieldset id="masterForm" data-operation="save" autocomplete="off">
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="ReceiptTypeID">نوع سند القبض<span class="red">*</span></label>
                                <div class="controls">
                                    <input type="hidden" id="ReceiptID" value="0" />
                                    <span id="ReceiptTypeID" class="radioList required" required="" aria-required="true">
                                        <label class="inline">
                                            <input id="ReceiptTypeID_0" type="radio" name="ReceiptTypeID" value="1" checked />
                                            <span class="lbl">عام</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="ReceiptTypeID" value="2" />
                                            <span class="lbl">من عميل</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="ReceiptTypeID" value="3" />
                                            <span class="lbl">من موظف</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="ReceiptTypeID" value="4" />
                                            <span class="lbl">من جهات السلف</span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div class="control-group hidden" id="divClientID">
                                <label class="control-label" for="ClientID">العميل<span class="red">*</span></label>
                                <div class="controls">
                                    <select class="chzn-select chosen-rtl required" data-placeholder="اختــر العميل" id="ClientID" name="ClientID" required="">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group hidden" id="divEmpID">
                                <label class="control-label" for="EmpID">الموظف<span class="red">*</span></label>
                                <div class="controls">
                                    <select class="chzn-select chosen-rtl required" data-placeholder="اختــر الموظف" id="EmpID" name="EmpID" required="">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group" id="divFromName">
                                <label class="control-label" for="FromName">استلمنا من<span class="red">*</span></label>
                                <div class="controls">
                                    <input type="text" class="required" id="FromName" name="FromName" required="" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="PayTypeID">طريقة الدفع<span class="red">*</span></label>
                                <div class="controls">
                                    <span id="PayTypeID" class="radioList required" required="" aria-required="true">
                                        <label class="inline">
                                            <input id="PayTypeID_0" type="radio" name="PayTypeID" value="1" checked />
                                            <span class="lbl">نقداً</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="PayTypeID" value="2" />
                                            <span class="lbl">بشيك</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="PayTypeID" value="3" />
                                            <span class="lbl">شركة صرافة</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="PayTypeID" value="4" />
                                            <span class="lbl">تحويل بنكى</span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div class="control-group exchange-options hidden" id="divExchangeCompanyID">
                                <label class="control-label" for="ExchangeCompanyID"><span>شركة الصرافة</span><span class="red">*</span></label>
                                <div class="controls">
                                    <select class="chzn-select chosen-rtl required" data-placeholder="اختــر الصرافة" id="ExchangeCompanyID" name="ExchangeCompanyID" required="">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group exchange-options hidden" id="divExchangeDate">
                                <label class="control-label" for="ExchangeDate">تاريخ الحوالة</label>
                                <div class="controls">
                                    <input type="text" class="date-picker" dir="ltr" id="ExchangeDate" data-date-format="dd/mm/yyyy" name="ExchangeDate" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group exchange-options hidden" id="divCheckNo">
                                <label class="control-label" for="CheckNo"><span>رقم الايصال</span><span class="red">*</span></label>
                                <div class="controls">
                                    <input type="text" class="required" required id="CheckNo" name="CheckNo" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group bank-options hidden" id="divBankID">
                                <label class="control-label" for="BankID"><span>البـــنك</span><span class="red divBankRequired">*</span></label>
                                <div class="controls">
                                    <select class="required" required id="BankID" name="BankID" autocomplete="off">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group hidden" id="divBankTransferNo">
                                <label class="control-label" for="BankTransferNo">رقم التحويل البنكي<span class="red">*</span></label>
                                <div class="controls">
                                    <input type="text" required class="form-control required" name="BankTransferNo" id="BankTransferNo" />
                                </div>
                            </div>
                            <div class="control-group hidden" id="divOutsideMemberID">
                                <label class="control-label" for="OutsideMemberID">جهة السلف الخارجية<span class="red">*</span></label>
                                <div class="controls">
                                    <select class="chzn-select chosen-rtl required" data-placeholder="اختر جهة السلف الخارجية" id="OutsideMemberID" name="OutsideMemberID" required="">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group bank-options hidden" id="divBankDate">
                                <label class="control-label bank-exch-date" for="BankDate">تاريخ الشيك</label>
                                <div class="controls">
                                    <input type="text" class="date-picker" dir="ltr" data-date-format="dd/mm/yyyy" id="BankDate" name="BankDate" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group bank-options hidden" id="divBankCheckNo">
                                <label class="control-label" for="CheckNo"><span>رقم الشيك</span><span class="red divBankRequired">*</span></label>
                                <div class="controls">
                                    <input type="text" class="required" required id="BankCheckNo" name="CheckNo" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group hidden">
                                <label class="control-label" for="Revised" data-rel="tooltip" title="✓ تعني ان السند لايتم تعديله بعد المراجعه.">تمت المراجعة !</label>
                                <div class="controls">
                                    <input type="checkbox" id="Revised" />
                                    <span class="lbl">نعم تمت المراجعة، ومنع تعديل السند.</span>
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="Amount"><span>المبلغ $</span><span class="red">*</span></label>
                                <div class="controls">
                                    <input type="text" class="required" id="Amount" value="0" name="Amount" required="" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="AmountArabic"><span>المبلغ بالعربي</span><span class="red">*</span></label>
                                <div class="controls">
                                    <textarea cols="4" rows="2" class="required" id="AmountArabic" name="AmountArabic" required=""></textarea>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="AmountDhs"><span>المبلغ بالدرهم</span><span class="red">*</span></label>
                                <div class="controls">
                                    <input type="text" class="required" value="0" id="AmountDhs" name="AmountDhs" required="" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group" id="divExpenseTypeGroupID">
                                <label class="control-label" for="ExpenseTypeGroupID">تصنيف الإيرادات<span class="red">*</span></label>
                                <div class="controls">
                                    <select class="required" id="ExpenseTypeGroupID" name="ExpenseTypeGroupID" required="">
                                        <option value="1">عامه/سيارات</option>
                                        <option value="2">أخري</option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" id="Label4" for="Notes">بيان</label>
                                <div class="controls">
                                    <textarea cols="2" rows="2" id="Notes"></textarea>
                                </div>
                            </div>
                            <div class="form-actions">
                                <input type="hidden" id="IDs" value="0" />
                                <button type="submit" id="SaveAll" class="btn btn-success" data-last="Finish"><i class="icon-save"></i>حفـــظ</button>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>
    </div>
    <script>ClientsPayments.Init();</script>
    <style>
        input[type=checkbox] + .lbl, input[type=radio] + .lbl {
            min-width: 40px;
            margin: 0 0 0 1px;
        }
    </style>
</asp:Content>
