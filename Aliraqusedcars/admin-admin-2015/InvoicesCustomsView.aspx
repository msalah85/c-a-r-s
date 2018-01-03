<%@ Page Title=" عــرض فواتير التخليص الجمركي " Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoicesCustomsView.aspx.cs" Inherits="InvoicesCustomsView" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="/Scripts/App/InvoicesCustomsView.min.js?v=2.1" type="text/javascript"></script>
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">فواتير التخليص الجمركي</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>فواتير التخليص الجمركي</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <form>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="Shipper"><span>بحث بالمخلص</span></label>
                            <div class="controls">
                                <select class="form-control chzn-select chosen-rtl" data-placeholder="اختــر" id="Shipper">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Paid"><span>مدفوعة/غير مدفوعة</span></label>
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
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="From"><span>تاريخ الفاتورة</span></label>
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
                            <label class="control-label" for="ContainerNo"><span>رقم الحاوية</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="form-control" id="ContainerNo" style="width: 214px" />
                                    <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>بحـــث</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض فواتير التخليص الجمركي
                <a data-rel="tooltip" data-original-title="عرض"
                    id="btnAddNew" title="أضــف جديد"
                    class="pull-left icon-animated-vertical btn-add hidden-print" href="InvoiceCustomsAdd.aspx">
                    <img src="/App_Themes/iraq/images/add-new.png" /></a>

                <a class="btn btn-warning btn-small hidden hidden-print pull-left payNow">+ إعداد حوالة التخليص</a>
                <a href="javascript:void(0);" class="btn btn-small hidden hidden-print pull-left payUndo" data-rel="tooltip" title="إلغاء التحديد"><i class="icon-undo bigger-200"></i></a>
            </div>
            <table id="listItems" class="table table-bordered table-hover table-striped" width="100%">
                <thead>
                    <tr>
                        <th>م</th>
                        <th>التاريخ</th>
                        <th>رقم الفاتورة</th>
                        <th width="19%">المخلص</th>
                        <th>تاريخ الوصول</th>
                        <th>رقم الحاوية</th>
                        <th>الاجمالى <sub>$</sub></th>
                        <th>الاجمالى <sub>درهم</sub></th>
                        <th class="hidden-print">خيارات</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan="6"><span class="pull-left">إجمالى الفواتير:</span></th>
                        <th></th>
                        <th></th>
                        <th><a class="btn btn-mini btn-warning hidden hidden-print payNow" data-rel="tooltip" title="انشاء حوالة التخليص">+ حوالة</a>
                            <a href="javascript:void(0);" class="btn btn-mini hidden hidden-print payUndo" data-rel="tooltip" title="إلغاء التحديد"><i class="icon-undo bigger-200"></i></a></th>
                    </tr>
                </tfoot>
            </table>
            <div class="alert alert-block alert-info"><p>إجمالى جميع النتائج: <strong class="sum-total-all"></strong> $  -  <strong class="sum-total-all-dhs"></strong> درهم</p></div><div class="clearfix">&nbsp;</div>
        </div>
    </div>
    <input type="hidden" name="compToCheck" value="" />
    <script>pageManager.Init();</script>
    <style type="text/css">
        .sp-bord-btom {
            border-bottom-color: #89CFF3;
        }

        .alert-warning {
            background-color: rgba(245, 237, 194, 0.21);
            font-weight: 700;
        }

        a.payNow {
            padding-top: 4px;
        }

        .op-acity {
            opacity: 1 !important;
            position: relative !important;
        }
        @media print {
            .alert-warning, .table.table-bordered thead:first-child tr th {
                background-color: #f1eee9 !important;
            }
            .spacer, .spacer td {
                border-color: transparent;
                border-collapse: separate;
            }
        }
    </style>
</asp:Content>
