<%@ Page Title="ترحيل حوالات الشراء للبنك" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="PayInvoicePaymentReview.aspx.cs" Inherits="admin_admin_2015_PayInvoicePaymentReview" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        hr {
            margin: 1px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="PayInvoicePaymentDetails.aspx">اضافة حوالة شراء</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="PayInvoicePayments.aspx">عرض حوالات الشراء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">ترحيل حوالات الشراء للبنك</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>ترحيل حوالات الشراء للبنك <small id="divSpinner"></small></h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <form id="aspnetForm">
                    <div class="span6">
                        <input type="hidden" value="0" id="ReviewPaymentID" />
                        <div class="control-group">
                            <label class="control-label" for="CheckNo">رقم الشيك<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <select class="chzn-select chosen-rtl required" required data-placeholder="اختـر رقم الشيك" id="CheckNo" name="CheckNo">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="PaymentDate">التاريخ<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" dir="ltr" class="date-picker required vaild" required name="PaymentDate"
                                        data-date-format="dd/mm/yyyy" id="PaymentDate" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="AmountDhs">إجمالى الحوالات<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" data-rule-number="true" class="required" required value="0" id="AmountDhs" name="AmountDhs" />
                                    <sub class="text-warning">درهم</sub>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="Notes">البيان</label>
                            <div class="controls">
                                <div class="span12">
                                    <textarea cols="2" rows="3" id="Notes" style="height: 95px">شيك رقم</textarea>
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
                        عرض حوالات الشراء لرقم الشيك
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
                                    <th width="90"># الحوالة
                                    </th>
                                    <th width="100">تاريخ الحوالة
                                    </th>
                                    <th>مكتب الصرافة
                                    </th>
                                    <th>المزاد
                                    </th>
                                    <th>الباير
                                    </th>
                                    <th>ملاحظات
                                    </th>
                                    <th width="100">مبلغ الحوالة
                                    </th>
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
                <button type="submit" id="SaveAll" class="btn btn-app btn-info pull-left" title="حفـــظ"><i class="icon icon-save bigger-110"></i>حفظ وترحيل للبنك</button>
            </div>
        </div>
    </div>
    <script src="/Scripts/app/PayInvoicePaymentsReview.min.js?v=1.1"></script>
</asp:Content>

