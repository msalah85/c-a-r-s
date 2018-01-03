<%@ Page Title="عرض المصروفات العمومية والإدارية" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/GeneralAdministrativeExpenses.min.js?v=2.3"></script>
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ReceiptPaymentsAdd.aspx">اضافة سند صرف</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">المصروفات العمومية والإدارية</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير المصروفات العمومية والإدارية</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="masterForm">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="ExpenseTypeID">بحث بنوع المصروف</label>
                        <div class="controls">
                            <label>
                                <span class="block input-icon input-icon-right">
                                    <select tabindex="1" class="chzn-select chosen-rtl" data-placeholder="اختــر نوع المصروف" id="ExpenseTypeID">
                                        <option></option>
                                    </select>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="divDates"><span>التاريخ</span></label>
                        <div class="controls">
                            <span class="filter_column filter_date_range">من
                                    <input tabindex="2" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                إلى
                                    <input tabindex="3" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                            <button type="submit" tabindex="4" id="SearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>&nbsp;بحـــث</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض المصروفات العمومية والإدارية                
                <a data-toggle="tooltip" href="ReceiptPaymentsAdd.aspx" title="اضافة جديد" class="pull-left btn-primary btnAdd">
                    <i class="icon-plus"></i>
                    سند صرف
                </a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>الشهر</th>
                        <th>إيجار الشركة</th>
                        <th>رسوم حكومية</th>
                        <th>بدل سكن</th>
                        <th>رواتب</th>
                        <th>انترنت</th>
                        <th>كهرباء مياه</th>
                        <th>النثرية</th>
                        <th>نثرية الأردن</th>
                        <th>أخري</th>
                        <th>إجمالى <sub>درهم</sub></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr class="alert warning">
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="clearfix space-16"></div>
    </div>
    <script type="text/javascript">
        ReceiptPayment.Init();
    </script>
</asp:Content>
