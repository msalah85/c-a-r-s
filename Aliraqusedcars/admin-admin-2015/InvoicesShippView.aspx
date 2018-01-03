<%@ Page Title=" عــرض فواتير الشحن " Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoicesShippView.aspx.cs" Inherits="InvoicesShippView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/App_Themes/iraq/shipp-view-custom.min.css?v=1.2" rel="stylesheet" />
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><i class="icon-plus"></i><a href="InvoiceShippingAdd.aspx">فاتورة شحن جديدة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">فواتير الشحن</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>فواتير الشحن
            </h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal" role="form">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ShipperMain"><span>بحث بالشاحن الرئيسي</span></label>
                        <div class="controls">
                            <input id="ShipperMain" name="ShipperMain" class="form-control select2" data-fn-name="MainShippers_GetNames" type="text" data-placeholder="اختر الشاحن الرئيسي" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Shipper"><span>بحث بالشاحن</span></label>
                        <div class="controls">
                            <input id="Shipper" name="Shipper" class="form-control select2" data-fn-name="Shippers_GetNames" type="text" data-placeholder="اختر الشاحن" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Paid">حالة الدفع</label>
                        <div class="controls">
                            <div class="span12">
                                <select class="form-control" data-placeholder="اختــر" id="Paid">
                                    <option></option>
                                    <option value="1">مدفوعة</option>
                                    <option value="0">غير مدفوعة</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ContainerNo">رقم الحاوية</label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="ContainerNo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="DistinationID"><span>جهة الوصول</span></label>
                        <div class="controls">
                            <input id="DistinationID" name="DistinationID" class="form-control select2" data-fn-name="Distinations_GetNames" type="text" data-placeholder="اختر جهة الوصول" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="From"><span>تاريخ الوصول</span></label>
                        <div class="controls">
                            <span class="filter_column filter_date_range">
                                <input type="text" placeholder="من" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                <input type="text" placeholder="إلى" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="InvoiceNo">رقم الفاتورة</label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="InvoiceNo" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"></label>
                        <div class="controls">
                            <div class="span12">
                                <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>&nbsp;بحــــــث</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header hidden-print">
                عـــــــرض فواتير الشحن
                <a data-rel="tooltip" id="btnAddNew" title="أضــف جديد" class="pull-left icon-animated-vertical btn-add" href="InvoiceShippingAdd.aspx">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="add" /></a>
                <a class="btn btn-app btn-warning btn-small hidden hidden-print pull-left payNow">+ إعداد حوالة الشحن
                    <span class="badge badge-pink">0</span>
                </a>
                <a href="javascript:void(0);" class="btn btn-small hidden hidden-print pull-left payUndo" data-rel="tooltip" title="إلغاء التحديد"><i class="icon-undo bigger-200"></i></a>
            </div>
            <table id="listItems" class="table table-bordered" width="100%">
                <thead>
                    <tr>
                        <th>الفاتورة</th>
                        <th width="20%">السيارة</th>
                        <th width="15%">العميل</th>
                        <th>الشاصى</th>
                        <th>Towing</th>
                        <th>تحميل</th>
                        <th>ش بحري</th>
                        <th>تقطيع</th>
                        <th>أخرى</th>
                        <th>إجمالى</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="9">
                            <a id="bookingNow" class="btn btn-mini btn-warning hidden hidden-print payNow btn-app">+ إعداد حوالة الشحن
                                <span class="badge badge-pink">0</span>
                            </a>
                            <a href="javascript:void(0);" class="btn btn-mini hidden hidden-print payUndo" data-rel="tooltip" title="إلغاء التحديد"><i class="icon-undo bigger-200"></i></a>
                            <span class="pull-left">الإجمالى$: </span></th>
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
    <input type="hidden" name="shipperToCheck" value="" />
    <script src="/Scripts/App/InvoicesShippView.min.js?v=3.4"></script>
    <script>pageManager.Init();</script>
    <script src="/Scripts/select2/select2.min.js?v=1.5"></script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=2.3"></script>
</asp:Content>
