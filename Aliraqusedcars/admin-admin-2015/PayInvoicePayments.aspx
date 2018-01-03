<%@ Page Title=" شركة العراق - عرض حوالات فواتير الشراء" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="PayInvoicePayments.aspx.cs" Inherits="PayInvoicePayments" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/Templates/PayInvoicePayments.min.js?v=3.0"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="InvoicesPayView.aspx">فواتير الشراء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="PayInvoicePaymentDetails.aspx">إضافة حوالة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active title">عرض حوالات فواتير الشراء</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1 class="title">تقرير حوالات فواتير الشراء</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ExchangeCompanyID">مكتب الصرافة</label>
                        <div class="controls">
                            <label>
                                <span class="block input-icon input-icon-right">
                                    <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر مكتب الصرافة" id="ExchangeCompanyID">
                                        <option></option>
                                    </select>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Buyer">رقم الباير</label>
                        <div class="controls">
                            <div class="span12">
                                <select class="form-control chzn-select chosen-rtl" data-placeholder="اختــر" id="Buyer">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="divDates"><span>التاريخ</span></label>
                        <div class="controls">
                            <div class="span12">
                                <span class="filter_column filter_date_range">من
                                    <input tabindex="2" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                    إلى
                                    <input tabindex="3" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"></label>
                        <div class="controls">
                            <div class="span12">
                                <a tabindex="4" href="javascript:void(0);" id="SearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>&nbsp;بحـــث حـوالات الشـراء</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                <span class="title">حوالات فواتير الشراء </span>
                <a data-toggle="tooltip" href="PayInvoicePaymentDetails.aspx" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
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
                        <th width="90">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th><span class="pull-left">الإجمالي $</span></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="row-fulid">
            <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="cancelLbl">إلغاء حوالة الشراء
                    </h3>
                </div>
                <div class="modal-body">
                    <div id="cancelForm" class="form-horizontal">
                        <div class="control-group">
                            <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء حــولة الشراء تماماً، ونقل السيارات بها إلى قائمة السيارات الغير مدفوعه.</p>
                        </div>
                        <div class="control-group">
                            <label class="control-label"># الحوالة</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" readonly value="" id="PayInvoicePaymentsID" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">الباير</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" readonly value="" id="buyer" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">المزاد</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" readonly value="" id="auction" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="cancelNotes">سبب الحذف: <span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <textarea class="required" name="deleteReason" required id="deleteReason" cols="5" rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger bntCancelInvoice" aria-hidden="true">تنفيذ الحذف</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        تجاهل</button>
                </div>
            </div>
        </div>
    </div><script>PayInvoicePayments.Init();</script>
</asp:Content>