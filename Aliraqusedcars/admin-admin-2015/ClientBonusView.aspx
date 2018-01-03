<%@ Page Title="عرض خصومات للعميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/ClientBonusView.min.js?v=3.0"></script>
    <style>
        .btnAdd {
            padding: 0 9px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ClientBonusAdd.aspx">اضافة خصم لعميل</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">خصومات للعميل</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير خصومات للعميل</h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal" id="aspnetForm">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="ClientID">بحث بالعميل</label>
                        <div class="controls">
                            <input type="text" id="ClientID" name="ClientID" required class="required select2 form-control" data-fn-name="Clients_SelectNames3" />
                        </div>
                    </div>
                </div>
                <div class="span8">
                    <div class="control-group">
                        <label class="control-label" for="divDates"><span title="تاريخ الاصدار">التاريخ</span></label>
                        <div class="controls">
                            <span class="filter_column filter_date_range">من
                                    <input tabindex="2" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" name="From" />
                                إلى
                                    <input tabindex="3" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" name="To" /></span>
                            <button type="submit" tabindex="4" id="SearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>&nbsp;بحـــث</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض خصومات للعميل                 
                <a data-toggle="tooltip" href="ClientBonusAdd.aspx" title="اضافة جديد"
                    class="pull-left btn-primary btnAdd">
                    <i class="icon-plus"></i>
                    اضافة جديد
                </a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>التاريخ</th>
                        <th>العميل</th>
                        <th>المبلغ <sub>$</sub></th>
                        <th>المبلغ <sub>درهم</sub></th>
                        <th>السبب</th>
                        <th width="80" class="hidden-print">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!--start cancel modal-->
        <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="cancelLbl">إلغاء تخفيض/بونص
                </h3>
            </div>
            <div class="modal-body">
                <form id="cancelForm" class="form-horizontal" role="form">
                    <div class="control-group">
                        <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء مبلغ الخصم تماماً.</p>
                    </div>
                    <div class="control-group">
                        <label class="control-label">رقم السند</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="BonusID" type="text" value="0" readonly />
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
                <span class="pull-left">الإجمالى: <strong class="debit green">0</strong>
                    <sub>$</sub></span>
            </div>
        </div>
    </div>
    <script type="text/javascript">pageManager.Init();</script>
    <link href="/Scripts/select2/select2.min.css" rel="stylesheet" />
    <script src="/Scripts/select2/select2.min.js?v=1.2"></script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=1.2"></script>
</asp:Content>