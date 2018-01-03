<%@ Page Title="تسجيل سند صرف" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="ReceiptPaymentsAdd.aspx.cs" Inherits="ReceiptPaymentsAdd"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/ReceiptPaymentsAdd.min.js?v=3.9"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ReceiptPaymentsView.aspx">سندات الصرف</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">سند صرف</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1><span>اضافة</span> سند صرف</h1>
        </div>
        <div class="row-fluid">
            <div class="message"></div>
            <form id="aspnetForm" autocomplete="off">
                <div class="form-horizontal">
                    <fieldset id="masterForm" data-operation="save" autocomplete="off">
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="ReceiptTypeID">سنـد صـرف<span class="red">*</span></label>
                                <div class="controls">
                                    <input type="hidden" id="ReceiptID" value="0" />
                                    <span id="ReceiptTypeID" class="radioList required" required="" aria-required="true">
                                        <label class="inline">
                                            <input id="ReceiptTypeID_0" type="radio" name="ReceiptTypeID" value="1" checked />
                                            <span class="lbl">عام</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="ReceiptTypeID" value="2" />
                                            <span class="lbl">لعميل</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="ReceiptTypeID" value="4" />
                                            <span class="lbl">لجهات السلف</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="ReceiptTypeID" value="3" />
                                            <span class="lbl">لموظف</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="ReceiptTypeID" value="5" />
                                            <span class="lbl">لمورد</span>
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
                            <div class="control-group hidden" id="divOutsideMemberID">
                                <label class="control-label" for="OutsideMemberID">جهة السلف الخارجية<span class="red">*</span></label>
                                <div class="controls">
                                    <select class="chzn-select chosen-rtl required" data-placeholder="اختر جهة السلف الخارجية" id="OutsideMemberID" name="OutsideMemberID" required="">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group" id="divFromName">
                                <label class="control-label" for="ToName">يصرف بيد<span class="red">*</span></label>
                                <div class="controls">
                                    <label>
                                        <input type="text" class="required" autocomplete="on" id="ToName" name="ToName" required="" />
                                    </label>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="PayTypeID">طريقة الدفع<span class="red">*</span></label>
                                <div class="controls">
                                    <span id="PayTypeID" class="radioList required" required="" aria-required="true">
                                        <label class="inline">
                                            <input id="PayTypeID_0" type="radio" name="PayTypeID" value="2" checked />
                                            <span class="lbl">بشيك</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="PayTypeID" value="1" />
                                            <span class="lbl">نقداً</span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div class="control-group bank-options" id="divBankID">
                                <label class="control-label" for="BankID"><span>اختر البنك</span><span class="red divBankRequired">*</span></label>
                                <div class="controls">
                                    <select class="chzn-select chosen-rtl required" required id="BankID" name="BankID" autocomplete="off">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group bank-options" id="divCheckNo">
                                <label class="control-label" for="CheckNo"><span>رقم الشيك</span><span class="red divBankRequired">*</span></label>
                                <div class="controls">
                                    <input type="text" class="required" required id="CheckNo" name="CheckNo" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group bank-options" id="divBankDate">
                                <label class="control-label" for="BankDate"><span>تاريخ الشيك</span></label>
                                <div class="controls">
                                    <input type="text" class="date-picker" dir="ltr" data-date-format="dd/mm/yyyy" id="BankDate" name="BankDate" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Revised" data-rel="tooltip" title="✓ تعني ان السند لايتم تعديله بعد المراجعه.">تمت المراجعة !</label>
                                <div class="controls">
                                    <span id="Revised" class="required radioList" aria-required="true">
                                        <label class="inline">
                                            <input id="Revised_0" type="radio" name="Revised" value="1" />
                                            <span class="lbl">ترحيل للبنك</span>
                                        </label>
                                        <label class="inline">
                                            <input type="radio" name="Revised" value="2" /><span class="lbl">سحب من النقدية (الصندوق)</span>
                                        </label>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="AmountDhs">المبلغ بالدرهم<span class="red">*</span></label>
                                <div class="controls">
                                    <input type="text" class="required" value="0" id="AmountDhs" name="AmountDhs" required="" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group hidden">
                                <label class="control-label" for="AmountAlphabet"><span>المبلغ حرفياً</span><span class="red">*</span></label>
                                <div class="controls">
                                    <textarea class="required" id="AmountAlphabet" name="AmountAlphabet" required="" cols="4" rows="2"></textarea>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Amount"><span>المبلغ $</span><span class="red">*</span></label>
                                <div class="controls">
                                    <input type="text" class="required" id="Amount" value="0" name="Amount" required="" autocomplete="off" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ExpenseTypeID">سبب الصرف <span class="red">*</span></label>
                                <div class="controls">
                                    <select class="chzn-select chosen-rtl required" required id="ExpenseTypeID" name="ExpenseTypeID" autocomplete="off">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Notes">ملاحظات</label>
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
    <script>$(function () { $('form').attr('autocomplete', 'on'); }); ClientsPayments.Init();</script>
    <style>
        input[type=checkbox] + .lbl, input[type=radio] + .lbl {
            min-width: 40px;
        }
    </style>
</asp:Content>
