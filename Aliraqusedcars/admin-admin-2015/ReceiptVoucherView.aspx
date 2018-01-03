<%@ Page Title="عرض سندات القبض" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
    <script src="/Scripts/app/ReceiptVoucherView.min.js?v=3.1"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ReceiptVoucherAdd.aspx">اضافة سند قبض</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">سندات القبض</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير سندات القبض</h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal" id="masterForm">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ClientID">بحث بالعميل</label>
                        <div class="controls">
                            <input type="text" id="ClientID" name="ClientID" class="select2 form-control" data-fn-name="Clients_SelectNames3" />
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
                        <label class="control-label" for="divDates"><span>التاريخ</span></label>
                        <div class="controls">
                            <span class="filter_column filter_date_range">من
                                    <input tabindex="2" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                &nbsp;إلى
                                    <input tabindex="3" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">التصنيف</label>
                        <div class="controls">
                            <select class="span3" id="ExpenseTypeGroupID" name="ExpenseTypeGroupID">
                                <option value="">اختر</option>
                                <option value="1">عامه/سيارات</option>
                                <option value="2">أخري</option>
                            </select>
                            <button type="submit" id="SearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>&nbsp;بحـــث</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض سندات القبض <a data-toggle="tooltip" href="ReceiptVoucherAdd.aspx" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>م</th>
                        <th>التاريخ</th>
                        <th>نوع السند</th>
                        <th>استلمنا من</th>
                        <th>رقم الشيك</th>
                        <th>البنك</th>
                        <th>المبلغ <sub>$</sub></th>
                        <th>المبلغ <sub>درهم</sub></th>
                        <th width="80" class="hidden-print">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="cancelLbl">إلغاء سند القبض
                </h3>
            </div>
            <div class="modal-body">
                <form id="cancelForm" class="form-horizontal" role="form">
                    <div class="control-group">
                        <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء سند القبض تماماً.</p>
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
    </div>
    <script type="text/javascript">
        ReceiptVoucher.Init();
    </script>
    <script src="/Scripts/select2/select2.min.js?v=1.4"></script>
    <script async src="/Scripts/select2/select2-optinal.min.js?v=2"></script>
</asp:Content>
