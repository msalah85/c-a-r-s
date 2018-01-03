<%@ Page Title="عرض سندات الصرف" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ReceiptPaymentsAdd.aspx">اضافة سند صرف</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">سندات الصرف</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير سندات الصرف</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="masterForm">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ClientID">بحث بالمستلم</label>
                        <div class="controls">
                            <input type="text" id="ToName" class="form-control" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="CustomCo">البنك</label>
                        <div class="controls">
                            <input type="text" id="BankID" name="BankID" class="select2 form-control" data-fn-name="Banks_Names" />
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label">نوع المصروف</label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="ReceiptExpenseTypeID" name="ReceiptExpenseTypeID" class="select2 form-control" data-fn-name="ReceiptExpenseTypes_Names" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="divDates"><span>التاريخ</span></label>
                        <div class="controls">
                            <div class="span12">
                                <span class="filter_column filter_date_range">
                                    <input tabindex="2" type="text" dir="ltr" data-date-format="dd/mm/yyyy" placeholder="التاريخ من" class="date_range_filter date-picker form-control" id="From" />                  
                                    <input tabindex="3" type="text" dir="ltr" data-date-format="dd/mm/yyyy" placeholder="التاريخ إلى" class="date_range_filter date-picker form-control" id="To" /></span>
                                <button type="submit" tabindex="4" id="SearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>&nbsp;بحـــث</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض سندات الصرف
                <a data-toggle="tooltip" href="ReceiptPaymentsAdd.aspx" title="اضافة جديد" class="pull-left btn-primary btnAdd">
                    <i class="icon-plus"></i>
                    سند صرف
                </a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>م</th>
                        <th>التاريخ</th>
                        <th>نوع السند</th>
                        <th>المستلم</th>
                        <th>البنك</th>
                        <th>رقم الشيك</th>
                        <th>المبلغ <sub>$</sub></th>
                        <th>المبلغ <sub>درهم</sub></th>
                        <th width="85" class="hidden-print">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="cancelLbl">إلغاء سند الصرف
                </h3>
            </div>
            <div class="modal-body">
                <form id="cancelForm" class="form-horizontal" role="form">
                    <div class="control-group">
                        <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء سند الصرف تماماً.</p>
                    </div>
                    <div class="control-group">
                        <label class="control-label">رقم السند</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="ReceiptID" type="text" value="0" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">بتاريخ</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="AddDate" type="text" value="0" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">المبلغ $</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="Amount" type="text" value="0" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">سبب الإلغاء <span class="red">*</span></label>
                        <div class="controls">
                            <div class="span12">
                                <textarea id="DeleteReason" rows="4" cols="4" name="DeleteReason" class="required" required></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger bntCancelInvoice" aria-hidden="true">اعتمد الإلغاء</button>
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                    تجاهل</button>
            </div>
        </div>
        <!--end cancel modal-->
        <div class="hr hr8 hr-double hr-dotted">
        </div>
        <div class="row-fluid">
            <div class="span11">
                <span class="pull-left">إجمالى السندات: <strong class="debit green">0</strong><sub>$</sub></span>
            </div>
        </div>
        <div class="clearfix space-16"></div>
    </div>
    <script src="/Scripts/app/ReceiptPaymentView.min.js?v=1.9"></script>
    <script type="text/javascript">
        ReceiptPayment.Init();
    </script>
    <script src="/Scripts/select2/select2.min.js?v=1.4"></script>
    <script async src="/Scripts/select2/select2-optinal.min.js?v=2"></script>
</asp:Content>
