<%@ Page Title="ترحيل سندات القبض للبنك" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ClientPaymentsReview.aspx.cs" Inherits="admin_admin_2015_ClientPaymentsReview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        hr {
            margin: 1px;
        }
    </style>
    <script src="/Scripts/app/ClientPaymentsReview.min.js?v=1.7"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="ReceiptVoucherAdd.aspx">اضافة سند القبض</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ReceiptVoucherView.aspx">عرض سندات القبض</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">ترحيل سندات القبض للبنك</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>ترحيل سندات القبض للبنك <small id="divSpinner"></small></h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <form id="aspnetForm">
                    <div class="span6">
                        <input type="hidden" value="0" id="ReviewPaymentID" />
                        <div class="control-group">
                            <label class="control-label" for="PaymentDate">التاريخ<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" dir="ltr" class="date-picker current-date required vaild" required name="PaymentDate"
                                        data-date-format="dd/mm/yyyy" id="PaymentDate" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="AmountDhs">إجمالى السندات<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" data-rule-number="true" class="required" required value="0" id="AmountDhs" name="AmountDhs" />
                                    <sub class="text-warning">درهم</sub>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="AmountDhs">رقم الايداع/الشيك<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required" required id="CheckNo" name="CheckNo" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="PaymentID" data-rel="tooltip" title="اختر رقم السند">رقم سند القبض!</label>
                            <div class="controls">
                                <div class="span12">
                                    <select class="chzn-select chosen-rtl required" title="رقم سند القبض" required data-placeholder="اختـر رقم السند" id="PaymentID" name="PaymentID">
                                        <option></option>
                                    </select>
                                    <a href="javascript:;" id="AddNewPayment" title="اضف سند القبض" class="btn btn-success btn-mini" data-rel="tooltip"><i class="icon-plus"></i> أضف للقائمة</a>
                                    <a href="javascript:;" id="AddToCashFunds" title="ترحيل سند القبض للنقدية (الصندوق)" class="btn btn-light btn-mini" data-rel="tooltip">ترحيل للنقدية (الصندوق)</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="Notes" data-rel="tooltip" title="البيان يظهر فى تقرير البنك">البيان!</label>
                            <div class="controls">
                                <div class="span12">
                                    <textarea cols="2" rows="3" id="Notes">إيداع</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-header header-color-blue2">
                    <h5 class="bigger lighter">
                        <i class="icon-list"></i>
                        عرض سندات القبض لترحيلها للبنك
                    </h5>
                    <div class="widget-toolbar no-border">
                        <a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a>
                    </div>
                </div>
                <div class="widget-body">
                    <div class="widget-main no-padding">
                        <table id="listItems" class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>رقم السند</th>
                                    <th>التاريخ</th>
                                    <th>المبلغ <sub>$</sub></th>
                                    <th>المبلغ <sub>درهم</sub></th>
                                    <th width="50" class="hidden-print">حذف</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <hr class="hr-double hr-dotted sp" />
                        <table class="table table-bordered">
                            <tr>
                                <td><b class="pull-left tcust">إجمالى الحوالات:</b></td>
                                <td width="10%"><strong id="TotalAmountDhs">0</strong>
                                    <sub class="text-warning">درهم</sub></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span11">
                <button type="submit" id="SaveAll" class="btn btn-app btn-info pull-left hidden" title="حفـــظ"><i class="icon icon-save bigger-110"></i>حفظ وترحيل للبنك</button>
            </div>
        </div>
    </div>
    <script>pageManager.Init();</script>
</asp:Content>
