<%@ Page Title="عــرض فواتير البيع الملغاه" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
    <script src="/Scripts/select2/select2.min.js?v=1.5"></script>
    <script src="/Scripts/deleted/InvoicesSaleView.min.js?v=1.5"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">فواتير البيع</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1 class="red">تقرير فواتير البيع الملغاه
            </h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="masterForm">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="clientId"><span>بحث بالعميل</span></label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="clientId" class="select2 form-control" value="" data-fn-name="Clients_SelectNames3" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="From"><span>تاريخ الفاتورة</span></label>
                        <div class="controls">
                            <div class="span12">
                                <span id="divDates">من 
                                    <input type="text" tabindex="1" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                    إلى
                                    <input type="text" tabindex="2" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                                <a tabindex="3" href="javascript:void(0);" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــث</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header red2-bg">
                عـــــــرض فواتير البيع الملغاه
            </div>
            <table id="listItems" class="table table-bordered table-striped table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="50">م
                        </th>
                        <th width="90">رقم السيارة
                        </th>
                        <th width="110">تاريخ الفاتورة
                        </th>
                        <th width="20%">العميل
                        </th>
                        <th width="20%">السيارة
                        </th>
                        <th>جهة الوصول
                        </th>
                        <th>سعر البيع$
                        </th>
                        <th>الموظف
                        </th>
                        <th>تاريخ الحذف
                        </th>
                        <th width="40">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <div class="clearfix">&nbsp;</div>
    <script>pageManager.Init();</script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=1.3"></script>
</asp:Content>
