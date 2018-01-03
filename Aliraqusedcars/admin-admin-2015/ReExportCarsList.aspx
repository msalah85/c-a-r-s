<%@ Page Title="إعادة تصدير سيارات - تأميناتها" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ReExportCarsList.aspx.cs" Inherits="admin_admin_2015_ReExportCarsList" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="ReExportInvoicesList.aspx">عرض التأمينات الجمركية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">إعادة جمارك / تأمينات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إعادة جمارك / تأمينات السيارات
            </h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="masterForm">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="From"><span>بحث بتاريخ البيان</span></label>
                        <div class="controls">
                            <div class="span12">
                                <span id="divDates">من 
                                    <input type="text" tabindex="1" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                    إلى
                                    <input type="text" tabindex="2" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span><input id="ExportID" value="0" type="hidden" />
                                <a tabindex="3" href="javascript:void(0);" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>&nbsp; بحـــث</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض جمارك السيارات
            </div>
            <table id="listItems" class="table table-bordered" width="100%">
                <thead>
                    <tr>
                        <th class="hidden-print" width="30px" title="إلغاء سيارة">إلغاء</th>
                        <th width="20%">السيارة
                        </th>
                        <th class="hidden-print">الجمارك/السيارة
                        </th>
                        <th>رقم البيان
                        </th>
                        <th>تاريخ البيان
                        </th>
                        <th class="hidden-print" width="130">المبلغ المسترد/الحاوية
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr class="alert alert-warning">
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
            <table class="table pull-left" style="width: 300px!important; margin-top: 5px;">
                <tr>
                    <td class="no-border">
                    </td>
                </tr>
                <tr>
                    <td class="no-border">
                        <button class="btn btn-app btn-success btnSave" data-toggle="tooltip" title="حفظ وطباعة">
                            <i class="icon-save bigger-230"></i>
                            حـــفظ
                        </button>
                    </td>
                </tr>
            </table>
            <ul id="customsSammary" class="item-list ui-sortable pull-left" style="width: 270px;">
                <li class="item-blue clearfix"><strong class="carsNo blue">0</strong>عدد السيارات.</li>
                <li class="item-grey clearfix"><strong class="carsCustoms grey">0</strong>إجمـــالى الجمـــارك.</li>
                <li class="item-green clearfix"><strong class="noCustoms green">0</strong>عدد البيانات الجمركية.</li>
                <li class="item-pink clearfix"><strong class="customsTotal pink">0</strong>إجمالى المبلغ المسترد.</li>
            </ul>
        </div>
    </div>
    <br />
    <script src="/Scripts/DataTables/media/js/dataTables.rowsGroup.min.js?v=1.1"></script>
    <script src="/Scripts/App/reexport-cars.min.js?v=1.3"></script>
</asp:Content>