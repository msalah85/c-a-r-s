<%@ Page Title="عرض فواتير قطع الغيار" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="PartsView.aspx.cs" Inherits="admin_admin_2015_PartsView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="/Scripts/parts/PartsView.min.js"></script>
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="PartsAdd.aspx">اضافة فاتورة قطع غيار</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">تقرير فواتير قطع الغيار</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير فواتير قطع الغيار
            </h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ClientID">بحث بالعميل</label>
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
                عـــــــرض فواتير قطع الغيار
                <asp:HyperLink runat="server" data-rel="tooltip" data-placement="top" data-original-title="عرض"
                    ID="btnAddNew" ToolTip="أضــف جديد" ImageUrl="/App_Themes/iraq/images/add-new.png"
                    CssClass="pull-left icon-animated-vertical btn-add" NavigateUrl="PartsAdd.aspx" />
            </div>
            <table id="listItems" class="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="59">م
                        </th>
                        <th width="100">التاريخ
                        </th>
                        <th>العميل
                        </th>
                        <th>رقم الفاتورة
                        </th>
                        <th>الاجمالي <sub>$</sub>
                        </th>
                        <th>الخصم <sub>$</sub>
                        </th>
                        <th>الصافي <sub>$</sub>
                        </th>
                        <th class="hidden-print" width="89">خيارات</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <script>pageManager.Init();</script>
    <script src="/Scripts/select2/select2.min.js?v=1.5"></script>
    <script async src="/Scripts/select2/select2-optinal.min.js?v=2.1"></script>
</asp:Content>
