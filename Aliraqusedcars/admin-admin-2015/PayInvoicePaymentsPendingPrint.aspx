<%@ Page Title="طباعة حوالة الشراء قيد الانتظار" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/Templates/PayInvoicePaymentsPendingPrint.min.js?v=2.25"></script>
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .table thead th, .col-bg {
            background-color: #f1eee9;
        }

        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
            }

            .table thead th, .col-bg {
                background-color: #f1eee9 !important;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-plus"></i><a href="PayInvoicePaymentDetails.aspx">حوالة جديدة</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="PayInvoicePayments.aspx">عرض حوالات الشراء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="PayInvoicePayments.aspx?pend=1">الحوالات قيد الدفع</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طباعة البيرات بالحوالة قيد الدفع</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="space-6">
            </div>
            <div class="row-fluid">
                <div class="span10 offset1">
                    <div class="widget-box transparent invoice-box">
                        <div class="widget-header widget-header-large">
                            <h2 class="grey lighter pull-left position-relative">قيم البيرات بالحوالة قيد الدفع
                            </h2>
                            <div class="widget-toolbar no-border invoice-info">
                                <span class="invoice-info-label">التاريخ:</span> <span class="blue">
                                    <%= DateTime.UtcNow.ToShortDateString() %></span>
                            </div>
                            <div class="widget-toolbar hidden-480">
                                <a class="printme hidden-print" href="javascript:void(0);"><i class="icon-print bigger-150"></i></a>
                            </div>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main padding-24">
                                <div class="row-fluid">
                                    <table id="listItems" class="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>م</th>
                                                <th>المزاد
                                                </th>
                                                <th>الباير
                                                </th>
                                                <th width="20%">المبلغ <sub>$</sub></th>
                                                <th width="20%">المبلغ <sub>درهم</sub></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="3"><span class="pull-left">الاجمالى</span></th>
                                                <th class="col-bg total"></th>
                                                <th class="col-bg totalPaymentTotalDhs"></th>
                                            </tr>
                                            <tr>
                                                <th colspan="4"><span class="pull-left">ضريبة القيمة المضافة <sub>درهم</sub></span></th>
                                                <th class="col-bg vatTotalAmount"></th>
                                            </tr>
                                            <tr>
                                                <th colspan="4"><span class="pull-left">صافى قيمة الحوالة <sub>درهم</sub></span></th>
                                                <th class="col-bg totalDhs"></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div class="space-10"></div>
                                    <table class="no-border" width="100%">
                                        <tbody>
                                            <tr>
                                                <td class="center bolder">التوقيع</td>
                                                <td class="center bolder">المحاسب</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td class="center" id="userName"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div id="disc-modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="disc-modalLabel"
                    aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h3 id="disc-modalLabel"><i class="icon-plus"></i>
                            اضافة مبلغ الخصم</h3>
                    </div>
                    <div class="modal-body">
                        <form id="discountForm" class="form-horizontal">
                            <div class="control-group">
                                <label class="control-label" for="msg">رقم الحوالة:  </label>
                                <div class="controls">
                                    <input type="text" id="pay-id" class="form-control" readonly="readonly" required value="0" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="discount-amount">مبلغ الخصم: <span class="text-error">*</span></label>
                                <div class="controls">
                                    <input type="text" id="discount-amount" class="form-control required" name="discount-amount" required value="0" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="msg">سبب الخصم: <span class="text-error">*</span></label>
                                <div class="controls">
                                    <textarea rows="5" cols="5" class="form-control required" required id="msg" name="msg"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-small btn-primary" id="save-discount">
                            <i class="icon-save"></i>
                            حفــظ
                        </button>
                        <button class="btn btn-small pull-left" data-dismiss="modal" aria-hidden="true">
                            إلغاء</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>PayInvoicePaymentsPrint.Init();</script>
</asp:Content>
