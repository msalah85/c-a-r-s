<%@ Page Title=" عــرض فواتير البيع " Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoicesSaleView.aspx.cs" Inherits="InvoicesSaleView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/InvoicesSaleView.min.js?v=2.1"></script>
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
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
            <h1>تقرير فواتير البيع
            </h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="masterForm">
                <div class="span3">
                    <div class="control-group">
                        <label class="control-label" for="client"><span>بحث بالعميل</span></label>
                        <div class="controls">
                            <input type="text" id="client" name="client" class="select2 form-control" data-fn-name="Clients_SelectNames3" />
                        </div>
                    </div>
                </div>
                <div class="span3">
                    <div class="control-group">
                        <label class="control-label" for="client">جهة الوصول</label>
                        <div class="controls">
                            <input type="text" id="destination" name="client" class="select2 form-control"
                                data-fn-name="Distinations_GetNames" />
                        </div>
                    </div>
                </div>
                <div class="span4">
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
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض فواتير البيع
            <a class="print-all-selected pull-left btn-primary btnAdd" href="javascript:void(0);"><i class="icon-print"></i>
                طباعة الفواتير المحددة</a>
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
                        <th width="100">تاريخ الوصول
                        </th>
                        <th>جهة الوصول
                        </th>
                        <th>سعر البيع$
                        </th>
                        <th>
                            <input type="checkbox" class="select-all" data-rel="tooltip" title="اختر الفواتير للطباعه" /></th>
                        <th width="70">خيارات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="100%">جاري تحميل البيانات...</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="7"><span class="pull-left">إجمالى الفواتير:</span></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
            <div class="alert alert-block alert-info">
                <p>إجمالى جميع النتائج: <strong class="sum-total-all"></strong></p>
            </div>
            <div class="clearfix">&nbsp;</div>
        </div>
    </div>
    <script>pageManager.Init();</script>
    <script src="/Scripts/select2/select2.min.js?v=1.5"></script>
    <script async src="/Scripts/select2/select2-optinal.min.js?v=2.1"></script>
    <style>
        #listItems td input[type="checkbox"],
        #listItems th input[type="checkbox"] {
            margin: 0 !important;
            position: relative;
            opacity: 1;
        }
    </style>
</asp:Content>
