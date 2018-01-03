<%@ Page Title="سيارات معروضة للموقع" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="WebsiteCarsView.aspx.cs" Inherits="WebsiteCarsView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/WebsiteCarsView.min.js?v=1.1"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">سيارات المزادات للعرض بالموقع</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>سيارات مزادات / البيع السريع
            </h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
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
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ChassisN"><span>الشاصي</span></label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="ChassisN" class="form-control" />
                                <a tabindex="4" href="javascript:void(0);" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــث</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                سيارات البيع السريع المعروضة فى الموقع
                <asp:HyperLink runat="server" data-rel="tooltip" data-placement="top" data-original-title="عرض"
                    ID="btnAddNew" ToolTip="أضــف جديد" ImageUrl="/App_Themes/iraq/images/add-new.png"
                    CssClass="pull-left icon-animated-vertical btn-add" NavigateUrl="InvoicePayAdd.aspx" />
            </div>
            <table id="listItems" class="table table-bordered table-hover table-striped" width="100%">
                <thead>
                    <tr>
                        <th width="59" title="رقم السيارة">#
                        </th>
                        <th>صورة السيارة
                        </th>
                        <th width="100">تاريخ الفاتورة
                        </th>
                        <th width="30%">السيارة
                        </th>
                        <th>رقم اللوت
                        </th>
                        <th>الشاصي
                        </th>
                        <th>سعر الشراء</th>
                        <th>السعر بالموقع
                        </th>
                        <th class="hidden-print" width="59">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script>pageManager.Init();</script>
</asp:Content>