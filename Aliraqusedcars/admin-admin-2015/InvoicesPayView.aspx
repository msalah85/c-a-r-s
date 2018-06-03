<%@ Page Title=" عــرض فواتير الشراء " Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoicesPayView.aspx.cs" Inherits="InvoicesPayView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
    <link href="/App_Themes/iraq/cars-list.min.css?v=1.1" rel="stylesheet" />
    <script src="<%: Settings.Config.CDN%>/Scripts/App/InvoicePayView.min.js?v=4.8"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-plus"></i><a href="InvoicePayAdd.aspx">اضافة سيارة</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">فواتير الشراء</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير فواتير الشراء
            </h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="Paid"><span>بحث بالدفع</span></label>
                        <div class="controls">
                            <select class="form-control" data-placeholder="اختــر" id="Paid">
                                <option></option>
                                <option value="1">مدفوعة</option>
                                <option value="0">غير مدفوعة</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Buyer"><span>رقم الباير</span></label>
                        <div class="controls">
                            <input type="text" id="Buyer" name="Buyer" class="select2 form-control" data-fn-name="Buyers_GetNames" />
                            <label class="inline" data-toggle="tooltip" title="عرض مجموعات برقم الباير">
                                <input type="checkbox" class="ace-checkbox-6 buyerGrouping" />
                                <span class="lbl">مجموعات برقم الباير</span>
                            </label>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ClientID">العميل</label>
                        <div class="controls">
                            <input type="text" id="ClientID" name="ClientID" class="select2 form-control" data-fn-name="Clients_SelectNames3" />
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="From"><span>التاريخ</span></label>
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
                        <label class="control-label" for="ChassisN"><span>الشاصي</span></label>
                        <div class="controls">
                            <input type="text" id="ChassisN" style="width: 214px" class="form-control" />
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <button tabindex="4" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــث</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض فواتير الشراء
                <a data-rel="tooltip" title="أضــف جديد"
                    class="pull-left btn-primary btnAdd" href="InvoicePayAdd.aspx">
                    <i class="icon-plus"></i>
                    سيارة جديدة
                </a>
            </div>
            <table id="listItems" class="table table-bordered table-hover table-striped" width="100%">
                <thead>
                    <tr>
                        <th width="33">صورة</th>
                        <th>الباير</th>
                        <th width="59" title="رقم السيارة">#</th>
                        <th width="100">التاريخ</th>
                        <th>اللوت</th>
                        <th width="20%">السيارة</th>
                        <th>الشاصي</th>
                        <th>الشاحن</th>
                        <th width="120px">سعر الشراء <sub class="text-warning">$</sub></th>
                        <th class="hidden-print" width="59">خيارات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="100%">جاري تحميل البيانات...</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="8"><span class="pull-left">الإجمالى$</span></th>
                        <th></th>
                        <th class="hidden-print"></th>
                    </tr>
                </tfoot>
            </table>
            <div class="alert alert-block alert-info">
                <p>إجمالى جميع النتائج: <strong class="sum-total-all"></strong></p>
            </div>
            <div class="clearfix">&nbsp;</div>
        </div>        
        <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="cancelLbl">إلغاء السيارة
                </h3>
            </div>
            <div class="modal-body">
                <form id="aspnetForm" class="form-horizontal">
                    <div class="control-group">
                        <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء السيارة والمبالغ المتعلقة بها من النظام.</p>
                    </div>
                    <div class="control-group">
                        <label class="control-label">رقم السيارة</label>
                        <div class="controls">
                            <input id="cancelCarID" type="text" value="0" readonly />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">نوع السيارة</label>
                        <div class="controls">
                            <input id="cancelCarModel" type="text" value="0" readonly />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="cancelNotes">السبب: <span class="red">*</span></label>
                        <div class="controls">
                            <textarea class="required" name="cancelNotes" required id="cancelNotes" cols="5" rows="5"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger bntCancelInvoice" aria-hidden="true">تنفيذ الحذف</button>
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                    تجاهل</button>
            </div>
        </div>
    </div>
    <script>pageManager.Init();</script>
    <script src="<%: Settings.Config.CDN%>/Scripts/select2/select2.min.js?v=1.5"></script>
    <script async src="<%: Settings.Config.CDN%>/Scripts/select2/select2-optinal.min.js?v=2.1"></script>
    <script src="<%: Settings.Config.CDN%>/Scripts/utilities/stickyTableHeader.min.js"></script>
</asp:Content>
