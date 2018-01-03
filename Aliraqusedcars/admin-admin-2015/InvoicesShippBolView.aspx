<%@ Page Title=" عــرض أرقام الحجز للحاويات " Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoicesShippBolView.aspx.cs" Inherits="InvoicesShippBolView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .sub-table {
            font-weight: 700;
        }
    </style>
    <link href="/Scripts/select2/select2.min.css?v=1.4" rel="stylesheet" />
    <script src="/Scripts/select2/select2.min.js?v=1.4"></script>
    <script src="/Scripts/App/InvoicesShippBolView.min.js?v=3.0"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">أرقام الحجز للحاويات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير أرقام الحجز للحاويات
            </h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="Shipper"><span>بحث بالشاحن</span></label>
                        <div class="controls">
                            <div class="span12">
                                <input id="Shipper" name="Shipper" class="form-control select2" data-fn-name="Shippers_GetNames" type="text" data-placeholder="اختر الشاحن" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Late">BOL</label>
                        <div class="controls">
                            <label title="قبل موعد الوصول ب 20 يوما">
                                <input type="checkbox" id="Late" />
                                <span class="lbl">متأخر عن انشاء فاتورة شحن</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="From"><span>تاريخ الوصول</span></label>
                        <div class="controls">
                            <div class="span12">
                                <span class="filter_column filter_date_range">من 
                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                    إلى
                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ContainerNo">BOL</label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="ContainerNo" />
                                <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>بحــــــــــث</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header hidden-print">
                عـــــــرض أرقام الحجز للحاويات
                <asp:HyperLink runat="server" data-rel="tooltip" data-placement="top" data-original-title="عرض"
                    ID="btnAddNew" ToolTip="أضــف جديد" ImageUrl="/App_Themes/iraq/images/add-new.png"
                    CssClass="pull-left icon-animated-vertical btn-add" NavigateUrl="america/carnotes.aspx" />
            </div>
            <table id="listItems" class="table table-bordered table-striped" width="100%">
                <thead>
                    <tr>
                        <th>الفاتورة</th>
                        <th>السيارة</th>
                        <th>رقم اللوت</th>
                        <th>الشاصي</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="cancelLbl">إلغاء رقم حجز الحاوية
                </h3>
            </div>
            <div class="modal-body">
                <form id="cancelForm" class="form-horizontal" role="form">
                    <div class="control-group">
                        <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء رقم حجز الحاوية تماماً.</p>
                    </div>
                    <div class="control-group">
                        <label class="control-label">رقم BOL</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="ShippInvoiceID" type="hidden" value="0" />
                                <input id="BOL" type="text" value="0" readonly />
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
        <div id="printedModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="printedModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="printedModalLabel"><i class="icon-location"></i>طباعة الفاتورة</h3>
            </div>
            <div class="modal-body">
                <form id="aspnetForm">
                    <p class="alert alert-success">برجاء تأكيد طباعة الفاتورة الواردة من الشاحن.</p>
                    <fieldset class="form-horizontal">
                        <div class="control-group">
                            <input type="hidden" id="InvoiceID" value="0" />
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="containerNoo">رقم الحاوية</label>
                            <div class="controls">
                                <span class="warning" id="containerNoo"></span>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-success" aria-hidden="true">تأكيد الطباعة</button>
                <button class="btn btn-small" data-dismiss="modal" aria-hidden="true">إلغاء</button>
            </div>
        </div>
    </div>
    <script>pageManager.Init();</script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=2.2"></script><br />
</asp:Content>
