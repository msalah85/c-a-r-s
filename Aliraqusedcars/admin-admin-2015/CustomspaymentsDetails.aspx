<%@ Page Title=" شركة العراق - حوالة فواتير التخليص" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="CustomsPaymentsDetails.aspx.cs" Inherits="CustomsPaymentsDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .sub-form {
            background-color: aliceblue;
        }

        #detailsForm {
            margin-top: 15px;
        }

        .reload {
            padding-top: 4px;
        }

        .hr-double {
            margin-top: 0;
        }

        .table {
            margin-bottom: 0;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="InvoicesCustomsView.aspx">فواتير التخليص</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="CustomsPayments.aspx">حوالات فواتير التخليص</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">إعداد حوالة فواتير التخليص</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إعداد حوالة التخليص</h1>
        </div>
        <form id="aspnetForm" role="form">
            <div class="row-fluid">
                <div class="form-horizontal" id="masterForm">
                    <div class="span6">
                        <input type="hidden" value="0" id="PaymentsId" />
                        <input type="hidden" value="0" id="CustomsCompanyID" />
                        <div class="control-group">
                            <label class="control-label" id="" for="PaymentsDates"><span>تاريخ الحوالة</span><span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <input type="text" dir="ltr" class="date-picker required vaild current-date" required name="PaymentsDates"
                                            data-date-format="dd/mm/yyyy" id="PaymentsDates" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Notes"><span>ملاحظات</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <textarea id="Notes" cols="3" rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" id="Label3" for="TotalAmount">إجمالى الفاتورة<sub class="text-warning"> $</sub></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="TotalAmount" class="money" name="TotalAmount" readonly value="0" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Commission">عمولة تحويل<sub class="text-warning"> درهم</sub></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="money" id="Commission" name="Commission" value="0" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="AmountDhs">مبلغ الحوالة<sub class="text-warning"> درهم</sub></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="AmountDhs" class="money" readonly name="AmountDhs" value="0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="row-fluid sub-form">
            <div class="table-header">
                فواتير التخليص بالحوالة
                <a href="javascript:window.location.reload();" class="pull-left btn btn-small reload" data-rel="tooltip" title="إعادة تعيين BOL"><i class="icon-undo bigger-150"></i></a>
            </div>
            <div id="detailsForm" class="form-horizontal">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ContainerNo"><span>رقم الحاوية</span></label>
                        <div class="controls">
                            <div class="span12">
                                <select class="required" data-placeholder="اختــر الحاوية" id="ContainerNo" name="ContainerNo">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ContainerDate">رقم الفاتورة</label>
                        <div class="controls">
                            <input type="text" class="required" id="ContainerDate" name="ContainerDate" disabled />
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="Amount">مبلغ الفاتورة<sub class="text-warning">$</sub></label>
                        <div class="controls">
                            <input type="text" class="required" value="0" id="Amount" name="Amount" disabled />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="AmountDh">مبلغ الفاتورة<sub class="text-warning">درهم</sub></label>
                        <div class="controls">
                            <input type="text" class="required" value="0" id="AmountDh" name="AmountDh" disabled />
                            <button type="submit" class="btn btn-success" aria-hidden="true" id="Savetemp" style="border: 0; padding: 0 10px">
                                + اضف الحاوية</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>رقم الحاوية
                        </th>
                        <th>رقم الفاتورة
                        </th>
                        <th>المبلغ<sub>$</sub>
                        </th>
                        <th>المبلغ<sub>درهم</sub>
                        </th>
                        <th width="60px">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <table class="table table-striped table-bordered sub-form">
                <tbody>
                    <tr>
                        <td><span class="pull-left">إجمالى الفاتورة <sub class="text-warning">درهم</sub></span></td>
                        <td width="27%"><span id="lblInvoiceTotal">0</span></td>
                    </tr>
                </tbody>
            </table>
            <span class="hr hr8 hr-double hr-dotted"></span>
            <button type="submit" id="SaveAll" class="btn btn-success pull-left" title="اضف جديد"><i class="icon icon-save"></i>حفظ حوالة فواتير التخليص</button>
        </div>
    </div>
    <script>var cutomCompID = "";</script>
    <script src="/Scripts/Templates/CustomspaymentsDetails.min.js?v=1.7"></script>
    <script>CustomspaymentsDetails.Init();</script>
</asp:Content>
