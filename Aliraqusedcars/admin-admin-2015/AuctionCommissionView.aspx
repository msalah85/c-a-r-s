<%@ Page Title="عرض حوالات عمولات البيرات الخاصه" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="AuctionCommissionView.aspx.cs" Inherits="AuctionCommissionView" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="/Scripts/App/AuctionCommissionView.min.js?v=2.5"></script>
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="AuctionCommissionAdd.aspx">اضافة حوالة بيرات</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">تقرير حوالات عمولات البيرات الخاصه</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير حوالات عمولات البيرات الخاصه
            </h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="auction"><span>تصنيف المزاد</span></label>
                        <div class="controls">
                            <div class="span12">
                                <select class="form-control chzn-select chosen-rtl" data-placeholder="اختــر" id="AuctionType">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="From"><span>تاريخ الحوالة</span></label>
                        <div class="controls">
                            <div class="span12">
                                <span class="filter_column filter_date_range">من 
                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                    إلى
                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                                <a tabindex="4" href="javascript:void(0);" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــــــــــث</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عــرض حوالات عمولات البيرات الخاصه
                <asp:HyperLink runat="server" data-rel="tooltip" data-placement="top" data-original-title="عرض"
                    ID="btnAddNew" ToolTip="أضــف جديد" ImageUrl="/App_Themes/iraq/images/add-new.png"
                    CssClass="pull-left icon-animated-vertical btn-add" NavigateUrl="AuctionCommissionAdd.aspx" />
            </div>
            <table id="listItems" class="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="59">م
                        </th>
                        <th width="100">التاريخ
                        </th>
                        <th>المزاد
                        </th>
                        <th>مكتب الصرافة
                        </th>
                        <th>سند الصرف
                        </th>
                        <th>المبلغ <sub>$</sub>
                        </th>
                        <th>المبلغ <sub>درهم</sub>
                        </th>
                        <th class="hidden-print" width="90">خيارات</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan="5"></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="row-fluid">
        <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="cancelLbl">إلغاء الايداع
                </h3>
            </div>
            <div class="modal-body">
                <form id="cancelForm" class="form-horizontal" role="form">
                    <div class="control-group">
                        <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء حوالة عمولة الباير تماماً.</p>
                    </div>
                    <div class="control-group">
                        <label class="control-label">رقم الحوالة</label>
                        <div class="controls">
                            <input id="AuctionCommID" type="text" value="0" readonly />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">المزاد</label>
                        <div class="controls">
                            <input id="InvoiceDate" type="text" value="0" readonly />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">المبلغ $</label>
                        <div class="controls">
                            <input id="CommAmount" type="text" value="0" readonly />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">سبب الإلغاء <span class="red">*</span></label>
                        <div class="controls">
                            <textarea id="DeleteReason" rows="4" cols="4" name="DeleteReason" class="required" required></textarea>
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
    </div>
    <script>pageManager.Init();</script>
</asp:Content>